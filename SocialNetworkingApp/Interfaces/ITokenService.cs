using System.Threading.Tasks;
using SocialNetworkingApp.Entities;

namespace SocialNetworkingApp.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
