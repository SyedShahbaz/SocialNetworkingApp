using System;
using System.Collections.Generic;

namespace SocialNetworkingApp.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }

        // UserName (N) is small for fronEnd.
        public string Username { get; set; }

        // Will use this as a Main Photo.. 
        public string PhotoUrl { get; set; }

        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public ICollection<PhotoDto> Photos { get; set; }
    }
}
