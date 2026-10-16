import type { ServiceId } from '@/content/serviceIds';
import type { Locale } from '../locales';

// Copy for the services index, the service pages and the content module in src/content/services.ts.
// {atOffices} is replaced by the "atOffices" phrase, which switches with the Ocoee hold.
// Held items from the content file (same-day crowns, implant offer, All-on-4, partial dentures,
// orthobrain wording, trademarked product names) are left out of every language on purpose.

/** One service's copy. `paragraphs` has two forms only where the wording changes with the Ocoee hold. */
export interface ServiceCopy {
  /** Card label and homepage list entry. */
  title: string;
  /** Page heading (h1). */
  heading: string;
  /** Title tag, without the site suffix. */
  titleTag: string;
  /** Short line used in the homepage "What we treat" list. Empty when the service has none. */
  summary: string;
  /** The full homepage list entry, written out because the joining punctuation differs by language. */
  listLabel: string;
  description: string;
  paragraphs: readonly string[] | { withOcoee: readonly string[]; orlandoOnly: readonly string[] };
}

const enItems: Record<ServiceId, ServiceCopy> = {
  'cleanings-checkups': {
    title: 'Cleanings and check-ups',
    heading: 'Cleanings and check-ups',
    titleTag: 'Cleanings and Check-Ups',
    summary: 'routine preventive care',
    listLabel: 'Cleanings and check-ups: routine preventive care',
    description: 'Regular cleanings and check-ups every six months help us catch problems early.',
    paragraphs: [
      "Regular cleanings and check-ups every six months help us catch problems early. X-rays are taken when Dr. Khan decides they're needed. Our hygienist, Jessica Salazar, provides cleanings {atOffices}.",
    ],
  },
  emergency: {
    title: 'Emergency care',
    heading: 'Emergency dental care',
    titleTag: 'Emergency Dental Care',
    summary: 'urgent treatment for pain, swelling and broken teeth',
    listLabel: 'Emergency care: urgent treatment for pain, swelling and broken teeth',
    description: 'Urgent treatment for pain, swelling and broken teeth.',
    paragraphs: [],
  },
  extractions: {
    title: 'Tooth extractions',
    heading: 'Tooth extractions',
    titleTag: 'Tooth Extractions',
    summary: 'including same-day when suitable',
    listLabel: 'Tooth extractions, including same-day when suitable',
    description: 'Extraction may be the right option when a tooth cannot be saved. Same-day extraction is subject to clinical suitability and availability.',
    paragraphs: [
      'When a tooth cannot be saved, extraction may be the right option. Extractions are one of our same-day services, subject to clinical suitability and availability. Dr. Khan explains your options before any treatment starts. Some types of oral surgery are referred to another provider.',
    ],
  },
  restorative: {
    title: 'Fillings and restorative care',
    heading: 'Fillings and restorative care',
    titleTag: 'Fillings and Restorative Care',
    summary: '',
    listLabel: 'Fillings and restorative care',
    description: 'Fillings and other restorative treatment repair teeth damaged by decay, cracks or breakage.',
    paragraphs: [
      'Fillings and other restorative treatment repair teeth damaged by decay, cracks or breakage. Available {atOffices}.',
    ],
  },
  crowns: {
    title: 'Crowns',
    heading: 'Dental crowns',
    titleTag: 'Dental Crowns',
    summary: '',
    listLabel: 'Crowns',
    description: 'A crown covers and protects a damaged or weakened tooth. Crowns need a dental laboratory case.',
    paragraphs: [
      'A crown covers and protects a damaged or weakened tooth. Crowns need a dental laboratory case, so they are not completed on the same day. Crown preparation can begin at an emergency visit, and Dr. Khan will explain the steps that follow.',
    ],
  },
  'root-canal': {
    title: 'Root canal treatment',
    heading: 'Root canal treatment',
    titleTag: 'Root Canal Treatment',
    summary: '(Orlando)',
    listLabel: 'Root canal treatment (Orlando)',
    description: 'Root canal treatment is performed at our Orlando office.',
    paragraphs: {
      withOcoee: [
        'A root canal treats the soft tissue inside a tooth, called the pulp, when it is infected or damaged. The infected tissue is removed, the inside of the tooth is cleaned and sealed, and the tooth is then restored. Root canal treatment is performed at our Orlando office. If you are an Ocoee patient who needs root canal treatment, we will schedule you at Orlando. Root canal retreatment is referred to another provider.',
      ],
      orlandoOnly: [
        'A root canal treats the soft tissue inside a tooth, called the pulp, when it is infected or damaged. The infected tissue is removed, the inside of the tooth is cleaned and sealed, and the tooth is then restored. Root canal treatment is performed at our Orlando office. Root canal retreatment is referred to another provider.',
      ],
    },
  },
  implants: {
    title: 'Dental implants',
    heading: 'Dental implants',
    titleTag: 'Dental Implants',
    summary: '',
    listLabel: 'Dental implants',
    description: 'An implant replaces a missing tooth root and supports a crown or another replacement tooth.',
    paragraphs: [
      'An implant replaces a missing tooth root and supports a crown or another replacement tooth. Implant placement can be done the same day, subject to clinical suitability and availability. Dr. Khan plans treatment with you in clear stages, and implants are a particular focus of his care.',
    ],
  },
  dentures: {
    title: 'Dentures',
    heading: 'Dentures',
    titleTag: 'Dentures',
    summary: '',
    listLabel: 'Dentures',
    description: 'Dentures replace missing teeth. Dr. Khan will walk you through the options and the process.',
    paragraphs: [
      'Dentures replace missing teeth and are available {atOffices}. Dr. Khan will walk you through the options and the process at your visit.',
    ],
  },
  'clear-aligners-braces': {
    title: 'Clear aligners and braces',
    heading: 'Clear aligners and braces',
    titleTag: 'Clear Aligners and Braces',
    summary: '',
    listLabel: 'Clear aligners and braces',
    description: 'Dr. Khan provides clear aligners and traditional braces.',
    paragraphs: [
      'Dr. Khan provides clear aligners and traditional braces {atOffices}. Clear aligners are a series of removable, clear trays that gradually move teeth. Traditional braces use brackets and wires. Most of our orthodontic cases are traditional braces.',
    ],
  },
  cosmetic: {
    title: 'Cosmetic dentistry',
    heading: 'Cosmetic dentistry',
    titleTag: 'Cosmetic Dentistry',
    summary: '',
    listLabel: 'Cosmetic dentistry',
    description: 'Veneers, smile design and other cosmetic treatment, planned around your goals and your oral health.',
    paragraphs: [
      // Review: financing wording ("subject to approval"). Check against the financing partners' terms.
      'Cosmetic treatment is planned around your goals and your oral health. Veneers are thin, custom-made shells bonded to the front of teeth to change their shape, color or alignment. Smile design plans the overall look of your smile with you. Cosmetic treatment can be paid for through our financing partners, subject to approval.',
    ],
  },
};

const en = {
  index: {
    meta: {
      title: 'Dental Services',
      description: 'Cleanings, emergency care, extractions, fillings, crowns, root canal treatment, implants, dentures, clear aligners and braces, and cosmetic dentistry.',
    },
    title: 'Our services',
    officesHeading: 'Our offices',
    lead: {
      withOcoee: 'Dr. Sheryar Khan provides our treatment at both offices, and our hygienist provides cleanings and check-ups. Some treatment is referred to another provider, including root canal retreatment and some types of oral surgery. Each service below has its own page.',
      orlandoOnly: 'Dr. Sheryar Khan provides our treatment at our office, and our hygienist provides cleanings and check-ups. Some treatment is referred to another provider, including root canal retreatment and some types of oral surgery. Each service below has its own page.',
    },
  },
  detail: {
    otherServices: 'Other services',
  },
  atOffices: {
    withOcoee: 'at both offices',
    orlandoOnly: 'at our Orlando office',
  },
  items: enItems,
};

export type ServicesMessages = typeof en;

export const services: Record<Locale, ServicesMessages> = {
  en,
  es: {
    index: {
      meta: {
        title: 'Servicios dentales',
        description: 'Limpiezas, atención de urgencia, extracciones, empastes, coronas, endodoncia, implantes, prótesis dentales, alineadores transparentes y brackets, y odontología estética.',
      },
      title: 'Nuestros servicios',
      officesHeading: 'Nuestros consultorios',
      lead: {
        withOcoee: 'El Dr. Sheryar Khan realiza nuestros tratamientos en ambos consultorios, y nuestra higienista dental realiza las limpiezas y revisiones. Algunos tratamientos se derivan a otro profesional, entre ellos el retratamiento de endodoncia y algunos tipos de cirugía oral. Cada servicio que aparece a continuación tiene su propia página.',
        orlandoOnly: 'El Dr. Sheryar Khan realiza nuestros tratamientos en nuestro consultorio, y nuestra higienista dental realiza las limpiezas y revisiones. Algunos tratamientos se derivan a otro profesional, entre ellos el retratamiento de endodoncia y algunos tipos de cirugía oral. Cada servicio que aparece a continuación tiene su propia página.',
      },
    },
    detail: {
      otherServices: 'Otros servicios',
    },
    atOffices: {
      withOcoee: 'en ambos consultorios',
      orlandoOnly: 'en nuestro consultorio de Orlando',
    },
    items: {
      'cleanings-checkups': {
        title: 'Limpiezas y revisiones',
        heading: 'Limpiezas y revisiones',
        titleTag: 'Limpiezas y revisiones',
        summary: 'atención preventiva de rutina',
        listLabel: 'Limpiezas y revisiones: atención preventiva de rutina',
        description: 'Las limpiezas y revisiones periódicas cada seis meses nos ayudan a detectar los problemas a tiempo.',
        paragraphs: [
          'Las limpiezas y revisiones periódicas cada seis meses nos ayudan a detectar los problemas a tiempo. Se toman radiografías cuando el Dr. Khan decide que son necesarias. Nuestra higienista dental, Jessica Salazar, realiza las limpiezas {atOffices}.',
        ],
      },
      emergency: {
        title: 'Atención de urgencia',
        heading: 'Atención dental de urgencia',
        titleTag: 'Atención dental de urgencia',
        summary: 'tratamiento urgente para el dolor, la hinchazón y los dientes rotos',
        listLabel: 'Atención de urgencia: tratamiento urgente para el dolor, la hinchazón y los dientes rotos',
        description: 'Tratamiento urgente para el dolor, la hinchazón y los dientes rotos.',
        paragraphs: [],
      },
      extractions: {
        title: 'Extracciones dentales',
        heading: 'Extracciones dentales',
        titleTag: 'Extracciones dentales',
        summary: 'incluidas las del mismo día cuando resulte adecuado',
        listLabel: 'Extracciones dentales, incluidas las del mismo día cuando resulte adecuado',
        description: 'La extracción puede ser la mejor opción cuando no es posible salvar un diente. La extracción el mismo día está sujeta a la idoneidad clínica y a la disponibilidad.',
        paragraphs: [
          'Cuando no es posible salvar un diente, la extracción puede ser la mejor opción. Las extracciones son uno de nuestros servicios del mismo día, sujetas a la idoneidad clínica y a la disponibilidad. El Dr. Khan le explica sus opciones antes de que comience cualquier tratamiento. Algunos tipos de cirugía oral se derivan a otro profesional.',
        ],
      },
      restorative: {
        title: 'Empastes y atención restauradora',
        heading: 'Empastes y atención restauradora',
        titleTag: 'Empastes y atención restauradora',
        summary: '',
        listLabel: 'Empastes y atención restauradora',
        description: 'Los empastes y otros tratamientos restauradores reparan los dientes dañados por caries, grietas o fracturas.',
        paragraphs: [
          'Los empastes y otros tratamientos restauradores reparan los dientes dañados por caries, grietas o fracturas. Disponible {atOffices}.',
        ],
      },
      crowns: {
        title: 'Coronas',
        heading: 'Coronas dentales',
        titleTag: 'Coronas dentales',
        summary: '',
        listLabel: 'Coronas',
        description: 'Una corona cubre y protege un diente dañado o debilitado. Las coronas requieren un trabajo de laboratorio dental.',
        paragraphs: [
          'Una corona cubre y protege un diente dañado o debilitado. Las coronas requieren un trabajo de laboratorio dental, por lo que no se completan el mismo día. La preparación de la corona puede comenzar en una visita de urgencia, y el Dr. Khan le explicará los pasos que siguen.',
        ],
      },
      'root-canal': {
        title: 'Endodoncia',
        heading: 'Endodoncia',
        titleTag: 'Endodoncia',
        summary: '(Orlando)',
        listLabel: 'Endodoncia (Orlando)',
        description: 'La endodoncia se realiza en nuestro consultorio de Orlando.',
        paragraphs: {
          withOcoee: [
            'Una endodoncia trata el tejido blando del interior de un diente, llamado pulpa, cuando está infectado o dañado. Se retira el tejido infectado, se limpia y sella el interior del diente y luego se restaura el diente. La endodoncia se realiza en nuestro consultorio de Orlando. Si usted es paciente de Ocoee y necesita una endodoncia, le programaremos la cita en Orlando. El retratamiento de endodoncia se deriva a otro profesional.',
          ],
          orlandoOnly: [
            'Una endodoncia trata el tejido blando del interior de un diente, llamado pulpa, cuando está infectado o dañado. Se retira el tejido infectado, se limpia y sella el interior del diente y luego se restaura el diente. La endodoncia se realiza en nuestro consultorio de Orlando. El retratamiento de endodoncia se deriva a otro profesional.',
          ],
        },
      },
      implants: {
        title: 'Implantes dentales',
        heading: 'Implantes dentales',
        titleTag: 'Implantes dentales',
        summary: '',
        listLabel: 'Implantes dentales',
        description: 'Un implante reemplaza la raíz de un diente que falta y sostiene una corona u otro diente de reemplazo.',
        paragraphs: [
          'Un implante reemplaza la raíz de un diente que falta y sostiene una corona u otro diente de reemplazo. La colocación del implante puede realizarse el mismo día, sujeta a la idoneidad clínica y a la disponibilidad. El Dr. Khan planifica el tratamiento con usted en etapas claras, y los implantes son un área de especial atención en su práctica clínica.',
        ],
      },
      dentures: {
        title: 'Prótesis dentales',
        heading: 'Prótesis dentales',
        titleTag: 'Prótesis dentales',
        summary: '',
        listLabel: 'Prótesis dentales',
        description: 'Las prótesis dentales reemplazan los dientes que faltan. El Dr. Khan le explicará las opciones y el proceso.',
        paragraphs: [
          'Las prótesis dentales reemplazan los dientes que faltan y están disponibles {atOffices}. El Dr. Khan le explicará las opciones y el proceso durante su visita.',
        ],
      },
      'clear-aligners-braces': {
        title: 'Alineadores transparentes y brackets',
        heading: 'Alineadores transparentes y brackets',
        titleTag: 'Alineadores transparentes y brackets',
        summary: '',
        listLabel: 'Alineadores transparentes y brackets',
        description: 'El Dr. Khan ofrece alineadores transparentes y brackets tradicionales.',
        paragraphs: [
          'El Dr. Khan ofrece alineadores transparentes y brackets tradicionales {atOffices}. Los alineadores transparentes son una serie de bandejas transparentes y removibles que mueven los dientes de forma gradual. Los brackets tradicionales usan soportes y alambres. La mayoría de nuestros casos de ortodoncia son con brackets tradicionales.',
        ],
      },
      cosmetic: {
        title: 'Odontología estética',
        heading: 'Odontología estética',
        titleTag: 'Odontología estética',
        summary: '',
        listLabel: 'Odontología estética',
        description: 'Carillas, diseño de sonrisa y otros tratamientos estéticos, planificados según sus objetivos y su salud bucal.',
        paragraphs: [
          // Review: financing wording ("subject to approval"). Check against the financing partners' terms.
          'El tratamiento estético se planifica según sus objetivos y su salud bucal. Las carillas son láminas finas hechas a medida que se adhieren a la superficie frontal de los dientes para cambiar su forma, color o alineación. El diseño de sonrisa planifica con usted el aspecto general de su sonrisa. El tratamiento estético se puede pagar a través de nuestros socios de financiamiento, sujeto a aprobación.',
        ],
      },
    },
  },
  pt: {
    index: {
      meta: {
        title: 'Serviços odontológicos',
        description: 'Limpezas, atendimento de emergência, extrações, restaurações, coroas, tratamento de canal, implantes, prótese dentária, alinhadores transparentes e aparelho fixo, e odontologia estética.',
      },
      title: 'Nossos serviços',
      officesHeading: 'Nossos consultórios',
      lead: {
        withOcoee: 'O Dr. Sheryar Khan realiza nossos tratamentos em ambos os consultórios, e nossa higienista odontológica realiza as limpezas e revisões. Alguns tratamentos são encaminhados a outro profissional, incluindo o retratamento de canal e alguns tipos de cirurgia oral. Cada serviço abaixo tem a sua própria página.',
        orlandoOnly: 'O Dr. Sheryar Khan realiza nossos tratamentos no nosso consultório, e nossa higienista odontológica realiza as limpezas e revisões. Alguns tratamentos são encaminhados a outro profissional, incluindo o retratamento de canal e alguns tipos de cirurgia oral. Cada serviço abaixo tem a sua própria página.',
      },
    },
    detail: {
      otherServices: 'Outros serviços',
    },
    atOffices: {
      withOcoee: 'em ambos os consultórios',
      orlandoOnly: 'no nosso consultório de Orlando',
    },
    items: {
      'cleanings-checkups': {
        title: 'Limpezas e revisões',
        heading: 'Limpezas e revisões',
        titleTag: 'Limpezas e revisões',
        summary: 'cuidados preventivos de rotina',
        listLabel: 'Limpezas e revisões: cuidados preventivos de rotina',
        description: 'Limpezas e revisões regulares, a cada seis meses, nos ajudam a identificar problemas logo no início.',
        paragraphs: [
          'Limpezas e revisões regulares, a cada seis meses, nos ajudam a identificar problemas logo no início. Radiografias são feitas quando o Dr. Khan decide que são necessárias. Nossa higienista odontológica, Jessica Salazar, realiza as limpezas {atOffices}.',
        ],
      },
      emergency: {
        title: 'Atendimento de emergência',
        heading: 'Atendimento odontológico de emergência',
        titleTag: 'Atendimento odontológico de emergência',
        summary: 'tratamento urgente para dor, inchaço e dentes quebrados',
        listLabel: 'Atendimento de emergência: tratamento urgente para dor, inchaço e dentes quebrados',
        description: 'Tratamento urgente para dor, inchaço e dentes quebrados.',
        paragraphs: [],
      },
      extractions: {
        title: 'Extrações dentárias',
        heading: 'Extrações dentárias',
        titleTag: 'Extrações dentárias',
        summary: 'inclusive no mesmo dia, quando adequado',
        listLabel: 'Extrações dentárias, inclusive no mesmo dia, quando adequado',
        description: 'A extração pode ser a melhor opção quando um dente não pode ser salvo. A extração no mesmo dia está sujeita à adequação clínica e à disponibilidade.',
        paragraphs: [
          'Quando um dente não pode ser salvo, a extração pode ser a melhor opção. As extrações são um dos nossos serviços no mesmo dia, sujeitas à adequação clínica e à disponibilidade. O Dr. Khan explica as suas opções antes de qualquer tratamento começar. Alguns tipos de cirurgia oral são encaminhados a outro profissional.',
        ],
      },
      restorative: {
        title: 'Restaurações e cuidados restauradores',
        heading: 'Restaurações e cuidados restauradores',
        titleTag: 'Restaurações e cuidados restauradores',
        summary: '',
        listLabel: 'Restaurações e cuidados restauradores',
        description: 'Restaurações e outros tratamentos restauradores reparam dentes danificados por cárie, rachaduras ou quebras.',
        paragraphs: [
          'Restaurações e outros tratamentos restauradores reparam dentes danificados por cárie, rachaduras ou quebras. Disponível {atOffices}.',
        ],
      },
      crowns: {
        title: 'Coroas',
        heading: 'Coroas dentárias',
        titleTag: 'Coroas dentárias',
        summary: '',
        listLabel: 'Coroas',
        description: 'Uma coroa cobre e protege um dente danificado ou enfraquecido. As coroas exigem um trabalho de laboratório odontológico.',
        paragraphs: [
          'Uma coroa cobre e protege um dente danificado ou enfraquecido. As coroas exigem um trabalho de laboratório odontológico e, por isso, não são concluídas no mesmo dia. O preparo da coroa pode começar em um atendimento de emergência, e o Dr. Khan explicará as etapas seguintes.',
        ],
      },
      'root-canal': {
        title: 'Tratamento de canal',
        heading: 'Tratamento de canal',
        titleTag: 'Tratamento de canal',
        summary: '(Orlando)',
        listLabel: 'Tratamento de canal (Orlando)',
        description: 'O tratamento de canal é realizado no nosso consultório de Orlando.',
        paragraphs: {
          withOcoee: [
            'Um tratamento de canal trata o tecido mole interno do dente, chamado polpa, quando ele está infectado ou danificado. O tecido infectado é removido, o interior do dente é limpo e selado, e depois o dente é restaurado. O tratamento de canal é realizado no nosso consultório de Orlando. Se você é paciente de Ocoee e precisa de tratamento de canal, agendaremos a sua consulta em Orlando. O retratamento de canal é encaminhado a outro profissional.',
          ],
          orlandoOnly: [
            'Um tratamento de canal trata o tecido mole interno do dente, chamado polpa, quando ele está infectado ou danificado. O tecido infectado é removido, o interior do dente é limpo e selado, e depois o dente é restaurado. O tratamento de canal é realizado no nosso consultório de Orlando. O retratamento de canal é encaminhado a outro profissional.',
          ],
        },
      },
      implants: {
        title: 'Implantes dentários',
        heading: 'Implantes dentários',
        titleTag: 'Implantes dentários',
        summary: '',
        listLabel: 'Implantes dentários',
        description: 'Um implante substitui a raiz de um dente ausente e sustenta uma coroa ou outro dente de reposição.',
        paragraphs: [
          'Um implante substitui a raiz de um dente ausente e sustenta uma coroa ou outro dente de reposição. A colocação do implante pode ser feita no mesmo dia, sujeita à adequação clínica e à disponibilidade. O Dr. Khan planeja o tratamento com você em etapas claras, e os implantes são uma área de atenção especial no atendimento dele.',
        ],
      },
      dentures: {
        title: 'Prótese dentária',
        heading: 'Prótese dentária',
        titleTag: 'Prótese dentária',
        summary: '',
        listLabel: 'Prótese dentária',
        description: 'A prótese dentária substitui dentes ausentes. O Dr. Khan vai explicar as opções e o processo para você.',
        paragraphs: [
          'A prótese dentária substitui dentes ausentes e está disponível {atOffices}. O Dr. Khan vai explicar as opções e o processo para você durante a sua visita.',
        ],
      },
      'clear-aligners-braces': {
        title: 'Alinhadores transparentes e aparelho fixo',
        heading: 'Alinhadores transparentes e aparelho fixo',
        titleTag: 'Alinhadores transparentes e aparelho fixo',
        summary: '',
        listLabel: 'Alinhadores transparentes e aparelho fixo',
        description: 'O Dr. Khan oferece alinhadores transparentes e aparelho fixo tradicional.',
        paragraphs: [
          'O Dr. Khan oferece alinhadores transparentes e aparelho fixo tradicional {atOffices}. Os alinhadores transparentes são uma série de moldeiras transparentes e removíveis que movem os dentes gradualmente. O aparelho fixo tradicional usa braquetes e fios. A maioria dos nossos casos de ortodontia é de aparelho fixo tradicional.',
        ],
      },
      cosmetic: {
        title: 'Odontologia estética',
        heading: 'Odontologia estética',
        titleTag: 'Odontologia estética',
        summary: '',
        listLabel: 'Odontologia estética',
        description: 'Lentes de contato dental, design do sorriso e outros tratamentos estéticos, planejados de acordo com os seus objetivos e a sua saúde bucal.',
        paragraphs: [
          // Review: financing wording ("subject to approval"). Check against the financing partners' terms.
          'O tratamento estético é planejado de acordo com os seus objetivos e a sua saúde bucal. Lentes de contato dental são lâminas finas feitas sob medida, coladas à face frontal dos dentes para mudar a forma, a cor ou o alinhamento. O design do sorriso planeja com você a aparência geral do seu sorriso. O tratamento estético pode ser pago por meio dos nossos parceiros de financiamento, sujeito a aprovação.',
        ],
      },
    },
  },
};
