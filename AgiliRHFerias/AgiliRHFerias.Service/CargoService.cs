using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Cargos;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class CargoService : ICargoService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContext;

        public CargoService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, IUserContextService userContext)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userContext = userContext;
        }

        public async Task<IEnumerable<CargoDto>> GetAllAsync(bool trackChanges)
        {
            var entities = await _repository.Cargo.GetAllAsync(trackChanges);
            var dtos = _mapper.Map<IEnumerable<CargoDto>>(entities);
            return dtos;
        }

        public async Task<CargoForUpdateDto> GetAsync(Guid id, bool trackChanges)
        {
            Cargo entity = await _repository.Cargo.GetAsync(id, trackChanges);
            var dto = _mapper.Map<CargoForUpdateDto>(entity);
            return dto;
        }

        public async Task<CargoDto> CreateAsync(CargoForCreationDto cargoForCreation)
        {
            var entity = _mapper.Map<Cargo>(cargoForCreation);
            await GetCurrentUserAsync(entity);

            _repository.Cargo.CreateEntity(entity);
            await _repository.SaveAsync();

            var dto = _mapper.Map<CargoDto>(entity);
            return dto;
        }

        public async Task UpdateAsync(Guid id, CargoForUpdateDto cargoForUpdate, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(cargoForUpdate, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);

            _repository.Cargo.DeleteEntity(entity);
            await _repository.SaveAsync();
        }

        private async Task<Cargo> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.Cargo.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(Cargo entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
