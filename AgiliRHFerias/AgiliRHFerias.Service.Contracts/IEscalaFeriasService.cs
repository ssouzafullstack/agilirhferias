using AgiliRHFerias.Shared.DataTransferObjects.EscalasFerias;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IEscalaFeriasService
    {
        Task<IEnumerable<EscalaFeriasDto>> GetAllAsync(bool trackChanges);
        Task<EscalaFeriasForUpdateDto> GetAsync(Guid id, bool trackChanges);
        Task<EscalaFeriasDto> CreateAsync(EscalaFeriasForCreationDto escalaFeriasForCreation);
        Task UpdateAsync(Guid id, EscalaFeriasForUpdateDto escalaFeriasForUpdate, bool trackChanges);
        Task DeleteAsync(Guid id, bool trackChanges);
    }
}
