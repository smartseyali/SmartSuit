import { useState, createContext, useContext, ReactNode } from 'react';

// Mock types to replace Supabase types
export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    [key: string]: any;
  };
}

export interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    console.log("Mock SignIn", email, password);
    return { error: new Error("Authentication not implemented yet") };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    console.log("Mock SignUp", email, password, fullName);
    return { error: new Error("Authentication not implemented yet") };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
