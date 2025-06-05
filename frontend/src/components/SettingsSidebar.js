import React from 'react'
import { FaUser, FaIdBadge, FaTrophy, FaCog } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import './SettingsSidebar.css'

const SettingsSidebar = ({ setActiveTab, activeTab }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  }

  return (
    <div className='menu'>
      <div className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h3 className="title">Settings</h3>
      </div>

      <div className='menu--list'>
        <button
          className={`item ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          <FaUser className='menu-icon' />
          Account
        </button>

        <button
          className={`item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaIdBadge className='menu-icon' />
          Profile
        </button>

        <button
          className={`item ${activeTab === 'targets' ? 'active' : ''}`}
          onClick={() => setActiveTab('targets')}
        >
          <FaTrophy className='menu-icon' />
          Targets
        </button>

        <button
          className={`item ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <FaCog className='menu-icon' />
          Preferences
        </button>
      </div>
    </div>
  )
}

export default SettingsSidebar