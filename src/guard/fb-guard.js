const firebase = require("../services/firebase");
const UserUnauthorizedErrorPayload = {
  status: false,
  message: "User unauthorized",
};

const firebaseGuard = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).json(UserUnauthorizedErrorPayload);
  }
  let idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json(UserUnauthorizedErrorPayload);
  }
};

module.exports = firebaseGuard;
