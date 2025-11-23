using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsPeriodoAquisitivo;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class ConfigPeriodoAquisitivoService : IConfigPeriodoAquisitivoService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public ConfigPeriodoAquisitivoService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<IEnumerable<ConfigPeriodoAquisitivoDto>> GetAllAsync(bool trackChanges)
        {
            var entities = await _repository.ConfigPeriodoAquisitivo.GetAllAsync(trackChanges);
            var dtos = _mapper.Map<IEnumerable<ConfigPeriodoAquisitivoDto>>(entities);
            return dtos;
        }

        public async Task<ConfigPeriodoAquisitivoDto> GetAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            var dto = _mapper.Map<ConfigPeriodoAquisitivoDto>(entity);
            return dto;
        }

        public async Task<ConfigPeriodoAquisitivoDto> CreateAsync(ConfigPeriodoAquisitivoForCreationDto configPeriodoAquisitivo)
        {
            var entity = _mapper.Map<ConfigPeriodoAquisitivo>(configPeriodoAquisitivo);
            await GetCurrentUserAsync(entity);

            _repository.ConfigPeriodoAquisitivo.CreateEntity(entity);
            await _repository.SaveAsync();

            var configPeriodoAquisitivoToReturn = _mapper.Map<ConfigPeriodoAquisitivoDto>(entity);
            return configPeriodoAquisitivoToReturn;
        }

        public async Task UpdateAsync(Guid id, ConfigPeriodoAquisitivoForUpdateDto configPeriodoAquisitivo, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(configPeriodoAquisitivo, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);

            _repository.ConfigPeriodoAquisitivo.DeleteEntity(entity);
            await _repository.SaveAsync();
        }

        private async Task<ConfigPeriodoAquisitivo> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.ConfigPeriodoAquisitivo.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(ConfigPeriodoAquisitivo entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
