import { useState } from 'react';
import { useProfileStore, type TUser } from '../store/userStore';
import { fetchData } from './useApiData';

interface TLoginFormData {
  email: string;
  password: string;
}

interface TSignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfileData = async (userId: number) => {
    const [profile] = await fetchData(`user_profiles?id=${userId}`);
    if (!profile) throw new Error('Profile data not found.');
    return profile;
  };

  const login = async ({ email, password }: TLoginFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !password) throw new Error('Email and password are required.');
      if (!email.includes('@')) throw new Error('Invalid email format.');
      if (password.length < 6) throw new Error('Password must be at least 6 characters.');
      if (email === 'test@test.com' && password === '123456') {
        const userData: TUser = { email, id: 1 };
        const profileData = await getProfileData(userData.id);
        useProfileStore.getState().setUser(userData);
        useProfileStore.getState().setFavorites(profileData.favorites || []);
        useProfileStore.getState().setWatchlist(profileData.watchlist || []);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid login or password.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login error.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ email, password, confirmPassword }: TSignupFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !password || !confirmPassword) throw new Error('All fields are required.');
      if (!email.includes('@')) throw new Error('Invalid email format.');
      if (password.length < 6) throw new Error('Password must be at least 6 characters.');
      if (password !== confirmPassword) throw new Error('Passwords do not match.');

      if (!email.includes('fail')) {
        console.log('Registration successful:', email);
        return;
      } else {
        throw new Error('A user with this email already exists.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration error.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    useProfileStore.getState().setUser(null);
    useProfileStore.getState().setFavorites([]);
    useProfileStore.getState().setWatchlist([]);
  };

  return { login, register, logout, isLoading, error };
};
