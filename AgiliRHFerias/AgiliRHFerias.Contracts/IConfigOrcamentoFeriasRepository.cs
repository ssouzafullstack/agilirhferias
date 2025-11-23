using AgiliRHFerias.Entities.Models;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IConfigOrcamentoFeriasRepository
    {
        Task<ConfigOrcamentoFerias> GetAsync(bool trackChanges);
        Task<ConfigOrcamentoFerias> GetAsync(Guid id, bool trackChanges);
    }
}
