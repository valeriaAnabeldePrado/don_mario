import { FormValues } from "mario/app/dashboard/check_reserv/page";

export const getData = async (url: string, dataReservation: FormValues) => {
  try {
    const queryParams = new URLSearchParams({
      email: dataReservation.email,
      lastName: dataReservation.lastName,
    });

    const response = await fetch(`${url}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getReservas = async () => {
  try {
    const response = await fetch("http://localhost:1234/reservas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getHorasDisponible = async (
  baseUrl: string,
  date: string,
  turno: string,
  personas: number
) => {
  try {
    const queryParams = new URLSearchParams({
      turno,
      personas: personas.toString(),
    });

    const fullUrl = `${baseUrl}${date}/horarios?${queryParams}`;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async <T>(url: string, bodyDataForm: T) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyDataForm),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};
