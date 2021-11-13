import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

export type Headers = {
  'Content-Type': string;
  Authorization: string;
};

export interface AuthContextType {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  requestHeaders: Headers
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthProvider: useAuthContext must be within AuthProvider');
  }

  return context;
};

const AuthProvider = (props: { children: React.ReactNode }): React.ReactElement => {
  const [token, setToken] = useState<string>('');
  const { children } = props;

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setToken(window.localStorage.getItem('token')!);
    }
  }, []);

  const requestHeaders: Headers = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

  const contextValue = useMemo(() => ({ token, setToken, requestHeaders }), [requestHeaders, token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
