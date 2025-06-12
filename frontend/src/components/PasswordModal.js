import React from "react";
import "./styles/PasswordModal.css";

const ChangePasswordModal = ({ passwords, setPasswords, onSave, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Current password"
          value={passwords.current}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="New password"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={passwords.confirm}
          onChange={(e) =>
            setPasswords({ ...passwords, confirm: e.target.value })
          }
        />
        <div className="modal-buttons">
          <button className="save" onClick={onSave}>
            Save
          </button>
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
