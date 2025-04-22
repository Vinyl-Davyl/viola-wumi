import React, { useRef } from "react";
import S from "./SectionTwo.module.scss";

const SectionTwo: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <section id="section-two" data-scroll-section>
      <div className={S.section}>
        <div className={S.textWrapper}>
          <h2 className={S.title}>A Journey with Viola Wumi</h2>
          <p className={S.text}>
            Viola Wumi is a renowned fashion model celebrated for her incredible versatility and elegance on runways
            across the world. With a passion for sustainable fashion, she collaborates with brands that prioritize
            eco-friendly practices and innovative designs. Her stunning looks and unique style have garnered attention
            from top designers and magazines alike. Viola believes in empowering others through fashion and continues to
            inspire with her work. Join her on this exciting journey in the fashion industry!
          </p>
          <img
            alt=""
            ref={imageRef}
            className={S.signature}
            src="https://res.cloudinary.com/dnnkadysr/image/upload/v1745291918/viola-wunmi/bta2csyrpk49r2qe4dis.jpg"
          />

          <p className={S.person}>Viola Wumi</p>
        </div>
        <div className={S.imageWrapper}>
          <div className={S.imageContainer}>
            <div data-scroll className={S.image} data-scroll-speed="-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
