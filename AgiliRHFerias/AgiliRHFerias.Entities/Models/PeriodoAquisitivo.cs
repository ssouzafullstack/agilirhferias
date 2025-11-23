using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class PeriodoAquisitivo : EntityConfiguration
    {
        public Guid IdColaborador { get; set; }
        [ForeignKey(nameof(IdColaborador))]
        public Colaborador Colaborador { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public SituacaoPeriodoAquisitivo Situacao { get; set; }
        public Guid IdPeriodoConcessivo { get; set; }
        [ForeignKey(nameof(IdPeriodoConcessivo))]
        public PeriodoConcessivo PeriodoConcessivo { get; set; }
        public ICollection<EscalaFerias> EscalasFerias { get; set; }
    }
}
