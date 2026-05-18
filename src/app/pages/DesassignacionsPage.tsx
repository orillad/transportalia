import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { mockUsers } from '../mock/data';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function DesassignacionsPage() {
  const navigate = useNavigate();
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [assignedDrivers, setAssignedDrivers] = useState([
    { ...mockUsers[1], assignedTo: '1733 KFC' },
    { ...mockUsers[2], assignedTo: '5678 DEF' },
    { ...mockUsers[3], assignedTo: '1234 ABC' },
  ]);

  const toggleDriver = (driverId: string) => {
    if (selectedDrivers.includes(driverId)) {
      setSelectedDrivers(selectedDrivers.filter(id => id !== driverId));
    } else {
      setSelectedDrivers([...selectedDrivers, driverId]);
    }
  };

  const handleUnassign = () => {
    if (selectedDrivers.length === 0) {
      return;
    }

    setAssignedDrivers((currentDrivers) =>
      currentDrivers.filter((driver) => !selectedDrivers.includes(driver.id)),
    );
    toast.success('Desassignació exitosa', {
      description: 'La desassignació del conductor i el camió ha sigut exitosa.',
    });
    setSelectedDrivers([]);
    setShowConfirmDialog(false);
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
          <TabsTrigger className="px-6 transition-all hover:bg-white/80 hover:text-[#133e6f] hover:shadow-sm data-[state=active]:shadow-sm" value="assignar">
            Assignar conductor
          </TabsTrigger>
          <TabsTrigger className="px-6 transition-all hover:bg-white/80 hover:text-[#133e6f] hover:shadow-sm data-[state=active]:shadow-sm" value="desassignar">
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
                className={`group flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                selectedDrivers.includes(driver.id)
                  ? 'border-primary bg-primary/5 shadow-[0_10px_24px_rgba(19,62,111,0.08)]'
                    : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#133e6f]/35 hover:bg-slate-50/80 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm transition-transform duration-200 group-hover:scale-105">
                    <span className="text-white font-medium">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 transition-colors group-hover:text-[#133e6f]">{driver.name} {driver.surname}</div>
                    <div className="text-sm text-gray-500">{driver.licenseNumber}</div>
                    <div className="text-sm text-gray-400 transition-colors group-hover:text-gray-500">Assignat a: {driver.assignedTo}</div>
                  </div>
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
              className="rounded-lg border border-gray-300 px-6 py-2 transition-all hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm"
            >
              Cancel·lar
            </button>
            <button
              onClick={() => setShowConfirmDialog(true)}
              disabled={selectedDrivers.length === 0}
              className="rounded-lg bg-red-600 px-6 py-2 text-white transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_12px_24px_rgba(220,38,38,0.22)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Desassignar
            </button>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar desassignació</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedDrivers.length === 1
                ? 'Vols desassignar aquest conductor del seu camió?'
                : `Vols desassignar ${selectedDrivers.length} conductors dels seus camions?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnassign}>Acceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
