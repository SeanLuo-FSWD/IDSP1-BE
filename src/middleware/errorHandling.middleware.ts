function errorHandlingMiddleware(error, req, res, next) {
  console.log("error handling middleware");
  console.log(error);
  // console.error(error);
  if (error.status) {
    console.log("88888888888888888888");
    console.log("2222222222222222");
    console.log(error);

    res.status(error.status).send({ message: error.message });
  } else {
    res.status(500).send({ message: error.toString() });
  }
}

export default errorHandlingMiddleware;
