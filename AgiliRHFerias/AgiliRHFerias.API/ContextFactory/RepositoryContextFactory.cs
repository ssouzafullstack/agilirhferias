using AgiliRHFerias.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace AgiliRHFerias.WebAPI.ContextFactory
{
    public class RepositoryContextFactory : IDesignTimeDbContextFactory<RepositoryContext>
    {
        public RepositoryContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                                                          .AddJsonFile("appsettings.json")
                                                          .Build();

            var builder = new DbContextOptionsBuilder<RepositoryContext>().UseSqlServer(configuration.GetConnectionString("sqlConnection"),
                                                                                        b => b.MigrationsAssembly("AgiliRHFerias.WebAPI"));
            return new RepositoryContext(builder.Options);
        }
    }
}
