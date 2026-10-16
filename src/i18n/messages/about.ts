import type { Locale } from '../locales';

// About, team and doctor pages, plus the team content (roles, bios, languages and office labels)
// that content/team.ts reads. Names are not translated. Where a sentence depends on whether
// Ocoee is open it has withOcoee and orlandoOnly variants. {offices} is filled in the page.
const en = {
  overview: {
    meta: {
      title: 'About Us',
      description: 'Contemporary Dental Care is a general dental practice founded in 2023 by Dr. Sheryar Khan. Honest treatment planning, easy access and care in your language.',
    },
    title: 'About Us',
    intro: {
      withOcoee: 'Contemporary Dental Care is a general dental practice founded in 2023 by Dr. Sheryar Khan. Our practice rests on three commitments.',
      orlandoOnly: 'Contemporary Dental Care is a general dental practice founded in 2023 by Dr. Sheryar Khan. Our practice rests on three commitments.',
    },
    honest: {
      title: 'Honest treatment planning',
      body: 'We explain your options in plain language. We recommend treatment in stages that suit your health, and we put your health ahead of the size of a treatment plan.',
    },
    reach: {
      title: 'Easy to reach',
      withForm: {
        withOcoee: 'Phone lines at both offices, an after-hours line, and an enquiry form for questions before your visit.',
        orlandoOnly: 'A phone line at our office, an after-hours line, and an enquiry form for questions before your visit.',
      },
      withoutForm: {
        withOcoee: 'Phone lines at both offices and an after-hours line.',
        orlandoOnly: 'A phone line at our office and an after-hours line.',
      },
    },
    language: {
      title: 'Care in your language',
      body: "Care in English, Spanish and Portuguese. Please ask about language support when you call.",
    },
    doctorLink: {
      before: 'Read more about',
      link: 'Dr. Sheryar Khan',
      after: '.',
    },
  },
  team: {
    meta: {
      title: 'Our Team',
      description: 'Meet the Contemporary Dental Care team: Dr. Sheryar Khan, our hygienist, office managers and dental assistants.',
    },
    title: 'Meet the team',
    lead: {
      withOcoee: 'Our team works across our offices. Languages listed are those each team member speaks. Availability depends on who is in on a given day.',
      orlandoOnly: 'Languages listed are those each team member speaks. Availability depends on who is in on a given day.',
    },
    groupPhotoAlt: 'The Contemporary Dental Care team in front of our office sign',
    offices: {
      both: 'Both offices',
      orlando: 'Orlando',
    },
    members: {
      sheryarKhan: {
        role: 'General Dentist and Owner',
        bio: 'Dr. Sheryar is originally from Utah and founded Contemporary Dental Care in Orlando. He earned his DDS from Howard University College of Dentistry. He then completed a General Practice Residency at UCLA Medical Center, where he treated medically complex patients and handled dental emergencies. He has practiced since 2020. He comes from a multigenerational family of entrepreneurs, which shaped his interest in leadership and community. He focuses on modern technology, thorough treatment planning, and making patients feel heard and confident in their choices. His long-term goal is to bring dental, medical and wellness services together under one connected approach to patient care.',
      },
      jessicaSalazar: { role: 'Dental Hygienist', languages: 'Speaks Spanish.' },
      brittiniBlankenship: {
        role: 'Regional Dental Manager',
        bio: 'Brittini started in dentistry right after high school and graduated from dental assisting school on the Dean\'s List with high honors as an Expanded Functions Dental Assistant. She moved from chairside work to Assistant Manager, then Office Manager, and later into regional management. In that role she worked with Dr. Khan to open and develop practices across Orlando. Today she oversees team development, patient experience, scheduling, billing and collections, marketing, community outreach, and operational systems. Because she started chairside, she understands the roles of the teams she manages. She believes good practices are built on strong teams, real patient relationships, accountability, and a place where patients and staff feel valued. Outside work she is a mom of three and spends much of her time at her kids\' sporting events.',
      },
      franchescaAvila: {
        role: 'Office Manager and Insurance Coordinator',
        bio: 'Franchesca was born in Sanford, Florida, and raised in a Hispanic household. She has nearly five years in dentistry and helps patients with treatment plans, insurance benefits and financial options. She is fluent in English and Spanish and focuses on making every patient feel heard. Outside work she spends time with family and collects artisan turtles from the places she visits.',
      },
      amandaNguyen: {
        role: 'Office Manager',
        bio: 'Amanda was born and raised in Tampa, Florida, and has a bachelor\'s degree from the University of Florida. Her interest in dentistry began through dental organizations serving underserved communities. Outside work she enjoys traveling and spending time with friends and family.',
      },
      nestorUgalde: {
        role: 'Dental Assistant',
        languages: 'Speaks Spanish.',
        bio: 'Néstor was born in Costa Rica and grew up in the country\'s northern region, inspired by the tropical rainforest. He started in dentistry in 1999, so he has 27 years of experience. He moved to the US nearly five years ago and now works as a Dental Assistant. He is a native Spanish speaker and especially enjoys caring for Spanish-speaking and Latino patients. He puts weight on making patients feel comfortable, respected and cared for.',
      },
      brunoConteAndre: {
        role: 'Dental Assistant',
        languages: 'Speaks Portuguese.',
        bio: 'Bruno is a dental professional from Brazil. He graduated in 2004 and has worked in oral surgery and oral rehabilitation. He moved to the US with his family in 2022. At Contemporary Dental Care he supports the dentists and clinical team, assists with procedures, and helps with patient coordination. His goal is to earn his US dental license and become a licensed dentist here. He plays piano in his church\'s music ministry and enjoys traveling with his family and barbecues with family and friends.',
      },
      tyreseBrown: {
        role: 'Dental Assistant',
        bio: 'Tyrese has been a Dental Assistant for two years and is continuing his education with the goal of becoming a dentist. Outside the office he plays basketball and golf, goes to the beach, and does community service. His favorite part of the job is making a positive difference in someone\'s day. He believes everyone deserves to feel comfortable, confident and proud of their smile.',
      },
    },
  },
  doctor: {
    meta: {
      title: 'Dr. Sheryar Khan, DDS',
      description: 'Dr. Sheryar Khan is a general dentist and the founder and owner of Contemporary Dental Care. DDS, Howard University College of Dentistry.',
    },
    title: 'Dr. Sheryar Khan, DDS',
    lead: 'General dentist · Founder and owner',
    offices: {
      withOcoee: 'our Orlando and Ocoee offices',
      orlandoOnly: 'our Orlando office',
    },
    education: 'Dr. Khan is a general dentist. He earned his DDS at Howard University College of Dentistry and completed a General Practice Residency at UCLA. He has practised since 2020, founded Contemporary Dental Care in 2023, and sees patients at {offices}. He is licensed to practise dentistry in Florida.',
    clinical: "Dr. Khan's clinical work includes implants, extractions, veneers, crowns and smile design. Implants are a particular focus of his care.",
    approach: 'Dr. Khan believes in conservative treatment. He recommends what you need, avoids over-treatment, and sequences care for long-term results.',
    tagline: 'Your smile. Your health. Our priority.',
    photoAlt: 'Dr. Sheryar Khan, DDS, general dentist and founder of Contemporary Dental Care',
  },
};

export type AboutMessages = typeof en;

export const about: Record<Locale, AboutMessages> = {
  en,
  es: {
    overview: {
      meta: {
        title: 'Sobre nosotros',
        description: 'Contemporary Dental Care es una clínica dental general fundada en 2023 por el Dr. Sheryar Khan. Planificación honesta del tratamiento, fácil acceso y atención en su idioma.',
      },
      title: 'Sobre nosotros',
      intro: {
        withOcoee: 'Contemporary Dental Care es una clínica dental general fundada en 2023 por el Dr. Sheryar Khan. Nuestra clínica se basa en tres compromisos.',
        orlandoOnly: 'Contemporary Dental Care es una clínica dental general fundada en 2023 por el Dr. Sheryar Khan. Nuestra clínica se basa en tres compromisos.',
      },
      honest: {
        title: 'Planificación honesta del tratamiento',
        body: 'Le explicamos sus opciones en un lenguaje claro. Recomendamos el tratamiento por etapas, según su salud, y anteponemos su salud al tamaño de un plan de tratamiento.',
      },
      reach: {
        title: 'Fácil de contactar',
        withForm: {
          withOcoee: 'Líneas telefónicas en ambos consultorios, una línea fuera del horario de atención y un formulario de consulta para preguntas antes de su visita.',
          orlandoOnly: 'Una línea telefónica en nuestro consultorio, una línea fuera del horario de atención y un formulario de consulta para preguntas antes de su visita.',
        },
        withoutForm: {
          withOcoee: 'Líneas telefónicas en ambos consultorios y una línea fuera del horario de atención.',
          orlandoOnly: 'Una línea telefónica en nuestro consultorio y una línea fuera del horario de atención.',
        },
      },
      language: {
        title: 'Atención en su idioma',
        body: 'Atención en inglés, español y portugués. Pregunte por el apoyo en su idioma al llamar.',
      },
      doctorLink: {
        before: 'Más información sobre',
        link: 'el Dr. Sheryar Khan',
        after: '.',
      },
    },
    team: {
      meta: {
        title: 'Nuestro equipo',
        description: 'Conozca al equipo de Contemporary Dental Care: el Dr. Sheryar Khan, nuestra higienista dental, los gerentes del consultorio y los asistentes dentales.',
      },
      title: 'Conozca al equipo',
      lead: {
        withOcoee: 'Nuestro equipo trabaja en todos nuestros consultorios. Los idiomas indicados son los que habla cada miembro del equipo. La disponibilidad depende de quién esté presente en un día determinado.',
        orlandoOnly: 'Los idiomas indicados son los que habla cada miembro del equipo. La disponibilidad depende de quién esté presente en un día determinado.',
      },
      groupPhotoAlt: 'El equipo de Contemporary Dental Care frente al letrero de nuestro consultorio',
      offices: {
        both: 'Ambos consultorios',
        orlando: 'Orlando',
      },
      // Review: job titles. Feminine forms (coordinadora) follow each person's first name; confirm
      // with the team. "Expanded Functions Dental Assistant" is a Florida credential title.
      members: {
        sheryarKhan: {
          role: 'Odontólogo general y propietario',
          bio: '',
        },
        jessicaSalazar: { role: 'Higienista dental', languages: 'Habla español.' },
        brittiniBlankenship: {
          role: 'Gerente dental regional',
          bio: '',
        },
        franchescaAvila: {
          role: 'Gerente del consultorio y coordinadora de seguros',
          bio: '',
        },
        amandaNguyen: {
          role: 'Gerente del consultorio',
          bio: '',
        },
        nestorUgalde: {
          role: 'Asistente dental',
          languages: 'Habla español.',
          bio: '',
        },
        // Review: Bruno is never called "Dr.", "dentist" or "treating provider" in any language.
        brunoConteAndre: {
          role: 'Asistente dental',
          bio: '',
          languages: 'Habla portugués.',
        },
        tyreseBrown: {
          role: 'Asistente dental',
          bio: '',
        },
      },
    },
    doctor: {
      meta: {
        title: 'Dr. Sheryar Khan, DDS',
        description: 'El Dr. Sheryar Khan es odontólogo general y el fundador y propietario de Contemporary Dental Care. DDS, Howard University College of Dentistry.',
      },
      title: 'Dr. Sheryar Khan, DDS',
      lead: 'Odontólogo general · Fundador y propietario',
      offices: {
        withOcoee: 'nuestros consultorios de Orlando y Ocoee',
        orlandoOnly: 'nuestro consultorio de Orlando',
      },
      // Review: credential and licence statement. "General Practice Residency" is translated as a
      // description of the program, not a program name; verify both before launch.
      education: 'El Dr. Khan es odontólogo general. Obtuvo su título de DDS en la Howard University College of Dentistry y completó una residencia de práctica general en UCLA. Ejerce desde 2020, fundó Contemporary Dental Care en 2023 y atiende a pacientes en {offices}. Tiene licencia para ejercer la odontología en Florida.',
      clinical: 'El trabajo clínico del Dr. Khan incluye implantes, extracciones, carillas, coronas y diseño de sonrisa. Los implantes son un enfoque particular de su atención.',
      approach: 'El Dr. Khan cree en el tratamiento conservador. Recomienda lo que usted necesita, evita el sobretratamiento y organiza la atención por etapas para lograr resultados a largo plazo.',
      tagline: 'Su sonrisa. Su salud. Nuestra prioridad.',
      photoAlt: 'El Dr. Sheryar Khan, DDS, odontólogo general y fundador de Contemporary Dental Care',
    },
  },
  pt: {
    overview: {
      meta: {
        title: 'Sobre nós',
        description: 'A Contemporary Dental Care é uma clínica odontológica geral fundada em 2023 pelo Dr. Sheryar Khan. Planejamento de tratamento honesto, fácil acesso e atendimento no seu idioma.',
      },
      title: 'Sobre nós',
      intro: {
        withOcoee: 'A Contemporary Dental Care é uma clínica odontológica geral fundada em 2023 pelo Dr. Sheryar Khan. Nossa clínica se apoia em três compromissos.',
        orlandoOnly: 'A Contemporary Dental Care é uma clínica odontológica geral fundada em 2023 pelo Dr. Sheryar Khan. Nossa clínica se apoia em três compromissos.',
      },
      honest: {
        title: 'Planejamento de tratamento honesto',
        body: 'Explicamos as suas opções em linguagem simples. Recomendamos o tratamento em etapas adequadas à sua saúde e colocamos a sua saúde à frente do tamanho de um plano de tratamento.',
      },
      reach: {
        title: 'Fácil de contatar',
        withForm: {
          withOcoee: 'Linhas telefônicas nos dois consultórios, uma linha fora do horário e um formulário de contato para dúvidas antes da sua visita.',
          orlandoOnly: 'Uma linha telefônica em nosso consultório, uma linha fora do horário e um formulário de contato para dúvidas antes da sua visita.',
        },
        withoutForm: {
          withOcoee: 'Linhas telefônicas nos dois consultórios e uma linha fora do horário.',
          orlandoOnly: 'Uma linha telefônica em nosso consultório e uma linha fora do horário.',
        },
      },
      language: {
        title: 'Atendimento no seu idioma',
        body: 'Atendimento em inglês, espanhol e português. Pergunte sobre o apoio no seu idioma ao ligar.',
      },
      doctorLink: {
        before: 'Saiba mais sobre',
        link: 'o Dr. Sheryar Khan',
        after: '.',
      },
    },
    team: {
      meta: {
        title: 'Nossa equipe',
        description: 'Conheça a equipe da Contemporary Dental Care: o Dr. Sheryar Khan, nossa higienista odontológica, as gerentes dos consultórios e os assistentes odontológicos.',
      },
      title: 'Conheça a equipe',
      lead: {
        withOcoee: 'Nossa equipe atua em todos os nossos consultórios. Os idiomas indicados são os que cada membro da equipe fala. A disponibilidade depende de quem está presente em cada dia.',
        orlandoOnly: 'Os idiomas indicados são os que cada membro da equipe fala. A disponibilidade depende de quem está presente em cada dia.',
      },
      groupPhotoAlt: 'A equipe da Contemporary Dental Care em frente à placa do nosso consultório',
      offices: {
        both: 'Ambos os consultórios',
        orlando: 'Orlando',
      },
      // Review: job titles. Feminine forms (higienista odontológica, coordenadora) follow each
      // person's first name; confirm with the team. "Expanded Functions Dental Assistant" is a
      // Florida credential title.
      members: {
        sheryarKhan: {
          role: 'Clínico geral e proprietário',
          bio: '',
        },
        jessicaSalazar: { role: 'Higienista odontológica', languages: 'Fala espanhol.' },
        brittiniBlankenship: {
          role: 'Gerente regional odontológica',
          bio: '',
        },
        franchescaAvila: {
          role: 'Gerente do consultório e coordenadora de convênios',
          bio: '',
        },
        amandaNguyen: {
          role: 'Gerente do consultório',
          bio: '',
        },
        nestorUgalde: {
          role: 'Assistente odontológico',
          languages: 'Fala espanhol.',
          bio: '',
        },
        // Review: Bruno is never called "Dr.", "dentist" or "treating provider" in any language.
        brunoConteAndre: {
          role: 'Assistente odontológico',
          bio: '',
          languages: 'Fala português.',
        },
        tyreseBrown: {
          role: 'Assistente odontológico',
          bio: '',
        },
      },
    },
    doctor: {
      meta: {
        title: 'Dr. Sheryar Khan, DDS',
        description: 'O Dr. Sheryar Khan é clínico geral e fundador e proprietário da Contemporary Dental Care. DDS, Howard University College of Dentistry.',
      },
      title: 'Dr. Sheryar Khan, DDS',
      lead: 'Clínico geral · Fundador e proprietário',
      offices: {
        withOcoee: 'nossos consultórios de Orlando e Ocoee',
        orlandoOnly: 'nosso consultório de Orlando',
      },
      // Review: credential and licence statement. "General Practice Residency" is translated as a
      // description of the program, not a program name; verify both before launch.
      education: 'O Dr. Khan é clínico geral. Obteve o título de DDS na Howard University College of Dentistry e concluiu uma residência em prática geral na UCLA. Atua desde 2020, fundou a Contemporary Dental Care em 2023 e atende pacientes em {offices}. Ele é licenciado para exercer a odontologia na Flórida.',
      clinical: 'O trabalho clínico do Dr. Khan inclui implantes, extrações, lentes de contato dental, coroas e design de sorriso. Os implantes são um foco particular do seu atendimento.',
      approach: 'O Dr. Khan acredita no tratamento conservador. Ele recomenda o que você precisa, evita o excesso de tratamento e organiza o cuidado em etapas para obter resultados duradouros.',
      tagline: 'Seu sorriso. Sua saúde. Nossa prioridade.',
      photoAlt: 'O Dr. Sheryar Khan, DDS, clínico geral e fundador da Contemporary Dental Care',
    },
  },
};
