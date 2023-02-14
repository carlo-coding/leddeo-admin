import { Box, TextField } from "@mui/material";
import { IGetTokenPayload } from "../../models";
import { useAppDispatch } from "../../app/hooks";
import { googleAuth, login } from "../../features";
import { enqueueSnackbar } from "notistack";
import { ILoginPayload } from "./interfaces/Login";
import * as Yup from "yup";
import { Formik } from "formik";
import { MainLayout } from "../../layouts";
import { isAdmin, setCookie } from "../../utils";

function Login() {
  const dispatch = useAppDispatch();

  const initialValues: ILoginPayload = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Al menos 3 carácteres")
      .required("Campo requerido"),
    password: Yup.string(),
  });

  const handleFormSubmit = async (values: ILoginPayload) => {
    dispatch(login(values));
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
        color: "layout.darkGray",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, handleSubmit, handleChange, handleBlur }) => {
          const getInputError = (
            field: keyof ILoginPayload
          ): string | undefined => {
            return errors[field] !== "" && touched[field] !== undefined
              ? errors[field]
              : "";
          };

          return (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "3px 4px 8px 5px rgba(0,0,0,0.26)",
                padding: "35px",
                backgroundColor: "layout.lightGray",
              }}
              onSubmit={handleSubmit}
            >
              <h2>Panel de administración</h2>
              <TextField
                label="Nombre de usuario"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={getInputError("username")}
                error={Boolean(getInputError("username"))}
                autoComplete="off"
              />
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={getInputError("password")}
                error={Boolean(getInputError("password"))}
                autoComplete="off"
              />

              <button type="submit">Iniciar sesión</button>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}
export default Login;
