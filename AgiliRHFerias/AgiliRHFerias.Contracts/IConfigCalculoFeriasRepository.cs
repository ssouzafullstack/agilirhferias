using AgiliRHFerias.Entities.Models;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IConfigCalculoFeriasRepository
    {
        Task<ConfigCalculoFerias> GetAsync(bool trackChanges);
        Task<ConfigCalculoFerias> GetAsync(Guid id, bool trackChanges);
    }
}
