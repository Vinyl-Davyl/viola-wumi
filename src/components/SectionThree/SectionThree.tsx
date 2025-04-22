import gsap from "gsap";
import S from "./SectionThree.module.scss";
import React, { useEffect, useRef } from "react";
import locomotiveScrub from "../../animations/utils/locomotive-scrub";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { ReactComponent as RotatingText } from "../../svgs/rotating-text.svg";

type SectionThreeProps = {
  scroll: any;
};

const SectionThree: React.FC<SectionThreeProps> = ({ scroll }) => {
  let progress: number;
  const ref = useRef<HTMLDivElement>(null);
  const SVGRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isOnScreen = useIntersectionObserver(ref, 0.125);

  useEffect(() => {
    if (isOnScreen && imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 4,
        ease: "expo.out",
        clipPath: "inset(0% 0% 0% 0%)",
      });
    }
  }, [isOnScreen, imageRef.current]);

  useEffect(() => {
    if (scroll) {
      const tl = gsap.timeline({ paused: true });
      tl.to(SVGRef.current, {
        duration: 8,
        rotate: 720,
      });
      locomotiveScrub(scroll, "section-three", progress, tl);
    }
  }, [scroll]);

  return (
    <section data-scroll data-scroll-section data-scroll-id="section-three">
      <div className={S.section}>
        <div className={S.textWrapper}>
          <h2 className={S.title}>Grace and poise on every runway</h2>
          <p className={S.text}>
            In the world of fashion, true elegance speaks volumes. Viola brings a distinct charisma to every shoot and
            runway she graces. Her unique ability to embody diverse styles while maintaining authenticity has made her a
            favorite among renowned designers across Paris, Milan, and beyond.
          </p>
        </div>
        <div ref={ref} className={S.imageWrapper}>
          <div className={S.imageContainer}>
            <img
              alt=""
              ref={imageRef}
              className={S.image}
              src="https://res.cloudinary.com/dnnkadysr/image/upload/v1745291922/viola-wunmi/mvmylvydlgrkjykismgr.jpg"
            />
          </div>
          <div ref={SVGRef} className={S.svg}>
            <RotatingText width="100%" height="100%" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
