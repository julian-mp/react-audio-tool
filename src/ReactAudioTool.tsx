import React, { useState } from 'react'
import { Players, ToneAudioBuffers, Transport } from 'tone'
import { AudioBlock } from './AudioBlock'
import './ReactAudioTool.css'

interface IProps {
  width?: string
  audioFileUrls: [string, string][]
}

interface IPlayerState {
  startAt?: number
  duration?: number
  offsetStart?: number
  offsetEnd?: number
}

const defaultPlayerState = {
  startAt: 0,
  offsetStart: 0,
  offsertEnd: 0,
}

export const ReactAudioTool: React.FC<IProps> = ({ audioFileUrls }) => {
  const [playerStates, setPlayerStates] = useState<
    Record<string, IPlayerState>
  >()

  function updatePlayerState(player: string, state: IPlayerState) {
    setPlayerStates({
      ...playerStates,
      [player]: state,
    })
  }

  const audioFilesConfig = Object.fromEntries(new Map(audioFileUrls))
  const players = new Players(audioFilesConfig).toDestination()

  const buffers = new ToneAudioBuffers(audioFilesConfig, () => {
    const allBuffers = audioFileUrls.map(([audioName]) =>
      buffers.get(audioName).toMono(0).toArray()
    )
  })

  function togglePlayAll() {
    if (Transport.state === 'stopped') {
      Transport.scheduleOnce(
        (time) =>
          audioFileUrls.map(([audioName]) =>
            players.player(audioName).start(time)
          ),
        0
      )
      Transport.start()
    } else if (Transport.state === 'started') {
      Transport.stop()
    }
  }

  return (
    <div className="react-audio-tool">
      {audioFileUrls.map(([audioName, audioFileUrl]) => (
        <AudioBlock key={audioName} audioFileUrl={audioFileUrl}>
          {audioName}
        </AudioBlock>
      ))}
      <button onClick={togglePlayAll}>Play All</button>
    </div>
  )
}
