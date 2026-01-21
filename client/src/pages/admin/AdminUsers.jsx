import { useEffect, useState } from "react";
import {
  getAllUsers,
  toggleUserRole,
  toggleUserStatus,
  resetUserProgram,
  deleteUser
} from "../../api/adminApi";
import { Link } from "react-router-dom";
import "../../styles/dashboardLayout.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.data.users || res.data.data || []);
    } catch (err) {
      console.log("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= ADMIN ACTIONS ================= */

  const changeRole = async (id, role) => {
    if (!window.confirm("Change user role?")) return;
    try {
      setActionLoading(id);
      await updateUserRole(id, role);
      loadUsers();
    } catch {
      alert("Failed to update role");
    } finally {
      setActionLoading("");
    }
  };

  const toggleStatus = async (id) => {
    try {
      setActionLoading(id);
      await toggleUserStatus(id);
      loadUsers();
    } catch {
      alert("Failed to update status");
    } finally {
      setActionLoading("");
    }
  };

  const resetProgram = async (id) => {
    if (!window.confirm("Reset this user's active program?")) return;
    try {
      setActionLoading(id);
      await resetUserProgram(id);
      loadUsers();
    } catch {
      alert("Failed to reset program");
    } finally {
      setActionLoading("");
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm("⚠️ Permanently delete this user?")) return;
    try {
      setActionLoading(id);
      await deleteUser(id);
      loadUsers();
    } catch {
      alert("Failed to delete user");
    } finally {
      setActionLoading("");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="dashboard-page">

      <div className="dash-header">
        <h1>Admin — Users</h1>
        <p>Manage platform members</p>
      </div>

      <div className="dash-card glow" style={{ marginBottom: 24 }}>
        <strong>Total users:</strong> {users.length} &nbsp; | &nbsp;
        <strong>Admins:</strong> {users.filter(u => u.role === "admin").length} &nbsp; | &nbsp;
        <strong>Members:</strong> {users.filter(u => u.role === "user").length}
      </div>

      <div className="dash-card" style={{ marginBottom: 20 }}>
        <input
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div className="dash-section">
        <h3>Platform Users</h3>

        {loading && <p className="dash-muted">Loading users...</p>}
        {!loading && filteredUsers.length === 0 && (
          <p className="dash-muted">No users found.</p>
        )}

        <div className="dash-list">
          {filteredUsers.map((u) => (
            <div key={u._id} className="dash-item" style={{ alignItems: "flex-start" }}>

              {/* USER INFO */}
              <div>
                <strong>{u.name}</strong>
                <span>{u.email}</span>
                <small style={{ display: "block", opacity: 0.6 }}>
                  Role: {u.role} {u.disabled && "• Disabled"}
                </small>

                <Link to={`/admin/users/${u._id}`} className="dash-muted">
                  View full data →
                </Link>
              </div>

              {/* ACTIONS */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>

                <button
                  className="btn-outline"
                  disabled={actionLoading === u._id}
                  onClick={() =>
                    changeRole(u._id, u.role === "admin" ? "user" : "admin")
                  }
                >
                  {u.role === "admin" ? "Demote" : "Promote"}
                </button>

                <button
                  className="btn-outline"
                  disabled={actionLoading === u._id}
                  onClick={() => toggleStatus(u._id)}
                >
                  {u.disabled ? "Enable" : "Disable"}
                </button>

                <button
                  className="btn-outline"
                  disabled={actionLoading === u._id}
                  onClick={() => resetProgram(u._id)}
                >
                  Reset Program
                </button>

                <button
                  className="btn-danger"
                  disabled={actionLoading === u._id}
                  onClick={() => removeUser(u._id)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}