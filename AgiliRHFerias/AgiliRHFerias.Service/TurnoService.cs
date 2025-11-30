using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Turnos;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class TurnoService : ITurnoService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public TurnoService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<IEnumerable<TurnoDto>> GetAllAsync(bool trackChanges)
        {
            var entities = await _repository.Turno.GetAllAsync(trackChanges);
            var dtos = _mapper.Map<IEnumerable<TurnoDto>>(entities);
            return dtos;
        }

        public async Task<TurnoForUpdateDto> GetAsync(Guid id, bool trackChanges)
        {
            TurnoTrabalho entity = await _repository.Turno.GetAsync(id, trackChanges);
            var dto = _mapper.Map<TurnoForUpdateDto>(entity);
            return dto;
        }

        public async Task<TurnoDto> CreateAsync(TurnoForCreationDto turnoForCreation)
        {
            var entity = _mapper.Map<TurnoTrabalho>(turnoForCreation);
            await GetCurrentUserAsync(entity);

            _repository.Turno.CreateEntity(entity);
            await _repository.SaveAsync();

            var dto = _mapper.Map<TurnoDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, TurnoForUpdateDto turnoForUpdate, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(turnoForUpdate, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);

            _repository.Turno.DeleteEntity(entity);
            await _repository.SaveAsync();
        }

        private async Task<TurnoTrabalho> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.Turno.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(TurnoTrabalho entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
