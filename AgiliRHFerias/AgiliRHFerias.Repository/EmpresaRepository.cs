using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public class EmpresaRepository : RepositoryBase<Empresa>, IEmpresaRepository
    {
        public EmpresaRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Empresa>> GetAllAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                            .OrderBy(c => c.Situacao)
                            .ToListAsync();
        }
    }
}
