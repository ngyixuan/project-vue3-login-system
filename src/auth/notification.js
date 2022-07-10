export const success = (msg) => {
    ElNotification({
        title: "Success",
        message: msg,
        type: "Success",
      });
}

export const warning = (msg) => {
    ElNotification({
        title: "Warning",
        message: msg,
        type: "warning",
      });
}