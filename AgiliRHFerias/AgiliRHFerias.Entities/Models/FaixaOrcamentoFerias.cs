using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class FaixaOrcamentoFerias : EntityConfiguration
    {
        public Guid? IdConfigOrcamentoFerias { get; set; }
        [ForeignKey(nameof(IdConfigOrcamentoFerias))]
        public ConfigOrcamentoFerias? ConfigOrcamentoFerias { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public Mes Mes { get; set; }
        public decimal Orcamento { get; set; }
        public SituacaoFaixaOrcamentoFerias Situacao { get; set; }
        public DateTime InicioVigencia { get; set; }
    }
}
