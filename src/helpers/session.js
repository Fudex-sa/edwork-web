export function saveSession(data) {
  try {
    localStorage.setItem("redux", JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

export function extractSession() {
  try {
    const value = localStorage.getItem("redux");
    const parseValue = JSON.parse(value);
    return parseValue || {};
  } catch (err) {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem("redux");
  } catch (err) {
    console.error(err);
  }
}
