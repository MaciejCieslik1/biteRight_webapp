import React, { useState, useEffect } from 'react'
import './SettingsPage.css'
import ChangePasswordModal from '../../components/PasswordModal'

const AccountSettings = () => {
  const token = localStorage.getItem("jwt")
  const [formData, setFormData] = useState(null)
  const [originalData, setOriginalData] = useState(null)
  const [addressId, setAddressId] = useState(null)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  useEffect(() => {
    const baseData = {
      username: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    }

    setOriginalData(baseData)
    setFormData({ ...baseData })

    fetch('http://localhost:8080/user/find', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async res => {
        if (!res.ok) throw new Error("Failed to fetch user info")
        const text = await res.text()
        return JSON.parse(text)
      })
      .then(userData => {
        const { username, email } = userData
        setOriginalData(prev => ({ ...prev, username, email }))
        setFormData(prev => ({ ...prev, username, email }))
      })
      .catch(err => console.error("Error fetching user info:", err))

    fetch('http://localhost:8080/address/find', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('No address found')
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const address = data[0]
          setAddressId(address.addressId)
          const updatedData = {
            address: address.address || '',
            city: address.city || '',
            postalCode: address.postalCode || '',
            country: address.country || '',
          }
          setOriginalData(prev => ({ ...prev, ...updatedData }))
          setFormData(prev => ({ ...prev, ...updatedData }))
        }
      })
      .catch(() => {})
  }, [token])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancelUsername = () => {
    setFormData(prev => ({ ...prev, username: originalData.username }))
  }

  const handleCancelEmail = () => {
    setFormData(prev => ({ ...prev, email: originalData.email }))
  }

  const handleSaveUsername = () => {
    fetch('http://localhost:8080/api/auth/changeusername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newUsername: formData.username }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error updating username")
        return res.text()
      })
      .then(() => {
        setOriginalData(prev => ({ ...prev, username: formData.username }))
        alert("Username updated successfully")
      })
      .catch(err => alert(err.message))
  }

  const handleSaveEmail = () => {
    fetch('http://localhost:8080/api/auth/changeemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newEmail: formData.email }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error updating email")
        return res.text()
      })
      .then(newToken => {
        localStorage.setItem("jwt", newToken)
        setOriginalData(prev => ({ ...prev, email: formData.email }))
        alert("Email updated successfully")
      })
      .catch(err => alert(err.message))
  }

  const handleCreateAddress = () => {
    fetch('http://localhost:8080/address/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error creating address')
        return res.json()
      })
      .then(createdAddress => {
        setAddressId(createdAddress.addressId)
        setOriginalData({ ...formData })
        alert('Address added successfully')
      })
      .catch(err => alert(err.message))
  }

  const handleUpdateAddress = () => {
    if (!addressId) return alert("No address ID found for update")

    fetch(`http://localhost:8080/address/update/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error updating address')
        return res.json()
      })
      .then(() => {
        setOriginalData({ ...formData })
        alert('Address updated successfully')
      })
      .catch(err => alert(err.message))
  }

  const handleDeleteAddress = () => {
    if (!addressId) return alert("No address to delete")
    const confirmDelete = window.confirm("Are you sure you want to delete your address?")
    if (!confirmDelete) return

    fetch(`http://localhost:8080/address/delete/${addressId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error deleting address')
        return res.text()
      })
      .then(() => {
        const cleared = {
          address: '',
          city: '',
          postalCode: '',
          country: '',
        }
        setFormData(prev => ({ ...prev, ...cleared }))
        setOriginalData(prev => ({ ...prev, ...cleared }))
        setAddressId(null)
        alert("Address deleted.")
      })
      .catch(err => alert(err.message))
  }

  const handleSavePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirmation do not match")
      return
    }

    fetch("http://localhost:8080/api/auth/changepassword", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: passwords.current,
      newPassword: passwords.new,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error changing password")
        return res.text()
      })
      .then(() => {
        alert("Password changed successfully")
        setShowPasswordForm(false)
        setPasswords({ current: '', new: '', confirm: '' })
      })
      .catch(err => alert(err.message))
  }

  const handleCancelPassword = () => {
    setShowPasswordForm(false)
    setPasswords({ current: '', new: '', confirm: '' })
  }

  if (!formData) return <p className="settings-content">Loading...</p>

  const usernameChanged = formData.username !== originalData.username
  const emailChanged = formData.email !== originalData.email

  const addressChanged =
    formData.address !== originalData.address ||
    formData.city !== originalData.city ||
    formData.postalCode !== originalData.postalCode ||
    formData.country !== originalData.country

  return (
    <div className="settings-content">
      <div className="settings-title">
        <h1>Account</h1>
        <p>Manage your personal information and keep your account secure.</p>
      </div>

      <div className="field-wrapper">
        <div className="field-container">
          <label className="field-label">Username</label>
          <input
            className="field-input"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {usernameChanged && (
            <div className="field-actions">
              <button className="save-btn" onClick={handleSaveUsername}>Save</button>
              <button className="cancel-btn" onClick={handleCancelUsername}>Cancel</button>
            </div>
          )}
        </div>

        <div className="field-container">
          <label className="field-label">Email</label>
          <input
            className="field-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {emailChanged && (
            <div className="field-actions">
              <button className="save-btn" onClick={handleSaveEmail}>Save</button>
              <button className="cancel-btn" onClick={handleCancelEmail}>Cancel</button>
            </div>
          )}
        </div>
      </div>

      <button className="password-button" onClick={() => setShowPasswordForm(true)}>
        Change password
      </button>

      <hr />

      <div className="settings-title">
        <h2>Address</h2>
      </div>

      <div className="field-wrapper">
        {[
          { label: 'Address', name: 'address' },
          { label: 'City', name: 'city' },
          { label: 'Postal Code', name: 'postalCode' },
          { label: 'Country', name: 'country' },
        ].map(({ label, name }) => (
          <div key={name} className="field-container">
            <label className="field-label">{label}</label>
            <input
              className="field-input"
              name={name}
              value={formData[name] || ''}
              placeholder={label}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div className="field-actions">
        {addressChanged ? (
          <>
            <button
              className="save-btn"
              onClick={addressId ? handleUpdateAddress : handleCreateAddress}
            >
              {addressId ? 'Save' : 'Add Address'}
            </button>
            <button className="cancel-btn" onClick={() => setFormData({ ...originalData })}>Cancel</button>
          </>
        ) : (
          addressId && (
            <button className="save-btn" onClick={handleDeleteAddress}>
              Delete Address
            </button>
          )
        )}
      </div>

      {showPasswordForm && (
        <ChangePasswordModal
          passwords={passwords}
          setPasswords={setPasswords}
          onSave={handleSavePassword}
          onCancel={handleCancelPassword}
        />
      )}
    </div>
  )
}

export default AccountSettings
