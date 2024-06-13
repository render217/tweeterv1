import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="grid h-80 place-content-center">
        <h1 className="text-center text-5xl font-semibold max-sm:text-2xl sm:text-3xl md:text-4xl  ">
          404 Page Not Found
        </h1>
        <Link
          to={"/home"}
          className="my-2 cursor-pointer text-center hover:underline">
          Return to Home
        </Link>
      </div>
    </PageWrapper>
  );
}
