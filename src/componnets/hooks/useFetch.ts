import { FormValues } from "mario/app/dashboard/check_reserv/page";
import { Inputs } from "../form";

export const postData = async (url: string, bodyDataForm: Inputs) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyDataForm),
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
