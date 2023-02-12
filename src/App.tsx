import { ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { store } from "./app/store";
import { Loading, RoutesWith404 } from "./components";
import { AuthGuard } from "./guards";
import { PrivateRoutes, PublicRoutes } from "./models";
import { Private } from "./pages/Private";
import { defaultTheme } from "./themes";
import { SnackbarProvider } from "notistack";

const Login = lazy(async () => await import("./pages/Login/Login"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SnackbarProvider autoHideDuration={3000}>
        <Provider store={store}>
          <ThemeProvider theme={defaultTheme}>
            <RoutesWith404>
              <Route path="/" element={<Navigate to={PublicRoutes.LOGIN} />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
            </RoutesWith404>
          </ThemeProvider>
        </Provider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
