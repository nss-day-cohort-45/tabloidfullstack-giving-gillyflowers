using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAll();
        UserProfile GetByUserProfileId(int id);
        List<UserProfile> GetAllDeactivated();
        void Deactivate(int userProfileId);
        void Reactivate(UserProfile user);
        void Update(UserProfile userProfile);
        List<UserType> GetTypes();

    }
}