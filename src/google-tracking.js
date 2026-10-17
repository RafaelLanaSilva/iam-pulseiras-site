const GTM_EVENT_TIMEOUT_MS = 1200

function pageType() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return path === '/pulseiras-personalizadas' ? 'landing' : 'institutional'
}

function hasAnalyticsConsent() {
  return window.iamGoogleConsent?.hasAnalyticsConsent() === true
}

// Aguarda o callback do GTM antes de navegar para reduzir perda do evento de saída.
function pushEventAndNavigate(eventName, parameters, destination, openNewTab = false) {
  const popup = openNewTab ? window.open('about:blank', '_blank') : null
  if (popup) popup.opener = null

  let navigated = false
  const navigate = () => {
    if (navigated) return
    navigated = true
    if (popup && !popup.closed) popup.location.href = destination
    else window.location.assign(destination)
  }

  window.dataLayer.push({
    event: eventName,
    ...parameters,
    eventCallback: navigate,
    eventTimeout: GTM_EVENT_TIMEOUT_MS,
  })
  window.setTimeout(navigate, GTM_EVENT_TIMEOUT_MS + 100)
}

// Ouvinte delegado: só links com identificadores explícitos viram eventos; URLs,
// mensagens pré-preenchidas e dados do formulário nunca entram na camada de dados.
export function installWhatsAppTracking() {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return
    const link = event.target.closest('a[data-iam-whatsapp-id]')
    if (!link || !hasAnalyticsConsent()) return

    event.preventDefault()
    pushEventAndNavigate('whatsapp_click', {
      page_type: pageType(),
      button_id: link.dataset.iamWhatsappId,
      button_position: link.dataset.iamWhatsappPosition,
    }, link.href, link.target === '_blank')
  })
}

// Chamado somente após a validação HTML nativa do formulário de orçamento.
export function continueToWhatsAppQuote(destination) {
  if (!hasAnalyticsConsent()) {
    window.location.assign(destination)
    return
  }

  pushEventAndNavigate('whatsapp_quote_form', {
    page_type: pageType(),
    button_id: 'budget_form_whatsapp',
    button_position: 'quote_form',
  }, destination)
}
