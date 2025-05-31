import React, { useState, useEffect } from 'react'
import './SettingsPage.css'

const ProfileSettings = () => {
  const token = localStorage.getItem('jwt')

  const [formData, setFormData] = useState(null)
  const [originalData, setOriginalData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const baseData = {
      name: '',
      surname: '',
      age: '',
      weight: '',
      height: '',
      lifestyle: '',
      bmi: '',
    }
    setOriginalData(baseData)
    setFormData({ ...baseData })

    fetch('http://localhost:8080/userInfo/findUserInfo', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error while loading data')
        return res.json()
      })
      .then(data => {
        setOriginalData(data)
        setFormData(data)
      })
      .catch(() => {
      })
      .finally(() => setLoading(false))
  }, [token])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => setFormData({ ...originalData })

  const handleSave = () => {
    fetch('http://localhost:8080/userInfo/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error updating profile')
        return res.json()
      })
      .then(updatedData => {
        setOriginalData(updatedData)
        setFormData(updatedData)
        alert('Profile updated successfully')
      })
      .catch(err => alert(err.message))
  }

  if (loading || !formData) return <p className="settings-content">Loading...</p>

  const infoChanged = Object.keys(formData).some(key => formData[key] !== originalData[key])

return (
  <div className="settings-content">
    <div className="settings-title">
      <h1>Profile</h1>
      <p>Keep your personal details up to date to get the most from your journey.</p>
    </div>

    <div className="field-wrapper">
      {[
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Surname', name: 'surname', type: 'text' },
        { label: 'Age', name: 'age', type: 'number' },
        { label: 'Lifestyle', name: 'lifestyle', type: 'text' },
        { label: 'Weight (kg)', name: 'weight', type: 'number' },
        { label: 'Height (cm)', name: 'height', type: 'number' },
      ].map(({ label, name, type, readOnly }) => (
        <div key={name} className="field-container" style={{ width: '100%' }}>
          <label className="field-label">{label}</label>
          <input
            className="field-input"
            name={name}
            value={formData[name] || ''}
            placeholder={label}
            onChange={handleChange}
            type={type}
            readOnly={readOnly}
          />
        </div>
      ))}
    </div>

    <div className="bmi-info">
      BMI: {formData.bmi || 'N/A'}
    </div>


    {infoChanged && (
      <div className="field-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    )}
  </div>
)
}

export default ProfileSettings
