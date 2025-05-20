import React, { useState, useEffect } from 'react'
import './Field.css'

const Field = ({ label, value, onSave }) => {
  const [editValue, setEditValue] = useState(value)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleCancel = () => {
    setEditValue(value)
    setTouched(false)
  }

  const handleSave = () => {
    if (editValue !== value) {
      onSave(editValue)
      setTouched(false)
    }
  }

  const handleChange = (e) => {
    setEditValue(e.target.value)
    setTouched(e.target.value !== value)
  }

  return (
    <div className="field-container">
      <label className="field-label">{label}</label>
      <input
        className="field-input"
        value={editValue}
        onChange={handleChange}
      />
      {touched && (
        <div className="field-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default Field
