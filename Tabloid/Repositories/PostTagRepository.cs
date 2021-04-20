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
                        @" SELECT pt.Id, pt.PostId, pt.TagId, t.[Name] as 'Tag Name'
                            FROM PostTag pt
                        JOIN Post p on pt.PostId = p.Id
                        JOIN Tag t on pt.TagId = t.Id
                        WHERE p.Id = @postId";

                    DbUtils.AddParameter(cmd, "@postId", postId)
                }
            }
        }
    }
}
