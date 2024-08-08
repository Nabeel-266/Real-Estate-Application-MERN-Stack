// Property Purposes Icons
import RentIcon from "/src/assets/Property-Icons/rent.png";
import SellIcon from "/src/assets/Property-Icons/sell.png";
// Property Residential Types Icons
import HouseIcon from "/src/assets/Property-Icons/house.png";
import ApartmentIcon from "/src/assets/Property-Icons/apartment.png";
import PortionIcon from "/src/assets/Property-Icons/house-portion.png";
import RoomIcon from "/src/assets/Property-Icons/room.png";
import FarmHouseIcon from "/src/assets/Property-Icons/farm-house.png";
import GusetHouseIcon from "/src/assets/Property-Icons/guest-house.png";
import HostelIcon from "/src/assets/Property-Icons/hostel.png";
import HotelIcon from "/src/assets/Property-Icons/hotel.png";
import BasementIcon from "/src/assets/Property-Icons/basement.png";
// Property Plot Types Icons
import ResidentialPlotIcon from "/src/assets/Property-Icons/residential-plot.png";
import CommercialPlotIcon from "/src/assets/Property-Icons/commercial-plot.png";
import AgriculturalLandIcon from "/src/assets/Property-Icons/agricultural-land.png";
import IndustrialLandIcon from "/src/assets/Property-Icons/industrial-land.png";
import FarmhousePlotIcon from "/src/assets/Property-Icons/farmhouse-plot.png";
// Property Commercial Types Icons
import OfficeIcon from "/src/assets/Property-Icons/office.png";
import ShopIcon from "/src/assets/Property-Icons/shop.png";
import WarehouseIcon from "/src/assets/Property-Icons/warehouse.png";
import HallIcon from "/src/assets/Property-Icons/hall.png";
import PlazaIcon from "/src/assets/Property-Icons/plaza.png";
import GymIcon from "/src/assets/Property-Icons/gym.png";
import TheatreIcon from "/src/assets/Property-Icons/theatre.png";
import RestaurantIcon from "/src/assets/Property-Icons/restaurant.png";
import FactoryIcon from "/src/assets/Property-Icons/factory.png";

export const propertyPurposes = [
  { value: "Sell", iconImage: SellIcon },
  { value: "Rent", iconImage: RentIcon },
];

export const propertyCategories = ["Residential", "Plot", "Commercial"];

export const propertyResidentialTypes = [
  { value: "House", iconImage: HouseIcon },
  { value: "Apartment", iconImage: ApartmentIcon },
  { value: "House Portion", iconImage: PortionIcon },
  { value: "Room", iconImage: RoomIcon },
  { value: "Farm House", iconImage: FarmHouseIcon },
  { value: "Guest House", iconImage: GusetHouseIcon },
  { value: "Hostel", iconImage: HostelIcon },
  { value: "Hotel", iconImage: HotelIcon },
  { value: "Basement", iconImage: BasementIcon },
];

export const propertyPlotTypes = [
  { value: "Residential Plot", iconImage: ResidentialPlotIcon },
  { value: "Commercial Plot", iconImage: CommercialPlotIcon },
  { value: "Agricultural Land", iconImage: AgriculturalLandIcon },
  { value: "Industrial Land", iconImage: IndustrialLandIcon },
  { value: "Farmhouse Plot ", iconImage: FarmhousePlotIcon },
];

export const propertyCommercialTypes = [
  { value: "Office", iconImage: OfficeIcon },
  { value: "Shop", iconImage: ShopIcon },
  { value: "Warehouse", iconImage: WarehouseIcon },
  { value: "Hall", iconImage: HallIcon },
  { value: "Plaza", iconImage: PlazaIcon },
  { value: "Gym", iconImage: GymIcon },
  { value: "Theatre", iconImage: TheatreIcon },
  { value: "Restaurant", iconImage: RestaurantIcon },
  { value: "Factory", iconImage: FactoryIcon },
];

export const count = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"];

export const propertyCondition = [
  "Brand New",
  "Excellent - in a good shape and well maintained",
  "Good - in a good shape need cosmetic updates",
  "Need Minor Work - needs a few minor renovations",
  "Need Major Work - needs major renovations inside and out",
];

export const propertyFeaturesCategory = [
  "Accountable Features",
  "Highlighted Features",
  "Landmarks Nearby",
  "Utilities",
];

export const accountableFeatures = [
  "TV Lounge",
  "Store Room",
  "Laundry Room",
  "Study Room",
  "Dining Room",
  "Drawing Room",
  "Servant Quater",
  "Balcony",
  "Kitchen",
];

export const highlightedFeatures = [
  "Corner Plot",
  "Basement",
  "Furnished",
  "Semi furnished",
  "Dirty kitchen",
  "Swimming pool",
  "Lawn",
  "Elevator/Lift",
  "Separate Entry",
  "Terrace",
  "Home theatre",
  "Backup generator",
  "Main boulevard",
  "Park face",
  "Parking",
  "Underground Parking",
  "Boundary wall",
  "Facing",
];

export const directions = [
  "North",
  "North East",
  "East",
  "South East",
  "South",
  "South West",
  "West",
  "North West",
];

export const landmarksNearby = [
  "Schools",
  "Hospitals",
  "Masjid",
  "Restaurants",
  "Parks",
  "Markets",
];

export const utilities = [
  "Seperate Electric Meter",
  "Seperate Gas Meter",
  "Water Supply",
  "Security",
];

export const availabiltyDays = [
  "Anyday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const cities = [
  "Islamabad",
  "Attock",
  "Bahawalpur",
  "Chiniot",
  "Dera Ghazi Khan",
  "Faisalabad",
  "Gujar Khan",
  "Gujranwala",
  "Gujrat",
  "Jhang",
  "Jhelum",
  "Kasur",
  "Khanewal",
  "Kharian",
  "Lahore",
  "Mandi Bahauddin",
  "Multan",
  "Nawabshah",
  "Nowshera",
  "Peshawar",
  "Quetta",
  "Rahim Yar Khan",
  "Rawalpindi",
  "Sahiwal",
  "Sargodha",
  "Sialkot",
  "Sukkur",
  "Tando Allahyar",
  "Mianwali",
  "Murree",
  "Okara",
  "Sheikhupura",
  "Hyderabad",
  "Jacobabad",
  "Karachi",
  "Khairpur",
  "Kotri",
  "Larkana",
  "Badin",
  "Abbottabad",
  "Bannu",
  "Battagram",
  "Chitral",
  "Charsadda",
  "D.I.Khan",
  "Haripur",
  "Kohat",
  "Mansehra",
  "Mardan",
  "Swat",
  "Swabi",
  "Chaman",
  "Gwadar",
  "Khuzdar",
  "Ziarat",
  "Mirpur",
  "Muzaffarabad",
  "Rawalakot",
  "Gilgit",
  "Skardu",
];

// export const cities = [
//   "Islamabad",
//   "Attock",
//   "Bahawalpur",
//   "Burewala",
//   "Chakwa",
//   "Chiniot",
//   "Dera Ghazi Khan",
//   "Faisalabad",
//   "Gujar Khan",
//   "Gujranwala",
//   "Gujrat",
//   "Jhang",
//   "Jhelum",
//   "Kasur",
//   "Khanewal",
//   "Kharian",
//   "Lahore",
//   "Mandi Bahauddin",
//   "Multan",
//   "Nawabshah",
//   "Nowshera",
//   "Peshawar",
//   "Quetta",
//   "Rahim Yar Khan",
//   "Rawalpindi",
//   "Sahiwal",
//   "Sargodha",
//   "Shahdad Town",
//   "Sialkot",
//   "Sukkur",
//   "Tando Allahyar",
//   "Tharparkar",
//   "Mianwali",
//   "Murree",
//   "Okara",
//   "Sadiqabad",
//   "Sheikhupura",
//   "Taxila",
//   "Toba Tek Singh",
//   "Badin",
//   "Hyderabad",
//   "Jacobabad",
//   "Karachi",
//   "Khairpur",
//   "Kotri",
//   "Larkana",
//   "Thatta",
//   "Abbottabad",
//   "Bannu",
//   "Battagram",
//   "Chitral",
//   "Charsadda",
//   "D.I.Khan",
//   "Haripur",
//   "Kohat",
//   "Mansehra",
//   "Mardan",
//   "Swat",
//   "Swabi",
//   "Timergara",
//   "Chaman",
//   "Gwadar",
//   "Khuzdar",
//   "Ziarat",
//   "Bagh",
//   "Bhimber",
//   "Kotli",
//   "Mirpur",
//   "Muzaffarabad",
//   "Rawalakot",
//   "Gilgit",
//   "Skardu",
// ];
