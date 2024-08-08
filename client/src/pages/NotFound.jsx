// Import

// Component
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <div className="w-full min-h-dvh flex flex-col justify-start pt-[6rem]">
        <div className="w-full h-[calc(100dvh-6rem)] flex flex-col items-center justify-center px-[2%] bg-circles-svg-image bg-cover bg-center bg-no-repeat">
          <img
            src="/src/assets/page-not-found.png"
            alt="Page-Not-Found"
            className="aspect-auto mb-[2rem]"
          />
          <h1 className="text-[3.5rem] leading-[3.8rem] font-semibold text-theme-blue text-center">
            PAGE NOT FOUND
          </h1>
          <p className="text-[1.8rem] font-medium mt-[1rem] text-center">
            The page you're looking for does not exist. Please check the URL or
            return to the Home page.
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
