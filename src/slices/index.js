import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

//Calendar
import CalendarReducer from "./calendar/reducer";
//Chat
import chatReducer from "./chat/reducer";
//Ecommerce
import EcommerceReducer from "./ecommerce/reducer";

//Project
import ProjectsReducer from "./projects/reducer";

// Tasks
import TasksReducer from "./tasks/reducer";

//Crypto
import CryptoReducer from "./crypto/reducer";

//TicketsList
import TicketsReducer from "./tickets/reducer";
//Crm
import CrmReducer from "./crm/reducer";

//Invoice
import InvoiceReducer from "./invoice/reducer";

//Mailbox
import MailboxReducer from "./mailbox/reducer";

// Dashboard Analytics
import DashboardAnalyticsReducer from "./dashboardAnalytics/reducer";

// Dashboard CRM
import DashboardCRMReducer from "./dashboardCRM/reducer";

// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

// Dashboard Cryto
import DashboardCryptoReducer from "./dashboardCrypto/reducer";

// Dashboard Cryto
import DashboardProjectReducer from "./dashboardProject/reducer";

// Dashboard NFT
import DashboardNFTReducer from "./dashboardNFT/reducer";

// Pages > Team
import TeamDataReducer from "./team/reducer";

// File Manager
import FileManagerReducer from "./fileManager/reducer";

// To do
import TodosReducer from "./todos/reducer";

// Job
import JobReducer from "./jobs/reducer";

// API Key
import APIKeyReducer from "./apiKey/reducer";
import alert from "./alert";
import auth from "./auth";
import news from "./news";
import language from "./language";
import state from "./state";
import district from "./district";
import area from "./area";
import pincode from "./pincode";
import category from "./category";
import youtubeVideo from "./youtubeVideo";
import footerLogo from "./footerLogo";
import notification from "./notification";
import hatecheriesPdf from "./hatecheriesPdf";
import cultureType from "./cultureType";
import hpSize from "./hpSize";
import userRole from "./userRole";
import user from "./user";
import sliderImage from "./sliderImage";
import bannerImage from "./bannerImage";
import appBannerImage from "./appBannerImage";
import company from "./company";
import plStage from "./plStage";
import saltPercentage from "./saltPercentage";
import feedType from "./feedType";
import peddlerType from "./peddlerType";
import chemicalCategory from "./chemicalCategory";
import appClassifiedImage from "./appClassifiedImage";
import advertisement from "./advertisement";
import sponsoredAd from "./sponsoredAd";
import bestDeal from "./bestDeal";
import appSliderImage from "./appSliderImage";
import productRequest from "./productRequest";
import labRequest from "./labRequest";
import technicianRequest from "./technicianRequest";
import companyRequest from "./companyRequest";
import countArea from "./countArea";
import countType from "./countType";
import count from "./count";
import job from "./job";
import jobApplication from "./jobApplication";
import product from "./product";
import order from "./order";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Account: AccountReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Calendar: CalendarReducer,
    Chat: chatReducer,
    Projects: ProjectsReducer,
    Ecommerce: EcommerceReducer,
    Tasks: TasksReducer,
    Crypto: CryptoReducer,
    Tickets: TicketsReducer,
    Crm: CrmReducer,
    Invoice: InvoiceReducer,
    Mailbox: MailboxReducer,
    DashboardAnalytics: DashboardAnalyticsReducer,
    DashboardCRM: DashboardCRMReducer,
    DashboardEcommerce: DashboardEcommerceReducer,
    DashboardCrypto: DashboardCryptoReducer,
    DashboardProject: DashboardProjectReducer,
    DashboardNFT: DashboardNFTReducer,
    Team: TeamDataReducer,
    FileManager: FileManagerReducer,
    Todos: TodosReducer,
    // Jobs: JobReducer,
    APIKey: APIKeyReducer,
    alert,
    auth,
    news,
    language,
    state,
    district,
    area,
    pincode,
    category,
    youtubeVideo,
    footerLogo,
    notification,
    hatecheriesPdf,
    cultureType,
    hpSize,
    userRole,
    user,
    sliderImage,
    bannerImage,
    appBannerImage,
    company,
    plStage,
    saltPercentage, 
    feedType,
    peddlerType,
    chemicalCategory,
    appClassifiedImage,
    advertisement,
    sponsoredAd,
    bestDeal, 
    appSliderImage,
    productRequest,
    labRequest,
    technicianRequest,
    companyRequest,
    countArea,
    countType,
    count,
    job, 
    jobApplication,
    product, 
    order
});

export default rootReducer;