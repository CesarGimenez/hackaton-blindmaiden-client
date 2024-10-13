import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "40px",
  borderRadius: "10px",
};

interface Props {
  open: boolean;
  handleClose: () => void;
  handleAddAppointment: ({ date, time, reason, type }: { date: string, time: string, reason: string, type: string }) => void;
}

const AddApointment = ({ open, handleClose, handleAddAppointment }: Props) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");

  const [appoinmentType, setAppoinmentType] = useState('');

  const handleAppoinmentType = (type: string) => {
    setAppoinmentType(type);
  };

  const resetData = () => {
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentReason("");
    setAppoinmentType('');
  };
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddAppointment({ date: appointmentDate, time: appointmentTime, reason: appointmentReason, type: appoinmentType });
              handleClose();
              resetData();
            }}
            className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
              Agregar Nueva Cita
            </h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Fecha de la Cita
              </label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Hora de la Cita
              </label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tipo
              </label>
              <select
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mb-2"
                value={appoinmentType}
                onChange={(e) => handleAppoinmentType(e.target.value)}
                required
              >
                <option value="" disabled>Seleccionar</option>
                <option value="Consulta">Consulta</option>
                <option value="Quimioterapia">Quimioterapia</option>
              </select>
            </div>

            {
              appoinmentType === 'Consulta' &&
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Motivo de la consulta
                </label>
                <input
                  type="text"
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                  placeholder="Describir motivo de la cita"
                  className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
                  required
                />
              </div>
            }

            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200"
            >
              Agregar cita
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddApointment;
