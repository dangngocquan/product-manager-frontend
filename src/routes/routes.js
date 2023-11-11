
// Configs
import configs from '../configs';

// Layouts
import DefaultLayout from '../layouts/DefaultLayout';
import LayoutBlank from '../layouts/LayoutBlank';

// Pages
import Home from '../pages/Home';
import Categories from '../pages/Categories';
import LoginComponent from '../pages/Login';
import ProductInformations from '../pages/ProductInformations';
import UserProfile from '../pages/UserProfile';
import AuthOTP from '../pages/AuthOTP';
import ProductsComponent from '../pages/Products';

// Public routes
const publicRoutes = [
    {
        path: configs.routes.home,
        component: Home,
        layout: DefaultLayout
    },
    {
        path: `${configs.routes.products}`,
        component: ProductsComponent,
        layout: DefaultLayout
    },
    {
        path: configs.routes.categories,
        component: Categories,
        layout: DefaultLayout
    },
    {
        path: configs.routes.login,
        component: LoginComponent,
        layout: LayoutBlank
    },
    {
        path: configs.routes.productInformations,
        component: ProductInformations,
        layout: DefaultLayout
    },
    {
        path: configs.routes.userProfile,
        component: UserProfile,
        layout: LayoutBlank
    },
    {
        path: configs.routes.authOTP,
        component: AuthOTP,
        layout: LayoutBlank
    }
];

// Private routes
const privateRoutes = [];


// Export
export {
    publicRoutes,
    privateRoutes
}