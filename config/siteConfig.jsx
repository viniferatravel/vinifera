

export const siteConfig = {
  name: "Vinifera",
  description: "Make beautiful websites regardless of your design experience.",
  favicon: "/Vinifera.jpg",
  ownername: "Kamini Singh",
  phoneNumber: "7021719016",
  companyname: "Vinifera",
  link: "https://www.Vinifera.com/",
  email: "reservation@Vinifera.com",
  address:
    "Office no 1204, The Affaires Palm Paradise, Plam Beach Rd, Sector 17, Sanpada, Navi Mumbai, Maharashtra 400 705",
  AboutUs: "About Us",
  OurServices: "Our Services",
  Pricing: "Pricing",
  SuccessStories: "Success Stories",
  VacationRental: "Vacation Rental",
  ContactUs: "Contact Us",
  Careers: "Careers",
  Blog: "Blog",

  keywords: ["Prospera", "Prospera Hospitality"],

  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
  ],

  adminNavItems: [
    {
      label: "Blog",
      href: "/admin/blog",
    },
    {
      label: "Careers",
      href: "/admin/careers",
    },
  ],

  links: {
    facebook:
      "https://www.facebook.com/profile.php?id=61562089264990&mibextid=ZbWKwL",
    instagram: "https://www.instagram.com/Vinifera/",
    twitter: "https://twitter.com/",
    linkdin: "https://www.linkedin.com/company/prosperaa-hospitality",
    github: "https://github.com/prosperahospitality",
  },
};

export const links = [
  {
    name: "Trips",
    submenu: true,
    sublinks: [
      {
        Head: "south",
        sublink: [
          {
            name: "Karnataka",
            link: "/karnataka",
            packages: [
              {
                name: "Bangalore City Tour",
                link: "/karnataka/bangalore-tour",
              },
              {
                name: "Coorg Coffee Experience",
                link: "/karnataka/coorg-tour",
              },
            ],
          },
          {
            name: "Kerala",
            link: "/kerala",
            packages: [
              { name: "Backwaters Cruise", link: "/kerala/backwaters-cruise" },
              { name: "Munnar Tea Plantation", link: "/kerala/munnar-tour" },
            ],
          },
        ],
      },
      {
        Head: "North",
        sublink: [
          {
            name: "Delhi",
            link: "/delhi",
            packages: [
              { name: "Historical Monuments", link: "/delhi/monuments-tour" },
              { name: "Food Tour", link: "/delhi/food-tour" },
            ],
          },
          {
            name: "Rajasthan",
            link: "/rajasthan",
            packages: [
              { name: "Jaipur City Tour", link: "/rajasthan/jaipur-tour" },
              { name: "Desert Safari", link: "/rajasthan/desert-safari" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Packages",
    submenu: true,
    sublinks: [
      {
        Head: "maharashtra",
        sublink: [
          {
            name: "Karnataka",
            link: "/karnataka",
            packages: [
              {
                name: "Bangalore City Tour",
                link: "/karnataka/bangalore-tour",
              },
              {
                name: "Coorg Coffee Experience",
                link: "/karnataka/coorg-tour",
              },
            ],
          },
          {
            name: "Kerala",
            link: "/kerala",
            packages: [
              { name: "Backwaters Cruise", link: "/kerala/backwaters-cruise" },
              { name: "Munnar Tea Plantation", link: "/kerala/munnar-tour" },
            ],
          },
        ],
      },
      {
        Head: "goa",
        sublink: [
          {
            name: "Delhi",
            link: "/delhi",
            packages: [
              { name: "Historical Monuments", link: "/delhi/monuments-tour" },
              { name: "Food Tour", link: "/delhi/food-tour" },
            ],
          },
          {
            name: "Rajasthan",
            link: "/rajasthan",
            packages: [
              { name: "Jaipur City Tour", link: "/rajasthan/jaipur-tour" },
              { name: "Desert Safari", link: "/rajasthan/desert-safari" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Special",
    submenu: true,
    sublinks: [
      {
        Head: "South",
        sublink: [
          {
            name: "Karnataka",
            link: "/karnataka",
            packages: [
              {
                name: "Bangalore City Tour",
                link: "/karnataka/bangalore-tour",
              },
              {
                name: "Coorg Coffee Experience",
                link: "/karnataka/coorg-tour",
              },
            ],
          },
          {
            name: "Kerala",
            link: "/kerala",
            packages: [
              { name: "Backwaters Cruise", link: "/kerala/backwaters-cruise" },
              { name: "Munnar Tea Plantation", link: "/kerala/munnar-tour" },
            ],
          },
        ],
      },
      {
        Head: "North",
        sublink: [
          {
            name: "Delhi",
            link: "/delhi",
            packages: [
              { name: "Historical Monuments", link: "/delhi/monuments-tour" },
              { name: "Food Tour", link: "/delhi/food-tour" },
            ],
          },
          {
            name: "Rajasthan",
            link: "/rajasthan",
            packages: [
              { name: "Jaipur City Tour", link: "/rajasthan/jaipur-tour" },
              { name: "Desert Safari", link: "/rajasthan/desert-safari" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Corporate",
    submenu: false, // No submenu for Home
    link: "/",
  },
  {
    name: "Passport",
    submenu: false, // No submenu for Home
    link: "/packages",
  },
];

// footerData.js
export const discoverLinks = [
  
  { href: "/", label: "Home" },
  { href: "/exclusive-tours", label: "Exclusive Tours" },
  { href: "/grouptours", label: "Group Tours" },
  { href: "/special-tours", label: "Special Tours" },
  { href: "/filterpage/experience", label: "Experiences" },
  {href: "/testimonials", label: "Guest Reviews" }
  
];

export const quickLinks=[
  { href: "/corporate", label: "Corporate" },
  { href: "/passport", label: "Passport" },
  { href: "/tickets", label: "Tickets" },
]

export const supportLinks = [
  { href: "/aboutus", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/feedback", label: "Feedback" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

export const resourcesLinks = [
  { href: "/tour-status", label: "Tour Status" },
  { href: "/blog", label: "Blog" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/video-blogs", label: "Video Blogs" },
  { href: "/travel-planner", label: "Travel Planner" },
];

export const socialLinks = [
  { href: "https://facebook.com", icon: "Facebook" },
  { href: "https://linkedin.com", icon: "Linkedin" },
  { href: "https://youtube.com", icon: "Youtube" },
  { href: "https://instagram.com", icon: "Instagram" },
];

export const copyright =[
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
]
