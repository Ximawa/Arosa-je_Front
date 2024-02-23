export function isauth(): boolean {
  // TODO check if token is still valid
  const token = localStorage.getItem("jwtToken");
  return !!token; // Returns true if token exists, false otherwise
}
