using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.EscalasFerias;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class EscalaFeriasService : IEscalaFeriasService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public EscalaFeriasService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }
        public async Task<IEnumerable<EscalaFeriasDto>> GetAllAsync(bool trackChanges)
        {
            var entities = await _repository.EscalaFerias.GetAllAsync(trackChanges);
            var dtos = _mapper.Map<IEnumerable<EscalaFeriasDto>>(entities);
            return dtos;
        }

        public async Task<EscalaFeriasForUpdateDto> GetAsync(Guid id, bool trackChanges)
        {
            EscalaFerias entity = await _repository.EscalaFerias.GetAsync(id, trackChanges);
            var dto = _mapper.Map<EscalaFeriasForUpdateDto>(entity);
            return dto;
        }

        public async Task<EscalaFeriasDto> CreateAsync(EscalaFeriasForCreationDto escalaFeriasForCreation)
        {
            var entity = _mapper.Map<EscalaFerias>(escalaFeriasForCreation);
            await GetCurrentUserAsync(entity);

            _repository.EscalaFerias.CreateEntity(entity);
            await _repository.SaveAsync();

            var dto = _mapper.Map<EscalaFeriasDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, EscalaFeriasForUpdateDto escalaFeriasForUpdate, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(escalaFeriasForUpdate, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);

            _repository.EscalaFerias.DeleteEntity(entity);
            await _repository.SaveAsync();
        }

        private async Task<EscalaFerias> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.EscalaFerias.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(EscalaFerias entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
