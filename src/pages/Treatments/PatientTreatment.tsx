import AddApointment from "@/components/Modal/AddApointment";
import React, { useState } from "react";

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale"; // Importar la localización en español
import { AddActivityForm } from "@/components";
import { motion } from "framer-motion";
import { GetInfoPatientApi, UpdateTreatmentApi } from "@/api/patients.api";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  CreateAppointmentAPI,
  UpdateStatusAppintmentsAPI,
} from "@/api/appointments.api";
import { useAuthStore } from "@/store";

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  const formattedDate = format(date, "eeee, dd 'de' MMMM", { locale: es });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hourNumber = parseInt(hour, 10);
  const period = hourNumber >= 12 ? "PM" : "AM";
  const formattedHour = hourNumber % 12 || 12;
  const formattedMinute = minute.padStart(2, "0");
  return `${formattedHour}:${formattedMinute} ${period}`;
};

interface Activity {
  name: string;
  duration: string; // Duración de la actividad (ej: "30 minutos")
  frequency: string; // Frecuencia (ej: "Diariamente", "3 veces por semana")
}

interface Appointment {
  _id?: string;
  date: string;
  time: string;
  description: string;
  type: string;
  status?: string;
}

const medications = [
  {
    name: "Medicamento 1",
    type: "300mg",
    frequency: "Cada 8 horas",
  },
  {
    name: "Medicamento 2",
    type: "500mg",
    frequency: "Cada 12 horas",
  },
  {
    name: "Medicamento 3",
    type: "200mg",
    frequency: "Cada 24 horas",
  },
];

const variations = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 100 },
};

const PatientTreatment: React.FC = () => {
  const doctorId = useAuthStore((state) => state.user?._id);
  const [selectedMedication, setSelectedMedication] = useState("");
  const [medicationList, setMedicationList] = useState<string[]>([]);
  const [diet, setDiet] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [showModalAppointment, setShowModalAppointment] = useState(false);

  const { id } = useParams();

  const { refetch } = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      const data = await GetInfoPatientApi(id as string);
      if (data && data?.patient?.treatment) {
        setMedicationList(data?.patient?.treatment?.medications || []);
        setAppointments(data?.patient?.treatment?.appointments || []);
        setActivities(data?.patient?.treatment?.activities || []);
        setDiet(data?.patient?.treatment?.diet || "");
      }
      if (data && data?.appointments?.length > 0) {
        setAppointments(data?.appointments || []);
      }
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await UpdateTreatmentApi(
        { medications: medicationList, activities, appointments, diet },
        id as string
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const mutationAppoinment = useMutation({
    mutationFn: async (data: Appointment) => {
      const newAppointment = {
        date: new Date(data.date),
        time: data.time,
        description: data.description,
        type: data.type,
        patient: id as string,
        doctor: doctorId,
      };
      await CreateAppointmentAPI(newAppointment);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const openCloseModalAppointment = () => {
    setShowModalAppointment(!showModalAppointment);
  };

  const [showModalActivity, setShowModalActivity] = useState(false);

  const openCloseModalActivity = () => {
    setShowModalActivity(!showModalActivity);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddAppointment = (data: any) => {
    const newAppointment = {
      date: data.date,
      time: data.time,
      description: data.reason,
      type: data.type,
    };
    mutationAppoinment.mutate(newAppointment);
    setAppointments([...appointments, newAppointment]);
  };

  const handleAddActivity = (activity: Activity) => {
    const newActivity = {
      name: activity.name,
      duration: activity.duration,
      frequency: activity.frequency,
    };
    setActivities([...activities, newActivity]);
  };

  const mutationUpdateAppintment = useMutation({
    mutationFn: async ({ status, id }: { status: string; id: string }) => {
      const data = { status };
      const updated = await UpdateStatusAppintmentsAPI(data, id as string);
      return updated;
    },
    onSuccess: () => {
      refetch();
    },
  });

  console.log(appointments);

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-6 flex flex-col items-center max-h-screen overflow-auto"
      variants={variations}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">
            Tratamiento para Paciente
          </h2>
          <button
            onClick={() => mutation.mutate()}
            className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200"
          >
            Actualizar
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Seleccionar Medicamentos
          </label>
          <select
            value={selectedMedication}
            onChange={(e) => {
              setSelectedMedication(e.target.value);
              if (!medicationList.includes(e.target.value)) {
                setMedicationList([...medicationList, e.target.value]);
              }
            }}
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Seleccionar Medicamento
            </option>
            {medications.map((med, index) => (
              <option
                key={index}
                value={`${med.name} ${med.type} - ${med.frequency}`}
              >
                {med.name} {med.type} - {med.frequency}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 font-semibold my-2">
            Receta de medicamentos
          </label>
          <ul className="mt-2">
            {medicationList.map((med, index) => (
              <li
                key={index}
                className="flex justify-between py-2 px-4 bg-gray-50 rounded-md mb-2"
              >
                <span className="text-sm text-gray-800 font-medium">{med}</span>
                <DeleteIcon
                  onClick={() =>
                    setMedicationList(
                      medicationList.filter((item) => item !== med)
                    )
                  }
                  className="text-red-500 cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Alimentación
          </label>
          <textarea
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            placeholder="Describir alimentación recomendada"
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Actividades Físicas
          </label>
          <ul className="space-y-4">
            {activities.map((activity, index) => (
              <li
                key={index}
                className="bg-gray-50 p-4 rounded-md shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{activity.name}</p>
                  <p className="text-gray-600">Duración: {activity.duration}</p>
                  <p className="text-gray-600">
                    Frecuencia: {activity.frequency}
                  </p>
                </div>
                <DeleteIcon
                  onClick={() =>
                    setActivities(
                      activities.filter(
                        (item) => index !== activities.indexOf(item)
                      )
                    )
                  }
                  className="text-red-500 cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            onClick={openCloseModalActivity}
            className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200"
          >
            Agregar Nueva Actividad
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Próximas Citas
          </h3>
          <ul className="space-y-4">
            {appointments.map((appointment, index) => (
              <li
                key={index}
                className={`${
                  appointment.status === "complete"
                    ? "bg-green-100"
                    : appointment.status === "canceled"
                    ? "bg-red-100"
                    : "bg-gray-50"
                } p-4 rounded-md shadow-md flex justify-between items-center`}
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {formatDate(appointment.date)} a las{" "}
                    {formatTime(appointment.time)}{" "}
                    <span className="text-purple-600">
                      ( {appointment.type} )
                    </span>
                  </p>
                  <p className="text-gray-600">{appointment.description}</p>
                </div>
                {appointment.status != "pending" ? (
                  <span className="text-gray-600">{appointment.status === 'complete' ? 'Completado' : 'Cancelado'}</span>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        mutationUpdateAppintment.mutate({
                          status: "canceled",
                          id: appointment?._id as string,
                        })
                      }
                      className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                    >
                      <CancelIcon />
                    </button>
                    <button
                      onClick={() =>
                        mutationUpdateAppintment.mutate({
                          status: "complete",
                          id: appointment?._id as string,
                        })
                      }
                      className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200 ml-2"
                    >
                      <CheckCircleIcon />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row justify-end gap-4">
          <button
            onClick={openCloseModalAppointment}
            className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200"
          >
            Agregar Nueva Cita
          </button>
        </div>
      </div>
      <AddApointment
        open={showModalAppointment}
        handleClose={openCloseModalAppointment}
        handleAddAppointment={handleAddAppointment}
      />
      <AddActivityForm
        open={showModalActivity}
        handleClose={openCloseModalActivity}
        handleAddActivity={handleAddActivity}
      />
    </motion.div>
  );
};

export default PatientTreatment;
