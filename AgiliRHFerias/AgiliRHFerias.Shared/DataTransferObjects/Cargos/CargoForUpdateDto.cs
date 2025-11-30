using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.Cargos
{
    public record CargoForUpdateDto
    {
        public Guid Id { get; init; }
        public string Descricao { get; init; } = string.Empty;
        public NivelCargo NivelCargo { get; init; }
        public string CBO { get; init; } = string.Empty;
        public SituacaoCargo Situacao { get; init; }
        public DateTime InicioVigencia { get; init; }
        public DateTime UltimaAlteracao { get; init; }
    }
}
