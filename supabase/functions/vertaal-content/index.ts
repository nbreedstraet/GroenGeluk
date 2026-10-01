// @ts-nocheck
import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const TALEN: [string, string][] = [
  ["en", "EN-GB"],
  ["fr", "FR"],
  ["de", "DE"],
];

const TABELLEN: Record<string, [string, string][]> = {
  ImagesGoodCauses: [
    ["title", "title_i18n"],
    ["content", "content_i18n"],
    ["category", "category_i18n"],
  ],
  kalender: [
    ["title", "title_i18n"],
    ["type", "type_i18n"],
    ["description", "description_i18n"],
  ],
  members: [
    ["favoriteVeganTip", "favoriteVeganTip_i18n"],
    ["role", "role_i18n"],
    ["description", "description_i18n"],
  ],
};

async function vertaal(tekst: string, doel: string): Promise<string> {
  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${Deno.env.get("DEEPL_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [tekst],
      source_lang: "NL",
      target_lang: doel,
      tag_handling: "html",
    }),
  });
  if (!res.ok) throw new Error(`DeepL fout: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.translations[0].text;
}

Deno.serve(async (req) => {
  try {
    if (
      req.headers.get("x-webhook-secret") !== Deno.env.get("WEBHOOK_SECRET")
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { type, table, record, old_record } = await req.json();
    console.log("Webhook ontvangen:", table, type, "id:", record?.id);

    const velden = TABELLEN[table];
    if (!velden)
      return new Response(`Onbekende tabel: ${table}`, { status: 400 });

    const gewijzigd = velden.filter(([bron]) => {
      if (!record[bron]) return false;
      return type === "INSERT" || record[bron] !== old_record?.[bron];
    });

    if (gewijzigd.length === 0) return new Response("niets te doen");

    const update: Record<string, Record<string, string>> = {};

    for (const [bron, doel] of gewijzigd) {
      const resultaat: Record<string, string> = { nl: record[bron] };
      const vertalingen = await Promise.all(
        TALEN.map(([, deeplCode]) => vertaal(record[bron], deeplCode)),
      );
      TALEN.forEach(([sleutel], i) => (resultaat[sleutel] = vertalingen[i]));
      update[doel] = resultaat;
    }

    const { error } = await supabase
      .from(table)
      .update(update)
      .eq("id", record.id);

    if (error) {
      console.error("Fout bij opslaan:", error.message);
      return new Response(error.message, { status: 500 });
    }

    return new Response("ok");
  } catch (e) {
    console.error("Fout in functie:", e.message);
    return new Response(e.message, { status: 500 });
  }
});
