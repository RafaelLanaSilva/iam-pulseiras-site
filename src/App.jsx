import { useState } from 'react'
import { PackageCheck, PenTool, TruckElectric, Building2, Music2, HeartHandshake, GraduationCap, Dumbbell, PartyPopper, Megaphone, Sparkles, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useMotionValue, useMotionTemplate, useSpring } from 'motion/react'
import './App.css'

const image = (file) => `/images/lovable-reference/${file}`
const phone = '5519994024138'
const email = 'iampulseiras@gmail.com'
const whatsapp = (message = 'Olá! Vim pelo site da I’am Pulseiras e gostaria de solicitar um orçamento.') => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

const models = [
  { slug: 'baixo-relevo', name: 'Pulseira em baixo relevo', image: 'produto-baixo-relevo-v2.png', short: 'Gravação no silicone com acabamento resistente e leitura marcante.', description: 'Um modelo clássico para destacar nomes, frases e marcas. A arte é gravada diretamente no silicone e pode receber preenchimento em outra cor.', features: ['Gravação em cavidade no silicone', 'Preenchimento colorido opcional', 'Texto e logotipo', 'Tamanhos adulto e infantil'], uses: 'Empresas, campanhas, eventos e academias' },
  { slug: 'slim', name: 'Pulseira Slim', image: 'produto-slim-v2.png', short: 'Mais fina e discreta, perfeita para uso prolongado.', description: 'Uma opção leve e versátil para quem quer distribuir uma lembrança que as pessoas gostem de usar no dia a dia.', features: ['Perfil fino e confortável', 'Diversas opções de cor', 'Texto e logotipo', 'Boa escolha para grandes quantidades'], uses: 'Eventos, campanhas, escolas e ações promocionais' },
  { slug: 'silkscreen', name: 'Pulseira Silkscreen', image: 'produto-silkscreen-v2.png', short: 'Impressão chapada na superfície, em preto ou branco.', description: 'A tinta é aplicada diretamente sobre o silicone, criando uma impressão chapada e nítida. A pulseira pode ter qualquer cor, enquanto a gravação é feita somente em preto ou branco.', features: ['Impressão chapada na superfície', 'Gravação em preto ou branco', 'Pulseira em várias cores', 'Visual limpo e versátil'], uses: 'Marcas, empresas, eventos e projetos especiais' },
  { slug: 'brasao-circular', name: 'Pulseira com brasão circular', image: 'produto-brasao.jpg', short: 'Um medalhão em relevo para colocar seu símbolo em evidência.', description: 'O detalhe circular cria um ponto de destaque para emblemas e símbolos, dando presença à identidade do seu projeto.', features: ['Brasão circular em relevo', 'Símbolo em destaque', 'Cores personalizáveis', 'Acabamento com presença'], uses: 'Instituições, eventos, igrejas e comunidades' },
  { slug: 'tecido-plaquinha-pvc', name: 'Pulseira de tecido diagramável', image: 'produto-tecido-plaquinha-pvc.png', short: 'Tecido estampado com plaquinha PVC para personalizar sua identificação.', description: 'Uma pulseira de tecido confortável e ajustável, com plaquinha PVC diagramável para aplicar QR code, marca, texto ou outras informações do seu evento.', features: ['Plaquinha PVC diagramável', 'QR code, logotipo ou texto', 'Tecido estampado e confortável', 'Fecho ajustável para eventos'], uses: 'Eventos, festivais, festas, campanhas e controle de acesso' },
  { slug: 'tecido', name: 'Pulseira de tecido', image: 'produto-tecido.jpg', short: 'Impressão total com fecho para eventos e controle de acesso.', description: 'Feita para experiências que precisam unir identificação e identidade visual. A impressão acompanha a peça de ponta a ponta.', features: ['Impressão ao longo da pulseira', 'Fecho para controle de acesso', 'Arte com cores e elementos visuais', 'Ideal para eventos'], uses: 'Festivais, festas, encontros e eventos' },
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
  '/catalogo/': ['Modelos de pulseiras | I’am Pulseiras', 'Explore seis modelos de pulseiras personalizadas e encontre a opção ideal para o seu projeto.'],
  '/sobre/': ['Quem somos | I’am Pulseiras', 'Conheça a I’am Pulseiras e como ajudamos a transformar ideias em pulseiras personalizadas.'],
  '/contato/': ['Contato | I’am Pulseiras', 'Solicite um orçamento de pulseiras personalizadas por WhatsApp ou e-mail.'],
  '/privacidade/': ['Política de Privacidade | I’am Pulseiras', 'Informações de privacidade. Conteúdo em preparação.'],
  '/termos/': ['Termos de Uso | I’am Pulseiras', 'Condições de uso do site. Conteúdo em preparação.'],
  '/envio-e-entrega/': ['Envio e Entrega | I’am Pulseiras', 'Informações sobre frete e entrega. Conteúdo em preparação.'],
  ...Object.fromEntries(models.map((model) => [`/pulseiras/${model.slug}/`, [`${model.name} | I’am Pulseiras`, `${model.description} Solicite um orçamento à I’am Pulseiras.`]])),
}

const nav = [['/#inicio', 'Início'], ['/#pulseiras', 'Pulseiras'], ['/#personalizacao', 'Personalização'], ['/#como-funciona', 'Como funciona'], ['/#quem-somos', 'Quem somos'], ['/#duvidas', 'Dúvidas']]
function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }
function Button({ href, children }) { return <a className="button" href={href}>{children}<Arrow /></a> }
function Eyebrow({ children }) { return <span className="eyebrow">{children}</span> }
function SectionTitle({ eyebrow, title, description }) { return <div className="section-title"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{description && <p>{description}</p>}</div> }
function Intro({ label, title, children }) { return <section className="page-intro"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p>{children}</p></section> }
function ProductCard({ model, index }) { return <article className="product-card"><a className="product-image" href={`/pulseiras/${model.slug}/`} aria-label={`Ver ${model.name}`}><img src={image(`cutouts/${model.slug}.png`)} alt={model.name} width="1254" height="1254" loading={index > 2 ? 'lazy' : 'eager'} /><span className="product-index">0{index + 1}</span></a><div className="product-copy"><h3>{model.name}</h3><p>{model.short}</p><a className="text-link" href={`/pulseiras/${model.slug}/`}>Ver detalhes <Arrow /></a></div></article> }
function ProductGrid({ limit = 6 }) { return <div className="product-grid">{models.slice(0, limit).map((model, index) => <ProductCard key={model.slug} model={model} index={index} />)}</div> }
function CallToAction() { return <section className="closing-section"><div><Eyebrow>Vamos começar?</Eyebrow><h2>Vamos transformar sua ideia em uma pulseira?</h2><p>Conte um pouco sobre o seu projeto. A equipe ajuda você a encontrar a melhor opção.</p><Button href={whatsapp()}>Solicitar orçamento pelo WhatsApp</Button></div></section> }

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
      <HeroEffect className="feature-panel" href="/pulseiras/baixo-relevo/"><div className="feature-image"><img src={image('hero-pulseiras-pilha-v1.png')} alt="Pulseiras coloridas em baixo relevo suspensas sobre uma pilha" /></div><div className="feature-caption"><div><span>Modelo em destaque</span><h2>Pulseira em baixo relevo</h2></div><Arrow /></div></HeroEffect>
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
        {audiences.map(({ name, detail, icon: Icon, tone }, index) => <motion.a
          key={name}
          className={`audience-tile${tone ? ` audience-tile--${tone}` : ''}`}
          href={whatsapp(`Olá! Gostaria de personalizar pulseiras para ${name.toLowerCase()}. Podem me ajudar?`)}
          aria-label={`Solicitar orçamento para ${name.toLowerCase()}`}
          whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        >
          <div className="audience-tile-top"><span className="audience-symbol"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span><span className="audience-number">0{index + 1}</span></div>
          <div className="audience-tile-copy"><h3>{name}</h3><p>{detail}</p></div>
          <ArrowUpRight className="audience-go" size={19} aria-hidden="true" />
        </motion.a>)}
      </div>
      <div className="audience-note"><span aria-hidden="true" /> Diferentes tribos. A mesma vontade de pertencer.</div>
    </div>
  </section>
}

function Home() { return <>
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
    <div className="personalization-copy"><Eyebrow>Personalização</Eyebrow><h2>Sua ideia. Sua marca. Sua pulseira.</h2><p>Cores, textos, logotipos e elementos visuais podem ser personalizados de acordo com o modelo escolhido. Você conta o que precisa e nós cuidamos do resto.</p>
      <div className="personalization-options">{[['Cores', 'Escolha a cor da pulseira e do acabamento.', 'palette'], ['Textos', 'Frases, nomes, datas, sites e numerações.', 'type'], ['Logotipos', 'Sua marca aplicada conforme o modelo escolhido.', 'image'], ['Acabamentos', 'Relevo, impressão, brasão ou trançado.', 'spark']].map(([title, description, icon]) => <div key={title}><span className="option-icon"><LineIcon type={icon} /></span><h3>{title}</h3><p>{description}</p></div>)}</div>
      <div className="personalization-cta"><p>Nós desenvolvemos o layout da sua pulseira sem custo.</p><span>Você aprova a arte antes de qualquer produção.</span><Button href={whatsapp('Olá! Gostaria de criar uma pulseira personalizada e solicitar um orçamento.')}>Quero criar minha pulseira</Button></div>
    </div>
    <div className="personalization-images"><img src={image('personalizacao-cores.jpg')} alt="Pulseiras personalizadas em várias cores" loading="lazy" /><img src={image('produto-silkscreen-v2.png')} alt="Pulseira colorida com impressão branca chapada" loading="lazy" /><img src={image('produto-brasao.jpg')} alt="Pulseira azul com brasão circular" loading="lazy" /></div>
  </section>
  <section className="section process-section" id="como-funciona"><SectionTitle eyebrow="Como funciona" title="Do primeiro contato às pulseiras na sua mão" /><div className="process-grid">{[['Conte sua ideia', 'Envie as informações do projeto e a quantidade desejada.', 'pen'], ['Escolha o modelo', 'A equipe ajuda a encontrar a opção mais adequada.', 'palette'], ['Aprove o layout', 'O layout personalizado é desenvolvido para aprovação.', 'check'], ['Receba suas pulseiras', 'Produção e envio para todo o Brasil.', 'truck']].map(([title, description, icon], index) => <article key={title}><div className="process-top"><span className="option-icon"><LineIcon type={icon} /></span><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}</div></section>
  <section className="section gallery-section" id="galeria"><SectionTitle eyebrow="Galeria" title="Pulseiras em diferentes momentos" description="Ideias de como as pulseiras podem aparecer em eventos, equipes, comunidades e no dia a dia." /><div className="gallery-grid"><img className="gallery-wide" src={image('galeria-evento.jpg')} alt="Pessoa em evento usando pulseiras coloridas" loading="lazy" /><img src={image('galeria-empresa.jpg')} alt="Equipe com pulseiras azuis" loading="lazy" /><img src={image('galeria-igreja.jpg')} alt="Pulseiras personalizadas brancas e douradas" loading="lazy" /><img src={image('galeria-academia.jpg')} alt="Pulseira preta usada durante atividade física" loading="lazy" /><img className="gallery-colors" src={image('personalizacao-cores.jpg')} alt="Variedade de cores de pulseiras personalizadas" loading="lazy" /></div></section>
  <section className="section about-section" id="quem-somos"><div><Eyebrow>Quem somos</Eyebrow><h2>Especialistas em pulseiras personalizadas</h2><p>A I’am Pulseiras fabrica e personaliza pulseiras para empresas, eventos, igrejas, escolas, academias e campanhas. Cuidamos de todo o processo: da escolha do modelo à criação do layout e produção.</p><p>Nosso foco é simples: entregar um produto bem-feito e um atendimento que resolve.</p><a className="text-link" href="/sobre/">Conheça a I’am <Arrow /></a></div><div className="about-points">{[['Materiais selecionados', 'Pulseiras resistentes e confortáveis para acompanhar seu projeto.', 'check'], ['Personalização', 'Diversas possibilidades de cores, textos, logos e acabamentos.', 'spark'], ['Layout sem custo', 'Nossa equipe prepara a arte para você visualizar antes da produção.', 'pen'], ['Entrega nacional', 'Produção e envio para clientes em todo o Brasil.', 'truck'], ['Atendimento especializado', 'Ajuda para escolher modelo, acabamento e quantidade adequados ao projeto.', 'image']].map(([title, description, icon]) => <article key={title}><span className="option-icon"><LineIcon type={icon} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>
  <section className="section faq-section" id="duvidas"><SectionTitle eyebrow="Dúvidas frequentes" title="Tudo o que costumam nos perguntar" description="Não encontrou sua resposta? Converse com a nossa equipe." /><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section><CallToAction />
</> }

function Catalog() { return <><Intro label="Nossos modelos / 01—06" title="Uma pulseira para cada ideia.">Explore as possibilidades e escolha o ponto de partida para o seu projeto.</Intro><section className="section catalog-page"><ProductGrid /></section><CallToAction /></> }
function ModelPage({ model }) { return <><section className="model-page section"><a href="/catalogo/" className="back-link">← Todos os modelos</a><div className="model-layout"><div className="model-photo"><img src={image(model.image)} alt={model.name} /></div><div className="model-info"><Eyebrow>Modelos / I’am Pulseiras</Eyebrow><h1>{model.name}</h1><p className="model-description">{model.description}</p><div className="model-details"><h2>Possibilidades</h2><ul>{model.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div className="model-use"><span>Ideal para</span><p>{model.uses}</p></div><Button href={whatsapp(`Olá! Gostaria de solicitar um orçamento para ${model.name}.`)}>Solicitar orçamento deste modelo</Button></div></div></section><section className="section related-section"><SectionTitle eyebrow="Continue explorando" title="Outros modelos" /><div className="product-grid">{models.filter((item) => item.slug !== model.slug).slice(0, 3).map((item, index) => <ProductCard key={item.slug} model={item} index={index} />)}</div></section></> }
function About() { return <><Intro label="Quem somos" title="Sua ideia ganha forma aqui.">Produzimos pulseiras personalizadas para marcas, eventos e projetos que querem criar uma conexão duradoura.</Intro><section className="section about-page"><div><img src={image('personalizacao-cores.jpg')} alt="Pulseiras em diferentes cores" /></div><div><Eyebrow>I’am Pulseiras</Eyebrow><h2>Uma pulseira pode dizer muito.</h2><p>Ela pode identificar uma equipe, marcar um evento, representar uma causa ou acompanhar uma lembrança. Ajudamos você a escolher o modelo, as cores e o acabamento para contar essa história.</p><p>Desenvolvemos o layout para aprovação antes de produzir e enviamos para todo o Brasil.</p><Button href="/catalogo/">Conhecer os modelos</Button></div></section><CallToAction /></> }
function ContactForm() { const [status, setStatus] = useState(''); function submit(event) { event.preventDefault(); const data = new FormData(event.currentTarget); const body = `Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\n\n${data.get('mensagem')}`; window.location.href = `mailto:${email}?subject=${encodeURIComponent('Contato pelo site — I’am Pulseiras')}&body=${encodeURIComponent(body)}`; setStatus(`Continue no seu aplicativo de e-mail para enviar a mensagem. Se ele não abrir, escreva para ${email}.`) } return <form onSubmit={submit} className="contact-form"><div className="form-row"><label>Seu nome<input name="nome" autoComplete="name" placeholder="Como podemos chamar você?" required maxLength={100} /></label><label>Seu e-mail<input name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required maxLength={200} /></label></div><label>Conte um pouco sobre sua ideia<textarea name="mensagem" placeholder="Modelo, quantidade e ocasião…" rows={5} required maxLength={3000} /></label><p className="form-note">Este formulário prepara uma mensagem no seu aplicativo de e-mail.</p><button className="button" type="submit">Continuar por e-mail <Arrow /></button><p role="status" className="form-note">{status}</p></form> }
function Contact() { return <><Intro label="Contato" title="Vamos criar sua pulseira?">Conte o que você tem em mente. Podemos conversar sobre modelos, quantidade, cores e acabamento.</Intro><section className="section contact-page"><div className="contact-direct"><Eyebrow>Fale com a gente</Eyebrow><h2>Seu projeto começa com uma conversa.</h2><p>Prefere falar agora? Envie sua ideia pelo WhatsApp. Se quiser, também pode preparar uma mensagem por e-mail.</p><Button href={whatsapp()}>Conversar no WhatsApp</Button><div className="contact-details"><a href="tel:+5519994024138">(19) 99402-4138</a><a href={`mailto:${email}`}>{email}</a></div></div><ContactForm /></section></> }
function Policy({ path }) { const content = { '/privacidade/': ['Política de Privacidade', ['Dados de contato', 'Cookies e ferramentas de análise', 'Solicitações sobre seus dados']], '/termos/': ['Termos de Uso', ['Utilização do site', 'Informações do catálogo', 'Canais de atendimento']], '/envio-e-entrega/': ['Envio e Entrega', ['Produção e aprovação do pedido', 'Cálculo de frete e prazos', 'Acompanhamento da entrega']] }[path]; return <><Intro label="Informações" title={content[0]}>Informações claras para acompanhar cada etapa.</Intro><section className="policy-content"><div className="draft-note"><strong>Conteúdo em preparação</strong><p>Esta página faz parte da estrutura inicial do site. As condições serão incluídas após confirmação com a empresa.</p></div>{content[1].map((title, index) => <section key={title}><Eyebrow>0{index + 1}</Eyebrow><h2>{title}</h2><p>Informações a confirmar.</p></section>)}<a className="text-link" href="/contato/">Fale com a nossa equipe <Arrow /></a></section></> }

export default function App({ path = '/' }) { const [menuOpen, setMenuOpen] = useState(false); const current = path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`; const model = models.find((item) => current === `/pulseiras/${item.slug}/`); return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><header className="site-header"><div className="header-inner"><a className="brand" href="/" aria-label="I’am Pulseiras — página inicial"><img src={image('iam-logo.png')} alt="" /><span><strong>I’am Pulseiras</strong><small>PERSONALIZADAS</small></span></a><nav className={menuOpen ? 'main-nav open' : 'main-nav'} id="main-nav" aria-label="Navegação principal">{nav.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-mobile-cta" href={whatsapp()}>Solicitar orçamento <Arrow /></a></nav><a className="header-cta" href={whatsapp()}>Solicitar orçamento <Arrow /></a><button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button></div></header><main id="conteudo">{current === '/' ? <Home /> : current === '/catalogo/' ? <Catalog /> : model ? <ModelPage model={model} /> : current === '/sobre/' ? <About /> : current === '/contato/' ? <Contact /> : ['/privacidade/', '/termos/', '/envio-e-entrega/'].includes(current) ? <Policy path={current} /> : <><Intro label="Página não encontrada" title="Vamos voltar ao início?">O endereço que você procura não está disponível.</Intro><div className="section"><Button href="/">Voltar ao início</Button></div></>}</main><footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand" href="/"><img src={image('iam-logo.png')} alt="" /><span><strong>I’am Pulseiras</strong><small>PERSONALIZADAS</small></span></a><p>Fabricação e personalização de pulseiras para empresas, eventos e projetos.</p></div><div><h2>Explore</h2><a href="/catalogo/">Modelos</a><a href="/#personalizacao">Personalização</a><a href="/#como-funciona">Como funciona</a><a href="/sobre/">Quem somos</a><a href="/#duvidas">Dúvidas</a></div><div><h2>Informações</h2><a href="/privacidade/">Política de Privacidade</a><a href="/termos/">Termos de Uso</a><a href="/envio-e-entrega/">Envio e Entrega</a></div><div><h2>Contato</h2><a href={whatsapp()}>(19) 99402-4138</a><a href={`mailto:${email}`}>{email}</a><a href="https://www.instagram.com/iampulseiras/">Instagram <Arrow /></a><span className="footer-minimum">Pedido mínimo: 50 unidades</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} I’am Pulseiras. Todos os direitos reservados.</span><span>Feitas para a sua ideia.</span></div></footer><a className="floating-whatsapp" href={whatsapp()} aria-label="Falar no WhatsApp"><span aria-hidden="true">✆</span><span>Falar no WhatsApp</span></a></> }
