
// Configs
import configs from '../configs';

// Layouts
import DefaultLayout from '../layouts/DefaultLayout';

// Pages
import Home from '../pages/Home';
import Categories from '../pages/Categories';

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
    }
];

// Private routes
const privateRoutes = [];


// Export
export {
    publicRoutes,
    privateRoutes
}