import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;


              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      
                      <Page/>
                      
                    </Layout>
                  }
                />
              )
            })
          }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
