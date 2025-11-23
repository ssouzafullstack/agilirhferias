using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class FaixaReducaoDiasFerias : EntityConfiguration
    {
        public Guid? IdConfigReducaoDiasFerias { get; set; }
        [ForeignKey(nameof(IdConfigReducaoDiasFerias))]
        public ConfigReducaoDiasFerias? ConfigReducaoDiasFerias { get; set; }
        public int NumeroDiasFaltaInicial { get; set; }
        public int NumeroDiasFaltaFinal { get; set; }
        public int NumeroDiasFerias { get; set; }
        public SituacaoFaixaReducaoDiasFerias Situacao { get; set; }
        public DateTime InicioVigencia { get; set; }
    }
}
