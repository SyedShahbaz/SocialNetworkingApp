using Microsoft.EntityFrameworkCore;
using SocialNetworkingApp.Entities;

namespace SocialNetworkingApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}
