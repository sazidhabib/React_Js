import React from "react";

const stories = [
  {
    id: 1,
    title: "অবশেষে মুচলেকায় মিলল মুক্তি",
    description:
      "নভেম্বরের ঠান্ডাটা তখনো জেঁকে বসেনি, কিন্তু তুলনামূলক গায়ে হালকা শীতের কাপড়। মোটরবাইক জোরে চালালেই ঠান্ডা লাগছে। বাইকের পেছনে সহকর্মী বন্ধু আহমেদ দীপু, পায়ের চিকিৎসা করিয়ে কিছুদিন আগে ভারত থেকে ফিরেছে।",
  },
  {
    id: 2,
    title: "অবশেষে মুচলেকায় মিলল মুক্তি",
    description:
      "নভেম্বরের ঠান্ডাটা তখনো জেঁকে বসেনি, কিন্তু তুলনামূলক গায়ে হালকা শীতের কাপড়। মোটরবাইক জোরে চালালেই ঠান্ডা লাগছে। বাইকের পেছনে সহকর্মী বন্ধু আহমেদ দীপু, পায়ের চিকিৎসা করিয়ে কিছুদিন আগে ভারত থেকে ফিরেছে।",
  },
  {
    id: 3,
    title: "অবশেষে মুচলেকায় মিলল মুক্তি",
    description:
      "নভেম্বরের ঠান্ডাটা তখনো জেঁকে বসেনি, কিন্তু তুলনামূলক গায়ে হালকা শীতের কাপড়। মোটরবাইক জোরে চালালেই ঠান্ডা লাগছে। বাইকের পেছনে সহকর্মী বন্ধু আহমেদ দীপু, পায়ের চিকিৎসা করিয়ে কিছুদিন আগে ভারত থেকে ফিরেছে।",
  },
];

const Story = ({ title, description }) => {
  return (
    <div className="common-story">
      <div className="row">
        <div className="col-4">
          <div className="news-item p-3 mb-4">
            <h4 className="news-title">{title}</h4>
          </div>
        </div>
        <div className="col-8">
          <p className="news-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Asarernoy = () => {
  return (
    <>
    <section className="asarernoy" id="asarernoy">
      <div className="container d-flex align-items-center justify-content-center">
        <div className="row w-100 mx-3">
          <div className="col-4">
            <div className="col-12 text-center">
              <img
                className="asarernoy-img img-fluid header-image"
                src="/images/আষাঢ়ে নয়.jpg"
                alt="Header Image"
              />
            </div>
          </div>
          <div>
            {stories.map((story) => (
              <Story key={story.id} {...story} />
            ))}
          </div>
        </div>
      </div>
    </section>
    <div className="commonmenusty">
    </div>
    </>
  );
};

export default Asarernoy;
