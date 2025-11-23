using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class ConfigReducaoDiasFeriasService : IConfigReducaoDiasFeriasService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public ConfigReducaoDiasFeriasService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<ConfigReducaoDiasFeriasDto> GetAsync(bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(trackChanges);
            var dto = _mapper.Map<ConfigReducaoDiasFeriasDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, ConfigReducaoDiasFeriasForUpdateDto config, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(config, entity);
            await GetCurrentUserAsync(entity);
            await UpdateFaixasReducaoDiasFerias(id, config.FaixasReducaoDiasFerias);
            await _repository.SaveAsync();
        }

        private async Task UpdateFaixasReducaoDiasFerias(Guid idConfig, IEnumerable<FaixaReducaoDiasFeriasDto> faixasReducaoDiasFerias)
        {
            var entities = await _repository.FaixaReducaoDiasFerias.GetAsync(idConfig, trackChanges: false);
            foreach (var dto in faixasReducaoDiasFerias)
            {
                var entity = entities.FirstOrDefault(f => f.Id == dto.Id);
                if (entity is null)
                {
                    throw new EntityNotFoundException();
                }

                _mapper.Map(dto, entity);
            }
        }

        private async Task<ConfigReducaoDiasFerias> GetAndCheckIfItExists(bool trackChanges)
        {
            var entitiy = await _repository.ConfigReducaoDiasFerias.GetAsync(trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException();
            }
            return entitiy;
        }

        private async Task<ConfigReducaoDiasFerias> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.ConfigReducaoDiasFerias.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(ConfigReducaoDiasFerias entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.UserId = user.Id;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
