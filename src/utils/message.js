import Swal from "sweetalert2";

export const loading = (message) => {
  return Swal.fire({
    html: message || "Please wait...",
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const success = (message) => {
  return Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1200,
  });
};

export const error = (message) => {
  return Swal.fire({
    icon: "error",
    text: message,
  });
};

export const deleteConfirm = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};
