import React, { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd'
import { Buffer, Player, ToneAudioBuffer } from 'tone'
import Waveform from 'waveform-react'

interface IProps {
  audioFileUrl: string
  children?: any
}

export const AudioBlock: React.FC<IProps> = ({ audioFileUrl, children }) => {
  const [player, setPlayer] = useState<Player>()
  const [buffer, setBuffer] = useState<AudioBuffer>()
  const [toneBuffer, setToneBuffer] = useState<ToneAudioBuffer>()

  useEffect(() => {
    const tonePlayer = new Player(audioFileUrl).toDestination()
    const toneBuffer = new Buffer(audioFileUrl, (buffer) => {
      console.log(buffer.get(), 'bufferget')
      setBuffer(buffer.toMono(1).get())
    })

    setPlayer(tonePlayer)
    setToneBuffer(toneBuffer)
  }, [])

  useEffect(() => {
    console.log('player >>>', player)

    player && console.log(player.state)
  }, [player])

  function togglePlay() {
    if (!player) return

    if (player.state === 'stopped') {
      player.start()
    } else {
      player?.stop()
    }
  }

  return player ? (
    <Rnd
      width={`${toneBuffer && toneBuffer!.duration * 50}px`}
      height="100px"
      dragAxis="x"
    >
      <div
        className="audio-block"
        onClick={togglePlay}
        // style={{ width: `${toneBuffer && toneBuffer.duration * 50}px` }}
      >
        <Waveform
          buffer={buffer}
          height={100}
          width={toneBuffer && toneBuffer.duration * 50}
          class="hello-world"
          position={0}
          color="#676767"
          plot="line"
          markerStyle={{
            color: '#fff',
            width: 4,
          }}
          waveStyle={{
            animate: true,
            color: '#000',
            pointWidth: 1,
          }}
        />
      </div>
    </Rnd>
  ) : (
    <></>
  )
}
