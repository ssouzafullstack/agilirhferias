using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Repository.Configuration;
using AgiliRHFerias.Repository.Extensions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AgiliRHFerias.Repository
{
    public class RepositoryContext : IdentityDbContext<User>
    {
        public RepositoryContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyCustomConventions();

            modelBuilder.ApplyConfiguration(new CompanyConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }

        public DbSet<Company>? Companies { get; set; }
        public DbSet<Employee>? Employees { get; set; }
        public DbSet<Falta> Faltas { get; set; }
        public DbSet<PeriodoAquisitivo> PeriodosAquisitivos { get; set; }
        public DbSet<PeriodoConcessivo> PeriodosConcessivos { get; set; }
        public DbSet<Colaborador> Colaboradores { get; set; }
        public DbSet<Cargo> Cargos { get; set; }
        public DbSet<FaixaTurnoTrabalho> FaixasTurnoTrabalho { get; set; }
        public DbSet<TurnoTrabalho> TurnosTrabalho { get; set; }
        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<EscalaFerias> EscalasFerias { get; set; }
        public DbSet<AvisoFerias> AvisosFerias { get; set; }
        public DbSet<FaixaReducaoDiasFerias> FaixasReducaoDiasFerias { get; set; }
        public DbSet<ConfigReducaoDiasFerias> ConfigsReducaoDiasFerias { get; set; }
        public DbSet<ConfigCalculoFerias> ConfigsCalculoFerias { get; set; }
        public DbSet<ConfigPeriodoAquisitivo> ConfigsPeriodoAquisitivo { get; set; }
        public DbSet<FaixaOrcamentoFerias> FaixasOrcamentoFerias { get; set; }
        public DbSet<ConfigOrcamentoFerias> ConfigsOrcamentoFerias { get; set; }
        public DbSet<FaixaINSS> FaixasINSS { get; set; }
        public DbSet<ConfigINSS> ConfigsINSS { get; set; }
        public DbSet<FaixaIRRF> FaixasIRRF { get; set; }
        public DbSet<ConfigIRRF> ConfigsIRRF { get; set; }
    }
}
