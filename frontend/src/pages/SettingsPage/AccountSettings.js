import React, { useState } from 'react' 
import './SettingsPage.css'
import Field from '../../components/Field'
import ChangePasswordModal from '../../components/PasswordModal'

const AccountSettings = () => {
  const [username, setUsername] = useState('johndoe')
  const [email, setEmail] = useState('john@example.com')


  const [address, setAddress] = useState('ul. Marszałkowska 10')
  const [city, setCity] = useState('Warsaw')
  const [postalCode, setPostalCode] = useState('00-590')
  const [country, setCountry] = useState('Poland')

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const handleCancel = () => {
    setShowPasswordForm(false)
    setPasswords({ current: '', new: '', confirm: '' })
  }

  const handleSavePassword = () => {
  
    setShowPasswordForm(false)
    setPasswords({ current: '', new: '', confirm: '' })
  }

  return (
    <div className="settings-content">
      <div className="settings-title">
        <h1>Account</h1>
        <p>Manage your personal information and keep your account secure.</p>
      </div>

      <div className="settings-section">
        <div className="field-wrapper">
          <Field label="Username" value={username} onSave={setUsername} />
          <Field label="Email" value={email} onSave={setEmail} />
        </div>

        <button className="password-button" onClick={() => setShowPasswordForm(true)}>
          Change password
        </button>

        <hr />

        <div className="settings-title">
          <h2>Address</h2>
        </div>

        <div className="field-wrapper">
          <Field label="Address" value={address} onSave={setAddress} />
          <Field label="City" value={city} onSave={setCity} />
          <Field label="Postal Code" value={postalCode} onSave={setPostalCode} />
          <Field label="Country" value={country} onSave={setCountry} />
        </div>
      </div>

      {showPasswordForm && (
        <ChangePasswordModal
          passwords={passwords}
          setPasswords={setPasswords}
          onSave={handleSavePassword}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default AccountSettings
