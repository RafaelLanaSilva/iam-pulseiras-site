import { useState } from 'react'
import { PackageCheck, PenTool, TruckElectric, Building2, Music2, HeartHandshake, GraduationCap, Dumbbell, PartyPopper, Megaphone, Sparkles, ArrowUpRight, Send } from 'lucide-react'
import { motion, useReducedMotion, useMotionValue, useMotionTemplate, useSpring } from 'motion/react'
import './App.css'
import AnimatedGradient from './components/AnimatedGradient'
import BraceletPalette from './components/BraceletPalette'
import ProcessFlow from './components/ProcessFlow'
import FallingBracelets from './components/FallingBracelets'
import PersonalizationStudio from './components/PersonalizationStudio'
import ModernProcessFlow from './components/ModernProcessFlow'

const personalizationGradient = { preset: 'custom', color1: '#163d35', color2: '#23796b', color3: '#253e38', speed: 12, swirl: 60, swirlIterations: 6, scale: 0.7, softness: 100, proportion: 45 }

const image = (file) => `/images/lovable-reference/${file}`
const phone = '5519994024138'
const email = 'iampulseiras@gmail.com'
const whatsapp = (message = 'Olá! Vim pelo site da I’am Pulseiras e gostaria de solicitar um orçamento. ✨') => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

function CookieBanner() {
  const [choice, setChoice] = useState(() => typeof window === 'undefined' ? null : window.localStorage.getItem('iam-cookie-consent'))
  if (choice) return null
  const save = (value) => { window.localStorage.setItem('iam-cookie-consent', value); setChoice(value) }
  return <aside className="cookie-banner" aria-label="Preferências de cookies"><div><strong>Privacidade e cookies</strong><p>Usamos cookies necessários para o funcionamento do site. Você pode aceitar cookies opcionais ou rejeitá-los. Consulte nossa <a href="/privacidade/">Política de Privacidade</a>.</p></div><div className="cookie-actions"><button className="cookie-reject" onClick={() => save('rejected')}>Rejeitar opcionais</button><button className="cookie-accept" onClick={() => save('accepted')}>Aceitar cookies</button></div></aside>
}

const models = [
  { slug: 'baixo-relevo', name: 'Pulseira em baixo relevo', image: 'produto-baixo-relevo-v2.png', short: 'Gravação no silicone com acabamento resistente e leitura marcante.', description: 'Um modelo clássico para destacar nomes, frases e marcas. A arte é gravada diretamente no silicone e pode receber preenchimento em outra cor.', features: ['Gravação em cavidade no silicone', 'Preenchimento colorido opcional', 'Texto e logotipo', 'Tamanhos adulto e infantil'], uses: 'Empresas, campanhas, eventos e academias' },
  { slug: 'slim', name: 'Pulseira Slim', image: 'produto-slim-v2.png', short: 'Mais fina e discreta, perfeita para uso prolongado.', description: 'Uma opção leve e versátil para quem quer distribuir uma lembrança que as pessoas gostem de usar no dia a dia.', features: ['Perfil fino e confortável', 'Diversas opções de cor', 'Texto e logotipo', 'Boa escolha para grandes quantidades'], uses: 'Eventos, campanhas, escolas e ações promocionais' },
  { slug: 'silkscreen', name: 'Pulseira Silkscreen', image: 'produto-silkscreen-v2.png', short: 'Impressão chapada na superfície, em preto ou branco.', description: 'A tinta é aplicada diretamente sobre o silicone, criando uma impressão chapada e nítida. A pulseira pode ter qualquer cor, enquanto a gravação é feita somente em preto ou branco.', features: ['Impressão chapada na superfície', 'Gravação em preto ou branco', 'Pulseira em várias cores', 'Visual limpo e versátil'], uses: 'Marcas, empresas, eventos e projetos especiais' },
  { slug: 'brasao-circular', name: 'Pulseira com brasão circular', image: 'produto-brasao.jpg', short: 'Um medalhão em relevo para colocar seu símbolo em evidência.', description: 'O detalhe circular cria um ponto de destaque para emblemas e símbolos, dando presença à identidade do seu projeto.', features: ['Brasão circular em relevo', 'Símbolo em destaque', 'Cores personalizáveis', 'Acabamento com presença'], uses: 'Instituições, eventos, igrejas e comunidades' },
  { slug: 'tecido-plaquinha-pvc', name: 'Pulseira de tecido diagramável', image: 'produto-tecido-plaquinha-pvc.png', short: 'Tecido estampado com plaquinha PVC para personalizar sua identificação.', description: 'Uma pulseira de tecido confortável e ajustável, com plaquinha PVC diagramável para aplicar QR code, marca, texto ou outras informações do seu evento.', features: ['Plaquinha PVC diagramável', 'QR code, logotipo ou texto', 'Tecido estampado e confortável', 'Fecho ajustável para eventos'], uses: 'Eventos, festivais, festas, campanhas e controle de acesso' },
  { slug: 'tecido', name: 'Pulseira de tecido', image: 'produto-tecido.jpg', short: 'Impressão total com fecho para eventos e controle de acesso.', description: 'Feita para experiências que precisam unir identificação e identidade visual. A impressão acompanha a peça de ponta a ponta.', features: ['Impressão ao longo da pulseira', 'Fecho para controle de acesso', 'Arte com cores e elementos visuais', 'Ideal para eventos'], uses: 'Festivais, festas, encontros e eventos' },
  { slug: 'chaveiro-silicone', name: 'Chaveiro de silicone', image: 'produto-chaveiro-silicone-v1.png', short: 'Chaveiro flexível e colorido para personalizar marcas, eventos e campanhas.', description: 'Um chaveiro leve e resistente, feito em silicone colorido com argola metálica. A superfície pode receber nomes, logotipos e mensagens para levar sua marca no dia a dia.', features: ['Silicone flexível e resistente', 'Cores vibrantes e personalizáveis', 'Nome, logotipo ou mensagem', 'Argola metálica para uso diário'], uses: 'Marcas, eventos, campanhas e brindes', catalogOnly: true },
  { slug: 'porta-copo-silicone', name: 'Porta-copo de silicone', image: 'produto-porta-copo-silicone-v1.png', short: 'Porta-copo de silicone personalizável para marcas, eventos e campanhas.', description: 'Um porta-copo de silicone resistente e flexível, criado para personalizar mesas, eventos e ações de marca com cores, nomes e logotipos.', features: ['Silicone flexível e durável', 'Cores personalizáveis', 'Nome, logotipo ou mensagem', 'Ideal para eventos e ações de marca'], uses: 'Eventos, marcas, campanhas e brindes', catalogOnly: true },
  { slug: 'cordao-tirante', name: 'Cordões e tirantes', image: 'produto-cordao-tirante-v1.png', short: 'Cordões e tirantes personalizados para identificação e ações de marca.', description: 'Cordões e tirantes de tecido com impressão personalizada, acabamento resistente e acessórios para levar crachás, copos e credenciais com praticidade.', features: ['Tecido resistente e confortável', 'Impressão personalizada', 'Mosquetão e acessórios', 'Ideal para eventos e equipes'], uses: 'Eventos, equipes, escolas e campanhas', catalogOnly: true },
  { slug: 'fita-salva-celular', name: 'Fita salva celular', image: 'produto-fita-salva-celular-v1.png', short: 'Fita personalizada para segurar o celular com sua marca em destaque.', description: 'Uma fita prática e confortável para apoiar o celular no dia a dia. Personalize com cores, nomes, logotipos e mensagens para criar uma peça útil e marcante.', features: ['Fita de tecido resistente', 'Aplicação no celular ou capinha', 'Texto, logotipo e cores personalizáveis', 'Conforto para segurar o aparelho'], uses: 'Marcas, eventos, campanhas e brindes', catalogOnly: true },
  { slug: 'bottons-personalizaveis', name: 'Bottons personalizáveis', image: 'produto-bottons-v1.png', short: 'Bottons personalizados para destacar ideias, marcas e campanhas.', description: 'Bottons redondos com acabamento brilhante e fecho metálico. Crie uma arte exclusiva para transformar cada peça em um destaque da sua ação.', features: ['Frente com arte personalizada', 'Acabamento brilhante', 'Fecho metálico com alfinete', 'Diversos tamanhos e aplicações'], uses: 'Eventos, campanhas, escolas e marcas', catalogOnly: true },
  { slug: 'alto-relevo', name: 'Pulseira personalizada em alto relevo', image: 'produto-alto-relevo-v1.png', short: 'Pulseira de silicone com letras e marcas em alto relevo.', description: 'Pulseira de silicone com personalização em alto relevo para criar uma presença tátil e marcante. Escolha as cores e destaque sua mensagem ou identidade.', features: ['Letras e logotipos em alto relevo', 'Silicone confortável e resistente', 'Cores vibrantes personalizáveis', 'Acabamento tátil e durável'], uses: 'Eventos, campanhas, academias e marcas', catalogOnly: true },
]

const faq = [
  ['Qual é a quantidade mínima?', 'O pedido mínimo é de 50 unidades. Conte a quantidade que você precisa ao solicitar o orçamento.'],
  ['Posso colocar minha logomarca?', 'Sim. Podemos aplicar texto, logotipo e outros elementos conforme o modelo e o acabamento escolhidos.'],
  ['Vocês fazem o layout?', 'Sim. Nossa equipe prepara o layout sem custo para você aprovar antes da produção.'],
  ['Quais cores estão disponíveis?', 'Há diferentes possibilidades de cores para a pulseira e para o acabamento. A equipe confirma as opções para o modelo escolhido.'],
  ['Quanto tempo leva para produzir?', 'O prazo depende do modelo, da quantidade e da aprovação da arte. Informamos a previsão junto com o orçamento.'],
  ['Vocês entregam para todo o Brasil?', 'Sim. Enviamos pedidos para todo o Brasil. O frete e o prazo são informados no orçamento.'],
  ['Como solicito um orçamento?', 'Envie o modelo desejado, a quantidade e uma breve descrição da sua ideia pelo WhatsApp ou pela página de contato.'],
]

// Shared with the static renderer; this module intentionally exports metadata.
// oxlint-disable-next-line react/only-export-components
export const pages = {
  '/': ['Pulseiras personalizadas | I’am Pulseiras', 'Pulseiras personalizadas para empresas, eventos e projetos. Conheça os modelos e crie a sua com a I’am Pulseiras.'],
  '/catalogo/': ['Modelos e brindes personalizados | I’am Pulseiras', 'Explore pulseiras e chaveiros personalizados para encontrar a opção ideal para o seu projeto.'],
  '/sobre/': ['Quem somos | I’am Pulseiras', 'Conheça a I’am Pulseiras e como ajudamos a transformar ideias em pulseiras personalizadas.'],
  '/contato/': ['Contato | I’am Pulseiras', 'Solicite um orçamento de pulseiras personalizadas por WhatsApp ou e-mail.'],
  '/pulseiras-personalizadas/': ['Pulseiras personalizadas para sua marca | I’am Pulseiras', 'Pulseiras em baixo relevo e silkscreen para eventos, empresas e campanhas. Receba um orçamento personalizado.'],
  '/privacidade/': ['Política de Privacidade | I’am Pulseiras', 'Saiba como a I’am Pulseiras trata dados pessoais e preferências de cookies.'],
  '/termos/': ['Termos de Uso | I’am Pulseiras', 'Condições gerais para navegação e contato com a I’am Pulseiras.'],
  '/envio-e-entrega/': ['Envio e Entrega | I’am Pulseiras', 'Informações gerais sobre orçamento, produção, frete e entrega dos pedidos.'],
  ...Object.fromEntries(models.map((model) => [`/pulseiras/${model.slug}/`, [`${model.name} | I’am Pulseiras`, `${model.description} Solicite um orçamento à I’am Pulseiras.`]])),
}

const nav = [['/#inicio', 'Início'], ['/#pulseiras', 'Pulseiras'], ['/#personalizacao', 'Personalização'], ['/#como-funciona', 'Como funciona'], ['/#quem-somos', 'Quem somos'], ['/#duvidas', 'Dúvidas']]
function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }
function Button({ href, children }) { return <a className="button" href={href}>{children}<Arrow /></a> }
function Eyebrow({ children }) { return <span className="eyebrow">{children}</span> }
function SectionTitle({ eyebrow, title, description }) { return <div className="section-title"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{description && <p>{description}</p>}</div> }
function Intro({ label, title, children }) { return <section className="page-intro"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p>{children}</p></section> }
function ProductCard({ model, index }) { const productImage = model.catalogOnly ? image(model.image) : image(`cutouts/${model.slug}.png`); return <article className="product-card"><a className="product-image" href={`/pulseiras/${model.slug}/`} aria-label={`Ver ${model.name}`}><img src={productImage} alt={model.name} width="1254" height="1254" loading={index > 2 ? 'lazy' : 'eager'} /><span className="product-index">0{index + 1}</span></a><div className="product-copy"><h3>{model.name}</h3><p>{model.short}</p><a className="text-link" href={`/pulseiras/${model.slug}/`}>Ver detalhes <Arrow /></a></div></article> }
function ProductGrid({ limit = 6, includeCatalogOnly = false }) { const availableModels = includeCatalogOnly ? models : models.filter((model) => !model.catalogOnly); return <div className="product-grid">{availableModels.slice(0, limit).map((model, index) => <ProductCard key={model.slug} model={model} index={index} />)}</div> }
function CallToAction() {
  return <section className="closing-section"><div className="closing-panel">
    <AnimatedGradient config={personalizationGradient} />
    <div className="closing-heading"><Eyebrow>Feitas para a sua ideia</Eyebrow><h2>Uma ideia sua.<br /><span>Uma pulseira única.</span></h2></div>
    <div className="closing-action"><span className="closing-symbol" aria-hidden="true"><ArrowUpRight size={32} /></span><p>Da primeira conversa ao último detalhe, a gente cria com você.</p><Button href={whatsapp()}>Vamos criar juntos</Button></div>
    <div className="closing-benefits"><span><PenTool size={17} /> Layout sem custo</span><span><PackageCheck size={17} /> A partir de 50 unidades</span><span><TruckElectric size={17} /> Entrega em todo o Brasil</span></div>
  </div></section>
}

function BudgetForm() {
  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = `Modelo: ${data.get('modelo')}\nQuantidade: ${data.get('quantidade')}\nNome: ${data.get('nome')}\nTelefone: ${data.get('telefone')}\nE-mail: ${data.get('email')}`
    window.location.href = whatsapp(`Olá! Gostaria de solicitar um orçamento.\n\n${body}`)
  }
  return <form className="budget-form" onSubmit={submit}>
    <div className="budget-form-intro"><div><Eyebrow>Vamos tirar do papel?</Eyebrow><h3>Seu projeto começa aqui.</h3><p>Conte sua ideia. A gente cuida dos detalhes.</p></div><span className="budget-stamp" aria-hidden="true"><PenTool size={25} /></span></div>
    <div className="budget-form-grid">
      <label>Modelo<select name="modelo" defaultValue="" required><option value="" disabled>Escolha seu modelo</option>{models.filter((model) => !model.catalogOnly).map((model) => <option key={model.slug}>{model.name}</option>)}<option>Pulseira NFC</option><option>Ainda não sei — preciso de ajuda</option></select></label>
      <label>Quantidade<input name="quantidade" type="number" min="50" step="1" placeholder="Mínimo de 50 unidades" required /></label>
      <label className="budget-wide">Seu nome<input name="nome" autoComplete="name" placeholder="Como podemos chamar você?" required /></label>
      <label>Telefone<input name="telefone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required /></label>
      <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com" required /></label>
    </div>
    <button className="button" type="submit"><span><Send size={17} /> Continuar no WhatsApp</span><ArrowUpRight size={20} /></button>
    <p className="form-note">Seus dados vão junto na conversa. O layout é por nossa conta.</p>
  </form>
}

function FooterSocial() { return <div className="social-links"><a href="https://www.instagram.com/iampulseiras/" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a><a href="https://www.facebook.com/iampulseiras" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.6 1.7-1.6H18V4a19 19 0 0 0-2.1-.1C13.4 3.9 12 5.4 12 8.1V10H9v3h3v8" /></svg></a></div> }

function LineIcon({ type = 'check' }) {
  const paths = {
    check: <><path d="M12 3 15 4l3 .5 1 3 2 2.5-1 3 .1 3-3 1.5-2 2.5-3-1-3 1-2-2.5-3-1.5.1-3-1-3 2-2.5 1-3 3-.5Z" /><path d="m8 11 3 3 5-5" /></>,
    pen: <><path d="m3 3 13 3 3 10-6 3-7-3Z" /><path d="m3 3 7 7m3 9 6-6m-4 7 5-5 2 2-5 5Z" /><circle cx="11" cy="11" r="2" /></>,
    truck: <><path d="M3 17V5h11v12H9m5-9h4l3 5v4h-2M5 17H3" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4 2 2 0 0 1 1-4h2a4 4 0 0 0 4-4c0-4-5-6-9-6Z" /><path d="M7 9h.01M11 6h.01M16 7h.01M6 14h.01" /></>,
    type: <><path d="M4 7V4h16v3M12 4v16M9 20h6" /></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="2" /><path d="m3 18 6-6 4 4 4-7 4 6" /></>,
    spark: <><path d="m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" /><path d="M20 2v4M18 4h4" /></>,
  }
  return <svg className="line-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type] || paths.check}</svg>
}

function HeroEffect({ className, href, children }) {
  const reducedMotion = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 180, damping: 24 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 24 })
  const glowOpacity = useSpring(0, { stiffness: 160, damping: 24 })
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(380px circle at ${lightX}% ${lightY}%, rgba(255,255,255,.14), transparent 75%)`
  const Card = href ? motion.a : motion.div
  function reset() {
    rotateX.set(0)
    rotateY.set(0)
    glowOpacity.set(0)
  }
  function move(event) {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    rotateX.set((.5 - y) * 3)
    rotateY.set((x - .5) * 3)
    lightX.set(x * 100)
    lightY.set(y * 100)
    glowOpacity.set(1)
  }
  return <Card className={`${className} hero-effect`} href={href}
    style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
    onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    {children}
    <motion.span className="hero-card-glow" aria-hidden="true" style={{ background: glow, opacity: reducedMotion ? 0 : glowOpacity }} />
  </Card>
}

function Hero() {
  return <><section className="hero" id="inicio">
    <div className="hero-meta"><span>Fábrica de pulseiras personalizadas</span><span>Feitas para a sua ideia</span></div>
    <div className="hero-grid">
      <HeroEffect className="hero-main">
        <div className="hero-copy"><Eyebrow>I'am Pulseiras / Personalizadas</Eyebrow><h1>Pulseiras do seu jeito.</h1><p>Pulseiras personalizadas para eventos, empresas, campanhas e projetos.</p><Button href={whatsapp()}>Solicitar orçamento</Button></div>
        <div className="hero-image"><img src={image('hero-pulseiras.jpg')} alt="Pulseiras de silicone personalizadas em várias cores" fetchPriority="high" width="1408" height="1200" /></div>
      </HeroEffect>
      <HeroEffect className="color-panel" href="#personalizacao"><span>Seu projeto, suas cores</span><div><h2>Crie algo só seu.</h2><span className="panel-link">Personalização <Arrow /></span></div></HeroEffect>
      <HeroEffect className="feature-panel" href="/pulseiras/baixo-relevo/"><div className="feature-image"><FallingBracelets /></div><div className="feature-caption"><div><span>Modelo em destaque</span><h2>Pulseira em baixo relevo</h2></div><Arrow /></div></HeroEffect>
      <HeroEffect className="factory-panel"><span>Direto da fábrica</span><p>Uma pulseira para cada ideia.</p></HeroEffect>
    </div>
  </section>
    <div className="benefit-strip" aria-label="Benefícios da I’am Pulseiras">
      <div className="benefit-items">
        <div className="benefit-item"><span className="benefit-icon"><PackageCheck aria-hidden="true" /></span><span>Pedido mínimo: <strong>50 unidades</strong></span></div>
        <div className="benefit-item"><span className="benefit-icon"><PenTool aria-hidden="true" /></span><span>Arte e layout <strong>sem custo</strong></span></div>
        <div className="benefit-item"><span className="benefit-icon"><TruckElectric aria-hidden="true" /></span><span>Entrega em <strong>todo o Brasil</strong></span></div>
      </div>
    </div>
  </>
}

const audiences = [
  { name: 'Empresas', detail: 'Vista a cultura da sua marca.', icon: Building2, tone: 'mint' },
  { name: 'Eventos', detail: 'O encontro começa no pulso.', icon: Music2, tone: 'yellow' },
  { name: 'Igrejas', detail: 'Um símbolo de conexão.', icon: HeartHandshake },
  { name: 'Escolas', detail: 'Uma turma. Muitas histórias.', icon: GraduationCap },
  { name: 'Academias', detail: 'Energia que veste a equipe.', icon: Dumbbell },
  { name: 'Festas', detail: 'Leve a lembrança com você.', icon: PartyPopper },
  { name: 'Campanhas', detail: 'Sua causa ganha presença.', icon: Megaphone },
  { name: 'Ações promocionais', detail: 'Faça sua marca circular.', icon: Sparkles },
]

function AudienceSection() {
  const reducedMotion = useReducedMotion()
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(20)
  const spotlight = useMotionTemplate`radial-gradient(550px circle at ${lightX}% ${lightY}%, rgba(104, 235, 206, .15), transparent 75%)`
  function moveLight(event) {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    lightX.set((event.clientX - bounds.left) / bounds.width * 100)
    lightY.set((event.clientY - bounds.top) / bounds.height * 100)
  }
  return <section className="section audience-section" aria-labelledby="audience-title">
    <div className="audience-stage" onPointerMove={moveLight}>
      <div className="audience-aurora" aria-hidden="true" />
      <motion.div className="audience-spotlight" style={{ background: spotlight }} aria-hidden="true" />
      <div className="audience-heading">
        <div><Eyebrow>Para quem produzimos</Eyebrow><h2 id="audience-title">Pequenas ações.<br /><span>Grandes conexões.</span></h2></div>
        <p>Tem uma galera para reunir?<br />Tem uma pulseira para isso. Escolha o seu universo e vamos criar juntos.</p>
      </div>
      <div className="audience-tiles">
        {audiences.map(({ name, detail, icon: Icon, tone }, index) => <motion.div
          key={name}
          className={`audience-tile${tone ? ` audience-tile--${tone}` : ''}`}
          whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        >
          <div className="audience-tile-top"><span className="audience-symbol"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span><span className="audience-number">0{index + 1}</span></div>
          <div className="audience-tile-copy"><h3>{name}</h3><p>{detail}</p></div>
        </motion.div>)}
      </div>
      <div className="audience-note"><span aria-hidden="true" /> Diferentes tribos. A mesma vontade de pertencer.</div>
    </div>
  </section>
}

function Home() { return <><CookieBanner />
  <Hero />
  <section className="section featured-models-section" id="pulseiras">
    <div className="featured-models-heading">
      <div><Eyebrow>Feitas para a sua ideia</Eyebrow><h2>Uma pulseira para cada projeto.</h2></div>
      <p>Explore os modelos em destaque. Cada um tem seu próprio acabamento e jeito de personalizar.</p>
    </div>
    <ProductGrid />
    <div className="section-end"><a className="featured-models-link" href="/catalogo/">Ver todos os modelos <Arrow /></a></div>
  </section>
  <AudienceSection />
  <section className="section personalization-section" id="personalizacao">
    <div className="personalization-heading"><div><Eyebrow>Personalização</Eyebrow><h2>Sua ideia. Sua marca.<br /><em>Sua pulseira.</em></h2></div><p>Cores, textos e detalhes que levam a sua identidade. Você conta o que precisa e nós ajudamos a dar forma à sua ideia, de acordo com o modelo escolhido.</p></div>
    <div className="personalization-copy">
      <div className="personalization-options">{[['Cores', 'Escolha a cor da pulseira e do acabamento.', 'palette'], ['Textos', 'Frases, nomes, datas, sites e numerações.', 'type'], ['Logotipos', 'Sua marca aplicada conforme o modelo escolhido.', 'image'], ['Tecnologia', 'QR Code e NFC: conecte sua pulseira a experiências digitais.', 'spark']].map(([title, description, icon]) => <div key={title}><span className="option-icon"><LineIcon type={icon} /></span><h3>{title}</h3><p>{description}</p></div>)}</div>
    </div>
    <div className="personalization-images"><BraceletPalette /><figure><img src={image('produto-pulseira-nfc-ajustavel-v2.png')} alt="Pulseira ajustável turquesa personalizável com tecnologia NFC" loading="lazy" /><figcaption>Pulseira NFC personalizável <ArrowUpRight size={16} aria-hidden="true" /></figcaption></figure><figure><img src={image('cutouts/tecido-plaquinha-pvc.png')} alt="Pulseira de tecido com plaquinha de PVC e QR Code" loading="lazy" /><figcaption>Pulseira com QR Code <ArrowUpRight size={16} aria-hidden="true" /></figcaption></figure></div>
    <div className="personalization-cta"><AnimatedGradient config={personalizationGradient} className="personalization-gradient" radius="22px" /><span className="personalization-cta-icon" aria-hidden="true"><PenTool size={25} strokeWidth={1.5} /></span><div><p>Sua ideia ganha forma. O layout é por nossa conta.</p><span>Você aprova a arte antes de qualquer produção.</span></div><Button href={whatsapp('Olá! Gostaria de criar uma pulseira personalizada e solicitar um orçamento. Vim pelo site da I’am Pulseiras. ✨')}>Quero criar minha pulseira</Button></div>
  </section>
  <ProcessFlow />
  <section className="section gallery-section" id="galeria"><SectionTitle eyebrow="Galeria" title="Pulseiras em diferentes momentos" description="Ideias de como as pulseiras podem aparecer em eventos, equipes, comunidades e no dia a dia." /><div className="gallery-grid"><img className="gallery-wide" src={image('galeria-evento.jpg')} alt="Pessoa em evento usando pulseiras coloridas" loading="lazy" /><img src={image('galeria-empresa.jpg')} alt="Equipe com pulseiras azuis" loading="lazy" /><img src={image('galeria-igreja.jpg')} alt="Pulseiras personalizadas brancas e douradas" loading="lazy" /><img src={image('galeria-academia.jpg')} alt="Pulseira preta usada durante atividade física" loading="lazy" /><img className="gallery-colors" src={image('galeria-comunidade-v1.png')} alt="Grupo diverso criando um projeto e usando pulseiras coloridas" loading="lazy" /></div></section>
  <section className="section about-section" id="quem-somos"><div className="about-intro"><Eyebrow>Quem somos</Eyebrow><h2>Especialistas em pulseiras que aproximam pessoas.</h2><p>A I’am Pulseiras fabrica e personaliza pulseiras para empresas, eventos, igrejas, escolas, academias e campanhas. Cuidamos do projeto inteiro, da escolha do modelo à produção.</p><div className="about-proof"><span>50+</span><p>unidades é o pedido mínimo.<br />Layout desenvolvido sem custo.</p></div><a className="text-link" href="/sobre/">Conheça a I’am <Arrow /></a></div><BudgetForm /></section>
  <section className="section faq-section" id="duvidas"><SectionTitle eyebrow="Dúvidas frequentes" title="Tudo o que costumam nos perguntar" description="Não encontrou sua resposta? Converse com a nossa equipe." /><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section><CallToAction />
</> }

function Catalog() { return <><Intro label="Nossos modelos" title="Uma peça para cada ideia.">Explore pulseiras e brindes personalizáveis para escolher o ponto de partida do seu projeto.</Intro><section className="section catalog-page"><ProductGrid limit={models.length} includeCatalogOnly /></section><CallToAction /></> }
function ModelPage({ model }) { return <><section className="model-page section"><a href="/catalogo/" className="back-link">← Todos os modelos</a><div className="model-layout"><div className="model-photo"><img src={image(model.image)} alt={model.name} /></div><div className="model-info"><Eyebrow>Modelos / I’am Pulseiras</Eyebrow><h1>{model.name}</h1><p className="model-description">{model.description}</p><div className="model-details"><h2>Possibilidades</h2><ul>{model.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div className="model-use"><span>Ideal para</span><p>{model.uses}</p></div><Button href={whatsapp(`Olá! Gostaria de solicitar um orçamento para ${model.name}. Vim pelo site da I’am Pulseiras. ✨`)}>Solicitar orçamento deste modelo</Button></div></div></section><section className="section related-section"><SectionTitle eyebrow="Continue explorando" title="Outros modelos" /><div className="product-grid">{models.filter((item) => item.slug !== model.slug && !item.catalogOnly).slice(0, 3).map((item, index) => <ProductCard key={item.slug} model={item} index={index} />)}</div></section></> }
function About() { return <><Intro label="Quem somos" title="Sua ideia ganha forma aqui.">Produzimos pulseiras personalizadas para marcas, eventos e projetos que querem criar uma conexão duradoura.</Intro><section className="section about-page"><div><img src={image('personalizacao-cores.jpg')} alt="Pulseiras em diferentes cores" /></div><div><Eyebrow>I’am Pulseiras</Eyebrow><h2>Uma pulseira pode dizer muito.</h2><p>Ela pode identificar uma equipe, marcar um evento, representar uma causa ou acompanhar uma lembrança. Ajudamos você a escolher o modelo, as cores e o acabamento para contar essa história.</p><p>Desenvolvemos o layout para aprovação antes de produzir e enviamos para todo o Brasil.</p><Button href="/catalogo/">Conhecer os modelos</Button></div></section><CallToAction /></> }
function ContactForm() { const [status, setStatus] = useState(''); function submit(event) { event.preventDefault(); const data = new FormData(event.currentTarget); const body = `Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\n\n${data.get('mensagem')}`; window.location.href = `mailto:${email}?subject=${encodeURIComponent('Contato pelo site — I’am Pulseiras')}&body=${encodeURIComponent(body)}`; setStatus(`Continue no seu aplicativo de e-mail para enviar a mensagem. Se ele não abrir, escreva para ${email}.`) } return <form onSubmit={submit} className="contact-form"><div className="form-row"><label>Seu nome<input name="nome" autoComplete="name" placeholder="Como podemos chamar você?" required maxLength={100} /></label><label>Seu e-mail<input name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required maxLength={200} /></label></div><label>Conte um pouco sobre sua ideia<textarea name="mensagem" placeholder="Modelo, quantidade e ocasião…" rows={5} required maxLength={3000} /></label><p className="form-note">Este formulário prepara uma mensagem no seu aplicativo de e-mail.</p><button className="button" type="submit">Continuar por e-mail <Arrow /></button><p role="status" className="form-note">{status}</p></form> }
function Contact() { return <><Intro label="Contato" title="Vamos criar sua pulseira?">Conte o que você tem em mente. Podemos conversar sobre modelos, quantidade, cores e acabamento.</Intro><section className="section contact-page"><div className="contact-direct"><Eyebrow>Fale com a gente</Eyebrow><h2>Seu projeto começa com uma conversa.</h2><p>Prefere falar agora? Envie sua ideia pelo WhatsApp. Se quiser, também pode preparar uma mensagem por e-mail.</p><Button href={whatsapp()}>Conversar no WhatsApp</Button><div className="contact-details"><a href="tel:+5519994024138">(19) 99402-4138</a><a href={`mailto:${email}`}>{email}</a></div></div><ContactForm /></section></> }
function CustomBraceletsLanding() {
  const featuredModels = [
    ...['baixo-relevo', 'silkscreen', 'slim'].map((slug) => ({ ...models.find((m) => m.slug === slug), photo: `cutouts/${slug}.png` })),
    { name: 'Pulseira com QR Code', short: 'Sua marca e informações digitais em uma pulseira de tecido com plaquinha personalizável.', photo: 'cutouts/tecido-plaquinha-pvc.png' },
    { name: 'Pulseira com RFID', short: 'Identificação por aproximação para conectar sua pulseira a experiências digitais.', photo: 'produto-pulseira-nfc-ajustavel-transparente-v1.png' },
    { ...models.find((m) => m.slug === 'tecido'), photo: 'cutouts/tecido.png' },
  ]
  const landingFaq = [
    ['Qual é a quantidade mínima?', 'O pedido mínimo é de 50 unidades. Conte a quantidade que você precisa ao solicitar o orçamento.'],
    ['Posso colocar minha logomarca?', 'Sim. Podemos aplicar texto, logotipo e outros elementos conforme o modelo e o acabamento escolhidos.'],
    ['Vocês fazem o layout?', 'Sim. Nossa equipe prepara o layout sem custo para você aprovar antes da produção.'],
    ['Quanto tempo leva para produzir?', 'O prazo depende do modelo, da quantidade e da aprovação da arte. Informamos a previsão junto com o orçamento.'],
    ['Vocês entregam para todo o Brasil?', 'Sim. Enviamos pedidos para todo o Brasil. O frete e o prazo são informados no orçamento.'],
  ]
  return <div className="lp">

    {/* ── Hero ── */}
    <section className="lp-hero">
      <div className="lp-hero-inner">
        <div className="lp-hero-copy">
          <span className="lp-badge"><Sparkles size={14} /> Pulseiras de silicone personalizadas</span>
          <h1>Sua marca.<br />No pulso de<br />quem importa.</h1>
          <p>Pulseiras de silicone personalizadas para eventos, empresas, campanhas e projetos. Escolha o modelo, aprove a arte e receba em todo o Brasil.</p>
          <div className="lp-hero-actions">
            <a className="lp-btn-primary" href="#orcamento"><Send size={17} /> Solicitar orçamento <ArrowUpRight size={18} /></a>
            <a className="lp-btn-ghost" href="#modelos">Conhecer os modelos <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="lp-hero-visual">
          <div className="lp-hero-img-wrap">
            <img src={image('hero-pulseiras-transparente-v1.png')} alt="Pulseiras de silicone personalizadas em várias cores" width="1036" height="1450" fetchPriority="high" />
          </div>
        </div>
          <div className="lp-hero-floating-cards">
            <div className="lp-float-card lp-float-card--1"><PackageCheck size={18} /><span>Pedido mínimo<strong>50 unidades</strong></span></div>
            <div className="lp-float-card lp-float-card--2"><PenTool size={18} /><span>Layout<strong>sem custo</strong></span></div>
            <div className="lp-float-card lp-float-card--3"><TruckElectric size={18} /><span>Entrega em<strong>todo o Brasil</strong></span></div>
          </div>
      </div>
    </section>

    {/* ── Trust Strip ── */}
    <section className="lp-trust">
      <div className="lp-trust-inner">
        {[['Direto da fábrica', 'Preço justo e sem intermediários.'], ['Arte e layout grátis', 'Você aprova antes de produzir.'], ['Envio nacional', 'Para todas as regiões do Brasil.'], ['Atendimento humanizado', 'Equipe pronta pelo WhatsApp.']].map(([title, desc]) =>
          <div key={title} className="lp-trust-item"><LineIcon type="check" /><div><strong>{title}</strong><span>{desc}</span></div></div>
        )}
      </div>
    </section>

    {/* ── Products ── */}
    <section className="lp-products" id="modelos">
      <div className="lp-section-header">
        <Eyebrow>Modelos em destaque</Eyebrow>
        <h2>Um acabamento para cada ideia.</h2>
        <p>Escolha o modelo que mais combina com o seu projeto. Cada um tem um acabamento diferente e pode ser personalizado com cores, textos e logotipos.</p>
      </div>
      <div className="lp-product-grid">
        {featuredModels.map((m, i) =>
          <article key={m.name} className={`lp-product-card${m.name.includes('RFID') ? ' lp-product-card--rfid' : ''}`}>
            <div className="lp-product-img"><img src={image(m.photo)} alt={m.name} loading={i > 2 ? 'lazy' : 'eager'} /></div>
            <div className="lp-product-body">
              <h3>{m.name}</h3>
              <p>{m.short}</p>
            </div>
          </article>
        )}
      </div>
      <div className="lp-products-cta"><a className="lp-btn-primary" href="#orcamento"><Send size={17} /> Solicitar orçamento <ArrowUpRight size={18} /></a></div>
    </section>

    {/* ── Personalization Studio ── */}
    <PersonalizationStudio whatsappUrl={whatsapp('Olá! Estava navegando no estúdio de personalização do site da I’am Pulseiras e gostaria de solicitar uma prévia gratuita da minha pulseira. ✨')} />

    {/* ── How It Works ── */}
    <ModernProcessFlow whatsappUrl={whatsapp('Olá! Gostaria de entender mais sobre o processo e solicitar um orçamento de pulseiras personalizadas. ✨')} />

    {/* ── For whom ── */}
    <section className="lp-audiences">
      <div className="lp-section-header">
        <Eyebrow>Para quem é</Eyebrow>
        <h2>Uma pulseira para cada universo.</h2>
      </div>
      <div className="lp-audience-grid">
        {[{ name: 'Empresas', desc: 'Endomarketing, brindes e cultura.', Icon: Building2 }, { name: 'Eventos', desc: 'Credenciamento e identificação.', Icon: Music2 }, { name: 'Igrejas', desc: 'Retiros, encontros e comunidades.', Icon: HeartHandshake }, { name: 'Escolas', desc: 'Formaturas, turmas e projetos.', Icon: GraduationCap }, { name: 'Academias', desc: 'Planos, equipes e desafios.', Icon: Dumbbell }, { name: 'Campanhas', desc: 'Causas, ações e conscientização.', Icon: Megaphone }].map(({ name, desc, Icon }) =>
          <div key={name} className="lp-audience-item"><Icon size={22} strokeWidth={1.7} /><h3>{name}</h3><p>{desc}</p></div>
        )}
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="lp-faq">
      <div className="lp-faq-inner">
        <div className="lp-faq-copy">
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2>O que costumam nos perguntar.</h2>
          <p>Não encontrou? <a href={whatsapp('Olá! Tenho uma dúvida sobre pulseiras personalizadas.')}>Fale com a equipe</a>.</p>
        </div>
        <div className="lp-faq-list">{landingFaq.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
      </div>
    </section>

    {/* ── Budget Form ── */}
    <section className="lp-form" id="orcamento">
      <div className="lp-form-inner">
        <div className="lp-form-copy">
          <Eyebrow>Solicitar orçamento</Eyebrow>
          <h2>Seu projeto começa aqui.</h2>
          <p>Informe o modelo e a quantidade. A equipe retorna com as melhores condições para a sua marca.</p>
          <div className="lp-form-extras">
            <div><PackageCheck size={18} /><span>Pedido mínimo: 50 unidades</span></div>
            <div><PenTool size={18} /><span>Layout desenvolvido sem custo</span></div>
            <div><Send size={18} /><span>Resposta rápida pelo WhatsApp</span></div>
          </div>
        </div>
        <BudgetForm />
      </div>
    </section>

    {/* ── Closing CTA ── */}
    <section className="lp-closing">
      <AnimatedGradient config={{ preset: 'custom', color1: '#0c2e28', color2: '#1a6358', color3: '#0f3a30', speed: 10, swirl: 55, swirlIterations: 6, scale: 0.7, softness: 100, proportion: 45 }} />
      <div className="lp-closing-inner">
        <Eyebrow>Pronto para criar?</Eyebrow>
        <h2>Uma pulseira simples pode criar<br />uma <em>grande conexão.</em></h2>
        <p>Da primeira conversa ao último detalhe, a gente cria com você.</p>
        <div className="lp-closing-actions">
          <a className="lp-btn-primary lp-btn-primary--light" href={whatsapp()}><Send size={17} /> Conversar no WhatsApp <ArrowUpRight size={18} /></a>
          <a className="lp-btn-ghost" href="#orcamento">Preencher formulário <ArrowUpRight size={16} /></a>
        </div>
        <div className="lp-closing-benefits"><span><PenTool size={15} /> Layout sem custo</span><span><PackageCheck size={15} /> A partir de 50 un.</span><span><TruckElectric size={15} /> Todo o Brasil</span></div>
      </div>
    </section>
  </div> }
export { CustomBraceletsLanding }

const policyPages = {
  '/privacidade/': {
    title: 'Política de Privacidade',
    intro: 'Esta política explica, de forma simples, como a I’am Pulseiras trata informações quando você navega pelo site ou entra em contato conosco.',
    sections: [
      ['01', 'Quais informações podemos receber?', <><p>Podemos receber os dados que você decide informar ao solicitar um orçamento ou falar com a equipe, como nome, telefone, e-mail, modelo de interesse, quantidade e detalhes do projeto.</p><p>Também podemos receber dados técnicos básicos, como endereço IP, tipo de navegador e páginas acessadas, quando necessários para segurança, funcionamento e melhoria do site.</p></>],
      ['02', 'Como usamos essas informações?', <><p>Usamos os dados para responder solicitações, preparar orçamentos, orientar sobre modelos, organizar a produção e a entrega e manter a comunicação sobre o projeto.</p><p>Não vendemos dados pessoais. O compartilhamento ocorre apenas quando necessário para operar o site, atender à solicitação ou cumprir obrigação legal, sempre dentro da finalidade aplicável.</p></>],
      ['03', 'Cookies e preferências', <><p>O site pode usar cookies necessários para funcionar corretamente e, quando aplicável, cookies opcionais para lembrar preferências ou entender o uso das páginas. Você pode aceitar ou rejeitar cookies opcionais no aviso apresentado no site.</p><p>A recusa de cookies opcionais não impede o uso das funções essenciais.</p></>],
      ['04', 'Seus direitos e contato', <><p>Nos limites da legislação aplicável, você pode solicitar confirmação de tratamento, acesso, correção, atualização ou exclusão de dados pessoais, além de informações sobre seu uso.</p><p>Para dúvidas ou solicitações, fale conosco pelo <a href="/contato/">canal de contato</a> ou pelo e-mail iampulseiras@gmail.com. Podemos pedir informações adicionais para confirmar a identidade de quem faz a solicitação.</p></>],
      ['05', 'Atualizações desta política', <p>Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou na legislação. A versão vigente estará sempre disponível nesta página.</p>],
    ],
  },
  '/termos/': {
    title: 'Termos de Uso',
    intro: 'Ao acessar este site, você concorda com as condições gerais abaixo. Elas organizam o uso das informações e dos canais da I’am Pulseiras.',
    sections: [
      ['01', 'Uso do site', <p>O site apresenta a I’am Pulseiras, seus modelos e possibilidades de personalização. Use o conteúdo de forma legítima e não tente comprometer a segurança, a disponibilidade ou o funcionamento das páginas.</p>],
      ['02', 'Catálogo, imagens e orçamento', <><p>Imagens, cores, medidas, acabamentos e exemplos têm finalidade ilustrativa. A disponibilidade e as características finais dependem do modelo, da arte aprovada e das condições confirmadas no orçamento.</p><p>O envio de uma solicitação pelo site ou WhatsApp não representa, por si só, a aceitação de um pedido. A produção começa após a confirmação das condições comerciais e da arte.</p></>],
      ['03', 'Conteúdo enviado pelo cliente', <p>Ao enviar logotipos, textos ou imagens, você declara ter autorização para utilizá-los e permite que sejam usados exclusivamente para avaliação, layout e produção do projeto solicitado. Não envie conteúdo ilegal, ofensivo ou que viole direitos de terceiros.</p>],
      ['04', 'Propriedade intelectual', <p>Textos, identidade visual, fotografias, layouts e elementos do site pertencem à I’am Pulseiras ou são utilizados com autorização. Não copie, distribua ou explore comercialmente esses materiais sem autorização prévia.</p>],
      ['05', 'Links e disponibilidade', <p>Podemos atualizar, retirar ou corrigir páginas e informações a qualquer momento. Links para serviços externos dependem de seus próprios termos e políticas. Buscamos manter o site disponível, mas não garantimos ausência de interrupções ou erros.</p>],
      ['06', 'Contato', <p>Se tiver dúvidas sobre estes termos, entre em contato antes de enviar seu pedido. O uso continuado do site após uma atualização representa a concordância com a versão publicada.</p>],
    ],
  },
  '/envio-e-entrega/': {
    title: 'Envio e Entrega',
    intro: 'Cada pedido é preparado de acordo com o modelo, a quantidade e a arte aprovados. As condições finais são informadas no orçamento.',
    sections: [
      ['01', 'Orçamento e aprovação', <><p>Para calcular a produção e o envio, precisamos do modelo, da quantidade, da personalização e do destino. A equipe apresenta as condições comerciais, o frete estimado e a previsão de prazo.</p><p>A produção só é iniciada após a confirmação do pedido e a aprovação do layout pelo cliente.</p></>],
      ['02', 'Produção e prazo', <p>O prazo varia conforme o produto, a quantidade, a complexidade da personalização e a fila de produção. A previsão começa a contar conforme indicado no orçamento, normalmente após a aprovação da arte e a confirmação necessária para produzir.</p>],
      ['03', 'Frete e transportadora', <p>Enviamos pedidos para todo o Brasil, conforme disponibilidade da transportadora e do destino. O valor do frete e a modalidade de envio são informados antes da confirmação do pedido. Eventuais restrições de rota ou endereço podem alterar a previsão.</p>],
      ['04', 'Acompanhamento e recebimento', <p>Quando disponível, compartilhamos o código ou a informação de acompanhamento do envio. Ao receber, confira a embalagem. Se houver avaria, divergência ou problema com a entrega, registre a ocorrência e fale conosco assim que possível, com fotos e os dados do pedido.</p>],
      ['05', 'Imprevistos e atualização', <p>Fatores externos, como paralisações, condições climáticas, restrições de transporte ou informações incompletas de endereço, podem afetar o prazo. Nesses casos, buscamos informar a situação e orientar sobre os próximos passos.</p>],
    ],
  },
}

function Policy({ path }) { const content = policyPages[path]; return <><Intro label="Informações" title={content.title}>{content.intro}</Intro><section className="policy-content">{content.sections.map(([number, title, body]) => <section key={title}><Eyebrow>{number}</Eyebrow><h2>{title}</h2>{body}</section>)}<a className="text-link" href="/contato/">Fale com a nossa equipe <Arrow /></a></section></> }

export default function App({ path = '/' }) { const [menuOpen, setMenuOpen] = useState(false); const current = path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`; const model = models.find((item) => current === `/pulseiras/${item.slug}/`); return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><header className="site-header"><div className="header-inner"><a className="brand" href="/" aria-label="I’am Pulseiras — página inicial"><img src={image('iam-logo.png')} alt="" /><span><strong>I’am Pulseiras</strong><small>PERSONALIZADAS</small></span></a><nav className={menuOpen ? 'main-nav open' : 'main-nav'} id="main-nav" aria-label="Navegação principal">{nav.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-mobile-cta" href={whatsapp()}>Solicitar orçamento <Arrow /></a></nav><a className="header-cta" href={whatsapp()}>Solicitar orçamento <Arrow /></a><button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button></div></header><main id="conteudo">{current === '/' ? <Home /> : current === '/catalogo/' ? <Catalog /> : model ? <ModelPage model={model} /> : current === '/sobre/' ? <About /> : current === '/contato/' ? <Contact /> : ['/privacidade/', '/termos/', '/envio-e-entrega/'].includes(current) ? <Policy path={current} /> : <><Intro label="Página não encontrada" title="Vamos voltar ao início?">O endereço que você procura não está disponível.</Intro><div className="section"><Button href="/">Voltar ao início</Button></div></>}</main><footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand" href="/"><img src={image('iam-logo.png')} alt="" /><span><strong>I’am Pulseiras</strong><small>PERSONALIZADAS</small></span></a><p>Fabricação e personalização de pulseiras para empresas, eventos e projetos.</p></div><div><h2>Explore</h2><a href="/catalogo/">Modelos</a><a href="/#personalizacao">Personalização</a><a href="/#como-funciona">Como funciona</a><a href="/sobre/">Quem somos</a><a href="/#duvidas">Dúvidas</a></div><div><h2>Informações</h2><a href="/privacidade/">Política de Privacidade</a><a href="/termos/">Termos de Uso</a><a href="/envio-e-entrega/">Envio e Entrega</a></div><div><h2>Contato</h2><a href={whatsapp()}>(19) 99402-4138</a><a href={`mailto:${email}`}>{email}</a><FooterSocial /><span className="footer-minimum">Pedido mínimo: 50 unidades</span></div></div><div className="footer-bottom"><span>Todos os direitos reservados | I’am Pulseiras – CNPJ: 45.642.987/0001-86</span><span>Av. Trompowski, nº 210, 10º Andar – Bairro Centro | CEP: 88.015-300 | Florianópolis – SC</span></div></footer><a className="floating-whatsapp" href={whatsapp()} aria-label="Falar no WhatsApp"><svg aria-hidden="true" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5ZM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A10 10 0 1 1 12 22Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.3-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.6l-1-2.2c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.1 3.3 5.1 4.6 1.9.8 2.6.8 3.5.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.7-.4Z"/></svg><span>Falar no WhatsApp</span></a></> }
