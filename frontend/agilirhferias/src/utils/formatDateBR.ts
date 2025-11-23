export const formatDateBR = (input?: Date | string): string => {
  if (!input) return "";
  const d = typeof input === "string" ? new Date(input) : input;
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
};
