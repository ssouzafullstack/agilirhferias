using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgiliRHFerias.Repository.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(new IdentityRole
            {
                Name = "Manager",
                NormalizedName = "MANAGER"
            }, new IdentityRole
            {
                Name = "Administrator",
                NormalizedName = "ADMINISTRATOR"
            },
            new IdentityRole
            {
                Name = "Supervisor",
                NormalizedName = "SUPERVISOR"
            },
            new IdentityRole
            {
                Name = "Employee",
                NormalizedName = "EMPLOYEE"
            });
        }
    }
}
