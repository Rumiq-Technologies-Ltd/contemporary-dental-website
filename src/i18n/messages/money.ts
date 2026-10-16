import type { Locale } from '../locales';

// Insurance, payment and financing, and pricing pages, plus the plan lists and the financial
// policy summary that content/insurance.ts reads. Plan names and lender names are not
// translated and live in content/insurance.ts. Placeholders such as {partners} are filled in
// the page.
const en = {
  insurance: {
    meta: {
      title: 'Insurance',
      description: 'The dental plans we participate with. We do not accept Medicaid. Insurance is always an estimate, not a guarantee of payment.',
    },
    title: 'Insurance',
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
      inHouse: {
        heading: 'In-house payment plans.',
        body: 'We also offer in-house payment plans.',
      },
    },
    policy: {
      title: 'Our financial policy',
      intro: 'These are the terms for appointments and payments at our practice.',
    },
  },
  // Summary of the financial policy. Replace with the approved Financial Policy &
  // Appointment Agreement wording, verbatim, before launch.
  financialPolicy: {
    cancellations: { term: 'Cancellations', text: 'Please give 48 hours’ notice to cancel or reschedule.' },
    lateCancellation: { term: 'Late cancellation or missed appointment', text: '$50 on a weekday, $100 on a weekend.' },
    weekends: { term: 'Weekends', text: 'A missed weekend appointment without timely cancellation forfeits future weekend scheduling.' },
    deposit: { term: 'Deposit', text: 'A $150 deposit is required to reserve a treatment appointment.' },
    balances: { term: 'Balances', text: 'We send a courtesy text before charging a balance to your card on file.' },
    insurance: { term: 'Insurance', text: 'Insurance estimates and pre-determinations are not guarantees of payment.' },
    questions: { term: 'Questions', text: 'For a question or dispute about a charge, fee or deposit, call the office and speak with a team member.' },
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
        title: 'Seguros',
        // Review: insurance participation claim and Medicaid exclusion; confirm against the participation list.
        description: 'Los planes dentales con los que participamos. No aceptamos Medicaid. El seguro siempre es una estimación, no una garantía de pago.',
      },
      title: 'Seguros',
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
          heading: 'Planes de pago propios.',
          body: 'También ofrecemos planes de pago propios.',
        },
      },
      policy: {
        title: 'Nuestra política financiera',
        intro: 'Estas son las condiciones para las citas y los pagos en nuestra clínica.',
      },
    },
    // Review: held financial wording. Check this translation against the approved Financial
    // Policy & Appointment Agreement before launch; the approved wording replaces it.
    financialPolicy: {
      cancellations: { term: 'Cancelaciones', text: 'Le pedimos avisar con 48 horas de anticipación para cancelar o reprogramar.' },
      lateCancellation: { term: 'Cancelación tardía o cita perdida', text: '$50 en un día de semana, $100 en fin de semana.' },
      weekends: { term: 'Fines de semana', text: 'Una cita de fin de semana perdida sin cancelación oportuna hace perder la posibilidad de programar citas de fin de semana en el futuro.' },
      deposit: { term: 'Depósito', text: 'Se requiere un depósito de $150 para reservar una cita de tratamiento.' },
      balances: { term: 'Saldos', text: 'Enviamos un mensaje de texto de cortesía antes de cobrar un saldo a su tarjeta registrada.' },
      insurance: { term: 'Seguro', text: 'Las estimaciones del seguro y las predeterminaciones de beneficios no son una garantía de pago.' },
      questions: { term: 'Preguntas', text: 'Si tiene una pregunta o una disputa sobre un cargo, una tarifa o un depósito, llame al consultorio y hable con un miembro de nuestro equipo.' },
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
        title: 'Convênios',
        // Review: insurance participation claim and Medicaid exclusion; confirm against the participation list.
        description: 'Os planos odontológicos dos quais participamos. Não aceitamos Medicaid. O convênio é sempre uma estimativa, não uma garantia de pagamento.',
      },
      title: 'Convênios',
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
          heading: 'Planos de pagamento próprios.',
          body: 'Também oferecemos planos de pagamento próprios.',
        },
      },
      policy: {
        title: 'Nossa política financeira',
        intro: 'Estas são as condições para consultas e pagamentos em nossa clínica.',
      },
    },
    // Review: held financial wording. Check this translation against the approved Financial
    // Policy & Appointment Agreement before launch; the approved wording replaces it.
    financialPolicy: {
      cancellations: { term: 'Cancelamentos', text: 'Avise com 48 horas de antecedência para cancelar ou remarcar.' },
      lateCancellation: { term: 'Cancelamento tardio ou consulta perdida', text: '$50 em dia de semana, $100 no fim de semana.' },
      weekends: { term: 'Fins de semana', text: 'Uma consulta de fim de semana perdida, sem cancelamento a tempo, faz perder a possibilidade de agendar consultas de fim de semana no futuro.' },
      deposit: { term: 'Depósito', text: 'É necessário um depósito de $150 para reservar uma consulta de tratamento.' },
      balances: { term: 'Saldos', text: 'Enviamos uma mensagem de texto de cortesia antes de cobrar um saldo no seu cartão cadastrado.' },
      insurance: { term: 'Convênio', text: 'As estimativas do convênio e as pré-determinações não são garantia de pagamento.' },
      questions: { term: 'Dúvidas', text: 'Para uma dúvida ou contestação sobre uma cobrança, taxa ou depósito, ligue para o consultório e fale com um membro da equipe.' },
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
