using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class ConfigCalculoFeriasRepository : RepositoryBase<ConfigCalculoFerias>, IConfigCalculoFeriasRepository
    {
        public ConfigCalculoFeriasRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<ConfigCalculoFerias> GetAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).FirstOrDefaultAsync();
        }

        public async Task<ConfigCalculoFerias> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(c => c.Id.Equals(id), trackChanges)
                            .SingleOrDefaultAsync();
        }
    }
}
