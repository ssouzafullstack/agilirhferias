using AgiliRHFerias.Shared.DataTransferObjects;
using AgiliRHFerias.Shared.DataTransferObjects.Empresas;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IEmpresaService
    {
        Task<IEnumerable<EmpresaDto>> GetAllAsync(bool trackChanges);
        Task<IEnumerable<ComboboxDto>> GetComboboxAsync(bool trackChanges);
        Task<EmpresaForUpdateDto> GetAsync(Guid id, bool trackChanges);
        Task<EmpresaDto> CreateAsync(EmpresaForCreationDto empresaForCreation);
        Task UpdateAsync(Guid id, EmpresaForUpdateDto empresaForUpdate, bool trackChanges);
        Task DeleteAsync(Guid id, bool trackChanges);
    }
}
