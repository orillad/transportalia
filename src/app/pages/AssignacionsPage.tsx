import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { mockUsers, mockTrucks } from '../mock/data';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function AssignacionsPage() {
  const navigate = useNavigate();
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  const [availableDrivers, setAvailableDrivers] = useState(() =>
    mockUsers.filter((u) => u.licenseNumber),
  );
  const [availableTrucks, setAvailableTrucks] = useState(() => [...mockTrucks]);

  const handleAssign = () => {
    if (selectedDriver && selectedTruck) {
      setAvailableDrivers((currentDrivers) =>
        currentDrivers.filter((driver) => driver.id !== selectedDriver),
      );
      setAvailableTrucks((currentTrucks) =>
        currentTrucks.filter((truck) => truck.id !== selectedTruck),
      );
      toast.success('Assignació exitosa', {
        description: "L'assignació del conductor i el camió ha sigut exitosa.",
      });
      setSelectedDriver(null);
      setSelectedTruck(null);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-6">
      <Tabs
        value="assignar"
        onValueChange={(value) => {
          if (value === 'desassignar') {
            navigate('/desassignacions');
          }
        }}
        className="mb-6 shrink-0"
      >
        <TabsList className="mx-auto w-full max-w-xl">
          <TabsTrigger className="px-6 transition-all hover:bg-white/80 hover:text-[#133e6f] hover:shadow-sm data-[state=active]:shadow-sm" value="assignar">
            Assignar conductor
          </TabsTrigger>
          <TabsTrigger className="px-6 transition-all hover:bg-white/80 hover:text-[#133e6f] hover:shadow-sm data-[state=active]:shadow-sm" value="desassignar">
            Desassignar conductor
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-6">
        <div className="flex min-h-0 flex-col">
          <h3 className="mb-4 shrink-0 text-lg font-semibold">Conductors disponibles</h3>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-4">
            {availableDrivers.map((driver) => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriver(driver.id)}
                className={`group flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                  selectedDriver === driver.id
                    ? 'border-primary bg-primary/5 shadow-[0_10px_24px_rgba(19,62,111,0.08)]'
                    : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#133e6f]/35 hover:bg-slate-50/80 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <span className="text-white font-medium text-sm">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 transition-colors group-hover:text-[#133e6f]">
                      {driver.name} {driver.surname}
                    </div>
                    <div className="text-sm text-gray-500">{driver.licenseNumber}</div>
                  </div>
                </div>
                {selectedDriver === driver.id && (
                  <Check className="w-5 h-5 text-[#133e6f]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col">
          <h3 className="mb-4 shrink-0 text-lg font-semibold">Camions disponibles</h3>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-4">
            {availableTrucks.map((truck) => (
              <button
                key={truck.id}
                onClick={() => setSelectedTruck(truck.id)}
                className={`group flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                  selectedTruck === truck.id
                    ? 'border-primary bg-primary/5 shadow-[0_10px_24px_rgba(19,62,111,0.08)]'
                    : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#133e6f]/35 hover:bg-slate-50/80 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm transition-shadow duration-200 group-hover:shadow-md">
                    <img
                      src={truck.image}
                      alt={`Camió ${truck.plate}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 transition-colors group-hover:text-[#133e6f]">{truck.plate}</div>
                    <div className="text-sm text-gray-500">
                      {truck.weight} kg | {truck.dimensions}
                    </div>
                  </div>
                </div>
                {selectedTruck === truck.id && (
                  <Check className="w-5 h-5 text-[#133e6f]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex shrink-0 justify-end gap-4">
        <button
          onClick={() => {
            setSelectedDriver(null);
            setSelectedTruck(null);
          }}
          className="rounded-lg border border-gray-300 px-6 py-2 transition-all hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm"
        >
          Cancel·lar
        </button>
        <button
          onClick={handleAssign}
          disabled={!selectedDriver || !selectedTruck}
          className="rounded-lg bg-primary px-6 py-2 text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_12px_24px_rgba(19,62,111,0.2)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          Assignar
        </button>
      </div>
    </div>
  );
}
