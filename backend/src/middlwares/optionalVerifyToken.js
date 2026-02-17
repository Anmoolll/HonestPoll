import jwt from "jsonwebtoken";
import { JWT_PRIVATE } from "../config/veriables.js";
import { findUserById } from "../repositories/user.repo.js";

// Similar to verifyToken, but does not reject requests without/with invalid token.
// If a valid token is present, req.user is populated; otherwise the request continues anonymously.
export const optionalVerifyToken = async (req, _res, next) => {
  try {
    const token = req.cookies?.["honestpoll-access-token"];
    if (token) {
      const decodedData = jwt.verify(token, JWT_PRIVATE);
      const userid = decodedData.id;
      const user = await findUserById(userid);

      if (user) {
        req.user = user;
      }
    }
  } catch (err) {
    console.log("optionalVerifyToken error (continuing anonymously):", err);
  }
  next();
};

