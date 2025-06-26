export const handleError = (res, error, code = 500) => {
  const messageError = error.message ? error.message : error;
  return res.status(code).json({
    statusCode: code,
    message: messageError || "Internal Server Err",
  });
};
