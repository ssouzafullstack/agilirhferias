using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class Colaborador : EntityConfiguration
    {
        [MaxLength(300)]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(300)]
        public string Email { get; set; } = string.Empty;
        public Guid IdEmpresa { get; set; }
        [ForeignKey(nameof(IdEmpresa))]
        public Empresa Empresa { get; set; }
        public Guid IdCargo { get; set; }
        [ForeignKey(nameof(IdCargo))]
        public Cargo Cargo { get; set; }
        public Guid IdTurnoTrabalho { get; set; }
        [ForeignKey(nameof(IdTurnoTrabalho))]
        public TurnoTrabalho TurnoTrabalho { get; set; }
        public DateTime DataAdmissao { get; set; }
        public decimal Salario { get; set; }
        public Guid IdConfigPeriodoAquisitivo { get; set; }
        [ForeignKey(nameof(IdConfigPeriodoAquisitivo))]
        public ConfigPeriodoAquisitivo ConfigPeriodoAquisitivo { get; set; }
        public bool ExerceLideranca { get; set; }
        public int NumeroDependentes { get; set; }
        public SituacaoColaborador Situacao { get; set; }
        public DateTime? DataDesligamento { get; set; }
        public DateTime UltimaAlteracao { get; set; }
        public ICollection<PeriodoAquisitivo> PeriodosAquisitivos { get; set; }
        public ICollection<Falta> Faltas { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
