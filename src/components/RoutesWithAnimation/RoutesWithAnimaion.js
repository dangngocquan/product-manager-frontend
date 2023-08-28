import { Route, Routes, useLocation } from "react-router-dom";
import { publicRoutes } from "../../routes";

function RoutesWithAnimation({token, setToken}) {
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
                        token={token}
                        setToken={setToken}
                    >
                      
                      <Page 
                        token={token}
                        setToken={setToken}
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