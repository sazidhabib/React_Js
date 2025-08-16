import React from "react";
import { motion } from "framer-motion";
import { Download, Smartphone } from "lucide-react";

const AppDownload = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, type: "spring" }
    }
  };

  const float = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 50
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Hero Section */}
      <header className="grid !min-h-[49rem] bg-blue-600 px-8 overflow-hidden">
        <div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="col-span-1 text-left"
          >
            <motion.h1
              variants={slideIn}
              className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              PanchoHub <br /> Service App
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-7 text-xl text-white md:pr-16 xl:pr-28"
            >
              আমাদের পঞ্চগড় কে ডিজিটাল সেবা দিতে 'পঞ্চহাব' এ আমরা নিয়ে এসেছি
              সব ডিজিটাল সেবা একসাথে।
            </motion.p>

            {/* App Download Buttons */}
            <motion.div variants={item}>
              <h6 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                <Download className="h-5 w-5" /> Get the app
              </h6>
              <motion.div
                variants={container}
                className="flex flex-col gap-4 md:flex-row md:gap-6"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={item}
                  href="#"
                  className="hover:opacity-90 transition"
                >
                  <img
                    src="image/download-1.svg"
                    alt="Download on App Store"
                    className="h-12 w-auto"
                  />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={item}
                  href="#"
                  className="hover:opacity-90 transition"
                >
                  <img
                    src="image/download-2.svg"
                    alt="Get it on Google Play"
                    className="h-12 w-auto"
                  />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={float}
            src="image/iphones.png"
            alt="App Preview"
            className="col-span-1 my-20 h-full max-h-[30rem] -translate-y-32 md:max-h-[36rem] lg:my-0 lg:ml-auto lg:max-h-[40rem] lg:translate-y-0"
          />
        </div>
      </header>

      {/* Info Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="mx-8 -mt-24 rounded-xl bg-white p-5 shadow-md lg:mx-16 md:p-14 text-left"
      >
        <div className="max-w-[690px]">
          <motion.h3
            variants={item}
            className="mb-3 text-2xl font-semibold text-blue-gray-900 md:text-3xl flex items-center gap-2"
          >
            <Smartphone className="h-6 w-6" /> Service App
          </motion.h3>
          <motion.p
            variants={item}
            className="font-normal text-gray-500 mx-auto"
          >
            পঞ্চহাব — পঞ্চগড় জেলার জন্য এক নতুন ডিজিটাল যুগের সূচনা। আমরা প্রযুক্তির সাহায্যে জেলার মানুষকে সব ধরনের দরকারি তথ্য ও সুবিধা এক জায়গায় এনে দিচ্ছি। শহর হোক বা প্রত্যন্ত গ্রাম, সবাই যাতে সমানভাবে উপকৃত হয়, সেটাই আমাদের প্রধান লক্ষ্য।
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default AppDownload;