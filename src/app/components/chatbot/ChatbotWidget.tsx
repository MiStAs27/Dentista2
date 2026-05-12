import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy el asistente virtual de DentaSync. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const quickActions = [
    'Ver citas del día',
    'Buscar paciente',
    'Estadísticas del mes',
    'Ayuda con odontograma',
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('cita') || lowerInput.includes('agenda')) {
      return 'Tienes 4 citas programadas para hoy. María Fernández a las 09:00, Roberto Mendoza a las 10:00, Carmen Quispe a las 14:00 y Luis Torrez a las 16:00. ¿Necesitas más detalles sobre alguna?';
    }

    if (lowerInput.includes('paciente')) {
      return 'Actualmente tienes 66 pacientes registrados. ¿Quieres buscar un paciente específico? Por favor dime el nombre o número de teléfono.';
    }

    if (lowerInput.includes('estadística') || lowerInput.includes('reporte')) {
      return 'Este mes has atendido 224 citas con ingresos totales de 20,800 BOB. La tasa de asistencia es del 95.8%. ¿Quieres ver más detalles en el módulo de reportes?';
    }

    if (lowerInput.includes('odontograma')) {
      return 'El odontograma digital te permite registrar el estado de cada diente. Haz clic en un diente para actualizar su estado (sano, caries, relleno, corona, etc.) y agregar notas. ¿Necesitas ayuda con algún paciente específico?';
    }

    if (lowerInput.includes('recordatorio') || lowerInput.includes('notificación')) {
      return 'El sistema envía recordatorios automáticos 24 horas antes de cada cita. Puedes configurar esto en Configuración > Notificaciones.';
    }

    if (lowerInput.includes('pago') || lowerInput.includes('cobro')) {
      return 'Tienes 3 pagos pendientes por un total de 650 BOB. Luis Torrez tiene el saldo más alto pendiente. ¿Quieres ver los detalles?';
    }

    return 'Entiendo tu consulta. Para información específica sobre pacientes, citas, reportes o configuración, puedo ayudarte navegando por las secciones correspondientes. ¿Qué necesitas saber?';
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    handleSend();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-base">Asistente DentaSync</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Acciones rápidas:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
