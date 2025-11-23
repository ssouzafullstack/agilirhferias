namespace AgiliRHFerias.Service.Contracts
{
    public interface IServiceManager
    {
        ICompanyService CompanyService { get; }
        IEmployeeService EmployeeService { get; }
        IAuthenticationService AuthenticationService { get; }
        IConfigPeriodoAquisitivoService ConfigPeriodoAquisitivoService { get; }
        IConfigCalculoFeriasService ConfigCalculoFeriasService { get; }
        IConfigReducaoDiasFeriasService ConfigReducaoDiasFeriasService { get; }
        IConfigOrcamentoFeriasService ConfigOrcamentoFeriasService { get; }
        IEmpresaService EmpresaService { get; }
    }
}
