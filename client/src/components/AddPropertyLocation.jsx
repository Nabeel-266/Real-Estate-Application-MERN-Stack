import { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import axios from "axios";

const AddPropertyLocationModal = ({
  setIsLocationModalOpen,
  city,
  propertyFormDataChangeHandler,
}) => {
  const [marker, setMarker] = useState([]);
  const [cityBoundary, setCityBoundary] = useState({});
  const [propertyCoordinates, setPropertyCoordinates] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(marker);
  console.log(cityBoundary);
  console.log(propertyCoordinates);

  useEffect(() => {
    const getCityLocationCoordinates = async (city) => {
      try {
        if (city) {
          const apiKey = "df4960c5c9f24a8ba5dd3e3c5316539c";
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city},Pakistan&key=${apiKey}`
          );

          const location = response.data.results[0].geometry;
          const bounds = response.data.results[0].bounds;
          setMarker([location.lat, location.lng]);
          setCityBoundary(bounds);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getCityLocationCoordinates(city);
  }, [city]);

  const handleMapClick = ({ latLng }) => {
    setMarker(latLng);
    setPropertyCoordinates({ lat: latLng[0], lng: latLng[1] });
  };

  const setPropertyCoordinatesHandler = () => {
    const { lat, lng } = propertyCoordinates;
    const { northeast, southwest } = cityBoundary;

    const isValidCoordinates =
      lat <= northeast.lat &&
      lat >= southwest.lat &&
      lng <= northeast.lng &&
      lng >= southwest.lng;

    if (isValidCoordinates) {
      propertyFormDataChangeHandler(
        "added",
        "coordinates",
        propertyCoordinates
      );
      setIsLocationModalOpen(false);
    } else {
      setError(
        `Error! Your selected property location are outside the ${city}, please select your correct property location.`
      );
    }
  };

  return (
    <div className="editProfileModalCont w-full h-dvh flex items-center justify-center fixed z-[990] top-0 left-0">
      {/* Add Property Location Modal Overlay */}
      <div
        className={`w-full h-full absolute z-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden`}
      ></div>

      <div className="w-[90%] tabletRg:w-[70%] laptopSm:w-[60%] min-h-[30rem] relative z-20 bg-white rounded-md px-[1rem] py-[1rem] shadow-2xl">
        {/* Add Property Location Modal Header */}
        <header className="w-full px-[1rem] py-[1rem] border-b-[0.2rem] border-neutral-300 text-theme-blue">
          <h2 className="text-[2.4rem] leading-[2.4rem] font-bold">
            Set Exact Property Location
          </h2>
        </header>

        {/* Map Container */}
        <div className="mapContainer w-full h-[40rem] px-[1rem] pt-[1.5rem] pb-[1rem] flex items-center justify-center">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="map w-full h-full border-[0.2rem] border-neutral-300 rounded-md">
              <Map
                defaultCenter={marker}
                defaultZoom={11}
                onClick={handleMapClick}
              >
                <Marker width={40} anchor={marker} color="#082835" />
                <ZoomControl />
              </Map>
            </div>
          )}
        </div>

        {/* Location Error */}
        {error && (
          <div className="errorCont px-[1rem] mb-[1rem]">
            <p className="text-[1.7rem] font-semibold text-red-800 text-center">
              {error}
            </p>
          </div>
        )}

        {/* Modal Button */}
        <div className="w-full flex justify-end gap-[1rem] px-[1rem] py-[1rem]">
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[1rem] py-[1rem] bg-neutral-800 rounded-md flex items-center gap-[0.5rem]"
          >
            Close
          </button>

          <button
            onClick={setPropertyCoordinatesHandler}
            disabled={propertyCoordinates ? false : true}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[1rem] py-[1rem] bg-theme-blue rounded-md flex items-center gap-[0.5rem] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyLocationModal;
