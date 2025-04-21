import gsap from "gsap";
import S from "./SectionFour.module.scss";
import React, { useEffect, useRef } from "react";
import { ReactComponent as Corner } from "../../svgs/corner.svg";
import { ReactComponent as Scribble } from "../../svgs/scribble.svg";
import { ReactComponent as Line } from "../../svgs/vertical-line.svg";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const SectionFour: React.FC = () => {
  const ref1 = useRef<HTMLHeadingElement>(null);
  const ref2 = useRef<HTMLHeadingElement>(null);
  const isOnScreen1 = useIntersectionObserver(ref1, 0.25);
  const isOnScreen2 = useIntersectionObserver(ref2, 0.5);

  useEffect(() => {
    if (isOnScreen1) {
      gsap.to("#cornerRef > line", {
        delay: 0.5,
        duration: 1.25,
        ease: "expo.out",
        strokeDashoffset: 0,
      });
      gsap.to("#scribbleRef", {
        delay: 0.5,
        duration: 2.5,
        ease: "power3.out",
        strokeDashoffset: 0,
      });
    }
  }, [isOnScreen1]);

  useEffect(() => {
    if (isOnScreen2) {
      gsap.to("#verticalLineRef > line", {
        delay: 0.5,
        duration: 1.25,
        ease: "expo.out",
        strokeDashoffset: 0,
      });
    }
  }, [isOnScreen2]);

  return (
    <section data-scroll-section>
      <div className={S.section}>
        <div className={S.left}>
          <Corner width="5.5vh" height="5.5vh" id={"cornerRef"} className={S.corner} />
          <h2 ref={ref1} className={S.title}>
            Fashion <span className={S.green}>to life</span> with elegance
          </h2>
          <Scribble width="43.68vh" height="23.59vh" id={"scribbleRef"} className={S.scribble} />
        </div>
        <div className={S.right}>
          <h3 ref={ref2} className={S.header}>
            Effortless style and grace captured in every photoshoot
          </h3>
          <Line height="5.67vh" className={S.line} id={"verticalLineRef"} />
          <p className={S.text}>
            From editorial spreads in L'Officiel Baltic to runway shows for Yanina Couture, Viola brings a unique
            presence to every project. Her portfolio showcases versatility across diverse styles and cultural
            aesthetics. Working with renowned photographers like Dominico Petralia and Albert Tomico has refined her
            ability to convey emotion through imagery. Each collaboration reveals new dimensions of her talent, making
            her a sought-after model for both avant-garde projects and classic fashion campaigns worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionFour;
