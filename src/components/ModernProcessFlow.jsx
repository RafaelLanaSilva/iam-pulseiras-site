import { MessageCircle, Palette, BadgeCheck, PackageCheck, Sparkles, Check, ArrowUpRight, Send } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import './ModernProcessFlow.css'

const STEPS = [
  {
    num: '01',
    tag: 'Passo 01 • Primeiro contato',
    title: 'Conte sua ideia',
    desc: 'Envie o modelo desejado, a quantidade e os detalhes do seu projeto pelo WhatsApp ou formulário.',
    pill: 'Atendimento humano e ágil',
    Icon: MessageCircle,
  },
  {
    num: '02',
    tag: 'Passo 02 • Modelo e cores',
    title: 'Escolha o modelo',
    desc: 'A equipe ajuda a encontrar a opção ideal de acabamento, textura e paleta de cores para sua marca.',
    pill: 'Mais de 20 cores & Pantone',
    Icon: Palette,
  },
  {
    num: '03',
    tag: 'Passo 03 • Arte virtual 3D',
    title: 'Aprove o layout',
    desc: 'Veja a arte aplicada diretamente na pulseira e aprove antes de produzir. Sem nenhum custo ou compromisso.',
    pill: 'Você só produz se aprovar',
    Icon: BadgeCheck,
  },
  {
    num: '04',
    tag: 'Passo 04 • Produção e envio',
    title: 'Receba em mãos',
    desc: 'Produzimos com silicone atóxico de alta resistência e enviamos com rastreio para qualquer lugar do Brasil.',
    pill: 'Logística nacional rápida',
    Icon: PackageCheck,
  },
]

export default function ModernProcessFlow({ whatsappUrl }) {
  const reducedMotion = useReducedMotion()

  const defaultWhatsapp = whatsappUrl || 'https://wa.me/5519994024138?text=' + encodeURIComponent('Olá! Gostaria de entender mais sobre o processo e solicitar um orçamento de pulseiras. ✨')

  return (
    <section className="proc-section" id="como-funciona" aria-labelledby="proc-heading">
      <div className="proc-inner">
        {/* Header */}
        <div className="proc-header">
          <span className="eyebrow" id="proc-heading">
            <Sparkles size={15} aria-hidden="true" /> Como funciona
          </span>
          <h2>
            Quatro passos <em>simples.</em>
          </h2>
          <p>
            Da sua ideia às pulseiras prontas, nossa equipe acompanha você em cada etapa com suporte humanizado.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="proc-grid">
          {STEPS.map((step, idx) => {
            const Icon = step.Icon
            return (
              <motion.div
                key={step.num}
                className="proc-card"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="proc-card-top">
                  <span className="proc-icon-wrap" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="proc-num-badge">{step.num}</span>
                </div>

                <span className="proc-tag">{step.tag}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>

                <div className="proc-card-pill">
                  <Check size={13} aria-hidden="true" />
                  <span>{step.pill}</span>
                </div>

                {idx < STEPS.length - 1 && (
                  <span className="proc-connector" aria-hidden="true" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Footer Trust & Direct Action */}
        <div className="proc-footer">
          <div className="proc-footer-benefits">
            <span className="proc-benefit-item">
              <Check size={16} aria-hidden="true" />
              Layout digital sem custo para aprovação
            </span>
            <span className="proc-benefit-item">
              <Check size={16} aria-hidden="true" />
              Pedido mínimo a partir de 50 unidades
            </span>
            <span className="proc-benefit-item">
              <Check size={16} aria-hidden="true" />
              Envio seguro para todo o território nacional
            </span>
          </div>

          <a
            href={defaultWhatsapp}
            className="proc-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send size={15} /> Conversar no WhatsApp <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
