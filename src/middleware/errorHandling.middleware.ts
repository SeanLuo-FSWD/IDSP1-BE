function errorHandlingMiddleware(error, req, res, next) {
  console.log("error handling middleware");
  console.log(error);
  // console.error(error);
  if (error) {
    res.status(error.status).send({ message: error.message });
  } else {
    res.status(500).send({ message: error.toString() });
  }
}

export default errorHandlingMiddleware;
