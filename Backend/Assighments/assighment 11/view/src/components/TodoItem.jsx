import { useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function TodoItem({ todoName, todoDate, todoId, completed, onDeleteClick, onComplete, onUncheck, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState(todoName);
  const [editDate, setEditDate] = useState(todoDate ? todoDate.split("T")[0] : "");

  const handleUpdateSubmit = () => {
    onUpdate(todoId, editName, editDate);
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        <div className="row kg-row" style={{ textDecoration: completed ? "line-through" : "none", opacity: completed ? 0.6 : 1 }}>
          <div className="col-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={completed}
              onChange={() => completed ? onUncheck(todoId) : onComplete(todoId)}
            />
          </div>
          <div className="col-4">{todoName}</div>
          <div className="col-2">{formatDate(todoDate)}</div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary kg-button"
              onClick={() => setShowModal(true)}
            >
              Update
            </button>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-danger kg-button"
              onClick={() => onDeleteClick(todoId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h4 style={{ marginBottom: "20px" }}>Update Todo</h4>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Task</label>
              <input
                type="text"
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Date</label>
              <input
                type="date"
                className="form-control"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-success" onClick={handleUpdateSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoItem;
