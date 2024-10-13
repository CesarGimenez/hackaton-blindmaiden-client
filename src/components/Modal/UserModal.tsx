import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { CreateUserApi, UpdateUserApi } from "@/api/Users.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { UserEdit } from "@/types/user.types";

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
  refetch: () => void;
  user: UserEdit | null;
}

const getValidationSchema = (user: UserEdit | null) => {
  if (user) {
    return Yup.object().shape({
      name: Yup.string()
        .required("El nombre es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres"),
      email: Yup.string()
        .required("El email es requerido")
        .email("El email no es valido"),
      password: Yup.string()
        .required("La contrasena es requerida")
        .min(6, "La contrasena debe tener al menos 6 caracteres"),
      username: Yup.string().required("El username es requerido"),
      isAdmin: Yup.boolean(),
    });
  }

  return Yup.object().shape({
    name: Yup.string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    email: Yup.string()
      .required("El email es requerido")
      .email("El email no es valido"),
    password: Yup.string()
      .required("La contrasena es requerida")
      .min(6, "La contrasena debe tener al menos 6 caracteres"),
    isAdmin: Yup.boolean(),
  });
};

const getInitialValues = (user: UserEdit | null) => {
  return {
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
    username: user?.username || "",
    type: user?.type || "NORMAL",
  };
};

const UserModal = ({ open, handleClose, refetch, user }: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const mutation = useMutation({
    mutationFn: (values: unknown) => CreateUserApi(values),
    onMutate: () => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (data.typeError) {
        toast.error(data.message, {
          toastId: "eqmwg",
        });
      } else {
        toast.success(data.message, {
          toastId: "eqmwg",
        });
        refetch();
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message, {
        toastId: "eqmwg",
      });
    },
  });

  const mutationEdit = useMutation({
    mutationFn: (values: unknown) => UpdateUserApi(values, user?.id || 0),
    onMutate: () => {},

    onSuccess: (data) => {
      if (data.typeError) {
        toast.error(data.message, {
          toastId: "eqmwg",
        });
      } else {
        toast.success(data.message, {
          toastId: "eqmwg",
        });
        refetch();
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message, {
        toastId: "eqmwg",
      });
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>{user ? "Editar usuario" : "Crear usuario"}</h1>

          <Formik
            initialValues={getInitialValues(user)}
            validationSchema={getValidationSchema(user)}
            validateOnChange
            onSubmit={(values, { setSubmitting }) => {
              values.type = isAdmin ? "ADMIN" : "NORMAL";
              if (user) {
                mutationEdit.mutate(values);
              } else {
                mutation.mutate(values);
              }
              setSubmitting(false);
              handleClose();
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Field
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  as={TextField}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  as={TextField}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  as={TextField}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Contrasena"
                  as={TextField}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={isAdmin}
                      onChange={() => setIsAdmin(!isAdmin)}
                      name="isAdmin"
                      color="secondary"
                    />
                  }
                  label="Administrador"
                />

                <ErrorMessage
                  name="isAdmin"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <div className="flex justify-center gap-5 mt-5">
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white p-2 rounded-lg mb-10 px-5 disabled:opacity-50"
                    disabled={isSubmitting || !isValid}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-lg mb-10 px-5"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
