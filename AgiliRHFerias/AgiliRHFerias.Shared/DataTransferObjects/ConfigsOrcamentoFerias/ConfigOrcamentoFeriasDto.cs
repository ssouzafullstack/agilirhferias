using System;
using System.Collections.Generic;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsOrcamentoFerias
{
    public record ConfigOrcamentoFeriasDto
    {
        public Guid Id { get; init; }
        public IEnumerable<FaixaOrcamentoFeriasDto> FaixasOrcamentoFerias { get; init; }
        public DateTime UltimaAlteracao { get; init; }
    }
}
