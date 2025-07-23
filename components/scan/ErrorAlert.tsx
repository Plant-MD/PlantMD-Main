'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
  onDismiss?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 mx-3 sm:mx-0">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-red-800 mb-1">Camera Access Error</h3>
          <p className="text-sm text-red-700">{error}</p>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-xs text-red-600 underline mt-1"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;