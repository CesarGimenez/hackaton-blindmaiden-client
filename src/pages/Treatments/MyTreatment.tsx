/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store';

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 }
}

const MyTreatment: React.FC = () => {
  const treatment = useAuthStore((state) => state.user?.treatment);
  return (
    <motion.div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center" variants={variants} initial="hidden" animate="visible">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Progreso del Tratamiento</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Duración del Tratamiento</h3>
          <p className="text-sm text-gray-600 mt-2">{treatment?.duration || 'N/A'}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Medicamentos</h3>
          <ul className="mt-2">
            {treatment?.medications.map((medication: string, index: number) => (
              <li key={index} className="flex justify-between py-2 px-4 bg-gray-50 rounded-md mb-2">
                <span className="text-sm text-gray-800 font-medium">{medication}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Alimentación Recomendada</h3>
          <p className="text-sm text-gray-600 mt-2">{treatment?.diet}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Actividades Físicas</h3>
          <ul className="mt-2">
            {treatment?.activities?.map((activity: any, index: number) => (
              <li key={index} className="flex justify-between py-2 px-4 bg-gray-50 rounded-md mb-2">
                <span className="text-sm text-gray-800 font-medium">{activity.name}</span>
                <span className="text-sm text-gray-600">{activity.duration} - {activity.frequency}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Progreso General</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div className="bg-purple-600 h-4 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">60% completado</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MyTreatment;
