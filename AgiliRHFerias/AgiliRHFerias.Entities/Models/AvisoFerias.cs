using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class AvisoFerias : EntityConfiguration
    {
        public Guid IdEscalaFerias { get; set; }
        [ForeignKey(nameof(IdEscalaFerias))]
        public EscalaFerias EscalaFerias { get; set; }
        public decimal TotalPagamentoFerias { get; private set; }
        public string Observacao { get; set; } = string.Empty;
        public SituacaoAvisoFerias Situacao { get; private set; }
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
