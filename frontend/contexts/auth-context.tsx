import { useAuth } from '@/hooks';
import { AuthContextData, AuthProviderPropsData } from '@/models';
import { createContext, useContext } from 'react';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }: AuthProviderPropsData) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { useAuthContext, AuthProvider };
