using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsCalculoFerias;
using AutoMapper;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class ConfigCalculoFeriasService : IConfigCalculoFeriasService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public ConfigCalculoFeriasService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<ConfigCalculoFeriasDto> GetAsync(bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(trackChanges);
            var dto = _mapper.Map<ConfigCalculoFeriasDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, ConfigCalculoFeriasForUpdateDto configCalculoFerias, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(configCalculoFerias, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        private async Task<ConfigCalculoFerias> GetAndCheckIfItExists(bool trackChanges)
        {
            var entitiy = await _repository.ConfigCalculoFerias.GetAsync(trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException();
            }
            return entitiy;
        }

        private async Task<ConfigCalculoFerias> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.ConfigCalculoFerias.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(ConfigCalculoFerias entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
