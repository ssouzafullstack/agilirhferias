using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class FaixaINSS : EntityConfiguration
    {
        public Guid? IdConfigINSS { get; set; }
        [ForeignKey(nameof(IdConfigINSS))]
        public ConfigINSS? ConfigINSS { get; set; }
        public decimal SalarioContribuicaoInicial { get; set; }
        public decimal SalarioContribuicaoFinal { get; set; }
        public decimal Aliquota { get; set; }
        public SituacaoFaixaINSS Situacao { get; set; }
        public DateTime InicioVigencia { get; set; }
    }
}
