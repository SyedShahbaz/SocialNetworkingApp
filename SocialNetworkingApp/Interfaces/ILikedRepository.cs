using System.Collections.Generic;
using System.Threading.Tasks;
using SocialNetworkingApp.DTOs;
using SocialNetworkingApp.Entities;

namespace SocialNetworkingApp.Interfaces
{
    public interface ILikedRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);
        Task<AppUser> GetUserWithLikes(int userId);
    
        // Predicate to check if we want to get users that they have liked or liked By.
        Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId);
    }
}