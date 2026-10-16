import type { Locale } from '../locales';

// Copy for the home page and its sections. Where the English wording changes with the Ocoee
// hold, the key has two forms, withOcoee and orlandoOnly. Placeholders such as {phone} are
// filled by fill(). Shared chrome (call buttons, "Request an appointment") lives in common.ts.
const en = {
  meta: {
    title: 'Dental Care',
    absoluteTitle: {
      withOcoee: 'Dental Care in Orlando and Ocoee | Contemporary Dental Care',
      orlandoOnly: 'Dental Care in Orlando | Contemporary Dental Care',
    },
    description: {
      withOcoee: 'Honest, patient-focused dental care in Orlando and Ocoee. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
      orlandoOnly: 'Honest, patient-focused dental care in Orlando. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
    },
  },
  hero: {
    headline: {
      withOcoee: 'Honest, patient-focused dental care in Orlando and Ocoee',
      orlandoOnly: 'Honest, patient-focused dental care in Orlando',
    },
    trustNewPatients: 'New patients welcome',
    trustLanguages: 'English, Spanish and Portuguese',
  },
  steps: {
    heading: 'Getting good care is simple',
    whatToExpect: 'What to expect',
    highlights: {
      label: 'Practice highlights',
      newPatients: 'New patients welcome',
      sameDayEmergency: 'Emergency appointments often available the same day',
      offices: {
        withOcoee: 'Offices in Orlando and Ocoee',
        orlandoOnly: 'Office in Orlando',
      },
      languages: 'English, Spanish and Portuguese spoken',
      afterHours: 'After-hours line: {phone}',
    },
    call: {
      badge: 'New patients welcome',
      title: 'Call our office',
      text: {
        withOcoee: 'Call Orlando or Ocoee to book. Tell us your language when you call.',
        orlandoOnly: 'Call our Orlando office to book. Tell us your language when you call.',
      },
    },
    plan: {
      badge: 'Honest treatment planning',
      title: 'Get an honest plan',
      text: 'We explain your options in plain language and recommend treatment in stages that suit your health.',
    },
    care: {
      badge: 'Care in your language',
      title: 'Care that puts your health first',
      text: 'Care in English, Spanish and Portuguese. Please ask about language support when you call. Your health comes ahead of the size of a treatment plan.',
    },
  },
  beforeAfter: {
    heading: 'How our treatments look',
    intro: 'Illustrations of common treatments. They are not patient results.',
    disclaimer: 'The illustrations show the general kind of change a treatment can make. They are not photographs of patients. Your own result depends on a clinical assessment at your visit.',
    illustration: 'Illustration, not a patient result',
    before: 'Before',
    after: 'After',
    compare: 'Compare before and after',
    carousel: 'Treatment illustrations',
    previous: 'Previous result',
    next: 'Next result',
    pause: 'Pause',
    play: 'Play',
    page: 'Show result {n} of {total}',
  },
  problems: {
    label: 'Common problems',
    heading: 'Common problems, clear solutions',
    allServices: 'All services',
    items: {
      emergency: {
        tab: 'Tooth pain',
        headline: 'Got tooth pain?',
        big: 'Same day treatment',
        bigText: 'Emergency appointments are often available the same day, including for new patients.',
        linkLabel: 'About emergency care',
      },
      implants: {
        tab: 'Missing teeth',
        headline: 'Missing a tooth?',
        big: 'Two ways',
        text: 'An implant replaces a missing tooth root and supports a crown or another replacement tooth. Dentures replace missing teeth with a removable replacement.',
        linkLabel: 'About dental implants',
      },
      alignersBraces: {
        tab: 'Crooked teeth',
        headline: 'Want straighter teeth?',
        big: 'Aligners or braces',
        text: 'Clear aligners are a series of removable, clear trays that gradually move teeth. Traditional braces use brackets and wires.',
        linkLabel: 'About clear aligners and braces',
      },
      checkups: {
        tab: 'Check-up due',
        headline: 'Due a check-up?',
        big: 'Every 6 months',
        text: 'Regular cleanings and check-ups every six months help us catch problems early. X-rays are taken when Dr. Khan decides they are needed.',
        linkLabel: 'About cleanings and check-ups',
      },
      cosmetic: {
        tab: 'Smile makeover',
        headline: 'Want a new smile?',
        big: 'Your goals',
        text: 'Veneers are thin, custom-made shells bonded to the front of teeth to change their shape, color or alignment. Smile design plans the overall look of your smile with you.',
        linkLabel: 'About cosmetic dentistry',
      },
    },
  },
  whyUs: {
    heading: 'What you can expect from us',
    tableLabel: 'What we offer',
    yes: 'Yes',
    promises: [
      'Options explained in plain language',
      'Treatment recommended in stages that suit your health',
      'Emergency appointments often available the same day',
      'Emergency visits open to new patients',
      'Same-day extraction when clinically suitable',
      'Team members who speak English, Spanish and Portuguese',
    ],
    phoneLines: {
      withOcoee: 'Phone lines at both offices and an after-hours line',
      orlandoOnly: 'An office phone line and an after-hours line',
    },
  },
  offices: {
    directions: 'Get directions',
    mapTitle: 'Map of the {name} office',
  },
  faq: {
    heading: 'Frequently Asked Questions',
    allQuestions: 'All FAQs',
  },
};

export type HomeMessages = typeof en;

export const home: Record<Locale, HomeMessages> = {
  en,
  es: {
    meta: {
      title: 'Atención dental',
      absoluteTitle: {
        withOcoee: 'Atención dental en Orlando y Ocoee | Contemporary Dental Care',
        orlandoOnly: 'Atención dental en Orlando | Contemporary Dental Care',
      },
      description: {
        withOcoee: 'Atención dental honesta y centrada en el paciente en Orlando y Ocoee. Atención de rutina, visitas de urgencia, implantes, tratamiento estético y alineadores transparentes.',
        orlandoOnly: 'Atención dental honesta y centrada en el paciente en Orlando. Atención de rutina, visitas de urgencia, implantes, tratamiento estético y alineadores transparentes.',
      },
    },
    hero: {
      headline: {
        withOcoee: 'Atención dental honesta y centrada en el paciente en Orlando y Ocoee',
        orlandoOnly: 'Atención dental honesta y centrada en el paciente en Orlando',
      },
      trustNewPatients: 'Aceptamos pacientes nuevos',
      trustLanguages: 'Inglés, español y portugués',
    },
    steps: {
      heading: 'Recibir buena atención es sencillo',
      whatToExpect: 'Qué esperar',
      highlights: {
        label: 'Aspectos destacados del consultorio',
        newPatients: 'Aceptamos pacientes nuevos',
        sameDayEmergency: 'Citas de urgencia con frecuencia disponibles el mismo día',
        offices: {
          withOcoee: 'Consultorios en Orlando y Ocoee',
          orlandoOnly: 'Consultorio en Orlando',
        },
        languages: 'Se habla inglés, español y portugués',
        afterHours: 'Línea fuera del horario de atención: {phone}',
      },
      call: {
        badge: 'Aceptamos pacientes nuevos',
        title: 'Llame a su consultorio',
        text: {
          withOcoee: 'Llame a Orlando o a Ocoee para reservar su cita. Díganos su idioma cuando llame.',
          orlandoOnly: 'Llame a nuestro consultorio de Orlando para reservar su cita. Díganos su idioma cuando llame.',
        },
      },
      plan: {
        badge: 'Planificación honesta del tratamiento',
        title: 'Reciba un plan honesto',
        text: 'Le explicamos sus opciones en un lenguaje sencillo y recomendamos el tratamiento por etapas que se adapten a su salud.',
      },
      care: {
        badge: 'Atención en su idioma',
        title: 'Atención que pone su salud primero',
        text: 'Atención en inglés, español y portugués. Pregunte por el apoyo en su idioma al llamar. Su salud va antes que el tamaño de un plan de tratamiento.',
      },
    },
    // Review: a qualified Spanish speaker checks this block before it is published.
    beforeAfter: {
      heading: 'Así se ven nuestros tratamientos',
      intro: 'Ilustraciones de tratamientos habituales. No son resultados de pacientes.',
      disclaimer: 'Las ilustraciones muestran el tipo general de cambio que puede lograr un tratamiento. No son fotografías de pacientes. Su propio resultado depende de una evaluación clínica en su visita.',
      illustration: 'Ilustración, no es un resultado de paciente',
      before: 'Antes',
      after: 'Después',
      compare: 'Comparar antes y después',
      carousel: 'Ilustraciones de tratamientos',
      previous: 'Resultado anterior',
      next: 'Siguiente resultado',
      pause: 'Pausar',
      play: 'Reproducir',
      page: 'Mostrar resultado {n} de {total}',
    },
    problems: {
      label: 'Problemas frecuentes',
      heading: 'Problemas frecuentes, soluciones claras',
      allServices: 'Todos los servicios',
      items: {
        emergency: {
          tab: 'Dolor de dientes',
          headline: '¿Tiene dolor de dientes?',
          big: 'Atención el mismo día',
          bigText: 'Citas de urgencia con frecuencia disponibles el mismo día, también para pacientes nuevos.',
          linkLabel: 'Acerca de la atención de urgencia',
        },
        implants: {
          tab: 'Dientes faltantes',
          headline: '¿Le falta un diente?',
          big: 'Dos opciones',
          text: 'Un implante reemplaza la raíz de un diente que falta y sostiene una corona u otro diente de reemplazo. Las prótesis dentales reemplazan los dientes faltantes con un aparato removible.',
          linkLabel: 'Acerca de los implantes dentales',
        },
        alignersBraces: {
          tab: 'Dientes torcidos',
          headline: '¿Desea tener dientes más rectos?',
          big: 'Alineadores o brackets',
          text: 'Los alineadores transparentes son una serie de bandejas removibles y transparentes que mueven los dientes de forma gradual. Los brackets usan soportes y alambres.',
          linkLabel: 'Acerca de los alineadores transparentes y los brackets',
        },
        checkups: {
          tab: 'Revisión pendiente',
          headline: '¿Le toca una revisión?',
          big: 'Cada 6 meses',
          text: 'Las limpiezas y revisiones regulares cada seis meses nos ayudan a detectar problemas a tiempo. Las radiografías se toman cuando el Dr. Khan decide que son necesarias.',
          linkLabel: 'Acerca de las limpiezas y revisiones',
        },
        cosmetic: {
          tab: 'Transformación de sonrisa',
          headline: '¿Desea una sonrisa nueva?',
          big: 'Sus objetivos',
          text: 'Las carillas son láminas finas y hechas a medida que se adhieren a la cara frontal de los dientes para cambiar su forma, color o alineación. El diseño de sonrisa planea con usted el aspecto general de su sonrisa.',
          linkLabel: 'Acerca de la odontología estética',
        },
      },
    },
    whyUs: {
      heading: 'Qué puede esperar de nosotros',
      tableLabel: 'Lo que ofrecemos',
      yes: 'Sí',
      promises: [
        'Opciones explicadas en un lenguaje sencillo',
        'Tratamiento recomendado por etapas que se adaptan a su salud',
        'Citas de urgencia con frecuencia disponibles el mismo día',
        'Visitas de urgencia abiertas a pacientes nuevos',
        // Review: clinical qualifier ("when clinically suitable"); confirm it reads the same to a dentist.
        'Extracción el mismo día cuando es clínicamente adecuada',
        'Miembros del equipo que hablan inglés, español y portugués',
      ],
      phoneLines: {
        withOcoee: 'Líneas telefónicas en ambos consultorios y una línea fuera del horario de atención',
        orlandoOnly: 'Una línea telefónica del consultorio y una línea fuera del horario de atención',
      },
    },
    offices: {
      directions: 'Cómo llegar',
      mapTitle: 'Mapa del consultorio de {name}',
    },
    faq: {
      heading: 'Preguntas frecuentes',
      allQuestions: 'Todas las preguntas',
    },
  },
  pt: {
    meta: {
      title: 'Atendimento odontológico',
      absoluteTitle: {
        withOcoee: 'Atendimento odontológico em Orlando e Ocoee | Contemporary Dental Care',
        orlandoOnly: 'Atendimento odontológico em Orlando | Contemporary Dental Care',
      },
      description: {
        withOcoee: 'Atendimento odontológico honesto e centrado no paciente em Orlando e Ocoee. Atendimento de rotina, emergências, implantes, tratamentos estéticos e alinhadores transparentes.',
        orlandoOnly: 'Atendimento odontológico honesto e centrado no paciente em Orlando. Atendimento de rotina, emergências, implantes, tratamentos estéticos e alinhadores transparentes.',
      },
    },
    hero: {
      headline: {
        withOcoee: 'Atendimento odontológico honesto e centrado no paciente em Orlando e Ocoee',
        orlandoOnly: 'Atendimento odontológico honesto e centrado no paciente em Orlando',
      },
      trustNewPatients: 'Recebemos novos pacientes',
      trustLanguages: 'Inglês, espanhol e português',
    },
    steps: {
      heading: 'Receber um bom atendimento é simples',
      whatToExpect: 'O que esperar',
      highlights: {
        label: 'Destaques do consultório',
        newPatients: 'Recebemos novos pacientes',
        sameDayEmergency: 'Consultas de emergência costumam estar disponíveis no mesmo dia',
        offices: {
          withOcoee: 'Consultórios em Orlando e Ocoee',
          orlandoOnly: 'Consultório em Orlando',
        },
        languages: 'Falamos inglês, espanhol e português',
        afterHours: 'Linha fora do horário: {phone}',
      },
      call: {
        badge: 'Recebemos novos pacientes',
        title: 'Ligue para o seu consultório',
        text: {
          withOcoee: 'Ligue para Orlando ou Ocoee para agendar sua consulta. Informe-nos seu idioma ao ligar.',
          orlandoOnly: 'Ligue para o nosso consultório de Orlando para agendar sua consulta. Informe-nos seu idioma ao ligar.',
        },
      },
      plan: {
        badge: 'Planejamento de tratamento honesto',
        title: 'Receba um plano honesto',
        text: 'Explicamos suas opções em linguagem simples e recomendamos o tratamento em etapas adequadas à sua saúde.',
      },
      care: {
        badge: 'Atendimento no seu idioma',
        title: 'Atendimento que coloca a sua saúde em primeiro lugar',
        text: 'Atendimento em inglês, espanhol e português. Pergunte sobre o apoio no seu idioma ao ligar. Sua saúde vem antes do tamanho de um plano de tratamento.',
      },
    },
    // Review: a qualified Portuguese speaker checks this block before it is published.
    beforeAfter: {
      heading: 'Como ficam nossos tratamentos',
      intro: 'Ilustrações de tratamentos comuns. Não são resultados de pacientes.',
      disclaimer: 'As ilustrações mostram o tipo geral de mudança que um tratamento pode fazer. Não são fotografias de pacientes. O seu próprio resultado depende de uma avaliação clínica na sua consulta.',
      illustration: 'Ilustração, não é um resultado de paciente',
      before: 'Antes',
      after: 'Depois',
      compare: 'Comparar antes e depois',
      carousel: 'Ilustrações de tratamentos',
      previous: 'Resultado anterior',
      next: 'Próximo resultado',
      pause: 'Pausar',
      play: 'Reproduzir',
      page: 'Mostrar resultado {n} de {total}',
    },
    problems: {
      label: 'Problemas comuns',
      heading: 'Problemas comuns, soluções claras',
      allServices: 'Todos os serviços',
      items: {
        emergency: {
          tab: 'Dor de dente',
          headline: 'Está com dor de dente?',
          big: 'Atendimento no mesmo dia',
          bigText: 'Consultas de emergência costumam estar disponíveis no mesmo dia, inclusive para novos pacientes.',
          linkLabel: 'Sobre o atendimento de emergência',
        },
        implants: {
          tab: 'Dentes ausentes',
          headline: 'Falta algum dente?',
          big: 'Duas opções',
          text: 'Um implante substitui a raiz de um dente ausente e sustenta uma coroa ou outro dente de substituição. As próteses dentárias substituem dentes ausentes com um aparelho removível.',
          linkLabel: 'Sobre implantes dentários',
        },
        alignersBraces: {
          tab: 'Dentes tortos',
          headline: 'Quer dentes mais alinhados?',
          big: 'Alinhadores ou aparelho fixo',
          text: 'Os alinhadores transparentes são uma série de moldeiras removíveis e transparentes que movem os dentes gradualmente. O aparelho fixo usa braquetes e fios.',
          linkLabel: 'Sobre alinhadores transparentes e aparelho fixo',
        },
        checkups: {
          tab: 'Revisão pendente',
          headline: 'Está na hora da revisão?',
          big: 'A cada 6 meses',
          text: 'Limpezas e revisões regulares a cada seis meses nos ajudam a identificar problemas cedo. As radiografias são feitas quando o Dr. Khan decide que são necessárias.',
          linkLabel: 'Sobre limpezas e revisões',
        },
        cosmetic: {
          tab: 'Transformação do sorriso',
          headline: 'Quer um novo sorriso?',
          big: 'Seus objetivos',
          text: 'Facetas (lentes dentais) são lâminas finas e feitas sob medida, coladas à frente dos dentes para mudar sua forma, cor ou alinhamento. O design do sorriso planeja com você o aspecto geral do seu sorriso.',
          linkLabel: 'Sobre odontologia estética',
        },
      },
    },
    whyUs: {
      heading: 'O que você pode esperar de nós',
      tableLabel: 'O que oferecemos',
      yes: 'Sim',
      promises: [
        'Opções explicadas em linguagem simples',
        'Tratamento recomendado em etapas adequadas à sua saúde',
        'Consultas de emergência costumam estar disponíveis no mesmo dia',
        'Atendimentos de emergência abertos a novos pacientes',
        // Review: clinical qualifier ("when clinically suitable"); confirm it reads the same to a dentist.
        'Extração no mesmo dia quando clinicamente adequada',
        'Membros da equipe que falam inglês, espanhol e português',
      ],
      phoneLines: {
        withOcoee: 'Linhas telefônicas nos dois consultórios e uma linha fora do horário',
        orlandoOnly: 'Uma linha telefônica do consultório e uma linha fora do horário',
      },
    },
    offices: {
      directions: 'Como chegar',
      mapTitle: 'Mapa do consultório de {name}',
    },
    faq: {
      heading: 'Perguntas frequentes',
      allQuestions: 'Todas as perguntas',
    },
  },
};
