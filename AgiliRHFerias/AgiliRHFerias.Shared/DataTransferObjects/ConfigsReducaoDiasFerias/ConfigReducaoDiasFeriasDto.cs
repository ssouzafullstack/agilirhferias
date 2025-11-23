using System;
using System.Collections.Generic;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias
{
    public record ConfigReducaoDiasFeriasDto
    {
        public Guid Id { get; init; }
        public IEnumerable<FaixaReducaoDiasFeriasDto> FaixasReducaoDiasFerias { get; init; }
        public DateTime UltimaAlteracao { get; init; }
    }
}
