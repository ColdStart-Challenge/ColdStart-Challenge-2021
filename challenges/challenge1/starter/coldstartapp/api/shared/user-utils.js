const getUser = (req) => {
    const header = req.headers["x-ms-client-principal"];
    if (header != undefined) {
        const encoded = Buffer.from(header, "base64");
        const decoded = encoded.toString("ascii");

        return JSON.parse(decoded);
    }
    return { userDetails: "John Doe" };
};


const getAuthenticationStatus = (req) => {
  const header = req.headers["x-ms-client-principal"];
  if (header != undefined) {
      return { status: "authenticated" };
  }
  return { status: "anonymous" };
};


module.exports = { getUser, getAuthenticationStatus };