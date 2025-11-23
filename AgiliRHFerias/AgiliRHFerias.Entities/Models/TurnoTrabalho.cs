using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class TurnoTrabalho : EntityConfiguration
    {
        public TurnoTrabalho()
        {
            FaixasTurnoTrabalho = new List<FaixaTurnoTrabalho>();
        }

        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
        public ICollection<FaixaTurnoTrabalho> FaixasTurnoTrabalho { get; set; }
    }
}
