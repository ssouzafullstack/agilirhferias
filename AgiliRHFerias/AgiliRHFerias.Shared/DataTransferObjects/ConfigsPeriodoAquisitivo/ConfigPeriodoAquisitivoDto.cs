using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsPeriodoAquisitivo
{
    public record ConfigPeriodoAquisitivoDto
    {
        public Guid Id { get; init; }
        public string Descricao { get; init; } = string.Empty;
        public int NumeroMesesTrabalhados { get; init; }
        public int NumeroDiasGozo { get; init; }
        public DateTime InicioVigencia { get; init; }
    }
}
