using AgiliRHFerias.Entities.Enums;
using AgiliRHFerias.Entities.Models.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgiliRHFerias.Entities.Models
{
    public class Empresa : EntityConfiguration
    {
        public Empresa()
        {
            Colaboradores = new List<Colaborador>();
        }

        public string RazaoSocial { get; set; } = string.Empty;
        public string NomeFantasia { get; set; } = string.Empty;
        public bool Filial { get; set; }
        public string CNPJ { get; set; } = string.Empty;
        public string CEP { get; set; } = string.Empty;
        public SituacaoEmpresa Situacao { get; set; }
        public DateTime UltimaAlteracao { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
        public ICollection<Colaborador> Colaboradores { get; set; }
    }
}
