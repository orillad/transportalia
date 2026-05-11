import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import imgBg1 from '../../assets/backgrounds/recover-hero.png';
import imgLogoGran from '../../assets/logos/image.png';

export default function RecuperarContrasenyaPage() {
  const navigate = useNavigate();
  const [dni, setDni] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    if (dni === '15566965A') {
      toast.success('Canvi de contrasenya executat amb èxit', {
        description: 'Seràs redirigit a la pantalla de login.',
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else if (!dni) {
      toast.error('La contrasenya no s\'ha pogut canviar', {
        description: 'Introdueix un DNI abans d\'enviar el formulari.',
      });
    } else {
      toast.error('DNI no reconegut a la base de dades', {
        description: 'Verifica el DNI i torna-ho a provar.',
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
            to="/login"
            className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* Form */}
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-semibold tracking-tight">
              Recuperació de Contrasenya
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* DNI field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">DNI</label>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder="15566965A"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Buttons */}
              <button
                type="submit"
                className="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:bg-primary/90"
              >
                Enviar
              </button>

              <Link
                to="/login"
                className="block w-full rounded-md bg-primary py-2 text-center font-medium text-primary-foreground hover:bg-primary/90"
              >
                Accedir
              </Link>
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
