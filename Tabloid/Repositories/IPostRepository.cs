using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        Post GetPostById(int id);
        List<Post> GetPostByUserProfileId(int userProfileId);
        void AddPost(Post post);
        void UpdatePost(Post post);
        void DeletePost(int id);
        List<Post> searchByTag(string criterion);
        List<Post> GetPostByCategoryId(int categoryId);
    }
}