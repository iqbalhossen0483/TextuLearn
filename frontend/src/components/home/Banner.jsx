import Button from "@/components/libs/Button";
import Image from "next/image";

const Banner = () => {
  return (
    <section className='bg-secondary'>
      <div className='container mx-auto px-6 py-8 md:py-18 flex flex-col md:flex-row items-center'>
        {/* Text Content */}
        <div className='md:w-1/2 text-center md:text-left mb-10 md:mb-0'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4'>
            Smarter Learning Made Simple With Our
          </h1>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6'>
            AI Learning Assistant 🟩
          </h2>
          <p className='text-gray-600 text-base font-medium md:text-lg lg:text-xl mb-8 leading-relaxed'>
            Empower your study experience with personalized, intelligent support
            from our AI tutor designed to help you read, write, and understand
            better every day.
          </p>
          <Button
            href='/register'
            variant='contain'
            className='text-lg px-8 py-3'
          >
            🟩 Start Your Learning Journey
          </Button>
        </div>

        {/* Image */}
        <div className='md:w-1/2 flex justify-center md:justify-end'>
          <Image
            src='/banner-elustator.png'
            alt='AI Learning Assistant Illustration'
            width={400}
            height={400}
            className='object-contain rounded-3xl'
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
