using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.Colaboradores
{
    public record ColaboradorForUpdateDto
    {
        public Guid Id { get; init; }
        public string Nome { get; set; } = string.Empty;
        public decimal Salario { get; set; }
        public DateTime DataAdmissao { get; set; }
        public DateTime? DataDesligamento { get; set; }
        public string PeriodoAquisitivo { get; set; } = string.Empty;
        public SituacaoColaborador Situacao { get; set; }
    }
}
