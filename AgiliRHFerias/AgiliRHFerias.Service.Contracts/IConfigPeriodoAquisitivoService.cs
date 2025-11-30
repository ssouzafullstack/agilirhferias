using AgiliRHFerias.Shared.DataTransferObjects;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsPeriodoAquisitivo;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IConfigPeriodoAquisitivoService
    {
        Task<IEnumerable<ConfigPeriodoAquisitivoDto>> GetAllAsync(bool trackChanges);
        Task<IEnumerable<ComboboxDto>> GetComboboxAsync(bool trackChanges);
        Task<ConfigPeriodoAquisitivoDto> GetAsync(Guid id, bool trackChanges);
        Task<ConfigPeriodoAquisitivoDto> CreateAsync(ConfigPeriodoAquisitivoForCreationDto configPeriodoAquisitivo);
        Task UpdateAsync(Guid id, ConfigPeriodoAquisitivoForUpdateDto configPeriodoAquisitivo, bool trackChanges);
        Task DeleteAsync(Guid id, bool trackChanges);
    }
}
