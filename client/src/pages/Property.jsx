import { useEffect, useState } from "react";
import { getSingleProperty } from "../api/propertyAPI's";
import { useLocation } from "react-router-dom";

// Import React Icons
import { FiMail } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa6";

// Import Component
import Footer from "../components/Footer";
import ImageSlider from "../components/Property/ImageSlider";

const Property = () => {
  const routeLocation = useLocation();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [isOpenImageSlider, setIsOpenImageSlider] = useState(false);
  const [loading, setLoading] = useState(true);

  const { size, type, purpose, city, images } = propertyDetails;

  // Call Get Single Property API Function
  useEffect(() => {
    const propertyId = routeLocation.pathname.split("/")[2];
    getProperty(propertyId);
  }, []);

  // Get Single Property
  const getProperty = async (propertyId) => {
    try {
      setLoading(true);
      const property = await getSingleProperty(propertyId);
      setPropertyDetails(property);
      // console.log(property);
    } catch (error) {
      console.error("Error fetching property:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="propertyCont w-full pt-[6rem]">
        <div className="min-h-[calc(100dvh-6rem)] py-[2rem] mx-[4%]">
          {loading ? (
            <div className="w-full">
              <div className="w-[60%] h-[50vh] grid grid-cols-3 grid-rows-2 gap-[1rem] rounded-3xl overflow-hidden animate-pulse *:bg-gray-300 *:rounded-2xl">
                <div className="col-span-2 row-span-2"></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>
              {!!Object.entries(propertyDetails).length ? (
                <div className="w-full flex flex-col gap-[2rem]">
                  {/* Title Bar */}
                  <div className="w-full flex items-center justify-center">
                    <h1 className="text-[2rem] font-semibold text-neutral-700 ">
                      {size} {type} For {purpose === "Sell" ? "Sale" : purpose}
                    </h1>

                    {/* <button className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue flex items-center gap-[0.8rem] py-[0.6rem] px-[1rem] rounded-md border-[0.2rem] border-theme-blue">
                    <FiMail size="1.6rem" />
                    <span>INQUIRE</span>
                  </button> */}
                  </div>

                  {/* Image Display Section */}
                  <section className="w-[60%] h-[50vh] relative z-[1] grid grid-cols-3 grid-rows-2 gap-[1rem]">
                    {images.slice(0, 3).map((imageURL, index) => (
                      <div
                        key={index}
                        onClick={() => setIsOpenImageSlider(true)}
                        className={`image size-full relative shadow-lg hover:brightness-90 transition-all rounded-2xl ${
                          index === 0 && "col-span-2 row-span-2"
                        }`}
                      >
                        <img
                          src={imageURL}
                          alt="Property"
                          className={`size-full object-cover cursor-pointer rounded-2xl`}
                        />

                        {index === 0 && (
                          <div className="totalImages absolute bottom-[1rem] right-[1rem] py-[0.5rem] px-[1rem] rounded-lg bg-theme-yellow text-neutral-800 flex items-end gap-[0.5rem] pointer-events-none">
                            <FaRegImage size="1.7rem" />
                            <span className="text-[1.7rem] leading-[1.6rem] font-semibold">
                              5
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </section>

                  {/* Property Details Section */}
                </div>
              ) : (
                // No Property Found
                <div className="w-full h-[calc(100dvh-15rem)] flex flex-col items-center justify-center text-center text-neutral-700">
                  <img
                    src="/src/assets/no-property-data.png"
                    alt="property-not-found"
                    className="w-[30rem] select-none"
                  />
                  <p className="text-[2.5rem] font-bold">PROPERTY NOT FOUND</p>
                  <p className="w-full tabletSm:w-[80%] laptopSm:w-[55%] text-[1.6rem] tabletSm:text-[1.8rem] font-semibold mt-[0.4rem]">
                    Sorry, the property you are looking for it might have been
                    removed, or the link you followed is incorrect.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {isOpenImageSlider && <ImageSlider images={images} />}
    </>
  );
};

export default Property;
