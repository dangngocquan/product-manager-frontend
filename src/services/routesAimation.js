import { delay } from "framer-motion";


export default {
    // Header
    header: {
        initial: {
            translateY: "100vh"
        },
        final: {
            translateY: "0vh",
            transition: {
                duration: 0.4
            }
        }
    },
    // Page home
    home: {
        productList: {
            categoryName: {
                initial: {
                    translateX: "-200%"
                },
                final: {
                    translateX: "0%",
                    transition: {
                        duration: 0.5
                    }
                }
            },
            products: {
                initial: {
                    opacity: 0
                },
                final: {
                    opacity: 1,
                    transition: {
                        duration: 2,
                        delay: 0.5
                    }
                }
            },
            right: {
                initial: {
                    translateX: "400%"
                },
                final: {
                    translateX: "0%",
                    transition: {
                        duration: 0.5,
                        delay: 2.5
                    }
                }
            }
        }
    }
};