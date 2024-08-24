import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { cities } from "../../lib/dummyData";

// Import React Icon
import { BiArea, BiFullscreen } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const LocationMap = ({ propertyData, city, mapRef }) => {
  const navigate = useNavigate();
  const [markerPopupData, setMarkerPopupData] = useState(null);

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

  const getCityCoordinates = (city) => {
    const cityCoordinates = cities.find((c) => c.name === city)?.coordinates;
    return cityCoordinates;
  };

  const handleMarkerClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="mapCont w-full h-full relative border-[0.2rem] border-neutral-200 rounded-xl shadow-xl shadow-neutral-200 overflow-hidden">
      <button
        onClick={handleFullScreen}
        className="text-[2.2rem] p-[0.3rem] bg-white text-neutral-700 absolute z-[1] top-[1rem] right-[1rem]"
      >
        <BiFullscreen />
      </button>

      <Map
        defaultCenter={city ? getCityCoordinates(city) : [30.3753, 69.3451]}
        defaultZoom={city ? 10 : 5}
        minZoom={4}
      >
        {/* Marker */}
        {propertyData?.map((property, index) => (
          <Marker
            key={index}
            width={32}
            color="#082835"
            anchor={[property.coordinates.lat, property.coordinates.lng]}
            payload={property}
            onMouseOver={({ payload }) => setMarkerPopupData(payload)}
            onMouseOut={() => setMarkerPopupData(null)}
            onClick={({ payload }) => handleMarkerClick(payload._id)}
          />
        ))}

        {/* Popup Overlay */}
        {markerPopupData && (
          <Overlay
            anchor={[
              markerPopupData?.coordinates.lat,
              markerPopupData?.coordinates.lng,
            ]}
            offset={[0, 150]}
          >
            <div
              className={`shadow-xl shadow-[#22222240] bg-[#ffffff90] backdrop-blur-[1rem] p-[1.2rem] rounded-t-2xl rounded-br-2xl text-neutral-700 text-[1.4rem] leading-[1.4rem] font-semibold space-y-[1rem]`}
            >
              {/* type & purpose */}
              <p className="flex items-center gap-[6rem]">
                <span>{markerPopupData?.type}</span>
                <span>
                  For{" "}
                  {markerPopupData?.purpose == "Sell"
                    ? "Sale"
                    : markerPopupData?.purpose}
                </span>
              </p>

              {/* Price */}
              <p className="space-x-[0.6rem] text-theme-blue">
                <span>PKR</span>
                <span className="text-[1.55rem] leading-[1.55rem] font-bold">
                  {markerPopupData?.price?.label}
                </span>
              </p>

              {/* Size */}
              <p className="size flex items-center gap-[0.4rem] text-[1.4rem]">
                <BiArea size="1.4rem" /> <span>{markerPopupData?.size}</span>
              </p>

              {/* City */}
              <p className="flex items-center gap-[0.4rem]">
                <HiOutlineLocationMarker />
                <span>{markerPopupData?.city}</span>
              </p>
            </div>
          </Overlay>
        )}

        {/* Zoom Control */}
        <ZoomControl />
      </Map>
    </div>
  );
};

export default LocationMap;
