import React from "react";

const KeyFeatures = () => (
  <section className="relative py-12 lg:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col items-center  text-center">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-4xl md:text-3xl">
            আমাদের সেবা সমূহ
          </h2>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {[
          {
            title: "ডাক্তার ",
            icon: "https://img.icons8.com/?size=100&id=jnN8CxPfUgES&format=png&color=000000",
          },
          {
            title: "হাসপাতাল ",
            icon: "https://img.icons8.com/?size=100&id=vmPQBtpsnX7W&format=png&color=000000",
          },
          {
            title: "বাসের সময়সূচী",
            icon: "https://img.icons8.com/?size=100&id=F2WQPrFyyFwe&format=png&color=000000",
          },
          {
            title: "ট্রেনের সময়সূচী",
            icon: "https://img.icons8.com/?size=100&id=rBmUO88UsE0L&format=png&color=000000",
          },
          {
            title: "দর্শনীয় স্থান",
            icon: "https://img.icons8.com/?size=100&id=25449&format=png&color=000000",
          },
          {
            title: "বাসা ভাড়া",
            icon: "https://img.icons8.com/?size=100&id=Kj72GsBUwKAL&format=png&color=000000",
          },
          {
            title: "শপিং",
            icon: "https://img.icons8.com/?size=100&id=9gYPgyVfWWyJ&format=png&color=000000",
          },
          {
            title: "ফায়ার সার্ভিস",
            icon: "https://img.icons8.com/?size=100&id=LPfUNSdTFurl&format=png&color=000000",
          },
          {
            title: "কুরিয়ার সার্ভিস",
            icon: "https://img.icons8.com/?size=100&id=ATJTsWtdBiWn&format=png&color=000000",
          },
          {
            title: "থানা - পুলিশ",
            icon: "https://img.icons8.com/?size=100&id=jCKzmCCS5GzP&format=png&color=000000",
          },
          {
            title: "ওয়েব-সাইট",
            icon: "https://img.icons8.com/?size=100&id=103413&format=png&color=000000",
          },
          {
            title: "বিদ্যুৎ অফিস",
            icon: "https://img.icons8.com/?size=100&id=G3O7E2TAHbeY&format=png&color=000000",
          },
          {
            title: "ডায়াগনস্টিক সেন্টার",
            icon: "https://img.icons8.com/?size=100&id=awpcsVKyfXtK&format=png&color=000000",
          },
          {
            title: "রক্ত",
            icon: "https://img.icons8.com/?size=100&id=au6epl7oVxWj&format=png&color=000000",
          },
          {
            title: "হোটেল",
            icon: "https://img.icons8.com/?size=100&id=Pt5hLogU2ncp&format=png&color=000000",
          },
          {
            title: "গাড়ি ভাড়া",
            icon: "https://img.icons8.com/?size=100&id=nojiXtGu1G1D&format=png&color=000000",
          },
          {
            title: "মিস্ত্রি",
            icon: "https://img.icons8.com/?size=100&id=Ooo5WKiGjOZ6&format=png&color=000000",
          },
          {
            title: "জরুরী সেবা",
            icon: "https://img.icons8.com/?size=100&id=GxmEgKtqS42l&format=png&color=000000",
          },
          {
            title: "চাকরি",
            icon: "https://img.icons8.com/?size=100&id=91yUWhsUT0PQ&format=png&color=000000",
          },
          {
            title: "উদ্যোক্তা",
            icon: "https://img.icons8.com/?size=100&id=7w7BsvtPGGSw&format=png&color=000000",
          },
          {
            title: "শিক্ষক",
            icon: "https://img.icons8.com/?size=100&id=nhU042Vo72HB&format=png&color=000000",
          },
          {
            title: "পার্লার-সেলুন",
            icon: "https://img.icons8.com/?size=100&id=gAEXTJh4MwpS&format=png&color=000000",
          },
          {
            title: "রেস্টুরেন্ট",
            icon: "https://img.icons8.com/?size=100&id=EWYoA86tRte2&format=png&color=000000",
          },
          {
            title: "ফ্লাট ও জমি",
            icon: "https://img.icons8.com/?size=100&id=2UAlpk_KzvhM&format=png&color=000000",
          },
          {
            title: "ভিডিও",
            icon: "https://img.icons8.com/?size=100&id=NWKNVaoSVN3X&format=png&color=000000",
          },
          {
            title: "দৈনিক সংবাদ",
            icon: "https://img.icons8.com/?size=100&id=U5UU7R7iBi6g&format=png&color=000000",
          },
          {
            title: "শিক্ষা প্রতিষ্ঠান",
            icon: "https://img.icons8.com/?size=100&id=7S1RDwNNNRuI&format=png&color=000000",
          },
          {
            title: "নার্সারি",
            icon: "https://img.icons8.com/?size=100&id=zpBRDsIKR6su&format=png&color=000000",
          },
          {
            title: "প্যাকেজ",
            icon: "https://img.icons8.com/?size=100&id=12191&format=png&color=000000",
          },
          {
            title: "সাপোর্ট",
            icon: "https://img.icons8.com/?size=100&id=2A6f4bZEH0NK&format=png&color=000000",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition"
          >
            {/* Feature Title */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 lg:text-xl">
                {feature.title}
              </h3>
            </div>

            {/* Feature Icon */}
            <span className="mt-4 flex justify-center">
              <img
                className="h-16 w-16 object-contain"
                src={`${feature.icon}`}
                alt={`${feature.title} Icon`}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default KeyFeatures;
