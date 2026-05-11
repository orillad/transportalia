import { useState } from 'react';
import { toast } from 'sonner';
import { mockUsers } from '../mock/data';

export default function DesbloqueigPage() {
  const blockedUsers = mockUsers.filter((u) => u.licenseNumber);

  const handleUnblock = (_userId: string) => {
    toast.success('Desbloqueig exitós', {
      description: "El desbloqueig de l'usuari ha sigut exitós.",
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-6">
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="shrink-0 border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Usuaris Bloquejats</h2>
              <p className="mt-1 text-sm text-gray-500">
                Gestiona els usuaris bloquejats i reactiva&apos;ls quan correspongui.
              </p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-gray-600">
              {blockedUsers.length} usuaris
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-white p-5">
          <div className="min-h-0 h-full space-y-3 overflow-y-auto">
            {blockedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-white font-medium">
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">
                      {user.name} {user.surname}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.licenseNumber}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleUnblock(user.id)}
                  className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Desbloquejar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
