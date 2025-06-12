
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useMenu } from '../store/MenuContext';

const About = () => {
  const { getMenuByOrder } = useMenu();
  const aboutMenu = getMenuByOrder(2); // Assuming 'About' is the second menu item
  return (
    <>
      <section className="about-us" id={aboutMenu?.path || "about-us"}>
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
          <div className="row align-items-center w-100">
            <div className="col-lg-6 text-center text-lg-end">
              <img
                src="/images/kamrul_hasan_bio2.jpg"
                alt="kamrulhasan_bio"
                className="img-fluid profile-image"
              />
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <h2 className="title">{aboutMenu?.name || "আমার আমি"}</h2>
              <h3 className="subtitle">সাংবাদিকতা আমার সবকিছু</h3>
              <p className="description">
                বরেন্দ্রভূমির সন্তান। সাংবাদিকতা করছেন তিন দশক ধরে। অর্জনের ঝুলিতে আছে অপরাধবিষয়ক রিপোর্টিংয়ে দীর্ঘদিনের কাজের অভিজ্ঞতা। সেই সূত্রে জুটেছে দেশি-বিদেশি পুরস্কারও। বরেন্দ্রভূমির সন্তান। সাংবাদিকতা করছেন তিন দশক ধরে। অর্জনের ঝুলিতে আছে অপরাধবিষয়ক রিপোর্টিংয়ে দীর্ঘদিনের কাজের অভিজ্ঞতা। সেই সূত্রে জুটেছে দেশি-বিদেশি পুরস্কারও।বরেন্দ্রভূমির সন্তান। সাংবাদিকতা করছেন তিন দশক ধরে। অর্জনের ঝুলিতে আছে অপরাধবিষয়ক রিপোর্টিংয়ে দীর্ঘদিনের কাজের অভিজ্ঞতা। সেই সূত্রে জুটেছে দেশি-বিদেশি পুরস্কারও।বরেন্দ্রভূমির সন্তান। সাংবাদিকতা করছেন তিন দশক ধরে। অর্জনের ঝুলিতে আছে অপরাধবিষয়ক রিপোর্টিংয়ে দীর্ঘদিনের কাজের অভিজ্ঞতা। সেই সূত্রে জুটেছে দেশি-বিদেশি পুরস্কারও।
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
