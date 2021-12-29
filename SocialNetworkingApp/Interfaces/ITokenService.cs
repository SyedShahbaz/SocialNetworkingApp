using SocialNetworkingApp.Entities;

namespace SocialNetworkingApp.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
