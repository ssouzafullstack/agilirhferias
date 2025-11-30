using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class EscalaFeriasRepository : RepositoryBase<EscalaFerias>, IEscalaFeriasRepository
    {
        public EscalaFeriasRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<EscalaFerias>> GetAllAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .OrderBy(c => c.Situacao)
                            .ToListAsync();
        }

        public async Task<EscalaFerias> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(e => e.Id.Equals(id), trackChanges)
                         .SingleOrDefaultAsync();
        }

        public void CreateEntity(EscalaFerias entity)
        {
            Create(entity);
        }

        public void DeleteEntity(EscalaFerias entity)
        {
            Delete(entity);
        }
    }
}
