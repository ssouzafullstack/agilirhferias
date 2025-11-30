using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.EscalasFerias
{
    public record EscalaFeriasDto
    {
        public Guid Id { get; init; }
        public Guid IdColaborador { get; init; }
        public string NomeColaborador { get; init; } = string.Empty;
        public DateTime DataAdmissao { get; set; }
        public DateTime? InicioPeriodoAquisitivo { get; set; }
        public DateTime? FimPeriodoAquisitivo { get; set; }
        public int NumeroDiasDisponiveis { get; init; }
        public int NumeroDiasAbono { get; init; }
        public int NumeroDiasGozo { get; init; }
        public DateTime InicioFerias { get; init; }
        public DateTime FimFerias { get; init; }
        public SituacaoEscalaFerias Situacao { get; init; }
    }
}
