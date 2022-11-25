import React from "react";
import Header from "./../components/Header";
import ProductSection from "./../components/homeComponents/ProductSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import Category from "../components/homeComponents/Category";

const HomeScreen = ({match}) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  console.log(keyword)
  const pagenumber = match.params.pagenumber ? match.params.pagenumber : 1;
  
  console.log(pagenumber)
  return (
    <div>
      <Header />
      <Category/>
      <ProductSection keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
