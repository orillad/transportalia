import { useState } from 'react';
import { toast } from 'sonner';
import imgAvatar from '../../assets/avatars/user-profile.png';
import { mockUsers } from '../mock/data';

export default function UsuariPage() {
  const currentUser = mockUsers[0];
  const [formData, setFormData] = useState({
    name: currentUser.name,
    surname: currentUser.surname,
    surname2: currentUser.surname2,
    address: currentUser.address,
    phone: currentUser.phone,
    email: currentUser.email,
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Canvi de dades exitós', {
      description: "El canvi de dades s'ha executat correctament.",
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-6">
      <div className="mx-auto min-h-0 w-full max-w-3xl flex-1 overflow-y-auto">
        <div className="flex gap-8">
          <div className="flex-shrink-0">
            <div className="w-[200px] h-[200px] rounded-lg overflow-hidden bg-gradient-to-b from-cyan-400 to-cyan-500">
              <img
                src={imgAvatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 text-center">
              <div className="text-sm font-medium text-gray-700">DNI</div>
              <div className="text-lg font-semibold">{currentUser.dni}</div>
            </div>

            <button className="mt-4 w-full text-sm text-primary hover:underline">
              Canviar la contrasenya
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cognom</label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cognom</label>
                <input
                  type="text"
                  value={formData.surname2}
                  onChange={(e) => setFormData({ ...formData, surname2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adreça</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telèfon</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correu</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Canviar les Dades
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
