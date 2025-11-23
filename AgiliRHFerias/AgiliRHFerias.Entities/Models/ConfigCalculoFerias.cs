using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class ConfigCalculoFerias : EntityConfiguration
    {
        public bool MultiplicarSempreNumeroDiasMes { get; set; }
        public bool MultiplicarSempreTrintaDias { get; set; }
        public bool DividirSempreNumeroDiasMes { get; set; }
        public bool DividirSempreTrintaDias { get; set; }
        public bool DividirFevereiroTrintaDias { get; set; }
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
