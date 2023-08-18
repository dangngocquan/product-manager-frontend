
// Configs
import configs from '../configs';


// Pages
import Home from '../pages/Home';
import Categories from '../pages/Categories';

// Public routes
const publicRoutes = [
    {
        path: configs.routes.home,
        component: Home
    },
    {
        path: configs.routes.categories,
        component: Categories
    }
];

// Private routes
const privateRoutes = [];


// Export
export {
    publicRoutes,
    privateRoutes
}