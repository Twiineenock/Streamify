'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onClose();
        setEmail('');
        setPassword('');
      } else {
        if (!displayName.trim()) {
          setError('Please enter a display name');
          setIsLoading(false);
          return;
        }
        await signUp(email, password, displayName);
        onClose();
        setEmail('');
        setPassword('');
        setDisplayName('');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0f0f0f] rounded-2xl border border-[#222222] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#333333] transition-colors"
        >
          <span className="material-symbols-outlined text-white text-xl">close</span>
        </button>

        {/* Header */}
        <div className="p-6 border-b border-[#222222]">
          <h2 className="text-2xl font-bold text-white mb-1">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-sm text-[#aaaaaa]">
            {mode === 'signin' 
              ? 'Welcome back to Streamify' 
              : 'Create your Streamify account'}
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Display Name (Sign Up only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="w-full h-12 px-4 rounded-xl bg-[#222222] border border-[#222222] text-white placeholder:text-[#aaaaaa] focus:border-[#ff0000] focus:outline-none"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full h-12 px-4 rounded-xl bg-[#222222] border border-[#222222] text-white placeholder:text-[#aaaaaa] focus:border-[#ff0000] focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-xl bg-[#222222] border border-[#222222] text-white placeholder:text-[#aaaaaa] focus:border-[#ff0000] focus:outline-none"
              required
              minLength={6}
            />
          </div>

          {/* Mode Toggle */}
          <div className="text-center py-2">
            <p className="text-sm text-[#aaaaaa]">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  onModeChange(mode === 'signin' ? 'signup' : 'signin');
                  setError('');
                }}
                className="text-[#ff0000] hover:text-[#ff3333] font-semibold transition-colors"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-xl bg-[#ff0000] text-white font-bold text-lg hover:bg-[#ff3333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">sync</span>
                <span>Processing...</span>
              </>
            ) : (
              <span>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

