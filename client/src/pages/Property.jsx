import { useEffect, useRef, useState } from "react";
import { getSingleProperty } from "../api/propertyAPI's";
import { useParams } from "react-router-dom";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { landmarksNearby } from "../lib/dummyData";

// Import React Icons
import { FaRegImage } from "react-icons/fa6";
import { LuBath } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { BiArea, BiFullscreen } from "react-icons/bi";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { TbMessage2 } from "react-icons/tb";
import { VscCallIncoming } from "react-icons/vsc";

// Import Component
import Footer from "../components/Footer";
import ImageSlider from "../components/Property/ImageSlider";
import ContactModal from "../components/Property/ContactModal";
import InquireModal from "../components/Property/InquireModal";

const Property = () => {
  const param = useParams();
  const mapRef = useRef(null);
  const barRef = useRef(null);
  const imageSection = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isOpenImageSlider, setIsOpenImageSlider] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);
  const [isOpenInquireModal, setIsOpenInquireModal] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState({});
  const [nearBy, setNearBy] = useState(null);
  const [features, setFeatures] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    size,
    type,
    purpose,
    city,
    images,
    price,
    bedroom,
    bathroom,
    condition,
    description,
    coordinates,
  } = propertyDetails;

  useEffect(() => {
    const handleScroll = () => {
      if (imageSection.current) {
        const triggerPoint = imageSection.current.offsetHeight + 20;
        const scrollTop = window.scrollY;

        if (scrollTop >= triggerPoint) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      setNearBy(
        property.features?.filter((feature) =>
          landmarksNearby.includes(feature)
        )
      );
      setFeatures(
        property.features?.filter(
          (feature) => !landmarksNearby.includes(feature)
        )
      );
    } catch (error) {
      console.error("Error fetching property:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFullScreen = () => {
    mapRef.current.requestFullscreen
      ? mapRef.current.requestFullscreen()
      : // Firefox
      mapRef.current.mozRequestFullScreen
      ? mapRef.current.mozRequestFullScreen()
      : // Chrome, Safari & Opera
      mapRef.current.webkitRequestFullscreen
      ? mapRef.current.webkitRequestFullscreen()
      : // IE/Edge 11
        mapRef.current.msRequestFullscreen();
  };

  return (
    <>
      <div className="propertyCont w-full pt-[6rem]">
        <div className="min-h-[calc(100dvh-6rem)] pt-[2rem] pb-[5rem] mx-[4%] laptopSm:mx-[6%]">
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
              {Object.entries(propertyDetails).length ? (
                <div className="w-full flex flex-col gap-[1rem]">
                  {/* Property Image Display Section */}
                  <section
                    ref={imageSection}
                    className="w-[100%] laptopSm:h-[75dvh] relative z-[1] grid grid-cols-3 grid-rows-2 gap-[1rem]"
                  >
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
                          <div className="totalImages absolute bottom-[1rem] right-[1rem] py-[0.5rem] px-[1rem] rounded-lg bg-white text-neutral-800 flex items-end gap-[0.5rem] pointer-events-none">
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
                  <div className="w-full flex flex-col laptopSm:px-[1%]">
                    {/* Title Bar */}
                    <section
                      ref={barRef}
                      className={`w-full flex flex-col-reverse gap-[1rem] tabletLg:flex-row tabletLg:items-center tabletLg:justify-between bg-white py-[1rem] ${
                        isFixed
                          ? "fixed z-[50] top-[6rem] left-0 px-[4%] laptopSm:px-[6%]"
                          : "relative"
                      }`}
                    >
                      <h1 className="text-[2.8rem] font-bold text-theme-blue">
                        <span>
                          {type} For {purpose === "Sell" ? "Sale" : purpose}
                        </span>
                      </h1>

                      {/* Action Button */}
                      <div className="flex items-center justify-between gap-[1rem] *:text-[1.6rem] *:leading-[1.6rem] *:font-semibold *:flex *:items-center *:justify-center *:gap-[0.5rem] *:px-[1rem] *:py-[0.8rem] *:rounded-md *:border-[2px] *:transition-all">
                        <button
                          onClick={() => setIsOpenContactModal(true)}
                          className=" text-white bg-theme-blue border-theme-blue hover:text-theme-yellow "
                        >
                          <VscCallIncoming size="2rem" />
                          <span>CONTACT ME</span>
                        </button>

                        <button
                          onClick={() => setIsOpenInquireModal(true)}
                          className="text-neutral-800 bg-white border-neutral-800 hover:text-white hover:bg-neutral-800"
                        >
                          <TbMessage2 size="2rem" />
                          <span>INQUIRE</span>
                        </button>
                      </div>
                    </section>

                    {/* Property Info */}
                    <div
                      className={`w-full flex flex-col gap-[2rem] laptopRg:flex-row laptopRg:gap-[3rem] ${
                        isFixed ? "mt-[11rem] tabletLg:mt-[5.5rem]" : "mt-0"
                      }`}
                    >
                      {/* Content Side */}
                      <section className="w-full tabletLg:w-[90%] laptopRg:w-[calc(100%-33%)] flex flex-col gap-[3rem]">
                        {/* Primary Details */}
                        <div className="w-full flex flex-col gap-[1rem]">
                          {/* City */}
                          <p className="flex items-center gap-[0.8rem] text-[2.2rem] text-neutral-800 mt-[0.5rem]">
                            <HiOutlineLocationMarker />
                            <span className="leading-[2rem] font-semibold">
                              {city}
                            </span>
                          </p>

                          {/* Price */}
                          <p className="space-x-[0.6rem] text-theme-blue select-none mt-[0.5rem]">
                            <span className="text-[2.2rem] leading-[2.2rem] font-semibold">
                              PKR{" "}
                            </span>{" "}
                            <span className="text-[2.8rem] leading-[2.8rem] font-bold">
                              {price?.label}
                            </span>
                          </p>

                          {/* Details */}
                          <div className="w-full flex items-center gap-[2.2rem] text-[2.2rem] leading-[2.2rem] font-semibold select-none text-neutral-800 mt-[0.5rem]">
                            {/* Bedroom */}
                            {bedroom && (
                              <abbr title="Bedroom" className="no-underline ">
                                <p className="bed flex items-center gap-[0.8rem]">
                                  <LiaBedSolid
                                    size="2.4rem"
                                    className="mb-[0.2rem]"
                                  />{" "}
                                  <span>{bedroom}</span>
                                </p>
                              </abbr>
                            )}

                            {/* Bathroom */}
                            {bathroom && (
                              <abbr title="Bathroom" className="no-underline">
                                <p className="bath flex items-center gap-[0.8rem]">
                                  <LuBath
                                    size="2.2rem"
                                    className="mb-[0.1rem]"
                                  />{" "}
                                  <span>{bathroom}</span>
                                </p>
                              </abbr>
                            )}

                            {/* Size */}
                            <abbr title="Size" className="no-underline">
                              <p className="area flex items-center gap-[0.8rem]">
                                <BiArea size="2.4rem" /> <span>{size}</span>
                              </p>
                            </abbr>
                          </div>

                          {/* Added Timing */}
                          <p className="flex items-center gap-[0.8rem] text-[1.8rem] leading-[2.2rem] font-semibold select-none text-neutral-700 mt-[1rem]">
                            <HiOutlineClock size="2.2rem" />
                            <span>Added in 2 minutes ago</span>
                          </p>
                        </div>

                        {/* Secondary Details */}
                        <div className="w-full flex flex-col gap-[1rem]">
                          {/* Condition */}
                          <div className="border-t-[0.2rem] border-neutral-200 py-[2rem]">
                            <h6 className="text-[2rem] font-bold select-none text-theme-blue">
                              Condition
                            </h6>
                            <p className="flex items-center gap-[0.8rem] text-[1.8rem] font-semibold text-neutral-700">
                              <span>{condition}</span>
                            </p>
                          </div>

                          {/* Description */}
                          <div className="border-t-[0.2rem] border-neutral-200 py-[2rem]">
                            <h6 className="text-[2rem] font-bold select-none text-theme-blue">
                              Description
                            </h6>
                            <p className="flex items-center gap-[0.8rem] text-[1.8rem] font-semibold text-neutral-700">
                              <span>{description}</span>
                            </p>
                          </div>

                          {/* Features */}
                          <div className="border-t-[0.2rem] border-neutral-200 py-[2rem]">
                            <h6 className="text-[2rem] font-bold select-none text-theme-blue">
                              Features
                            </h6>

                            {features && (
                              <div className="flex flex-wrap gap-[1rem] mt-[1.5rem]">
                                {features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 p-[1rem] flex items-center gap-[1rem] bg-neutral-200 rounded-md whitespace-nowrap"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Near By Places */}
                          <div className="border-t-[0.2rem] border-neutral-200 py-[2rem]">
                            <h6 className="text-[2rem] font-bold select-none text-theme-blue">
                              Near by Facility
                            </h6>

                            {nearBy && (
                              <ul className="flex flex-wrap gap-[2.5rem] mt-[1.5rem]">
                                {nearBy.map((place, index) => (
                                  <li
                                    key={index}
                                    className="text-[1.8rem] leading-[2rem] font-semibold text-neutral-800 flex items-end gap-[1rem] rounded-lg whitespace-nowrap "
                                  >
                                    <img
                                      src={`https://res.cloudinary.com/dnwt1ltlm/image/upload/v1724891736/NAB_Estate/Places/${place}.png`}
                                      alt="Place"
                                      className="size-[2.5rem]"
                                    />
                                    <span>{place}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </section>

                      {/* Map Side */}
                      <section
                        ref={mapRef}
                        className="w-full laptopRg:w-[33%] h-[40rem] pt-[1rem] flex flex-col gap-[2rem]"
                      >
                        <div className="mapCont w-full h-full relative border-[0.2rem] border-neutral-300 rounded-xl shadow-xl shadow-neutral-200 overflow-hidden">
                          <button
                            onClick={handleFullScreen}
                            className="text-[2.2rem] p-[0.3rem] bg-white text-neutral-700 absolute z-[1] top-[1rem] right-[1rem]"
                          >
                            <BiFullscreen />
                          </button>

                          <Map
                            defaultCenter={[coordinates.lat, coordinates.lng]}
                            defaultZoom={12}
                            minZoom={4}
                          >
                            {/* Marker */}
                            <Marker
                              width={35}
                              color="#082835"
                              anchor={[coordinates.lat, coordinates.lng]}
                            />

                            {/* Zoom Control */}
                            <ZoomControl />
                          </Map>
                        </div>
                      </section>
                    </div>
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
                  <p className="w-full tabletRg:w-[80%] laptopSm:w-[55%] text-[1.6rem] tabletRg:text-[1.8rem] font-semibold mt-[0.4rem] mb-[10rem] tabletSm:mb-[8rem]">
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

      {isOpenContactModal && (
        <ContactModal isModalOpen={setIsOpenContactModal} />
      )}

      {isOpenInquireModal && (
        <InquireModal
          isModalOpen={setIsOpenInquireModal}
          propertyDetails={propertyDetails}
        />
      )}
    </>
  );
};

export default Property;
