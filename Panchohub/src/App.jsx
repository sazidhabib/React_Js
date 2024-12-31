import Banner from "./components/Banner";
import KeyFeatures from "./components/KeyFeatures";
import Services from "./components/Services";
import Navbar from "./components/Navbar";

import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <Banner />
      <KeyFeatures />
      <Services />
    </>
  );
}

export default App;
