using AgiliRHFerias.Entities.Enums;
using System;

namespace AgiliRHFerias.Shared.DataTransferObjects.Empresas
{
    public record EmpresaDto
    {
        public Guid Id { get; init; }
        public string RazaoSocial { get; init; } = string.Empty;
        public string NomeFantasia { get; init; } = string.Empty;
        public bool Filial { get; init; }
        public string CNPJ { get; init; } = string.Empty;
        public string CEP { get; init; } = string.Empty;
        public SituacaoEmpresa Situacao { get; init; }
        public DateTime UltimaAlteracao { get; init; }
    }
}
