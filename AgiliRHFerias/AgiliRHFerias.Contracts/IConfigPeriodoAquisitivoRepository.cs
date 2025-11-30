using AgiliRHFerias.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IConfigPeriodoAquisitivoRepository : IRepositoryBase<ConfigPeriodoAquisitivo>
    {
        Task<IEnumerable<ConfigPeriodoAquisitivo>> GetAllAsync(bool trackChanges);
        Task<ConfigPeriodoAquisitivo> GetAsync(Guid id, bool trackChanges);
        void CreateEntity(ConfigPeriodoAquisitivo entity);
        void DeleteEntity(ConfigPeriodoAquisitivo entity);
    }
}
