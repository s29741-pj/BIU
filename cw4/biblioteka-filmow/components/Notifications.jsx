'use client';

import { useEffect } from "react";
import { useFilmState, useFilmDispatch } from "@/context/FilmContext";

function NotificationItem({ notification }) {
    const dispatch = useFilmDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification.id });
        }, 3000);
        return () => clearTimeout(timer);
    }, [notification.id, dispatch]);

    const bgColor = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
    }[notification.type] ?? '#333';

    return (
        <div style={{
            backgroundColor: bgColor,
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '250px',
        }}>
            <p style={{ margin: 0 }}>{notification.message}</p>
            <button
                onClick={() => dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification.id })}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    marginLeft: '1rem',
                    fontSize: '1rem',
                }}>
                ✕
            </button>
        </div>
    );
}

export default function Notifications() {
    const state = useFilmState();

    return (
        <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1000,
        }}>
            {state.notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
}