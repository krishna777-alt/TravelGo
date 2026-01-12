import { Outlet } from "react-router-dom";
import Hero from "./HeroSection";
import Navbar from "./navbar";
import QNA from "./QNA";
import FeaturedExprience from "./FeaturedExprience";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedExprience />
      <QNA />
    </>
  );
}

export default Home;
