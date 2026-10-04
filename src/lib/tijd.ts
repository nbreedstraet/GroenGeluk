export function formatTijd(time?: string | null): string {
  if (!time) return "";

  const match = String(time).match(/(\d{1,2}:\d{2})/);
  return match ? match[1] : String(time).trim();
}