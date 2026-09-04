import {
  useState,
  type FormEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import { supabase } from "../../lib/supabaseClient";
import QuillEditor from "../../components/QuillEditor/quillEditor";

type FormFields =
  | "title"
  | "schrijver"
  | "content"
  | "contactgegevensGoedDoel"
  | "bronnen"
  | "category";

const INITIAL: Record<FormFields, string> = {
  title: "",
  schrijver: "",
  content: "",
  contactgegevensGoedDoel: "",
  bronnen: "",
  category: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function SubmitPage() {
  const [form, setForm] = useState<Record<FormFields, string>>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const updateField = (field: FormFields, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const reset = () => {
    setForm(INITIAL);
    setStatus("idle");
    setErrorMsg("");
  };

  const showError = (message: string) => {
    setErrorMsg(message);
    setStatus("error");
  };

  const validate = (): string | null => {
    if (!form.title.trim()) {
      return "Vul een titel in.";
    }

    if (!form.schrijver.trim()) {
      return "Vul de naam van de schrijver in.";
    }

    if (!form.category.trim()) {
      return "Kies een categorie.";
    }

    const emptyQuill =
      !form.content || form.content.replace(/<(.|\n)*?>/g, "").trim() === "";

    if (emptyQuill) {
      return "Het artikel mag niet leeg zijn.";
    }

    return null;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      showError(validationError);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const { error } = await supabase.from("ImagesGoodCauses").insert({
        title: form.title.trim(),
        schrijver: form.schrijver.trim(),
        content: form.content,
        category: form.category,
        contactgegevensGoedDoel: form.contactgegevensGoedDoel.trim() || null,
        bronnen: form.bronnen.trim() || null,
      });

      if (error) {
        throw error;
      }

      setForm(INITIAL);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Onbekende fout";
      console.error(err);
      showError("Opslaan mislukt: " + message);
    }
  }

  if (status === "success") {
    return (
      <div style={s.page}>
        <div style={s.successBox}>
          <div style={s.successIcon}>✓</div>

          <h2 style={s.successTitle}>Artikel ingediend</h2>

          <p style={s.successBody}>
            Bedankt! Je artikel is opgeslagen en wordt nagekeken.
          </p>

          <button type="button" style={s.btnPrimary} onClick={reset}>
            Nog een artikel indienen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <form style={s.card} onSubmit={handleSubmit}>
        <header style={s.header}>
          <p style={s.eyebrow}>Bijdrage</p>

          <h1 style={s.heading}>Artikel indienen</h1>

          <p style={s.subheading}>
            Deel je verhaal over een goed doel. Velden met * zijn verplicht.
          </p>
        </header>

        <div style={s.divider} />

        {status === "error" && (
          <div style={s.errorBanner}>
            <span style={s.errorIcon}>!</span>

            {errorMsg}
          </div>
        )}

        <div style={s.fields}>
          <Field label="Titel *">
            <input
              id="title"
              style={s.input}
              value={form.title}
              placeholder="Titel van je artikel"
              maxLength={200}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          <Field label="Schrijver *">
            <input
              id="schrijver"
              style={s.input}
              value={form.schrijver}
              placeholder="Volledige naam"
              maxLength={100}
              onChange={(e) => updateField("schrijver", e.target.value)}
            />
          </Field>

          <Field label="Categorie *">
            <select
              style={s.input}
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            >
              <option value="">Kies categorie</option>
              <option value="Goede Doelen">Goede Doelen</option>
              <option value="Recepten">Recepten</option>
              <option value="Opinie">Opinie</option>
            </select>
          </Field>

          <Field
            label="Inhoud *"
            hint="Opmaak zoals vet en lijsten blijft behouden."
          >
            <QuillEditor
              value={form.content}
              onChange={(value: string) => updateField("content", value)}
            />
          </Field>

          <Field
            label="Contactgegevens goed doel"
            hint="Website, email of telefoonnummer."
          >
            <input
              style={s.input}
              value={form.contactgegevensGoedDoel}
              placeholder="https://..."
              onChange={(e) =>
                updateField("contactgegevensGoedDoel", e.target.value)
              }
            />
          </Field>

          <Field label="Bronnen" hint="Eén bron per regel.">
            <textarea
              style={{
                ...s.input,
                ...s.textarea,
              }}
              rows={3}
              value={form.bronnen}
              placeholder={"https://bron.be\nhttps://bron2.be"}
              onChange={(e) => updateField("bronnen", e.target.value)}
            />
          </Field>
        </div>

        <div style={s.divider} />

        <div style={s.actions}>
          <button
            type="submit"
            disabled={status === "loading"}
            style={
              status === "loading"
                ? { ...s.btnPrimary, ...s.btnDisabled }
                : s.btnPrimary
            }
          >
            {status === "loading" ? "Opslaan..." : "Artikel indienen"}
          </button>

          <button
            type="button"
            style={s.btnGhost}
            disabled={status === "loading"}
            onClick={reset}
          >
            Wissen
          </button>
        </div>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>

      {hint && <p style={s.hint}>{hint}</p>}

      {children}
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  page: {
    maxWidth: "50vw",
    margin: "0 auto",
    padding: "8rem 1rem",
    backgroundColor: "transparent !important",
  },
  card: {
    borderRadius: 12,
    padding: "2rem",
    backgroundColor: "transparent !important",
  },
  header: {
    marginBottom: "1.5rem",
    backgroundColor: "transparent !important",
  },
  eyebrow: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6b7280",
    margin: 0,
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: 700,
    margin: "0.25rem 0 0",
  },
  subheading: {
    color: "#6b7280",
    margin: "0.5rem 0 0",
    fontSize: "0.95rem",
  },
  divider: {
    height: 1,
    background: "#e5e7eb",
    margin: "1.5rem 0",
  },
  errorBanner: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    color: "#b91c1c",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.9rem",
  },
  errorIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#b91c1c",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.75rem",
    flexShrink: 0,
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  label: {
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  hint: {
    fontSize: "0.8rem",
    color: "#6b7280",
    margin: 0,
  },
  input: {
    width: "100%",
    padding: "0.6rem 0.75rem",
    border: "1.5px solid #d1d5db",
    borderRadius: 8,
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    resize: "vertical",
    fontFamily: "inherit",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  btnPrimary: {
    padding: "0.65rem 1.5rem",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  btnGhost: {
    padding: "0.65rem 1.5rem",
    background: "transparent",
    color: "#6b7280",
    border: "1.5px solid #d1d5db",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  successBox: {
    textAlign: "center",
    padding: "3rem 1rem",
  },
  successIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "#16a34a",
    color: "#fff",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  successTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: "0 0 0.5rem",
  },
  successBody: {
    color: "#6b7280",
    margin: "0 0 1.5rem",
  },
};
