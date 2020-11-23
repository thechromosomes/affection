import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

import "./styles.css";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }

};

const Header = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
    <motion.nav
      initial={false}
      custom={height}
      ref={containerRef}
      animate={isOpen ? "open" : "closed"}
    >
      <MenuToggle toggle={() => toggleOpen()} />
      <div className="main_logo"><a href="/"><img src="/logo.png" alt="image" /></a></div>
      {isOpen && <Navigation toggle={() => toggleOpen()}/>}
    </motion.nav>
    </>
  );
};

export default Header
