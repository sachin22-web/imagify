import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, Login Again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    // ✅ sirf yahi set karo
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("auth error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
