using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class EmpresaRepository : RepositoryBase<Empresa>, IEmpresaRepository
    {
        public EmpresaRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Empresa>> GetAllAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .OrderBy(c => c.Situacao)
                            .ToListAsync();
        }

        public async Task<Empresa> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(e => e.Id.Equals(id), trackChanges)
                         .SingleOrDefaultAsync();
        }

        public void CreateEntity(Empresa entity)
        {
            Create(entity);
        }

        public void DeleteEntity(Empresa entity)
        {
            Delete(entity);
        }
    }
}
