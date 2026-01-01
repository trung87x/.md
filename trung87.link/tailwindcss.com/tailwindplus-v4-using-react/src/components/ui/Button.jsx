export const Button = ({
  mode = "primary",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  className = "",
  ...props
}) => {
  const btn =
    "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-main font-medium text-base transition-all duration-200 cursor-pointer border no-underline leading-none flex-shrink-0";

  const btnText = "flex-shrink-0";

  const modeBtn = {
    primary: "bg-main-500 text-white border-transparent hover:bg-main-600",
    dark: "bg-main-600 text-white border-transparent hover:bg-main-700",
    outline: "border-main-500 text-main-500 bg-transparent hover:bg-main-50",
    "outline-dark":
      "border-main-600 text-main-600 bg-main-50 hover:bg-main-100",
    soft: "border-main-100 text-main-500 bg-transparent hover:border-main-200",
    "soft-dark":
      "border-main-500 text-main-500 bg-transparent hover:border-main-600",
    ghost: "bg-main-50 text-main-600 border-transparent hover:bg-main-100",
    "ghost-dark":
      "bg-main-100 text-main-800 border-transparent hover:bg-main-100",
  };

  const currentMode = modeBtn[mode] || modeBtn.primary;

  return (
    <button className={`${btn} ${currentMode} ${className}`.trim()} {...props}>
      {LeftIcon && <LeftIcon weight="bold" size={20} color="currentColor" />}

      <span className={btnText}>{children}</span>

      {RightIcon && <RightIcon weight="bold" size={20} color="currentColor" />}
    </button>
  );

  /* 
    <Button mode="primary">Say hello</Button>
    <Button mode="dark">Say hello</Button>
    <Button mode="primary" rightIcon={CaretRightIcon}>Say hello</Button>
    <Button mode="primary" leftIcon={MusicNotesIcon}>Say hello</Button>
    <Button mode="primary" leftIcon={MusicNotesIcon} rightIcon={CaretRightIcon}>Say hello</Button>

    <Button mode="outline">Say hello</Button>
    <Button mode="outline-dark">Say hello</Button>
    <Button mode="outline" rightIcon={CaretRightIcon}>Say hello</Button>
    <Button mode="outline" leftIcon={MusicNotesIcon}>Say hello</Button>
    <Button mode="outline" leftIcon={MusicNotesIcon} rightIcon={CaretRightIcon}>Say hello</Button>

    <Button mode="soft">Say hello</Button>
    <Button mode="soft-dark">Say hello</Button>
    <Button mode="soft" rightIcon={CaretRightIcon}>Say hello</Button>
    <Button mode="soft" leftIcon={MusicNotesIcon}>Say hello</Button>
    <Button mode="soft" leftIcon={MusicNotesIcon} rightIcon={CaretRightIcon}>Say hello</Button>

    <Button mode="ghost">Say hello</Button>
    <Button mode="ghost-dark">Say hello</Button>
    <Button mode="ghost" rightIcon={CaretRightIcon}>Say hello</Button>
    <Button mode="ghost" leftIcon={MusicNotesIcon}>Say hello</Button>
    <Button mode="ghost" leftIcon={MusicNotesIcon} rightIcon={CaretRightIcon}>Say hello</Button>
  */
};
