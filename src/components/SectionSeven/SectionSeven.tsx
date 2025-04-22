import React from "react";
import Marquee from "react-fast-marquee";
import S from "./SectionSeven.module.scss";
import { ReactComponent as Line } from "../../svgs/line.svg";
import { ReactComponent as Plus } from "../../svgs/plus.svg";

type SectionSevenProps = {
  windowWidth: number;
};

const SectionSeven: React.FC<SectionSevenProps> = ({ windowWidth }) => {
  return (
    <section data-scroll-section>
      <div className={S.section}>
        <div className={S.marqueeSection}>
          <Marquee pauseOnHover gradient={false} className={S.marquee} speed={windowWidth > 1024 ? 15 : 80}>
            <p className={S.marqueeText}>Essence</p>
            <p className={S.marqueeText}>Essence</p>
            <p className={S.marqueeText}>Essence</p>
            <p className={S.marqueeText}>Essence</p>
            <p className={S.marqueeText}>Essence</p>
          </Marquee>
        </div>
        <div className={S.main}>
          <div className={S.up}>
            <div className={S.left}>
              <div className={S.row}>
                <Line id={"lineRef"} width="5vh" height="0.33vh" className={S.line1} />
                <p className={S.largeText}>Grace</p>
              </div>
              <div className={S.row2}>
                <Plus />
              </div>
              <div className={S.row3}>
                <p className={S.largeText}>High Fashion</p>
                <Line id={"lineRef"} width="5vh" height="0.33vh" className={S.line2} />
              </div>
            </div>
            <div className={S.right}>
              <p className={S.smallText}>
                Viola believes that fashion is an art form, personality shines through authentic expression, and true
                beauty comes from confidence and the ability to transform with each new creative concept.
              </p>
            </div>
          </div>
          <div className={S.down}>
            <img
              className={S.img}
              src={
                windowWidth > 1024
                  ? "https://res.cloudinary.com/dnnkadysr/image/upload/v1745291923/viola-wunmi/s3eikmudh2nok65gyewl.jpg"
                  : "https://res.cloudinary.com/dnnkadysr/image/upload/v1745291923/viola-wunmi/s3eikmudh2nok65gyewl.jpg"
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default SectionSeven;
