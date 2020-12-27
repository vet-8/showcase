export function checkLogin() {
  if (localStorage.getItem("token") === null) {
    // console.log("Belum Login");
    return false;
  } else {
    // console.log("Sudah Login");
    return true;
  }
}

export function checkIsClinic() {
  if (localStorage.getItem("role") === "admin") {
    return true;
  } else {
    return false;
  }
}

export function checkIsPatient() {
  if (localStorage.getItem("role") === "user") {
    return true;
  } else {
    return false;
  }
}

export function checkIsDoctor() {
  if (localStorage.getItem("role") === "doctor") {
    return true;
  } else {
    return false;
  }
}
