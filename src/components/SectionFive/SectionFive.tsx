import gsap from "gsap";
import Marquee from "react-fast-marquee";
import S from "./SectionFive.module.scss";
import React, { useEffect, useRef } from "react";
import { ReactComponent as Line } from "../../svgs/line.svg";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

type SectionFiveProps = {
  windowWidth: number;
};

const SectionFive: React.FC<SectionFiveProps> = ({ windowWidth }) => {
  const title1ScrollSpeed = windowWidth <= 1024 ? -7.5 : 1.2;
  const title2ScrollSpeed = windowWidth <= 1024 ? 6 : -1.2;

  const ref = useRef<HTMLParagraphElement>(null);
  const isOnScreen = useIntersectionObserver(ref, 1);

  useEffect(() => {
    if (isOnScreen) {
      gsap.to("#lineRef > line", {
        duration: 2,
        ease: "expo.out",
        strokeDashoffset: 0,
      });
    }
  }, [isOnScreen]);

  return (
    <section id="section-five" data-scroll-section>
      <div id="target-element" className={S.section}>
        <Marquee pauseOnHover gradient={false} className={S.marquee} speed={windowWidth > 1024 ? 15 : 80}>
          <p className={S.marqueeText}>Collection</p>
          <p className={S.marqueeText}>Collection</p>
          <p className={S.marqueeText}>Collection</p>
          <p className={S.marqueeText}>Collection</p>
        </Marquee>
        <div className={S.main}>
          <h2 data-scroll className={S.title1} data-scroll-direction="horizontal" data-scroll-speed={title1ScrollSpeed}>
            High
          </h2>
          <img className={S.image} src="/src/assets/vw12.jpg" alt="" />
          <h2
            data-scroll
            className={S.title2}
            data-scroll-direction="horizontal"
            data-scroll-target="#target-element"
            data-scroll-speed={title2ScrollSpeed}
          >
            Fashion
          </h2>
        </div>
        <div className={S.sub}>
          <p className={S.subText}>Editorial</p>
          <div className={S.subRow}>
            <Line id={"lineRef"} width="11.22vh" height="0.33vh" className={S.line1} />
            <p ref={ref} className={S.subText}>
              Style with presence
            </p>
          </div>
          <div className={S.subRow}>
            <p className={S.subText}>Captivating</p>
            <Line id={"lineRef"} width="11.22vh" height="0.33vh" className={S.line2} />
          </div>
        </div>
        <div className={S.textWrapper}>
          <p className={S.text}>
            Elegance arrives with Viola Wumi's signature poise and presence. Featured in prestigious publications like
            L'Officiel Baltic and walking for international designers, her portfolio showcases the perfect balance of
            sophistication and avant-garde style. Viola's unique ability to embody each designer's vision while
            maintaining her authentic presence makes her highly sought after in the industry. Her work spans from
            editorial photography with Dominico Petralia to runway shows for Yanina Couture, demonstrating her
            remarkable versatility. Every photograph captures her ability to transform concepts into visual stories. The
            timeless quality of her expressions and movements translates across cultural contexts, making her a truly
            global fashion icon. Discover the artistry and passion she brings to fashion through this curated collection
            of her most defining moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionFive;
