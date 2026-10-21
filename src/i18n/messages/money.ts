import type { Locale } from '../locales';

// Insurance, payment and financing, and pricing pages, plus the plan lists and the financial
// policy summary that content/insurance.ts reads. Plan names and lender names are not
// translated and live in content/insurance.ts. Placeholders such as {partners} are filled in
// the page.
const en = {
  insurance: {
    meta: {
      title: 'Insurance & Financing',
      description: 'The dental plans we participate with. We do not accept Medicaid. Insurance is always an estimate, not a guarantee of payment.',
    },
    title: 'Insurance & Financing',
    lead: {
      withOcoee: 'We participate directly with the dental plans listed below. Our participation is the same at both offices. **Insurance is always an estimate.** Before treatment, we verify your benefits and give you an estimate. An estimate is not a guarantee of payment. We do not accept Medicaid.',
      orlandoOnly: 'We participate directly with the dental plans listed below. Our participation is the same at our office. **Insurance is always an estimate.** Before treatment, we verify your benefits and give you an estimate. An estimate is not a guarantee of payment. We do not accept Medicaid.',
    },
    sections: {
      ppo: 'PPO plans',
      discount: 'Discount plans',
      medicare: 'Medicare plans',
    },
    notListed: {
      heading: "Don't see your plan?",
      body: "Call us, and we'll check.",
    },
  },
  insuranceLists: {
    andMore: 'and more',
  },
  payment: {
    financing: {
      title: 'Financing',
      partners: 'We work with {partners}. Financing is arranged with the lender, subject to their approval and terms. Approval is not guaranteed.',
      /** The word before the last partner in the list of financing partners. */
      listAnd: 'and',
      // The practice's wording of 21 October 2026; the link goes to the Contemporary Smile Club page.
      inHouse: {
        before: 'We also offer in-house payment plans. Check out ',
        link: 'Contemporary Smile Club page',
        after: '.',
      },
    },
    // The financial policy has its own page; the insurance page links to it.
    policy: {
      meta: {
        title: 'Financial Policy & Appointments',
        description: 'Our terms for appointments and payments: cancellations, late cancellations and missed appointments, weekend bookings, deposits, balances and insurance estimates.',
      },
      title: 'Our Financial & Appointment Policy',
      lead: 'Transparent terms designed to respect your time and keep your care seamless.',
      pointer: {
        before: 'Our terms for appointments and payments are on the ',
        link: 'Financial Policy & Appointments',
        after: ' page.',
      },
    },
  },
  // The financial policy, in the practice's wording of 20 October 2026. Check it against the signed
  // Financial Policy & Appointment Agreement before launch.
  financialPolicy: {
    deposit: { term: 'Treatment Deposits', text: 'A $150 deposit is required to reserve dedicated time for your treatment appointment. This deposit is applied directly toward the total cost of your care on the day of your visit.' },
    balances: { term: 'Account Balances & Card on File', text: 'For your convenience, we maintain a secure payment card on file. We always send a courtesy text notification prior to processing any remaining balance.' },
    cancellations: { term: 'Cancellations & Rescheduling', text: 'We reserve dedicated time just for you. If you need to cancel or reschedule, please provide at least **48 hours’ notice** so we can offer that time to another patient.' },
    lateCancellation: { term: 'Missed Appointments & Late Cancellations', text: 'Cancellations with less than 48 hours’ notice or missed appointments incur a fee of **$50 for weekday appointments** and **$100 for weekend appointments**. To ensure weekend availability for all patients, missing a weekend visit without timely notice forfeits future weekend scheduling.' },
    insurance: { term: 'Insurance Coverage & Estimates', text: 'We work closely with you to verify your benefits and file claims on your behalf. Please note that all insurance coverage figures are estimates provided by your carrier and do not guarantee final payment.' },
    questions: { term: 'Questions or Billing Support', text: 'Have a question or spot an issue with a charge? We’re here to help! Call our office directly to speak with a dedicated team member who will review and resolve it with you.' },
  },
  pricing: {
    meta: {
      title: 'Pricing and Offers',
      description: 'Fees depend on your treatment, so we do not publish a fee list. Before treatment starts, we give you an estimate.',
    },
    title: 'Pricing and offers',
    lead: "Fees depend on your treatment, so we don't publish a fee list. Before treatment starts, we'll give you an estimate. If you have insurance, we verify your benefits and estimate your share.",
  },
  membership: {
    meta: {
      title: 'Contemporary Smile Club',
      description: 'Smile Membership Program plans for adults, perio care and children, with a monthly fee and a lifetime activation fee.',
    },
    title: 'Contemporary Smile Club',
    lead: "No insurance? Our patients don't need it. Save on the care you need with our simple, affordable membership plans.",
    plansTitle: 'Membership plans',
    perMonth: '/mo.',
    plans: {
      adult: {
        name: 'Adult membership',
        ages: '13 years & older',
        price: '$56.77',
        activationFee: '$679.99 Lifetime Activation Fee',
        features: [
          'Professional dental cleanings (2 per year)',
          'Doctor exams (1–2 per year)',
          'One emergency exam per year (if needed)',
          '15% off all other treatments (some exclusions may apply)',
          '$69.99 Lifetime Activation Fee includes first month',
        ],
      },
      perio: {
        name: 'Perio membership',
        ages: 'Periodontal disease',
        price: '$82.88',
        activationFee: '$99.99 Lifetime Activation Fee',
        features: [
          'Perio maintenance cleanings (3 per year)',
          'Doctor exams (1–2 per year)',
          'One emergency exam per year (if needed)',
          '15% off all other treatments (some exclusions may apply)',
          '$99.99 Lifetime Activation Fee includes first month',
        ],
      },
      child: {
        name: 'Child membership',
        ages: '12 years & under',
        price: '$48.07',
        activationFee: '$89.99 Lifetime Activation Fee',
        features: [
          'Professional dental cleanings (2 per year)',
          'Doctor exams (1–2 per year)',
          'One emergency exam per year (if needed)',
          'Fluoride treatment',
          '15% off all other treatments (some exclusions may apply)',
          '$89.99 Lifetime Activation Fee includes first month',
        ],
      },
    },
    benefitsTitle: 'Membership benefits',
    benefits: ['Big savings on the care you need', 'No maximums, no deductibles, no claims', 'Affordable care for the whole family'],
  },
};

export type MoneyMessages = typeof en;

export const money: Record<Locale, MoneyMessages> = {
  en,
  es: {
    insurance: {
      meta: {
        title: 'Seguros y financiamiento',
        // Review: insurance participation claim and Medicaid exclusion; confirm against the participation list.
        description: 'Los planes dentales con los que participamos. No aceptamos Medicaid. El seguro siempre es una estimación, no una garantía de pago.',
      },
      title: 'Seguros y financiamiento',
      // Review: insurance participation claim and Medicaid exclusion; confirm against the participation list.
      lead: {
        withOcoee: 'Participamos directamente con los planes dentales que se indican a continuación. Nuestra participación es la misma en ambos consultorios. **El seguro siempre es una estimación.** Antes del tratamiento, verificamos sus beneficios y le damos una estimación. Una estimación no es una garantía de pago. No aceptamos Medicaid.',
        orlandoOnly: 'Participamos directamente con los planes dentales que se indican a continuación. Nuestra participación es la misma en nuestro consultorio. **El seguro siempre es una estimación.** Antes del tratamiento, verificamos sus beneficios y le damos una estimación. Una estimación no es una garantía de pago. No aceptamos Medicaid.',
      },
      sections: {
        ppo: 'Planes PPO',
        discount: 'Planes de descuento',
        medicare: 'Planes Medicare',
      },
      notListed: {
        heading: '¿No ve su plan?',
        body: 'Llámenos y lo verificaremos.',
      },
    },
    insuranceLists: {
      andMore: 'y más',
    },
    payment: {
      financing: {
        title: 'Financiamiento',
        // Review: lender approval disclaimer (financial wording).
        partners: 'Trabajamos con {partners}. El financiamiento se gestiona con el prestamista, sujeto a su aprobación y a sus condiciones. La aprobación no está garantizada.',
        listAnd: 'y',
        inHouse: {
          before: 'También ofrecemos planes de pago propios. Visite la ',
          link: 'página del Club Contemporary Smile',
          after: '.',
        },
      },
      policy: {
        meta: {
          title: 'Política financiera y citas',
          description: 'Nuestras condiciones para citas y pagos: cancelaciones, cancelaciones tardías y citas perdidas, reservas de fin de semana, depósitos, saldos y estimaciones del seguro.',
        },
        title: 'Nuestra política financiera y de citas',
        lead: 'Condiciones transparentes pensadas para respetar su tiempo y mantener su atención sin contratiempos.',
        pointer: {
          before: 'Nuestras condiciones para citas y pagos están en la página ',
          link: 'Política financiera y citas',
          after: '.',
        },
      },
    },
    // Review: held financial wording. Check this translation against the approved Financial
    // Policy & Appointment Agreement before launch; the approved wording replaces it.
    financialPolicy: {
      deposit: { term: 'Depósitos para tratamientos', text: 'Se requiere un depósito de $150 para reservar el tiempo dedicado a su cita de tratamiento. Este depósito se aplica directamente al costo total de su atención el día de su visita.' },
      balances: { term: 'Saldos de cuenta y tarjeta registrada', text: 'Para su comodidad, mantenemos registrada de forma segura una tarjeta de pago. Siempre le enviamos un mensaje de texto de cortesía antes de procesar cualquier saldo pendiente.' },
      cancellations: { term: 'Cancelaciones y cambios de cita', text: 'Reservamos un tiempo dedicado solo para usted. Si necesita cancelar o cambiar su cita, avísenos con al menos **48 horas de anticipación** para que podamos ofrecer ese tiempo a otro paciente.' },
      lateCancellation: { term: 'Citas perdidas y cancelaciones tardías', text: 'Las cancelaciones con menos de 48 horas de anticipación o las citas perdidas tienen un cargo de **$50 para citas entre semana** y de **$100 para citas de fin de semana**. Para garantizar la disponibilidad de fin de semana para todos los pacientes, faltar a una visita de fin de semana sin avisar a tiempo implica perder la posibilidad de programar citas de fin de semana en el futuro.' },
      insurance: { term: 'Cobertura del seguro y estimaciones', text: 'Trabajamos de cerca con usted para verificar sus beneficios y presentar los reclamos en su nombre. Tenga en cuenta que todas las cifras de cobertura del seguro son estimaciones proporcionadas por su aseguradora y no garantizan el pago final.' },
      questions: { term: 'Preguntas o ayuda con la facturación', text: '¿Tiene una pregunta o encontró un problema con un cargo? ¡Estamos aquí para ayudarle! Llame directamente a nuestro consultorio para hablar con un miembro de nuestro equipo, que lo revisará y lo resolverá con usted.' },
    },
    pricing: {
      meta: {
        title: 'Precios y ofertas',
        description: 'Las tarifas dependen de su tratamiento, por lo que no publicamos una lista de tarifas. Antes de que comience el tratamiento, le damos una estimación.',
      },
      title: 'Precios y ofertas',
      // Review: fee and estimate wording (financial); confirm it matches the practice's real process.
      lead: 'Las tarifas dependen de su tratamiento, por lo que no publicamos una lista de tarifas. Antes de que comience el tratamiento, le daremos una estimación. Si tiene seguro, verificamos sus beneficios y estimamos la parte que le corresponde.',
    },
    membership: {
      meta: {
        title: 'Club Contemporary Smile',
        description: 'Planes del Programa de Membresía Smile para adultos, cuidado periodontal y niños: una tarifa mensual y una tarifa de activación de por vida.',
      },
      title: 'Club Contemporary Smile',
      // Review: membership wording and prices are translated; confirm with the practice and counsel.
      lead: '¿Sin seguro? Nuestros pacientes no lo necesitan. Ahorre en la atención que necesita con nuestros planes de membresía sencillos y accesibles.',
      plansTitle: 'Planes de membresía',
      perMonth: '/mes',
      plans: {
        adult: {
          name: 'Membresía para adultos',
          ages: '13 años en adelante',
          price: '$56.77',
          activationFee: '$679.99 Tarifa de activación de por vida',
          features: [
            'Limpiezas dentales profesionales (2 al año)',
            'Consultas con el doctor (1–2 al año)',
            'Una consulta de urgencia al año (si es necesaria)',
            '15% de descuento en todos los demás tratamientos (pueden aplicar algunas exclusiones)',
            '$69.99 de tarifa de activación de por vida incluye el primer mes',
          ],
        },
        perio: {
          name: 'Membresía perio',
          ages: 'Enfermedad periodontal',
          price: '$82.88',
          activationFee: '$99.99 Tarifa de activación de por vida',
          features: [
            'Limpiezas de mantenimiento periodontal (3 al año)',
            'Consultas con el doctor (1–2 al año)',
            'Una consulta de urgencia al año (si es necesaria)',
            '15% de descuento en todos los demás tratamientos (pueden aplicar algunas exclusiones)',
            '$99.99 de tarifa de activación de por vida incluye el primer mes',
          ],
        },
        child: {
          name: 'Membresía infantil',
          ages: '12 años o menos',
          price: '$48.07',
          activationFee: '$89.99 Tarifa de activación de por vida',
          features: [
            'Limpiezas dentales profesionales (2 al año)',
            'Consultas con el doctor (1–2 al año)',
            'Una consulta de urgencia al año (si es necesaria)',
            'Tratamiento con flúor',
            '15% de descuento en todos los demás tratamientos (pueden aplicar algunas exclusiones)',
            '$89.99 de tarifa de activación de por vida incluye el primer mes',
          ],
        },
      },
      benefitsTitle: 'Beneficios de la membresía',
      benefits: ['Grandes ahorros en la atención que necesita', 'Sin máximos, sin deducibles, sin reclamaciones', 'Atención asequible para toda la familia'],
    },
  },
  pt: {
    insurance: {
      meta: {
        title: 'Convênios e financiamento',
        // Review: insurance participation claim and Medicaid exclusion; confirm against the participation list.
        description: 'Os planos odontológicos dos quais participamos. Não aceitamos Medicaid. O convênio é sempre uma estimativa, não uma garantia de pagamento.',
      },
      title: 'Convênios e financiamento',
      // Review: insurance participation claim and Medicaid exclusion; confirm against the participation list.
      lead: {
        withOcoee: 'Participamos diretamente dos planos odontológicos listados abaixo. Nossa participação é a mesma nos dois consultórios. **O convênio é sempre uma estimativa.** Antes do tratamento, verificamos seus benefícios e fornecemos uma estimativa. Uma estimativa não é garantia de pagamento. Não aceitamos Medicaid.',
        orlandoOnly: 'Participamos diretamente dos planos odontológicos listados abaixo. Nossa participação é a mesma em nosso consultório. **O convênio é sempre uma estimativa.** Antes do tratamento, verificamos seus benefícios e fornecemos uma estimativa. Uma estimativa não é garantia de pagamento. Não aceitamos Medicaid.',
      },
      sections: {
        ppo: 'Planos PPO',
        discount: 'Planos de desconto',
        medicare: 'Planos Medicare',
      },
      notListed: {
        heading: 'Não encontrou o seu plano?',
        body: 'Ligue para nós e vamos verificar.',
      },
    },
    insuranceLists: {
      andMore: 'e outros',
    },
    payment: {
      financing: {
        title: 'Financiamento',
        // Review: lender approval disclaimer (financial wording).
        partners: 'Trabalhamos com {partners}. O financiamento é contratado com a instituição financeira, sujeito à aprovação e aos termos dela. A aprovação não é garantida.',
        listAnd: 'e',
        inHouse: {
          before: 'Também oferecemos planos de pagamento próprios. Conheça a ',
          link: 'página do Contemporary Smile Club',
          after: '.',
        },
      },
      policy: {
        meta: {
          title: 'Política financeira e consultas',
          description: 'Nossas condições para consultas e pagamentos: cancelamentos, cancelamentos tardios e faltas, agendamentos de fim de semana, depósitos, saldos e estimativas do convênio.',
        },
        title: 'Nossa política financeira e de consultas',
        lead: 'Condições transparentes pensadas para respeitar o seu tempo e manter o seu atendimento sem contratempos.',
        pointer: {
          before: 'Nossas condições para consultas e pagamentos estão na página ',
          link: 'Política financeira e consultas',
          after: '.',
        },
      },
    },
    // Review: held financial wording. Check this translation against the approved Financial
    // Policy & Appointment Agreement before launch; the approved wording replaces it.
    financialPolicy: {
      deposit: { term: 'Depósitos para tratamentos', text: 'É necessário um depósito de $150 para reservar o horário dedicado à sua consulta de tratamento. Esse depósito é aplicado diretamente ao custo total do seu atendimento no dia da sua consulta.' },
      balances: { term: 'Saldos da conta e cartão cadastrado', text: 'Para a sua comodidade, mantemos um cartão de pagamento cadastrado com segurança. Sempre enviamos uma mensagem de texto de cortesia antes de processar qualquer saldo restante.' },
      cancellations: { term: 'Cancelamentos e remarcações', text: 'Reservamos um horário dedicado só para você. Se precisar cancelar ou remarcar, avise com pelo menos **48 horas de antecedência** para que possamos oferecer esse horário a outro paciente.' },
      lateCancellation: { term: 'Faltas e cancelamentos tardios', text: 'Cancelamentos com menos de 48 horas de antecedência ou faltas geram uma taxa de **$50 para consultas em dias de semana** e de **$100 para consultas de fim de semana**. Para garantir a disponibilidade de fim de semana para todos os pacientes, faltar a uma consulta de fim de semana sem aviso prévio implica a perda de futuros agendamentos de fim de semana.' },
      insurance: { term: 'Cobertura do convênio e estimativas', text: 'Trabalhamos de perto com você para verificar seus benefícios e enviar as solicitações em seu nome. Observe que todos os valores de cobertura do convênio são estimativas fornecidas pela sua operadora e não garantem o pagamento final.' },
      questions: { term: 'Dúvidas ou suporte de cobrança', text: 'Tem uma dúvida ou encontrou um problema em uma cobrança? Estamos aqui para ajudar! Ligue diretamente para o nosso consultório para falar com um membro da nossa equipe, que vai analisar e resolver com você.' },
    },
    pricing: {
      meta: {
        title: 'Preços e ofertas',
        description: 'Os valores dependem do seu tratamento, por isso não publicamos uma tabela de preços. Antes de o tratamento começar, fornecemos uma estimativa.',
      },
      title: 'Preços e ofertas',
      // Review: fee and estimate wording (financial); confirm it matches the practice's real process.
      lead: 'Os valores dependem do seu tratamento, por isso não publicamos uma tabela de preços. Antes de o tratamento começar, vamos fornecer uma estimativa. Se você tem convênio, verificamos seus benefícios e estimamos a sua parte.',
    },
    membership: {
      meta: {
        title: 'Clube Contemporary Smile',
        description: 'Planos do Programa de Membresia Smile para adultos, tratamento periodontal e crianças: uma mensalidade e uma taxa de ativação vitalícia.',
      },
      title: 'Clube Contemporary Smile',
      // Review: membership wording and prices are translated; confirm with the practice and counsel.
      lead: 'Sem convênio? Nossos pacientes não precisam. Economize na atenção que você precisa com nossos planos de adesão simples e acessíveis.',
      plansTitle: 'Planos de adesão',
      perMonth: '/mês',
      plans: {
        adult: {
          name: 'Adesão adulta',
          ages: '13 anos ou mais',
          price: '$56.77',
          activationFee: '$679.99 Taxa de ativação vitalícia',
          features: [
            'Limpezas dentais profissionais (2 por ano)',
            'Consultas com o médico (1–2 por ano)',
            'Um exame de emergência por ano (se necessário)',
            '15% de desconto em todos os outros tratamentos (podem ocorrer algumas exclusões)',
            '$69.99 de taxa de ativação vitalícia inclui o primeiro mês',
          ],
        },
        perio: {
          name: 'Adesão perio',
          ages: 'Doença periodontal',
          price: '$82.88',
          activationFee: '$99.99 Taxa de ativação vitalícia',
          features: [
            'Limpezas de manutenção periodontal (3 por ano)',
            'Consultas com o médico (1–2 por ano)',
            'Um exame de emergência por ano (se necessário)',
            '15% de desconto em todos os outros tratamentos (podem ocorrer algumas exclusões)',
            '$99.99 de taxa de ativação vitalícia inclui o primeiro mês',
          ],
        },
        child: {
          name: 'Adesão infantil',
          ages: '12 anos ou menos',
          price: '$48.07',
          activationFee: '$89.99 Taxa de ativação vitalícia',
          features: [
            'Limpezas dentais profissionais (2 por ano)',
            'Consultas com o médico (1–2 por ano)',
            'Um exame de emergência por ano (se necessário)',
            'Tratamento com flúor',
            '15% de desconto em todos os outros tratamentos (podem ocorrer algumas exclusões)',
            '$89.99 de taxa de ativação vitalícia inclui o primeiro mês',
          ],
        },
      },
      benefitsTitle: 'Benefícios da adesão',
      benefits: ['Grandes economias na atenção que você precisa', 'Sem limites máximos, sem franquias, sem pedidos de reembolso', 'Atendimento acessível para toda a família'],
    },
  },
};
