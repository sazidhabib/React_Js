import React from "react";
import HtmlRenderer from "./HtmlRenderer";

export const DoctorContent = ({ item, onShowChambers }) => (
  <>
    <h2 className="text-xl font-semibold mb-2 text-center">{item.dr_name}</h2>
    <div className="space-y-2 text-sm text-left">
      {/* Doctor specific content */}
      {item.category && (
        <p>
          <strong>বিশেষজ্ঞ:</strong> {item.category}
        </p>
      )}
      {item.education_qualify && (
        <p>
          <strong>শিক্ষাগত যোগ্যতা:</strong> {item.education_qualify}
        </p>
      )}
      {item.current_servise && (
        <p>
          <strong>বর্তমান কর্মস্থল:</strong> {item.current_servise}
        </p>
      )}
      {item.spacialist && (
        <div>
          <span className="font-bold">যেসব রোগের চিকিৎসা করেন:</span>
          <HtmlRenderer encodedHtml={item.spacialist} />
        </div>
      )}
      {item.upazila && (
        <p>
          <strong>উপজেলা:</strong> {item.upazila}
        </p>
      )}
      {item.address && (
        <p>
          <strong>বিস্তারিত ঠিকানা:</strong> {item.address}
        </p>
      )}
      {item.contact && (
        <p>
          <strong>যোগাযোগ নম্বর:</strong> {item.contact}
        </p>
      )}
      {item.facilities && (
        <p>
          <strong>সুযোগ-সুবিধা:</strong> {item.facilities}
        </p>
      )}
      {item.chambers?.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => onShowChambers(item.chambers)}
            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200"
          >
            {item.chambers.length} Chamber(s) - Click to view
          </button>
        </div>
      )}
    </div>
  </>
);

export const ShoppingContent = ({ item }) => (
  <>
    <h2 className="text-xl font-semibold mb-2 text-center">
      {item.title || item.hp_name || item.name || item.place_name}
    </h2>
    <div className="space-y-2 text-sm text-left">
      {item.category && (
        <p>
          <strong>শপিং এর ধরণ: </strong>
          {item.category}
        </p>
      )}
      {item.details && (
        <div>
          <span className="font-bold">বিস্তারিত:</span>
          <HtmlRenderer encodedHtml={item.details} />
        </div>
      )}
      {item.price && (
        <p>
          <strong>মূল্য: </strong>
          {item.price}
        </p>
      )}

      {item.address && (
        <p>
          <strong>বিস্তারিত ঠিকানা: </strong>
          {item.address}
        </p>
      )}

      {item.upazila && (
        <p>
          <strong>উপজেলা:</strong> {item.upazila}
        </p>
      )}
      {item.contact && (
        <p>
          <strong>যোগাযোগ নম্বর:</strong> {item.contact}
        </p>
      )}
    </div>
  </>
);

export const VehicleRentContent = ({ item }) => (
  <>
    <h2 className="text-xl font-semibold mb-2 text-center">
      {item.title || item.name}
    </h2>
    <div className="space-y-2 text-sm text-left">
      {item.category && (
        <p>
          <strong>গাড়ির ধরণ: </strong>
          {item.category}
        </p>
      )}
      {item.driver_name && (
        <p>
          <strong>ড্রাইভারের নাম: </strong>
          {item.driver_name}
        </p>
      )}
      {item.capacity && (
        <p>
          <strong>ধারণ ক্ষমতা: </strong>
          {item.capacity}
        </p>
      )}
      {item.seats && (
        <p>
          <strong>সিট সংখ্যা: </strong>
          {item.seats}
        </p>
      )}
      {item.others_info && (
        <p>
          <strong>গাড়ি ভাড়ার বেপারে বিস্তারিত: </strong>
          {item.others_info}
        </p>
      )}

      {item.facilities && (
        <p>
          <span className="font-bold">সুযোগ-সুবিধা:</span>
          <HtmlRenderer encodedHtml={item.facilities} />
        </p>
      )}
      {item.address && (
        <p>
          <strong>বিস্তারিত ঠিকানা: </strong>
          {item.address}
        </p>
      )}
      {item.upazila && (
        <p>
          <strong>উপজেলা:</strong> {item.upazila}
        </p>
      )}
      {item.contact && (
        <p>
          <strong>যোগাযোগ নম্বর:</strong> {item.contact}
        </p>
      )}
    </div>
  </>
);

export const DefaultContent = ({ item, slug }) => (
  <>
    <h2 className="text-xl font-semibold mb-2 text-center">
      {item.title ||
        item.hp_name ||
        item.name ||
        item.place_name ||
        item.job_title}
    </h2>
    <div className="space-y-2 text-sm text-left">
      {item.org_name && (
        <p>
          <strong>প্রতিষ্ঠানের নাম: </strong>
          {item.org_name}
        </p>
      )}
      {item.email && (
        <p>
          <strong>প্রতিষ্ঠানের ইমেইল: </strong>
          {item.email}
        </p>
      )}
      {item.position && (
        <p>
          <strong>পদের নাম: </strong>
          {item.position}
        </p>
      )}
      {item.vacancy && (
        <p>
          <strong>পদের সংখ্যা: </strong>
          {item.vacancy}
        </p>
      )}
      {item.education_qualify && (
        <p>
          <strong>শিক্ষাগত যোগ্যতা প্রয়োজন: </strong>
          {item.education_qualify}
        </p>
      )}
      {item.experience && (
        <p>
          <strong>অভিজ্ঞতা প্রয়োজন: </strong>
          {item.experience}
        </p>
      )}

      {item.salary && (
        <p>
          <strong>বেতন: </strong>
          {item.salary}
        </p>
      )}
      {item.driver_name && (
        <p>
          <strong>ড্রাইভারের নাম: </strong>
          {item.driver_name}
        </p>
      )}
      {item.capacity && (
        <p>
          <strong>ধারণ ক্ষমতা: </strong>
          {item.capacity}
        </p>
      )}
      {item.seats && (
        <p>
          <strong>সিট সংখ্যা: </strong>
          {item.seats}
        </p>
      )}
      {item.description && (
        <div>
          <span className="font-bold">বিস্তারিত:</span>
          <HtmlRenderer encodedHtml={item.description} />
        </div>
      )}
      {item.place_details && (
        <div>
          <span className="font-bold">বিস্তারিত:</span>
          <HtmlRenderer encodedHtml={item.place_details} />
        </div>
      )}
      {item.details && (
        <div>
          <span className="font-bold">বিস্তারিত:</span>
          <HtmlRenderer encodedHtml={item.details} />
        </div>
      )}
      {item.category && (
        <p>
          <strong>বাসার ধরণ: </strong>
          {item.category}
        </p>
      )}
      {item.blood_gorup && (
        <p>
          <strong>ব্লাড গ্রুপ: </strong>
          {item.blood_gorup}
        </p>
      )}
      {item.bag_amounts && (
        <p>
          <strong>রক্তের পরিমাণ: </strong>
          {item.bag_amounts}
        </p>
      )}
      {item.last_donate && (
        <p>
          <strong>সর্বশেষ রক্তদান: </strong>
          {item.last_donate}
        </p>
      )}
      {item.dateline && (
        <p>
          <strong>
            {slug === "jobnews"
              ? "আবেদনের সর্বশেষ তারিখ: "
              : "তারিখ এবং সময়: "}
          </strong>
          {item.dateline}
        </p>
      )}
      {item.gender && (
        <p>
          <strong>লিঙ্গ: </strong>
          {item.gender}
        </p>
      )}
      {item.comment && (
        <p>
          <strong>মন্তব্য: </strong>
          {item.comment}
        </p>
      )}
      {item.gift && (
        <p>
          <strong>উপহার: </strong>
          {item.gift}
        </p>
      )}
      {item.rent_available && (
        <p>
          <strong>কোন মাস থেকে ভাড়া হবে: </strong>
          {item.rent_available}
        </p>
      )}
      {item.area && (
        <p>
          <strong>আয়তন: </strong>
          {item.area}
        </p>
      )}
      {item.number_of_rooms && (
        <p>
          <strong>রুম সংখ্যা: </strong>
          {item.number_of_rooms}
        </p>
      )}
      {item.number_of_bath && (
        <p>
          <strong>বাথরুম সংখ্যা: </strong>
          {item.number_of_bath}
        </p>
      )}
      {item.rent_amount && (
        <p>
          <strong>ভাড়ার পরিমান: </strong>
          {item.rent_amount}
        </p>
      )}
      {item.facilities && (
        <p>
          <span className="font-bold">সুযোগ-সুবিধা:</span>
          <HtmlRenderer encodedHtml={item.facilities} />
        </p>
      )}
      {item.services && (
        <p>
          <span className="font-bold">সেবা সম্পর্কিত তথ্য:</span>
          <HtmlRenderer encodedHtml={item.services} />
        </p>
      )}
      {item.address && (
        <p>
          <strong>বিস্তারিত ঠিকানা: </strong>
          {item.address}
        </p>
      )}
      {item.hp_address && (
        <p>
          <strong>হাসপাতালের ঠিকানা: </strong>
          {item.hp_address}
        </p>
      )}
      {item.others_info && (
        <p>
          <strong>অন্যান্য তথ্য: </strong>
          {item.others_info}
        </p>
      )}
      {item.upazila && (
        <p>
          <strong>উপজেলা:</strong> {item.upazila}
        </p>
      )}
      {item.contact && (
        <p>
          <strong>যোগাযোগ নম্বর:</strong> {item.contact}
        </p>
      )}
    </div>
  </>
);
