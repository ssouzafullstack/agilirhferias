using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class FaixaOrcamentoFeriasRepository : RepositoryBase<FaixaOrcamentoFerias>, IFaixaOrcamentoFeriasRepository
    {
        public FaixaOrcamentoFeriasRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<FaixaOrcamentoFerias>> GetAsync(Guid idConfig, bool trackChanges)
        {
            return await FindByCondition(e => e.IdConfigOrcamentoFerias.Equals(idConfig), trackChanges)
                            .ToListAsync();
        }
    }
}
