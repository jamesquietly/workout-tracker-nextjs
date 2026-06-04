'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import useGetUser from '@/features/user/hooks/useGetUser';
import { User } from '@/features/user/api/getUser';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UNSET = Symbol('unset');

export function UserProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useGetUser();
  const [manualUser, setManualUser] = useState<User | typeof UNSET | null>(
    UNSET,
  );

  const handleSetUser = useCallback((user: User | null) => {
    setManualUser(user);
  }, []);

  const user = manualUser !== UNSET ? manualUser : (data ?? null);

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
