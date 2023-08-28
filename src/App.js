import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import LocationProvider from "./components/LocationProvider";
import RoutesWithAnimation from "./components/RoutesWithAnimation";

function App() {
  const [token, setToken] = useState(null);
  console.log("Re-render App Component");

  return (
    <div className="App">
      <BrowserRouter>
        <LocationProvider>
          <RoutesWithAnimation
            token={token}
            setToken={setToken}
          >

          </RoutesWithAnimation>
        </LocationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
