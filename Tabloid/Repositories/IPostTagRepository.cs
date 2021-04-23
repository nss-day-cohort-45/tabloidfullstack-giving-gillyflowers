using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void AddPostTag(int tagId, int postId);
        void DeletePostTag(int postId);
        List<PostTag> GetAllPostTagsByPostId(int postId);
    }
}