import * as React from "react";
import { motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import ThemeButton from "../../app/themeButton/themeButtons"

const variants = {
  open: {
    y: 0,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    x: 0,
    y: 50,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, duration: 1}
    }
  }
};

const menuItems = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 3 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};
const navItem = ["Home", "About", "My walls", "notification"]

const overlay = {
  position: "fixed",
  width: "100%",
  height: "100%",
  backgroundColor: "#BFFF00",
  cursor: "pointer",
  left: "0",
  right: "0",
  bottom: "0",
  display: "block",
  zIndex: "2"
}

const navItemStyle = {
  fontSize: "40px",
  textAlign: "center",
  listStyle: "none",
  display: "block",
  margin:"auto",
  border: "none",
  background: "transparent",
  padding: "10px",
  fontWeight: "500"
}

export const Navigation = (props) => {
  return (
    <motion.div style={overlay} exit={{ opacity: 0, y: 50, transition: { stiffness: 1000, velocity: -100, duration: 5 } }}>
    <MenuToggle toggle={() => props.toggle()} />
    <motion.div variants={menuItems} animate="closed">
    {/* <motion.button
      style={navItemStyle}
      variants={variants}
      initial="open"
      animate="closed"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      >
      <ThemeButton/>
    </motion.button> */}
    {navItem.map( (item) => (
      <motion.button
      style={navItemStyle}
      variants={variants}
      initial="open"
      animate="closed"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      >
      {item}
      </motion.button>
    ))}
    </motion.div>
    </motion.div>
  );
};
