import React from 'react'
import '../styles/Button.css'

interface IProps {
  onClick: () => void
  disabled: boolean
}

export const Button: React.FC<IProps> = (props) => {
  function handleClick() {
    if (props.disabled) return
    props.onClick()
  }

  return (
    <div className="button" onClick={handleClick}>
      <span>{props.children}</span>
    </div>
  )
}
