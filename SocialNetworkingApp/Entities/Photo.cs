using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetworkingApp.Entities
{
    // Want this to be called Photos in the database..
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        // Fully define the relationship
        // Enables cascade delete once User is deleted
        // Also we can't have a photo without a user.
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

    }
}