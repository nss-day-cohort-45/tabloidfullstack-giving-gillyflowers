using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        //Returns a list of post by id
        public List<Comment> GetAllCommentsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, 
                                                up.DisplayName, up.FirstName, up.LastName, up.Email, p.Content
                                        FROM Comment c
                                        LEFT JOIN Post p on p.id = c.PostId
                                        LEFT JOIN UserProfile up ON up.id = c.UserProfileId
                                        WHERE c.PostId = @id
                                        ORDER BY CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromDb(reader));
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        //add a new comment
        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime)
                                        OUTPUT INSERTED.Id
                                        VALUES (@PostId, @UserProfileId, @Subject, @Content, @CreateDateTime )";

                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@userProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    DbUtils.AddParameter(cmd, "@createDateTime", comment.CreateDateTime);


                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //edit comment
        public void UpdateComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Comment                                                                          
                                        SET PostId = @postId,
                                            UserProfileId = @userProfileId,
                                            Subject = @subject,
                                            Content = @content,
                                            CreateDateTime = @createDateTime
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@postId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@userProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    DbUtils.AddParameter(cmd, "@createDateTime", comment.CreateDateTime);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //delete comment
        public void DeleteComment(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Comment WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //getComment by id 
        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, PostId, UserProfileId, Subject, Content, CreateDateTime 
                                        FROM Comment WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Comment comment = null;

                    if (reader.Read())
                    {
                        comment = NewCommentFromDb(reader);
                    }

                    reader.Close();
                    return comment;
                }
            }
        }

        //helper method
        private Comment NewCommentFromDb(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Subject = DbUtils.GetString(reader, "Subject"),
                Content = DbUtils.GetString(reader, "Content"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                PostId = DbUtils.GetInt(reader, "PostId"),
                UserProfile = new UserProfile()
                {
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email")
                },
            };
        }
    }
}
