import type { Locale } from '../locales';

// Copy for the emergency, technology, new patients, contact and FAQ pages, and the FAQ content
// in src/content/faq.ts. Where the wording changes with the Ocoee hold the key has two forms,
// withOcoee and orlandoOnly. Where it changes with the request-form hold the forms are withForm
// and callOnly. Placeholders such as {phone} are filled by fill(). Strings split around a link
// (before, link, after) keep the spaces at their edges, so do not trim them.
const en = {
  emergency: {
    meta: {
      title: 'Emergency Dental Care',
      description: 'Tooth pain, swelling, a broken tooth or a dental injury? Emergency appointments are often available the same day, including for new patients.',
    },
    title: 'Emergency dental care',
    lead: 'Tooth pain, a swollen face, a broken tooth or an injury to your teeth? Call us. Emergency appointments are often available the same day, including for new patients.',
    // Spoken label for the safety notice landmark.
    safetyLabel: 'When to call 911',
    // Review: emergency safety wording. Dr. Khan must approve it in every language before publishing.
    safetyNotice: 'If you have trouble breathing or swallowing, swelling that is spreading into your face or neck, or a serious injury to your head or face, call 911 or go to the nearest emergency room now.',
    sameDayCare: 'Same-day emergency care includes assessment and first-stage treatment for abscesses and swelling, broken or fractured teeth, and dental trauma. It can also include extraction when needed, and starting a crown preparation.',
    afterHours: {
      title: 'After hours',
      body: 'Calls outside opening hours are answered by our answering service, which passes your details to our team for a call-back. We are not open 24 hours, but weekend and after-hours emergency appointments are often available, subject to availability. After-hours emergencies are handled at our Orlando office.',
    },
  },
  technology: {
    meta: {
      title: 'Technology',
      description: 'Digital X-rays, 3D imaging, a digital intraoral scanner and an intraoral camera help Dr. Khan examine teeth and plan treatment.',
    },
    title: 'Technology at our practice',
    lead: 'The equipment below helps Dr. Khan examine teeth and plan treatment, and lets you see what he sees.',
    // Equipment brand names (Vatech, 3Shape TRIOS 5) are not translated.
    equipment: [
      'Digital X-rays (Vatech)',
      '3D imaging, CBCT (Vatech)',
      'Digital intraoral scanner (3Shape TRIOS 5)',
      'Intraoral camera',
    ],
    photoAlt: 'A team member beside our digital X-ray unit',
  },
  newPatients: {
    meta: {
      title: 'New Patients',
      description: 'How your first visit works: booking, emergency visits, forms, your financial policy, language and what to do if you feel nervous.',
    },
    title: 'New patients',
    lead: 'Welcome. Here is how your first visit works.',
    booking: {
      label: 'Booking.',
      withForm: 'Request an appointment through our form, or call our office.',
      callOnly: 'Call our office to request an appointment.',
    },
    emergencies: {
      label: 'Emergencies.',
      body: 'Emergency visits are open to new patients.',
    },
    // The link text between before and after is common.legal.noticeOfPrivacyPractices.
    forms: {
      label: 'Forms.',
      before: "We'll ask you to complete our new-patient forms, including our HIPAA ",
      after: ". Please don't include health details in the website form.",
    },
    // Review: the card on file is taken at booking (practice decision, 16 Oct 2026; C17 §6). Whether the financial policy is signed at booking or at the first visit is still to confirm.
    firstVisit: {
      label: 'Your first visit.',
      before: "A valid payment card is required on file for every patient at booking. At your first visit, you'll review and sign our financial policy. Details are on the ",
      link: 'Payment and financing',
      after: ' page.',
    },
    language: {
      label: 'Language.',
      body: "Tell us your language when you book, and we'll confirm who is in.",
    },
    nervous: {
      label: 'Feeling nervous?',
      body: 'If dental visits make you nervous, tell us when you book, so we can plan your visit around what helps.',
    },
    photoAlt: 'A treatment room at Contemporary Dental Care',
  },
  contact: {
    meta: {
      title: 'Contact Us',
      description: 'Phone numbers, addresses, hours and email for Contemporary Dental Care, and how to request an appointment.',
    },
    title: 'Locations',
  },
  faq: {
    meta: {
      title: 'Frequently Asked Questions',
      description: 'Answers about our offices, hours, emergency care, insurance, payment plans, languages and cancellations.',
    },
    title: 'Frequently asked questions',
    // One line of the "Where are your offices?" answer; the office name and address are facts, not copy.
    officeLine: '{name}: {address}.',
    // Answers are verbatim from the content file. Every answer that mentions Ocoee
    // switches with the Ocoee hold.
    items: {
      offices: {
        question: 'Where are your offices?',
      },
      hours: {
        question: 'What are your hours?',
        // Keep in step with common.hours.
        answer: {
          withOcoee: 'Orlando is open Monday to Friday, 8:00am to 5:00pm, and one Saturday a month. The Saturday changes, so please call to check. Ocoee is open Monday, 9:00am to 5:00pm.',
          orlandoOnly: 'Orlando is open Monday to Friday, 8:00am to 5:00pm, and one Saturday a month. The Saturday changes, so please call to check.',
        },
      },
      open24Hours: {
        question: 'Are you open 24 hours?',
        answer: "No. Calls outside opening hours are answered by our answering service, who pass your details to our team for a call-back. Emergency appointments are often available the same day, but after-hours treatment depends on availability and can't be promised.",
      },
      afterHoursEmergency: {
        question: 'What if I have a dental emergency after hours?',
        // Review: the 911 wording is emergency safety wording. Dr. Khan must approve it in every language.
        answer: 'Call {phone}. Calls outside opening hours are answered by our answering service, who pass your details to our team for a call-back. For trouble breathing or swallowing, or a serious injury to your head or face, call 911.',
      },
      bookOnline: {
        question: 'Can I book an appointment online?',
        // The request form is on hold (see appointmentFormEnabled), so the answer points to the phone.
        answer: {
          withForm: 'Not at the moment. Request an appointment through our form, or call our office.',
          callOnly: 'Not at the moment. Please call our office to request an appointment.',
        },
      },
      emergencyNewPatients: {
        question: 'Are emergency visits open to new patients?',
        answer: 'Yes.',
      },
      sameDayExtraction: {
        question: 'Can I have a tooth removed on the same day?',
        answer: 'Extractions are one of our same-day services, subject to clinical suitability and availability.',
      },
      // Held in every language: same-day crowns are not offered. The answer says so and must stay a "No".
      sameDayCrowns: {
        question: 'Do you offer same-day crowns?',
        answer: 'No. Crowns need a dental laboratory case, so they are not completed on the same day. Our same-day services are extractions and implant placement, plus emergency first-stage treatment.',
      },
      // Review: insurance wording. Check against the insurance page before publishing.
      insurance: {
        question: 'Do you accept my insurance?',
        answer: "See our insurance list. Insurance is always an estimate, so call us and we'll verify your benefits before treatment.",
        linkLabel: 'insurance list',
      },
      // Review: insurance wording.
      medicaid: {
        question: 'Do you accept Medicaid?',
        answer: 'No.',
      },
      // Review: financing wording. Partner names are not translated. Financing is subject to approval and the lender's terms.
      financing: {
        question: 'Do you offer financing?',
        answer: "Yes. We work with Alphaeon, CareCredit, Sunbit, Afterpay and Klarna. Financing is subject to approval and the lender's terms.",
      },
      rootCanal: {
        question: 'Do you do root canal treatment?',
        answer: {
          withOcoee: 'Yes, at our Orlando office. Ocoee patients who need root canal treatment are scheduled at Orlando.',
          orlandoOnly: 'Yes, at our Orlando office.',
        },
      },
      orthodontist: {
        question: 'Is Dr. Khan an orthodontist?',
        answer: {
          withOcoee: 'No. Dr. Khan is a general dentist, and no orthodontist works in either office.',
          orlandoOnly: 'No. Dr. Khan is a general dentist, and no orthodontist works in our office.',
        },
      },
      weekend: {
        question: 'What if I need an appointment on a weekend?',
        answer: "We are open one Saturday a month. Weekend and after-hours emergency appointments are often available. Call us, and we'll tell you what we can do.",
      },
      spanishPortuguese: {
        question: 'Do you speak Spanish or Portuguese?',
        answer: 'Care is available in English, Spanish and Portuguese. Please ask about language support when you call.',
      },
      // Review: this answer must stay as written until a qualified interpretation route exists. Do not add any
      // promise of interpretation or language support in any language.
      haitianCreoleFrench: {
        question: 'Do you speak Haitian Creole or French?',
        answer: 'Please call our office and tell us about your language needs.',
      },
      // Review: financial policy wording. The late-cancellation amounts ($50 weekday, $100 weekend) must match the
      // financial policy on the insurance page. The link label must appear word for word in the answer.
      cancellation: {
        question: 'What is your cancellation policy?',
        answer: 'Please give 48 hours’ notice. A late cancellation or missed appointment is $50 on a weekday and $100 on a weekend. Our full financial policy is on the Insurance and Financing page.',
        linkLabel: 'Insurance and Financing page',
      },
      nervous: {
        question: "I'm nervous about dental visits. What can I do?",
        answer: 'Please mention your anxiety when you schedule your appointment, and we will tailor your visit around your comfort level. Our friendly team takes the time to explain everything step-by-step in plain language—no surprises, no pressure. You can also take advantage of our relaxing amenities, including noise-canceling headphones and weighted blankets, to help you feel at ease throughout your care.',
      },
    },
  },
};

export type VisitMessages = typeof en;

export const visit: Record<Locale, VisitMessages> = {
  en,
  es: {
    emergency: {
      meta: {
        title: 'Atención dental de urgencia',
        description: '¿Dolor dental, hinchazón, un diente roto o una lesión dental? Con frecuencia hay citas de urgencia el mismo día, también para pacientes nuevos.',
      },
      title: 'Atención dental de urgencia',
      lead: '¿Dolor dental, la cara hinchada, un diente roto o una lesión en los dientes? Llámenos. Con frecuencia hay citas de urgencia el mismo día, también para pacientes nuevos.',
      safetyLabel: 'Cuándo llamar al 911',
      // Review: emergency safety wording. Dr. Khan must approve it in every language before publishing.
      safetyNotice: 'Si tiene dificultad para respirar o para tragar, una hinchazón que se extiende a la cara o al cuello, o una lesión grave en la cabeza o en la cara, llame al 911 o acuda ahora a la sala de urgencias más cercana.',
      sameDayCare: 'La atención de urgencia el mismo día incluye la evaluación y el tratamiento de primera etapa de abscesos e hinchazón, dientes rotos o fracturados y traumatismos dentales. También puede incluir la extracción cuando sea necesaria y el inicio de la preparación de una corona.',
      afterHours: {
        title: 'Fuera del horario de atención',
        body: 'Las llamadas fuera del horario de atención las responde nuestro servicio de atención telefónica, que transmite sus datos a nuestro equipo para que le devuelvan la llamada. No abrimos las 24 horas, pero con frecuencia hay citas de urgencia en fin de semana y fuera del horario, sujetas a disponibilidad. Las urgencias fuera del horario se atienden en nuestro consultorio de Orlando.',
      },
    },
    technology: {
      meta: {
        title: 'Tecnología',
        description: 'Las radiografías digitales, las imágenes 3D, un escáner intraoral digital y una cámara intraoral ayudan al Dr. Khan a examinar los dientes y planificar el tratamiento.',
      },
      title: 'Tecnología en nuestro consultorio',
      lead: 'El equipo que se detalla a continuación ayuda al Dr. Khan a examinar los dientes y planificar el tratamiento, y le permite a usted ver lo que él ve.',
      equipment: [
        'Radiografías digitales (Vatech)',
        'Imágenes 3D, CBCT (Vatech)',
        'Escáner intraoral digital (3Shape TRIOS 5)',
        'Cámara intraoral',
      ],
      photoAlt: 'Un miembro de nuestro equipo junto a nuestra unidad de rayos X digital',
    },
    newPatients: {
      meta: {
        title: 'Pacientes nuevos',
        description: 'Cómo funciona su primera visita: la reserva de la cita, las visitas de urgencia, los formularios, su política financiera, el idioma y qué hacer si siente nervios.',
      },
      title: 'Pacientes nuevos',
      lead: 'Le damos la bienvenida. Así funciona su primera visita.',
      booking: {
        label: 'Reserva de la cita.',
        withForm: 'Solicite una cita a través de nuestro formulario o llame a su consultorio.',
        callOnly: 'Llame a su consultorio para solicitar una cita.',
      },
      emergencies: {
        label: 'Urgencias.',
        body: 'Las visitas de urgencia están abiertas a pacientes nuevos.',
      },
      forms: {
        label: 'Formularios.',
        before: 'Le pediremos que complete nuestros formularios para pacientes nuevos, incluido nuestro ',
        after: ' de la HIPAA. Por favor, no incluya detalles de salud en el formulario del sitio web.',
      },
      // Review: the card on file is taken at booking (practice decision, 16 Oct 2026; C17 §6). Whether the financial policy is signed at booking or at the first visit is still to confirm.
      firstVisit: {
        label: 'Su primera visita.',
        before: 'Se requiere una tarjeta de pago válida registrada para cada paciente al reservar la cita. En su primera visita, usted revisará y firmará nuestra política financiera. Encontrará los detalles en la página ',
        link: 'Pago y financiamiento',
        after: '.',
      },
      language: {
        label: 'Idioma.',
        body: 'Díganos qué idioma habla al reservar su cita y le confirmaremos quién está en el consultorio.',
      },
      nervous: {
        label: '¿Siente nervios?',
        body: 'Si las visitas al dentista le generan nervios, díganoslo al reservar su cita, para que podamos planificar su visita según lo que le ayude.',
      },
      photoAlt: 'Una sala de tratamiento en Contemporary Dental Care',
    },
    contact: {
      meta: {
        title: 'Contáctenos',
        description: 'Números de teléfono, direcciones, horarios y correo electrónico de Contemporary Dental Care, y cómo solicitar una cita.',
      },
      title: 'Ubicaciones',
    },
    faq: {
      meta: {
        title: 'Preguntas frecuentes',
        description: 'Respuestas sobre nuestros consultorios, horarios, atención de urgencia, seguros, planes de pago, idiomas y cancelaciones.',
      },
      title: 'Preguntas frecuentes',
      officeLine: '{name}: {address}.',
      items: {
        offices: {
          question: '¿Dónde están sus consultorios?',
        },
        hours: {
          question: '¿Cuál es su horario?',
          answer: {
            withOcoee: 'El consultorio de Orlando atiende de lunes a viernes, de 8:00 a. m. a 5:00 p. m., y un sábado al mes. El sábado cambia, así que le recomendamos llamar para confirmarlo. El consultorio de Ocoee atiende los lunes, de 9:00 a. m. a 5:00 p. m.',
            orlandoOnly: 'El consultorio de Orlando atiende de lunes a viernes, de 8:00 a. m. a 5:00 p. m., y un sábado al mes. El sábado cambia, así que le recomendamos llamar para confirmarlo.',
          },
        },
        open24Hours: {
          question: '¿Están abiertos las 24 horas?',
          answer: 'No. Las llamadas fuera del horario de atención las responde nuestro servicio de atención telefónica, que transmite sus datos a nuestro equipo para que le devuelvan la llamada. Con frecuencia hay citas de urgencia el mismo día, pero el tratamiento fuera del horario depende de la disponibilidad y no se puede prometer.',
        },
        afterHoursEmergency: {
          question: '¿Qué hago si tengo una urgencia dental fuera del horario de atención?',
          // Review: the 911 wording is emergency safety wording. Dr. Khan must approve it in every language.
          answer: 'Llame al {phone}. Su llamada se contesta y se pasa a nuestro equipo, que le devolverá la llamada. Si tiene dificultad para respirar o para tragar, o una lesión grave en la cabeza o en la cara, llame al 911.',
        },
        bookOnline: {
          question: '¿Puedo reservar una cita en línea?',
          answer: {
            withForm: 'Por el momento no. Solicite una cita a través de nuestro formulario o llame a su consultorio.',
            callOnly: 'Por el momento no. Por favor, llame a su consultorio para solicitar una cita.',
          },
        },
        emergencyNewPatients: {
          question: '¿Las visitas de urgencia están abiertas a pacientes nuevos?',
          answer: 'Sí.',
        },
        sameDayExtraction: {
          question: '¿Pueden extraerme un diente el mismo día?',
          answer: 'Las extracciones son uno de nuestros servicios del mismo día, sujetas a la idoneidad clínica y a la disponibilidad.',
        },
        sameDayCrowns: {
          question: '¿Ofrecen coronas el mismo día?',
          answer: 'No. Las coronas requieren un trabajo de laboratorio dental, por lo que no se completan el mismo día. Nuestros servicios del mismo día son las extracciones y la colocación de implantes, además del tratamiento de urgencia de primera etapa.',
        },
        // Review: insurance wording. Check against the insurance page before publishing.
        insurance: {
          question: '¿Aceptan mi seguro?',
          answer: 'Consulte nuestra lista de seguros. Lo que cubre el seguro siempre es una estimación, así que llámenos y verificaremos sus beneficios antes del tratamiento.',
          linkLabel: 'lista de seguros',
        },
        // Review: insurance wording.
        medicaid: {
          question: '¿Aceptan Medicaid?',
          answer: 'No.',
        },
        // Review: financing wording. Partner names are not translated.
        financing: {
          question: '¿Ofrecen financiamiento?',
          answer: 'Sí. Trabajamos con Alphaeon, CareCredit, Sunbit, Afterpay y Klarna. El financiamiento está sujeto a aprobación y a los términos del prestamista.',
        },
        rootCanal: {
          question: '¿Hacen endodoncias?',
          answer: {
            withOcoee: 'Sí, en nuestro consultorio de Orlando. Los pacientes de Ocoee que necesitan una endodoncia reciben su cita en Orlando.',
            orlandoOnly: 'Sí, en nuestro consultorio de Orlando.',
          },
        },
        orthodontist: {
          question: '¿El Dr. Khan es ortodoncista?',
          answer: {
            withOcoee: 'No. El Dr. Khan es odontólogo general, y ningún ortodoncista trabaja en ninguno de los dos consultorios.',
            orlandoOnly: 'No. El Dr. Khan es odontólogo general, y ningún ortodoncista trabaja en nuestro consultorio.',
          },
        },
        weekend: {
          question: '¿Qué pasa si necesito una cita en fin de semana?',
          answer: 'Abrimos un sábado al mes. Con frecuencia hay citas de urgencia en fin de semana y fuera del horario de atención. Llámenos y le diremos qué podemos hacer.',
        },
        spanishPortuguese: {
          question: '¿Hablan español o portugués?',
          answer: 'Atendemos en inglés, español y portugués. Por favor, pregunte por el apoyo en su idioma al llamar.',
        },
        // Review: this answer must stay as written until a qualified interpretation route exists.
        haitianCreoleFrench: {
          question: '¿Hablan criollo haitiano o francés?',
          answer: 'Por favor, llame a nuestro consultorio y cuéntenos sus necesidades de idioma.',
        },
        // Review: financial policy wording. The amounts must match the financial policy on the insurance page.
        cancellation: {
          question: '¿Cuál es su política de cancelación?',
          answer: 'Por favor, avísenos con 48 horas de anticipación. Una cancelación tardía o una cita a la que no se asista tiene un costo de $50 en un día de semana y de $100 en fin de semana. Nuestra política financiera completa está en la página de Seguros y financiamiento.',
          linkLabel: 'página de Seguros y financiamiento',
        },
        nervous: {
          question: 'Las visitas al dentista me generan nervios. ¿Qué puedo hacer?',
          answer: 'Por favor, mencione su ansiedad al programar su cita y adaptaremos su visita a su nivel de comodidad. Nuestro amable equipo se toma el tiempo de explicarle todo paso a paso en un lenguaje sencillo, sin sorpresas ni presiones. También puede aprovechar nuestras comodidades relajantes, como audífonos con cancelación de ruido y mantas con peso, para sentirse tranquilo durante toda su atención.',
        },
      },
    },
  },
  pt: {
    emergency: {
      meta: {
        title: 'Atendimento odontológico de emergência',
        description: 'Dor de dente, inchaço, um dente quebrado ou uma lesão dentária? Consultas de emergência costumam estar disponíveis no mesmo dia, inclusive para novos pacientes.',
      },
      title: 'Atendimento odontológico de emergência',
      lead: 'Dor de dente, rosto inchado, um dente quebrado ou uma lesão nos dentes? Ligue para nós. Consultas de emergência costumam estar disponíveis no mesmo dia, inclusive para novos pacientes.',
      safetyLabel: 'Quando ligar para o 911',
      // Review: emergency safety wording. Dr. Khan must approve it in every language before publishing.
      safetyNotice: 'Se você tiver dificuldade para respirar ou engolir, inchaço que esteja se espalhando para o rosto ou o pescoço, ou uma lesão grave na cabeça ou no rosto, ligue para o 911 ou vá agora ao pronto-socorro mais próximo.',
      sameDayCare: 'O atendimento de emergência no mesmo dia inclui avaliação e tratamento de primeira etapa para abscessos e inchaço, dentes quebrados ou fraturados e traumatismo dentário. Também pode incluir extração, quando necessária, e o início do preparo de uma coroa.',
      afterHours: {
        title: 'Fora do horário',
        body: 'As ligações fora do horário de atendimento são atendidas pelo nosso serviço de atendimento telefônico, que repassa os seus dados à nossa equipe para retorno da ligação. Não funcionamos 24 horas, mas consultas de emergência nos fins de semana e fora do horário costumam estar disponíveis, sujeitas à disponibilidade. As emergências fora do horário são atendidas no nosso consultório de Orlando.',
      },
    },
    technology: {
      meta: {
        title: 'Tecnologia',
        description: 'Radiografias digitais, imagens 3D, um escâner intraoral digital e uma câmera intraoral ajudam o Dr. Khan a examinar os dentes e planejar o tratamento.',
      },
      title: 'Tecnologia no nosso consultório',
      lead: 'Os equipamentos abaixo ajudam o Dr. Khan a examinar os dentes e planejar o tratamento, e permitem que você veja o que ele vê.',
      equipment: [
        'Radiografias digitais (Vatech)',
        'Imagens 3D, CBCT (Vatech)',
        'Escâner intraoral digital (3Shape TRIOS 5)',
        'Câmera intraoral',
      ],
      photoAlt: 'Um membro da nossa equipe ao lado do nosso aparelho de raio-X digital',
    },
    newPatients: {
      meta: {
        title: 'Novos pacientes',
        description: 'Como funciona a sua primeira visita: agendamento, atendimentos de emergência, formulários, a sua política financeira, idioma e o que fazer se você sentir nervosismo.',
      },
      title: 'Novos pacientes',
      lead: 'Boas-vindas. Veja como funciona a sua primeira visita.',
      booking: {
        label: 'Agendamento.',
        withForm: 'Solicite uma consulta pelo nosso formulário ou ligue para o seu consultório.',
        callOnly: 'Ligue para o seu consultório para solicitar uma consulta.',
      },
      emergencies: {
        label: 'Emergências.',
        body: 'Os atendimentos de emergência estão abertos a novos pacientes.',
      },
      forms: {
        label: 'Formulários.',
        before: 'Pediremos que você preencha os nossos formulários de novos pacientes, incluindo o nosso ',
        after: ' da HIPAA. Por favor, não inclua dados de saúde no formulário do site.',
      },
      // Review: the card on file is taken at booking (practice decision, 16 Oct 2026; C17 §6). Whether the financial policy is signed at booking or at the first visit is still to confirm.
      firstVisit: {
        label: 'Sua primeira visita.',
        before: 'É obrigatório ter um cartão de pagamento válido cadastrado para todos os pacientes no momento da reserva. Na sua primeira visita, você vai revisar e assinar a nossa política financeira. Os detalhes estão na página ',
        link: 'Pagamento e financiamento',
        after: '.',
      },
      language: {
        label: 'Idioma.',
        body: 'Diga-nos o seu idioma ao agendar, e confirmaremos quem está presente.',
      },
      nervous: {
        label: 'Sente nervosismo?',
        body: 'Se as visitas ao dentista deixam você nervoso, avise-nos ao agendar, para que possamos planejar a sua visita de acordo com o que ajuda.',
      },
      photoAlt: 'Uma sala de tratamento da Contemporary Dental Care',
    },
    contact: {
      meta: {
        title: 'Fale conosco',
        description: 'Telefones, endereços, horários e e-mail da Contemporary Dental Care, e como solicitar uma consulta.',
      },
      title: 'Localizações',
    },
    faq: {
      meta: {
        title: 'Perguntas frequentes',
        description: 'Respostas sobre os nossos consultórios, horários, atendimento de emergência, convênios, planos de pagamento, idiomas e cancelamentos.',
      },
      title: 'Perguntas frequentes',
      officeLine: '{name}: {address}.',
      items: {
        offices: {
          question: 'Onde ficam os seus consultórios?',
        },
        hours: {
          question: 'Qual é o horário de funcionamento?',
          answer: {
            withOcoee: 'O consultório de Orlando funciona de segunda a sexta, das 8h às 17h, e um sábado por mês. O sábado muda, por isso ligue para confirmar. O consultório de Ocoee funciona às segundas-feiras, das 9h às 17h.',
            orlandoOnly: 'O consultório de Orlando funciona de segunda a sexta, das 8h às 17h, e um sábado por mês. O sábado muda, por isso ligue para confirmar.',
          },
        },
        open24Hours: {
          question: 'Vocês atendem 24 horas?',
          answer: 'Não. As ligações fora do horário de atendimento são atendidas pelo nosso serviço de atendimento telefônico, que repassa os seus dados à nossa equipe para retorno da ligação. O atendimento de emergência no mesmo dia costuma estar disponível, mas o tratamento fora do horário depende da disponibilidade e não pode ser prometido.',
        },
        afterHoursEmergency: {
          question: 'E se eu tiver uma emergência odontológica fora do horário?',
          // Review: the 911 wording is emergency safety wording. Dr. Khan must approve it in every language.
          answer: 'Ligue para {phone}. Sua ligação é atendida e repassada à nossa equipe, que retornará a ligação. Em caso de dificuldade para respirar ou engolir, ou de lesão grave na cabeça ou no rosto, ligue para o 911.',
        },
        bookOnline: {
          question: 'Posso agendar uma consulta on-line?',
          answer: {
            withForm: 'No momento, não. Solicite uma consulta pelo nosso formulário ou ligue para o seu consultório.',
            callOnly: 'No momento, não. Por favor, ligue para o seu consultório para solicitar uma consulta.',
          },
        },
        emergencyNewPatients: {
          question: 'Os atendimentos de emergência estão abertos a novos pacientes?',
          answer: 'Sim.',
        },
        sameDayExtraction: {
          question: 'Posso extrair um dente no mesmo dia?',
          answer: 'As extrações são um dos nossos serviços no mesmo dia, sujeitas à adequação clínica e à disponibilidade.',
        },
        sameDayCrowns: {
          question: 'Vocês oferecem coroas no mesmo dia?',
          answer: 'Não. As coroas exigem um trabalho de laboratório odontológico e, por isso, não são concluídas no mesmo dia. Os nossos serviços no mesmo dia são as extrações e a colocação de implantes, além do tratamento de emergência de primeira etapa.',
        },
        // Review: insurance wording. Check against the insurance page before publishing.
        insurance: {
          question: 'Vocês aceitam o meu convênio?',
          answer: 'Veja a nossa lista de convênios. A cobertura do convênio é sempre uma estimativa, então ligue para nós e verificaremos os seus benefícios antes do tratamento.',
          linkLabel: 'lista de convênios',
        },
        // Review: insurance wording.
        medicaid: {
          question: 'Vocês aceitam o Medicaid?',
          answer: 'Não.',
        },
        // Review: financing wording. Partner names are not translated.
        financing: {
          question: 'Vocês oferecem financiamento?',
          answer: 'Sim. Trabalhamos com Alphaeon, CareCredit, Sunbit, Afterpay e Klarna. O financiamento está sujeito a aprovação e aos termos do credor.',
        },
        rootCanal: {
          question: 'Vocês fazem tratamento de canal?',
          answer: {
            withOcoee: 'Sim, no nosso consultório de Orlando. Os pacientes de Ocoee que precisam de tratamento de canal são agendados em Orlando.',
            orlandoOnly: 'Sim, no nosso consultório de Orlando.',
          },
        },
        orthodontist: {
          question: 'O Dr. Khan é ortodontista?',
          answer: {
            withOcoee: 'Não. O Dr. Khan é clínico geral, e nenhum ortodontista trabalha em nenhum dos dois consultórios.',
            orlandoOnly: 'Não. O Dr. Khan é clínico geral, e nenhum ortodontista trabalha no nosso consultório.',
          },
        },
        weekend: {
          question: 'E se eu precisar de uma consulta no fim de semana?',
          answer: 'Abrimos um sábado por mês. Consultas de emergência nos fins de semana e fora do horário costumam estar disponíveis. Ligue para nós e diremos o que podemos fazer.',
        },
        spanishPortuguese: {
          question: 'Vocês falam espanhol ou português?',
          answer: 'Atendemos em inglês, espanhol e português. Por favor, pergunte por apoio no seu idioma ao ligar.',
        },
        // Review: this answer must stay as written until a qualified interpretation route exists.
        haitianCreoleFrench: {
          question: 'Vocês falam crioulo haitiano ou francês?',
          answer: 'Por favor, ligue para o nosso consultório e conte-nos sobre as suas necessidades de idioma.',
        },
        // Review: financial policy wording. The amounts must match the financial policy on the insurance page.
        cancellation: {
          question: 'Qual é a política de cancelamento de vocês?',
          answer: 'Pedimos aviso com 48 horas de antecedência. Um cancelamento tardio ou a falta a uma consulta custa $50 em dia de semana e $100 no fim de semana. A nossa política financeira completa está na página Seguros e financiamento.',
          linkLabel: 'página Seguros e financiamento',
        },
        nervous: {
          question: 'Sinto nervosismo ao ir ao dentista. O que posso fazer?',
          answer: 'Por favor, mencione sua ansiedade ao agendar sua consulta, e adaptaremos sua visita ao seu nível de conforto. Nossa equipe simpática dedica tempo para explicar tudo passo a passo em linguagem simples, sem surpresas e sem pressão. Você também pode aproveitar nossos recursos relaxantes, como fones com cancelamento de ruído e cobertores com peso, para se sentir à vontade durante todo o atendimento.',
        },
      },
    },
  },
};
