import { BrowserRouter } from "react-router-dom";
import LocationProvider from "./components/LocationProvider";
import RoutesWithAnimation from "./components/RoutesWithAnimation";

function App() {
  // console.log("Re-render App Component");
  
  return (
    <div className="App">
      <BrowserRouter>
        <LocationProvider>
          <RoutesWithAnimation
          >

          </RoutesWithAnimation>
        </LocationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
