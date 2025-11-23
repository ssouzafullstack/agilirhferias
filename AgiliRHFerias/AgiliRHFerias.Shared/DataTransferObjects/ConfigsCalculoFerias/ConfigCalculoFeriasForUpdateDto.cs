using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsCalculoFerias
{
    public record ConfigCalculoFeriasForUpdateDto
    {
        public Guid Id { get; init; }
        public bool MultiplicarSempreNumeroDiasMes { get; init; }
        public bool MultiplicarSempreTrintaDias { get; init; }
        public bool DividirSempreNumeroDiasMes { get; init; }
        public bool DividirSempreTrintaDias { get; init; }
        public bool DividirFevereiroTrintaDias { get; init; }
    }
}
