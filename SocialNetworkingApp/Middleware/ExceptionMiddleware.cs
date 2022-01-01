using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SocialNetworkingApp.Errors;

namespace SocialNetworkingApp.Middleware
{
    public class ExceptionMiddleware
    {
        // Function that can process HTTP Request..
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        // When we add Middleware we have the access to the actual HTTP request..
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Here we will get the context and pass it to the other MiddleWare.
                // This MiddleWare will live at the top of all the Middlewares
                // All the middle ware will send the request one level up.. Until they can reach some middleware that can handle the exception
                // As it is at the top of the tree this middle ware will catch the exception.
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment() ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiException(context.Response.StatusCode, "Internal Server error");

                // Our response goes back as normal Json camel case response.
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }

    }
}
