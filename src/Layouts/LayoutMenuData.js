import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isNews, setisNews] = useState(false);
  const [isMasterData, setIsMasterData] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isBanner, setIsBanner] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isProducts, setIsProducts] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isRequests, setIsRequests] = useState(false);
  const [isCounts, setIsCounts] = useState(false);
  const [isSeeds, setSeeds] = useState(false);


  // Authentication
  // const [isSignIn, setIsSignIn] = useState(false);
  // const [isSignUp, setIsSignUp] = useState(false);
  // const [isPasswordReset, setIsPasswordReset] = useState(false);
  // const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  // const [isLockScreen, setIsLockScreen] = useState(false);
  // const [isLogout, setIsLogout] = useState(false);
  // const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  // const [isVerification, setIsVerification] = useState(false);
  // const [isError, setIsError] = useState(false);

  // // Pages
  // const [isProfile, setIsProfile] = useState(false);
  // const [isLanding, setIsLanding] = useState(false);

  // // Charts
  // const [isApex, setIsApex] = useState(false);

  // // Multi Level
  // const [isLevel1, setIsLevel1] = useState(false);
  // const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
  }, [
    isDashboard,
    isApps,
    isNews,
    isMasterData,
    isUsers,
    isJob,
    isBanner,
    isCompany,
    isProducts,
    isOrder,
    isRequests,
    isCounts,
    isSeeds
  ]);

  const menuItems = [
    // {
    //   label: "Menu",
    //   isHeader: true,
    // },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "las la-tachometer-alt",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },

    {
      id: "news",
      label: "News Management",
      icon: " bx bx-news",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setisNews(!isNews);
        setIscurrentState("News Management");
        updateIconSidebar(e);
      },
      stateVariables: isNews,

      subItems: [
        {
          id: "news",
          label: "News Management",
          link: "/news-management",
          parentId: "news",
        },
        {
          id: "language",
          label: "Language Management",
          link: "/language-management",
          parentId: "news",
        },
      ],
    },
    // {
    //   label: "Locations",
    //   isHeader: true,
    // },
    {
      id: "loctions",
      label: "Locations Management",
      icon: " bx bx-current-location      ",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: "states",
          label: "States",
          link: "/states",
          parentId: "loctions",
        },
        {
          id: "districts",
          label: "Districts",
          link: "/districts",
          parentId: "locations",
        },
        {
          id: "area",
          label: "Area",
          link: "/areas",
          parentId: "loctions",
        },
        {
          id: "pincode",
          label: "Pincodes",
          link: "/pincodes",
          parentId: "locations",
        },
      ],
    },
    {
      id: "companies",
      label: "Company Management",
      icon: "las la-building      ",
      link: "/companies",
      stateVariables: isCompany,
      click: function (e) {
        e.preventDefault();
        setIsCompany(!isCompany);
        setIscurrentState("Company Management");
        updateIconSidebar(e);
      },
    },
    {
      id: "master-data",
      label: "Master Data",
      icon: "lab la-delicious",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMasterData(!isMasterData);
        setIscurrentState("Master Data");
        updateIconSidebar(e);
      },
      stateVariables: isMasterData,
      subItems: [
        {
          id: "categories",
          label: "Categories",
          link: "/categories",
          parentId: "master-data",
        },
        {
          id: "footer-logos",
          label: "Footer Logos",
          link: "/footer-logos",
          parentId: "master-data",
        },
        // {
        //   id: "technician-company",
        //   label: "Technician Company",
        //   link: "/technician-company",
        //   parentId: "master-data",
        // },
        {
          id: "notifications",
          label: "Notifications",
          link: "/notifications",
          parentId: "master-data",
        },
        {
          id: "youtube-videos",
          label: "Youtube Videos",
          link: "/youtube-videos",
          parentId: "master-data",
        },
        {
          id: "brood-stock",
          label: "Brood Stock",
          link: "/brood-stock",
          parentId: "master-data",
        },
        {
          id: "hp-sizes",
          label: "HP Size",
          link: "/hp-sizes",
          parentId: "master-data",
        },
        {
          id: "culture-types",
          label: "Culture Types",
          link: "/culture-types",
          parentId: "master-data",
        },
      ],
    },
    {
      id: "users",
      label: "User Management",
      icon: "las la-users",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsUsers(!isUsers);
        setIscurrentState("User Management");
        updateIconSidebar(e);
      },
      stateVariables: isUsers,
      subItems: [
        {
          id: "users",
          label: "Users",
          link: "/users",
          parentId: "users",
        },

        {
          id: "user-roles",
          label: "User Roles",
          link: "/user-roles",
          parentId: "users",
        },
      ],
    },
    {
      id: "jobs",
      label: "Job Management",
      icon: "las la-address-card",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsJob(!isJob);
        setIscurrentState("Job Management");
        updateIconSidebar(e);
      },
      stateVariables: isJob,
      subItems: [
        {
          id: "jobs",
          label: "Jobs Management",
          link: "/jobs",
          parentId: "jobs",
        },
        {
          id: "job-applications",
          label: "Job Applications",
          link: "/job-applications",
          parentId: "jobs",
        },
      ],
    },

    {
      id: "banners",
      label: "Banner Management",
      icon: " las la-bullhorn",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsBanner(!isBanner);
        setIscurrentState("Banner Management");
        updateIconSidebar(e);
      },
      stateVariables: isBanner,
      subItems: [
        {
          id: "slider-images",
          label: "Slider Images",
          link: "/slider-images",
          parentId: "banners",
        },
        {
          id: "banner-images",
          label: "Banner Images",
          link: "/banner-images",
          parentId: "banners",
        },
        {
          id: "app-banner-images",
          label: "App Banner Images",
          link: "/app-banner-images",
          parentId: "banners",
        },
        {
          id: "best-deals",
          label: "Best Deals",
          link: "/best-deals",
          parentId: "banners",
        },
        {
          id: "app-slider-images",
          label: "App Slider Images",
          link: "/app-slider-images",
          parentId: "banners",
        },
        {
          id: "app-clasified-images",
          label: "App Clasified Images",
          link: "/app-clasified-images",
          parentId: "banners",
        },
        {
          id: "advertisements",
          label: "Advertisements",
          link: "/advertisements",
          parentId: "banners",
        },
        // {
        //   id: "category-ads",
        //   label: "Category Ads",
        //   link: "/category-ads",
        //   parentId: "banners",
        // },
        {
          id: "sponsor-ads",
          label: "Sponsor Ads",
          link: "/sponsor-ads",
          parentId: "banners",
        },
      ],
    },


    {
      id: "products",
      label: "Products Management",
      icon: "las la-box      ",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsProducts(!isProducts);
        setIscurrentState("Products Management");
        updateIconSidebar(e);
      },
      stateVariables: isProducts,
      subItems: [

        {
          id: "salt-percentage",
          label: "Salt Percentage",
          link: "/salt-percentage",
          parentId: "products",
        },
        {
          id: "pl-stage",
          label: "PL Stage",
          link: "/pl-stages",
          parentId: "products",
        },
        {
          id: "feed-types",
          label: "Feed Type",
          link: "/feed-types",
          parentId: "products",
        },
        {
          id: "peddler-types",
          label: "Peddler Types",
          link: "/peddler-types",
          parentId: "products",
        },
        {
          id: "chemical-categories",
          label: "Chemical Categories",
          link: "/chemical-categories",
          parentId: "products",
        },
        {
          id: "products",
          label: "Products",
          link: "/products",
          parentId: "products",
        },
      ],
    },
    {
      id: "orders",
      label: "Order Management",
      icon: "las la-cart-arrow-down",
      link: "/orders",
      stateVariables: isOrder,
      click: function (e) {
        e.preventDefault();
        setIsOrder(!isOrder);
        setIscurrentState("Order Management");
        updateIconSidebar(e);
      },
    },
    {
      id: "requests",
      label: "Request Management",
      icon: "las la-sitemap",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsRequests(!isRequests);
        setIscurrentState("Request Management");
        updateIconSidebar(e);
      },
      stateVariables: isRequests,
      subItems: [
        {
          id: "product-requests",
          label: "Product Requests",
          link: "/product-requests",
          parentId: "requests",
        },
        {
          id: "technician-requests",
          label: "Technician Requests",
          link: "/technician-requests",
          parentId: "requests",
        },
        {
          id: "lab-requests",
          label: "Lab Requests",
          link: "/lab-requests",
          parentId: "requests",
        },
        {
          id: "company-requests",
          label: "Company Requests",
          link: "/company-requests",
          parentId: "requests",
        }
      ],
    },
    {
      id: "counts",
      label: "Count Management",
      icon: " las la-percentage",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsCounts(!isCounts);
        setIscurrentState("Count Management");
        updateIconSidebar(e);
      },
      stateVariables: isCounts,
      subItems: [
        {
          id: "counter-areas",
          label: "Counter Areas",
          link: "/count-areas",
          parentId: "counts",
        },
        {
          id: "count-types",
          label: "Counter Types",
          link: "/count-types",
          parentId: "counts",
        },
        {
          id: "counts",
          label: "Counts",
          link: "/counts",
          parentId: "counts",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
