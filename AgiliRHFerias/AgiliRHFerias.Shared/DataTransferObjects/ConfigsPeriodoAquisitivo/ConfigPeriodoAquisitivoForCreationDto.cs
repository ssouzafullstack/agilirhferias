using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.ConfigsPeriodoAquisitivo
{
    public record ConfigPeriodoAquisitivoForCreationDto
    {
        public string Descricao { get; init; }
        public int NumeroMesesTrabalhados { get; init; }
        public int NumeroDiasGozo { get; init; }
        public DateTime InicioVigencia { get; init; }
    }
}
