import React from 'react'

export function SunShower (props) {
  return (
    <div className="icon sun-shower" style={props.style}>
      <div className="cloud"></div>
      <div className="sun">
        <div className="rays"></div>
      </div>
      <div className="rain"></div>
    </div>
  )
}
