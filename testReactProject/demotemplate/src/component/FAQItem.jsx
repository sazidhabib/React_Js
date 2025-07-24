import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.15,
                ease: "easeOut",
            }}
            className={clsx(
                "group border rounded-lg transition-all duration-200 ease-in-out",
                isOpen ? "bg-gray-100 shadow-sm" : "hover:bg-gray-50"
            )}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4"
            >
                <h3
                    className={clsx(
                        "text-left text-base font-medium transition-colors duration-200",
                        isOpen ? "text-black" : "text-gray-700"
                    )}
                >
                    {question}
                </h3>
                <motion.div
                    animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={clsx(
                        "shrink-0 p-0.5 rounded-full",
                        isOpen ? "text-blue-600" : "text-gray-400"
                    )}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                                opacity: { duration: 0.25, delay: 0.1 },
                            },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: { duration: 0.3, ease: "easeInOut" },
                                opacity: { duration: 0.25 },
                            },
                        }}
                    >
                        <div className="border-t px-6 pt-2 pb-4">
                            <motion.p
                                initial={{ y: -8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -8, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="text-sm text-gray-600 leading-relaxed"
                            >
                                {answer}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FAQItem;
