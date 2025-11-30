using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.Colaboradores
{
    public record ColaboradorDto
    {
        public Guid Id { get; init; }
        public string Nome { get; set; } = string.Empty;
        public decimal Salario { get; set; }
        public DateTime DataAdmissao { get; set; }
        public DateTime? DataDesligamento { get; set; }
        public DateTime? InicioPeriodoAquisitivo { get; set; }
        public DateTime? FimPeriodoAquisitivo { get; set; }
        public SituacaoColaborador Situacao { get; set; }
    }
}
