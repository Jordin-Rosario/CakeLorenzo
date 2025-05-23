import React, { useState, useEffect } from 'react';

interface SuccessAlertProps {
  message: string;
  duration?: number; // duración opcional
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message}) => {
    const [visible, setVisible] = useState(true);

    
  
  return (
    <div className="bg-green-100 border-t-4 rounded-lg border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">
      <div className="flex">
        <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div className='flex justify-between items-center w-full'>
          <p className="font-bold">{message}</p>
          <div>
            <button
              onClick={() => setVisible(false)}
              className="px-2 text-green-700 cursor-pointer"
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;