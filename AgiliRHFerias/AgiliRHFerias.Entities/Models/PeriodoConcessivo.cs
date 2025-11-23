using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class PeriodoConcessivo : EntityConfiguration
    {
        public Guid IdPeriodoAquisitivo { get; set; }
        [ForeignKey(nameof(IdPeriodoAquisitivo))]
        public PeriodoAquisitivo PeriodoAquisitivo { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public SituacaoPeriodoConcessivo Situacao { get; set; }
    }
}
