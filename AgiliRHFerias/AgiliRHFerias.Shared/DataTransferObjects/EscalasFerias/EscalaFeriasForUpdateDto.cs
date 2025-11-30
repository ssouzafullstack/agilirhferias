using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.EscalasFerias
{
    public record EscalaFeriasForUpdateDto
    {
        public Guid Id { get; init; }
        public int NumeroDiasDisponiveis { get; init; }
        public int NumeroDiasAbono { get; init; }
        public int NumeroDiasGozo { get; init; }
        public DateTime InicioFerias { get; init; }
        public DateTime FimFerias { get; init; }
        public SituacaoEscalaFerias Situacao { get; init; }
        public string Observacao { get; init; } = string.Empty;
        public DateTime UltimaAlteracao { get; init; }
    }
}
