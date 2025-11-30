using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class AvisoFeriasRepository : RepositoryBase<AvisoFerias>, IAvisoFeriasRepository
    {
        public AvisoFeriasRepository(RepositoryContext repositoryContext)
            : base(repositoryContext) { }

        public async Task<IEnumerable<AvisoFerias>> GetAllAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .OrderBy(c => c.Situacao)
                            .ToListAsync();
        }

        public async Task<AvisoFerias> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(e => e.Id.Equals(id), trackChanges)
                         .SingleOrDefaultAsync();
        }

        public void CreateEntity(AvisoFerias entity)
        {
            Create(entity);
        }

        public void DeleteEntity(AvisoFerias entity)
        {
            Delete(entity);
        }
    }
}
