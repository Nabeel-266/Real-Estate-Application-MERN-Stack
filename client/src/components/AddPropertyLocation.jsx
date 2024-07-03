import { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import OpenCageApiClient from "opencage-api-client";
import axios from "axios";

const AddPropertyLocationModal = ({
  setIsLocationModalOpen,
  city,
  propertyFormDataChangeHandler,
}) => {
  const [marker, setMarker] = useState([]);
  const [propertyCoordinates, setPropertyCoordinates] = useState(null);
  console.log(marker);

  useEffect(() => {
    const getCityLocationCoordinates = async (city) => {
      try {
        if (city) {
          const apiKey = "df4960c5c9f24a8ba5dd3e3c5316539c";
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city},Pakistan&key=${apiKey}`
          );

          const location = response.data.results[0].geometry;
          setMarker([location.lat, location.lng]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCityLocationCoordinates(city);
  }, [city]);

  const handleMapClick = ({ latLng }) => {
    setMarker(latLng);
    setPropertyCoordinates({ lat: latLng[0], lng: latLng[1] });
  };

  const setPropertyCoordinatesHandler = () => {
    propertyFormDataChangeHandler("coordinates", propertyCoordinates);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="editProfileModalCont w-full min-h-dvh flex items-center justify-center fixed z-[990] top-0 left-0">
      {/* Add Property Location Modal Overlay */}
      <div
        className={`w-full h-full absolute z-0 backdrop-blur-[5px] bg-[#40404090] overflow-hidden`}
      ></div>

      <div className="w-[80rem] min-h-[30rem] relative z-20 bg-white rounded-md px-[1rem] py-[1rem] shadow-2xl">
        {/* Add Property Location Modal Header */}
        <header className="w-full px-[1rem] py-[1rem] border-b-[0.2rem] border-neutral-300 text-theme-blue">
          <h2 className="text-[2.4rem] leading-[2.4rem] font-bold">
            Set Exact Property Location
          </h2>
        </header>

        {/* Map Container */}
        <div className="mapContainer w-full h-[40rem] p-[1rem]">
          <div className="map w-full h-full border-[0.2rem] border-neutral-300 rounded-md">
            <Map
              defaultCenter={[30.007535621781102, 69.4288508620124]}
              defaultZoom={6}
              onClick={handleMapClick}
            >
              <Marker width={40} anchor={marker} color="#082835" />
              <ZoomControl />
            </Map>
          </div>
        </div>

        {/* Modal Button */}
        <div className="w-full flex justify-end gap-[1rem] px-[1rem] py-[1.5rem]">
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
