using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IAvisoFeriasRepository
    {
        Task<IEnumerable<AvisoFerias>> GetAllAsync(bool trackChanges);
        Task<AvisoFerias> GetAsync(Guid id, bool trackChanges);
        void CreateEntity(AvisoFerias entity);
        void DeleteEntity(AvisoFerias entity);
    }
}
