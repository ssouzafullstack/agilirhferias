using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class ConfigIRRF : EntityConfiguration
    {
        public ConfigIRRF()
        {
            FaixasIRRF = new List<FaixaIRRF>();
        }

        public string Descricao { get; set; } = string.Empty;
        public decimal ValorDependentes { get; set; }
        public ICollection<FaixaIRRF> FaixasIRRF { get; set; }
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
