export function requireAdmin() {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "admin") {
      window.location.href = "/dashboard";
    }
  } catch {
    window.location.href = "/login";
  }
}
