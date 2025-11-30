using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.AvisosFerias
{
    public record AvisoFeriasForUpdateDto
    {
        public Guid Id { get; init; }
        public Guid IdEscalaFerias { get; init; }
        public decimal TotalPagamentoFerias { get; init; }
        public string Observacao { get; init; } = string.Empty;
        public SituacaoAvisoFerias Situacao { get; init; }
        public DateTime UltimaAlteracao { get; init; }
    }
}
