
import About from "./Components/About";
import Information from "./Components/Information";
import Navbar from "./Components/Navbar";
import Generate from "./Components/Generate";


export default function Home() {
  return (
    <div className="">
      
      <Navbar />
      <Generate />


      <hr />

      <Information />

      <About />

    </div>
  );
}
