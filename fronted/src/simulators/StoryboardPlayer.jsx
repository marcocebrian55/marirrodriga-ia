import { useState, useEffect, useRef } from 'react'
import { PlayCircle, Pause, Play } from 'lucide-react'

export default function StoryboardPlayer({ videoTitle, duration = 15, slides, scriptFooter }) {
  const [playing, setPlaying]   = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef             = useRef(null)

  const currentSlide = progress > 66 ? 2 : progress > 33 ? 1 : 0

  function startPlay() {
    setProgress(0)
    setPlaying(true)
  }

  useEffect(() => {
    if (!playing) return
    const step = 100 / (duration * 10)
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p + step >= 100) {
          clearInterval(intervalRef.current)
          setPlaying(false)
          return 0
        }
        return p + step
      })
    }, 100)
    return () => clearInterval(intervalRef.current)
  }, [playing, duration])

  return (
    <div>
      <p className="panel-subtitle">
        <PlayCircle size={15} />
        Vídeo Explicativo: Mari Robot
      </p>

      <div
        className="mock-video-player"
        onClick={!playing ? startPlay : undefined}
        style={{ cursor: playing ? 'default' : 'pointer' }}
      >
        {!playing && (
          <div className="video-overlay">
            <div className="play-btn"><Play size={20} /></div>
            <p className="video-overlay-title">{videoTitle}</p>
            <span className="video-duration">{Math.floor(duration / 60)}:{String(duration % 60).padStart(2,'0')}</span>
          </div>
        )}

        {playing && (
          <div className="video-content-simulation playing">
            <div className="video-storyboard">
              {slides.map((slide, i) => (
                <div key={i} className={`storyboard-slide${i === currentSlide ? ' active' : ''}`}>
                  <span className="slide-scene">{slide.scene}</span>
                  <p className="slide-script" dangerouslySetInnerHTML={{ __html: slide.script }} />
                </div>
              ))}
            </div>
            <div className="video-controls">
              <div className="video-progress-bar">
                <div className="video-progress-filled" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {scriptFooter && (
        <p className="video-script-footer">
          <span className="script-tag">Temas clave:</span> {scriptFooter}
        </p>
      )}
    </div>
  )
}
