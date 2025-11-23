using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class ConfigOrcamentoFeriasRepository : RepositoryBase<ConfigOrcamentoFerias>, IConfigOrcamentoFeriasRepository
    {
        public ConfigOrcamentoFeriasRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<ConfigOrcamentoFerias> GetAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .Include(cfg => cfg.FaixasOrcamentoFerias)
                            .FirstOrDefaultAsync();
        }

        public async Task<ConfigOrcamentoFerias> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(c => c.Id.Equals(id), trackChanges)
                            .SingleOrDefaultAsync();
        }
    }
}
