import React from "react";

const NewArrivalSection: React.FC = () => {
  return (
    <section className="flex flex-col mt-40 max-md:mt-10 max-md:max-w-full px-4 md:px-6">
      <div className="flex flex-col self-start">
        <div className="flex gap-4 items-center self-start">
          <div className="flex flex-col self-stretch my-auto w-5">
            <div className="flex shrink-0 h-10 bg-red-500 rounded"></div>
          </div>
          <h2 className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
            Featured
          </h2>
        </div>
        <h3 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
          New Arrival
        </h3>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full mx-auto md:px-6 lg:px-8 max-md:mt-10">
        <div className="flex overflow-hidden flex-col px-7 pt-24 bg-black rounded min-w-[240px] w-[570px] max-md:px-5 max-md:max-w-full">
          <div className="flex relative flex-col items-start px-1 pt-96 pb-8 min-h-[511px] max-md:pt-24 max-md:pr-5 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/257c68e85d4ec211145a399b858c738793ae6303cc07c44213626b752e7a758b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-cover absolute inset-0 size-full"
              alt="PlayStation 5"
            />
            <div className="flex relative flex-col max-w-full w-[242px]">
              <div className="flex flex-col w-full text-neutral-50">
                <h4 className="text-2xl font-semibold tracking-wider leading-none">
                  PlayStation 5
                </h4>
                <p className="mt-4 text-sm leading-5">
                  Black and White version of the PS5 coming out on sale.
                </p>
              </div>
              <a
                href="#shop-now"
                className="flex flex-col mt-4 text-base font-medium text-white w-[81px]"
              >
                <span>Shop Now</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e40742fe053a27fd4ae0fe98d17023b98e0458d4b6c382de755fc8952018a510?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  className="object-contain w-full aspect-[83.33]"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center min-w-[240px] w-[570px] max-md:max-w-full">
          <div className="flex overflow-hidden flex-col items-end px-14 max-w-full rounded bg-stone-950 w-[570px] max-md:pl-5">
            <div className="flex relative flex-col items-start pt-36 pb-6 w-full min-h-[284px] max-md:pt-24 max-md:pr-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b674d8f28601fdf2204e3778d077b479839f481c73ef779cd6a3e8ad34a517e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-cover absolute inset-0 size-full"
                alt="Women's Collections"
              />
              <div className="flex relative flex-col max-w-full w-[255px]">
                <div className="flex flex-col w-full text-neutral-50">
                  <h4 className="text-2xl font-semibold tracking-wider leading-none">
                    Women's Collections
                  </h4>
                  <p className="mt-4 text-sm leading-5">
                    Featured woman collections that give you another vibe.
                  </p>
                </div>
                <a
                  href="#shop-now"
                  className="flex flex-col mt-4 text-base font-medium text-white w-[81px]"
                >
                  <span>Shop Now</span>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e40742fe053a27fd4ae0fe98d17023b98e0458d4b6c382de755fc8952018a510?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                    className="object-contain w-full aspect-[83.33]"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 justify-center items-center mt-8 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/16dde121b17351442b2a0c030d0bf38473187951e42801cd7ab240919bb600a7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain self-stretch my-auto aspect-[0.95] min-w-[240px] w-[270px]"
              alt="Speakers"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8dd2255c7c4f3d308e86cd70c570db08a89b1a05cd520223105648ebc43962d?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain self-stretch my-auto aspect-[0.95] min-w-[240px] w-[270px]"
              alt="Perfume"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalSection;
