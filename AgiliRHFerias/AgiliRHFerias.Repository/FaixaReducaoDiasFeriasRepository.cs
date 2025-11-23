using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class FaixaReducaoDiasFeriasRepository : RepositoryBase<FaixaReducaoDiasFerias>, IFaixaReducaoDiasFeriasRepository
    {
        public FaixaReducaoDiasFeriasRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<FaixaReducaoDiasFerias>> GetAsync(Guid idConfig, bool trackChanges)
        {
            return await FindByCondition(e => e.IdConfigReducaoDiasFerias.Equals(idConfig), trackChanges)
                            .ToListAsync();
        }
    }
}
