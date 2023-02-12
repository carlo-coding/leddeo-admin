import { MainLayout } from "../../layouts";
import { request } from "../../utils";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function Dashboard() {
  const [subtitleRecords, setSubtitleRecords] = useState<any[]>([]);
  const [downloadRecords, setDownloadRecords] = useState<any[]>([]);
  const [translationRecords, setTranslationRecords] = useState<any[]>([]);

  async function getSutitleRecords() {
    const [response] = await request<any>({
      endpoint: "/video/records/subtitles",
    });
    setSubtitleRecords(response);
  }

  async function getDownloadRecords() {
    const [response] = await request<any>({
      endpoint: "/video/records/downloads",
    });
    setDownloadRecords(response);
  }

  async function getTranslationRecords() {
    const [response] = await request<any>({
      endpoint: "/language/records/translations",
    });
    setTranslationRecords(response);
  }

  useEffect(() => {
    getSutitleRecords();
    getDownloadRecords();
    getTranslationRecords();
  }, []);

  return (
    <MainLayout>
      <Box
        sx={{
          color: "layout.white",
        }}
      >
        <Box>
          <p>
            Número de subtitulos generados:{" "}
            <span>{subtitleRecords.length}</span>
          </p>
          <p>
            Promedio de palabras generadas:{" "}
            <span>
              {subtitleRecords.reduce(
                (acc, curr) => acc + curr.number_of_words,
                0
              ) / (subtitleRecords.length || 1)}
            </span>
          </p>
        </Box>
        <Box>
          <p>
            Número de videos descargados: <span>{downloadRecords.length}</span>
          </p>
          <p>
            Promedio de duración de videos:{" "}
            <span>
              {downloadRecords.reduce(
                (acc, curr) => acc + curr.video_duration,
                0
              ) / (downloadRecords.length || 1)}
            </span>
          </p>
        </Box>
        <Box>
          <p>
            Número de subtitulos traducidos:{" "}
            <span>{translationRecords.length}</span>
          </p>
          <p>
            Promedio de palabras traducidas:{" "}
            <span>
              {translationRecords.reduce(
                (acc, curr) => acc + curr.number_of_words,
                0
              ) / (translationRecords.length || 1)}
            </span>
          </p>
        </Box>
      </Box>
    </MainLayout>
  );
}
export default Dashboard;
