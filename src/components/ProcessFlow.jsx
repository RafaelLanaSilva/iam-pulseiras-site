import { useRef } from 'react'
import { useInView } from 'motion/react'
import { MessageCircle, Palette, BadgeCheck, Truck, ArrowRight } from 'lucide-react'
import './ProcessFlow.css'

const steps = [
  { title: 'Conte sua ideia', description: 'Envie as informações do projeto e a quantidade desejada.', Icon: MessageCircle, detail: 'Tudo começa com você' },
  { title: 'Escolha o modelo', description: 'A equipe ajuda a encontrar a opção mais adequada.', Icon: Palette, detail: 'Do seu jeito' },
  { title: 'Aprove o layout', description: 'Veja sua ideia na pulseira e aprove a arte antes da produção.', Icon: BadgeCheck, detail: 'Layout sem custo' },
  { title: 'Receba suas pulseiras', description: 'Produzimos e enviamos suas pulseiras para todo o Brasil.', Icon: Truck, detail: 'Prontas para conectar' },
]

export default function ProcessFlow() {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.15 })
  return <section ref={ref} className={`section process-flow${visible ? ' is-visible' : ''}`} id="como-funciona" aria-labelledby="process-title">
    <div className="process-heading">
      <div><span className="eyebrow">Como funciona</span><h2 id="process-title">Da sua ideia<br />ao seu <em>próximo encontro.</em></h2></div>
      <p>Quatro passos para criar suas pulseiras.<br />Nossa equipe acompanha você em cada um deles.</p>
    </div>
    <ol className="flow-steps">
      {steps.map(({ title, description, Icon, detail }, index) => <li key={title} className="flow-step" style={{ '--step-delay': `${index * 1.6}s` }}>
        <div className="flow-card"><div className="flow-card-top"><span className="flow-icon"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span><span className="flow-node" aria-hidden="true">0{index + 1}</span></div><span className="flow-detail">{detail}</span><h3>{title}</h3><p>{description}</p></div>
        {index < steps.length - 1 && <span className="flow-connector" aria-hidden="true"><span /><ArrowRight size={14} /></span>}
      </li>)}
    </ol>
    <div className="flow-footer"><BadgeCheck size={17} aria-hidden="true" /><span>Você aprova. A gente produz. Sua ideia ganha vida.</span></div>
  </section>
}
