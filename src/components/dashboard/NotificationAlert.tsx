
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface NotificationAlertProps {
  type: AlertType;
  title: string;
  description: string;
  onDismiss?: () => void;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({
  type,
  title,
  description,
  onDismiss,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'warning':
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getStyle = () => {
    switch (type) {
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      default:
        return '';
    }
  };

  return (
    <Alert className={cn('mb-4 fade-in', getStyle())}>
      <div className="flex">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <AlertTitle className="text-sm font-medium">{title}</AlertTitle>
          <AlertDescription className="text-sm mt-1">{description}</AlertDescription>
        </div>
        {onDismiss && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-white/20"
            onClick={onDismiss}
          >
            <span className="sr-only">閉じる</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        )}
      </div>
    </Alert>
  );
};

export default NotificationAlert;
