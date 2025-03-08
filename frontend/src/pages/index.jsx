import React from "react";
import Navbar from "../components/navBar";
import Hero from "../components/hero";
import About from "../components/about";
import Footer from "../components/footer";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <Footer />
        </div>
    );
};
export default Home;