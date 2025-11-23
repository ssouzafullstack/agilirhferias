using System.Threading.Tasks;

namespace AgiliRHFerias.Contracts
{
    public interface IRepositoryManager
    {
        ICompanyRepository Company { get; }
        IEmployeeRepository Employee { get; }
        IConfigPeriodoAquisitivoRepository ConfigPeriodoAquisitivo { get; }
        IConfigCalculoFeriasRepository ConfigCalculoFerias { get; }
        IConfigReducaoDiasFeriasRepository ConfigReducaoDiasFerias { get; }
        IFaixaReducaoDiasFeriasRepository FaixaReducaoDiasFerias { get; }
        IConfigOrcamentoFeriasRepository ConfigOrcamentoFerias { get; }
        IFaixaOrcamentoFeriasRepository FaixaOrcamentoFerias { get; }
        IEmpresaRepository Empresa { get; }
        Task SaveAsync();
    }
}
