import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { RoutesWith404 } from "../../components";
import { PrivateRoutes } from "../../models";

const Dashboard = lazy(async () => await import("../Dashboard/Dashboard"));
const Faqs = lazy(async () => await import("../Faqs/Faqs"));

function Private() {
  return (
    <RoutesWith404>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      <Route path={PrivateRoutes.FAQS} element={<Faqs />} />
    </RoutesWith404>
  );
}
export default Private;
