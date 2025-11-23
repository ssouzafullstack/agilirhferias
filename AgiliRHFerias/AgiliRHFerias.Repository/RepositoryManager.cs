using AgiliRHFerias.Contracts;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Repository
{
    public sealed class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly Lazy<ICompanyRepository> _companyRepository;
        private readonly Lazy<IEmployeeRepository> _employeeRepository;
        private readonly Lazy<IConfigPeriodoAquisitivoRepository> _configPeriodoAquisitivoRepository;
        private readonly Lazy<IConfigCalculoFeriasRepository> _configCalculoFeriasRepository;
        private readonly Lazy<IConfigReducaoDiasFeriasRepository> _configReducaoDiasFeriasRepository;
        private readonly Lazy<IFaixaReducaoDiasFeriasRepository> _faixaReducaoDiasFeriasRepository;
        private readonly Lazy<IConfigOrcamentoFeriasRepository> _configOrcamentoFeriasRepository;
        private readonly Lazy<IFaixaOrcamentoFeriasRepository> _faixaOrcamentoFeriasRepository;
        private readonly Lazy<IEmpresaRepository> _empresaRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _companyRepository = new Lazy<ICompanyRepository>(() => new CompanyRepository(repositoryContext));
            _employeeRepository = new Lazy<IEmployeeRepository>(() => new EmployeeRepository(repositoryContext));
            _configPeriodoAquisitivoRepository = new Lazy<IConfigPeriodoAquisitivoRepository>(() => new ConfigPeriodoAquisitivoRepository(repositoryContext));
            _configCalculoFeriasRepository = new Lazy<IConfigCalculoFeriasRepository>(() => new ConfigCalculoFeriasRepository(repositoryContext));
            _configReducaoDiasFeriasRepository = new Lazy<IConfigReducaoDiasFeriasRepository>(() => new ConfigReducaoDiasFeriasRepository(repositoryContext));
            _faixaReducaoDiasFeriasRepository = new Lazy<IFaixaReducaoDiasFeriasRepository>(() => new FaixaReducaoDiasFeriasRepository(repositoryContext));
            _configOrcamentoFeriasRepository = new Lazy<IConfigOrcamentoFeriasRepository>(() => new ConfigOrcamentoFeriasRepository(repositoryContext));
            _faixaOrcamentoFeriasRepository = new Lazy<IFaixaOrcamentoFeriasRepository>(() => new FaixaOrcamentoFeriasRepository(repositoryContext));
            _empresaRepository = new Lazy<IEmpresaRepository>(() => new EmpresaRepository(repositoryContext));
        }

        public ICompanyRepository Company => _companyRepository.Value;
        public IEmployeeRepository Employee => _employeeRepository.Value;
        public IConfigPeriodoAquisitivoRepository ConfigPeriodoAquisitivo => _configPeriodoAquisitivoRepository.Value;
        public IConfigCalculoFeriasRepository ConfigCalculoFerias => _configCalculoFeriasRepository.Value;
        public IConfigReducaoDiasFeriasRepository ConfigReducaoDiasFerias => _configReducaoDiasFeriasRepository.Value;
        public IFaixaReducaoDiasFeriasRepository FaixaReducaoDiasFerias => _faixaReducaoDiasFeriasRepository.Value;
        public IConfigOrcamentoFeriasRepository ConfigOrcamentoFerias => _configOrcamentoFeriasRepository.Value;
        public IFaixaOrcamentoFeriasRepository FaixaOrcamentoFerias => _faixaOrcamentoFeriasRepository.Value;
        public IEmpresaRepository Empresa => _empresaRepository.Value;

        public async Task SaveAsync()
        {
            await _repositoryContext.SaveChangesAsync();
        }
    }
}
