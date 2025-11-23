using System;
using System.Collections.Generic;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias
{
    public record ConfigReducaoDiasFeriasForUpdateDto
    {
        public Guid Id { get; init; }
        public IEnumerable<FaixaReducaoDiasFeriasDto> FaixasReducaoDiasFerias { get; init; }
    }
}
