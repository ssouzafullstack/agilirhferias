using AgiliRHFerias.Shared.DataTransferObjects.Colaboradores;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IColaboradorService
    {
        Task<IEnumerable<ColaboradorDto>> GetAllAsync(bool trackChanges);
        Task<ColaboradorForUpdateDto> GetAsync(Guid id, bool trackChanges);
        Task<ColaboradorDto> CreateAsync(ColaboradorForCreationDto colaboradorForCreation);
        Task UpdateAsync(Guid id, ColaboradorForUpdateDto colaboradorForUpdate, bool trackChanges);
        Task DeleteAsync(Guid id, bool trackChanges);
    }
}
