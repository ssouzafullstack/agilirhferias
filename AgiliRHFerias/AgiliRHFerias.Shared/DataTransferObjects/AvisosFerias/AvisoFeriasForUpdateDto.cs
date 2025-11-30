using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.AvisosFerias
{
    public record AvisoFeriasForUpdateDto
    {
        public Guid Id { get; init; }
        public Guid IdColaborador { get; init; }
        public string NomeColaborador { get; init; } = string.Empty;
        public DateTime DataAdmissao { get; set; }
        public DateTime? InicioPeriodoAquisitivo { get; set; }
        public DateTime? FimPeriodoAquisitivo { get; set; }
        public int NumeroDiasAbono { get; init; }
        public int NumeroDiasGozo { get; init; }
        public DateTime InicioFerias { get; init; }
        public DateTime FimFerias { get; init; }
        public Guid IdEscalaFerias { get; init; }
        public decimal AdicionalPagamentoFerias { get; init; }
        public decimal TotalPagamentoFerias { get; init; }
        public SituacaoAvisoFerias Situacao { get; init; }
    }
}
