export const Text = ({
  mode = "body-regular-400",
  as: Component = "p",
  className = "",
  children,
  ...props
}) => {
  const txt = "font-sans text-main-900 antialiased";

  const modeTxt = {
    // Headings (font-semibold)
    "display-01": "text-[80px]/[80px] font-semibold",
    h1: "text-[48px]/[56px] font-semibold",
    h2: "text-[40px]/[48px] font-semibold",
    h3: "text-[32px]/[40px] font-semibold",
    h4: "text-[24px]/[32px] font-semibold",
    h5: "text-[18px]/[64px] font-semibold", // Số liệu bạn đo

    // Captions (semibold + uppercase)
    "cap-01": "text-[20px]/[32px] font-semibold uppercase",
    "cap-02": "text-[18px]/[28px] font-semibold uppercase",
    "cap-03": "text-[16px]/[24px] font-semibold uppercase",
    "cap-04": "text-[14px]/[20px] font-semibold uppercase",
    "cap-05": "text-[12px]/[16px] font-semibold uppercase",
    "cap-06": "text-[10px]/[12px] font-semibold uppercase",

    // Body 400 (font-normal)
    "body-xxl-400": "text-[24px]/[36px] font-normal",
    "body-xl-400": "text-[20px]/[32px] font-normal",
    "body-lg-400": "text-[18px]/[26px] font-normal",
    "body-reg-400": "text-[16px]/[24px] font-normal",
    "body-sm-400": "text-[14px]/[20px] font-normal",
    "body-xs-400": "text-[12px]/[18px] font-normal",

    // Body 500 (font-medium)
    "body-xxl-500": "text-[24px]/[36px] font-medium",
    "body-xl-500": "text-[20px]/[32px] font-medium",
    "body-lg-500": "text-[18px]/[26px] font-medium",
    "body-reg-500": "text-[16px]/[24px] font-medium",
    "body-sm-500": "text-[14px]/[20px] font-medium",
    "body-xs-500": "text-[12px]/[18px] font-medium",
  };

  const currentMode = modeTxt[mode] || modeTxt["body-regular-400"];

  return (
    <Component
      className={`${txt} ${currentMode} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
  /*
    <div className="flex flex-col gap-4">
        <Text mode="display-01" as="h1">Display/01</Text>
        <Text mode="h1" as="h2">Heading/01</Text>
        <Text mode="h2" as="h3">Heading/02</Text>
        <Text mode="h3" as="h4">Heading/03</Text>
        <Text mode="h4" as="h5">Heading/04</Text>
        <Text mode="h5" as="h6">Heading/05</Text>
    </div>

    <div className="flex flex-col gap-4">
        <Text mode="cap-01">Caption/01</Text>
        <Text mode="cap-02">Caption/02</Text>
        <Text mode="cap-03">Caption/03</Text>
        <Text mode="cap-04">Caption/04</Text>
        <Text mode="cap-05">Caption/05</Text>
        <Text mode="cap-06">Caption/06</Text>
    </div>

    <div className="flex flex-col gap-4">
        <Text mode="body-xxl-400">Body/XXL/400</Text>
        <Text mode="body-xl-400">Body/XL/400</Text>
        <Text mode="body-lg-400">Body/Large/400</Text>
        <Text mode="body-reg-400">Body/Regular/400</Text>
        <Text mode="body-sm-400">Body/Small/400</Text>
        <Text mode="body-xs-400">Body/XS/400</Text>
    </div>

    <div className="flex flex-col gap-4">
        <Text mode="body-xxl-500">Body/XXL/500</Text>
        <Text mode="body-xl-500">Body/XL/500</Text>
        <Text mode="body-lg-500">Body/Large/500</Text>
        <Text mode="body-reg-500">Body/Regular/500</Text>
        <Text mode="body-sm-500">Body/Small/500</Text>
        <Text mode="body-xs-500">Body/XS/500</Text>
    </div>

    <Text
        as="a"
        href="/projects"
        mode="body-reg-500"
        className="hover:text-main-500 cursor-pointer transition-colors"
    >
        Projects
    </Text>
  */
};
