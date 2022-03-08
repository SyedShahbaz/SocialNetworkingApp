
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using SocialNetworkingApp.Helpers;

namespace SocialNetworkingApp.Extensions
{
	public static class HttpExtenstions
	{
		public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage,
			int totalItems, int totalPages)
		{
			var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

			var options = new JsonSerializerOptions
			{
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			};

			response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
			// As we are adding the custom header, we need to add CORS..
			response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
		}
	}
}

