using AgiliRHFerias.Shared.DataTransferObjects.Empresas;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IEmpresaService
    {
        Task<IEnumerable<EmpresaDto>> GetAllAsync(bool trackChanges);
    }
}
