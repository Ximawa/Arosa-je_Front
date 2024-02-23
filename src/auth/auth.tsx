export function isauth(): boolean {
  const token = localStorage.getItem("jwtToken");
  return !!token; // Returns true if token exists, false otherwise
}
