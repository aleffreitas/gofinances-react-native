import React, { ReactNode, createContext, useContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const user = {
    id: '0',
    name: 'Alef',
    email: 'alef@example.com',
  }

  return(
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };