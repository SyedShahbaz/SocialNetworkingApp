using System.Security.Claims;

namespace SocialNetworkingApp.Extensions
{
	public static class ClaimsPrincipleExtensions
	{
		public static string GetUsername(this ClaimsPrincipal user)
        {
			// Name represents UniqueName that we set in ClaimsPrinciple.
			return user.FindFirst(ClaimTypes.Name)?.Value;
		}

		public static int GetUserId(this ClaimsPrincipal user)
		{
			// Name represents UniqueName that we set in ClaimsPrinciple.
			return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
		}
	}
}

