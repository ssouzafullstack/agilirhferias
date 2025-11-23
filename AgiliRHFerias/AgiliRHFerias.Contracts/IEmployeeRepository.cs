using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Shared.RequestFeatures;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IEmployeeRepository
    {
        Task<PagedList<Employee>> GetEmployeesAsync(Guid companyId, EmployeeParameters employeeParameters, bool trackChanges);
        Task<Employee> GetEmployeeAsync(Guid companyId, Guid id, bool trackChanges);
        void CreateEmployeeForCompany(Guid companyId, Employee employee);
        void DeleteEmployee(Employee employee);
    }
}
