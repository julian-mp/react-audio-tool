import React from 'react'
import ReactDOM from 'react-dom'
import { playerConfig } from './config'
import './styles/index.css'
import { ReactAudioTool } from './components/ReactAudioTool'
import { Layout } from './components/Layout'

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <ReactAudioTool audioFileUrls={playerConfig.audioFileUrls} />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
)
