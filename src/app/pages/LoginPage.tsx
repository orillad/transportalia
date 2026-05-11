import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import imgBg1 from '../../assets/backgrounds/login-hero.png';
import imgLogoGran from '../../assets/logos/image.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    if (email === 'm@example.com' && password === 'password123') {
      navigate('/transports-avui');
    } else {
      toast.error('Email o contrasenya incorrectes', {
        description: 'Revisa les credencials i torna-ho a provar.',
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex w-1/2 items-center justify-center bg-gray-50/40 p-8">
        <div className="w-full max-w-md">
          {/* Back button */}
          <Link
            to="/"
            className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* Form */}
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-semibold tracking-tight">Inicia Sessió</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Contrasenya</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? 'Amagar' : 'Mostrar'}
                  </button>
                </div>
                <Link
                  to="/recuperar-contrasenya"
                  className="float-right text-sm text-primary hover:underline"
                >
                  Has oblidat la contrasenya?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:bg-primary/90"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="w-1/2 relative overflow-hidden">
        <img
          src={imgBg1}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Logo overlay */}
        <div className="absolute top-1/2 left-1/2 w-[min(78%,560px)] -translate-x-1/2 -translate-y-1/2">
          <img
            src={imgLogoGran}
            alt="TRANSPORTALIA"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
