import type { Locale } from '../locales';

// Chrome shared by every page: header, menu, footer, top bar, call button, shared page blocks,
// and the not-found and error pages. Placeholders such as {name} are filled by fill().
const en = {
  skipToContent: 'Skip to content',
  languageLabel: 'Language',
  languageComingSoon: 'Coming soon',
  comingSoonPage: {
    title: 'Spanish and Portuguese websites',
    description: 'Our Spanish and Portuguese websites are coming soon. Our team speaks both languages: call us and tell us your preferred language.',
    lead: 'Our Spanish and Portuguese websites are on their way. Our team already speaks both languages, so call us and tell us your preferred language.',
  },
  callOffice: 'Call {name}: {phone}',
  callPhone: 'Call {phone}',
  afterHours: 'After hours:',
  homeLabel: '{name} home',
  requestAppointment: 'Request an appointment',
  menu: 'Menu',
  menuLabel: 'Menu — open navigation',
  mainNavigation: 'Main navigation',
  primaryNavigation: 'Primary navigation',
  footerNavigation: 'Footer',
  legalNavigation: 'Legal',
  nav: {
    services: 'Services',
    emergency: 'Emergency',
    newPatients: 'New patients',
    insurance: 'Insurance and payment',
    club: 'Contemporary Smile Club',
    about: 'About',
    contact: 'Location',
  },
  legal: {
    privacyPolicy: 'Privacy policy',
    termsOfUse: 'Terms of use',
    noticeOfPrivacyPractices: 'Notice of Privacy Practices',
    accessibilityStatement: 'Accessibility statement',
  },
  footer: {
    afterHours: 'After hours',
    email: 'Email',
    tagline: 'Your smile is our priority',
  },
  hours: {
    orlando: 'Monday to Friday, 8:00am to 5:00pm. We also open one Saturday a month; please call for the date.',
    ocoee: 'Open Mondays, 9:00am to 5:00pm',
  },
  learnMore: 'Learn more ↗',
  breadcrumb: { home: 'Home', services: 'Services' },
  siteDescription: {
    withOcoee: 'Contemporary Dental Care is a general dental practice in Orlando and Ocoee. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
    orlandoOnly: 'Contemporary Dental Care is a general dental practice in Orlando. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
  },
  closingBand: {
    heading: 'Ready when you are',
    body: 'Request an appointment, or call {name} at {phone}.',
  },
  saveService: {
    save: 'Save {title}',
    saved: '{title} saved on this device.',
    removed: '{title} removed from saved services.',
    storageFailed: 'Preference updated for this visit. Your browser could not save it on this device.',
  },
  notFound: {
    metaTitle: 'Page Not Found',
    kicker: 'CONTEMPORARY DENTAL CARE',
    title: 'Page not found',
    body: 'This page isn’t here. Try our home page, or call {name} at {phone}.',
    button: 'Back to home page',
  },
  errorPage: {
    heading: 'A little interruption.',
    body: 'Please try loading this page again.',
    retry: 'Try again',
  },
};

export type CommonMessages = typeof en;

export const common: Record<Locale, CommonMessages> = {
  en,
  es: {
    skipToContent: 'Ir al contenido',
    languageLabel: 'Idioma',
    languageComingSoon: 'Próximamente',
    // Review: a qualified Spanish speaker checks this block before it is published.
    comingSoonPage: {
      title: 'Sitios web en español y portugués',
      description: 'Nuestros sitios web en español y portugués estarán disponibles pronto. Nuestro equipo habla ambos idiomas: llámenos y díganos su idioma preferido.',
      lead: 'Nuestros sitios web en español y portugués están en camino. Nuestro equipo ya habla ambos idiomas, así que llámenos y díganos su idioma preferido.',
    },
    callOffice: 'Llame a {name}: {phone}',
    callPhone: 'Llame al {phone}',
    afterHours: 'Fuera del horario de atención:',
    homeLabel: 'Inicio de {name}',
    requestAppointment: 'Solicitar una cita',
    menu: 'Menú',
    menuLabel: 'Menú — abrir la navegación',
    mainNavigation: 'Navegación principal',
    primaryNavigation: 'Navegación principal',
    footerNavigation: 'Pie de página',
    legalNavigation: 'Legal',
    nav: {
      services: 'Servicios',
      emergency: 'Urgencias',
      newPatients: 'Pacientes nuevos',
      insurance: 'Seguros y pagos',
      club: 'Club Contemporary Smile',
      about: 'Acerca de',
      contact: 'Ubicación',
    },
    legal: {
      privacyPolicy: 'Política de privacidad',
      termsOfUse: 'Términos de uso',
      noticeOfPrivacyPractices: 'Aviso de prácticas de privacidad',
      accessibilityStatement: 'Declaración de accesibilidad',
    },
    footer: {
      afterHours: 'Fuera del horario de atención',
      email: 'Correo electrónico',
      tagline: 'Su sonrisa es nuestra prioridad',
    },
    hours: {
      orlando: 'De lunes a viernes, de 8:00 a. m. a 5:00 p. m. Abrimos también un sábado al mes; llame para confirmar la fecha.',
      ocoee: 'Abierto los lunes, de 9:00 a. m. a 5:00 p. m.',
    },
    learnMore: 'Más información ↗',
    breadcrumb: { home: 'Inicio', services: 'Servicios' },
    siteDescription: {
      withOcoee: 'Contemporary Dental Care es una clínica dental general en Orlando y Ocoee. Atención de rutina, visitas de urgencia, implantes, tratamiento estético y alineadores transparentes.',
      orlandoOnly: 'Contemporary Dental Care es una clínica dental general en Orlando. Atención de rutina, visitas de urgencia, implantes, tratamiento estético y alineadores transparentes.',
    },
    closingBand: {
      heading: 'Estamos listos cuando usted lo esté',
      body: 'Solicite una cita o llame a {name} al {phone}.',
    },
    saveService: {
      save: 'Guardar {title}',
      saved: '{title} guardado en este dispositivo.',
      removed: '{title} eliminado de los servicios guardados.',
      storageFailed: 'Preferencia actualizada para esta visita. Su navegador no pudo guardarla en este dispositivo.',
    },
    notFound: {
      metaTitle: 'Página no encontrada',
      kicker: 'CONTEMPORARY DENTAL CARE',
      title: 'Página no encontrada',
      body: 'Esta página no está disponible. Visite la página de inicio o llame a {name} al {phone}.',
      button: 'Volver a la página de inicio',
    },
    errorPage: {
      heading: 'Ha ocurrido un pequeño problema.',
      body: 'Por favor, intente cargar esta página de nuevo.',
      retry: 'Intentar de nuevo',
    },
  },
  pt: {
    skipToContent: 'Ir para o conteúdo',
    languageLabel: 'Idioma',
    languageComingSoon: 'Em breve',
    // Review: a qualified Portuguese speaker checks this block before it is published.
    comingSoonPage: {
      title: 'Sites em espanhol e português',
      description: 'Nossos sites em espanhol e português estarão disponíveis em breve. Nossa equipe fala os dois idiomas: ligue para nós e diga seu idioma preferido.',
      lead: 'Nossos sites em espanhol e português estão a caminho. Nossa equipe já fala os dois idiomas, então ligue para nós e diga seu idioma preferido.',
    },
    callOffice: 'Ligue para {name}: {phone}',
    callPhone: 'Ligue para {phone}',
    afterHours: 'Fora do horário:',
    homeLabel: 'Início, {name}',
    requestAppointment: 'Solicitar uma consulta',
    menu: 'Menu',
    menuLabel: 'Menu: abrir a navegação',
    mainNavigation: 'Navegação principal',
    primaryNavigation: 'Navegação principal',
    footerNavigation: 'Rodapé',
    legalNavigation: 'Jurídico',
    nav: {
      services: 'Serviços',
      emergency: 'Emergência',
      newPatients: 'Novos pacientes',
      insurance: 'Convênios e pagamento',
      club: 'Clube Contemporary Smile',
      about: 'Sobre',
      contact: 'Localização',
    },
    legal: {
      privacyPolicy: 'Política de privacidade',
      termsOfUse: 'Termos de uso',
      noticeOfPrivacyPractices: 'Aviso de Práticas de Privacidade',
      accessibilityStatement: 'Declaração de acessibilidade',
    },
    footer: {
      afterHours: 'Fora do horário',
      email: 'E-mail',
      tagline: 'Seu sorriso é a nossa prioridade',
    },
    hours: {
      orlando: 'De segunda a sexta, das 8h às 17h. Também abrimos um sábado por mês; ligue para saber a data.',
      ocoee: 'Aberto às segundas-feiras, das 9h às 17h',
    },
    learnMore: 'Saiba mais ↗',
    breadcrumb: { home: 'Início', services: 'Serviços' },
    siteDescription: {
      withOcoee: 'Contemporary Dental Care é uma clínica odontológica geral em Orlando e Ocoee. Atendimento de rotina, emergências, implantes, tratamentos estéticos e alinhadores transparentes.',
      orlandoOnly: 'Contemporary Dental Care é uma clínica odontológica geral em Orlando. Atendimento de rotina, emergências, implantes, tratamentos estéticos e alinhadores transparentes.',
    },
    closingBand: {
      heading: 'Estamos prontos quando você estiver',
      body: 'Solicite uma consulta ou ligue para {name} no {phone}.',
    },
    saveService: {
      save: 'Salvar {title}',
      saved: '{title} salvo neste dispositivo.',
      removed: '{title} removido dos serviços salvos.',
      storageFailed: 'Preferência atualizada para esta visita. Seu navegador não conseguiu salvá-la neste dispositivo.',
    },
    notFound: {
      metaTitle: 'Página não encontrada',
      kicker: 'CONTEMPORARY DENTAL CARE',
      title: 'Página não encontrada',
      body: 'Esta página não existe. Visite a página inicial ou ligue para {name} no {phone}.',
      button: 'Voltar para a página inicial',
    },
    errorPage: {
      heading: 'Ocorreu um pequeno problema.',
      body: 'Tente carregar esta página novamente.',
      retry: 'Tentar novamente',
    },
  },
};

// Notices written in the language they announce, so they read the same on every version of the
// coming-soon page. Review: qualified Spanish and Portuguese speakers check these before launch.
export const languageNotices = {
  es: { title: 'Se Habla Español', body: 'Nuestro sitio web en español estará disponible muy pronto. Mientras tanto, llámenos: nuestro equipo habla español.' },
  pt: { title: 'Falamos Português', body: 'Nosso site em português estará disponível em breve. Enquanto isso, ligue para nós: nossa equipe fala português.' },
} as const;
