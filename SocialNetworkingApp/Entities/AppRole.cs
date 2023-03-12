using System.Collections;
using System.Collections.Generic;
using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Identity;

namespace SocialNetworkingApp.Entities
{
    // we need many to many between Appuser and App Role.
    //  user can have many roles and role can have many users
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}