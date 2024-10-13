import { UploadDocumentAI } from "@/api/upload-ai.api";
import React, { useState } from "react";

const DocumentIA: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Por favor, selecciona un archivo.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await UploadDocumentAI(formData);
      console.log(response);
      if (response.aiMessage) {
        setAiResponse(response.aiMessage);
      } else {
        setError("Error al subir el archivo.");
      }
    } catch (err) {
      console.error(err);
      setError("Hubo un error en la subida.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Subir Documento para Análisis
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
      >
        <div className="mb-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 mb-3 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 16v-2a4 4 0 014-4h1m6 0h1a4 4 0 014 4v2m-7-4v10m0 0l-3-3m3 3l3-3M5 13l7-7 7 7"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  {selectedFile ? (
                    <span className="font-semibold">{selectedFile.name}</span>
                  ) : (
                    <>
                      <span className="font-semibold">Haz clic para subir</span>{" "}
                      o arrastra el archivo aquí
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500">PDF o DOC (máx. 10 MB)</p>
              </div>
              <input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg shadow-md bg-purple-600 text-white ${
              uploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-purple-700 transition duration-200"
            }`}
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Subir Documento"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>

      {aiResponse && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Respuesta de la IA
          </h2>
          <p className="text-gray-700">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentIA;
