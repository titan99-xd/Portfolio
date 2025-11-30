import "../../styles/MarkdownToolbar.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export default function MarkdownToolbar({ value, onChange, textareaRef }: Props) {

  const insertAtCursor = (markdown: string, placeholder?: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = value.substring(0, start);
    const after = value.substring(end);

    const finalText =
      before + markdown + (placeholder ?? "") + markdown + after;

    onChange(finalText);

    // Reset cursor
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + markdown.length;
    }, 10);
  };

  const insertHeading = (level: number) => {
    const text = "#".repeat(level) + " ";
    insertAtCursor(text, "Heading");
  };

  return (
    <div className="markdown-toolbar">
      <button type="button" onClick={() => insertAtCursor("**", "bold text")}>
        <b>B</b>
      </button>

      <button type="button" onClick={() => insertAtCursor("*", "italic text")}>
        <i>I</i>
      </button>

      <button type="button" onClick={() => insertHeading(1)}>H1</button>
      <button type="button" onClick={() => insertHeading(2)}>H2</button>

      <button type="button" onClick={() => insertAtCursor("`", "code")}>
        {"</>"}
      </button>

      <button type="button" onClick={() => insertAtCursor("> ", "quote")}>
        ❝
      </button>

      <button type="button" onClick={() => insertAtCursor("- ", "list item")}>
        • List
      </button>
    </div>
  );
}
