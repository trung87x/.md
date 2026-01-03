// import PreviewWrapper from "@/components/PreviewWrapper";
import PreviewWrapper from "@/features/preview-system/PreviewWrapper";

// Import component từ features bởi vì trang (page) chỉ nên làm nhiệm vụ layout,
// còn logic hiển thị chi tiết nằm ở features.

// 1. Simple centered
import SimpleCentered from "@/component-plus/marketing/1-page-sections/01-hero-sections/simple_centered";
import SimpleCenteredRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/simple_centered.jsx?raw";

// 2. Split with screenshot
import SplitWithScreenshot from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_screenshot_on_dark";
import SplitWithScreenshotRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_screenshot_on_dark.jsx?raw";

// 3. Split with bordered screenshot
import SplitWithBorderedScreenshot from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_screenshot";
import SplitWithBorderedScreenshotRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_screenshot.jsx?raw";

// 4. Split with code example
import SplitWithCodeExample from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_code_example";
import SplitWithCodeExampleRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_code_example.jsx?raw";

// 5. Simple centered with background image
import SimpleCenteredWithBackgroundImage from "@/component-plus/marketing/1-page-sections/01-hero-sections/simple_centered_with_background_image";
import SimpleCenteredWithBackgroundImageRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/simple_centered_with_background_image.jsx?raw";

// 6. With bordered app screenshot
import WithBorderedAppScreenshot from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_app_screenshot";
import WithBorderedAppScreenshotRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_app_screenshot.jsx?raw";

// 7. With app screenshot
import WithAppScreenshot from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_app_screenshot_on_dark";
import WithAppScreenshotRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_app_screenshot_on_dark.jsx?raw";

// 8. With phone mockup
import WithPhoneMockup from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_phone_mockup";
import WithPhoneMockupRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_phone_mockup.jsx?raw";

// 9. Split with image
import SplitWithImage from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_image";
import SplitWithImageRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/split_with_image.jsx?raw";

// 10. With angled image on right
import WithAngledImageOnRight from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_angled_image_on_right";
import WithAngledImageOnRightRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_angled_image_on_right.jsx?raw";

// 11. With image tiles
import WithImageTiles from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_image_tiles";
import WithImageTilesRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_image_tiles.jsx?raw";

// 12. With offset image
import WithOffsetImage from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_offset_image";
import WithOffsetImageRaw from "@/component-plus/marketing/1-page-sections/01-hero-sections/with_offset_image.jsx?raw";

const HeroDemoPage = () => {
  return (
    <div className="space-y-10">
      {/* 01. Simple Centered */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          01. Simple Centered
        </h2>
        <PreviewWrapper name="Simple Centered Hero" code={SimpleCenteredRaw}>
          <SimpleCentered />
        </PreviewWrapper>
      </section>

      {/* 02. Split with screenshot */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          02. Split with screenshot
        </h2>
        <PreviewWrapper
          name="Split with screenshot"
          code={SplitWithScreenshotRaw}
        >
          <SplitWithScreenshot />
        </PreviewWrapper>
      </section>

      {/* 03. Split with bordered screenshot */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          03. Split with bordered screenshot
        </h2>
        <PreviewWrapper
          name="Split with bordered screenshot"
          code={SplitWithBorderedScreenshotRaw}
        >
          <SplitWithBorderedScreenshot />
        </PreviewWrapper>
      </section>

      {/* 04. Split with code example */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          04. Split with code example
        </h2>
        <PreviewWrapper
          name="Split with code example"
          code={SplitWithCodeExampleRaw}
        >
          <SplitWithCodeExample />
        </PreviewWrapper>
      </section>

      {/* 05. Simple centered with background image */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          05. Simple centered with background image
        </h2>
        <PreviewWrapper
          name="Simple centered with background image"
          code={SimpleCenteredWithBackgroundImageRaw}
        >
          <SimpleCenteredWithBackgroundImage />
        </PreviewWrapper>
      </section>

      {/* 06. With bordered app screenshot */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          06. With bordered app screenshot
        </h2>
        <PreviewWrapper
          name="With bordered app screenshot"
          code={WithBorderedAppScreenshotRaw}
        >
          <WithBorderedAppScreenshot />
        </PreviewWrapper>
      </section>

      {/* 07. With app screenshot */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          07. With app screenshot
        </h2>
        <PreviewWrapper name="With app screenshot" code={WithAppScreenshotRaw}>
          <WithAppScreenshot />
        </PreviewWrapper>
      </section>

      {/* 08. With phone mockup */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          08. With phone mockup
        </h2>
        <PreviewWrapper name="With phone mockup" code={WithPhoneMockupRaw}>
          <WithPhoneMockup />
        </PreviewWrapper>
      </section>

      {/* 09. Split with image */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          09. Split with image
        </h2>
        <PreviewWrapper name="Split with image" code={SplitWithImageRaw}>
          <SplitWithImage />
        </PreviewWrapper>
      </section>

      {/* 10. With angled image on right */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          10. With angled image on right
        </h2>
        <PreviewWrapper
          name="With angled image on right"
          code={WithAngledImageOnRightRaw}
        >
          <WithAngledImageOnRight />
        </PreviewWrapper>
      </section>

      {/* 11. With image tiles */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          11. With image tiles
        </h2>
        <PreviewWrapper name="With image tiles" code={WithImageTilesRaw}>
          <WithImageTiles />
        </PreviewWrapper>
      </section>

      {/* 12. With offset image */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          12. With offset image
        </h2>
        <PreviewWrapper name="With offset image" code={WithOffsetImageRaw}>
          <WithOffsetImage />
        </PreviewWrapper>
      </section>
    </div>
  );
};

export default HeroDemoPage;
