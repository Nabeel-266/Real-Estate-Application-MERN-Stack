import { useEffect, useState } from "react";
import { getSingleProperty } from "../api/propertyAPI's";
import { useLocation, useParams } from "react-router-dom";

// Import React Icons
import { FiMail } from "react-icons/fi";
import {
  FaArrowRight,
  FaArrowRightLong,
  FaChevronRight,
  FaRegImage,
} from "react-icons/fa6";

// Import Component
import Footer from "../components/Footer";
import ImageSlider from "../components/Property/ImageSlider";
import { BiArea } from "react-icons/bi";
import { LuBath } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { MdOutlineEmail, MdOutlineTimer } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbMessage2 } from "react-icons/tb";

const Property = () => {
  const param = useParams();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [isOpenImageSlider, setIsOpenImageSlider] = useState(false);
  const [loading, setLoading] = useState(true);

  const { size, type, purpose, city, images, price, bedroom, bathroom } =
    propertyDetails;

  // Call Get Single Property API Function
  useEffect(() => {
    getProperty(param.propertyId);
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
        <div className="min-h-[calc(100dvh-6rem)] py-[2rem] mx-[6%]">
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
                <div className="w-full flex flex-col gap-[1.5rem]">
                  {/* Property Title */}
                  <h1 className="text-[2.5rem] font-semibold text-theme-blue">
                    <span>
                      {size} {type} For {purpose === "Sell" ? "Sale" : purpose}
                    </span>{" "}
                    <span>in {city.toUpperCase()}</span>
                  </h1>

                  {/* Property Image Display Section */}
                  <section className="w-[100%] laptopSm:h-[75dvh] relative z-[1] grid grid-cols-3 grid-rows-2 gap-[1rem]">
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
                  <div className="w-full grid grid-cols-3 mt-[1rem]">
                    <section className="w-full col-span-3 tabletLg:col-span-2 flex flex-col gap-[1.2rem] px-[1.5rem]">
                      {/* Type & Purpose */}
                      <div className="w-full flex items-center justify-between text-neutral-800">
                        <p className="type relative flex items-center text-[2.2rem] leading-[2.2rem] font-semibold pl-[1.8rem] before:content-[''] before:w-[1.2rem] before:h-[1.2rem] before:bg-theme-yellow before:absolute before:left-0 before:rounded-full">
                          {type}
                        </p>

                        <p className="type relative flex items-center text-[2rem] leading-[2rem] font-semibold">
                          For {purpose === "Sell" ? "Sale" : purpose}
                        </p>
                      </div>

                      {/* Price */}
                      <p className="space-x-[0.6rem] text-theme-blue select-none mt-[0.3rem]">
                        <span className="text-[2.2rem] leading-[2.2rem] font-semibold">
                          PKR{" "}
                        </span>
                        <span className="text-[2.8rem] leading-[2.8rem] font-bold">
                          {price?.label}
                        </span>
                      </p>

                      {/* Details */}
                      <div className="w-full flex items-center gap-[2rem] text-[2rem] leading-[2rem] font-semibold select-none text-neutral-800 mt-[0.5rem]">
                        {/* Bedroom */}
                        {bedroom && (
                          <abbr title="Bedroom" className="no-underline ">
                            <span className="bed flex items-center gap-[0.8rem]">
                              <LiaBedSolid size="2.1rem" />{" "}
                              <span>{bedroom}</span>
                            </span>
                          </abbr>
                        )}

                        {/* Bathroom */}
                        {bathroom && (
                          <abbr title="Bathroom" className="no-underline">
                            <span className="bath flex items-center gap-[0.8rem]">
                              <LuBath size="1.8rem" /> <span>{bathroom}</span>
                            </span>
                          </abbr>
                        )}

                        {/* Size */}
                        <abbr title="Size" className="no-underline">
                          <span className="area flex items-center gap-[0.8rem]">
                            <BiArea size="2rem" /> <span>{size}</span>
                          </span>
                        </abbr>
                      </div>

                      {/* City */}
                      <p className="flex items-center gap-[0.8rem] text-[2rem] text-neutral-800 mt-[0.5rem]">
                        <HiOutlineLocationMarker />
                        <span className="leading-[2rem] font-semibold">
                          {city}
                        </span>
                      </p>
                    </section>

                    <aside className="flex flex-col gap-[2rem] px-[1.5rem]">
                      <h2 className="text-[2rem] leading-[2rem] font-semibold text-neutral-800">
                        Published By
                      </h2>

                      <div className="w-full flex flex-col gap-[1rem] p-[1.5rem] border-[0.2rem] border-neutral-200 rounded-lg shadow-lg">
                        <div className="w-full flex justify-between">
                          <img
                            src="/src/assets/Agents/agent04.png"
                            alt="Agent"
                            className="w-[10rem] h-[10rem] rounded-full object-cover border-[0.2rem] border-theme-blue"
                          />

                          <p className="flex flex-col items-end gap-[0.2rem] text-neutral-700 text-[1.5rem] leading-[1.6rem] font-semibold">
                            <span className="text-theme-blue">Added in</span>

                            <span>2m ago</span>
                          </p>
                        </div>

                        <h4 className=" text-neutral-800 text-[1.8rem] leading-[1.8rem] font-semibold">
                          Muhammad Nabeel
                        </h4>

                        <p className="flex items-center gap-[0.5rem] text-neutral-700 text-[1.5rem] leading-[1.5rem] font-semibold">
                          <MdOutlineEmail size="1.7rem" />
                          <span>nabeelmajeed266@gmail.com</span>
                        </p>
                      </div>

                      <button className="text-[1.6rem] leading-[1.6rem] font-semibold text-white bg-theme-blue flex items-center justify-center gap-[0.5rem] py-[0.8rem] rounded-md border-[0.2rem] border-theme-blue hover:text-theme-yellow transition-all">
                        <TbMessage2 size="2rem" />
                        <span>INQUIRE</span>
                      </button>
                    </aside>
                  </div>
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

      {isOpenImageSlider && (
        <ImageSlider images={images} isOpenSlider={setIsOpenImageSlider} />
      )}
    </>
  );
};

export default Property;
