using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class EscalaFerias : EntityConfiguration
    {
        public Guid IdPeriodoAquisitivo { get; set; }
        [ForeignKey(nameof(IdPeriodoAquisitivo))]
        public PeriodoAquisitivo PeriodoAquisitivo { get; set; }
        public int NumeroDiasDisponiveis { get; set; }
        public int NumeroDiasAbono { get; set; }
        public int NumeroDiasGozo { get; set; }
        public DateTime InicioFerias { get; set; }
        public DateTime FimFerias { get; set; }
        public SituacaoEscalaFerias Situacao { get; set; }
        public string Observacao { get; set; } = string.Empty;
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
