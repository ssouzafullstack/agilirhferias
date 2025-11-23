using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class ConfigPeriodoAquisitivo : EntityConfiguration
    {
        public string Descricao { get; set; } = string.Empty;
        public int NumeroMesesTrabalhados { get; set; }
        public int NumeroDiasGozo { get; set; }
        public DateTime InicioVigencia { get; set; }
        public SituacaoConfigPeriodoAquisitivo Situacao { get; set; }
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
