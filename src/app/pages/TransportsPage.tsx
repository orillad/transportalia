import { useState } from 'react';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronDown,
  MapPinned,
  Ruler,
  Truck as TruckIcon,
  Weight,
} from 'lucide-react';
import { toast } from 'sonner';
import truckImage01 from '../../assets/trucks/truck-card-01.jpg';
import truckImage02 from '../../assets/trucks/truck-card-02.jpg';
import truckImage03 from '../../assets/trucks/truck-card-03.jpg';
import truckImage04 from '../../assets/trucks/truck-card-04.jpg';
import truckImage05 from '../../assets/trucks/truck-card-05.jpg';
import truckImage06 from '../../assets/trucks/truck-card-06.jpg';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { ScrollArea } from '../components/ui/scroll-area';
import { mockRoutes } from '../mock/data';

export default function TransportsPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date(2015, 4, 24));
  const [availableTruckIds, setAvailableTruckIds] = useState<string[] | null>(null);
  const [formData, setFormData] = useState({
    route: 'BCN - MAD',
    weight: '1000',
    height: '5',
    width: '3',
    length: '12',
  });

  const trucks = [
    { id: '1', plate: '9012 GHV', weight: 9500, dimensions: '2,2×2,8×8 m' },
    { id: '2', plate: '8362 LHJ', weight: 4500, dimensions: '3,2×4,8×10 m' },
    { id: '3', plate: '1054 PTD', weight: 13500, dimensions: '5,2×7,8×15 m' },
    { id: '4', plate: '5812 NJT', weight: 5500, dimensions: '3,2×4,8×12 m' },
    { id: '5', plate: '6245 BSL', weight: 4000, dimensions: '3,2×3,4×8 m' },
    { id: '6', plate: '7032 DWR', weight: 6000, dimensions: '3,2×4,8×15 m' },
    { id: '7', plate: '4852 LVR', weight: 9500, dimensions: '2,9×2,5×8 m' },
    { id: '8', plate: '1733 KFC', weight: 7500, dimensions: '3,2×5,8×15 m' },
  ];

  const truckImages = [
    truckImage01,
    truckImage02,
    truckImage03,
    truckImage04,
    truckImage05,
    truckImage06,
  ];

  const selectedRoute = mockRoutes.find((route) => route.code === formData.route) ?? mockRoutes[0];
  const visibleTrucks = availableTruckIds ? trucks.filter((truck) => availableTruckIds.includes(truck.id)) : trucks;
  const selectedTruck = visibleTrucks.find((truck) => truck.id === selectedTruckId) ?? null;

  const parseNumber = (value: string) => Number(value.replace(',', '.'));

  const getTruckLimits = (dimensions: string) => {
    const [width, height, length] = dimensions
      .replace(' m', '')
      .split('×')
      .map((value) => Number(value.replace(',', '.')));

    return { width, height, length };
  };

  const handleSearchTrucks = () => {
    const requestedWeight = parseNumber(formData.weight);
    const requestedHeight = parseNumber(formData.height);
    const requestedWidth = parseNumber(formData.width);
    const requestedLength = parseNumber(formData.length);

    const values = [requestedWeight, requestedHeight, requestedWidth, requestedLength];
    const hasInvalidValues = values.some((value) => Number.isNaN(value) || value <= 0);

    if (hasInvalidValues) {
      toast.error('Dades del transport no vàlides', {
        description: 'Revisa el pes i les dimensions abans de cercar camions.',
      });
      return;
    }

    const compatibleTrucks = trucks.filter((truck) => {
      const limits = getTruckLimits(truck.dimensions);

      return (
        truck.weight >= requestedWeight &&
        limits.height >= requestedHeight &&
        limits.width >= requestedWidth &&
        limits.length >= requestedLength
      );
    });

    setSelectedTruckId(null);
    setAvailableTruckIds(compatibleTrucks.map((truck) => truck.id));

    if (compatibleTrucks.length === 0) {
      toast.error('No hi ha camions compatibles', {
        description: 'Prova amb menys pes o dimensions més petites per continuar la demo.',
      });
      return;
    }

    toast.success('Camions trobats correctament', {
      description: `${compatibleTrucks.length} camió(ns) compatible(s) amb aquesta ruta i càrrega.`,
    });
  };

  const handleCreateTransport = () => {
    if (!selectedTruck) {
      toast.error('Selecciona un camió abans de crear el transport', {
        description: 'Primer cerca camions compatibles i després escull-ne un.',
      });
      return;
    }

    toast.success('Transport creat correctament', {
      description: `S'ha creat el transport de la ruta ${selectedRoute.code} amb el camió ${selectedTruck.plate}.`,
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-6">
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-6">
        <div className="min-h-0 overflow-y-auto pr-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Data Inici de la Ruta</label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="relative flex w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <span className="flex-1">{format(startDate, 'd / M / yyyy')}</span>
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      if (!date) return;
                      setStartDate(date);
                      setShowCalendar(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Seleccionar Ruta</label>
              <Popover open={showRoutes} onOpenChange={setShowRoutes}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium">{selectedRoute.code}</div>
                      <div className="text-xs text-gray-500">
                        {selectedRoute.origin} {'->'} {selectedRoute.dest}
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[420px] max-w-[calc(100vw-2rem)] p-0" align="start">
                  <div className="border-b bg-white px-3 py-3">
                    <div className="flex items-center gap-2">
                      <MapPinned className="h-4 w-4 text-[#133e6f]" />
                      <p className="text-sm font-semibold text-[#133e6f]">Llista de rutes</p>
                    </div>
                  </div>
                  <ScrollArea className="h-[320px]">
                    <div className="space-y-2 p-3">
                      {mockRoutes.map((route) => (
                        <button
                          key={route.id}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, route: route.code });
                            setShowRoutes(false);
                          }}
                          className={`w-full rounded-lg border p-3 text-left transition-colors hover:border-[#133e6f] hover:bg-slate-50 ${
                            route.code === formData.route ? 'border-[#133e6f] bg-slate-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-gray-900">{route.code}</span>
                            <span className="text-xs font-medium text-gray-500">{route.km} km</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                            <div>
                              <div className="font-medium text-gray-500">Origen</div>
                              <div>{route.origin}</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-500">Destí</div>
                              <div>{route.dest}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Pes ( Kg )</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Alçada ( m )</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Amplada ( m )</label>
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Fons ( m )</label>
                <input
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSearchTrucks}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
            >
              Cercar Camions
            </button>
          </div>
        </div>

        <div className="col-span-2 flex min-h-0 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto rounded-lg bg-gray-50 p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {visibleTrucks.map((truck, index) => (
                <button
                  key={truck.id}
                  type="button"
                  onClick={() => setSelectedTruckId(truck.id)}
                  className={`group relative overflow-hidden rounded-xl border bg-white text-left transition-all ${
                    selectedTruckId === truck.id
                      ? 'border-[#133e6f] shadow-[0_0_0_1px_rgba(19,62,111,0.15)]'
                      : 'border-gray-200 hover:border-[#133e6f]/50 hover:shadow-sm'
                  }`}
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-b from-gray-300 to-gray-400">
                    <img
                      src={truckImages[index % truckImages.length]}
                      alt={truck.plate}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-[#133e6f] shadow-sm">
                      Disponible
                    </div>
                    {selectedTruckId === truck.id && (
                      <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#133e6f] text-white shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <TruckIcon className="h-4 w-4 text-[#133e6f]" />
                          <span className="text-base font-semibold text-gray-900">{truck.plate}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500">Vehicle preparat per assignar a la ruta</p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          selectedTruckId === truck.id
                            ? 'bg-[#133e6f] text-white'
                            : 'bg-slate-100 text-gray-600'
                        }`}
                      >
                        {selectedTruckId === truck.id ? 'Seleccionat' : 'Seleccionar'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-gray-500">
                          <Weight className="h-3.5 w-3.5" />
                          Pes
                        </div>
                        <div className="mt-0.5 text-sm font-medium text-gray-900">{truck.weight} kg</div>
                      </div>
                      <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-gray-500">
                          <Ruler className="h-3.5 w-3.5" />
                          Dimensions
                        </div>
                        <div className="mt-0.5 text-sm font-medium text-gray-900">{truck.dimensions}</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreateTransport}
            className="mt-4 w-full shrink-0 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {selectedTruck ? `Crear Transport amb ${selectedTruck.plate}` : 'Selecciona un camió per continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}
