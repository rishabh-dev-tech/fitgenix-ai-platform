import { useEffect, useRef, useState } from "react";
import "../../styles/dashboardLayout.css";
import { askCoach, getMyAIHistory } from "../../api/aiApi";

export default function AICoach() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const res = await getMyAIHistory();
      const formatted = res.data.data.reverse().flatMap((i) => [
        { role: "user", text: i.question },
        { role: "ai", text: i.response }
      ]);
      setMessages(formatted);
    } catch {
      console.log("Failed to load AI history");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await askCoach(userMsg.text);
      const aiMsg = { role: "ai", text: res.data.data.response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "I couldn’t process that. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dash-header">
        <h1>AI Fitness Coach</h1>
        <p>Your personal training & nutrition assistant</p>
      </div>

      <div className="dash-card glow ai-box">

        <div className="ai-chat">
          {messages.length === 0 && (
            <p className="dash-muted">
              Ask anything about workouts, diet, or your progress.
            </p>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`}>
              {m.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={sendMessage} className="ai-input">
          <input
            placeholder="Ask your AI coach..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}