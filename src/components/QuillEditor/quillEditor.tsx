import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import Quill from "quill";
import { useTranslation } from "react-i18next";
import "quill/dist/quill.snow.css";
import { supabase } from "../../lib/supabaseClient";

const TOOLBAR = [
  ["bold", "italic", "underline", "strike"],
  [{ header: [1, 2, 3, false] }],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "link", "image"],
  ["clean"],
];

interface Props {
  value: string;
  onChange: (html: string) => void;
  bucket?: string;
  placeholder?: string;
}

export interface QuillEditorHandle {
  insertImage: (url: string) => void;
}

const QuillEditor = forwardRef<QuillEditorHandle, Props>(
  ({ value, onChange, bucket = "article-images", placeholder }, ref) => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useImperativeHandle(ref, () => ({
      insertImage(url: string) {
        const quill = quillRef.current;
        if (!quill) return;

        const range = quill.getSelection();
        quill.insertEmbed(range?.index ?? 0, "image", url);
      },
    }));

    useEffect(() => {
      if (quillRef.current) return;

      const container = containerRef.current;
      if (!container) return;

      const quill = new Quill(container, {
        theme: "snow",
        placeholder: placeholder ?? t("quillEditor.placeholder"),
        modules: {
          toolbar: {
            container: TOOLBAR,

            handlers: {
              image: async () => {
                const input = document.createElement("input");

                input.type = "file";
                input.accept = "image/*";

                input.click();

                input.onchange = async () => {
                  const file = input.files?.[0];

                  if (!file) return;

                  const fileName = `${Date.now()}-${file.name}`;

                  const { error } = await supabase.storage
                    .from(bucket)
                    .upload(fileName, file);

                  if (error) {
                    console.error(error);
                    return;
                  }

                  const { data } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(fileName);

                  const range = quill.getSelection();

                  quill.insertEmbed(
                    range?.index ?? 0,
                    "image",
                    data.publicUrl,
                  );
                };
              },
            },
          },
        },
      });

      quillRef.current = quill;

      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }, []);

    useEffect(() => {
      if (!quillRef.current) return;

      const current = quillRef.current.root.innerHTML;

      if (value !== current) {
        quillRef.current.root.innerHTML = value;
      }
    }, [value]);

    return <div ref={containerRef} style={styles.wrapper} />;
  },
);

export default QuillEditor;

const styles = {
  wrapper: {
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius)",
    overflow: "visible",
    background: "var(--white)",
  },
};
