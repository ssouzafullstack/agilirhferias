using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface ITurnoRepository
    {
        Task<IEnumerable<FaixaTurnoTrabalho>> GetAllAsync(bool trackChanges);
        Task<TurnoTrabalho> GetAsync(Guid id, bool trackChanges);
        void CreateEntity(TurnoTrabalho entity);
        void DeleteEntity(TurnoTrabalho entity);
    }
}
