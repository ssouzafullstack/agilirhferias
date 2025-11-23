using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IFaixaReducaoDiasFeriasRepository
    {
        Task<IEnumerable<FaixaReducaoDiasFerias>> GetAsync(Guid idConfig, bool trackChanges);
    }
}
