import { useState, useRef, type FormEvent, type ReactNode } from "react";
import type { QuillEditorHandle } from "../../components/QuillEditor/quillEditor";
import { supabase } from "../../lib/supabaseClient";
import QuillEditor from "../../components/QuillEditor/quillEditor";
import styles from "./calendar.module.scss";

type FormFields =
  | "title"
  | "type"
  | "date"
  | "time"
  | "location"
  | "description";

const INITIAL: Record<FormFields, string> = {
  title: "",
  type: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function SubmitPage() {
  const quillRef = useRef<QuillEditorHandle>(null);
  const [form, setForm] = useState<Record<FormFields, string>>(INITIAL);
  const [uploadedFotos, setUploadedFotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
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
    setUploadedFotos([]);
    setStatus("idle");
    setErrorMsg("");
  };

  const showError = (message: string) => {
    setErrorMsg(message);
    setStatus("error");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("events-images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      showError("Foto uploaden mislukt: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("events-images")
      .getPublicUrl(fileName);

    setUploadedFotos((prev) => [...prev, data.publicUrl]);
    quillRef.current?.insertImage(data.publicUrl);
    setUploading(false);
  };

  const removeFoto = (index: number) => {
    setUploadedFotos((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = (): string | null => {
    if (!form.title.trim()) {
      return "Vul een titel in.";
    }

    if (!form.type.trim()) {
      return "Vul het type evenement in.";
    }

    if (!form.date.trim()) {
      return "Vul een datum in.";
    }

    if (!form.time.trim()) {
      return "Vul een uur in.";
    }

    if (!form.location.trim()) {
      return "Vul een locatie in.";
    }

    const emptyQuill =
      !form.description ||
      form.description.replace(/<(.|\n)*?>/g, "").trim() === "";

    if (emptyQuill) {
      return "De beschrijving mag niet leeg zijn.";
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
      const { error } = await supabase.from("kalender").insert({
        title: form.title.trim(),
        type: form.type.trim(),
        date: form.date.trim(),
        time: form.time.trim(),
        location: form.location.trim(),
        description: form.description,
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
      <div className={styles.page}>
        <div className={styles.successBox}>
          <div className={styles.successIcon}>✓</div>

          <h2 className={styles.successTitle}>Evenement ingediend</h2>

          <p className={styles.successBody}>
            Bedankt! Je evenement is opgeslagen en wordt nagekeken.
          </p>

          <button type="button" className={styles.btnPrimary} onClick={reset}>
            Nog een evenement indienen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Bijdrage</p>

          <h1 className={styles.heading}>Evenement indienen</h1>

          <p className={styles.subheading}>
            Voeg een evenement toe aan de kalender. Velden met * zijn verplicht.
          </p>
        </header>

        <div className={styles.divider} />

        {status === "error" && (
          <div className={styles.errorBanner}>
            <span className={styles.errorIcon}>!</span>

            {errorMsg}
          </div>
        )}

        <div className={styles.fields}>
          <Field label="Titel *">
            <input
              id="title"
              className={styles.input}
              value={form.title}
              placeholder="Titel van het evenement"
              maxLength={200}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          <Field label="Type *">
            <input
              id="type"
              className={styles.input}
              value={form.type}
              placeholder="Bijv. Workshop, Lezing, Expositie"
              maxLength={100}
              onChange={(e) => updateField("type", e.target.value)}
            />
          </Field>

          <Field label="Datum *">
            <input
              id="datum"
              type="date"
              className={styles.input}
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </Field>

          <Field label="Uur *">
            <input
              id="time"
              type="time"
              className={styles.input}
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
            />
          </Field>

          <Field label="Locatie *">
            <input
              id="location"
              className={styles.input}
              value={form.location}
              placeholder="Stad, adres of online link"
              maxLength={200}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </Field>

          <Field
            label="Beschrijving *"
            hint="Opmaak zoals vet en lijsten blijft behouden."
          >
            <QuillEditor
              ref={quillRef}
              bucket="events-images"
              value={form.description}
              onChange={(value: string) => updateField("description", value)}
            />
          </Field>

          <Field
            label="Foto's"
            hint="Foto's worden in de beschrijving ingevoegd."
          >
            <div className={styles.fotoUploadArea}>
              <label className={styles.uploadBtn}>
                {uploading ? "Bezig met uploaden..." : "Foto kiezen"}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  disabled={uploading}
                  onChange={handleUpload}
                />
              </label>

              {uploadedFotos.length > 0 && (
                <div className={styles.previewGrid}>
                  {uploadedFotos.map((url, index) => (
                    <div key={url} className={styles.previewItem}>
                      <img src={url} alt="" className={styles.previewImg} />
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeFoto(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Field>
        </div>

        <div className={styles.divider} />

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={status === "loading"}
            className={`${styles.btnPrimary} ${status === "loading" ? styles.btnDisabled : ""}`}
          >
            {status === "loading" ? "Opslaan..." : "Evenement indienen"}
          </button>

          <button
            type="button"
            className={styles.btnGhost}
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
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>

      {hint && <p className={styles.hint}>{hint}</p>}

      {children}
    </div>
  );
}
