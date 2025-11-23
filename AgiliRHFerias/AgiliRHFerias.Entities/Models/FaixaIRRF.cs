using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class FaixaIRRF : EntityConfiguration
    {
        public Guid? IdConfigIRRF { get; set; }
        [ForeignKey(nameof(IdConfigIRRF))]
        public ConfigIRRF? ConfigIRRF { get; set; }
        public decimal BaseCalculoInicial { get; set; }
        public decimal BaseCalculoFinal { get; set; }
        public decimal Aliquota { get; set; }
        public decimal Deducao { get; set; }
        public SituacaoFaixaIRRF Situacao { get; set; }
        public DateTime InicioVigencia { get; set; }
    }
}
