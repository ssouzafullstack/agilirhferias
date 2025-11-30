using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IColaboradorRepository : IRepositoryBase<Colaborador>
    {
        Task<IEnumerable<Colaborador>> GetAllAsync(bool trackChanges);
        Task<Colaborador> GetAsync(Guid id, bool trackChanges);
        void CreateEntity(Colaborador entity);
        void DeleteEntity(Colaborador entity);
    }
}
