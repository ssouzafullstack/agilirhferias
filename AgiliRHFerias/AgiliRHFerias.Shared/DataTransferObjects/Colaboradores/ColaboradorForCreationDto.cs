using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.Colaboradores
{
    public record ColaboradorForCreationDto
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public decimal Salario { get; set; }
        public DateTime DataAdmissao { get; set; }
        public DateTime? DataDesligamento { get; set; }
        public Guid? IdEmpresa { get; init; }
        public string EmpresaDesc { get; set; } = string.Empty;
        public Guid? IdTurnoTrabalho { get; init; } = new Guid("345E56DE-86D1-4418-829C-EC46AD1D8AA5");
        public string TurnoDesc { get; set; } = string.Empty;
        public Guid? IdCargo { get; init; }
        public string CargoDesc { get; set; } = string.Empty;
        public Guid? IdConfigPeriodoAquisitivo { get; init; }
        public string ConfigPeriodoAquisitivoDesc { get; set; } = string.Empty;
        public DateTime? InicioPeriodoAquisitivo { get; set; }
        public DateTime? FimPeriodoAquisitivo { get; set; }
        public bool ExerceLideranca { get; init; }
        public int NumeroDependentes { get; init; }
        public SituacaoColaborador Situacao { get; set; }
    }
}
