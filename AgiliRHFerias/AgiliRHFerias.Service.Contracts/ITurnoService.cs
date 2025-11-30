using AgiliRHFerias.Shared.DataTransferObjects.Turnos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface ITurnoService
    {
        Task<IEnumerable<TurnoDto>> GetAllAsync(bool trackChanges);
        Task<TurnoForUpdateDto> GetAsync(Guid id, bool trackChanges);
        Task<TurnoDto> CreateAsync(TurnoForCreationDto turnoForCreation);
        Task UpdateAsync(Guid id, TurnoForUpdateDto turnoForUpdate, bool trackChanges);
        Task DeleteAsync(Guid id, bool trackChanges);
    }
}
