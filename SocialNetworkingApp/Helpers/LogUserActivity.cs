using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using SocialNetworkingApp.Extensions;
using SocialNetworkingApp.Interfaces;

namespace SocialNetworkingApp.Helpers
{

    // Actions Filters allows us to do something
    // before or after something is executed.

    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Here resultContext is when action is already executed. ActionExecutedContext.
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity!.IsAuthenticated)
                return;
            
            // UserId makes it more efficient.
            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUserByIdAsync(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
        }
    }
}

