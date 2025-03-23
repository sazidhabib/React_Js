import React from 'react';

const BookReadingSection = () => {
  return (
    <section className="boipora" id="bookreading">
      <div className="container">
        <h3 className="subheading">বই পড়া</h3>
        <h2 className="mainheading">পড়া পড়া এবং পড়া</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="icon-content">
              <div className="icon">
                <img src="/images/Book_Icon.JPG" alt="Book Icon" />
              </div>
              <div className="main-text">
                <p>
                  বই পড়া শখটা মানুষের সর্বশ্রেষ্ঠ শখ হলেও আমি কাউকে শখ হিসেবে বই পড়তে পরামর্শ দিতে চাইনে। প্রথমত সে পরামর্শ কেউ গ্রাহ্য করবেন না, কেননা আমরা জাত হিসেবে শৌখিন নই। দ্বিতীয়ত অনেকে তা কুপরামর্শ মনে করবেন কেননা আমাদের এখন ঠিক শখ করবার সময় নয়। আমাদের এই রোগ-শোক, দুঃখ-দারিদ্র্যের দেশে সুন্দর জীবন ধারণ করাই যখন হয়েছে প্রধান সমস্যা, তখন সেই জীবনকেই সুন্দর করা, মহৎ করার প্রস্তাব অনেকের কাছে নিরর্থক এবং নির্মমও ঠেকবে। আমরা সাহিত্যের রস উপভোগ করতে প্রস্তুত নই; কিন্তু শিক্ষার ফল লাভের জন্য আমরা সকলে উদ্‌বাহু। আমাদের বিশ্বাস, শিক্ষা আমাদের গায়ের জ্বালা ও চোখের জল দুই-ই দূর করবে।
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="jetuku-img">
              <img src="/images/Book.JPG" alt="Book" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookReadingSection;