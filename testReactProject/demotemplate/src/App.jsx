import "./App.css";
import FaqSection from "./component/FaqSection";
import PricingSection from "./component/PricingSection";
import Testimonials from "./component/Testimonials";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500">Hello world!</h1>
      <Testimonials />
      <FaqSection />
      <PricingSection />
    </>
  );
}

export default App;
