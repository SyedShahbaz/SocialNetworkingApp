using System.Security.Claims;

namespace SocialNetworkingApp.Extensions
{
	public static class ClaimsPrincipleExtensions
	{
		public static string GetUsername(this ClaimsPrincipal user)
        {
			return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
		}
	}
}

