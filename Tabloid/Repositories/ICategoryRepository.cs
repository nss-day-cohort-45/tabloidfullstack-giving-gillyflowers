using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        
        void AddCategory(Category category);
        void UpdateCategory(Category category);
        void DeleteCategory(int id);
    }
}