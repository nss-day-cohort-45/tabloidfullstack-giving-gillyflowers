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
    public class CommentRepository : BaseRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        //Returns a list of post by id
        public List<Comment> GetAllCommentsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, 
                                                up.DisplayName, p.Content
                                        FROM Comment c
                                        LEFT JOIN Post p on p.id = c.PostId
                                        LEFT JOIN UserProfile up ON up.id = c.UserProfileId
                                        WHERE c.PostId = @id
                                        ORDER BY CreateDateTime ASC";
                    cmd.Parameters.AddWithValue("@id", id);
                }
            }
        }

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
