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
                .ForMember(dest => dest.UltimaAlteracao,
                           opt => opt.MapFrom(src => src.TurnoTrabalho.UltimaAlteracao));

            CreateMap<TurnoDto, FaixaTurnoTrabalho>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.TurnoTrabalho, opt => opt.Ignore())
                .ForMember(dest => dest.IdTurnoTrabalho, opt => opt.Ignore());
            CreateMap<TurnoForCreationDto, FaixaTurnoTrabalho>();
            CreateMap<TurnoForUpdateDto, FaixaTurnoTrabalho>().ReverseMap();


            CreateMap<Colaborador, ColaboradorDto>();
            CreateMap<ColaboradorForCreationDto, Colaborador>();
            CreateMap<ColaboradorForUpdateDto, Colaborador>().ReverseMap();

            CreateMap<EscalaFerias, EscalaFeriasDto>();
            CreateMap<EscalaFeriasForCreationDto, EscalaFerias>();
            CreateMap<EscalaFeriasForUpdateDto, EscalaFerias>().ReverseMap();

            CreateMap<AvisoFerias, AvisoFeriasDto>();
            CreateMap<AvisoFeriasForCreationDto, AvisoFerias>();
            CreateMap<AvisoFeriasForUpdateDto, AvisoFerias>().ReverseMap();
        }
    }
}
