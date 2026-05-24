import { useEffect, useRef } from 'react'

export default function CursorEffect() {
  const dot   = useRef(null)
  const ring  = useRef(null)
  const pos   = useRef(null)
  const cur   = useRef({ x: 0, y: 0 })
  const raf   = useRef(null)

  useEffect(() => {
    function onMove(e) {
      const first = !pos.current
      pos.current = { x: e.clientX, y: e.clientY }
      if (first) {
        cur.current = { x: e.clientX, y: e.clientY }
        dot.current.style.opacity  = '1'
        ring.current.style.opacity = '0.5'
      }
      dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    function onLeave() {
      dot.current.style.opacity  = '0'
      ring.current.style.opacity = '0'
    }
    function onEnter() {
      if (pos.current) {
        dot.current.style.opacity  = '1'
        ring.current.style.opacity = '0.5'
      }
    }
    function onOverLink() { ring.current?.classList.add('cursor-ring--hover') }
    function onOutLink()  { ring.current?.classList.remove('cursor-ring--hover') }

    function loop() {
      if (pos.current) {
        cur.current.x += (pos.current.x - cur.current.x) * 0.13
        cur.current.y += (pos.current.y - cur.current.y) * 0.13
        ring.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onOverLink)
      el.addEventListener('mouseleave', onOutLink)
    })
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
