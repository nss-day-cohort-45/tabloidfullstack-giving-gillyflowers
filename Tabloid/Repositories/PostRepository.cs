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
                                up.DisplayName
                        FROM Post p
                        LEFT JOIN Category c on c.Id = p.CategoryId
                        LEFT JOIN UserProfile up on up.Id = p.UserProfileId
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
                           up.DisplayName, com.Id AS CommentId,
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
                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                },
                Category = new Category()
                {
                    Name = DbUtils.GetString(reader, "CategoryName")
                }
            };
        }


    }
}
