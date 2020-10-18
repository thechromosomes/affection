import React, { useState } from 'react'
import { useTransition } from 'react-spring'
import { divStyle, buttonStyle } from './themeButtonStyle'
import Modal from "react-animated-modal";
import data from './themeButtonData'

export default function ThemeButton(props) {
  const [open, setOpen] = useState(false)

  let colorButton = (item) => {
   props.handleClick(item)
   setOpen(open => !open)
  }
  const transitions = useTransition(open ? data : [], item => item.name, {
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' }
  })


  return (
    <>
      <Modal
          visible={open}
          type="swing"
          closemodal={() => setOpen(open => !open)}
      >
      <div style={divStyle}>
      <h1>select the color</h1>
        {transitions.map(({ item, key, styleProps }) => (
          <div style={buttonStyle}>
            <button onClick={() => colorButton(item)} key={key} style={{ ...styleProps, background: item.css }}>hit me ! I am the cutest</button>
          </div>
        ))}
      </div>
      </Modal>
      <button onClick={() => setOpen(open => !open)}> change background </button>
    </>
  )
}

