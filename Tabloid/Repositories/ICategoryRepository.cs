using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
    }
}