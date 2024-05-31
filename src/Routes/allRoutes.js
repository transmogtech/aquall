import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";
// //Calendar
 import Settings from '../pages/Pages/Profile/Settings/Settings';
//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
// //Job pages
import Jobs from "../pages/JobManagement/Jobs/index.js";
import CreateJob from "../pages/JobManagement/Jobs/Create.js";
import EditJob from "../pages/JobManagement/Jobs/Edit.js";
import UserProfile from "../pages/Authentication/user-profile";

// News Routes
import News from "../pages/NewsManagement/index";
import CreateNews from "../pages/NewsManagement/Add";
import EditNews from "../pages/NewsManagement/edit";


// Language Routes
import Languages from "../pages/LanguageManagement/index";
import CreateLanguage from "../pages/LanguageManagement/Create";
import EditLanguage from "../pages/LanguageManagement/Edit";
import States from "../pages/Locations/States/index";
import CreateState from "../pages/Locations/States/Create";
import EditState from "../pages/Locations/States/Edit";
import Areas from "../pages/Locations/Areas/index.js";
import CreateArea from "../pages/Locations/Areas/Create.js";
import EditArea from "../pages/Locations/Areas/Edit.js";
import Districts from "../pages/Locations/Districts/index.js";
import CreateDistrict from "../pages/Locations/Districts/Create.js";
import EditDistrict from "../pages/Locations/Districts/Edit.js";
import Pincodes from "../pages/Locations/Pincodes/index.js";
import CreatePincode from "../pages/Locations/Pincodes/Create.js";
import EditPincode from "../pages/Locations/Pincodes/Edit.js";
import Categories from "../pages/MasterData/Categories/index.js";
import CreateCategory from "../pages/MasterData/Categories/Create.js";
import EditCategory from "../pages/MasterData/Categories/Edit.js";
import FooterLogos from "../pages/MasterData/FooterLogos/index.js";
import CreateFooterLogo from "../pages/MasterData/FooterLogos/Create.js";
import EditFooterLogo from "../pages/MasterData/FooterLogos/Edit.js";
import Notifications from "../pages/MasterData/Notifications/index.js";
import CreateNotification from "../pages/MasterData/Notifications/Create.js";
import EditNotification from "../pages/MasterData/Notifications/Edit.js";
import YoutubeVideos from "../pages/MasterData/YoutubeVideos/index.js";
import CreateYoutubeVideo from "../pages/MasterData/YoutubeVideos/Create.js";
import EditYoutubeVideo from "../pages/MasterData/YoutubeVideos/Edit.js";
import HatecheriesPDF from "../pages/MasterData/HatecheriesPDF/index.js";
import SliderImages from "../pages/BannerManagement/SliderImages/index.js";
import CreateSliderImage from "../pages/BannerManagement/SliderImages/Create.js";
import EditSliderImage from "../pages/BannerManagement/SliderImages/Edit.js";
import BannerImages from "../pages/BannerManagement/BannerImages/index.js";
import CreateBannerImage from "../pages/BannerManagement/BannerImages/Create.js";
import EditBannerImage from "../pages/BannerManagement/BannerImages/Edit.js";
import AppBannerImages from "../pages/BannerManagement/AppBannerImages/index.js";
import CreateAppBannerImage from "../pages/BannerManagement/AppBannerImages/Create.js";
import EditAppBannerImage from "../pages/BannerManagement/AppBannerImages/Edit.js";
import BestDeals from "../pages/BannerManagement/BestDeals/index.js";
import CreateBestDeal from "../pages/BannerManagement/BestDeals/Create.js";
import EditBestDeal from "../pages/BannerManagement/BestDeals/Edit.js";
import AppSliderImages from "../pages/BannerManagement/AppSliderImages/index.js";
import CreateAppSliderImage from "../pages/BannerManagement/AppSliderImages/Create.js";
import EditAppSliderImage from "../pages/BannerManagement/AppSliderImages/Edit.js";
import AppClasifiedImage from "../pages/BannerManagement/AppClisifiedImages/index.js";
import CreateAppClasifiedImage from "../pages/BannerManagement/AppClisifiedImages/Create.js";
import EditAppClasifiedImage from "../pages/BannerManagement/AppClisifiedImages/Edit.js";
import Advertisements from "../pages/BannerManagement/Advertisements/index.js";
import CreateAdvertisement from "../pages/BannerManagement/Advertisements/Create.js";
import EditAdvertisement from "../pages/BannerManagement/Advertisements/Edit.js";
import SponsorAds from "../pages/BannerManagement/SponsorAds/index.js";
import CreateSponsorAd from "../pages/BannerManagement/SponsorAds/Create.js";
import EditSponsorAd from "../pages/BannerManagement/SponsorAds/Edit.js";
import Companies from "../pages/CompanyManagement/index.js";
import CreateCompany from "../pages/CompanyManagement/Create.js";
import EditCompany from "../pages/CompanyManagement/Edit.js";
import CultureTypes from "../pages/MasterData/CultureType/index.js";
import HpSize from "../pages/MasterData/HPSize/index.js";
import PeddlerTypes from "../pages/ProductManagement/Aerator/PeddlerType/index.js";
import ChemicalCategories from "../pages/ProductManagement/Chemicals/Category/index.js";
import CreateChemicalCategory from "../pages/ProductManagement/Chemicals/Category/Create.js";
import EditChemicalCategory from "../pages/ProductManagement/Chemicals/Category/Edit.js";
import FeedTypes from "../pages/ProductManagement/Feeds/Type/index.js";
import CreateFeedType from "../pages/ProductManagement/Feeds/Type/Create.js";
import CreatePeddlerType from "../pages/ProductManagement/Aerator/PeddlerType/Create.js";
import EditPeddlerType from "../pages/ProductManagement/Aerator/PeddlerType/Edit.js";
import EditFeedType from "../pages/ProductManagement/Feeds/Type/Edit.js";
import PLStages from "../pages/ProductManagement/Seeds/PLStage/index.js";
import CreatePlStage from "../pages/ProductManagement/Seeds/PLStage/Create.js";
import EditPlStage from "../pages/ProductManagement/Seeds/PLStage/Edit.js";
import SaltPercentage from "../pages/ProductManagement/Seeds/SaltPercentage/index.js";
import CreateSaltPercentage from "../pages/ProductManagement/Seeds/SaltPercentage/Create.js";
import EditSaltPercentage from "../pages/ProductManagement/Seeds/SaltPercentage/Edit.js";
import Products from "../pages/ProductManagement/index.js";
import CreateProduct from "../pages/ProductManagement/Create.js";
import EditProduct from "../pages/ProductManagement/Edit.js";
import EcommerceOrders from "../pages/OrderManagement/index.js";
import EcommerceOrderDetail from "../pages/OrderManagement/EcommerceOrderDetail.js";
import EcommerceCustomers from "../pages/UserManagement/Users/index.js";
import CreateUser from "../pages/UserManagement/Users/Create.js";
import EditUser from "../pages/UserManagement/Users/Edit.js";
import UserRoles from "../pages/UserManagement/Roles/index.js";
import ProductRequests from "../pages/RequestManagement/ProductRequests/index.js";
import TechnicianRequests from "../pages/RequestManagement/TechnicianRequests/index.js";
import LabRequests from "../pages/RequestManagement/LabRequests/index.js";
import CountAreas from "../pages/CountManagement/CounterAreas/index.js";
import CountTypes from "../pages/CountManagement/CounterType/index.js";
import CountPercentages from "../pages/CountManagement/CountPercents/index.js";
import Counts from "../pages/CountManagement/Counts/index.js";
import CreateCount from "../pages/CountManagement/Counts/Create.js";
import EditCount from "../pages/CountManagement/Counts/Edit.js";
import CompanyRequests from "../pages/RequestManagement/CompanyRequests/index.js";
import JobApplications from "../pages/JobManagement/JobaApplications/index.js";
import CreateJobApplication from "../pages/JobManagement/JobaApplications/Create.js";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },
  // news management paths
  { path: "/news-management", component: <News /> },
  { path: "/create-news", component: <CreateNews /> },
  { path: "/edit/news/:id", component: <EditNews /> },

  // language management paths
  { path: "/language-management", component: <Languages /> },
  { path: "/create-language", component: <CreateLanguage /> },
  { path: "/edit/language/:id", component: <EditLanguage /> },

  // states management paths
  { path: "/states", component: <States /> },
  { path: "/create-state", component: <CreateState /> },
  { path: "/edit/state/:id", component: <EditState /> },


  
  // districts management paths
  { path: "/districts", component: <Districts /> },
  { path: "/create-district", component: <CreateDistrict /> },
  { path: "/edit/district/:id", component: <EditDistrict /> },
  
  
  // area management paths
  { path: "/areas", component: <Areas /> },
  { path: "/create-area", component: <CreateArea /> },
  { path: "/edit/area/:id", component: <EditArea /> },
  
  // pincode management paths
  { path: "/pincodes", component: <Pincodes /> },
  { path: "/create-pincode", component: <CreatePincode /> },
  { path: "/edit/pincode/:id", component: <EditPincode /> },

  // categories management paths
  { path: "/categories", component: <Categories /> },
  { path: "/create-category", component: <CreateCategory /> },
  { path: "/edit/category/:id", component: <EditCategory /> },

  
  // footer logo management paths
  { path: "/footer-logos", component: <FooterLogos /> },
  { path: "/create-footer-logo", component: <CreateFooterLogo /> },
  { path: "/edit/footer-logo/:id", component: <EditFooterLogo /> },

  
  
  // Notification management paths
  { path: "/notifications", component: <Notifications /> },
  { path: "/create-notification", component: <CreateNotification /> },
  { path: "/edit/notification/:id", component: <EditNotification /> },
  
  
  // Youtube Video management paths
  { path: "/youtube-videos", component: <YoutubeVideos /> },
  { path: "/create-youtube-video", component: <CreateYoutubeVideo /> },
  { path: "/edit/youtube-video/:id", component: <EditYoutubeVideo /> },

  { path: "/brood-stock", component: <HatecheriesPDF /> },
  { path: "/culture-types", component: <CultureTypes /> },
  { path: "/hp-sizes", component: <HpSize /> },


  { path: "/peddler-types", component: <PeddlerTypes /> },
  { path: "/create-peddler-type", component: <CreatePeddlerType /> },
  { path: "/edit/peddler-type/:id", component: <EditPeddlerType /> },


  { path: "/chemical-categories", component: <ChemicalCategories /> },
  { path: "/create-chemical-category", component: <CreateChemicalCategory /> },
  { path: "/edit/chemical-category/:id", component: <EditChemicalCategory /> },

  { path: "/feed-types", component: <FeedTypes /> },
  { path: "/create-feed-type", component: <CreateFeedType /> },
  { path: "/edit/feed-type/:id", component: <EditFeedType /> },

  { path: "/pl-stages", component: <PLStages /> },
  { path: "/create-pl-stage", component: <CreatePlStage /> },
  { path: "/edit/pl-stage/:id", component: <EditPlStage /> },


  { path: "/salt-percentage", component: <SaltPercentage /> },
  
  { path: "/create/salt-percentage", component: <CreateSaltPercentage /> },
  { path: "/edit/salt-percentage/:id", component: <EditSaltPercentage /> },
  
  { path: "/products", component: <Products /> },
  { path: "/create-product", component: <CreateProduct /> },
  { path: "/edit/product/:id", component: <EditProduct /> },
  { path: "/orders", component: <EcommerceOrders /> },
  { path: "/order-details", component: <EcommerceOrderDetail /> },
  { path: "/users", component: <EcommerceCustomers /> },
  { path: "/create-user", component: <CreateUser /> },
  { path: "/edit/user/:id", component: <EditUser /> },

  { path: "/user-roles", component: <UserRoles /> },
  { path: "/product-requests", component: <ProductRequests /> },
  { path: "/company-requests", component: <CompanyRequests /> },
  { path: "/technician-requests", component: <TechnicianRequests /> },
  { path: "/lab-requests", component: <LabRequests /> },
  { path: "/count-areas", component: <CountAreas /> },
  { path: "/count-types", component: <CountTypes /> },
  { path: "/count-percents", component: <CountPercentages /> },
  { path: "/counts", component: <Counts /> },
  { path: "/create-count", component: <CreateCount /> },
  
  { path: "/edit/count/:id", component: <EditCount /> },

  
  // slider images management paths
  { path: "/slider-images", component: <SliderImages /> },
  { path: "/create-slider-image", component: <CreateSliderImage /> },
  { path: "/edit/slider-image/:id", component: <EditSliderImage /> },
  
  
  
  // banner images management paths
  { path: "/banner-images", component: <BannerImages /> },
  { path: "/create-banner-image", component: <CreateBannerImage /> },
  { path: "/edit/banner-image/:id", component: <EditBannerImage /> },

  
  // App banner image management paths
  { path: "/app-banner-images", component: <AppBannerImages /> },
  { path: "/create-app-banner-image", component: <CreateAppBannerImage /> },
  { path: "/edit/app-banner-image/:id", component: <EditAppBannerImage /> },

  
  // Best Deals management paths
  { path: "/best-deals", component: <BestDeals /> },
  { path: "/create-best-deal", component: <CreateBestDeal /> },
  { path: "/edit/best-deal/:id", component: <EditBestDeal /> },

  
  // App slider image management paths
  { path: "/app-slider-images", component: <AppSliderImages /> },
  { path: "/create-app-slider-image", component: <CreateAppSliderImage /> },
  { path: "/edit/app-slider-image/:id", component: <EditAppSliderImage /> },

  
  // App clasified image management paths
  { path: "/app-clasified-images", component: <AppClasifiedImage /> },
  { path: "/create-app-classified-image", component: <CreateAppClasifiedImage /> },
  { path: "/edit/app-classified-image/:id", component: <EditAppClasifiedImage /> },

  
  
  // advertisements management paths
  { path: "/advertisements", component: <Advertisements /> },
  { path: "/create-advertisement", component: <CreateAdvertisement /> },
  { path: "/edit/advertisement/:id", component: <EditAdvertisement /> },

  
  // sponsor ads management paths
  { path: "/sponsor-ads", component: <SponsorAds /> },
  { path: "/create-sponsor-ad", component: <CreateSponsorAd /> },
  { path: "/edit/sponsor-ad/:id", component: <EditSponsorAd /> },

  
  
  // sponsor ads management paths
  { path: "/companies", component: <Companies /> },
  { path: "/create-company", component: <CreateCompany /> },
  { path: "/edit/company/:id", component: <EditCompany /> },

  
  
  // sponsor ads management paths
  { path: "/jobs", component: <Jobs /> },
  { path: "/create-job", component: <CreateJob /> },
  { path: "/edit/job/:id", component: <EditJob /> },

  
  // sponsor ads management paths
  { path: "/job-applications", component: <JobApplications /> },
  { path: "/create-job-application", component: <CreateJobApplication /> },
  // { path: "/edit/job-application/:id", component: <EditJobApplication /> },

  { path: "/profile", component: <Settings /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  

];

export { authProtectedRoutes, publicRoutes };