import { motion } from 'framer-motion';

const PricingCard = ({ label, monthlyPrice, description, cta, background, BGComponent }) => {
    return (
        <motion.div
            whileHover="hover"
            transition={{ duration: 1, ease: "backInOut" }}
            variants={{ hover: { scale: 1.05 } }}
            className={`relative h-96 w-80 shrink-0 overflow-hidden rounded-xl p-8 ${background} shadow-lg hover:shadow-xl transition-shadow`}
        >
            <div className="relative z-10 text-white">
                <span className="mb-3 block w-fit rounded-full bg-white/20 backdrop-blur-sm px-3 py-0.5 text-sm font-medium text-white border border-white/20">
                    {label}
                </span>
                <motion.span
                    initial={{ scale: 0.85 }}
                    variants={{ hover: { scale: 1 } }}
                    transition={{ duration: 1, ease: "backInOut" }}
                    className="my-2 block origin-top-left font-mono text-6xl font-black leading-[1.2]"
                >
                    ${monthlyPrice}/<br />Month
                </motion.span>
                <p className="text-lg text-white/90">{description}</p>
            </div>
            <button className="absolute bottom-4 left-4 right-4 z-20 rounded-lg border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent">
                {cta}
            </button>
            <BGComponent />
        </motion.div>
    );
};

export default PricingCard;
