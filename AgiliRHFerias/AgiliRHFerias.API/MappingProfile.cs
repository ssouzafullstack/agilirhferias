using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Shared.DataTransferObjects;
using AgiliRHFerias.Shared.DataTransferObjects.Authentication;
using AgiliRHFerias.Shared.DataTransferObjects.AvisosFerias;
using AgiliRHFerias.Shared.DataTransferObjects.Cargos;
using AgiliRHFerias.Shared.DataTransferObjects.Colaboradores;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsCalculoFerias;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsOrcamentoFerias;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsPeriodoAquisitivo;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias;
using AgiliRHFerias.Shared.DataTransferObjects.Empresas;
using AgiliRHFerias.Shared.DataTransferObjects.EscalasFerias;
using AgiliRHFerias.Shared.DataTransferObjects.Turnos;
using AutoMapper;
using System;
using System.Linq;

namespace AgiliRHFerias.WebAPI
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserForRegistrationDto, User>();

            CreateMap<Company, CompanyDto>()
                .ForMember(c => c.FullAddress,
                    opt => opt.MapFrom(x => string.Join(' ', x.Address, x.Country)));
            CreateMap<CompanyForCreationDto, Company>();
            CreateMap<CompanyForUpdateDto, Company>();

            CreateMap<Employee, EmployeeDto>();
            CreateMap<EmployeeForCreationDto, Employee>();
            CreateMap<EmployeeForUpdateDto, Employee>().ReverseMap();

            CreateMap<ConfigPeriodoAquisitivo, ConfigPeriodoAquisitivoDto>();
            CreateMap<ConfigPeriodoAquisitivoForCreationDto, ConfigPeriodoAquisitivo>();
            CreateMap<ConfigPeriodoAquisitivoForUpdateDto, ConfigPeriodoAquisitivo>();

            CreateMap<ConfigCalculoFerias, ConfigCalculoFeriasDto>();
            CreateMap<ConfigCalculoFeriasForUpdateDto, ConfigCalculoFerias>();

            CreateMap<ConfigReducaoDiasFerias, ConfigReducaoDiasFeriasDto>();
            CreateMap<FaixaReducaoDiasFerias, FaixaReducaoDiasFeriasDto>().ReverseMap();
            CreateMap<ConfigReducaoDiasFeriasForUpdateDto, ConfigReducaoDiasFerias>();

            CreateMap<ConfigOrcamentoFerias, ConfigOrcamentoFeriasDto>()
                .ForMember(dest => dest.FaixasOrcamentoFerias,
                    opt => opt.MapFrom(src => src.FaixasOrcamentoFerias.OrderBy(f => f.Mes)));
            CreateMap<FaixaOrcamentoFerias, FaixaOrcamentoFeriasDto>().ReverseMap();
            CreateMap<ConfigOrcamentoFeriasForUpdateDto, ConfigOrcamentoFerias>();

            CreateMap<Empresa, EmpresaDto>();
            CreateMap<EmpresaForCreationDto, Empresa>();
            CreateMap<EmpresaForUpdateDto, Empresa>().ReverseMap();

            CreateMap<Cargo, CargoDto>();
            CreateMap<CargoForCreationDto, Cargo>();
            CreateMap<CargoForUpdateDto, Cargo>().ReverseMap();

            CreateMap<FaixaTurnoTrabalho, TurnoDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UltimaAlteracao, opt => opt.MapFrom(src => src.TurnoTrabalho.UltimaAlteracao));

            CreateMap<TurnoDto, FaixaTurnoTrabalho>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.TurnoTrabalho, opt => opt.Ignore())
                .ForMember(dest => dest.IdTurnoTrabalho, opt => opt.Ignore());
            CreateMap<TurnoForCreationDto, FaixaTurnoTrabalho>();
            CreateMap<TurnoForUpdateDto, FaixaTurnoTrabalho>().ReverseMap();


            CreateMap<Colaborador, ColaboradorDto>()
            .ForMember(d => d.InicioPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodosAquisitivos
                .Where(pa => pa.Situacao == SituacaoPeriodoAquisitivo.Situacao1)
                .Select(pa => (DateTime?)pa.DataInicio)
                .FirstOrDefault()
            ))
            .ForMember(d => d.FimPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodosAquisitivos
                .Where(pa => pa.Situacao == SituacaoPeriodoAquisitivo.Situacao1)
                .Select(pa => (DateTime?)pa.DataFim)
                .FirstOrDefault()
            ));
            CreateMap<Colaborador, ColaboradorForUpdateDto>()
            .ForMember(d => d.CargoDesc, opt => opt.MapFrom(s => s.Cargo.Descricao))
            .ForMember(d => d.EmpresaDesc, opt => opt.MapFrom(s => s.Empresa.RazaoSocial))
            .ForMember(d => d.ConfigPeriodoAquisitivoDesc, opt => opt.MapFrom(s => s.ConfigPeriodoAquisitivo.Descricao))
            .ForMember(d => d.InicioPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodosAquisitivos
                .Where(pa => pa.Situacao == SituacaoPeriodoAquisitivo.Situacao1)
                .Select(pa => (DateTime?)pa.DataInicio)
                .FirstOrDefault()
            ))
            .ForMember(d => d.FimPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodosAquisitivos
                .Where(pa => pa.Situacao == SituacaoPeriodoAquisitivo.Situacao1)
                .Select(pa => (DateTime?)pa.DataFim)
                .FirstOrDefault()
            ));
            CreateMap<ColaboradorForUpdateDto, Colaborador>();
            CreateMap<ColaboradorForCreationDto, Colaborador>();

            CreateMap<EscalaFerias, EscalaFeriasDto>()
            .ForMember(d => d.IdColaborador, opt => opt.MapFrom(s => s.PeriodoAquisitivo.Colaborador.Id))
            .ForMember(d => d.NomeColaborador, opt => opt.MapFrom(s => s.PeriodoAquisitivo.Colaborador.Nome))
            .ForMember(d => d.DataAdmissao, opt => opt.MapFrom(s => s.PeriodoAquisitivo.Colaborador.DataAdmissao))
            .ForMember(d => d.InicioPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodoAquisitivo.DataInicio))
            .ForMember(d => d.FimPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodoAquisitivo.DataFim));
            CreateMap<EscalaFeriasForCreationDto, EscalaFerias>();
            CreateMap<EscalaFerias, EscalaFeriasForUpdateDto>()
                .ForMember(d => d.IdColaborador, opt => opt.MapFrom(s => s.PeriodoAquisitivo.Colaborador.Id))
                .ForMember(d => d.NomeColaborador, opt => opt.MapFrom(s => s.PeriodoAquisitivo.Colaborador.Nome))
            .ForMember(d => d.DataAdmissao, opt => opt.MapFrom(s => s.PeriodoAquisitivo.Colaborador.DataAdmissao))
            .ForMember(d => d.InicioPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodoAquisitivo.DataInicio))
            .ForMember(d => d.FimPeriodoAquisitivo, opt => opt.MapFrom(s => s.PeriodoAquisitivo.DataFim));
            CreateMap<EscalaFeriasForUpdateDto, EscalaFerias>();

            CreateMap<AvisoFerias, AvisoFeriasDto>()
            .ForMember(d => d.IdColaborador, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.Colaborador.Id))
            .ForMember(d => d.NomeColaborador, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.Colaborador.Nome))
            .ForMember(d => d.DataAdmissao, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.Colaborador.DataAdmissao))
            .ForMember(d => d.InicioPeriodoAquisitivo, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.DataInicio))
            .ForMember(d => d.FimPeriodoAquisitivo, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.DataFim))
            .ForMember(d => d.NumeroDiasAbono, opt => opt.MapFrom(s => s.EscalaFerias.NumeroDiasAbono))
            .ForMember(d => d.NumeroDiasGozo, opt => opt.MapFrom(s => s.EscalaFerias.NumeroDiasGozo))
            .ForMember(d => d.InicioFerias, opt => opt.MapFrom(s => s.EscalaFerias.InicioFerias))
            .ForMember(d => d.FimFerias, opt => opt.MapFrom(s => s.EscalaFerias.FimFerias));
            CreateMap<AvisoFeriasForCreationDto, AvisoFerias>();
            CreateMap<AvisoFerias, AvisoFeriasForUpdateDto>()
            .ForMember(d => d.IdColaborador, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.Colaborador.Id))
            .ForMember(d => d.NomeColaborador, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.Colaborador.Nome))
            .ForMember(d => d.DataAdmissao, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.Colaborador.DataAdmissao))
            .ForMember(d => d.InicioPeriodoAquisitivo, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.DataInicio))
            .ForMember(d => d.FimPeriodoAquisitivo, opt => opt.MapFrom(s => s.EscalaFerias.PeriodoAquisitivo.DataFim))
            .ForMember(d => d.NumeroDiasAbono, opt => opt.MapFrom(s => s.EscalaFerias.NumeroDiasAbono))
            .ForMember(d => d.NumeroDiasGozo, opt => opt.MapFrom(s => s.EscalaFerias.NumeroDiasGozo))
            .ForMember(d => d.InicioFerias, opt => opt.MapFrom(s => s.EscalaFerias.InicioFerias))
            .ForMember(d => d.FimFerias, opt => opt.MapFrom(s => s.EscalaFerias.FimFerias));


            CreateMap<AvisoFeriasForUpdateDto, AvisoFerias>();
        }
    }
}
