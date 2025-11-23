using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class ConfigReducaoDiasFeriasRepository : RepositoryBase<ConfigReducaoDiasFerias>, IConfigReducaoDiasFeriasRepository
    {
        public ConfigReducaoDiasFeriasRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<ConfigReducaoDiasFerias> GetAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .Include(cfg => cfg.FaixasReducaoDiasFerias)
                            .FirstOrDefaultAsync();
        }

        public async Task<ConfigReducaoDiasFerias> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(c => c.Id.Equals(id), trackChanges)
                            .SingleOrDefaultAsync();
        }
    }
}
