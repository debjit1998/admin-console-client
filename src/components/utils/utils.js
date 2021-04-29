export const CreationPopupMessage = (values) => {
  let message = "Are you sure you want to save these values?\n";
  let keys = Object.keys(values);

  keys.forEach((key) => {
    message += key + ":   " + values[key] + "\n";
  });
  return message;
};

export const UpdationPopupMessage = (values, keys) => {
  console.log(keys);
  let message = "Are you sure you want to save these values?\n";
  keys.forEach((key) => {
    message += key + ":   " + values[key] + "\n";
  });
  return message;
};

export const offerColor = (c) => {
  if (c === "danger") {
    return {
      fontWeight: "bold",
      color: "#721c24",
      backgroundColor: "#f8d7da",
      borderColor: "#f5c6cb",
    };
  } else if (c === "warning") {
    return {
      fontWeight: "bold",
      color: "#856404",
      backgroundColor: "#fff3cd",
      borderColor: "#ffeeba",
    };
  } else if (c === "success") {
    return {
      fontWeight: "bold",
      color: "#155724",
      backgroundColor: "#d4edda",
      borderColor: "#c3e6cb",
    };
  } else {
    return {
      fontWeight: "bold",
      color: "#383d41",
      backgroundColor: "#e2e3e5",
      borderColor: "#d6d8db",
    };
  }
};

export const menuColor = (food_type) => {
  //console.log(food_type);
  if (food_type === 1) {
    return "alert alert-success";
  } else {
    return "alert alert-danger";
  }
};
