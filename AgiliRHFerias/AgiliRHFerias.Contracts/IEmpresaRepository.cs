using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IEmpresaRepository
    {
        Task<IEnumerable<Empresa>> GetAllAsync(bool trackChanges);
        Task<Empresa> GetAsync(Guid id, bool trackChanges);
        void CreateEntity(Empresa entity);
        void DeleteEntity(Empresa entity);
    }
}
