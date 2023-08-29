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
                offscreen: {
                    x: "-95%"
                },
                onscreen: {
                    x: "0%",
                    transition: {
                        duration: 1.5
                    }
                }
            },
            products: {
                visible: {
                    opacity: 1,
                    transition: {
                        duration: 1.5
                    }
                },
                hidden: {
                    opacity: 0
                }
            },
            right: {
                offscreen: {
                    x: "100%"
                },
                onscreen: {
                    x: "0%",
                    transition: {
                        duration: 1.5
                    }
                }
            },
        }
    },

    // Page Login
    login: {
        container: {
            offscreen: {
                x: "95%",
                opacity: 0
            },
            onscreen: {
                x: "0%",
                opacity: 1,
                transition: {
                    duration: 1
                }
            }
        },
    }
};