using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface ICargoRepository : IRepositoryBase<Cargo>
    {
        Task<IEnumerable<Cargo>> GetAllAsync(bool trackChanges);
        Task<Cargo> GetAsync(Guid id, bool trackChanges);
        void CreateEntity(Cargo entity);
        void DeleteEntity(Cargo entity);
    }
}
