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
      withOcoee: 'We participate directly with the dental plans listed below. Our participation is the same at both offices. Insurance is always an estimate. Before treatment, we verify your benefits and give you an estimate. An estimate is not a guarantee of payment. We do not accept Medicaid.',
      orlandoOnly: 'We participate directly with the dental plans listed below. Our participation is the same at our office. Insurance is always an estimate. Before treatment, we verify your benefits and give you an estimate. An estimate is not a guarantee of payment. We do not accept Medicaid.',
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
        withOcoee: 'Participamos directamente con los planes dentales que se indican a continuación. Nuestra participación es la misma en ambos consultorios. El seguro siempre es una estimación. Antes del tratamiento, verificamos sus beneficios y le damos una estimación. Una estimación no es una garantía de pago. No aceptamos Medicaid.',
        orlandoOnly: 'Participamos directamente con los planes dentales que se indican a continuación. Nuestra participación es la misma en nuestro consultorio. El seguro siempre es una estimación. Antes del tratamiento, verificamos sus beneficios y le damos una estimación. Una estimación no es una garantía de pago. No aceptamos Medicaid.',
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
        withOcoee: 'Participamos diretamente dos planos odontológicos listados abaixo. Nossa participação é a mesma nos dois consultórios. O convênio é sempre uma estimativa. Antes do tratamento, verificamos seus benefícios e fornecemos uma estimativa. Uma estimativa não é garantia de pagamento. Não aceitamos Medicaid.',
        orlandoOnly: 'Participamos diretamente dos planos odontológicos listados abaixo. Nossa participação é a mesma em nosso consultório. O convênio é sempre uma estimativa. Antes do tratamento, verificamos seus benefícios e fornecemos uma estimativa. Uma estimativa não é garantia de pagamento. Não aceitamos Medicaid.',
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
  },
};
