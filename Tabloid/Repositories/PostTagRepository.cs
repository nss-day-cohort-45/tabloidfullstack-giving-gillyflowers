using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration config) : base(config) { }

        public List<PostTag> GetAllPostTagsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"SELECT pt.Id, pt.PostId, pt.TagId, t.[Name] as 'TagName'
                            FROM PostTag pt
                        JOIN Post p on pt.PostId = p.Id
                        JOIN Tag t on pt.TagId = t.Id
                        WHERE p.Id = @postId
                        ORDER By TagName";

                    DbUtils.AddParameter(cmd, "@postId", postId);

                    var reader = cmd.ExecuteReader();

                    List<PostTag> postTags = new List<PostTag>();

                    while (reader.Read())
                    {
                        PostTag postTag = new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            TagId = DbUtils.GetInt(reader, "TagId"),
                            Tag = new Tag()
                        {
                            Name = DbUtils.GetString(reader, "TagName")
                        }
                    };
                    postTags.Add(postTag);
                    }
                    reader.Close();
                    return postTags;
                }
            }
        }

        public void AddPostTag(int tagId, int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostTag ( PostId, TagId )
                        VALUES ( @PostId, @TagId )";
                    DbUtils.AddParameter(cmd, "@PostId", postId);
                    DbUtils.AddParameter(cmd, "@TagId", tagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePostTag(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM PostTag WHERE PostId = @PostId";

                    DbUtils.AddParameter(cmd, "@PostId", postId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
