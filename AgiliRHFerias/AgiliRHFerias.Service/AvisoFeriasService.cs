using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.AvisosFerias;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class AvisoFeriasService : IAvisoFeriasService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public AvisoFeriasService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }
        public async Task<IEnumerable<AvisoFeriasDto>> GetAllAsync(bool trackChanges)
        {
            var entities = await _repository.AvisoFerias.GetAllAsync(trackChanges);
            var dtos = _mapper.Map<IEnumerable<AvisoFeriasDto>>(entities);
            return dtos;
        }

        public async Task<AvisoFeriasForUpdateDto> GetAsync(Guid id, bool trackChanges)
        {
            AvisoFerias entity = await _repository.AvisoFerias.GetAsync(id, trackChanges);
            var dto = _mapper.Map<AvisoFeriasForUpdateDto>(entity);
            return dto;
        }

        public async Task<AvisoFeriasDto> CreateAsync(AvisoFeriasForCreationDto avisoFeriasForCreation)
        {
            var entity = _mapper.Map<AvisoFerias>(avisoFeriasForCreation);
            await GetCurrentUserAsync(entity);

            _repository.AvisoFerias.CreateEntity(entity);
            await _repository.SaveAsync();

            var dto = _mapper.Map<AvisoFeriasDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, AvisoFeriasForUpdateDto avisoFeriasForUpdate, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(avisoFeriasForUpdate, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);

            _repository.AvisoFerias.DeleteEntity(entity);
            await _repository.SaveAsync();
        }

        private async Task<AvisoFerias> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.AvisoFerias.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(AvisoFerias entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
