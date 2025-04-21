import gsap from "gsap";
import { LongLine } from "../LongLine";
import React, { useEffect } from "react";
import S from "./SectionEight.module.scss";
import useRefArray from "../../hooks/useRefArray";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

type SectionEightProps = {
  windowWidth: number;
};

const SectionEight: React.FC<SectionEightProps> = ({ windowWidth }) => {
  const refs = useRefArray<SVGSVGElement>(5);
  const linesVisibility: boolean[] = [
    useIntersectionObserver(refs[0], 1),
    useIntersectionObserver(refs[1], 1),
    useIntersectionObserver(refs[2], 1),
    useIntersectionObserver(refs[3], 1),
    useIntersectionObserver(refs[4], 1),
  ];

  useEffect(() => {
    if (!refs) return;
    refs.forEach((ref, i) => {
      if (linesVisibility[i]) {
        gsap.to(ref.current?.firstChild, {
          delay: windowWidth > 1024 ? 0.5 : 0.2,
          duration: 2.5,
          ease: "expo.out",
          strokeDashoffset: 0,
        });
      }
    });
  }, [linesVisibility, refs]);

  return (
    <section id="section-eight" data-scroll-section>
      <div className={S.section}>
        <div className={S.box}>
          <LongLine ref={refs[0]} className={S.line} windowWidth={windowWidth} />
          <p className={S.title}>Italy</p>
          <p className={S.text}>
            Captivating Milan Fashion Week with her distinctive presence, Viola showcased the artistic vision of
            Domenico Petralia. Her interpretation brought vitality to the collection's central
          </p>
          <img className={S.img} src="/src/assets/vw9.jpg" alt="her" />
        </div>
        <div className={S.box}>
          <LongLine ref={refs[1]} className={S.line} windowWidth={windowWidth} />
          <p className={S.title}>Paris</p>
          <p className={S.text}>
            Walking for Yanina Couture in Paris, Viola embodied the essence of haute couture with elegant poise. Her
            runway presence elevated the collection to new heights of beauty.
          </p>
          <img className={S.img} src="/src/assets/vw10.jpg" alt="her" />
        </div>
        <div className={S.box}>
          <LongLine ref={refs[2]} className={S.line} windowWidth={windowWidth} />
          <p className={S.title}>Baltic</p>
          <p className={S.text}>
            Featured in L'Officiel Baltic's editorial spread, Viola demonstrated her versatility in front of Albert
            Tomico's lens. The artistic vision came alive through her expressions.
          </p>
          <img className={S.img} src="/src/assets/vw3.jpg" alt="her" />
        </div>
        <div className={S.box}>
          <LongLine ref={refs[3]} className={S.line} windowWidth={windowWidth} />
          <p className={S.title}>Lagos</p>
          <p className={S.text}>
            At Lagos Fashion Week, Viola brought Nigerian designs to international attention with her dynamic presence.
            The cultural fusion created a memorable showcase for all attendees.
          </p>
          <img className={S.img} src="/src/assets/vw16.jpg" alt="her" />
          <LongLine ref={refs[4]} className={S.line} windowWidth={windowWidth} />
        </div>
      </div>
    </section>
  );
};

export default SectionEight;
