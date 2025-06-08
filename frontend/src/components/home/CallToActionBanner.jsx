import Button from "@/components/libs/Button";
import Image from "next/image";

const CallToActionBanner = () => {
  return (
    <section className='bg-primary rounded-xl md:rounded-2xl mx-4 sm:mx-6 lg:mx-auto max-w-6xl'>
      <div className='container mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-8'>
        <div className='grid items-center gap-8 md:grid-cols-2 lg:gap-12'>
          <div className='text-white'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
              Supercharge Your Writing and Learning
            </h2>
            <p className='mt-4 text-lg sm:text-xl opacity-90'>
              Master every sentence, explore 500+ books, and rewrite like a pro
              with AI. Whether you’re a student, creator, or professional
              TextuLearn makes words work for you.
            </p>
            <p className='mt-6 text-base sm:text-lg font-medium opacity-95'>
              🔹 Write Smarter || 🔹 Learn Faster || 🔹 Think Bigger
            </p>
            <div className='mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
              <Button href='#' variant='contain' className='bg-primary-dark'>
                Start Exploring
              </Button>
              <Button
                href='#'
                variant='outline'
                className='border-white text-white hover:bg-white hover:text-primary'
              >
                How It Works
              </Button>
            </div>
          </div>
          <div className='flex justify-center md:justify-end'>
            <Image
              src='/mascot.png'
              alt='TextuLearn Mascot'
              width={300}
              height={300}
              className='object-contain'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
