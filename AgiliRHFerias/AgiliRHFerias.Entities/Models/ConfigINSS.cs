using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class ConfigINSS : EntityConfiguration
    {
        public ConfigINSS()
        {
            FaixasINSS = new List<FaixaINSS>();
        }

        public string Descricao { get; set; } = string.Empty;
        public ICollection<FaixaINSS> FaixasINSS { get; set; }
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
