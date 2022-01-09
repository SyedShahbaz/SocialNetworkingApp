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

        // We have not inculded PHOTOS here.
        // Relationship in User and Photos will automatically create the PHOTOS table
        // Defining here photos.. Will cause "Object cycle Error" while running migration.
        public DbSet<AppUser> Users { get; set; }
    }
}
