using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias
{
    public record FaixaReducaoDiasFeriasDto
    {
        public Guid Id { get; init; }
        public int NumeroDiasFaltaInicial { get; init; }
        public int NumeroDiasFaltaFinal { get; init; }
        public int NumeroDiasFerias { get; init; }
    }
}
