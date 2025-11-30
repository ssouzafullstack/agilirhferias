using AgiliRHFerias.Shared.DataTransferObjects.Cargos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface ICargoService
    {
        Task<IEnumerable<CargoDto>> GetAllAsync(bool trackChanges);
        Task<CargoForUpdateDto> GetAsync(Guid id, bool trackChanges);
        Task<CargoDto> CreateAsync(CargoForCreationDto cargoForCreation);
        Task UpdateAsync(Guid id, CargoForUpdateDto cargoForUpdate, bool trackChanges);
        Task DeleteAsync(Guid id, bool trackChanges);
    }
}
