import jwt from "jwt-simple";

const secret = process.env.JWT_SECRET || "";
export function encodeToken(payload: object): string {
  return jwt.encode(payload, secret, "HS256");
}

export function decodeToken(token: string): object | null {
  try {
    return jwt.decode(token, secret, true, "HS256");
  } catch (error) {
    console.error("Error decoding the token:", error);
    return null;
  }
}
