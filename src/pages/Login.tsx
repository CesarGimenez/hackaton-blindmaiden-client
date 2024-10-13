import React from "react";
import { InputText } from "@/ui";
import { useFormik } from "formik";
import { login } from "@/api/Auth.api";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store";

const Login: React.FC = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await login(values);
        setToken(result.access_token);
        setUser(result.user);
        toast.success("Bienvenido");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-400 min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-purple-600">
          Inicia Sesión
        </h2>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <InputText
              label="Correo electrônico"
              type="email"
              placeholder="Correo electrónico"
              name="email"
              onChange={formik.handleChange}
            />

            <InputText
              label="Contrasena"
              placeholder="Contrasena"
              isPasword
              name="password"
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a
            href="#"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
