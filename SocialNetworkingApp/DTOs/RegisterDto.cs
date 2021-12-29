using System.ComponentModel.DataAnnotations;

namespace SocialNetworkingApp.DTOs
{
    public class RegisterDto
    {
        // Good place to add validation is at DTO Level.
        // [ApiController] Validates the parameters that we send to the API end point

        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
