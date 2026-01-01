export const ButtonCircle = ({
  mode = "outline",
  icon: Icon,
  className = "",
  ...props
}) => {
  const btn =
    "h-12 w-12 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer flex-shrink-0";

  const modeBtn = {
    outline: "border-main-100 bg-white text-main-900 hover:bg-main-50",
    solid: "bg-main-500 text-white border-transparent hover:bg-main-600",
    dark: "bg-main-600 text-white border-transparent hover:bg-main-700",
  };

  const currentMode = modeBtn[mode] || modeBtn.outline;

  return (
    <button className={`${btn} ${currentMode} ${className}`.trim()} {...props}>
      {Icon && <Icon weight="bold" size={20} color="currentColor" />}
    </button>
  );

  /* 
    <ButtonCircle icon={GearIcon} />
    <ButtonCircle mode="dark" icon={BellIcon} />
    <ButtonCircle
      icon={GearIcon}
      onClick={() => console.log("Settings clicked")}
    />
    <ButtonCircle mode="outline" icon={CaretLeftIcon} />
    <ButtonCircle mode="solid" icon={CaretRightIcon} />
    <ButtonCircle mode="solid" icon={EnvelopeSimpleIcon} />
    <ButtonCircle mode="dark" icon={EnvelopeSimpleIcon} />
  */
};
