using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Shared.DataTransferObjects;
using AgiliRHFerias.Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IEmployeeService
    {
        Task<(IEnumerable<EmployeeDto> employees, MetaData metaData)> GetEmployeesAsync(Guid companyId, EmployeeParameters employeeParameters, bool trackChanges);
        Task<EmployeeDto> GetEmployeeAsync(Guid companyId, Guid id, bool trackChanges);
        Task<EmployeeDto> CreateEmployeeForCompanyAsync(Guid companyId, EmployeeForCreationDto employeeForCreation, bool trackChanges);
        Task DeleteEmployeeForCompanyAsync(Guid companyId, Guid id, bool trackChanges);
        Task UpdateEmployeeForCompanyAsync(Guid companyId, Guid id, EmployeeForUpdateDto employeeForUpdate, bool compTrackChanges, bool empTrackChanges);
        Task<(EmployeeForUpdateDto employeeToPatch, Employee employeeEntity)> GetEmployeeForPatchAsync(Guid companyId, Guid id, bool compTrackChanges, bool empTrackChanges);
        Task SaveChangesForPatchAsync(EmployeeForUpdateDto employeeToPatch, Employee employeeEntity);
    }
}
