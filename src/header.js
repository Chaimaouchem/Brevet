import React, { useState, useEffect } from 'react';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from 'react-icons/bs';

function Header({ OpenSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Charger les notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8080/api/notifications/notifications', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error("Erreur serveur");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Erreur de récupération des notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:8080/api/notifications/${id}/read`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification:", error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Format local lisible
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>

      <div className='header-left'>
        <BsSearch className='icon' />
      </div>

      <div className='header-right' style={{ position: 'relative' }}>
        {/* Bell Icon */}
        <div style={{ position: 'relative' }}>
          <BsFillBellFill
            className='icon'
            onClick={toggleNotifications}
            style={{ cursor: 'pointer' }}
            aria-label="Notifications"
          />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px'
            }}>
              {unreadCount}
            </span>
          )}

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '0',
              backgroundColor: '#fff',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              padding: '10px',
              zIndex: 1000,
              width: '300px',
              maxHeight: '350px',
              overflowY: 'auto'
            }}>
              <h4 style={{ marginBottom: '10px' }}>Notifications reçues</h4>
              {notifications.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>Aucune notification</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: '10px',
                      marginBottom: '8px',
                      borderRadius: '6px',
                      backgroundColor: notif.read ? '#f9f9f9' : '#e6f0ff',
                      cursor: 'pointer'
                    }}
                    onClick={() => markAsRead(notif.id)}
                    role="button"
                    aria-pressed={notif.read}
                  >
                    <strong>{notif.title}</strong>
                    <p style={{ margin: '4px 0' }}>{notif.message}</p>
                    <small style={{ color: '#555' }}>{formatDate(notif.timestamp)}</small>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
      </div>
    </header>
  );
}

export default Header;
