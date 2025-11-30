using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class TurnoRepository : RepositoryBase<TurnoTrabalho>, ITurnoRepository
    {
        public TurnoRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<FaixaTurnoTrabalho>> GetAllAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .Include(t => t.FaixasTurnoTrabalho)
                            .OrderBy(t => t.UltimaAlteracao)
                            .SelectMany(t => t.FaixasTurnoTrabalho)
                            .ToListAsync();
        }

        public async Task<TurnoTrabalho> GetAsync(Guid id, bool trackChanges)
        {
            return await FindByCondition(e => e.Id.Equals(id), trackChanges)
                         .SingleOrDefaultAsync();
        }

        public void CreateEntity(TurnoTrabalho entity)
        {
            Create(entity);
        }

        public void DeleteEntity(TurnoTrabalho entity)
        {
            Delete(entity);
        }
    }
}
