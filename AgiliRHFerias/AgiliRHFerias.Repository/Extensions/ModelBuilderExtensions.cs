using Microsoft.EntityFrameworkCore;
using System;

namespace AgiliRHFerias.Repository.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static ModelBuilder ApplyCustomConventions(this ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entity.GetProperties())
                {
                    if (property.ClrType == typeof(string))
                    {
                        modelBuilder.Entity(entity.Name).Property(property.Name).IsUnicode(false);
                    }
                    if (property.ClrType == typeof(decimal)) { }
                    if (property.ClrType == typeof(DateTime))
                    {
                        modelBuilder
                            .Entity(entity.Name)
                            .Property(property.Name)
                            .HasColumnType("datetime2");
                    }
                }
            }
            return modelBuilder;
        }
    }
}
