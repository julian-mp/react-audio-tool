import React from 'react'
import '../styles/Layout.css'

export const Layout: React.FC = (props) => (
  <div id="container">{props.children}</div>
)
