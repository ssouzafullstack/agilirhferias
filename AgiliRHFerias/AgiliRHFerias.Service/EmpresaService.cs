using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Empresas;
using AutoMapper;
using System;
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

        public async Task<EmpresaForUpdateDto> GetAsync(Guid id, bool trackChanges)
        {
            Empresa entity = await _repository.Empresa.GetAsync(id, trackChanges);
            var dto = _mapper.Map<EmpresaForUpdateDto>(entity);
            return dto;
        }

        public async Task<EmpresaDto> CreateAsync(EmpresaForCreationDto empresaForCreation)
        {
            var entity = _mapper.Map<Empresa>(empresaForCreation);
            await GetCurrentUserAsync(entity);

            _repository.Empresa.CreateEntity(entity);
            await _repository.SaveAsync();

            var empresaToReturn = _mapper.Map<EmpresaDto>(entity);
            return empresaToReturn;
        }

        public async Task UpdateAsync(Guid id, EmpresaForUpdateDto empresaForUpdate, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);
            _mapper.Map(empresaForUpdate, entity);
            await GetCurrentUserAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(Guid id, bool trackChanges)
        {
            var entity = await GetAndCheckIfItExists(id, trackChanges);

            _repository.Empresa.DeleteEntity(entity);
            await _repository.SaveAsync();
        }

        private async Task<Empresa> GetAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var entitiy = await _repository.Empresa.GetAsync(id, trackChanges);
            if (entitiy is null)
            {
                throw new EntityNotFoundException(id);
            }
            return entitiy;
        }

        private async Task GetCurrentUserAsync(Empresa entity)
        {
            var user = await _userContext.GetCurrentUserAsync();
            entity.User = user;
            entity.UltimaAlteracao = DateTime.Now;
        }
    }
}
