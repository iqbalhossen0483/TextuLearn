import Link from "next/link";

const Button = ({
  href,
  variant = "contain",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md transition-colors duration-200 font-medium flex items-center gap-1 justify-center";

  const variantStyles = {
    contain: "bg-primary text-white hover:bg-primary-dark",
    outline: "text-primary border border-primary hover:bg-gray-100",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type='button' className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
