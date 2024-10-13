import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetMyPatientsApi } from "@/api/patients.api";
import { useAuthStore } from "@/store";

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
}

const Patients: React.FC = () => {
  const userId = useAuthStore((state) => state.user?._id);
  const { data, isFetching } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const data = await GetMyPatientsApi(userId as string);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
  const navigate = useNavigate();
  const handleViewPatient = (id: string) => {
    navigate(`/patient/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          Lista de Pacientes
        </h2>

        {isFetching ? (
          <p>Cargando...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Género
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo Electrónico
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data && data.map((patient: Patient) => (
                <tr key={patient._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-purple-600 hover:text-purple-900"
                      onClick={() => handleViewPatient(patient._id)}
                    >
                      <VisibilityIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Patients;
