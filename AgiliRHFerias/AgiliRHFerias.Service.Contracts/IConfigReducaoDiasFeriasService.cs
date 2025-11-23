using AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IConfigReducaoDiasFeriasService
    {
        Task<ConfigReducaoDiasFeriasDto> GetAsync(bool trackChanges);
        Task UpdateAsync(Guid id, ConfigReducaoDiasFeriasForUpdateDto config, bool trackChanges);
    }
}
