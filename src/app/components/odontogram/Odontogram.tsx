import { useState } from 'react';
import { ToothStatus } from '../../types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface OdontogramProps {
  teeth: ToothStatus[];
  onUpdateTooth?: (toothNumber: number, status: ToothStatus['status'], notes?: string) => void;
  readOnly?: boolean;
}

export function Odontogram({ teeth, onUpdateTooth, readOnly = false }: OdontogramProps) {
  const [selectedTooth, setSelectedTooth] = useState<ToothStatus | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ToothStatus['status']>('healthy');
  const [notes, setNotes] = useState('');

  const getToothData = (number: number): ToothStatus | undefined => {
    return teeth.find(t => t.number === number);
  };

  const getToothColor = (status: ToothStatus['status']) => {
    switch (status) {
      case 'healthy': return 'fill-white stroke-gray-300';
      case 'cavity': return 'fill-red-200 stroke-red-400';
      case 'filled': return 'fill-blue-200 stroke-blue-400';
      case 'crown': return 'fill-yellow-200 stroke-yellow-400';
      case 'missing': return 'fill-gray-400 stroke-gray-600';
      case 'root_canal': return 'fill-purple-200 stroke-purple-400';
      case 'implant': return 'fill-green-200 stroke-green-400';
      case 'bridge': return 'fill-orange-200 stroke-orange-400';
      default: return 'fill-white stroke-gray-300';
    }
  };

  const handleToothClick = (number: number) => {
    if (readOnly) return;
    const tooth = getToothData(number);
    if (tooth) {
      setSelectedTooth(tooth);
      setNewStatus(tooth.status);
      setNotes(tooth.notes || '');
      setEditDialogOpen(true);
    }
  };

  const handleSave = () => {
    if (selectedTooth && onUpdateTooth) {
      onUpdateTooth(selectedTooth.number, newStatus, notes);
      toast.success('Estado del diente actualizado');
      setEditDialogOpen(false);
    }
  };

  const ToothIcon = ({ number }: { number: number }) => {
    const tooth = getToothData(number);
    const colorClass = tooth ? getToothColor(tooth.status) : 'fill-white stroke-gray-300';
    
    return (
      <g 
        onClick={() => handleToothClick(number)}
        className={readOnly ? '' : 'cursor-pointer hover:opacity-75 transition-opacity'}
      >
        <rect
          width="30"
          height="40"
          rx="4"
          className={colorClass}
          strokeWidth="2"
        />
        <text
          x="15"
          y="25"
          textAnchor="middle"
          className="text-xs font-semibold fill-gray-700"
        >
          {number}
        </text>
      </g>
    );
  };

  // Positions for teeth (simplified grid layout)
  const upperTeeth = [
    { numbers: [18, 17, 16, 15, 14, 13, 12, 11], x: 50 },
    { numbers: [21, 22, 23, 24, 25, 26, 27, 28], x: 400 },
  ];

  const lowerTeeth = [
    { numbers: [48, 47, 46, 45, 44, 43, 42, 41], x: 50 },
    { numbers: [31, 32, 33, 34, 35, 36, 37, 38], x: 400 },
  ];

  return (
    <div>
      <svg viewBox="0 0 800 400" className="w-full h-auto border border-gray-200 rounded-lg bg-gray-50 p-4">
        {/* Upper teeth */}
        <g transform="translate(0, 20)">
          <text x="10" y="25" className="text-sm font-semibold fill-gray-600">Superior</text>
          {upperTeeth.map((section, idx) => (
            <g key={`upper-${idx}`} transform={`translate(${section.x}, 40)`}>
              {section.numbers.map((num, i) => (
                <g key={num} transform={`translate(${i * 40}, 0)`}>
                  <ToothIcon number={num} />
                </g>
              ))}
            </g>
          ))}
        </g>

        {/* Lower teeth */}
        <g transform="translate(0, 200)">
          <text x="10" y="25" className="text-sm font-semibold fill-gray-600">Inferior</text>
          {lowerTeeth.map((section, idx) => (
            <g key={`lower-${idx}`} transform={`translate(${section.x}, 40)`}>
              {section.numbers.map((num, i) => (
                <g key={num} transform={`translate(${i * 40}, 0)`}>
                  <ToothIcon number={num} />
                </g>
              ))}
            </g>
          ))}
        </g>
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { status: 'healthy', label: 'Sano', color: 'bg-white border-2 border-gray-300' },
          { status: 'cavity', label: 'Caries', color: 'bg-red-200 border-2 border-red-400' },
          { status: 'filled', label: 'Relleno', color: 'bg-blue-200 border-2 border-blue-400' },
          { status: 'crown', label: 'Corona', color: 'bg-yellow-200 border-2 border-yellow-400' },
          { status: 'missing', label: 'Faltante', color: 'bg-gray-400 border-2 border-gray-600' },
          { status: 'root_canal', label: 'Endodoncia', color: 'bg-purple-200 border-2 border-purple-400' },
          { status: 'implant', label: 'Implante', color: 'bg-green-200 border-2 border-green-400' },
          { status: 'bridge', label: 'Puente', color: 'bg-orange-200 border-2 border-orange-400' },
        ].map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-xs text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Diente #{selectedTooth?.number}</DialogTitle>
            <DialogDescription>
              Actualiza el estado y notas del diente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={newStatus} onValueChange={(value: any) => setNewStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">Sano</SelectItem>
                  <SelectItem value="cavity">Caries</SelectItem>
                  <SelectItem value="filled">Relleno</SelectItem>
                  <SelectItem value="crown">Corona</SelectItem>
                  <SelectItem value="missing">Faltante</SelectItem>
                  <SelectItem value="root_canal">Endodoncia</SelectItem>
                  <SelectItem value="implant">Implante</SelectItem>
                  <SelectItem value="bridge">Puente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notas</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: Composite aplicado en 2024, necesita revisión..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
