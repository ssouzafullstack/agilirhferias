using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class ConfigOrcamentoFerias : EntityConfiguration
    {
        public ConfigOrcamentoFerias()
        {
            FaixasOrcamentoFerias = new List<FaixaOrcamentoFerias>();
        }

        public ICollection<FaixaOrcamentoFerias> FaixasOrcamentoFerias { get; set; }
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
