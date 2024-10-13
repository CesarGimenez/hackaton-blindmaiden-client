import React from "react";

interface Document {
  id: number;
  type: string;
  name: string;
  uploadDate: string;
  previewUrl: string;
}

const documents: Document[] = [
  {
    id: 1,
    type: "PDF",
    name: "Reporte Médico",
    uploadDate: "2024-10-10",
    previewUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmGqaYh7UxB-psGUQm2D9CwI5fxl0zlZcWNw&s",
  },
  {
    id: 2,
    type: "Imagen",
    name: "Examen de Laboratorio",
    uploadDate: "2024-09-25",
    previewUrl:
      "https://static.vecteezy.com/system/resources/previews/026/641/417/non_2x/clinical-analysis-result-icon-lab-blood-test-medicine-report-medical-check-up-health-check-icon-isolated-on-white-background-vector.jpg",
  },
  {
    id: 3,
    type: "Word",
    name: "Informe de Seguimiento",
    uploadDate: "2024-08-18",
    previewUrl:
      "https://icons.iconarchive.com/icons/ziggy19/microsoft-office-mac-tilt/512/Word-icon.png",
  },
];

const MyFolder: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Documentos Subidos
        </h1>

        <button className="bg-purple-600 text-white p-2 rounded-lg mb-10 hover:bg-purple-700">
          Subir nuevo
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <div className="flex justify-center mb-4">
              <img
                src={doc.previewUrl}
                alt={`${doc.type} preview`}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {doc.name}
              </h3>
              <p className="text-gray-600 text-sm">{doc.type}</p>
              <p className="text-gray-500 text-sm">
                Subido el: {doc.uploadDate}
              </p>
            </div>

            <div className="mt-4">
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-200">
                Ver documento
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFolder;
