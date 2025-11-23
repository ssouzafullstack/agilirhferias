using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Shared.DataTransferObjects;
using AgiliRHFerias.Shared.DataTransferObjects.Authentication;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsCalculoFerias;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsOrcamentoFerias;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsPeriodoAquisitivo;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias;
using AgiliRHFerias.Shared.DataTransferObjects.Empresas;
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

        }
    }
}
