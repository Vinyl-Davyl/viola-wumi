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
            Viola Wumi is a visionary creative and fashion icon, celebrated for her dynamic presence on global runways
            and her influential style. With a passion for sustainable fashion, she collaborates with innovative brands
            to redefine modern elegance. Her bold aesthetic and creative direction have captivated top designers,
            magazines, and a growing digital audience. Viola empowers others through fashion, blending artistry with
            advocacy to inspire change. Join her as she shapes the future of style—where modeling meets meaningful
            influence.
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
