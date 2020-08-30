import React, { useEffect, useState } from 'react'
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd'
import { Buffer, Player, ToneAudioBuffer } from 'tone'
import Waveform from 'waveform-react'
import { convertPixelsToSeconds, convertSecondsToPixels } from './utils'

interface IProps {
  audioFileUrl: string
  playerName: string
  updatePlayerState: any
  children?: any
  seconds: any
}

export const AudioBlock: React.FC<IProps> = ({
  audioFileUrl,
  playerName,
  updatePlayerState,
  children,
  seconds,
}) => {
  const [player, setPlayer] = useState<Player>()
  const [buffer, setBuffer] = useState<AudioBuffer>()
  const [toneBuffer, setToneBuffer] = useState<ToneAudioBuffer>()
  const [offsetStart, setOffsetStart] = useState<number>(0)
  const [offsetEnd, setOffsetEnd] = useState<number>(0)
  const [lastOffsetStart, setLastOffsetStart] = useState<number>(0)
  const [lastOffsetEnd, setLastOffsetEnd] = useState<number>(0)
  const [startAt, setStartAt] = useState<number>(0)

  const duration = buffer
    ? buffer.duration + lastOffsetEnd + lastOffsetStart
    : 0

  useEffect(() => {
    const tonePlayer = new Player(audioFileUrl).toDestination()
    const toneBuffer = new Buffer(audioFileUrl, (buffer) => {
      setBuffer(buffer.toMono(1).get())
    })

    setPlayer(tonePlayer)
    setToneBuffer(toneBuffer)
  }, [])

  useEffect(() => {
    updatePlayerState(playerName, {
      startAt,
      offsetStart: Math.abs(lastOffsetStart),
      duration,
    })
  }, [startAt, lastOffsetStart, duration])

  function togglePlay() {
    if (!player) return
    console.log('duration >>>', duration)
    console.log('startAt >>>', startAt)

    return player.state === 'stopped'
      ? player.start(Math.round(startAt), Math.abs(lastOffsetStart), duration)
      : player.stop()
  }

  const handleResize: RndResizeCallback = (e, direction, ref, delta) => {
    if (direction === 'left') {
      setOffsetStart(lastOffsetStart + convertPixelsToSeconds(delta.width))
    }

    if (direction === 'right') {
      setOffsetEnd(lastOffsetEnd + convertPixelsToSeconds(delta.width))
    }
  }

  const handleResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position
  ) => {
    if (direction === 'left') {
      setLastOffsetStart(lastOffsetStart + convertPixelsToSeconds(delta.width))
      setStartAt(convertPixelsToSeconds(position.x))
    }

    if (direction === 'right') {
      setLastOffsetEnd(lastOffsetEnd + convertPixelsToSeconds(delta.width))
    }
  }

  const handleDragStop: RndDragCallback = (e, data) => {
    setStartAt(convertPixelsToSeconds(data.x))
  }

  return player ? (
    <div style={{ display: 'flex' }}>
      <button disabled={!player.loaded} onClick={() => togglePlay()}>
        {player.state === 'stopped' ? `Play` : `Stop`}
      </button>
      <div className="audio-block">
        <div className="label">{children + seconds}</div>
        <Rnd
          width={`${
            toneBuffer && convertSecondsToPixels(toneBuffer!.duration)
          }px`}
          className="waveform-container"
          height="100px"
          bounds=".audio-block"
          dragAxis="x"
          onResize={handleResize}
          onResizeStop={handleResizeStop}
          onDragStop={handleDragStop}
          enableResizing={{ left: true, right: true }}
        >
          <div
            style={{
              transform: `translateX(${convertSecondsToPixels(offsetStart)}px)`,
            }}
          >
            <Waveform
              buffer={buffer}
              height={100}
              width={toneBuffer && convertSecondsToPixels(toneBuffer.duration)}
              className="react-waveform"
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
      </div>
    </div>
  ) : (
    <></>
  )
}
