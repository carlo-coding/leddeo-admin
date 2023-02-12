import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "../../app/hooks";
import { MainLayout } from "../../layouts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

function Faqs() {
  const faqs = useAppSelector((state) => state.faq.data);

  const handleDelete = (id: number) => (e: any) => {
    e.stopPropagation();
    // Dispatch delete
  };
  const handleEdit = (id: number) => (e: any) => {
    e.stopPropagation();
    // Dispatch edit
  };

  return (
    <MainLayout>
      <Box
        sx={{
          background: "white",
          flexGrow: 1,
          display: "flex",
          placeItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "layout.lightGray",
            flexGrow: 1,
            width: "100%",
            height: "100%",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <h2>Preguntas frecuentes</h2>
          </Box>
          {faqs.map((faq) => (
            <Accordion key={faq.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={`panel${faq.id}a-header`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {faq.question}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  <IconButton onClick={handleEdit(faq.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete(faq.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                ></Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
}
export default Faqs;
