using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                                p.IsApproved, p.CategoryId, p.UserProfileId,
                                c.Name as CategoryName,
                                up.DisplayName, up.FirstName, up.LastName, up.Email
                        FROM Post p
                        LEFT JOIN Category c on c.Id = p.CategoryId
                        LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                        WHERE p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME()
                        ORDER BY p.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(NewPostFromDb(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                           p.IsApproved, p.CategoryId, p.UserProfileId,
                           c.Name AS CategoryName,
                           up.DisplayName, up.FirstName, up.LastName, up.Email, com.Id AS CommentId,
                           com.PostId AS CommentPostId, com.UserProfileId AS CommentUserProfileId, 
                           com.Subject, com.Content AS CommentContent, com.CreateDateTime AS CommentCreateDateTime,
                           usp.DisplayName AS CommentUserProfileDisplayName        
                    FROM Post p
                    LEFT JOIN Category c on c.Id = p.CategoryId
                    LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                    LEFT JOIN Comment com on com.PostId = p.Id
                    LEFT JOIN UserProfile usp on usp.Id = com.UserProfileId
                    WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = NewPostFromDb(reader);
                            post.Comments = new List<Comment>();
                        }
                        if (DbUtils.IsNotDbNull(reader, "CommentId"))
                        {
                            post.Comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                PostId = id,
                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "CommentContent"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CommentCreateDateTime"),
                                UserProfile = new UserProfile()
                                {
                                    DisplayName = DbUtils.GetString(reader, "CommentUserProfileDisplayName")
                                }
                            });
                        }
                    }

                    reader.Close();

                    return post;
                }

            }
        }

        public List<Post> searchByTag(string criterion)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                   var sql = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                           p.IsApproved, p.CategoryId, p.UserProfileId,
                           c.Name AS CategoryName,
                           up.DisplayName, up.FirstName, up.LastName, up.Email,                        
                           t.Name AS TagName
	                    FROM Post p
                        LEFT JOIN Category c on c.Id = p.CategoryId
                        LEFT JOIN UserProfile up on up.Id = p.UserProfileId
	                    LEFT JOIN PostTag pt on pt.PostId = p.Id
	                    LEFT JOIN Tag t on t.Id = pt.TagId
	                    WHERE t.Name LIKE @criterion AND LIKE @criterion
                        AND p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME()
                        ORDER BY p.CreateDateTime DESC
                    ";
                    DbUtils.AddParameter(cmd, "@criterion", $"%{criterion}%");




                    cmd.CommandText = sql;


                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(NewPostFromDb(reader));
                    }

                     reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetPostByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                           p.IsApproved, p.CategoryId, p.UserProfileId,
                           c.Name AS CategoryName,
                           up.DisplayName, up.FirstName, up.LastName, up.Email       
                    FROM Post p
                    LEFT JOIN Category c on c.Id = p.CategoryId
                    LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                    WHERE p.UserProfileId = @Id
                    ORDER BY p.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(NewPostFromDb(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        // Need to update the PublishedDateTime and isApproved when we start the admin approval ticket.
        public void AddPost(Post post)
        {
            using(var conn = Connection) 
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Title, Content, ImageLocation, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime, @IsApproved, @CategoryId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdatePost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post 
                           SET Title = @Title,
                               Content = @Content,
                               ImageLocation = @ImageLocation,
                               PublishDateTime = @PublishDateTime,
                               CategoryId = @CategoryId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);         
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        
        public void DeletePost(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE PostTag WHERE PostId = @Id;
                                        DELETE Comment WHERE PostId = @Id;
                                        DELETE PostReaction WHERE PostId = @Id;
                                        DELETE FROM Post WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



        private Post NewPostFromDb(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email")
                },
                Category = new Category()
                {
                    Name = DbUtils.GetString(reader, "CategoryName")
                }
            };
        }


    }
}
