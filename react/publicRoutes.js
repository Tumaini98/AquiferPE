import { lazy } from 'react';
// -- Alphabetize --
const About = lazy(() => import('../pages/aboutus'));
const AddBlog = lazy(() => import('../pages/blog/AddBlog'));
const Blog = lazy(() => import('../pages/blog/Blog'));
const ChangePassword = lazy(() => import('../pages/auth/ChangePassword'));
const Confirm = lazy(() => import('../pages/auth/Confirm'));
const ContactUs = lazy(() => import('../pages/contactus/ContactUs'));
const Cookies = lazy(() => import('../pages/cookies'));
const ExampleAutocomplete = lazy(() => import('../pages/location/ExampleAutocomplete'));
const Faq = lazy(() => import('../pages/faqs/Faq'));

const FileUploader = lazy(() => import('../pages/testfileuploader/Test'));
const ForgotPassword = lazy(() => import('../pages/forgotpassword/ForgotPassword'));
const Jobs = lazy(() => import('../pages/jobpublic/Jobs'));
const Landing = lazy(() => import('../pages/landing'));
const Login = lazy(() => import('../pages/auth/Login'));
const Organizations = lazy(() => import('../components/organizations/Organizations'));
const OrganizationsForm = lazy(() => import('../components/organizations/OrganizationsForm'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const PrivacyPolicy = lazy(() => import('../pages/privacypolicy'));
const Register = lazy(() => import('../pages/auth/Register'));
const ServerError = lazy(() => import('../pages/error/ServerError'));
const ShareStoryDetails = lazy(() => import('../pages/sharestory/StoryDetail'));
const ShareStoryList = lazy(() => import('../pages/sharestory/ListShareStory'));
const ShareStoryPage = lazy(() => import('../pages/sharestory/ShareStoryForm'));

const routes = [
    {
        path: '/',
        name: 'Landing',
        exact: true,
        element: Landing,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/about',
        name: 'About Us',
        exact: true,
        element: About,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/contact',
        name: 'Contact',
        exact: true,
        element: ContactUs,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/cookies',
        name: 'Cookies',
        exact: true,
        element: Cookies,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/files',
        name: 'FileUploader',
        exact: true,
        element: FileUploader,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/register',
        name: 'Register',
        exact: true,
        element: Register,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/login',
        name: 'Login',
        exact: true,
        element: Login,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/jobs',
        name: 'Jobs',
        exact: true,
        element: Jobs,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/faq',
        name: 'Faq',
        exact: true,
        element: Faq,
        roles: [],
        isAnonymous: true,
    },

    {
        path: '/confirm',
        name: 'Verify Email',
        exact: true,
        element: Confirm,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/locationexample',
        name: 'ExampleAutocomplete',
        exact: true,
        element: ExampleAutocomplete,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/Blog',
        name: 'Blog',
        exact: true,
        element: Blog,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/AddBlog',
        name: 'AddBlog',
        exact: true,
        element: AddBlog,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/sharestory',
        name: 'Share Story',
        element: ShareStoryPage,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
    {
        path: '/listsharestory',
        name: ' List Share Story',
        element: ShareStoryList,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
    {
        path: '/storydetails/:storyId',
        name: ' Story Details',
        element: ShareStoryDetails,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        exact: true,
        element: ForgotPassword,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/changepassword',
        name: 'ChangePassword',
        exact: true,
        element: ChangePassword,
        roles: [],
        isAnonymous: true,
    },
    {
        path: "/contactUs",
        name: 'ContactUs',
        exact: true,
        element: ContactUs,
        roles: [],
        isAnonymous: true,
    },

    {
        path: '/privacypolicy',
        name: 'Privacy Policy',
        element: PrivacyPolicy,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/cookies',
        name: 'Cookies',
        exact: true,
        isAnonymous: true,
    },
];
const organizations = [
    {
        path: '/organizations',
        name: 'Organization',
        exact: true,
        element: Organizations,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/organization/new',
        name: 'OrganizationForm',
        exact: true,
        element: OrganizationsForm,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/organization/:id/edit',
        name: 'OrganizationForm',
        exact: true,
        element: OrganizationsForm,
        roles: [],
        isAnonymous: true,
    },
];

const errorRoutes = [
    {
        path: '/error-500',
        name: 'Error - 500',
        element: ServerError,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];

var allRoutes = [...routes, ...errorRoutes, ...organizations];

export default allRoutes;
