import { Box } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Modal } from "../../components";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { getFaqs, getUser } from "../../features";

interface TMainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: TMainLayoutProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getFaqs());
  }, []);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        color: "layout.black",
        paddingTop: "60px",
        paddingLeft: "60px",
      }}
    >
      <Header />
      <Sidebar />
      <Modal />
      {children}
    </Box>
  );
}
export default MainLayout;
