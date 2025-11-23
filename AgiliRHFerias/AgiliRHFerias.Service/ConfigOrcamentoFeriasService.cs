using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsOrcamentoFerias;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class ConfigOrcamentoFeriasService : IConfigOrcamentoFeriasService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public ConfigOrcamentoFeriasService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<ConfigOrcamentoFeriasDto> GetAsync(bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(trackChanges);
            var dto = _mapper.Map<ConfigOrcamentoFeriasDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, ConfigOrcamentoFeriasForUpdateDto config, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(config, entity);
            await GetCurrentUserAsync(entity);
            await UpdateFaixasOrcamentoFerias(id, config.FaixasOrcamentoFerias);
            await _repository.SaveAsync();
        }

        private async Task UpdateFaixasOrcamentoFerias(Guid idConfig, IEnumerable<FaixaOrcamentoFeriasDto> faixasOrcamentoFerias)
        {
            var entities = await _repository.FaixaOrcamentoFerias.GetAsync(idConfig, trackChanges: false);
            foreach (var dto in faixasOrcamentoFerias)
            {
                var entity = entities.FirstOrDefault(f => f.Id == dto.Id);
                if (entity is null)
                {
                    throw new EntityNotFoundException();
                }

                _mapper.Map(dto, entity);
            }
        }

        private async Task<ConfigOrcamentoFerias> GetAndCheckIfItExists(bool trackChanges)
        {
            var entitiy = await _repository.ConfigOrcamentoFerias.GetAsync(trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException();
            }
            return entitiy;
        }

        private async Task<ConfigOrcamentoFerias> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.ConfigOrcamentoFerias.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(ConfigOrcamentoFerias entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
