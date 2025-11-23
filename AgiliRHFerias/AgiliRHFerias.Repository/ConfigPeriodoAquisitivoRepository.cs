using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class ConfigPeriodoAquisitivoRepository : RepositoryBase<ConfigPeriodoAquisitivo>, IConfigPeriodoAquisitivoRepository
    {
        public ConfigPeriodoAquisitivoRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<ConfigPeriodoAquisitivo>> GetAllAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .OrderBy(c => c.InicioVigencia)
                            .ToListAsync();
        }

        public async Task<ConfigPeriodoAquisitivo> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(c => c.Id.Equals(id), trackChanges)
                            .SingleOrDefaultAsync();
        }

        public void CreateEntity(ConfigPeriodoAquisitivo entity)
        {
            Create(entity);
        }

        public void DeleteEntity(ConfigPeriodoAquisitivo entity)
        {
            Delete(entity);
        }
    }
}
