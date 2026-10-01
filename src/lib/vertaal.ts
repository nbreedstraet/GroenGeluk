export function vertaalVeld(veld: any, taal: any) {
  if (!veld) return "";
  const code = taal.split("-")[0];
  return veld[code] ?? veld.nl ?? Object.values(veld)[0] ?? "";
}
