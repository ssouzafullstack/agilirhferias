using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;

namespace AgiliRHFerias.Service
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<ICompanyService> _companyService;
        private readonly Lazy<IEmployeeService> _employeeService;
        private readonly Lazy<IAuthenticationService> _authenticationService;
        private readonly Lazy<IConfigPeriodoAquisitivoService> _configPeriodoAquisitivoService;
        private readonly Lazy<IConfigCalculoFeriasService> _configCalculoFeriasService;
        private readonly Lazy<IConfigReducaoDiasFeriasService> _configReducaoDiasFeriasService;
        private readonly Lazy<IConfigOrcamentoFeriasService> _configOrcamentoFeriasService;
        private readonly Lazy<IEmpresaService> _empresaService;
        private readonly Lazy<ICargoService> _cargoService;
        private readonly Lazy<ITurnoService> _turnoService;
        private readonly Lazy<IColaboradorService> _colaboradorService;
        private readonly Lazy<IEscalaFeriasService> _escalaFeriasService;
        private readonly Lazy<IAvisoFeriasService> _avisoFeriasService;

        public ServiceManager(IRepositoryManager repositoryManager, ILoggerManager logger, IMapper mapper, UserManager<User> userManager, IConfiguration configuration, IUserContextService userContextService)
        {
            _companyService = new Lazy<ICompanyService>(() => new CompanyService(repositoryManager, logger, mapper));
            _employeeService = new Lazy<IEmployeeService>(() => new EmployeeService(repositoryManager, logger, mapper));
            _authenticationService = new Lazy<IAuthenticationService>(() => new AuthenticationService(logger, mapper, userManager, configuration));
            _configPeriodoAquisitivoService = new Lazy<IConfigPeriodoAquisitivoService>(() => new ConfigPeriodoAquisitivoService(repositoryManager, logger, mapper, userContextService));
            _configCalculoFeriasService = new Lazy<IConfigCalculoFeriasService>(() => new ConfigCalculoFeriasService(repositoryManager, logger, mapper, userContextService));
            _configReducaoDiasFeriasService = new Lazy<IConfigReducaoDiasFeriasService>(() => new ConfigReducaoDiasFeriasService(repositoryManager, logger, mapper, userContextService));
            _configOrcamentoFeriasService = new Lazy<IConfigOrcamentoFeriasService>(() => new ConfigOrcamentoFeriasService(repositoryManager, logger, mapper, userContextService));
            _empresaService = new Lazy<IEmpresaService>(() => new EmpresaService(repositoryManager, logger, mapper, userContextService));
            _cargoService = new Lazy<ICargoService>(() => new CargoService(repositoryManager, logger, mapper, userContextService));
            _turnoService = new Lazy<ITurnoService>(() => new TurnoService(repositoryManager, logger, mapper, userContextService));
            _colaboradorService = new Lazy<IColaboradorService>(() => new ColaboradorService(repositoryManager, logger, mapper, userContextService));
            _escalaFeriasService = new Lazy<IEscalaFeriasService>(() => new EscalaFeriasService(repositoryManager, logger, mapper, userContextService));
            _avisoFeriasService = new Lazy<IAvisoFeriasService>(() => new AvisoFeriasService(repositoryManager, logger, mapper, userContextService));
        }

        public ICompanyService CompanyService => _companyService.Value;
        public IEmployeeService EmployeeService => _employeeService.Value;
        public IAuthenticationService AuthenticationService => _authenticationService.Value;
        public IConfigPeriodoAquisitivoService ConfigPeriodoAquisitivoService => _configPeriodoAquisitivoService.Value;
        public IConfigCalculoFeriasService ConfigCalculoFeriasService => _configCalculoFeriasService.Value;
        public IConfigReducaoDiasFeriasService ConfigReducaoDiasFeriasService => _configReducaoDiasFeriasService.Value;
        public IConfigOrcamentoFeriasService ConfigOrcamentoFeriasService => _configOrcamentoFeriasService.Value;
        public IEmpresaService EmpresaService => _empresaService.Value;
        public ICargoService CargoService => _cargoService.Value;
        public ITurnoService TurnoService => _turnoService.Value;
        public IColaboradorService ColaboradorService => _colaboradorService.Value;
        public IEscalaFeriasService EscalaFeriasService => _escalaFeriasService.Value;
        public IAvisoFeriasService AvisoFeriasService => _avisoFeriasService.Value;
    }
}
