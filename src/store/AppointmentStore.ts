/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AppointmentStore {
  appointments: any[]
}

interface AppointmentActions {
  setAppointments: (appointments: AppointmentStore['appointments']) => void
}

const initialState = {
  appointments: [],
  canceled: [],
  completed: [],
  pending: [],
}

export const useAppointmentStore = create<AppointmentStore & AppointmentActions>()(
  persist(
    (set) => ({
      appointments: initialState.appointments,
      setAppointments: (appointments) => set({ appointments }),
    }),
    {
      name: 'appointment-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useAppointmentStore
