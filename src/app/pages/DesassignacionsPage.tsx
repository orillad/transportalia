import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { mockUsers } from '../mock/data';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function DesassignacionsPage() {
  const navigate = useNavigate();
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);

  const assignedDrivers = [
    { ...mockUsers[1], assignedTo: '1733 KFC' },
    { ...mockUsers[2], assignedTo: '5678 DEF' },
    { ...mockUsers[3], assignedTo: '1234 ABC' },
  ];

  const toggleDriver = (driverId: string) => {
    if (selectedDrivers.includes(driverId)) {
      setSelectedDrivers(selectedDrivers.filter(id => id !== driverId));
    } else {
      setSelectedDrivers([...selectedDrivers, driverId]);
    }
  };

  const handleUnassign = () => {
    if (selectedDrivers.length > 0) {
      toast.success('Desassignació exitosa', {
        description: 'La desassignació del conductor i el camió ha sigut exitosa.',
      });
      setTimeout(() => {
        setSelectedDrivers([]);
      }, 2000);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-6">
      <Tabs
        value="desassignar"
        onValueChange={(value) => {
          if (value === 'assignar') {
            navigate('/assignacions');
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

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col">
          <h3 className="mb-4 shrink-0 text-lg font-semibold">Conductors assignats</h3>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-lg border border-gray-200 p-4">
            {assignedDrivers.map((driver) => (
              <button
                key={driver.id}
                onClick={() => toggleDriver(driver.id)}
                className={`w-full flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                selectedDrivers.includes(driver.id)
                  ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{driver.name} {driver.surname}</div>
                  <div className="text-sm text-gray-500">{driver.licenseNumber}</div>
                  <div className="text-sm text-gray-400">Assignat a: {driver.assignedTo}</div>
                </div>
                {selectedDrivers.includes(driver.id) && (
                  <Check className="w-5 h-5 text-[#133e6f]" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 flex shrink-0 justify-end gap-4">
            <button
              onClick={() => setSelectedDrivers([])}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel·lar
            </button>
            <button
              onClick={handleUnassign}
              disabled={selectedDrivers.length === 0}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Desassignar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
