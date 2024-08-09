import { Link } from "react-router-dom";

// Component
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="w-full min-h-dvh flex flex-col justify-start pt-[6rem]">
      <div className="w-full h-[calc(100dvh-6rem)] flex flex-col laptopRg:flex-row items-center justify-center laptopRg:justify-between px-[4%] bg-circles-svg-image bg-cover bg-center bg-no-repeat">
        <div className="imageSide w-full laptopRg:w-[42%] flex items-center justify-center">
          <img
            src="/src/assets/page-not-found.png"
            alt="Page-Not-Found"
            className="max-h-[35rem] laptopRg:max-h-[45rem] aspect-auto mb-[2rem]"
          />
        </div>

        <div className="textSide w-full laptopRg:w-[54%] flex flex-col items-center laptopRg:items-start gap-[1rem] laptopRg:gap-[2rem]">
          <h1 className="text-[3.5rem] leading-[3.8rem] font-semibold text-theme-blue text-center laptopRg:text-left">
            PAGE NOT FOUND!
          </h1>
          <p className="text-[1.8rem] font-medium text-center laptopRg:text-left px-[2%] laptopRg:px-0">
            The page you're looking for does not exist . Please check the URL or
            return to the <span className="whitespace-nowrap">Home page</span>.
          </p>

          <Link to="/">
            <button className="text-[1.8rem] leading-[1.8rem] font-semibold bg-theme-blue text-white px-[2rem] py-[1.2rem] rounded-md hover:bg-theme-blue hover:text-theme-yellow transition-all mt-[2rem] laptopRg:mt-[1rem]">
              BACK TO HOMEPAGE
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFound;
