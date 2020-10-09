import React, { useState } from 'react'
import { Players, Transport } from 'tone'
import { AudioBlock } from './AudioBlock'
import '../styles/ReactAudioTool.css'
import { Button } from './Button'

interface IProps {
  audioFileUrls: [string, string][]
}

interface IPlayerState {
  startAt: number
  duration: number
  offsetStart: number
  offsetEnd?: number
}

export const ReactAudioTool: React.FC<IProps> = ({ audioFileUrls }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
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
  const players: Players = new Players(audioFilesConfig, () =>
    setIsLoaded(true)
  ).toDestination()

  function togglePlayAll() {
    setIsPlaying(!isPlaying)

    audioFileUrls.map(([audioName]) => {
      const player = players.player(audioName)
      const playerState = playerStates![audioName]

      const startAt = playerState.startAt
      const offsetStart = playerState.offsetStart
      const duration = playerState.duration

      return player.start(startAt, offsetStart, duration)
    })
  }

  return (
    <div className="react-audio-tool">
      {audioFileUrls.map(([audioName, audioFileUrl]) => (
        <AudioBlock
          key={audioName}
          playerName={audioName}
          audioFileUrl={audioFileUrl}
          updatePlayerState={updatePlayerState}
          seconds={Transport.seconds}
        >
          {audioName}
        </AudioBlock>
      ))}
      <Button disabled={!isLoaded} onClick={togglePlayAll}>
        Play All
      </Button>
    </div>
  )
}
