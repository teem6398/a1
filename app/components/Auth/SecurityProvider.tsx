'use client';

import React from 'react';
import { AuthProvider } from '../../lib/auth-context';
import SessionManager from './SessionManager';

interface SecurityProviderProps {
  children: React.ReactNode;
  sessionTimeout?: number;
  warningTime?: number;
  checkInterval?: number;
}

const SecurityProvider: React.FC<SecurityProviderProps> = ({
  children,
  sessionTimeout = 30,
  warningTime = 5,
  checkInterval = 60
}) => {
  return (
    <AuthProvider>
      <SessionManager
        sessionTimeout={sessionTimeout}
        warningTime={warningTime}
        checkInterval={checkInterval}
      >
        {children}
      </SessionManager>
    </AuthProvider>
  );
};

export default SecurityProvider; 