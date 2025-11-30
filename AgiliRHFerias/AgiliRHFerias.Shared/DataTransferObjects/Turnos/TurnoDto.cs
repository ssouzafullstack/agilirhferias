using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.Turnos
{
    public record TurnoDto
    {
        public Guid Id { get; init; }
        public string Descricao { get; init; } = string.Empty;
        public TimeSpan Entrada1 { get; init; }
        public TimeSpan Saida1 { get; init; }
        public bool PossuiIntervalo { get; init; }
        public TimeSpan? Entrada2 { get; init; }
        public TimeSpan? Saida2 { get; init; }
        public DateTime InicioVigencia { get; init; }
        public SituacaoFaixaTurnoTrabalho Situacao { get; init; }
        public DateTime UltimaAlteracao { get; init; }
    }
}
