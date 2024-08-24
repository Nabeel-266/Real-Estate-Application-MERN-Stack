import { useEffect, useState } from "react";
import { getSingleProperty } from "../api/propertyAPI's";
import { useLocation } from "react-router-dom";

const Property = () => {
  const routeLocation = useLocation();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error("Error fetching property:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="propertyCont w-full min-h-dvh pt-[6rem] flex flex-col gap-[4rem]">
      <div className="mx-[4%]">
        {loading ? (
          <h1 className="text-[4rem]">Loading...</h1>
        ) : (
          <>
            {propertyDetails ? (
              <h1 className="text-[4rem]">{propertyDetails.type}</h1>
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
    </div>
  );
};

export default Property;
