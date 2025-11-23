using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IFaixaOrcamentoFeriasRepository
    {
        Task<IEnumerable<FaixaOrcamentoFerias>> GetAsync(Guid idConfig, bool trackChanges);
    }
}
