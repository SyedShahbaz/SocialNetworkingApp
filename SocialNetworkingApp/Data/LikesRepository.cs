using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SocialNetworkingApp.DTOs;
using SocialNetworkingApp.Entities;
using SocialNetworkingApp.Extensions;
using SocialNetworkingApp.Interfaces;

namespace SocialNetworkingApp.Data
{
    public class LikesRepository : ILikedRepository
    {
        private readonly DataContext _dataContext;

        public LikesRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
        {
            return await _dataContext.Liked.FindAsync(sourceUserId, targetUserId);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _dataContext.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            // Not executed yet
            var users = _dataContext.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _dataContext.Liked.AsQueryable();

            switch (predicate)
            {
                case "liked":
                    likes = likes.Where(like => like.SourceUserId == userId);
                    users = likes.Select(like => like.TargetUser);
                    break;
                case "likedBy":
                    likes = likes.Where(like => like.TargetUserId == userId);
                    users = likes.Select(like => like.SourceUser);
                    break;
            }

            return await users.Select(user => new LikeDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City,
                Id = user.Id
            }).ToListAsync();
        }
    }
}