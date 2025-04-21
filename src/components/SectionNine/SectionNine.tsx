import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import S from "./SectionNine.module.scss";

type SectionEightProps = {
  windowWidth: number;
};

const SectionEight: React.FC<SectionEightProps> = ({ windowWidth }) => {
  const textScrollSpeed = windowWidth <= 1024 ? -5 : 3;

  return (
    <section id="section-nine" data-scroll-section>
      <div className={S.section}>
        <div className={S.left}>
          <p className={S.text}>Explore more of Viola's stunning portfolio</p>
          <Link to="/gallery">
            <div className={S.button}>
              <Button use="section-nine" text="view gallery" />
            </div>
          </Link>
        </div>
        <div className={S.right}>
          <img className={S.image1} src="/src/assets/vw15.jpg" alt="" />
          <img className={S.image2} src="/src/assets/vw25.jpg" alt="" />
          <img className={S.image3} src="/src/assets/vw17.jpg" alt="" />
          <p data-scroll className={S.title} data-scroll-direction="horizontal" data-scroll-speed={textScrollSpeed}>
            Viola ✿ Wumi
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionEight;
