import { ToastPosition, toast } from "react-toastify";

const config = {
  pauseOnHover: true,
  style: {
    zIndex: "999999 !important",
  },
};

export const alertSuccess = (
  _message = "",
  position: ToastPosition = "top-center"
) => {
  toast.success(_message, {
    ...config,
    position: position,
  });
};

export const alertWarning = (
  _message = "",
  position: ToastPosition = "top-center"
) => {
  toast.warn(_message, {
    ...config,
    position: position,
  });
};

export const alertInfo = (
  _message = "",
  position: ToastPosition = "top-center"
) => {
  toast.info(_message, {
    ...config,
    position: position,
  });
};
export const alertError = (
  _message = "",
  position: ToastPosition = "top-center"
) => {
  toast.error(_message, {
    ...config,
    position: position,
  });
};
