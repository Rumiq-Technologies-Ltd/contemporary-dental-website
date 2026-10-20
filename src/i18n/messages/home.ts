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
    heading: 'WHY PATIENTS CHOOSE OUR PRACTICE',
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
    cards: [
      {
        title: 'NEW PATIENTS WELCOME',
        subtitle: 'Convenient Booking & Flexible Support',
        // The Orlando-only wording is derived from the Ocoee text. Owner to confirm before launch.
        text: {
          withOcoee: 'We are currently accepting new patients at both our Orlando and Ocoee offices. Call either location or reach our dedicated after-hours line to schedule your first visit.',
          orlandoOnly: 'We are currently accepting new patients at our Orlando office. Call us or reach our dedicated after-hours line to schedule your first visit.',
        },
      },
      {
        title: 'EMERGENCY APPOINTMENTS AVAILABLE',
        subtitle: 'Regular Hours & After-Hours Support',
        text: 'Fast, compassionate care when you need it most. We offer same-day emergency appointments for both new and existing patients, including same-day extractions when clinically appropriate.',
      },
      {
        title: 'HONEST TREATMENT PLANNING',
        subtitle: 'Care That Puts Your Health First',
        text: 'We explain all your options clearly in plain language, without jargon, and structure treatment in stages that fit your health goals and budget—never selling you procedures you don\'t need.',
      },
      {
        title: 'CARE IN YOUR LANGUAGE',
        subtitle: 'English, Spanish & Portuguese',
        text: 'Feel fully comfortable discussing your care. Our multilingual team explains every step of your treatment clearly—just let us know your preferred language when you call.',
        lines: [
          { label: 'Se Habla Español', locale: 'es' as const },
          { label: 'Falamos Português', locale: 'pt' as const },
        ],
      },
      {
        title: 'COMFORT-FIRST DENTAL VISITS',
        subtitle: 'Personalized Support for Nervous Patients',
        text: 'We understand dental anxiety and are here to put you completely at ease. Our warm, patient-centered team explains every option in plain language so you always feel informed and in control. To help you relax, we offer comfort amenities like noise-canceling headphones and weighted blankets—just let us know what you need, and we will tailor your visit entirely around your comfort.',
      },
      {
        title: 'FAMILY-FRIENDLY DENTISTRY',
        subtitle: 'Gentle Care for Patients of All Ages',
        text: 'We make dental visits positive, fun, and stress-free for your entire family, from children to grandparents. Our patient, welcoming team takes extra time with young patients to build trust and form healthy habits for life. With flexible family block scheduling and a friendly environment, keeping everyone\'s smile healthy has never been easier.',
      },
    ],
  },
  beforeAfter: {
    heading: 'WHAT TREATMENT CAN DO',
    intro: 'Illustrations of common treatments. They are not patient results.',
    disclaimer: 'The illustrations are for educational purposes only. They show the general kind of change a treatment can make. They are not photographs of patients. Your own result depends on a clinical assessment at your visit.',
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
    heading: 'Your smile concerns, simplified',
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
        lines: [
          'An implant replaces a missing tooth root or supports a crown or another replacement tooth.',
          'Dentures replace missing teeth with a removable replacement.',
        ],
        linkLabel: 'About dental implants',
        dentureLinkLabel: 'Dentures',
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
        text: 'Regular cleanings and check-ups every six months help us catch problems early. X-rays are taken when a dentist decides they are needed.',
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
  reviews: {
    heading: 'What our patients say',
    allReviews: 'Read all patient reviews',
    pageTitle: 'Patient reviews',
    pageDescription: 'What patients say about their visits to Contemporary Dental Care, in their own words and shared with their written permission.',
    pageLead: 'In their own words, shared with their written permission.',
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
      // Review: a qualified Spanish speaker checks this heading before it is published.
      heading: 'Por qué los pacientes eligen nuestro consultorio',
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
      // Review: a qualified Spanish speaker checks this block before it is published. Clinical wording
      // ("same-day extractions when clinically appropriate") needs a dentist to confirm the meaning.
      cards: [
        {
          title: 'BIENVENIDA A PACIENTES NUEVOS',
          subtitle: 'Reservas cómodas y apoyo flexible',
          text: {
            withOcoee: 'Actualmente aceptamos pacientes nuevos en nuestros consultorios de Orlando y Ocoee. Llame a cualquiera de las dos sedes o comuníquese con nuestra línea dedicada fuera del horario de atención para programar su primera visita.',
            orlandoOnly: 'Actualmente aceptamos pacientes nuevos en nuestro consultorio de Orlando. Llámenos o comuníquese con nuestra línea dedicada fuera del horario de atención para programar su primera visita.',
          },
        },
        {
          title: 'CITAS DE URGENCIA DISPONIBLES',
          subtitle: 'Horario regular y apoyo fuera del horario de atención',
          text: 'Atención rápida y compasiva cuando más la necesita. Ofrecemos citas de urgencia el mismo día para pacientes nuevos y actuales, incluidas extracciones el mismo día cuando son clínicamente adecuadas.',
        },
        {
          title: 'PLANIFICACIÓN HONESTA DEL TRATAMIENTO',
          subtitle: 'Una atención que pone su salud primero',
          text: 'Le explicamos todas sus opciones con claridad y en un lenguaje sencillo, sin jerga, y organizamos el tratamiento en etapas que se adaptan a sus objetivos de salud y a su presupuesto, sin venderle nunca procedimientos que no necesita.',
        },
        {
          title: 'ATENCIÓN EN SU IDIOMA',
          subtitle: 'Inglés, español y portugués',
          text: 'Sienta total comodidad al hablar de su atención. Nuestro equipo multilingüe le explica cada paso de su tratamiento con claridad; solo infórmenos su idioma preferido al llamar.',
          lines: [
            { label: 'Se Habla Español', locale: 'es' as const },
            { label: 'Falamos Português', locale: 'pt' as const },
          ],
        },
        {
          title: 'VISITAS DENTALES CENTRADAS EN LA COMODIDAD',
          subtitle: 'Apoyo personalizado para pacientes nerviosos',
          text: 'Entendemos la ansiedad dental y estamos aquí para que se sienta completamente tranquilo. Nuestro equipo cálido y centrado en el paciente le explica cada opción en un lenguaje sencillo para que siempre se sienta informado y con control. Para ayudarle a relajarse, ofrecemos comodidades como audífonos con cancelación de ruido y mantas con peso; solo díganos qué necesita y adaptaremos su visita por completo a su comodidad.',
        },
        {
          title: 'ODONTOLOGÍA PARA TODA LA FAMILIA',
          subtitle: 'Atención amable para pacientes de todas las edades',
          text: 'Hacemos que las visitas dentales sean positivas, divertidas y libres de estrés para toda su familia, desde niños hasta abuelos. Nuestro equipo paciente y acogedor dedica tiempo extra a los pacientes jóvenes para generar confianza y crear hábitos saludables para toda la vida. Con programación familiar flexible en bloque y un ambiente amable, mantener sanas las sonrisas de todos nunca ha sido tan fácil.',
        },
      ],
    },
    // Review: a qualified Spanish speaker checks this block before it is published.
    beforeAfter: {
      heading: 'LO QUE PUEDE HACER UN TRATAMIENTO',
      intro: 'Ilustraciones de tratamientos habituales. No son resultados de pacientes.',
      disclaimer: 'Las ilustraciones tienen fines únicamente educativos. Muestran el tipo general de cambio que puede lograr un tratamiento. No son fotografías de pacientes. Su propio resultado depende de una evaluación clínica en su visita.',
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
      heading: 'Sus inquietudes sobre su sonrisa, simplificadas',
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
          lines: [
            'Un implante reemplaza la raíz de un diente que falta o sostiene una corona u otro diente de reemplazo.',
            'Las prótesis dentales reemplazan los dientes faltantes con un aparato removible.',
          ],
          linkLabel: 'Acerca de los implantes dentales',
          dentureLinkLabel: 'Prótesis dentales',
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
          text: 'Las limpiezas y revisiones regulares cada seis meses nos ayudan a detectar problemas a tiempo. Las radiografías se toman cuando un dentista decide que son necesarias.',
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
    // Review: a qualified Spanish speaker checks this block before it is published.
    reviews: {
      heading: 'Lo que dicen nuestros pacientes',
      allReviews: 'Leer todas las opiniones de pacientes',
      pageTitle: 'Opiniones de pacientes',
      pageDescription: 'Lo que dicen los pacientes sobre sus visitas a Contemporary Dental Care, en sus propias palabras y compartido con su permiso por escrito.',
      pageLead: 'En sus propias palabras, compartidas con su permiso por escrito.',
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
      // Review: a qualified Portuguese speaker checks this heading before it is published.
      heading: 'Por que os pacientes escolhem nosso consultório',
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
      // Review: a qualified Portuguese speaker checks this block before it is published. Clinical wording
      // ("same-day extractions when clinically appropriate") needs a dentist to confirm the meaning.
      cards: [
        {
          title: 'BEM-VINDOS NOVOS PACIENTES',
          subtitle: 'Agendamento prático e suporte flexível',
          text: {
            withOcoee: 'Atualmente estamos aceitando novos pacientes nos nossos consultórios de Orlando e Ocoee. Ligue para qualquer uma das unidades ou entre em contato com nossa linha exclusiva fora do horário para marcar sua primeira consulta.',
            orlandoOnly: 'Atualmente estamos aceitando novos pacientes no nosso consultório de Orlando. Ligue para nós ou entre em contato com nossa linha exclusiva fora do horário para marcar sua primeira consulta.',
          },
        },
        {
          title: 'ATENDIMENTO DE EMERGÊNCIA DISPONÍVEL',
          subtitle: 'Horário comercial e suporte fora do horário',
          text: 'Atendimento rápido e cuidadoso quando você mais precisa. Oferecemos consultas de emergência no mesmo dia para pacientes novos e atuais, incluindo extrações no mesmo dia quando clinicamente indicadas.',
        },
        {
          title: 'PLANEJAMENTO DE TRATAMENTO HONESTO',
          subtitle: 'Um cuidado que coloca sua saúde em primeiro lugar',
          text: 'Explicamos todas as suas opções com clareza e em linguagem simples, sem jargão, e organizamos o tratamento em etapas que se adequam aos seus objetivos de saúde e ao seu orçamento, sem nunca vender procedimentos desnecessários.',
        },
        {
          title: 'ATENDIMENTO NO SEU IDIOMA',
          subtitle: 'Inglês, espanhol e português',
          text: 'Sinta-se totalmente à vontade para conversar sobre o seu tratamento. Nossa equipe multilíngue explica cada etapa do seu tratamento com clareza; basta nos dizer seu idioma preferido ao ligar.',
          lines: [
            { label: 'Se Habla Español', locale: 'es' as const },
            { label: 'Falamos Português', locale: 'pt' as const },
          ],
        },
        {
          title: 'VISITAS ODONTOLÓGICAS COM FOCO NO CONFORTO',
          subtitle: 'Apoio personalizado para pacientes nervosos',
          text: 'Entendemos a ansiedade odontológica e estamos aqui para deixar você completamente tranquilo. Nossa equipe acolhedora e centrada no paciente explica cada opção em linguagem simples, para que você sempre se sinta informado e no controle. Para ajudar você a relaxar, oferecemos recursos de conforto como fones com cancelamento de ruído e cobertores com peso; basta nos dizer o que você precisa, e adaptaremos sua visita inteiramente ao seu conforto.',
        },
        {
          title: 'ODONTOLOGIA PARA A FAMÍLIA',
          subtitle: 'Cuidado gentil para pacientes de todas as idades',
          text: 'Tornamos as visitas ao dentista positivas, divertidas e sem estresse para toda a sua família, das crianças aos avós. Nossa equipe paciente e acolhedora dedica tempo extra aos pacientes mais jovens para criar confiança e hábitos saudáveis para a vida toda. Com agendamento familiar flexível e um ambiente amigável, manter o sorriso de todos saudável nunca foi tão fácil.',
        },
      ],
    },
    // Review: a qualified Portuguese speaker checks this block before it is published.
    beforeAfter: {
      heading: 'O QUE UM TRATAMENTO PODE FAZER',
      intro: 'Ilustrações de tratamentos comuns. Não são resultados de pacientes.',
      disclaimer: 'As ilustrações têm fins apenas educativos. Mostram o tipo geral de mudança que um tratamento pode fazer. Não são fotografias de pacientes. O seu próprio resultado depende de uma avaliação clínica na sua consulta.',
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
      heading: 'Suas preocupações com o sorriso, simplificadas',
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
          lines: [
            'Um implante substitui a raiz de um dente ausente ou sustenta uma coroa ou outro dente de substituição.',
            'As próteses dentárias substituem dentes ausentes com um aparelho removível.',
          ],
          linkLabel: 'Sobre implantes dentários',
          dentureLinkLabel: 'Próteses dentárias',
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
          text: 'Limpezas e revisões regulares a cada seis meses nos ajudam a identificar problemas cedo. As radiografias são feitas quando um dentista decide que são necessárias.',
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
    // Review: a qualified Portuguese speaker checks this block before it is published.
    reviews: {
      heading: 'O que nossos pacientes dizem',
      allReviews: 'Ler todas as avaliações de pacientes',
      pageTitle: 'Avaliações de pacientes',
      pageDescription: 'O que os pacientes dizem sobre suas consultas na Contemporary Dental Care, nas palavras deles e compartilhado com sua permissão por escrito.',
      pageLead: 'Nas palavras deles, compartilhadas com sua permissão por escrito.',
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
