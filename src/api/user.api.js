import axios from "axios";
import Swal from "sweetalert2";
const REACT_APP_API_URL =
  "https://loren-tp-programacion3.azurewebsites.net/api";

const AuthorizationToken = () => {
  const token = localStorage.getItem("bearerToken");
  return `${token}`;
};

export const updateUserAPI = async (userToUpdate) => {
  try {
    const response = await axios.put(
      `${REACT_APP_API_URL}/User`,
      userToUpdate,
      {
        headers: {
          Authorization: `Bearer ${AuthorizationToken()}`,
        },
      }
    );
    Swal.fire({
      title: "Perfecto!",
      text: "Has cambiado los datos exitosamente",
      confirmButtonText: "Cool",
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteUserAPI = async () => {
  try {
    const response = await axios.delete(`${REACT_APP_API_URL}/User`, {
      headers: {
        Authorization: `Bearer ${AuthorizationToken()}`,
      },
    });
    Swal.fire({
      title: "Perfecto!",
      text: "Seguro quiere borrar su cuenta?",
      confirmButtonText: "Si :(",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("user");
        window.location.reload();
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error updating product:", error);
    throw error;
  }
};
