using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects;
using AgiliRHFerias.Shared.DataTransferObjects.Colaboradores;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var dtos = await _repository.Colaborador
                                        .FindAll(trackChanges)
                                        .ProjectTo<ColaboradorDto>(_mapper.ConfigurationProvider)
                                        .ToListAsync();
            return dtos;
        }

        public async Task<IEnumerable<ComboboxDto>> GetComboboxAsync(bool trackChanges)
        {
            var result = await _repository.Colaborador
                                          .FindAll(trackChanges)
                                          .OrderBy(c => c.Nome)
                                          .Select(c => new ComboboxDto(c.Id, c.Nome))
                                          .ToListAsync();
            return result;
        }

        public async Task<ColaboradorForUpdateDto> GetAsync(Guid id, bool trackChanges)
        {
            ColaboradorForUpdateDto dto = await _repository.Colaborador
                                                  .FindByCondition(e => e.Id.Equals(id), trackChanges)
                                                  .ProjectTo<ColaboradorForUpdateDto>(_mapper.ConfigurationProvider)
                                                  .SingleOrDefaultAsync();
            return dto;
        }

        public async Task<ColaboradorDto> CreateAsync(ColaboradorForCreationDto colaboradorForCreation)
        {
            var entity = _mapper.Map<Colaborador>(colaboradorForCreation);
            CreatePeriodoAquisitivo(entity);
            await GetCurrentUserAsync(entity);

            _repository.Colaborador.CreateEntity(entity);
            await _repository.SaveAsync();

            var dto = _mapper.Map<ColaboradorDto>(entity);
            return dto;
        }

        private void CreatePeriodoAquisitivo(Colaborador entity)
        {
            PeriodoAquisitivo periodoAquisitivo = new PeriodoAquisitivo
            {
                DataInicio = entity.DataAdmissao,
                DataFim = entity.DataAdmissao.AddDays(1).AddMonths(12),
                Situacao = SituacaoPeriodoAquisitivo.Situacao1
            };
            entity.PeriodosAquisitivos.Add(periodoAquisitivo);
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
