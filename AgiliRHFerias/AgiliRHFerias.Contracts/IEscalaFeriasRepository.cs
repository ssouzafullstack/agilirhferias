using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IEscalaFeriasRepository
    {
        Task<IEnumerable<EscalaFerias>> GetAllAsync(bool trackChanges);
        Task<EscalaFerias> GetAsync(Guid id, bool trackChanges);
        void CreateEntity(EscalaFerias entity);
        void DeleteEntity(EscalaFerias entity);
    }
}
