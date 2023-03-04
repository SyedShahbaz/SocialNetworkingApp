using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SocialNetworkingApp.Data;
using SocialNetworkingApp.Helpers;
using SocialNetworkingApp.Interfaces;
using SocialNetworkingApp.Services;

namespace SocialNetworkingApp.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Way to strongly typed the settings config
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            // Token service doesn't need Interface but it helps in Testing. We can mock it's behaviour.
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IUserRepository, UserRepository>();
            // Need to specify the assembly name where the Mapping profile resides.
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}
