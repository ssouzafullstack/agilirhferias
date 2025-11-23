using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class FaixaTurnoTrabalho : EntityConfiguration
    {
        public string Descricao { get; set; } = string.Empty;
        public TimeSpan Entrada1 { get; set; }
        public TimeSpan Saida1 { get; set; }
        public bool PossuiIntervalo { get; set; }
        public TimeSpan? Entrada2 { get; set; }
        public TimeSpan? Saida2 { get; set; }
        public DateTime InicioVigencia { get; set; }
        public SituacaoFaixaTurnoTrabalho Situacao { get; set; }
        public Guid? IdTurnoTrabalho { get; set; }
        [ForeignKey(nameof(IdTurnoTrabalho))]
        public TurnoTrabalho? TurnoTrabalho { get; set; }
    }
}
