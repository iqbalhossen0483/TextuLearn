import Banner from "@/components/home/Banner";
import CallToActionBanner from "@/components/home/CallToActionBanner";
import Faq from "@/components/home/Faq";
import KeyFeatures from "@/components/home/KeyFeatures";
import WhyChoose from "@/components/home/WhyChoose";

export default function Home() {
  return (
    <main>
      <Banner />
      <KeyFeatures />
      <WhyChoose />
      <Faq />
      <CallToActionBanner />
      <div className='mb-8'></div>
    </main>
  );
}
