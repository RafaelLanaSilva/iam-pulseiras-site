import { useId, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

// Slice boundaries follow the gaps in the transparent source photograph.
const edges = [0, 226, 398, 566, 738, 905, 1070, 1238, 1410, 1592, 1780, 2031]
const asset = '/images/lovable-reference/personalizacao-cores-transparente-v1.png'

export default function BraceletPalette() {
  const ref = useRef(null)
  const id = useId().replace(/:/g, '')
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reducedMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const [replay, setReplay] = useState(0)

  return <figure ref={ref} className="personalization-palette bracelet-palette">
    <svg viewBox="0 0 2031 774" role="img" aria-label="Onze pulseiras coloridas, do branco ao vermelho, com frases personalizadas">
      <defs>
        <image id={`${id}-photo`} href={asset} width="2031" height="774" onLoad={() => setLoaded(true)} />
        {edges.slice(0, -1).map((left, index) => <clipPath key={left} id={`${id}-clip-${index}`}><rect x={left} y="0" width={edges[index + 1] - left} height="800" /></clipPath>)}
      </defs>
      {edges.slice(0, -1).map((left, index) => <motion.g key={`${replay}-${left}`}
        initial={reducedMotion ? false : { opacity: 0, y: 70 }}
        animate={reducedMotion || (inView && loaded) ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}>
        <g clipPath={`url(#${id}-clip-${index})`}><use href={`#${id}-photo`} /></g>
      </motion.g>)}
    </svg>
    <figcaption><span>Uma ideia. Muitas possibilidades.</span>{!reducedMotion && <button type="button" onClick={() => setReplay(value => value + 1)} aria-label="Repetir animação das pulseiras">Repetir <span aria-hidden="true">↻</span></button>}</figcaption>
  </figure>
}
