using AgiliRHFerias.Shared.DataTransferObjects.AvisosFerias;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IAvisoFeriasService
    {
        Task<IEnumerable<AvisoFeriasDto>> GetAllAsync(bool trackChanges);
        Task<AvisoFeriasForUpdateDto> GetAsync(Guid id, bool trackChanges);
        Task<AvisoFeriasDto> CreateAsync(AvisoFeriasForCreationDto avisoFeriasForCreation);
        Task UpdateAsync(Guid id, AvisoFeriasForUpdateDto avisoFeriasForUpdate, bool trackChanges);
        Task DeleteAsync(Guid id, bool trackChanges);
    }
}
