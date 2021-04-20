using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void AddTag(Tag tag);
        void DeleteTag(int id);
        List<Tag> GetAllTags();
        Tag GetTagById(int id);
        void UpdateTag(Tag tag);
    }
}