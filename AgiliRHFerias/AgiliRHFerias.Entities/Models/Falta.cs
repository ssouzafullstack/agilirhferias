using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class Falta : EntityConfiguration
    {
        public Guid IdColaborador { get; set; }
        [ForeignKey(nameof(IdColaborador))]
        public Colaborador Colaborador { get; set; }
        public bool Justificada { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public string Observacao { get; set; } = string.Empty;
    }
}
