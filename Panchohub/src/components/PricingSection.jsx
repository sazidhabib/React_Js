import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import { BGComponent1, BGComponent2, BGComponent3 } from "./PricingBackgrounds";

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-background px-4 py-12 transition-colors">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Pricing Plans
      </h1>
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-4">
        <PricingCard
          label="Individual"
          monthlyPrice="299"
          description="For individuals who want to understand why their landing pages aren't working"
          cta="Sign up"
          background="bg-indigo-500 dark:bg-indigo-600"
          BGComponent={BGComponent1}
        />
        <PricingCard
          label="Company"
          monthlyPrice="999"
          description="For mid-sized companies who are serious about boosting their revenue by 30%"
          cta="Sign up"
          background="bg-purple-500 dark:bg-purple-600"
          BGComponent={BGComponent2}
        />
        <PricingCard
          label="Enterprise"
          monthlyPrice="4,999"
          description="For large enterprises looking to outsource their conversion rate optimization"
          cta="Book a call"
          background="bg-pink-500 dark:bg-pink-600"
          BGComponent={BGComponent3}
        />
      </div>
    </section>
  );
};

export default PricingSection;
