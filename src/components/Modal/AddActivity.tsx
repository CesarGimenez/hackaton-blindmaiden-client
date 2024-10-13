import { Box, Modal } from "@mui/material";
import React, { useState } from "react";

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
  handleAddActivity: ({
    name,
    duration,
    frequency,
  }: {
    name: string;
    duration: string;
    frequency: string;
  }) => void;
}

const AddActivityForm = ({ open, handleClose, handleAddActivity }: Props) => {
  const [activityName, setActivityName] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityFrequency, setActivityFrequency] = useState("");

  const resetData = () => {
    setActivityName("");
    setActivityDuration("");
    setActivityFrequency("");
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
              handleAddActivity({
                name: activityName,
                duration: activityDuration,
                frequency: activityFrequency,
              });
              handleClose();
              resetData();
            }}
            className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
              Agregar Nueva Actividad
            </h3>

            {/* Nombre de la actividad */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre de la Actividad
              </label>
              <input
                type="text"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                placeholder="Nombre de la actividad"
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            {/* Duración de la actividad */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Duración
              </label>
              <input
                type="text"
                value={activityDuration}
                onChange={(e) => setActivityDuration(e.target.value)}
                placeholder="Duración de la actividad (ej: 30 minutos)"
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            {/* Frecuencia de la actividad */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Frecuencia
              </label>
              <input
                type="text"
                value={activityFrequency}
                onChange={(e) => setActivityFrequency(e.target.value)}
                placeholder="Frecuencia (ej: Diariamente, 3 veces por semana)"
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            {/* Botón para agregar actividad */}
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200"
            >
              Agregar Actividad
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddActivityForm;
