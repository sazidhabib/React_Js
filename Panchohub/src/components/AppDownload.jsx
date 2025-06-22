import React from 'react';

const AppDownload = () => {
    return (
        <div className="relative min-h-screen w-full">
            {/* Hero Section */}
            <header className="grid !min-h-[49rem] bg-blue-600 px-8">
                <div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
                    {/* Text Content */}
                    <div className="col-span-1 text-left">
                        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            Your Perfect <br /> Learning App
                        </h1>
                        <p className="mb-7 text-xl text-white md:pr-16 xl:pr-28">
                            Our app is here to empower you on your quest for knowledge,
                            anytime and anywhere.
                        </p>
                        <h6 className="mb-4 text-lg font-semibold text-white">
                            Get the app
                        </h6>
                        <div className="flex flex-col gap-2 md:mb-2 md:w-10/12 md:flex-row">
                            <button
                                className="flex items-center justify-center gap-3 rounded-lg bg-white px-6 py-3 text-gray-900 transition-colors hover:bg-gray-100"
                            >
                                <img
                                    src="image/download-1.svg"
                                    alt="App Store"
                                    className="h-6 w-6"
                                />
                                App Store
                            </button>
                            <button
                                className="flex items-center justify-center gap-3 rounded-lg bg-white px-6 py-3 text-gray-900 transition-colors hover:bg-gray-100"
                            >
                                <img
                                    src="/logos/logo-google.png"
                                    alt="Google Play"
                                    className="h-6 w-6"
                                />
                                Google Play
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <img
                        src="image/iphones.png"
                        alt="App Preview"
                        className="col-span-1 my-20 h-full max-h-[30rem] -translate-y-32 md:max-h-[36rem] lg:my-0 lg:ml-auto lg:max-h-[40rem] lg:translate-y-0"
                    />
                </div>
            </header>

            {/* Info Card */}
            <div className="mx-8 -mt-24 rounded-xl bg-white p-5 shadow-md lg:mx-16 md:p-14 text-left">
                <div>
                    <h3 className="mb-3 text-2xl font-semibold text-blue-gray-900 md:text-3xl">
                        Learning App
                    </h3>
                    <p className="font-normal text-gray-500">
                        Download our app to dive into a vast library of courses, tutorials,
                        and study materials on a wide range of subjects - from programming
                        and language learning to personal development and beyond
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppDownload;