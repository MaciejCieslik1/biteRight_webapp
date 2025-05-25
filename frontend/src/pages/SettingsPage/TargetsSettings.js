import React, { useState, useEffect } from 'react'
import './SettingsPage.css'

const TargetsSettings = () => {
  const token = localStorage.getItem('jwt')

  const [userGoal, setUserGoal] = useState(null)
  const [originalUserGoal, setOriginalUserGoal] = useState(null)
  const [userGoalLoading, setUserGoalLoading] = useState(true)

  const [dailyLimits, setDailyLimits] = useState(null)
  const [originalDailyLimits, setOriginalDailyLimits] = useState(null)
  const [dailyLimitsLoading, setDailyLimitsLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/userGoal/findUserGoal', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load user goal')
        return res.json()
      })
      .then(data => {
        setUserGoal(data)
        setOriginalUserGoal(data)
      })
      .catch(() => {
        setUserGoal(null)
        setOriginalUserGoal(null)
      })
      .finally(() => setUserGoalLoading(false))

    fetch('http://localhost:8080/dailyLimits/find', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load daily limits')
        return res.json()
      })
      .then(data => {
        setDailyLimits(data)
        setOriginalDailyLimits(data)
      })
      .catch(() => {
        setDailyLimits(null)
        setOriginalDailyLimits(null)
      })
      .finally(() => setDailyLimitsLoading(false))
  }, [token])

  const handleUserGoalChange = e => {
    const { name, value } = e.target
    setUserGoal(prev => ({
      ...prev,
      [name]: name === 'goalWeight' ? Number(value) : value
    }))
  }

  const handleDailyLimitsChange = e => {
    const { name, value } = e.target
    setDailyLimits(prev => ({ ...prev, [name]: Number(value) }))
  }

  const cancelUserGoalChanges = () => setUserGoal(originalUserGoal)
  const cancelDailyLimitsChanges = () => setDailyLimits(originalDailyLimits)

  const saveUserGoal = () => {
    if (!userGoal) return

    const payload = {
      goalType: userGoal.goalType,
      goalWeight: Number(userGoal.goalWeight),
      goalDate: userGoal.goalDate
    }

    console.log('Sending userGoal payload:', payload)

    fetch('http://localhost:8080/userGoal/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error updating user goal')
        return res.json()
      })
      .then(updated => {
        setUserGoal(updated)
        setOriginalUserGoal(updated)
        alert('User goal updated successfully')
      })
      .catch(err => alert(err.message))
  }

  const saveDailyLimits = () => {
    const method = dailyLimits && dailyLimits.dailyLimitId ? 'PUT' : 'POST'
    const url =
      method === 'PUT'
        ? 'http://localhost:8080/dailyLimits/update'
        : 'http://localhost:8080/dailyLimits/create'

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dailyLimits)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error saving daily limits')
        return res.json()
      })
      .then(saved => {
        setDailyLimits(saved)
        setOriginalDailyLimits(saved)
        alert('Daily limits saved successfully')
      })
      .catch(err => alert(err.message))
  }

  const userGoalChanged =
    userGoal &&
    originalUserGoal &&
    (
      userGoal.goalType !== originalUserGoal.goalType ||
      Number(userGoal.goalWeight) !== Number(originalUserGoal.goalWeight) ||
      userGoal.goalDate !== originalUserGoal.goalDate
    )

  const dailyLimitsChanged =
    dailyLimits &&
    originalDailyLimits &&
    (
      Number(dailyLimits.calorieLimit) !== Number(originalDailyLimits.calorieLimit) ||
      Number(dailyLimits.proteinLimit) !== Number(originalDailyLimits.proteinLimit) ||
      Number(dailyLimits.fatLimit) !== Number(originalDailyLimits.fatLimit) ||
      Number(dailyLimits.carbLimit) !== Number(originalDailyLimits.carbLimit) ||
      Number(dailyLimits.waterGoal) !== Number(originalDailyLimits.waterGoal)
    )

  if (userGoalLoading || dailyLimitsLoading) return <p className="settings-content">Loading...</p>

  return (
    <div className="settings-content">
      <div className="settings-title">
        <h1>Targets</h1>
        <p>Define your goals and daily limits to stay motivated and on track.</p>
      </div>

      <div className="settings-title">
        <h2>Goals</h2>
      </div>
      <div className="field-wrapper">
        <div className="field-container">
          <label className="field-label">Goal Type</label>
          <select
            name="goalType"
            className="field-input"
            value={userGoal?.goalType || ''}
            onChange={handleUserGoalChange}
          >
            <option value="">Select goal type</option>
            <option value="LOSE_WEIGHT">Lose Weight</option>
            <option value="GAIN_WEIGHT">Gain Weight</option>
            <option value="MAINTAIN_WEIGHT">Maintain Weight</option>
          </select>
        </div>

        <div className="field-container">
          <label className="field-label">Goal Weight (kg)</label>
          <input
            className="field-input"
            type="number"
            name="goalWeight"
            value={userGoal?.goalWeight || ''}
            onChange={handleUserGoalChange}
          />
        </div>

        <div className="field-container">
          <label className="field-label">goalDate</label>
          <input
            className="field-input"
            type="date"
            name="goalDate"
            value={userGoal?.goalDate || ''}
            onChange={handleUserGoalChange}
          />
        </div>
      </div>

      {userGoalChanged && (
        <div className="field-actions">
          <button className="save-btn" onClick={saveUserGoal}>Save</button>
          <button className="cancel-btn" onClick={cancelUserGoalChanges}>Cancel</button>
        </div>
      )}

      <hr />

      <div className="settings-title" style={{ marginTop: 40 }}>
        <h2>Daily Limits</h2>
      </div>
      <div className="field-wrapper">
        {[
          { label: 'Calorie Limit', name: 'calorieLimit' },
          { label: 'Protein Limit (g)', name: 'proteinLimit' },
          { label: 'Fat Limit (g)', name: 'fatLimit' },
          { label: 'Carbohydrate Limit (g)', name: 'carbLimit' },
          { label: 'Water Goal (ml)', name: 'waterGoal' }
        ].map(({ label, name }) => (
          <div key={name} className="field-container">
            <label className="field-label">{label}</label>
            <input
              className="field-input"
              type="number"
              min="0"
              name={name}
              value={dailyLimits?.[name] ?? ''}
              onChange={handleDailyLimitsChange}
            />
          </div>
        ))}
      </div>

      {dailyLimitsChanged && (
        <div className="field-actions">
          <button className="save-btn" onClick={saveDailyLimits}>Save</button>
          <button className="cancel-btn" onClick={cancelDailyLimitsChanges}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default TargetsSettings
