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
  "Countable Features",
  "Highlighted Features",
  "Landmarks Nearby",
  "Utilities",
];

export const countableFeatures = [
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

export const priceRanges = [
  {
    value: "Any",
    label: "Any",
  },
  {
    value: "1000 - 50000",
    label: "Under Rs. 50 Thousand",
  },
  {
    value: "50000 - 100000",
    label: "Rs. 50 Thousand - Rs. 1 Lac",
  },
  {
    value: "100000 - 2500000",
    label: "Rs. 1 Lac - Rs. 25 Lac",
  },
  {
    value: "2500000 - 10000000",
    label: "Rs. 25 Lac - Rs. 1 Crore",
  },
  {
    value: "10000000 - 100000000",
    label: "Rs. 1 Crore - Rs. 10 Crore",
  },
  {
    value: "100000000 - 500000000",
    label: "Rs. 10 Crore - Rs. 50 Crore",
  },
  {
    value: "500000000 - 1000000000",
    label: "Rs. 50 Crore - Rs. 1 Arab",
  },
  {
    value: "1000000000 - 50000000000",
    label: "Rs. 1 Arab - Rs. 50 Arab",
  },
  {
    value: "50000000000 - 100000000000",
    label: "Rs. 50 Arab - Rs. 1 Kharab",
  },
  {
    value: "100000000000 - 10000000000000",
    label: "Above Rs. 1 Kharab",
  },
];

export const bedrooms = [
  "1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
  "4 bedrooms",
  "5 bedrooms",
  "6 bedrooms",
  "7 bedrooms",
  "8 bedrooms",
  "9 bedrooms",
  "10 bedrooms",
  "10+ bedrooms",
];

// export const cities = [
//   "Islamabad",
//   "Attock",
//   "Bahawalpur",
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
//   "Sialkot",
//   "Sukkur",
//   "Tando Allahyar",
//   "Mianwali",
//   "Murree",
//   "Okara",
//   "Sheikhupura",
//   "Hyderabad",
//   "Jacobabad",
//   "Karachi",
//   "Khairpur",
//   "Kotri",
//   "Larkana",
//   "Badin",
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
//   "Chaman",
//   "Gwadar",
//   "Khuzdar",
//   "Ziarat",
//   "Mirpur",
//   "Muzaffarabad",
//   "Rawalakot",
//   "Gilgit",
//   "Skardu",
// ];

export const cities = [
  { name: "Islamabad", coordinates: [33.6844, 73.0479] },
  { name: "Attock", coordinates: [33.7667, 72.3598] },
  { name: "Bahawalpur", coordinates: [29.3956, 71.6833] },
  { name: "Chiniot", coordinates: [31.72, 72.9784] },
  { name: "Dera Ghazi Khan", coordinates: [30.0561, 70.6348] },
  { name: "Faisalabad", coordinates: [31.4504, 73.135] },
  { name: "Gujar Khan", coordinates: [33.2558, 73.3022] },
  { name: "Gujranwala", coordinates: [32.1877, 74.1945] },
  { name: "Gujrat", coordinates: [32.5742, 74.0807] },
  { name: "Jhang", coordinates: [31.269, 72.3169] },
  { name: "Jhelum", coordinates: [32.9402, 73.7276] },
  { name: "Kasur", coordinates: [31.1167, 74.45] },
  { name: "Khanewal", coordinates: [30.3017, 71.9321] },
  { name: "Kharian", coordinates: [32.8108, 73.8654] },
  { name: "Lahore", coordinates: [31.5497, 74.3436] },
  { name: "Mandi Bahauddin", coordinates: [32.5833, 73.5] },
  { name: "Multan", coordinates: [30.1575, 71.5249] },
  { name: "Nawabshah", coordinates: [26.2483, 68.4096] },
  { name: "Nowshera", coordinates: [34.0151, 71.9747] },
  { name: "Peshawar", coordinates: [34.015, 71.5805] },
  { name: "Quetta", coordinates: [30.1798, 66.975] },
  { name: "Rahim Yar Khan", coordinates: [28.4202, 70.2952] },
  { name: "Rawalpindi", coordinates: [33.5651, 73.0169] },
  { name: "Sahiwal", coordinates: [30.67, 73.1068] },
  { name: "Sargodha", coordinates: [32.0836, 72.6711] },
  { name: "Sialkot", coordinates: [32.4927, 74.5319] },
  { name: "Sukkur", coordinates: [27.7057, 68.8574] },
  { name: "Tando Allahyar", coordinates: [25.4658, 68.7174] },
  { name: "Mianwali", coordinates: [32.5834, 71.5264] },
  { name: "Murree", coordinates: [33.908, 73.3943] },
  { name: "Okara", coordinates: [30.8081, 73.4458] },
  { name: "Sheikhupura", coordinates: [31.7131, 73.9783] },
  { name: "Hyderabad", coordinates: [25.396, 68.3773] },
  { name: "Jacobabad", coordinates: [28.281, 68.4376] },
  { name: "Karachi", coordinates: [24.8607, 67.0011] },
  { name: "Khairpur", coordinates: [27.5295, 68.7592] },
  { name: "Kotri", coordinates: [25.3664, 68.3112] },
  { name: "Larkana", coordinates: [27.5572, 68.212] },
  { name: "Badin", coordinates: [24.656, 68.837] },
  { name: "Abbottabad", coordinates: [34.1688, 73.2215] },
  { name: "Bannu", coordinates: [32.9854, 70.6027] },
  { name: "Battagram", coordinates: [34.6778, 73.0252] },
  { name: "Chitral", coordinates: [35.8517, 71.7864] },
  { name: "Charsadda", coordinates: [34.1473, 71.7406] },
  { name: "D.I.Khan", coordinates: [31.8329, 70.9024] },
  { name: "Haripur", coordinates: [33.9946, 72.9346] },
  { name: "Kohat", coordinates: [33.5651, 71.4413] },
  { name: "Mansehra", coordinates: [34.3365, 73.1964] },
  { name: "Mardan", coordinates: [34.1979, 72.0451] },
  { name: "Swat", coordinates: [35.2226, 72.4258] },
  { name: "Swabi", coordinates: [34.1202, 72.4698] },
  { name: "Chaman", coordinates: [30.9253, 66.4512] },
  { name: "Gwadar", coordinates: [25.1266, 62.329] },
  { name: "Khuzdar", coordinates: [27.7384, 66.6434] },
  { name: "Ziarat", coordinates: [30.3816, 67.7258] },
  { name: "Mirpur", coordinates: [33.1478, 73.7518] },
  { name: "Muzaffarabad", coordinates: [34.3706, 73.4715] },
  { name: "Rawalakot", coordinates: [33.8578, 73.7604] },
  { name: "Gilgit", coordinates: [35.8818, 74.4641] },
  { name: "Skardu", coordinates: [35.2973, 75.6333] },
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
