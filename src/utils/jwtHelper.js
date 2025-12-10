import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    console.error("Token inválido detectado");
    return null;
  }
};

export const isTokenValid = (token) => {
    const decoded = decodeToken(token);
    if (!decoded) return false;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
};