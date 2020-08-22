import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ReactAudioTool } from './ReactAudioTool'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ReactAudioTool
      width="500px"
      audioFileUrls={[
        'https://public-test-audio.s3-eu-west-1.amazonaws.com/Kitkat_15sec.wav',
        'https://public-test-audio.s3-eu-west-1.amazonaws.com/test_backing_track_preview.mp3',
      ]}
    />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
