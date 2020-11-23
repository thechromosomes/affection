import React, { useState, useContext } from 'react'
import { useTransition } from 'react-spring'
import { divStyle, buttonStyle } from './themeButtonStyle'
import data from './themeButtonData'
import Theme from './themeProvider'




export default function ThemeButton(props) {
  const [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const AppContext = useContext(Theme)

  let colorButton = (item) => {
   AppContext.changeTheme(item)
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
      <div style={divStyle}>
        {transitions.map(({ item, key, styleProps }) => (
            <div style={buttonStyle}>
              <button onClick={() => colorButton(item)} key={key} style={{ ...styleProps, background: item.css }}>hit me ! I am the cutest</button>
            </div>
        ))}
      </div>
      <button onClick={(color) => colorButton(color)}> Background color </button>
      </>
  )
}

