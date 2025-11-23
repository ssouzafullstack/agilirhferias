using AgiliRHFerias.Shared.DataTransferObjects.ConfigsOrcamentoFerias;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IConfigOrcamentoFeriasService
    {
        Task<ConfigOrcamentoFeriasDto> GetAsync(bool trackChanges);
        Task UpdateAsync(Guid id, ConfigOrcamentoFeriasForUpdateDto config, bool trackChanges);
    }
}
