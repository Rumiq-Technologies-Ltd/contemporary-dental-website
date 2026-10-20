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
    // The practice's revised page copy of 20 October 2026, from the sub-header down.
    intro: 'Gentle, priority care when you need it most. Our team is here to relieve your discomfort and guide your next steps.',
    // Spoken label for the safety notice landmark.
    safetyLabel: 'When to call 911',
    // Review: emergency safety wording. Dr. Khan must approve it in every language before publishing.
    safetyTitle: 'Urgent medical notice',
    safetyNotice: 'If you are experiencing difficulty breathing or swallowing, swelling that is spreading into your face or neck, or severe head/facial trauma, please call 911 or go to the nearest emergency room immediately.',
    // Review against C14 §3.1: "you don't have to wait", "we reserve time" and "immediate relief" go
    // beyond its framing of same-day or next-available appointments subject to availability.
    sameDay: {
      title: 'Same-day emergency care',
      body: "Whether you are dealing with severe tooth pain, a swollen face, or a broken tooth, you don't have to wait. We reserve time in our schedule for same-day emergency appointments for both new and established patients.",
      listIntro: 'Our priority is getting you out of pain quickly. Same-day emergency care covers comprehensive evaluation and immediate relief for:',
      items: [
        'Toothaches, abscesses, and sudden swelling',
        'Broken, chipped, or fractured teeth',
        'Dental trauma and urgent extractions',
        'Temporary crown preparation and stabilization',
      ],
    },
    afterHours: {
      title: 'After hours care',
      availability: 'While we are not a 24-hour facility, weekend and after-hours emergency appointments are often available based on schedule availability.',
      callBack: 'If you call outside of normal business hours, our answering service will take your details and notify our team for a prompt call-back.',
      locationLabel: 'Location note',
      location: { before: 'All after-hours emergency visits are provided exclusively at our ', office: 'Orlando office', after: '.' },
      lineLabel: 'After-hours call line',
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
    title: 'Welcome to Contemporary Dental Care',
    lead: 'We’re excited to welcome you to our practice! Whether you’re due for a routine check-up, starting a personalized care plan, or seeking urgent support, we make your first visit smooth, transparent, and comfortable.',
    stepsTitle: 'Step-by-step patient process',
    /** {n} is the step number. */
    stepLabel: 'Step {n}',
    booking: {
      title: 'Simple Booking & Language Preference',
      body: {
        withOcoee: 'Call our Orlando or Ocoee office to request your appointment. Be sure to let us know if you prefer care in English, Spanish, or Portuguese so we can coordinate our multilingual team for your visit.',
        orlandoOnly: 'Call our Orlando office to request your appointment. Be sure to let us know if you prefer care in English, Spanish, or Portuguese so we can coordinate our multilingual team for your visit.',
      },
    },
    emergencies: {
      title: 'Emergency & Same-Day Care',
      body: 'Dental pain shouldn\'t wait. Emergency visits are always open to new patients, with same-day evaluation and relief options available whenever clinically appropriate.',
    },
    // The Notice of Privacy Practices link (common.legal.noticeOfPrivacyPractices) sits between before and after.
    forms: {
      title: 'New Patient Forms & Privacy',
      before: 'To save time at check-in, we will ask you to complete our standard new-patient forms, including our HIPAA ',
      after: '.',
    },
    // Review: the card on file is taken at booking (practice decision, 16 Oct 2026; C17 §6).
    financial: {
      title: 'Financial Policy & Payment Options',
      before: 'To hold your reservation, a valid payment card is required on file when booking. During your initial visit, our front desk team will review our clear financial policy with you so there are never any unexpected costs. You can review full details anytime on our ',
      link: 'Financial Policy & Appointments page',
      after: '.',
    },
    nervous: {
      title: 'Tailored Support for Nervous Patients',
      body: 'If you experience dental anxiety, please mention it when you book! We specialize in comfort-first care and offer amenities like noise-canceling headphones and weighted blankets to ensure you feel calm and in control throughout your appointment.',
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
      // The practice chose this answer on 20 October 2026. C14 §6 says a qualified medical interpretation
      // route is the only lawful path until staff capability exists; keep this under compliance review.
      haitianCreole: {
        question: 'Do you speak Haitian Creole?',
        answer: 'Not at this time, though we are actively looking to add Haitian Creole-speaking staff to our team to better serve our community. In the meantime, you are always welcome to bring a family member or interpreter to assist during your visit.',
      },
      // Review: financial policy wording. The late-cancellation amounts ($50 weekday, $100 weekend) must match the
      // Financial Policy & Appointments page. The link label must appear word for word in the answer.
      cancellation: {
        question: 'What is your cancellation policy?',
        answer: 'Please give 48 hours’ notice. A late cancellation or missed appointment is $50 on a weekday and $100 on a weekend. See our Financial and Appointments policy.',
        linkLabel: 'See our Financial and Appointments policy',
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
      intro: 'Atención amable y prioritaria cuando más la necesita. Nuestro equipo está aquí para aliviar su malestar y orientarle sobre sus próximos pasos.',
      safetyLabel: 'Cuándo llamar al 911',
      // Review: emergency safety wording. Dr. Khan must approve it in every language before publishing.
      safetyTitle: 'Aviso médico urgente',
      safetyNotice: 'Si tiene dificultad para respirar o para tragar, una hinchazón que se extiende a la cara o al cuello, o un traumatismo grave en la cabeza o la cara, llame al 911 o acuda de inmediato a la sala de urgencias más cercana.',
      sameDay: {
        title: 'Atención de urgencia el mismo día',
        body: 'Ya sea que tenga un dolor de muelas intenso, la cara hinchada o un diente roto, no tiene que esperar. Reservamos tiempo en nuestra agenda para citas de urgencia el mismo día, tanto para pacientes nuevos como para pacientes actuales.',
        listIntro: 'Nuestra prioridad es aliviar su dolor rápidamente. La atención de urgencia el mismo día incluye una evaluación completa y alivio inmediato para:',
        items: [
          'Dolor de muelas, abscesos e hinchazón repentina',
          'Dientes rotos, astillados o fracturados',
          'Traumatismos dentales y extracciones urgentes',
          'Preparación de coronas provisionales y estabilización',
        ],
      },
      afterHours: {
        title: 'Atención fuera del horario',
        availability: 'Aunque no atendemos las 24 horas, con frecuencia hay citas de urgencia en fin de semana y fuera del horario, según la disponibilidad de la agenda.',
        callBack: 'Si llama fuera del horario de atención, nuestro servicio de atención telefónica tomará sus datos y avisará a nuestro equipo para que le devuelvan la llamada pronto.',
        locationLabel: 'Nota sobre el consultorio',
        location: { before: 'Todas las visitas de urgencia fuera del horario se atienden únicamente en nuestro ', office: 'consultorio de Orlando', after: '.' },
        lineLabel: 'Línea fuera del horario',
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
      title: 'Bienvenido a Contemporary Dental Care',
      lead: '¡Nos alegra darle la bienvenida a nuestro consultorio! Ya sea que le toque una revisión de rutina, que comience un plan de atención personalizado o que necesite ayuda urgente, hacemos que su primera visita sea sencilla, transparente y cómoda.',
      stepsTitle: 'Proceso paso a paso para pacientes',
      /** {n} is the step number. */
      stepLabel: 'Paso {n}',
      booking: {
        title: 'Reserva sencilla y preferencia de idioma',
        body: {
          withOcoee: 'Llame a nuestro consultorio de Orlando o de Ocoee para solicitar su cita. Asegúrese de decirnos si prefiere recibir atención en inglés, español o portugués para que podamos coordinar a nuestro equipo multilingüe para su visita.',
          orlandoOnly: 'Llame a nuestro consultorio de Orlando para solicitar su cita. Asegúrese de decirnos si prefiere recibir atención en inglés, español o portugués para que podamos coordinar a nuestro equipo multilingüe para su visita.',
        },
      },
      emergencies: {
        title: 'Urgencias y atención el mismo día',
        body: 'El dolor dental no debe esperar. Las visitas de urgencia siempre están abiertas a pacientes nuevos, con evaluación el mismo día y opciones de alivio disponibles cuando sea clínicamente adecuado.',
      },
      // The Notice of Privacy Practices link (common.legal.noticeOfPrivacyPractices) sits between before and after.
      forms: {
        title: 'Formularios para pacientes nuevos y privacidad',
        before: 'Para ahorrar tiempo al registrarse, le pediremos que complete nuestros formularios estándar para pacientes nuevos, incluido nuestro ',
        after: ' de HIPAA.',
      },
      // Review: the card on file is taken at booking (practice decision, 16 Oct 2026; C17 §6).
      financial: {
        title: 'Política financiera y opciones de pago',
        before: 'Para reservar su cita, se requiere una tarjeta de pago válida registrada al momento de reservar. Durante su primera visita, nuestro equipo de recepción revisará con usted nuestra política financiera, clara y sencilla, para que nunca haya costos inesperados. Puede consultar todos los detalles en cualquier momento en nuestra ',
        link: 'página de Política financiera y citas',
        after: '.',
      },
      nervous: {
        title: 'Apoyo personalizado para pacientes nerviosos',
        body: '¡Si siente ansiedad dental, menciónelo al reservar! Nos especializamos en una atención centrada en la comodidad y ofrecemos comodidades como audífonos con cancelación de ruido y mantas con peso para que se sienta tranquilo y con control durante toda su cita.',
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
        // The practice chose this answer on 20 October 2026. C14 §6 says a qualified medical interpretation
        // route is the only lawful path until staff capability exists; keep this under compliance review.
        haitianCreole: {
          question: '¿Hablan criollo haitiano?',
          answer: 'Por el momento no, aunque estamos buscando activamente incorporar a nuestro equipo personal que hable criollo haitiano para atender mejor a nuestra comunidad. Mientras tanto, siempre puede traer a un familiar o a un intérprete para que le ayude durante su visita.',
        },
        // Review: financial policy wording. The amounts must match the financial policy on the insurance page.
        cancellation: {
          question: '¿Cuál es su política de cancelación?',
          answer: 'Por favor, avísenos con 48 horas de anticipación. Una cancelación tardía o una cita a la que no se asista tiene un costo de $50 en un día de semana y de $100 en fin de semana. Consulte nuestra política financiera y de citas.',
          linkLabel: 'Consulte nuestra política financiera y de citas',
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
      intro: 'Atendimento gentil e prioritário quando você mais precisa. Nossa equipe está aqui para aliviar o seu desconforto e orientar os seus próximos passos.',
      safetyLabel: 'Quando ligar para o 911',
      // Review: emergency safety wording. Dr. Khan must approve it in every language before publishing.
      safetyTitle: 'Aviso médico urgente',
      safetyNotice: 'Se você estiver com dificuldade para respirar ou engolir, inchaço que esteja se espalhando para o rosto ou o pescoço, ou um trauma grave na cabeça ou no rosto, ligue para o 911 ou vá imediatamente ao pronto-socorro mais próximo.',
      sameDay: {
        title: 'Atendimento de emergência no mesmo dia',
        body: 'Seja uma dor de dente forte, o rosto inchado ou um dente quebrado, você não precisa esperar. Reservamos horários na nossa agenda para consultas de emergência no mesmo dia, tanto para novos pacientes quanto para pacientes atuais.',
        listIntro: 'Nossa prioridade é tirar a sua dor rapidamente. O atendimento de emergência no mesmo dia inclui uma avaliação completa e alívio imediato para:',
        items: [
          'Dor de dente, abscessos e inchaço repentino',
          'Dentes quebrados, lascados ou fraturados',
          'Trauma dentário e extrações urgentes',
          'Preparo de coroas provisórias e estabilização',
        ],
      },
      afterHours: {
        title: 'Atendimento fora do horário',
        availability: 'Embora não funcionemos 24 horas, consultas de emergência nos fins de semana e fora do horário costumam estar disponíveis, conforme a disponibilidade da agenda.',
        callBack: 'Se você ligar fora do horário comercial, nosso serviço de atendimento telefônico anotará os seus dados e avisará a nossa equipe para um retorno rápido.',
        locationLabel: 'Observação sobre o local',
        location: { before: 'Todas as consultas de emergência fora do horário são realizadas exclusivamente no nosso ', office: 'consultório de Orlando', after: '.' },
        lineLabel: 'Linha fora do horário',
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
      title: 'Bem-vindo à Contemporary Dental Care',
      lead: 'Estamos muito felizes em receber você em nosso consultório! Seja para uma revisão de rotina, para começar um plano de cuidados personalizado ou para buscar atendimento urgente, tornamos sua primeira consulta tranquila, transparente e confortável.',
      stepsTitle: 'Processo passo a passo para pacientes',
      /** {n} is the step number. */
      stepLabel: 'Passo {n}',
      booking: {
        title: 'Agendamento simples e preferência de idioma',
        body: {
          withOcoee: 'Ligue para o nosso consultório de Orlando ou de Ocoee para solicitar sua consulta. Não deixe de nos dizer se prefere ser atendido em inglês, espanhol ou português para que possamos organizar nossa equipe multilíngue para a sua visita.',
          orlandoOnly: 'Ligue para o nosso consultório de Orlando para solicitar sua consulta. Não deixe de nos dizer se prefere ser atendido em inglês, espanhol ou português para que possamos organizar nossa equipe multilíngue para a sua visita.',
        },
      },
      emergencies: {
        title: 'Emergências e atendimento no mesmo dia',
        body: 'A dor de dente não deve esperar. As consultas de emergência estão sempre abertas a novos pacientes, com avaliação no mesmo dia e opções de alívio disponíveis sempre que clinicamente indicado.',
      },
      // The Notice of Privacy Practices link (common.legal.noticeOfPrivacyPractices) sits between before and after.
      forms: {
        title: 'Formulários para novos pacientes e privacidade',
        before: 'Para economizar tempo no check-in, pediremos que você preencha nossos formulários padrão para novos pacientes, incluindo nosso ',
        after: ' da HIPAA.',
      },
      // Review: the card on file is taken at booking (practice decision, 16 Oct 2026; C17 §6).
      financial: {
        title: 'Política financeira e opções de pagamento',
        before: 'Para garantir sua reserva, é necessário um cartão de pagamento válido cadastrado no momento do agendamento. Na sua primeira consulta, nossa equipe da recepção revisará com você nossa política financeira clara, para que nunca haja custos inesperados. Você pode consultar todos os detalhes a qualquer momento na nossa ',
        link: 'página Política financeira e consultas',
        after: '.',
      },
      nervous: {
        title: 'Apoio personalizado para pacientes nervosos',
        body: 'Se você tem ansiedade odontológica, mencione isso ao agendar! Somos especializados em um atendimento que prioriza o conforto e oferecemos recursos como fones com cancelamento de ruído e cobertores com peso para que você se sinta calmo e no controle durante toda a consulta.',
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
        // The practice chose this answer on 20 October 2026. C14 §6 says a qualified medical interpretation
        // route is the only lawful path until staff capability exists; keep this under compliance review.
        haitianCreole: {
          question: 'Vocês falam crioulo haitiano?',
          answer: 'No momento, não, mas estamos buscando ativamente incluir na equipe profissionais que falem crioulo haitiano para atender melhor à nossa comunidade. Enquanto isso, você sempre pode trazer um familiar ou intérprete para ajudar durante a sua consulta.',
        },
        // Review: financial policy wording. The amounts must match the financial policy on the insurance page.
        cancellation: {
          question: 'Qual é a política de cancelamento de vocês?',
          answer: 'Pedimos aviso com 48 horas de antecedência. Um cancelamento tardio ou a falta a uma consulta custa $50 em dia de semana e $100 no fim de semana. Veja a nossa política financeira e de consultas.',
          linkLabel: 'Veja a nossa política financeira e de consultas',
        },
        nervous: {
          question: 'Sinto nervosismo ao ir ao dentista. O que posso fazer?',
          answer: 'Por favor, mencione sua ansiedade ao agendar sua consulta, e adaptaremos sua visita ao seu nível de conforto. Nossa equipe simpática dedica tempo para explicar tudo passo a passo em linguagem simples, sem surpresas e sem pressão. Você também pode aproveitar nossos recursos relaxantes, como fones com cancelamento de ruído e cobertores com peso, para se sentir à vontade durante todo o atendimento.',
        },
      },
    },
  },
};
