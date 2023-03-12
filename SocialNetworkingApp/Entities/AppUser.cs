using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using SocialNetworkingApp.Extensions;

namespace SocialNetworkingApp.Entities
{
    //IdentityUser<int> <int> means Id needs to be int.
    public class AppUser : IdentityUser<int>
    {
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        // One to Many.. Relationship. One user can have many photos.
        public ICollection<Photo> Photos { get; set; }

        // AutoMapper will automatically populate the Age in MemberDto
        // That is why we need to have a Get keyword Before Age.
        // AutoMapper will look for the property name after the word Get i.e Age 
        // in the MemberDto and will also match the data type. i.e. INT.

        // public int GetAge()
        // {
        //     return DateOfBirth.CalculateAge();
        // }
        
        public List<UserLike> LikedByUsers { get; set; }
        public List<UserLike> LikedUsers { get; set; }

        public List<Message> MessagesSent { get; set; }
        public List<Message> MessagesReceived { get; set; }

        // Navigation Property to join table. Many to Many.
        public ICollection<AppUserRole> UserRoles { get; set; }
        
    }
}
