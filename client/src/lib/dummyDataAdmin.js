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

export const agents = [
  {
    name: "Aslam Jaffar",
    email: "slamjaffar@example.com",
    mobileNumber: "03456789045",
    cnic: "42101-1589967-9",
    dateOfBirth: "Dec 26, 1992",
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
    comissionEarned: 325000,
    badge: "Mid-Level",
  },
  {
    name: "Muhammad Aleem",
    email: "muhammadaleem@example.com",
    mobileNumber: "03456789125",
    cnic: "42101-1234567-8",
    dateOfBirth: "Jan 15, 1985",
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
    comissionEarned: 450000,
    badge: "Senior",
  },
  {
    name: "Kamran Rashid",
    email: "kamranrashid@example.com",
    mobileNumber: "03456789224",
    cnic: "42101-7654321-1",
    dateOfBirth: "Jul 22, 1990",
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
    comissionEarned: 275000,
    badge: "Junior",
  },
  {
    name: "Zakir Khan",
    email: "zakirkhan@example.com",
    mobileNumber: "03456789378",
    cnic: "42101-9876543-2",
    dateOfBirth: "Feb 28, 1994",
    operatingCity: "Rawalpindi",
    joiningDate: "Aug 15, 2021",
    deals: {
      successed: {
        sales: 3,
        rental: 6,
      },
      active: {
        sales: 0,
        rental: 2,
      },
    },
    comissionEarned: 200000,
    badge: "Junior",
  },
  {
    name: "Hassan Ashraf",
    email: "hasanashraf@example.com",
    mobileNumber: "03456789432",
    cnic: "42101-1478523-4",
    dateOfBirth: "Oct 12, 1988",
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
    comissionEarned: 550000,
    badge: "Expert",
  },
];
