import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <h1>Page Not Found! </h1>
      <Link to={"/"}>
        <h3>Go back to main page.</h3>
      </Link>
    </>
  );
};

export default NotFound;
