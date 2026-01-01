export const QuoteCircle = ({
  variant = "solid",
  text,
  icon: Icon,
  href = "#",
  className = "",
  ...props
}) => {
  const btn =
    "flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-full border-none p-4 text-center no-underline transition-all duration-300 hover:scale-105";
  const btnIcon =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors";
  const btnText = "text-base font-medium text-white";

  const variantBtn = {
    solid: {
      container: "bg-main-500 hover:bg-main-600",
      icon: "text-main-500",
    },
    dark: {
      container: "bg-main-700 hover:bg-main-800",
      icon: "text-main-700",
    },
  };

  const currentVariant = variantBtn[variant] || variantBtn.solid;

  return (
    <a
      href={href}
      className={`${btn} ${currentVariant.container} ${className}`.trim()}
      {...props}
    >
      <div className={`${btnIcon} ${currentVariant.icon}`}>
        {Icon && <Icon weight="bold" size={20} />}
      </div>

      <span className={`${btnText}`}>{text}</span>
    </a>
  );

  /*
    <QuoteCircle
      variant="solid"
      text="Request Quote"
      icon={ArrowUpRightIcon}
    />

    <QuoteCircle
      variant="dark"
      text="Request Quote"
      icon={ArrowUpRightIcon}
    />
  */
};
