import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, Key } from 'lucide-react';
import { toast } from 'sonner';

interface AdminLoginProps {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function AdminLogin({ isAdmin, onLogin, onLogout }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState<string>(() => {
    try {
      const savedPassword = localStorage.getItem('adminPassword');
      return savedPassword ?? 'admin123';
    } catch {
      return 'admin123';
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === storedPassword) {
      onLogin();
      setPassword('');
      setShowLogin(false);
      toast.success('Successfully logged in as admin');
    } else {
      toast.error('Incorrect password');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentPassword !== storedPassword) {
      toast.error('Current password is incorrect');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Save new password to localStorage
    localStorage.setItem('adminPassword', newPassword);
    setStoredPassword(newPassword);
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password changed successfully!');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset password to default (admin123)? This cannot be undone.')) {
      localStorage.removeItem('adminPassword');
      setStoredPassword('admin123');
      toast.success('Password reset to default: admin123');
    }
  };

  if (isAdmin) {
    return (
      <>
        <div className="admin-login-button">
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setShowChangePassword(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                padding: 'var(--spacing-2) var(--spacing-4)',
                backgroundColor: 'rgba(6, 182, 212, 0.9)',
                backdropFilter: 'blur(4px)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(8, 145, 178, 0.9)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.9)'}
              title="Change Password"
            >
              <Key size={18} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                padding: 'var(--spacing-2) var(--spacing-4)',
                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                backdropFilter: 'blur(4px)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.9)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.9)'}
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </div>

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="modal-content admin-login-modal"
              style={{ border: '1px solid var(--color-slate-700)' }}
            >
              <h3 className="modal-title">Change Password</h3>
              <p style={{ color: 'var(--color-slate-400)', fontSize: '0.875rem', marginBottom: 'var(--spacing-6)' }}>
                Update your admin password
              </p>

              <form onSubmit={handleChangePassword} className="modal-form">
                <div className="form-group">
                  <label htmlFor="current-password" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter current password"
                    autoFocus
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter new password (min 6 characters)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="flex gap-4" style={{ flexDirection: 'column' }}>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowChangePassword(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="btn btn-ghost"
                    style={{
                      fontSize: '0.875rem',
                      padding: 'var(--spacing-2) var(--spacing-4)',
                      color: 'var(--color-slate-500)'
                    }}
                  >
                    Reset to Default Password
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        style={{
          position: 'fixed',
          bottom: 'var(--spacing-4)',
          right: 'var(--spacing-4)',
          width: '3rem',
          height: '3rem',
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          backdropFilter: 'blur(4px)',
          border: '1px solid var(--color-slate-700)',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-slate-400)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 40
        }}
        title="Admin Login"
        onMouseOver={(e) => {
          e.currentTarget.style.color = 'var(--color-cyan-400)';
          e.currentTarget.style.borderColor = 'var(--color-cyan-500)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'var(--color-slate-400)';
          e.currentTarget.style.borderColor = 'var(--color-slate-700)';
        }}
      >
        <Lock size={20} />
      </button>

      {showLogin && (
        <div className="modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content admin-login-modal"
            style={{ border: '1px solid var(--color-slate-700)' }}
          >
            <h3 className="modal-title">Admin Login</h3>
            <p style={{ color: 'var(--color-slate-400)', fontSize: '0.875rem', marginBottom: 'var(--spacing-6)' }}>
              Enter password to access editing features
            </p>

            <form onSubmit={handleLogin} className="modal-form">
              <div className="form-group">
                <label htmlFor="admin-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter admin password"
                  autoFocus
                />
                {storedPassword === 'admin123' && (
                  <p style={{ color: 'var(--color-slate-500)', fontSize: '0.75rem', marginTop: 'var(--spacing-2)' }}>
                    Default password: admin123
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogin(false);
                    setPassword('');
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
