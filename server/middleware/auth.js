import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // grabbing token from frontend after login
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied.");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
