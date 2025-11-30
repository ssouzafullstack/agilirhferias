using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Colaboradores;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class ColaboradorService : IColaboradorService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public ColaboradorService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<IEnumerable<ColaboradorDto>> GetAllAsync(bool trackChanges)
        {
            var entities = await _repository.Colaborador.GetAllAsync(trackChanges);
            var dtos = _mapper.Map<IEnumerable<ColaboradorDto>>(entities);
            return dtos;
        }

        public async Task<ColaboradorForUpdateDto> GetAsync(Guid id, bool trackChanges)
        {
            Colaborador entity = await _repository.Colaborador.GetAsync(id, trackChanges);
            var dto = _mapper.Map<ColaboradorForUpdateDto>(entity);
            return dto;
        }

        public async Task<ColaboradorDto> CreateAsync(ColaboradorForCreationDto colaboradorForCreation)
        {
            var entity = _mapper.Map<Colaborador>(colaboradorForCreation);
            await GetCurrentUserAsync(entity);

            _repository.Colaborador.CreateEntity(entity);
            await _repository.SaveAsync();

            var dto = _mapper.Map<ColaboradorDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, ColaboradorForUpdateDto colaboradorForUpdate, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(colaboradorForUpdate, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);

            _repository.Colaborador.DeleteEntity(entity);
            await _repository.SaveAsync();
        }

        private async Task<Colaborador> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.Colaborador.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(Colaborador entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
