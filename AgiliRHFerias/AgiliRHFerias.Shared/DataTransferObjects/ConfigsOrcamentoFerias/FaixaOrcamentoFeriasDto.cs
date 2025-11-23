using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsOrcamentoFerias
{
    public record FaixaOrcamentoFeriasDto
    {
        public Guid Id { get; init; }
        public string Descricao { get; init; } = string.Empty;
        public Mes Mes { get; init; }
        public decimal Orcamento { get; init; }
    }
}
