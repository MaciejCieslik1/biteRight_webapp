import React, { useState } from 'react'
import SettingsSidebar from '../../components/SettingsSidebar'
import AccountSettings from './AccountSettings'
import ProfileSettings from './ProfileSettings'
import TargetsSettings from './TargetsSettings'
import PreferencesSettings from './PreferencesSettings'
import './SettingsPage.css'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account')

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />
      case 'profile':
        return <ProfileSettings />
      case 'targets':
        return <TargetsSettings />
      case 'preferences':
        return <PreferencesSettings />
      default:
        return null
    }
  }

  return (
    <div className="settings-container">
      <SettingsSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default SettingsPage
