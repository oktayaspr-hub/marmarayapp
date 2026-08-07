import React, { useState, useEffect } from 'react';
import { stations, calculateDistances } from '../data';
import { ISTANBUL_DISTRICTS } from '../data/istanbulDistricts';
import { calculateRoute } from '../utils/router';
import TransitIcon from './TransitIcon';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BatteryOptimization } from '@capawesome-team/capacitor-android-battery-optimization';
import { useTranslation } from 'react-i18next';
import './HamburgerMenu.css';

export default function HamburgerMenu({ currentStationId, currentDirection, onShowInterstitial }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [destinationId, setDestinationId] = useState('');
  const [timerEnd, setTimerEnd] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  const [activeView, setActiveView] = useState('menu');
  const [customOriginId, setCustomOriginId] = useState('');
  
  // Ayarlar State
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem('marmaray_notifications') !== 'false'
  );
  const [menuTheme, setMenuTheme] = useState(
    localStorage.getItem('marmaray_menu_theme') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('marmaray_notifications', notificationsEnabled);
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('marmaray_menu_theme', menuTheme);
  }, [menuTheme]);
  
  // Notification Channel
  useEffect(() => {
    LocalNotifications.createChannel({
      id: 'alarm_channel',
      name: t('menu_alarm'),
      description: t('alarm_channel_desc'),
      importance: 5,
      visibility: 1,
      vibration: true,
      sound: 'default'
    }).catch(err => console.log('Channel creation error:', err));
  }, []);
  
  const [ucretOriginId, setUcretOriginId] = useState('');
  const [ucretDestId, setUcretDestId] = useState('');
  const [passengerType, setPassengerType] = useState('tam');

  // Rota Planlama State
  const [routeOriginStation, setRouteOriginStation] = useState('');
  const [routeTargetDistrict, setRouteTargetDistrict] = useState('');
  const [routeTargetNode, setRouteTargetNode] = useState('');
  const [routeMode, setRouteMode] = useState('fastest');
  const [routeResult, setRouteResult] = useState(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);

  const handleCalculateRoute = async (modeOverride = routeMode) => {
    if (!routeOriginStation || !routeTargetDistrict) return;
    setIsCalculatingRoute(true);
    setRouteResult(null);
    if (onShowInterstitial) onShowInterstitial();
    const res = await calculateRoute(routeOriginStation, routeTargetDistrict, modeOverride, routeTargetNode);
    setRouteResult(res);
    setIsCalculatingRoute(false);
  };

  const { cumulativeHalkaliToGebze, cumulativeGebzeToHalkali } = calculateDistances();

  // Get valid destinations based on current station (allow all directions)
  const activeOriginId = customOriginId || currentStationId;
  const originIndex = stations.findIndex(s => s.id === activeOriginId);
  
  const validDestinations = stations.filter(s => s.id !== activeOriginId);

  const requestPermissions = async () => {
    try {
      let permStatus = await LocalNotifications.checkPermissions();
      if (permStatus.display === 'prompt') {
        permStatus = await LocalNotifications.requestPermissions();
      }
      return permStatus.display === 'granted';
    } catch(e) {
      return false;
    }
  };

  const handleBatteryOptimization = async () => {
    try {
      const { isEnabled } = await BatteryOptimization.isBatteryOptimizationEnabled();
      if (isEnabled) {
        await BatteryOptimization.requestIgnoreBatteryOptimization();
      } else {
        alert(t("battery_opt_disabled"));
      }
    } catch (e) {
      console.log('Battery optimization check failed:', e);
    }
  };

  const startAlarm = async () => {
    if (onShowInterstitial) onShowInterstitial();
    if (!destinationId) return;
    const destIndex = stations.findIndex(s => s.id === Number(destinationId));
    let travelTimeMinutes = 0;

    if (destIndex > originIndex) {
      travelTimeMinutes = cumulativeHalkaliToGebze[destIndex] - cumulativeHalkaliToGebze[originIndex];
    } else {
      travelTimeMinutes = cumulativeGebzeToHalkali[destIndex] - cumulativeGebzeToHalkali[originIndex];
    }

    const alarmTime = Date.now() + travelTimeMinutes * 60 * 1000;
    
    if (notificationsEnabled) {
      const granted = await requestPermissions();
      if (granted) {
        try {
          const { isEnabled } = await BatteryOptimization.isBatteryOptimizationEnabled();
          if (isEnabled) {
            await BatteryOptimization.requestIgnoreBatteryOptimization();
          }
        } catch(e) {}

        let notifyTime = alarmTime - 180 * 1000;
        if (notifyTime <= Date.now()) notifyTime = Date.now() + 2000;
        
        await LocalNotifications.schedule({
          notifications: [
            {
              title: t("alarm_notif_title"),
              body: t("alarm_notif_body"),
              id: 1,
              smallIcon: "bildirim_icon",
              iconColor: "#00a8ff",
              schedule: { at: new Date(notifyTime) },
              channelId: "alarm_channel"
            }
          ]
        });
      }
    }

    setTimerEnd(alarmTime);
    setAlarmTriggered(false);
  };

  const cancelAlarm = async () => {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
    } catch(e) {}
    setTimerEnd(null);
    setTimeLeft(null);
    setAlarmTriggered(false);
  };

  useEffect(() => {
    if (!timerEnd) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((timerEnd - Date.now()) / 1000));
      setTimeLeft(remaining);

      // Web fallback trigger at 3 minutes (180 seconds)
      if (remaining <= 180 && remaining > 0 && !alarmTriggered) {
        setAlarmTriggered(true);
        if (navigator.vibrate) {
          navigator.vibrate([500, 200, 500, 200, 500]); // Vibrate pattern
        }
        // LocalNotification native popup will handle the actual alert if enabled
      }

      if (remaining === 0) {
        setTimerEnd(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerEnd, alarmTriggered]);

  const formatTime = (seconds) => {
    if (seconds === null) return '';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <button className="hamburger-btn" onClick={() => setIsOpen(true)} title="Menü">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(false)}></div>}

      <div className={`side-menu ${isOpen ? 'open' : ''} ${menuTheme === 'dark' ? 'dark-theme' : ''}`}>
        <div className="menu-header">
          <h2>{t("menu_title")}</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        {activeView !== 'menu' && (
          <div className="menu-back-header" style={{ padding: '15px 25px', background: '#ffffff', borderBottom: '1px solid #f1f2f6' }}>
            <button 
              onClick={() => setActiveView('menu')} 
              style={{ background: 'transparent', border: 'none', color: '#00a8ff', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              {t("back_btn")}
            </button>
          </div>
        )}

        <div className="menu-content" style={{ padding: activeView === 'menu' ? '0' : '20px' }}>
          {activeView === 'menu' && (
            <ul className="vertical-menu-list">
              <li onClick={() => setActiveView('odeme')}>{t('menu_qr')}</li>
              <li onClick={() => setActiveView('rota')}>{t('menu_route')}</li>
              <li onClick={() => setActiveView('alarm')}>{t('menu_alarm')}</li>
              <li onClick={() => setActiveView('ucret')}>{t('menu_fare')}</li>
              <li onClick={() => setActiveView('ayarlar')}>{t('menu_settings')}</li>
              <li onClick={() => setActiveView('iletisim')}>{t('menu_contact')}</li>
              <li onClick={() => setActiveView('hakkinda')}>{t('menu_about')}</li>
            </ul>
          )}

          {activeView === 'hakkinda' && (
            <div className="about-section">
              <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem', color: 'var(--menu-text-color, #2f3640)', fontWeight: '800' }}>{t('menu_about')}</h3>
              <div style={{ padding: '20px', background: 'var(--menu-item-bg, #f8f9fa)', borderRadius: '12px', border: '1px solid var(--menu-border-color, #f1f2f6)', textAlign: 'center', color: 'var(--menu-text-color, #7f8fa6)' }}>
                <p>{t('menu_about_desc')}</p>
              </div>
            </div>
          )}

          {activeView === 'iletisim' && (
            <div className="contact-section">
              <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem', color: 'var(--menu-text-color, #2f3640)', fontWeight: '800' }}>{t('menu_contact')}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                <div style={{ padding: '15px', background: 'rgba(0, 168, 255, 0.05)', borderRadius: '12px', borderLeft: '4px solid #00a8ff', textAlign: 'left' }}>
                  <div style={{ fontWeight: '700', color: '#2f3640', marginBottom: '4px', fontSize: '0.95rem' }}>{t("support_feedback_title")}</div>
                  <div style={{ fontSize: '0.85rem', color: '#7f8fa6', marginBottom: '6px' }}>{t("support_feedback_desc")}</div>
                  <a href="mailto:destek@marmarayapp.com" style={{ color: '#00a8ff', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.95rem' }}>destek@marmarayapp.com</a>
                </div>

                <div style={{ padding: '15px', background: 'rgba(0, 168, 255, 0.05)', borderRadius: '12px', borderLeft: '4px solid #00a8ff', textAlign: 'left' }}>
                  <div style={{ fontWeight: '700', color: '#2f3640', marginBottom: '4px', fontSize: '0.95rem' }}>{t("corporate_collab_title")}</div>
                  <div style={{ fontSize: '0.85rem', color: '#7f8fa6', marginBottom: '6px' }}>{t("corporate_collab_desc")}</div>
                  <a href="mailto:info@marmarayapp.com" style={{ color: '#00a8ff', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.95rem' }}>info@marmarayapp.com</a>
                </div>
              </div>

              <div style={{ padding: '20px', background: 'var(--menu-item-bg, #f8f9fa)', borderRadius: '12px', border: '1px solid var(--menu-border-color, #f1f2f6)', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#2f3640', fontSize: '1.1rem' }}>{t("contact_form_title")}</h4>
                
                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '6px', display: 'block', fontSize: '0.9rem' }}>{t("form_name")}</label>
                  <input type="text" placeholder={t("form_name_ph")} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', background: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                </div>
                
                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '6px', display: 'block', fontSize: '0.9rem' }}>{t("form_email")}</label>
                  <input type="email" placeholder={t("form_email_ph")} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', background: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                </div>
                
                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '6px', display: 'block', fontSize: '0.9rem' }}>{t("form_msg")}</label>
                  <textarea rows="4" placeholder={t("form_msg_ph")} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', background: '#fff', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box' }}></textarea>
                </div>
                
                <button 
                  onClick={() => alert(t("msg_sent_demo"))}
                  style={{ width: '100%', padding: '14px', background: '#00a8ff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 168, 255, 0.2)' }}
                >
                  {t("form_send")}
                </button>
              </div>
            </div>
          )}

          {activeView === 'ayarlar' && (
            <div className="settings-section">
              <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem', color: 'var(--menu-text-color, #2f3640)', fontWeight: '800' }}>{t('menu_settings')}</h3>
              
              <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'var(--menu-item-bg, #f8f9fa)', borderRadius: '12px', marginBottom: '10px' }}>
                <span style={{ fontWeight: '600', color: 'var(--menu-text-color, #2f3640)' }}>{t('settings_notif')}</span>
                <label className="switch">
                  <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'var(--menu-item-bg, #f8f9fa)', borderRadius: '12px', marginBottom: '10px' }}>
                <span style={{ fontWeight: '600', color: 'var(--menu-text-color, #2f3640)' }}>{t("menu_theme")}</span>
                <select 
                  className="theme-select" 
                  value={menuTheme} 
                  onChange={(e) => setMenuTheme(e.target.value)}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--menu-border-color, #dcdde1)', background: 'var(--menu-bg-color, #fff)', color: 'var(--menu-text-color, #2f3640)' }}
                >
                  <option value="light">{t("theme_light")}</option>
                  <option value="dark">{t("theme_dark")}</option>
                </select>
              </div>

              <div className="setting-item" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', background: 'var(--menu-item-bg, #f8f9fa)', borderRadius: '12px', marginBottom: '10px' }}>
                <span style={{ fontWeight: '600', color: 'var(--menu-text-color, #2f3640)' }}>{t("battery_opt_title")}</span>
                <p style={{ fontSize: '0.85rem', margin: '0', color: 'var(--menu-text-color, #7f8fa6)' }}>{t("battery_opt_desc")}</p>
                <button 
                  onClick={handleBatteryOptimization}
                  style={{ padding: '10px', background: '#00a8ff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {t("battery_opt_btn")}
                </button>
              </div>

              <button 
                onClick={() => {
                  if(window.confirm(t('clear_cache_confirm'))) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                style={{ width: '100%', padding: '15px', marginTop: '10px', background: '#e84118', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {t("clear_cache_btn")}
              </button>
            </div>
          )}

          {activeView === 'alarm' && (
            <div className="alarm-section">
              <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem', color: 'var(--menu-text-color, #2f3640)', fontWeight: '800' }}>{t('menu_alarm')}</h3>
              <p style={{ fontSize: '0.85rem', color: '#7f8fa6', marginBottom: '15px', lineHeight: '1.4' }}>
                {t('alarm_desc')}
              </p>
              
              <div className="input-group">
                <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>{t('origin_station')}</label>
                <select 
                  className="station-select light-select" 
                  value={activeOriginId} 
                  onChange={(e) => {
                    setCustomOriginId(Number(e.target.value));
                    setDestinationId('');
                  }}
                  disabled={!!timerEnd}
                >
                  {stations.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-group" style={{ marginTop: '20px' }}>
                <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>{t('dest_station')}</label>
                <select 
                  className="station-select light-select" 
                  value={destinationId} 
                  onChange={(e) => setDestinationId(e.target.value)}
                  disabled={!!timerEnd}
                >
                  <option value="">{t('select_option')}</option>
                  {validDestinations.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {timerEnd ? (
                <div className="timer-display">
                  <div className="timer-countdown">{formatTime(timeLeft)}</div>
                  <div className="timer-label">{t("remaining_time_label")}</div>
                  <button className="alarm-btn cancel" onClick={cancelAlarm}>{t("cancel_alarm")}</button>
                </div>
              ) : (
                <button 
                  className="alarm-btn start" 
                  onClick={startAlarm}
                  disabled={!destinationId}
                  style={{ opacity: !destinationId ? 0.5 : 1 }}
                >
                  {t("start_alarm")}
                </button>
              )}

              <div className="algo-disclaimer-box">
                <div className="disclaimer-header">
                  <span>⚠️</span>
                  <strong>{t("alarm_warning_title")}</strong>
                </div>
                <p>
                  {t("alarm_warning_desc")}
                </p>
              </div>
            </div>
          )}

          {activeView === 'odeme' && (
            <div className="payment-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '10px' }}>
              <div style={{ background: '#e84118', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 4px 15px rgba(232, 65, 24, 0.4)' }}>
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="7" y="7" width="3" height="3"></rect>
                  <rect x="14" y="7" width="3" height="3"></rect>
                  <rect x="7" y="14" width="3" height="3"></rect>
                  <rect x="14" y="14" width="3" height="3"></rect>
                </svg>
              </div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: '#2f3640', fontWeight: '800' }}>{t('menu_qr')}</h3>
              <p style={{ color: '#7f8fa6', marginBottom: '30px', lineHeight: '1.6', fontSize: '1.05rem' }}>
                {t('menu_qr_desc')}
              </p>
              
              <button 
                onClick={() => {
                  window.location.href = "intent://#Intent;scheme=istanbulkart;package=com.belbim.istanbulkart;end";
                  setTimeout(() => {
                    window.location.href = "istanbulkart://";
                  }, 500);
                }}
                style={{
                  background: '#00a8ff',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 168, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {t("open_istanbulkart")}
              </button>
            </div>
          )}

          {activeView === 'ucret' && (() => {
            const prices = {
                tam: [17.70, 22.67, 26.14, 29.89, 34.87, 39.17, 39.17],
                ogrenci: [8.64, 10.14, 12.01, 14.39, 16.89, 17.70, 17.70],
                ucretsiz: [0, 0, 0, 0, 0, 0, 0],
                indirimli: [12.67, 15.05, 17.18, 19.93, 22.31, 24.19, 24.19],
            };

            let fare = null;
            if (ucretOriginId && ucretDestId) {
                if (ucretOriginId === ucretDestId) {
                  fare = t('same_station');
                } else if (passengerType === 'ucretsiz') {
                  fare = t('free');
                } else {
                  const dist = Math.abs(parseInt(ucretDestId) - parseInt(ucretOriginId));
                  let tier = 0;
                  if (dist >= 1 && dist <= 7) tier = 0;
                  else if (dist >= 8 && dist <= 14) tier = 1;
                  else if (dist >= 15 && dist <= 21) tier = 2;
                  else if (dist >= 22 && dist <= 28) tier = 3;
                  else if (dist >= 29 && dist <= 35) tier = 4;
                  else tier = 5;

                  fare = `${prices[passengerType][tier].toFixed(2)} TL`;
                }
            }

            return (
              <div className="fare-calculator-section" style={{ padding: '5px' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem', color: '#2f3640', fontWeight: '800' }}>{t('menu_fare')}</h3>
                <p style={{ fontSize: '0.85rem', color: '#7f8fa6', marginBottom: '15px', lineHeight: '1.4' }}>
                  {t('menu_fare_desc')}
                </p>
                
                <div className="input-group">
                  <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>{t('origin_station')}</label>
                  <select className="station-select light-select" value={ucretOriginId} onChange={(e) => setUcretOriginId(e.target.value)}>
                    <option value="">{t('select_option')}</option>
                    {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div className="input-group" style={{ marginTop: '15px' }}>
                  <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>{t('dest_station')}</label>
                  <select className="station-select light-select" value={ucretDestId} onChange={(e) => setUcretDestId(e.target.value)}>
                    <option value="">{t('select_option')}</option>
                    {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div className="input-group" style={{ marginTop: '15px' }}>
                  <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>{t('passenger_type')}</label>
                  <select className="station-select light-select" value={passengerType} onChange={(e) => setPassengerType(e.target.value)}>
                    <option value="tam">{t('pass_full')}</option>
                    <option value="ogrenci">{t('pass_student')}</option>
                    <option value="indirimli">{t('pass_social')}</option>
                    <option value="ucretsiz">{t('pass_free')}</option>
                  </select>
                </div>

                {fare && (
                  <div style={{ marginTop: '25px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #f1f2f6', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: '#7f8fa6', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{t('calc_fare_label')}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: fare === 'ÜCRETSİZ' ? '#27ae60' : '#00a8ff' }}>{fare}</div>
                  </div>
                )}

                <div style={{ marginTop: '25px', padding: '15px', background: 'rgba(232, 65, 24, 0.05)', borderRadius: '12px', borderLeft: '4px solid #e84118' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                    <p style={{ margin: '0', fontSize: '0.9rem', color: '#2f3640', lineHeight: '1.5' }}>
                      <strong>{t('refund_title')}</strong ><br />
                      {t('refund_desc')}
                    </p>
                  </div>
                </div>

                <div className="algo-disclaimer-box">
                  <div className="disclaimer-header">
                    <span>⚠️</span>
                    <strong>Algoritmik Ücret Uyarısı</strong>
                  </div>
                  <p>
                    Hesaplanan biniş ücretleri resmi TCDD/UKOME tarifesi <strong>matematiksel algoritmaya</strong> dökülerek sunulmaktadır. Resmi makamlarca yapılabilecek anlık tarife değişiklikleri veya özel abonman/aktarma hakları sebebiyle turnikelerden çekilen gerçek bakiyede farklılıklar oluşabilir.
                  </p>
                </div>
              </div>
            );
          })()}

          {activeView === 'rota' && (
            <div className="route-planner-section" style={{ padding: '5px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#2f3640', fontWeight: '800' }}>{t('menu_route')}</h3>
              <p style={{ fontSize: '0.85rem', color: '#7f8fa6', marginBottom: '15px', lineHeight: '1.4' }}>
                {t('route_desc')}
              </p>
              
              {/* Origin Dropdown: Marmaray Stations */}
              <div className="input-group">
                <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>{t("origin_station_mar")}</label>
                <select 
                  className="station-select light-select" 
                  value={routeOriginStation} 
                  onChange={(e) => {
                    setRouteOriginStation(e.target.value);
                    setRouteResult(null);
                  }}
                >
                  <option value="">{t("select_station_ph")}</option>
                  {stations.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              {/* Destination Dropdown: Istanbul Districts */}
              <div className="input-group" style={{ marginTop: '15px' }}>
                <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>{t("dest_district")}</label>
                <select 
                  className="station-select light-select" 
                  value={routeTargetDistrict} 
                  onChange={(e) => {
                    setRouteTargetDistrict(e.target.value);
                    setRouteTargetNode('');
                    setRouteResult(null);
                  }}
                >
                  <option value="">{t("select_district_ph")}</option>
                  {ISTANBUL_DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              {/* Target Location / Neighborhood Dropdown */}
              {(() => {
                const distObj = ISTANBUL_DISTRICTS.find(d => d.id === routeTargetDistrict);
                if (!distObj || !distObj.targetLocations) return null;
                return (
                  <div className="input-group" style={{ marginTop: '15px' }}>
                    <label style={{ color: '#2f3640', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                      {t('target_location')}
                    </label>
                    <select 
                      className="station-select light-select" 
                      value={routeTargetNode} 
                      onChange={(e) => {
                        setRouteTargetNode(e.target.value);
                        setRouteResult(null);
                      }}
                    >
                      <option value="">{t('all_locations')}</option>
                      {distObj.targetLocations.map(loc => (
                        <option key={loc.id} value={loc.node}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                );
              })()}

              {/* Calculate Button */}
              <button
                onClick={handleCalculateRoute}
                disabled={!routeOriginStation || !routeTargetDistrict || isCalculatingRoute}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: (!routeOriginStation || !routeTargetDistrict) ? '#dcdde1' : '#00a8ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: (!routeOriginStation || !routeTargetDistrict) ? 'not-allowed' : 'pointer',
                  marginTop: '20px',
                  boxShadow: (!routeOriginStation || !routeTargetDistrict) ? 'none' : '0 4px 15px rgba(0, 168, 255, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                {isCalculatingRoute ? t('calculating') : t('determine_route')}
              </button>

              {/* Route Results */}
              {routeResult && (
                <div className="route-results-container" style={{ marginTop: '25px' }}>
                  
                  {/* Same Location or Info Notice */}
                  {routeResult.info && (
                    <div className="route-info-banner" style={{ padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.95rem' }}>
                        <span>ℹ️</span> {t("info")}
                      </div>
                      <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {routeResult.info}
                      </p>
                    </div>
                  )}

                  {/* General Error Notice */}
                  {routeResult.error && (
                    <div className="route-error-banner" style={{ padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.95rem' }}>
                        <span>⚠️</span> {t("warning")}
                      </div>
                      <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {routeResult.error}
                      </p>
                    </div>
                  )}

                  {/* Warning banner for non-rail districts */}
                  {routeResult.steps && !routeResult.hasDirectRail && (
                    <div className="route-warning-banner" style={{ padding: '14px', borderRadius: '12px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.95rem' }}>
                        <span>⚠️</span> {t("rail_warning")}
                      </div>
                      <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', lineHeight: '1.4' }}>
                        {t("rail_warning_desc")}
                      </p>
                    </div>
                  )}

                  {routeResult.steps && (
                    <div className="route-notice-banner" style={{ padding: '14px', borderRadius: '12px', marginBottom: '20px', backgroundColor: 'var(--bg-glass)', border: '1px solid var(--accent)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-color)' }}>
                        <span>🚶</span> {t("plan_advice")}
                      </div>
                      <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', lineHeight: '1.4', color: 'var(--text-color)' }}>
                        {t("plan_advice_desc")}
                      </p>
                    </div>
                  )}

                  {/* Route Summary Bar & Steps Timeline */}
                  {routeResult.steps && (
                    <>
                      <div className="route-summary-bar" style={{ display: 'flex', justifyContent: 'space-around', padding: '14px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
                        <div>
                          <div className="route-meta-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{t("est_time_title")}</div>
                          <div className="route-meta-value" style={{ fontSize: '1.2rem', fontWeight: '800' }}>{routeResult.totalDurationMin} {t("min")}</div>
                        </div>
                        <div className="route-meta-divider" style={{ padding: '0 15px' }}>
                          <div className="route-meta-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{t("distance_title")}</div>
                          <div className="route-meta-value" style={{ fontSize: '1.2rem', fontWeight: '800' }}>{routeResult.totalDistanceKm} km</div>
                        </div>
                        <div>
                          <div className="route-meta-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{t("transfer_title")}</div>
                          <div className="route-meta-value" style={{ fontSize: '1.2rem', fontWeight: '800' }}>{routeResult.transferCount}</div>
                        </div>
                      </div>

                      {/* Step Timeline */}
                      <div className="route-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {routeResult.steps.map((step, idx) => (
                          <div key={step.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TransitIcon type={step.vehicleType} size={34} />
                              </div>
                              {idx < routeResult.steps.length - 1 && (
                                <div className="route-step-connector" style={{ width: '2px', height: '100%', minHeight: '35px', marginTop: '6px' }}></div>
                              )}
                            </div>
                            <div className="route-step-card" style={{ flex: 1, borderRadius: '12px', padding: '12px 14px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <span className="route-step-line" style={{ fontWeight: '700', fontSize: '0.95rem' }}>{step.line}</span>
                                <span className="route-step-meta" style={{ fontSize: '0.8rem', fontWeight: '600' }}>{step.durationMin} {t("min")} ({step.distanceKm} km)</span>
                              </div>
                              <p className="route-step-desc" style={{ margin: '0 0 6px 0', fontSize: '0.85rem', lineHeight: '1.4' }}>
                                {step.description}
                              </p>
                              {step.intermediateList && (
                                <div className="route-intermediate-list" style={{ fontSize: '0.78rem', padding: '6px 10px', borderRadius: '6px', marginTop: '4px' }}>
                                  <strong>{t("passed_stops")}</strong> {step.intermediateList}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                </div>
              )}

              <div className="algo-disclaimer-box">
                <div className="disclaimer-header">
                  <span>⚠️</span>
                  <strong>{t("algo_warning_title")}</strong>
                </div>
                <p>
                  {t("algo_warning_desc")}
                </p>
              </div>

            </div>
          )}


        </div>
      </div>
    </>
  );
}
