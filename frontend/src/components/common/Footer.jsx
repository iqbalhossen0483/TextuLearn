import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const usefulLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#key-features" },
    { name: "Books", href: "/books" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact Us", href: "/contact" },
  ];

  const ourServices = [
    { name: "AI Writing Assistant", href: "/features/ai-writing" },
    { name: "Book Summaries", href: "/features/summaries" },
    { name: "Language Learning", href: "/features/language-learning" },
    { name: "Plagiarism Checker", href: "/features/plagiarism-check" },
    { name: "Text Paraphrasing", href: "/features/paraphrasing" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "Facebook", icon: FaFacebookF, href: "#" },
    { name: "Twitter", icon: FaTwitter, href: "#" },
    { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  ];

  return (
    <footer className='py-4 lg:py-8 bg-secondary'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          {/* Logo and Description */}
          <div className='md:col-span-2 lg:col-span-1'>
            <Link href='/' className='flex items-center'>
              <Image
                src='/logo.png'
                alt='Logo'
                width={100}
                height={100}
                className='h-13 w-32 object-contain'
              />
            </Link>
            <p className='mt-6 text-base text-gray-600 leading-relaxed'>
              Empowering you to write smarter, learn faster, and explore a
              universe of knowledge with AI-driven assistance and 500+
              educational books.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className='text-lg font-semibold text-primary-dark'>
              Useful Links
            </h3>
            <ul className='mt-5 space-y-2'>
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-base text-gray-700 hover:text-primary transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className='text-lg font-semibold text-primary-dark'>
              Our Features
            </h3>
            <ul className='mt-5 space-y-2'>
              {ourServices.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className='text-base text-gray-700 hover:text-primary transition-colors'
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className='text-lg font-semibold text-primary-dark'>Social</h3>
            <ul className='mt-5 space-y-2'>
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <Link
                    href={social.href}
                    className='flex items-center text-base text-gray-700 hover:text-primary transition-colors'
                  >
                    <social.icon className='w-5 h-5 mr-2' />
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-4 border-t border-divider pt-4 text-center'>
          <p className='text-base text-gray-500'>
            &copy; {new Date().getFullYear()} TextuLearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
