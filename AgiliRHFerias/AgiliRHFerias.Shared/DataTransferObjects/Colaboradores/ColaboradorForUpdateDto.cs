using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.Colaboradores
{
    public record ColaboradorForUpdateDto
    {
        public Guid Id { get; init; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public decimal Salario { get; set; }
        public DateTime DataAdmissao { get; set; }
        public DateTime? DataDesligamento { get; set; }
        public Guid? IdEmpresa { get; init; }
        public string EmpresaDesc { get; set; } = string.Empty;
        public Guid? IdTurnoTrabalho { get; init; }
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
