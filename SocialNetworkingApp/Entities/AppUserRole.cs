using Microsoft.AspNetCore.Identity;

namespace SocialNetworkingApp.Entities
{
    // Join table bw app users and roles
    public class AppUserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}