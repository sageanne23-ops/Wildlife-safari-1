import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login/register
      onLogin({
        name: name || 'Traveler',
        email: email
      });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-safari-950/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        
        {/* Header Image/Pattern */}
        <div className="h-32 bg-safari-600 relative overflow-hidden flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop" 
            alt="Landscape" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply" 
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-1"
          >
            <X size={20} />
          </button>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl font-serif font-bold">{isLogin ? 'Welcome Back' : 'Join the Adventure'}</h2>
            <p className="text-safari-100 text-sm">To the Land of a Thousand Hills</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100">
          <button 
            className={`flex-1 py-4 text-sm font-bold transition-colors ${isLogin ? 'text-safari-600 border-b-2 border-safari-600' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-bold transition-colors ${!isLogin ? 'text-safari-600 border-b-2 border-safari-600' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-stone-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none transition-all" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-stone-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-semibold text-safari-600 hover:text-safari-700">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-safari-600 hover:bg-safari-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-safari-500/30 flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-stone-500 text-xs">
              By continuing, you agree to our <span className="text-safari-600 font-bold cursor-pointer">Terms of Service</span> and <span className="text-safari-600 font-bold cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;