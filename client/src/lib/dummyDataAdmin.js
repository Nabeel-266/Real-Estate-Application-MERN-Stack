export const periodDropdownOptions = {
  year: ["2024", "2023", "2022", "2021", "2020"],
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  monthRange: ["Jan - Jun", "Jul - Dec"],
};

// Dashboard Panel
export const DR_SummaryByPropertyTypes = [
  {
    summaryBy: "House",
    deals: {
      sales: 20,
      rental: 10,
    },
    revenue: {
      sales: 1000000,
      rental: 500000,
    },
  },

  {
    summaryBy: "Apartment",
    deals: {
      sales: 15,
      rental: 5,
    },
    revenue: {
      sales: 800000,
      rental: 400000,
    },
  },

  {
    summaryBy: "House Portion",
    deals: {
      sales: 10,
      rental: 5,
    },
    revenue: {
      sales: 500000,
      rental: 300000,
    },
  },

  {
    summaryBy: "Room",
    deals: {
      sales: 5,
      rental: 3,
    },
    revenue: {
      sales: 300000,
      rental: 200000,
    },
  },

  {
    summaryBy: "Shop",
    deals: {
      sales: 2,
      rental: 1,
    },
    revenue: {
      sales: 300000,
      rental: 50000,
    },
  },
  {
    summaryBy: "Office",
    deals: {
      sales: 3,
      rental: 2,
    },
    revenue: {
      sales: 1200000,
      rental: 100000,
    },
  },
  {
    summaryBy: "Gym",
    deals: {
      sales: 1,
      rental: 0,
    },
    revenue: {
      sales: 100000,
      rental: 0,
    },
  },
  {
    summaryBy: "Restaurant",
    deals: {
      sales: 2,
      rental: 0,
    },
    revenue: {
      sales: 80000000,
      rental: 0,
    },
  },
  {
    summaryBy: "Residential Plot",
    deals: {
      sales: 5,
      rental: 0,
    },
    revenue: {
      sales: 800000,
      rental: 0,
    },
  },
  {
    summaryBy: "Commercial Plot",
    deals: {
      sales: 3,
      rental: 0,
    },
    revenue: {
      sales: 1000000,
      rental: 0,
    },
  },
  {
    summaryBy: "Farmhouse Plot",
    deals: {
      sales: 1,
      rental: 0,
    },
    revenue: {
      sales: 500000,
      rental: 0,
    },
  },
];

export const DR_SummaryByPropertyCities = [
  {
    summaryBy: "Karachi",
    deals: {
      sales: 20,
      rental: 10,
    },
    revenue: {
      sales: 1000000,
      rental: 500000,
    },
  },

  {
    summaryBy: "Lahore",
    deals: {
      sales: 15,
      rental: 5,
    },
    revenue: {
      sales: 800000,
      rental: 400000,
    },
  },

  {
    summaryBy: "Islamabad",
    deals: {
      sales: 10,
      rental: 5,
    },
    revenue: {
      sales: 500000,
      rental: 300000,
    },
  },

  {
    summaryBy: "Dera Ghazi Khan",
    deals: {
      sales: 5,
      rental: 3,
    },
    revenue: {
      sales: 300000,
      rental: 200000,
    },
  },

  {
    summaryBy: "Multan",
    deals: {
      sales: 3,
      rental: 2,
    },
    revenue: {
      sales: 1200000,
      rental: 100000,
    },
  },
  {
    summaryBy: "Hyderabad",
    deals: {
      sales: 2,
      rental: 1,
    },
    revenue: {
      sales: 300000,
      rental: 50000,
    },
  },
  {
    summaryBy: "Peshawar",
    deals: {
      sales: 1,
      rental: 0,
    },
    revenue: {
      sales: 100000,
      rental: 0,
    },
  },
  {
    summaryBy: "Quetta",
    deals: {
      sales: 2,
      rental: 0,
    },
    revenue: {
      sales: 80000000,
      rental: 0,
    },
  },
  {
    summaryBy: "Sukkur",
    deals: {
      sales: 5,
      rental: 0,
    },
    revenue: {
      sales: 800000,
      rental: 0,
    },
  },
  {
    summaryBy: "Gujranwala",
    deals: {
      sales: 3,
      rental: 0,
    },
    revenue: {
      sales: 1000000,
      rental: 0,
    },
  },
  {
    summaryBy: "Nawabshah",
    deals: {
      sales: 1,
      rental: 0,
    },
    revenue: {
      sales: 500000,
      rental: 0,
    },
  },
];

// Agent Panel
export const agentsDataColumns = [
  "Email Address",
  "Mobile Number",
  "CNIC Number",
  "Age",
  "Operating City",
  "Joining Date",
  "Successed Deals",
  "Active Deals",
  "Total Earned",
  "Highest Earned",
  "Experience Badge",
];

export const agentsDataSortBy = [
  "Full Name",
  "Age",
  "Joining Date",
  "Successed Deals",
  "Active Deals",
  "Total Earned",
  "Highest Earned",
  "Experience",
];

export const agents = [
  {
    image: "/src/assets/Agents/agent03.png",
    name: "Aslam Jaffar",
    email: "aslamjaffar@example.com",
    mobileNumber: "03456789045",
    cnicNumber: "42101-1589967-9",
    dateOfBirth: "Dec 26, 1992",
    age: "32",
    operatingCity: "Karachi",
    joiningDate: "Apr 26, 2019",
    deals: {
      successed: {
        sales: 6,
        rental: 10,
      },
      active: {
        sales: 1,
        rental: 2,
      },
    },
    totalEarned: 325000,
    highestEarned: 80000,
    badge: "Mid-Level",
  },
  {
    image: "/src/assets/Agents/agent02.png",
    name: "Muhammad Aleem",
    email: "muhammadaleem@example.com",
    mobileNumber: "03456789125",
    cnicNumber: "42101-1234567-8",
    dateOfBirth: "Jan 15, 1985",
    age: "39",
    operatingCity: "Lahore",
    joiningDate: "Mar 10, 2017",
    deals: {
      successed: {
        sales: 8,
        rental: 12,
      },
      active: {
        sales: 1,
        rental: 0,
      },
    },
    totalEarned: 450000,
    highestEarned: 120000,
    badge: "Senior",
  },
  {
    image: "/src/assets/Agents/agent03.png",
    name: "Kamran Rashid",
    email: "kamranrashid@example.com",
    mobileNumber: "03456789224",
    cnicNumber: "42101-7654321-1",
    dateOfBirth: "Jul 22, 1990",
    age: "34",
    operatingCity: "Islamabad",
    joiningDate: "Jun 5, 2020",
    deals: {
      successed: {
        sales: 4,
        rental: 8,
      },
      active: {
        sales: 1,
        rental: 1,
      },
    },
    totalEarned: 275000,
    highestEarned: 60000,
    badge: "Junior",
  },
  {
    image: "/src/assets/Agents/agent04.png",
    name: "Zakir Khan",
    email: "zakirkhan@example.com",
    mobileNumber: "03456789378",
    cnicNumber: "42101-9876543-2",
    dateOfBirth: "Feb 28, 1994",
    age: "30",
    operatingCity: "Rawalpindi",
    joiningDate: "Aug 15, 2021",
    deals: {
      successed: {
        sales: 2,
        rental: 5,
      },
      active: {
        sales: 0,
        rental: 2,
      },
    },
    totalEarned: 200000,
    highestEarned: 50000,
    badge: "Junior",
  },
  {
    image: "/src/assets/Agents/agent02.png",
    name: "Hassan Ashraf",
    email: "hasanashraf@example.com",
    mobileNumber: "03456789432",
    cnicNumber: "42101-1478523-4",
    dateOfBirth: "Oct 12, 1988",
    age: "36",
    operatingCity: "Peshawar",
    joiningDate: "Jan 12, 2018",
    deals: {
      successed: {
        sales: 10,
        rental: 15,
      },
      active: {
        sales: 2,
        rental: 1,
      },
    },
    totalEarned: 550000,
    highestEarned: 150000,
    badge: "Expert",
  },
  {
    image: "/src/assets/Agents/agent03.png",
    name: "Aslam Jaffar",
    email: "aslamjaffar@example.com",
    mobileNumber: "03456789045",
    cnicNumber: "42101-1589967-9",
    dateOfBirth: "Dec 26, 1992",
    age: "32",
    operatingCity: "Karachi",
    joiningDate: "Apr 26, 2019",
    deals: {
      successed: {
        sales: 6,
        rental: 10,
      },
      active: {
        sales: 1,
        rental: 2,
      },
    },
    totalEarned: 325000,
    highestEarned: 80000,
    badge: "Mid-Level",
  },
  {
    image: "/src/assets/Agents/agent02.png",
    name: "Muhammad Aleem",
    email: "muhammadaleem@example.com",
    mobileNumber: "03456789125",
    cnicNumber: "42101-1234567-8",
    dateOfBirth: "Jan 15, 1985",
    age: "39",
    operatingCity: "Lahore",
    joiningDate: "Mar 10, 2017",
    deals: {
      successed: {
        sales: 8,
        rental: 12,
      },
      active: {
        sales: 1,
        rental: 0,
      },
    },
    totalEarned: 450000,
    highestEarned: 120000,
    badge: "Senior",
  },
  {
    image: "/src/assets/Agents/agent03.png",
    name: "Kamran Rashid",
    email: "kamranrashid@example.com",
    mobileNumber: "03456789224",
    cnicNumber: "42101-7654321-1",
    dateOfBirth: "Jul 22, 1990",
    age: "34",
    operatingCity: "Islamabad",
    joiningDate: "Jun 5, 2020",
    deals: {
      successed: {
        sales: 4,
        rental: 8,
      },
      active: {
        sales: 1,
        rental: 1,
      },
    },
    totalEarned: 275000,
    highestEarned: 60000,
    badge: "Junior",
  },
  {
    image: "/src/assets/Agents/agent04.png",
    name: "Zakir Khan",
    email: "zakirkhan@example.com",
    mobileNumber: "03456789378",
    cnicNumber: "42101-9876543-2",
    dateOfBirth: "Feb 28, 1994",
    age: "30",
    operatingCity: "Rawalpindi",
    joiningDate: "Aug 15, 2021",
    deals: {
      successed: {
        sales: 2,
        rental: 5,
      },
      active: {
        sales: 0,
        rental: 2,
      },
    },
    totalEarned: 200000,
    highestEarned: 50000,
    badge: "Junior",
  },
  {
    image: "/src/assets/Agents/agent02.png",
    name: "Hassan Ashraf",
    email: "hasanashraf@example.com",
    mobileNumber: "03456789432",
    cnicNumber: "42101-1478523-4",
    dateOfBirth: "Oct 12, 1988",
    age: "36",
    operatingCity: "Peshawar",
    joiningDate: "Jan 12, 2018",
    deals: {
      successed: {
        sales: 10,
        rental: 15,
      },
      active: {
        sales: 2,
        rental: 1,
      },
    },
    totalEarned: 550000,
    highestEarned: 150000,
    badge: "Expert",
  },
];
