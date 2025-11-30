export function formatDateBR(input?: Date | string): string {
  if (!input) return "";
  const d = typeof input === "string" ? new Date(input) : input;
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
}

export function formatBoolean(value: boolean | null | undefined): string {
  if (value === true) return "SIM";
  if (value === false) return "NÃO";
  return "";
}

export function formatSituacao(value: number | null | undefined): string {
  switch (value) {
    case 1:
      return "Ativa";
    case 2:
      return "Inativa";
    default:
      return "";
  }
}

export function formatSituacaoFerias(value: number | null | undefined): string {
  switch (value) {
    case 1:
      return "Programada";
    case 2:
      return "Homologada";
    case 3:
      return "Cancelada";
    default:
      return "";
  }
}

export function formatNivelCargo(value: number | null | undefined): string {
  switch (value) {
    case 1:
      return "Júnior I";
    case 2:
      return "Júnior II";
    case 3:
      return "Pleno I";
    case 4:
      return "Pleno II";
    case 5:
      return "Sênior I";
    case 6:
      return "Sênior II";
    case 7:
      return "Master I";
    case 8:
      return "Master II";
    default:
      return "";
  }
}

export function formatCurrency(value: number | string | undefined): string {
  if (value === null || value === undefined || value === "") return "";

  const number = typeof value === "string" ? Number(value) : value;

  if (isNaN(number)) return "";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
