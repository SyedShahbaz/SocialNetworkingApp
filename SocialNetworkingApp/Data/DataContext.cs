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
        
        public DbSet<UserLike> Liked { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserLike>()
                // Represents Primary key in this table.
                .HasKey(k => new
                {
                    k.SourceUserId, k.TargetUserId
                });

            // Source user can like many users
            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<UserLike>()
                .HasOne(s => s.TargetUser)
                .WithMany(l => l.LikedByUsers)
                .HasForeignKey(s => s.TargetUserId)
                .OnDelete(DeleteBehavior.Cascade); // DeleteBehavior.Cascade should be changed to DeleteBehavior.NoAction if using SQLServer.
            
        }
    }
}
