import React from "react";
import S from "./SectionSix.module.scss";

const SectionSix: React.FC = () => {
  return (
    <section data-scroll-section>
      <div className={S.section}>
        <div data-scroll data-scroll-speed="-10" className={S.videoWrapper}>
          <img src="/src/assets/vw20.jpg" alt="" className={S.img} />
        </div>
      </div>
    </section>
  );
};

export default SectionSix;
