import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import "../../../styles/admin-messages.css";
import AdminLayout from "../../../components/admin/AdminLayout";

/* ----------------------------------------------
   Types
---------------------------------------------- */   
interface Message {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const token = localStorage.getItem("token");

  /* ============================================================
      Load Messages (safe, no ESLint error)
  ============================================================ */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  /* ============================================================
      Confirm Delete
  ============================================================ */
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`http://localhost:5050/api/messages/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove from UI
      setMessages((prev) => prev.filter((m) => m.id !== deleteId));
    } catch (err) {
      console.error("Failed to delete message", err);
    } finally {
      setDeleteId(null);
    }
  };

  /* ============================================================
      Render
  ============================================================ */

  if (loading) return <p>Loading messages…</p>;

  return (
    <AdminLayout title ="Messages">
    <div className="admin-messages-page">
      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-card">

            <div className="message-header">
              <h3>{msg.name}</h3>
              <p>{msg.email}</p>
            </div>

            {msg.subject && <p><strong>Subject:</strong> {msg.subject}</p>}
            <p className="message-body">{msg.message}</p>

            <div className="message-footer">
              <span>{new Date(msg.created_at).toLocaleString()}</span>
              <button
                className="delete-btn"
                onClick={() => setDeleteId(msg.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Message?"
        message="Are you sure you want to delete this message?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
    </AdminLayout>
  );
}