import { getJWTData } from "../utils/jwtUtils";

export function isauth(): boolean {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return false; // Token does not exist
  }

  const tokenData = getJWTData();

  if (!tokenData) {
    return false; // Token data is null
  }

  const tokenExpiration = new Date(tokenData.exp * 1000);

  if (tokenExpiration < new Date()) {
    return false; // Token is expired
  }

  return true; // Token is valid
}
