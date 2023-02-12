import { enqueueSnackbar } from "notistack";
import { setCookie } from "./cookies";
const apiUrl = import.meta.env.VITE_API_URL as string;

async function getCsrfToken(): Promise<string | undefined> {
  const resp = await fetch(`${apiUrl}/admin`);
  const data = await resp.text();
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(data, "text/html");
  const csrfInput: HTMLInputElement | null = htmlDoc.querySelector(
    "input[name='csrfmiddlewaretoken']"
  );
  const csrfToken = csrfInput?.value;
  return csrfToken;
}

export async function isAdmin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const csrfToken = await getCsrfToken();
  if (!csrfToken) {
    enqueueSnackbar("No se pudo obtener token CSRF", {
      variant: "error",
    });
    return false;
  }
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("csrfmiddlewaretoken", csrfToken);
  setCookie("csrftoken", csrfToken);
  const resp = await fetch(`${apiUrl}/admin/login/?next=/admin/`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  const data = await resp.text();
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(data, "text/html");
  const adminUsername =
    htmlDoc.querySelector("#user-tools>strong")?.textContent;
  return adminUsername === username;
}
