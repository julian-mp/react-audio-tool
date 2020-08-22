import React from 'react'
import { AudioBlock } from './AudioBlock'
import './ReactAudioTool.css'

interface IProps {
  width?: string
  audioFileUrls: string[]
}

export const ReactAudioTool: React.FC<IProps> = ({ audioFileUrls }) => {
  return (
    <div className="react-audio-tool">
      {audioFileUrls.map((audioFileUrl, index) => (
        <AudioBlock key={index} audioFileUrl={audioFileUrl}>
          Player index {index}
        </AudioBlock>
      ))}

      <button onClick={() => alert('Implement me')}>Play All</button>
    </div>
  )
}
