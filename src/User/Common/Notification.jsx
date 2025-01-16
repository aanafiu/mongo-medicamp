import Swal from "sweetalert2";

export const notifySuccess = (message) => {
  return Swal.fire({
    icon: "success",
    title: "Successfully!",
    text: message,
    confirmButtonColor: "#4caf50",
    confirmButtonText: "Continue",
  });
};

export const notifyLogin = (message) => {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Sign In",
    text:message,
    showConfirmButton: false,
    timer: 1500
  });
};

export const notifyError = (message) => {
  return Swal.fire({
    icon: "error",
    title: "Error!",
    text: message,
    confirmButtonColor: "#f44336", // Custom color for error
  });
};

export const notifyWarning = (message) => {
  return Swal.fire({
    icon: "warning",
    title: "Warning!",
    text: message,
    confirmButtonColor: "#ffc107", // Custom color for warning
  });
};
