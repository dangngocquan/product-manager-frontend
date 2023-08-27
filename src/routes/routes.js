
// Configs
import configs from '../configs';

// Layouts
import DefaultLayout from '../layouts/DefaultLayout';
import LayoutBlank from '../layouts/LayoutBlank';

// Pages
import Home from '../pages/Home';
import Categories from '../pages/Categories';
import LoginComponent from '../pages/Login';

// Public routes
const publicRoutes = [
    {
        path: configs.routes.home,
        component: Home,
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
    }
];

// Private routes
const privateRoutes = [];


// Export
export {
    publicRoutes,
    privateRoutes
}