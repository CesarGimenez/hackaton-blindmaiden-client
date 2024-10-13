import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { GetUserDoctorsApi } from '@/api/Users.api';
import { useAuthStore } from '@/store';

interface Doctor {
  _id: string;
  name: string;
  phone: string;
  is_verified: boolean;
  image: string;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

const SearchDoctors: React.FC = () => {
  const userID = useAuthStore((state) => state.user?._id);
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const data = await GetUserDoctorsApi();
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-purple-600 mb-6">Búsqueda de Médicos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.filter((doctor: Doctor) => doctor._id !== userID).map((doctor: Doctor, index: number) => (
            <motion.div
                key={doctor._id}
                className="bg-white rounded-lg shadow-md p-6 relative flex flex-col items-center"
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1, duration: 0.5 }}
                variants={cardVariants}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />

              {doctor.is_verified && (
                <div className="absolute top-3 right-3 bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                  <span className="font-bold">Verificado</span>
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
              <p className="text-sm text-gray-600">Contacto: {doctor.phone}</p>
              
              <div className="mt-4 flex items-center space-x-2">
                <span className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 cursor-pointer">
                  Contactar
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDoctors;
