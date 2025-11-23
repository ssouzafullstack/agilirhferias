using AgiliRHFerias.Entities.Models;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IConfigReducaoDiasFeriasRepository
    {
        Task<ConfigReducaoDiasFerias> GetAsync(bool trackChanges);
        Task<ConfigReducaoDiasFerias> GetAsync(Guid id, bool trackChanges);
    }
}
