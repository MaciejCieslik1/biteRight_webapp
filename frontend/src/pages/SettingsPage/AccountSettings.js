import React, { useState, useEffect } from 'react'
import './SettingsPage.css'
import ChangePasswordModal from '../../components/PasswordModal'
import { jwtDecode } from 'jwt-decode'

const AccountSettings = () => {
  const token = localStorage.getItem("jwt")
  console.log(localStorage.getItem("jwt"))

console.log(jwtDecode(localStorage.getItem("jwt")))

  const [formData, setFormData] = useState(null)
  const [originalData, setOriginalData] = useState(null)
  const [addressId, setAddressId] = useState(null)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  useEffect(() => {
    const baseData = {
      username: 'username',
      email: 'email@gmail.com',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    }
    setOriginalData(baseData)
    setFormData({ ...baseData })

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
      .catch(() => {
        // No address found, leave fields blank
      })
  }, [token])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => setFormData({ ...originalData })

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
      .then((createdAddress) => {
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

  const handleCancelPassword = () => {
    setShowPasswordForm(false)
    setPasswords({ current: '', new: '', confirm: '' })
  }

  const handleSavePassword = () => {
    setShowPasswordForm(false)
    setPasswords({ current: '', new: '', confirm: '' })
  }

  if (!formData) return <p className="settings-content">Loading...</p>

  const infoChanged =
    formData.username !== originalData.username ||
    formData.email !== originalData.email

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
        {[
          { label: 'Username', name: 'username' },
          { label: 'Email', name: 'email' },
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

      {infoChanged && (
        <div className="field-actions" >
          <button className="save-btn" onClick={() => {
            setOriginalData(prev => ({ ...prev, username: formData.username, email: formData.email }))
            alert("Saved locally – backend not yet connected")
          }}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      )}

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

      <div className="field-actions" style={{ marginLeft: 80, marginTop: 20 }}>
  {addressChanged ? (
    <>
      <button
        className="save-btn"
        onClick={addressId ? handleUpdateAddress : handleCreateAddress}
      >
        {addressId ? 'Save' : 'Add Address'}
      </button>
      <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
    </>
  ) : (
    addressId && (
      <button
        className="save-btn"
        onClick={handleDeleteAddress}
      >
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
