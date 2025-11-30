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
        ICargoRepository Cargo { get; }
        ITurnoRepository Turno { get; }
        IColaboradorRepository Colaborador { get; }
        IEscalaFeriasRepository EscalaFerias { get; }
        IAvisoFeriasRepository AvisoFerias { get; }
        Task SaveAsync();
    }
}
