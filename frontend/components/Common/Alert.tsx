import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  onClose?: () => void;
}

export default function Alert({ type, title, message, onClose }: AlertProps) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  const icons = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <AlertCircle size={20} className="text-red-600" />,
    warning: <AlertCircle size={20} className="text-yellow-600" />,
    info: <Info size={20} className="text-blue-600" />,
  };

  return (
    <div className={clsx('border rounded-lg p-4 flex items-start gap-3', styles[type])}>
      {icons[type]}
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:bg-black hover:bg-opacity-10 rounded">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
