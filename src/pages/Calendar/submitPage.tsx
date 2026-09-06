import { useState, useRef, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
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
  | "ticket_url"
  | "description";

const INITIAL: Record<FormFields, string> = {
  title: "",
  type: "",
  date: "",
  time: "",
  location: "",
  ticket_url: "",
  description: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function SubmitPage() {
  const { t } = useTranslation();
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
      showError(t("calendar.form.uploadError") + error.message);
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
      return t("calendar.form.requiredTitle");
    }

    if (!form.type.trim()) {
      return t("calendar.form.requiredType");
    }

    if (!form.date.trim()) {
      return t("calendar.form.requiredDate");
    }

    if (!form.time.trim()) {
      return t("calendar.form.requiredTime");
    }

    if (!form.location.trim()) {
      return t("calendar.form.requiredLocation");
    }

    const emptyQuill =
      !form.description ||
      form.description.replace(/<(.|\n)*?>/g, "").trim() === "";

    if (emptyQuill) {
      return t("calendar.form.requiredDescription");
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
        ticket_url: form.ticket_url.trim(),
        description: form.description,
      });

      if (error) {
        throw error;
      }

      setForm(INITIAL);
      setStatus("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("calendar.form.unknownError");
      console.error(err);
      showError(t("calendar.form.saveError") + message);
    }
  }

  if (status === "success") {
    return (
      <div className={styles.page}>
        <div className={styles.successBox}>
          <div className={styles.successIcon}>✓</div>

          <h2 className={styles.successTitle}>
            {t("calendar.form.successTitle")}
          </h2>

          <p className={styles.successBody}>{t("calendar.form.successBody")}</p>

          <button type="button" className={styles.btnPrimary} onClick={reset}>
            {t("calendar.form.submitAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("calendar.form.eyebrow")}</p>

          <h1 className={styles.heading}>{t("calendar.form.heading")}</h1>

          <p className={styles.subheading}>{t("calendar.form.subheading")}</p>
        </header>

        <div className={styles.divider} />

        {status === "error" && (
          <div className={styles.errorBanner}>
            <span className={styles.errorIcon}>!</span>

            {errorMsg}
          </div>
        )}

        <div className={styles.fields}>
          <Field label={t("calendar.form.titleField")}>
            <input
              id="title"
              className={styles.input}
              value={form.title}
              placeholder={t("calendar.form.titlePlaceholder")}
              maxLength={200}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          <Field label={t("calendar.form.typeField")}>
            <input
              id="type"
              className={styles.input}
              value={form.type}
              placeholder={t("calendar.form.typePlaceholder")}
              maxLength={100}
              onChange={(e) => updateField("type", e.target.value)}
            />
          </Field>

          <Field label={t("calendar.form.dateField")}>
            <input
              id="datum"
              type="date"
              className={styles.input}
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </Field>

          <Field label={t("calendar.form.timeField")}>
            <input
              id="time"
              type="time"
              className={styles.input}
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
            />
          </Field>

          <Field label={t("calendar.form.locationField")}>
            <input
              id="location"
              className={styles.input}
              value={form.location}
              placeholder={t("calendar.form.locationPlaceholder")}
              maxLength={200}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </Field>

          <Field
            label={t("calendar.form.ticketUrlField")}
            hint={t("calendar.form.ticketUrlHint")}
          >
            <input
              id="ticket_url"
              className={styles.input}
              value={form.ticket_url}
              placeholder="https://..."
              maxLength={500}
              onChange={(e) => updateField("ticket_url", e.target.value)}
            />
          </Field>

          <Field
            label={t("calendar.form.descriptionField")}
            hint={t("calendar.form.richTextHint")}
          >
            <QuillEditor
              ref={quillRef}
              bucket="events-images"
              value={form.description}
              placeholder={t("calendar.form.descriptionPlaceholder")}
              onChange={(value: string) => updateField("description", value)}
            />
          </Field>

          <Field
            label={t("calendar.form.photosField")}
            hint={t("calendar.form.photosHint")}
          >
            <div className={styles.fotoUploadArea}>
              <label className={styles.uploadBtn}>
                {uploading
                  ? t("calendar.form.uploading")
                  : t("calendar.form.choosePhoto")}
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
            {status === "loading"
              ? t("calendar.form.saving")
              : t("calendar.form.submit")}
          </button>

          <button
            type="button"
            className={styles.btnGhost}
            disabled={status === "loading"}
            onClick={reset}
          >
            {t("calendar.form.clear")}
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