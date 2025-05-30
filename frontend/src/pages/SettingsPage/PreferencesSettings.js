import React, { useEffect, useRef, useState } from 'react'
import './SettingsPage.css'
import { usePreferences } from '../../contexts/PreferencesContext'

const PreferencesSettings = () => {
  const { prefs, setPrefs } = usePreferences()
  const [saving, setSaving] = useState(false)
  const initialPrefsRef = useRef(prefs)

  useEffect(() => {
    if (prefs) {
      initialPrefsRef.current = prefs
    }
  }, [prefs])

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setPrefs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const isPrefsChanged = JSON.stringify(prefs) !== JSON.stringify(initialPrefsRef.current)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isPrefsChanged) return

    setSaving(true)

    try {
      const token = localStorage.getItem('jwt')
      const res = await fetch('http://localhost:8080/userPreferences/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prefs),
      })

      if (!res.ok) throw new Error('Failed to save preferences')

      const result = await res.json()
      setPrefs(result)
      initialPrefsRef.current = result
      alert('Preferences saved successfully!')
    } catch (err) {
      alert('Failed to save preferences.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (!prefs) return null

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
            <option value="en">English</option>
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
            <option value="system-ui">System Default</option>
            <option value="arial">Arial</option>
            <option value="roboto">Roboto</option>
            <option value="inter">Inter</option>
            <option value="georgia">Georgia</option>
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

        {isPrefsChanged && (
          <div className="field-container full-width">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default PreferencesSettings
