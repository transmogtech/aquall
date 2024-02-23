import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

// //Calendar
// import MonthGrid from "../pages/Calendar/MonthGrid";
// import Calendar from "../pages/Calendar/Maincalender";

// Email box
// import MailInbox from "../pages/EmailInbox";
// import BasicAction from "../pages/Email/EmailTemplates/BasicAction";
// import EcommerceAction from "../pages/Email/EmailTemplates/EcommerceAction";

// //Chat
// import Chat from "../pages/Chat";

// // Project
// import ProjectList from "../pages/Projects/ProjectList";
// import ProjectOverview from "../pages/Projects/ProjectOverview";
// import CreateProject from "../pages/Projects/CreateProject";

// //Task
// import TaskDetails from "../pages/Tasks/TaskDetails";
// import TaskList from "../pages/Tasks/TaskList";
// import Kanbanboard from "../pages/Tasks/KanbanBoard";

// //Crm Pages
// import CrmCompanies from "../pages/Crm/CrmCompanies";
// import CrmContacts from "../pages/Crm/CrmContacts";
// import CrmDeals from "../pages/Crm/CrmDeals/index";
// import CrmLeads from "../pages/Crm/CrmLeads/index";

// //Invoices
// import InvoiceList from "../pages/Invoices/InvoiceList";
// import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
// import InvoiceDetails from "../pages/Invoices/InvoiceDetails";

// // Support Tickets
// import ListView from '../pages/SupportTickets/ListView';
// import TicketsDetails from '../pages/SupportTickets/TicketsDetails';

// // //Ecommerce Pages
// import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
// import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
// import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
// import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
// import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
// import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
// import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
// import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
// import EcommerceSellers from "../pages/Ecommerce/EcommerceSellers/index";
// import EcommerceSellerDetail from "../pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail";

// // NFT Marketplace Pages
// import Marketplace from "../pages/NFTMarketplace/Marketplace";
// import Collections from "../pages/NFTMarketplace/Collections";
// import CreateNFT from "../pages/NFTMarketplace/CreateNFT";
// import Creators from "../pages/NFTMarketplace/Creators";
// import ExploreNow from "../pages/NFTMarketplace/ExploreNow";
// import ItemDetails from "../pages/NFTMarketplace/Itemdetails";
// import LiveAuction from "../pages/NFTMarketplace/LiveAuction";
// import Ranking from "../pages/NFTMarketplace/Ranking";
// import WalletConnect from "../pages/NFTMarketplace/WalletConnect";

// // Base Ui
// import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
// import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
// import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
// import UiColors from "../pages/BaseUi/UiColors/UiColors";
// import UiCards from "../pages/BaseUi/UiCards/UiCards";
// import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
// import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
// import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
// import UiImages from "../pages/BaseUi/UiImages/UiImages";
// import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
// import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
// import UiModals from "../pages/BaseUi/UiModals/UiModals";
// import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
// import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
// import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
// import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
// import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
// import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
// import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
// import UiList from "../pages/BaseUi/UiLists/UiLists";
// import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
// import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
// import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// // Advance Ui
// import UiNestableList from "../pages/AdvanceUi/UiNestableList/UiNestableList";
// import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
// import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
// import UiTour from "../pages/AdvanceUi/UiTour/UiTour";
// import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
// import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
// import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";

// // Widgets
// import Widgets from '../pages/Widgets/Index';

// //Forms
// import BasicElements from "../pages/Forms/BasicElements/BasicElements";
// import FormSelect from "../pages/Forms/FormSelect/FormSelect";
// import FormEditor from "../pages/Forms/FormEditor/FormEditor";
// import CheckBoxAndRadio from "../pages/Forms/CheckboxAndRadio/CheckBoxAndRadio";
// import Masks from "../pages/Forms/Masks/Masks";
// import FileUpload from "../pages/Forms/FileUpload/FileUpload";
// import FormPickers from "../pages/Forms/FormPickers/FormPickers";
// import FormRangeSlider from "../pages/Forms/FormRangeSlider/FormRangeSlider";
// import Formlayouts from "../pages/Forms/FormLayouts/Formlayouts";
// import FormValidation from "../pages/Forms/FormValidation/FormValidation";
// import FormWizard from "../pages/Forms/FormWizard/FormWizard";
// import FormAdvanced from "../pages/Forms/FormAdvanced/FormAdvanced";
// import Select2 from "../pages/Forms/Select2/Select2";

// //Tables
// import BasicTables from '../pages/Tables/BasicTables/BasicTables';
// import ListTables from '../pages/Tables/ListTables/ListTables';
// import ReactTable from "../pages/Tables/ReactTables";

// //Icon pages
// import RemixIcons from "../pages/Icons/RemixIcons/RemixIcons";
// import BoxIcons from "../pages/Icons/BoxIcons/BoxIcons";
// import MaterialDesign from "../pages/Icons/MaterialDesign/MaterialDesign";
// import FeatherIcons from "../pages/Icons/FeatherIcons/FeatherIcons";
// import LineAwesomeIcons from "../pages/Icons/LineAwesomeIcons/LineAwesomeIcons";
// import CryptoIcons from "../pages/Icons/CryptoIcons/CryptoIcons";

// //Maps
// import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";

// //AuthenticationInner pages
// import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
// import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
// import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
// import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
// import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';
// //pages
// import Starter from '../pages/Pages/Starter/Starter';
// import SimplePage from '../pages/Pages/Profile/SimplePage/SimplePage';
 import Settings from '../pages/Pages/Profile/Settings/Settings';
// import Team from '../pages/Pages/Team/Team';
// import Timeline from '../pages/Pages/Timeline/Timeline';
// import Faqs from '../pages/Pages/Faqs/Faqs';
// import Pricing from '../pages/Pages/Pricing/Pricing';
// import Gallery from '../pages/Pages/Gallery/Gallery';
// import Maintenance from '../pages/Pages/Maintenance/Maintenance';
// import ComingSoon from '../pages/Pages/ComingSoon/ComingSoon';
// import SiteMap from '../pages/Pages/SiteMap/SiteMap';
// import SearchResults from '../pages/Pages/SearchResults/SearchResults';
// import PrivecyPolicy from '../pages/Pages/PrivacyPolicy.js'
// import TermsCondition from '../pages/Pages/TermsCondition'

// import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';
// import BasicLockScreen from '../pages/AuthenticationInner/LockScreen/BasicLockScr';
// import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
// import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';
// import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
// import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
// import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
// import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
// import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
// import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
// import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
// import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
// import Error500 from '../pages/AuthenticationInner/Errors/Error500';

// import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
// import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
// import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
// import Register from "../pages/Authentication/Register";

// //Charts
// import LineCharts from "../pages/Charts/ApexCharts/LineCharts";
// import AreaCharts from "../pages/Charts/ApexCharts/AreaCharts";
// import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";
// import BarCharts from "../pages/Charts/ApexCharts/BarCharts";
// import MixedCharts from "../pages/Charts/ApexCharts/MixedCharts";
// import TimelineCharts from "../pages/Charts/ApexCharts/TimelineCharts";
// import CandlestickChart from "../pages/Charts/ApexCharts/CandlestickChart";
// import BoxplotCharts from "../pages/Charts/ApexCharts/BoxplotCharts";
// import BubbleChart from "../pages/Charts/ApexCharts/BubbleChart";
// import ScatterCharts from "../pages/Charts/ApexCharts/ScatterCharts";
// import HeatmapCharts from "../pages/Charts/ApexCharts/HeatmapCharts";
// import TreemapCharts from "../pages/Charts/ApexCharts/TreemapCharts";
// import PieCharts from "../pages/Charts/ApexCharts/PieCharts";
// import RadialbarCharts from "../pages/Charts/ApexCharts/RadialbarCharts";
// import RadarCharts from "../pages/Charts/ApexCharts/RadarCharts";
// import PolarCharts from "../pages/Charts/ApexCharts/PolarCharts";

// import ChartsJs from "../pages/Charts/ChartsJs/index";
// import Echarts from "../pages/Charts/ECharts/index";

// //Job pages
// import Statistics from "../pages/Jobs/Statistics";
import JobList from "../pages/Jobs/JobList/List";
// import JobGrid from "../pages/Jobs/JobList/Grid";
import JobOverview from "../pages/Jobs/JobList/Overview";
// import CandidateList from "../pages/Jobs/CandidateList/ListView";
// import CandidateGrid from "../pages/Jobs/CandidateList/GridView";
import NewJobs from "../pages/Jobs/NewJob";
// import JobCategories from "../pages/Jobs/JobCategories";
import Application from "../pages/Jobs/Application";
// import CompaniesList from "../pages/Jobs/CompaniesList";

// import ApiKey from '../pages/APIKey/index'

// // Landing Index
// import OnePage from "../pages/Landing/OnePage";
// import NFTLanding from "../pages/Landing/NFTLanding";
// import JobLanding from '../pages/Landing/Job'

// // User Profile
import UserProfile from "../pages/Authentication/user-profile";

// import FileManager from "../pages/FileManager";
// import ToDoList from "../pages/ToDo";
// import UiLink from "../pages/BaseUi/UiLinks/UiLinks";
// import RangeArea from "../pages/Charts/ApexCharts/RangeAreaCharts/Index";
// import FunnelCharts from "../pages/Charts/ApexCharts/FunnelCharts";

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
import Advertisements from "../pages/BannerManagement/Avertisements/index.js";
import CreateAdvertisement from "../pages/BannerManagement/Avertisements/Create.js";
import EditAdvertisement from "../pages/BannerManagement/Avertisements/Edit.js";
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
import FeedTypes from "../pages/ProductManagement/Feeds/Type/index.js";
import PLStages from "../pages/ProductManagement/Seeds/PLStage/index.js";
import SaltPercentage from "../pages/ProductManagement/Seeds/SaltPercentage/index.js";
import Products from "../pages/ProductManagement/index.js";
import CreateProduct from "../pages/ProductManagement/Create.js";
import EditProduct from "../pages/ProductManagement/Edit.js";
import EcommerceOrders from "../pages/OrderManagement/index.js";
import EcommerceOrderDetail from "../pages/OrderManagement/EcommerceOrderDetail.js";
import EcommerceCustomers from "../pages/UserManagement/Users/index.js";
import UserRoles from "../pages/UserManagement/Roles/index.js";
import ProductRequests from "../pages/RequestManagement/ProductRequests/index.js";
import TechnicianRequests from "../pages/RequestManagement/TechnicianRequests/index.js";
import LabRequests from "../pages/RequestManagement/LabRequests/index.js";
import CountAreas from "../pages/CountManagement/CounterAreas/index.js";
import CountPercentages from "../pages/CountManagement/CountPercents/index.js";
import Counts from "../pages/CountManagement/Counts/index.js";
import CreateCount from "../pages/CountManagement/Counts/Create.js";
import EditCount from "../pages/CountManagement/Counts/Edit.js";


const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },
  // { path: "/apps-calendar", component: <Calendar /> },
  // { path: "/apps-calendar-month-grid", component: <MonthGrid /> },
  // { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  // { path: "/apps-ecommerce-product-details", component: <EcommerceProductDetail /> },
  // { path: "/apps-ecommerce-add-product", component: <EcommerceAddProduct /> },
  // { path: "/apps-ecommerce-orders", component: <EcommerceOrders /> },
  // { path: "/apps-ecommerce-order-details", component: <EcommerceOrderDetail /> },
  // { path: "/apps-ecommerce-customers", component: <EcommerceCustomers /> },
  // { path: "/apps-ecommerce-cart", component: <EcommerceCart /> },
  // { path: "/apps-ecommerce-checkout", component: <EcommerceCheckout /> },
  // { path: "/apps-ecommerce-sellers", component: <EcommerceSellers /> },
  // { path: "/apps-ecommerce-seller-details", component: <EcommerceSellerDetail /> },

  // { path: "/apps-file-manager", component: <FileManager /> },
  // { path: "/apps-todo", component: <ToDoList /> },


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

  { path: "/hatecheries-pdf", component: <HatecheriesPDF /> },
  { path: "/culture-types", component: <CultureTypes /> },
  { path: "/hp-sizes", component: <HpSize /> },
  { path: "/peddler-types", component: <PeddlerTypes /> },
  { path: "/chemical-categories", component: <ChemicalCategories /> },
  { path: "/feed-types", component: <FeedTypes /> },
  { path: "/pl-stages", component: <PLStages /> },
  { path: "/salt-percentage", component: <SaltPercentage /> },
  { path: "/products", component: <Products /> },
  { path: "/create-product", component: <CreateProduct /> },
  { path: "/edit/product/:id", component: <EditProduct /> },
  { path: "/orders", component: <EcommerceOrders /> },
  { path: "/order-details", component: <EcommerceOrderDetail /> },
  { path: "/users", component: <EcommerceCustomers /> },
  { path: "/user-roles", component: <UserRoles /> },
  { path: "/product-requests", component: <ProductRequests /> },
  { path: "/technician-requests", component: <TechnicianRequests /> },
  { path: "/lab-requests", component: <LabRequests /> },
  { path: "/count-areas", component: <CountAreas /> },
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
  { path: "/create-app-clasified-image", component: <CreateAppClasifiedImage /> },
  { path: "/edit/app-clasified-image/:id", component: <EditAppClasifiedImage /> },

  
  
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

//   //Chat
//   { path: "/apps-chat", component: <Chat /> },

//   //EMail
//   { path: "/apps-mailbox", component: <MailInbox /> },
//   { path: "/apps-email-basic", component: <BasicAction /> },
//   { path: "/apps-email-ecommerce", component: <EcommerceAction /> },

//   //Projects
//   { path: "/apps-projects-list", component: <ProjectList /> },
//   { path: "/apps-projects-overview", component: <ProjectOverview /> },
//   { path: "/apps-projects-create", component: <CreateProject /> },

//   //Task
//   { path: "/apps-tasks-list-view", component: <TaskList /> },
//   { path: "/apps-tasks-details", component: <TaskDetails /> },
//   { path: "/apps-tasks-kanban", component: <Kanbanboard /> },

//   //Crm
//   { path: "/apps-crm-contacts", component: <CrmContacts /> },
//   { path: "/apps-crm-companies", component: <CrmCompanies /> },
//   { path: "/apps-crm-deals", component: <CrmDeals /> },
//   { path: "/apps-crm-leads", component: <CrmLeads /> },

//   //Invoices
//   { path: "/apps-invoices-list", component: <InvoiceList /> },
//   { path: "/apps-invoices-details", component: <InvoiceDetails /> },
//   { path: "/apps-invoices-create", component: <InvoiceCreate /> },

//   //Supports Tickets
//   { path: "/apps-tickets-list", component: <ListView /> },
//   { path: "/apps-tickets-details", component: <TicketsDetails /> },


//   //charts
//   { path: "/charts-apex-line", component: <LineCharts /> },
//   { path: "/charts-apex-area", component: <AreaCharts /> },
//   { path: "/charts-apex-column", component: <ColumnCharts /> },
//   { path: "/charts-apex-bar", component: <BarCharts /> },
//   { path: "/charts-apex-mixed", component: <MixedCharts /> },
//   { path: "/charts-apex-timeline", component: <TimelineCharts /> },
//   { path: "/charts-apex-range-area", component: <RangeArea /> },
//   { path: "/charts-apex-funnel", component: <FunnelCharts /> },
//   { path: "/charts-apex-candlestick", component: <CandlestickChart /> },
//   { path: "/charts-apex-boxplot", component: <BoxplotCharts /> },
//   { path: "/charts-apex-bubble", component: <BubbleChart /> },
//   { path: "/charts-apex-scatter", component: <ScatterCharts /> },
//   { path: "/charts-apex-heatmap", component: <HeatmapCharts /> },
//   { path: "/charts-apex-treemap", component: <TreemapCharts /> },
//   { path: "/charts-apex-pie", component: <PieCharts /> },
//   { path: "/charts-apex-radialbar", component: <RadialbarCharts /> },
//   { path: "/charts-apex-radar", component: <RadarCharts /> },
//   { path: "/charts-apex-polar", component: <PolarCharts /> },

//   { path: "/charts-chartjs", component: <ChartsJs /> },
//   { path: "/charts-echarts", component: <Echarts /> },


//   // Base Ui
//   { path: "/ui-alerts", component: <UiAlerts /> },
//   { path: "/ui-badges", component: <UiBadges /> },
//   { path: "/ui-buttons", component: <UiButtons /> },
//   { path: "/ui-colors", component: <UiColors /> },
//   { path: "/ui-cards", component: <UiCards /> },
//   { path: "/ui-carousel", component: <UiCarousel /> },
//   { path: "/ui-dropdowns", component: <UiDropdowns /> },
//   { path: "/ui-grid", component: <UiGrid /> },
//   { path: "/ui-images", component: <UiImages /> },
//   { path: "/ui-tabs", component: <UiTabs /> },
//   { path: "/ui-accordions", component: <UiAccordions /> },
//   { path: "/ui-modals", component: <UiModals /> },
//   { path: "/ui-offcanvas", component: <UiOffcanvas /> },
//   { path: "/ui-placeholders", component: <UiPlaceholders /> },
//   { path: "/ui-progress", component: <UiProgress /> },
//   { path: "/ui-notifications", component: <UiNotifications /> },
//   { path: "/ui-media", component: <UiMediaobject /> },
//   { path: "/ui-embed-video", component: <UiEmbedVideo /> },
//   { path: "/ui-typography", component: <UiTypography /> },
//   { path: "/ui-lists", component: <UiList /> },
//   { path: "/ui-links", component: <UiLink /> },
//   { path: "/ui-general", component: <UiGeneral /> },
//   { path: "/ui-ribbons", component: <UiRibbons /> },
//   { path: "/ui-utilities", component: <UiUtilities /> },

//   // Advance Ui
//   { path: "/advance-ui-nestable", component: <UiNestableList /> },
//   { path: "/advance-ui-scrollbar", component: <UiScrollbar /> },
//   { path: "/advance-ui-animation", component: <UiAnimation /> },
//   { path: "/advance-ui-tour", component: <UiTour /> },
//   { path: "/advance-ui-swiper", component: <UiSwiperSlider /> },
//   { path: "/advance-ui-ratings", component: <UiRatings /> },
//   { path: "/advance-ui-highlight", component: <UiHighlight /> },

//   // Widgets
//   { path: "/widgets", component: <Widgets /> },

//   // Forms
//   { path: "/forms-elements", component: <BasicElements /> },
//   { path: "/forms-select", component: <FormSelect /> },
//   { path: "/forms-editors", component: <FormEditor /> },
//   { path: "/forms-checkboxes-radios", component: <CheckBoxAndRadio /> },
//   { path: "/forms-masks", component: <Masks /> },
//   { path: "/forms-file-uploads", component: <FileUpload /> },
//   { path: "/forms-pickers", component: <FormPickers /> },
//   { path: "/forms-range-sliders", component: <FormRangeSlider /> },
//   { path: "/forms-layouts", component: <Formlayouts /> },
//   { path: "/forms-validation", component: <FormValidation /> },
//   { path: "/forms-wizard", component: <FormWizard /> },
//   { path: "/forms-advanced", component: <FormAdvanced /> },
//   { path: "/forms-select2", component: <Select2 /> },

//   //Tables
//   { path: "/tables-basic", component: <BasicTables /> },
//   { path: "/tables-listjs", component: <ListTables /> },
//   { path: "/tables-react", component: <ReactTable /> },

//   //Icons
//   { path: "/icons-remix", component: <RemixIcons /> },
//   { path: "/icons-boxicons", component: <BoxIcons /> },
//   { path: "/icons-materialdesign", component: <MaterialDesign /> },
//   { path: "/icons-feather", component: <FeatherIcons /> },
//   { path: "/icons-lineawesome", component: <LineAwesomeIcons /> },
//   { path: "/icons-crypto", component: <CryptoIcons /> },

//   //Maps
//   { path: "/maps-google", component: <GoogleMaps /> },

//   //Pages
//   { path: "/pages-starter", component: <Starter /> },
//   { path: "/pages-profile", component: <SimplePage /> },
  { path: "/profile", component: <Settings /> },
//   { path: "/pages-team", component: <Team /> },
//   { path: "/pages-timeline", component: <Timeline /> },
//   { path: "/pages-faqs", component: <Faqs /> },
//   { path: "/pages-gallery", component: <Gallery /> },
//   { path: "/pages-pricing", component: <Pricing /> },
//   { path: "/pages-sitemap", component: <SiteMap /> },
//   { path: "/pages-search-results", component: <SearchResults /> },
//   { path: "/pages-privecy-policy", component: <PrivecyPolicy /> },
//   { path: "/pages-terms-condition", component: <TermsCondition /> },

//   //User Profile
  // { path: "/profile", component: <UserProfile /> },

//   // this route should be at the end of all other routes
//   // eslint-disable-next-line react/display-name
//   {
//     path: "/",
//     exact: true,
//     component: <Navigate to="/dashboard" />,
//   },
//   { path: "*", component: <Navigate to="/dashboard" /> },
//   //Job pages
//   { path: "/apps-job-statistics", component: <Statistics /> },
  { path: "/job-lists", component: <JobList /> },
//   { path: "/apps-job-grid-lists", component: <JobGrid /> },
  { path: "/job-details", component: <JobOverview /> },
//   { path: "/apps-job-candidate-lists", component: <CandidateList /> },
//   { path: "/apps-job-candidate-grid", component: <CandidateGrid /> },
  { path: "/job-applications", component: <Application /> },
  { path: "/job-new", component: <NewJobs /> },
//   { path: "/apps-job-companies-lists", component: <CompaniesList /> },
//   { path: "/apps-job-categories", component: <JobCategories /> },

//   //APIkey
//   { path: "/apps-api-key", component: <ApiKey /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  // { path: "/register", component: <Register /> },

  // //AuthenticationInner pages
  // { path: "/auth-signin-basic", component: <BasicSignIn /> },
  // { path: "/auth-signin-cover", component: <CoverSignIn /> },
  // { path: "/auth-signup-basic", component: <BasicSignUp /> },
  // { path: "/auth-signup-cover", component: <CoverSignUp /> },
  // { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  // { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  // { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  // { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  // { path: "/auth-logout-basic", component: <BasicLogout /> },
  // { path: "/auth-logout-cover", component: <CoverLogout /> },
  // { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  // { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  // { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  // { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  // { path: "/auth-404-basic", component: <Basic404 /> },
  // { path: "/auth-404-cover", component: <Cover404 /> },
  // { path: "/auth-404-alt", component: <Alt404 /> },
  // { path: "/auth-500", component: <Error500 /> },
  // { path: "/pages-maintenance", component: <Maintenance /> },
  // { path: "/pages-coming-soon", component: <ComingSoon /> },

  // { path: "/landing", component: <OnePage /> },
  // { path: "/nft-landing", component: <NFTLanding /> },
  // { path: "/job-landing", component: <JobLanding /> },

  // { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  // { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  // { path: "/auth-offline", component: <Offlinepage /> },

];

export { authProtectedRoutes, publicRoutes };