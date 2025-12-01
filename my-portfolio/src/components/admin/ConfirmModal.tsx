import "../../styles/ConfirmModal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {title && <h2 className="modal-title">{title}</h2>}
        <p className="modal-message">{message}</p>

        <div className="modal-buttons">
          <button className="modal-btn cancel" onClick={onCancel}>
            {cancelLabel}
          </button>

          <button className="modal-btn confirm" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}