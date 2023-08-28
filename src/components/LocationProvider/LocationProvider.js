import { AnimatePresence } from "framer-motion";

function LocationProvider({ children }) {
    return (
        <AnimatePresence>{children}</AnimatePresence>
    );
}

export default LocationProvider;