using AgiliRHFerias.Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IEmpresaRepository
    {
        Task<IEnumerable<Empresa>> GetAllAsync(bool trackChanges);
    }
}
