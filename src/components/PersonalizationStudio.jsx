import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Palette,
  Type,
  Cpu,
  Check,
  ArrowUpRight,
  Smartphone,
  ShieldCheck,
  Wand2,
  Send,
} from 'lucide-react'
import './PersonalizationStudio.css'

const SWATCHES = [
  { name: 'Branco Neve', text: 'BE KIND ♥', hex: '#FFFFFF', pantone: 'Pantone White', border: '#cbd5e1' },
  { name: 'Cinza Titânio', text: 'STAY BALANCED', hex: '#9EA1A5', pantone: 'Pantone Cool Gray 6 C' },
  { name: 'Preto Nobre', text: 'GOOD ENERGY ☼', hex: '#1F2023', pantone: 'Pantone Black C' },
  { name: 'Roxo Violeta', text: 'BETTER TOMORROW ◯', hex: '#6F3A96', pantone: 'Pantone 268 C' },
  { name: 'Azul Royal', text: 'YOU GOT THIS ★', hex: '#1962D0', pantone: 'Pantone 286 C' },
  { name: 'Azul Turquesa', text: 'MAKE IT HAPPEN ⚡', hex: '#00B6E6', pantone: 'Pantone 3115 C' },
  { name: 'Verde Esmeralda', text: 'CHOOSE HAPPY ✿', hex: '#289B37', pantone: 'Pantone 361 C' },
  { name: 'Amarelo Sol', text: 'BRIGHTER DAYS ☼', hex: '#FFBF00', pantone: 'Pantone 116 C' },
  { name: 'Laranja Tangerina', text: 'STAY CURIOUS ☼', hex: '#FF6E14', pantone: 'Pantone 1585 C' },
  { name: 'Rosa Coral', text: 'BETTER TOGETHER ♥', hex: '#FF5370', pantone: 'Pantone 1787 C' },
  { name: 'Vermelho Rubi', text: 'MORE LOVE ♥', hex: '#E51E28', pantone: 'Pantone 186 C' },
]

const TABS = [
  {
    id: 'cores',
    title: 'Cores',
    subtitle: 'Paleta ilimitada & Pantone®',
    shortDesc: 'Escolha a cor da pulseira e da gravação. Mais de 20 cores de catálogo e código Pantone sob medida.',
    Icon: Palette,
    badge: '11+ cores em estoque',
  },
  {
    id: 'textos',
    title: 'Textos',
    subtitle: 'Frases, nomes e datas',
    shortDesc: 'Frases inspiradoras, nomes de eventos, numeração sequencial e datas gravadas em baixo relevo.',
    Icon: Type,
    badge: 'Simulador em tempo real',
  },
  {
    id: 'tecnologia',
    title: 'Tecnologia',
    subtitle: 'NFC & QR Code integrado',
    shortDesc: 'Aproxime o celular para abrir links, credenciais, cardápios ou check-in instantâneo sem app.',
    Icon: Cpu,
    badge: 'Smart Bracelet',
  },
]

const TEXT_PRESETS = [
  'SUA MARCA AQUI ✨',
  'EVENTO 2026 🚀',
  'BE KIND ♥',
  'EQUIPE DE ELITE',
  'CONEXÃO VIP ★',
  'CHOOSE HAPPY ✿',
]

const MINI_COLORS = [
  { name: 'Turquesa', hex: '#00B6E6' },
  { name: 'Preto', hex: '#1F2023' },
  { name: 'Coral', hex: '#FF5370' },
  { name: 'Amarelo', hex: '#FFBF00' },
  { name: 'Branco', hex: '#FFFFFF' },
]

export default function PersonalizationStudio({ whatsappUrl }) {
  const [activeTab, setActiveTab] = useState('cores')
  const [selectedColorIndex, setSelectedColorIndex] = useState(5) // default Turquesa
  const [customText, setCustomText] = useState('SUA MARCA AQUI ✨')
  const [mockColor, setMockColor] = useState('#00B6E6')
  const [engravingStyle, setEngravingStyle] = useState('white') // 'white', 'dark', 'pure'
  const [nfcTapped, setNfcTapped] = useState(false)
  const inputId = useId()

  const currentColor = SWATCHES[selectedColorIndex]

  const handleNfcSimulate = () => {
    setNfcTapped(true)
    setTimeout(() => {
      setNfcTapped(false)
    }, 4500)
  }

  const defaultWhatsapp = whatsappUrl || 'https://wa.me/5519994024138?text=' + encodeURIComponent('Olá! Estava navegando no estúdio de personalização da I’am Pulseiras e gostaria de solicitar uma prévia gratuita da minha pulseira. ✨')

  return (
    <section className="pz-studio" id="personalizacao" aria-labelledby="pz-heading">
      <div className="pz-studio-inner">
        {/* Section Header */}
        <div className="pz-studio-header">
          <span className="eyebrow" id="pz-heading">
            <Wand2 size={15} aria-hidden="true" /> Personalização
          </span>
          <h2>
            Sua ideia ganha forma.
          </h2>
          <p>
            Cores, textos e até tecnologia. Você decide o que vai na pulseira — a gente cuida de cada detalhe e cria a arte sem custo.
          </p>
        </div>

        {/* Studio Layout: 3 Pillar Tabs (Left) + Interactive Display (Right) */}
        <div className="pz-studio-layout">
          {/* Left Column: Interactive Feature Cards */}
          <div className="pz-tabs-column" role="tablist" aria-label="Opções de personalização">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.Icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`pz-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`pz-panel-${tab.id}`}
                  className={`pz-tab-card${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="pz-tab-card-top">
                    <div className="pz-tab-icon-title">
                      <span className="pz-tab-icon-wrap" aria-hidden="true">
                        <Icon size={20} strokeWidth={2} />
                      </span>
                      <h3>{tab.title}</h3>
                    </div>
                    <span className="pz-tab-badge">{tab.badge}</span>
                  </div>
                  <p className="pz-tab-desc">{tab.shortDesc}</p>
                  <span className="pz-tab-indicator" aria-hidden="true">
                    Ver demonstração <ArrowUpRight size={14} />
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right Column: Dynamic Stage */}
          <div className="pz-stage" id={`pz-panel-${activeTab}`} role="tabpanel" aria-labelledby={`pz-tab-${activeTab}`}>
            <div className="pz-stage-glow" aria-hidden="true" />

            {/* Stage Top Bar */}
            <div className="pz-stage-topbar">
              <div className="pz-stage-mode">
                <span className="pz-stage-dot" aria-hidden="true" />
                <span>
                  {activeTab === 'cores' && 'Paleta de Cores e Acabamentos'}
                  {activeTab === 'textos' && 'Simulador de Gravação em Relevo'}
                  {activeTab === 'tecnologia' && 'Tecnologia NFC & QR Code'}
                </span>
              </div>
              <span className="pz-stage-status">Prévia Interativa</span>
            </div>

            {/* Stage Body */}
            <div className="pz-stage-body">
              <AnimatePresence mode="wait">
                {/* ── TAB 1: CORES ── */}
                {activeTab === 'cores' && (
                  <motion.div
                    key="tab-cores"
                    className="pz-cores-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <div className="pz-cores-hero-wrap">
                      <img
                        src="/images/lovable-reference/personalizacao-cores-transparente-v1.png"
                        alt="Pulseiras em 11 cores personalizadas com frases inspiradoras"
                        className="pz-cores-hero-img"
                        loading="eager"
                      />
                    </div>

                    <div className="pz-swatches-panel">
                      <div className="pz-swatches-info">
                        <div className="pz-swatches-label">
                          <span>Cor selecionada:</span>
                          <strong style={{ color: currentColor.hex === '#FFFFFF' ? '#ffffff' : currentColor.hex }}>
                            {currentColor.name}
                          </strong>
                        </div>
                        <span className="pz-swatches-pantone">{currentColor.pantone}</span>
                      </div>

                      <div className="pz-swatches-row" role="radiogroup" aria-label="Selecione uma cor">
                        {SWATCHES.map((swatch, idx) => (
                          <button
                            key={swatch.name}
                            type="button"
                            role="radio"
                            aria-checked={selectedColorIndex === idx}
                            aria-label={`${swatch.name} - ${swatch.pantone}`}
                            className={`pz-swatch-btn${selectedColorIndex === idx ? ' is-selected' : ''}`}
                            style={{
                              backgroundColor: swatch.hex,
                              borderColor: swatch.border || 'transparent',
                            }}
                            onClick={() => setSelectedColorIndex(idx)}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="pz-cores-note">
                      <ShieldCheck size={16} aria-hidden="true" />
                      Silicone atóxico hipoalergênico. Cores sob medida na escala Pantone® para sua marca.
                    </p>
                  </motion.div>
                )}

                {/* ── TAB 2: TEXTOS (LIVE SIMULATOR) ── */}
                {activeTab === 'textos' && (
                  <motion.div
                    key="tab-textos"
                    className="pz-textos-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    {/* Live Wristband Mockup */}
                    <div className="pz-wristband-stage">
                      <div className="pz-wristband-header">
                        <span>Simulação 1:1 • Silicone 12mm</span>
                        <span>{engravingStyle === 'white' ? 'Tinta Branca' : engravingStyle === 'dark' ? 'Tinta Preta' : 'Baixo Relevo Puro'}</span>
                      </div>
                      <div
                        className="pz-wristband-mock"
                        style={{
                          backgroundColor: mockColor,
                        }}
                      >
                        <span
                          className={`pz-engraved-text style-debossed-${engravingStyle}`}
                        >
                          {customText.trim() || 'SUA FRASE'}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Input & Controls */}
                    <div className="pz-text-controls">
                      <div className="pz-text-input-wrap">
                        <label htmlFor={inputId} className="sr-only">Digite o texto da pulseira</label>
                        <input
                          id={inputId}
                          type="text"
                          maxLength={32}
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          placeholder="Digite o texto da sua pulseira..."
                        />
                      </div>

                      {/* Presets */}
                      <div className="pz-text-presets">
                        {TEXT_PRESETS.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            className="pz-text-preset-btn"
                            onClick={() => setCustomText(preset)}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>

                      {/* Options: Mini color switcher & Style toggle */}
                      <div className="pz-options-row">
                        <div className="pz-option-group">
                          <span>Cor do silicone:</span>
                          {MINI_COLORS.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              aria-label={`Silicone ${c.name}`}
                              className={`pz-mini-color-btn${mockColor === c.hex ? ' is-active' : ''}`}
                              style={{ backgroundColor: c.hex }}
                              onClick={() => setMockColor(c.hex)}
                            />
                          ))}
                        </div>

                        <div className="pz-option-group">
                          <span>Tinta da gravação:</span>
                          <button
                            type="button"
                            className={`pz-style-toggle-btn${engravingStyle === 'white' ? ' is-active' : ''}`}
                            onClick={() => setEngravingStyle('white')}
                          >
                            Branca
                          </button>
                          <button
                            type="button"
                            className={`pz-style-toggle-btn${engravingStyle === 'dark' ? ' is-active' : ''}`}
                            onClick={() => setEngravingStyle('dark')}
                          >
                            Preta
                          </button>
                          <button
                            type="button"
                            className={`pz-style-toggle-btn${engravingStyle === 'pure' ? ' is-active' : ''}`}
                            onClick={() => setEngravingStyle('pure')}
                          >
                            Sem tinta
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}


                {/* ── TAB 4: TECNOLOGIA ── */}
                {activeTab === 'tecnologia' && (
                  <motion.div
                    key="tab-tecnologia"
                    className="pz-tecnologia-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <div className="pz-nfc-card">
                      {/* Simulated Smartphone Notification */}
                      {nfcTapped && (
                        <div className="pz-nfc-notification">
                          <span className="pz-nfc-notif-icon">
                            <Smartphone size={20} />
                          </span>
                          <div className="pz-nfc-notif-text">
                            <strong>Tag NFC Detectada!</strong>
                            <span>iampulseiras.com.br/link-do-seu-projeto</span>
                          </div>
                        </div>
                      )}

                      <div className="pz-nfc-visual-wrap">
                        {nfcTapped && <div className="pz-nfc-radar" />}
                        <img
                          src="/images/lovable-reference/produto-pulseira-nfc-ajustavel-transparente-v1.png"
                          alt="Pulseira ajustável turquesa com tecnologia NFC inteligente"
                          className="pz-nfc-img"
                        />
                      </div>

                      <button
                        type="button"
                        className="pz-nfc-action-btn"
                        onClick={handleNfcSimulate}
                      >
                        <Smartphone size={17} /> Simular aproximação do smartphone
                      </button>
                    </div>

                    <div className="pz-nfc-tags">
                      <div className="pz-nfc-tag-item">📱 Compatível com iOS & Android</div>
                      <div className="pz-nfc-tag-item">⚡ Sem bateria necessária</div>
                      <div className="pz-nfc-tag-item">🌊 100% à prova d'água IP68</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage Bottom Footer */}
            <div className="pz-stage-footer">
              <span className="pz-stage-badge-item">
                <Check size={14} /> Layout sem custo
              </span>
              <span className="pz-stage-badge-item">
                <Check size={14} /> Pedido mín. 50 un.
              </span>
              <span className="pz-stage-badge-item">
                <Check size={14} /> Envio para todo o Brasil
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="pz-bottom-banner">
          <div className="pz-bottom-banner-left">
            <span className="pz-bottom-banner-icon" aria-hidden="true">
              <Wand2 size={24} />
            </span>
            <div className="pz-bottom-banner-text">
              <h4>Gostou das possibilidades para a sua pulseira?</h4>
              <p>Envie sua ideia, cores ou logotipo e receba uma simulação digital sem custo pelo WhatsApp.</p>
            </div>
          </div>
          <a
            href={defaultWhatsapp}
            className="pz-bottom-banner-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send size={16} /> Quero criar minha pulseira <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
