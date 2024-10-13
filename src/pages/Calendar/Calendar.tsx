import useAppointmentStore from "@/store/AppointmentStore";
import React from "react";
import { addDays, format } from "date-fns";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { GetMyAppoinments } from "@/api/appointments.api";

const daysInMonth = 31;
const currentMonth = "Octubre";
const currentYear = 2024;

const Calendar: React.FC = () => {
  const appointments = useAppointmentStore((state) => state.appointments);
  const setAppointments = useAppointmentStore((state) => state.setAppointments);
  const role = useAuthStore((state) => state.user?.role);
  const userId = useAuthStore((state) => state.user?._id);
  const getAppointmentsForDay = (day: number) => {
    const formattedDay = day < 10 ? `0${day}` : day.toString();
    return appointments.filter(
      (appt) =>
        format(addDays(new Date(appt.date), 0), "yyyy-MM-dd") ===
        `${currentYear}-10-${formattedDay}`
    );
  };

useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
    const appts = await GetMyAppoinments(userId as string);
    setAppointments(appts);
    return appts;
    },
    enabled: role === 'DOCTOR'
})

const today = new Date().getDate();
console.log(today)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Calendario de {currentMonth}
      </h1>

      <div className="grid grid-cols-7 gap-4">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day, index) => (
          <div key={index} className="text-center font-bold text-gray-700">
            {day}
          </div>
        ))}

        {[...Array(daysInMonth)].map((_, day) => {
          const appointmentsForDay = getAppointmentsForDay(day + 1);
          return (
            <div
              key={day}
              className={`bg-white rounded-lg shadow-md p-2 min-h-24 flex flex-col justify-between border cursor-pointer hover:shadow-lg transition duration-200 ${today === day + 1 ? "shadow-lg shadow-purple-600" : ""}`}
            >
              <div className={`text-gray-700 font-semibold ${today === day + 1 ? "text-purple-600" : ""}`}>{day + 1}</div>

              {appointmentsForDay.length > 0 ? (
                <div className="text-xs text-purple-600 mt-2">
                  {appointmentsForDay.map((appt, idx) => (
                    <div key={idx} className={`mb-1 p-1 rounded-md ${appt.status === "pending" ? "bg-gray-100" : appt.status === "canceled" ? "bg-red-100" : "bg-green-100"}`}>
                      <p>{appt.time}</p>
                      <p>
                        {appt.description != "" ? appt.description : "Quimio"}
                      </p>
                      {role === "DOCTOR" && <p>{appt.patient?.name}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No hay citas</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
