using AgiliRHFerias.Shared.DataTransferObjects.ConfigsCalculoFerias;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IConfigCalculoFeriasService
    {
        Task<ConfigCalculoFeriasDto> GetAsync(bool trackChanges);
        Task UpdateAsync(Guid id, ConfigCalculoFeriasForUpdateDto configCalculoFerias, bool trackChanges);
    }
}
