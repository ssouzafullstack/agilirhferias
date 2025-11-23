using AgiliRHFerias.Contracts;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Empresas;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class EmpresaService : IEmpresaService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public EmpresaService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<IEnumerable<EmpresaDto>> GetAllAsync(bool trackChanges)
        {
            var entities = await _repository.Empresa.GetAllAsync(trackChanges);
            var dtos = _mapper.Map<IEnumerable<EmpresaDto>>(entities);
            return dtos;
        }
    }
}
