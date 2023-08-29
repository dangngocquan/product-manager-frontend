import { Route, Routes, useLocation } from "react-router-dom";
import { publicRoutes } from "../../routes";

function RoutesWithAnimation() {
    const location = useLocation();
    // console.log(location);
  
    return (
      <Routes location={location} key={location.key}>
        {
            publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;


              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout
                    >
                      
                      <Page 
                      />
                      
                    </Layout>
                  }
                />
              )
            })
        }
      </Routes>
    );
}

export default RoutesWithAnimation;