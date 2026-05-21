import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../Teacher/TeacherAddStudent/AddStudents.css";

function Avatar({ name }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";
  return <div className="avatar"><span>{initials}</span></div>;
}

export default function GuestManagement() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/auth/admin/users/");
      console.log("All users:", res.data); // 👈 check roles here
      // setGuests(res.data.filter((user) => user.role === "guest"));
      setGuests(res.data.filter((user) => user.role?.toLowerCase() === "guest"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guest?")) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/auth/admin/users/${id}/`);
      setGuests((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete guest. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <div className="table-section fade-in">
          <h3 className="section-title">Guests List ({guests.length})</h3>
          <div className="table-card">
            <div className="table-responsive">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Date Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5">Loading...</td></tr>
                  ) : guests.length === 0 ? (
                    <tr><td colSpan="5">No guests found</td></tr>
                  ) : (
                    guests.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="student-name-cell">
                            <Avatar name={user.first_name + " " + user.last_name} />
                            <span className="student-name">
                              {user.first_name} {user.last_name}
                            </span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge badge-review">{user.role}</span>
                        </td>
                        <td>{new Date(user.date_joined).toLocaleString()}</td>
                        <td>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDelete(user.id)}
                            disabled={deletingId === user.id}
                          >
                            {deletingId === user.id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}