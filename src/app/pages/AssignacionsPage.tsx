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

  const drivers = mockUsers.filter(u => u.licenseNumber);

  const handleAssign = () => {
    if (selectedDriver && selectedTruck) {
      toast.success('Assignació exitosa', {
        description: "L'assignació del conductor i el camió ha sigut exitosa.",
      });
      setTimeout(() => {
        setSelectedDriver(null);
        setSelectedTruck(null);
      }, 2000);
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
          <TabsTrigger value="assignar" className="px-6">
            Assignar conductor
          </TabsTrigger>
          <TabsTrigger value="desassignar" className="px-6">
            Desassignar conductor
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-6">
        <div className="flex min-h-0 flex-col">
          <h3 className="mb-4 shrink-0 text-lg font-semibold">Conductors disponibles</h3>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-4">
            {drivers.map((driver) => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriver(driver.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  selectedDriver === driver.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{driver.name} {driver.surname}</div>
                  <div className="text-sm text-gray-500">{driver.licenseNumber}</div>
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
            {mockTrucks.map((truck) => (
              <button
                key={truck.id}
                onClick={() => setSelectedTruck(truck.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  selectedTruck === truck.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="font-medium">{truck.plate}</div>
                  <div className="text-sm text-gray-500">
                    {truck.weight} kg | {truck.dimensions}
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
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel·lar
        </button>
        <button
          onClick={handleAssign}
          disabled={!selectedDriver || !selectedTruck}
          className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Assignar
        </button>
      </div>
    </div>
  );
}
