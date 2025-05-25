import React, { useState, useEffect } from 'react'
import './SettingsPage.css'

const PreferencesSettings = () => {
  const [prefs, setPrefs] = useState({
    language: 'en',
    darkmode: false,
    font: 'system-ui',
    notifications: false,
  })

  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [error, setError] = useState('')

  const token = localStorage.getItem('jwt')

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch('http://localhost:8080/userPreferences/findUserPreferences', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        })

        if (!res.ok) throw new Error('Failed to fetch preferences')

        const data = await res.json()
        setPrefs(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load preferences')
      }
    }

    fetchPreferences()
  }, [token])

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setPrefs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveMessage('')
    setError('')

    try {
      const res = await fetch('http://localhost:8080/userPreferences/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prefs),
      })

      if (!res.ok) throw new Error('Failed to save preferences')

      const result = await res.json()
      setPrefs(result)
      setSaveMessage('Saved successfully')
    } catch (err) {
      console.error(err)
      setError('Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="settings-content">
      <div className="settings-title">
        <h1>Preferences</h1>
        <p>Shape the app to fit your style and needs.</p>
      </div>

      <form className="field-wrapper" onSubmit={handleSubmit}>

        <div className="field-container full-width">
          <label className="field-label" htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={prefs.language}
            onChange={handleChange}
            className="field-input"
          >
            <option value="english">English</option>
          </select>
        </div>

        <div className="field-container full-width">
          <label className="field-label" htmlFor="font">Font</label>
          <select
            id="font"
            name="font"
            value={prefs.font}
            onChange={handleChange}
            className="field-input"
          >
            <option value="system">System Default</option>
            <option value="roboto">Roboto</option>
            <option value="inter">Inter</option>
            <option value="georgia">Georgia</option>
            <option value="arial">Arial</option>
          </select>
        </div>

        <div className="field-container full-width toggle-row">
          <span className="field-label">Dark Mode</span>
          <label className="toggle">
            <input
              type="checkbox"
              name="darkmode"
              checked={prefs.darkmode}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="field-container full-width toggle-row">
          <span className="field-label">Enable Notifications</span>
          <label className="toggle">
            <input
              type="checkbox"
              name="notifications"
              checked={prefs.notifications}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="field-container full-width">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PreferencesSettings
