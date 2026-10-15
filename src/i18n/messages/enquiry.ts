import type { Locale } from '../locales';

// The enquiry form and the thank-you page. The form stays off until the BAA for the email provider is
// confirmed (appointmentFormEnabled in content/site.ts). Its wording is for owner and counsel review.
const en = {
  meta: {
    title: 'Thank you',
    description: 'Thank you for contacting Contemporary Dental Care.',
  },
  thankYou: {
    heading: 'Thank you.',
    body: "We've received your request and our team will contact you. If it's urgent, call {phone}, or {afterHours} outside opening hours.",
  },
  form: {
    heading: 'Ask us to call you',
    intro: "Tell us how to reach you and our front desk will contact you. Please don't include medical details.",
    firstName: 'First name',
    mobile: 'Mobile phone',
    bestTime: 'Best time to call',
    morning: 'Morning',
    afternoon: 'Afternoon',
    language: 'Preferred language',
    english: 'English',
    spanish: 'Spanish',
    portuguese: 'Portuguese',
    other: 'Other',
    patient: 'New or existing patient (optional)',
    newPatient: 'New patient',
    existingPatient: 'Existing patient',
    // Review: consent wording to be agreed with P08 and counsel (Landing Page Brief, enquiry form rules).
    consent: 'I agree that Contemporary Dental Care may contact me by phone or text about this request.',
    submit: 'Send request',
    sending: 'Sending…',
    fallback: 'Prefer to talk? Call {phone}.',
    failed: 'Your request could not be sent. Please call {phone}.',
    errors: {
      firstName: 'Please enter your first name.',
      mobile: 'Please enter a mobile phone number we can call or text.',
      bestTime: 'Please choose a time to call.',
      language: 'Please choose a language.',
      consent: 'Please tick the box so we can contact you about your request.',
    },
  },
};

export type EnquiryMessages = typeof en;

export const enquiry: Record<Locale, EnquiryMessages> = {
  en,
  es: {
    meta: {
      title: 'Gracias',
      description: 'Gracias por contactar con Contemporary Dental Care.',
    },
    thankYou: {
      heading: 'Gracias.',
      body: 'Hemos recibido su solicitud y nuestro equipo se comunicará con usted. Si es urgente, llame al {phone}, o al {afterHours} fuera del horario de atención.',
    },
    form: {
      heading: 'Pida que le llamemos',
      intro: 'Díganos cómo comunicarnos con usted y nuestra recepción se pondrá en contacto. Por favor, no incluya detalles médicos.',
      firstName: 'Nombre',
      mobile: 'Teléfono móvil',
      bestTime: 'Mejor hora para llamar',
      morning: 'Mañana',
      afternoon: 'Tarde',
      language: 'Idioma preferido',
      english: 'Inglés',
      spanish: 'Español',
      portuguese: 'Portugués',
      other: 'Otro',
      patient: 'Paciente nuevo o existente (opcional)',
      newPatient: 'Paciente nuevo',
      existingPatient: 'Paciente existente',
      // Review: consent wording to be agreed with P08 and counsel.
      consent: 'Acepto que Contemporary Dental Care me contacte por teléfono o mensaje de texto sobre esta solicitud.',
      submit: 'Enviar solicitud',
      sending: 'Enviando…',
      fallback: '¿Prefiere hablar? Llame al {phone}.',
      failed: 'No pudimos enviar su solicitud. Llame al {phone}.',
      errors: {
        firstName: 'Escriba su nombre.',
        mobile: 'Escriba un número de teléfono móvil al que podamos llamar o enviar mensajes.',
        bestTime: 'Elija una hora para llamarle.',
        language: 'Elija un idioma.',
        consent: 'Marque la casilla para que podamos contactarle sobre su solicitud.',
      },
    },
  },
  pt: {
    meta: {
      title: 'Obrigado',
      description: 'Obrigado por entrar em contato com a Contemporary Dental Care.',
    },
    thankYou: {
      heading: 'Obrigado.',
      body: 'Recebemos a sua solicitação e a nossa equipe entrará em contato com você. Se for urgente, ligue para {phone}, ou para {afterHours} fora do horário de atendimento.',
    },
    form: {
      heading: 'Peça que ligue para você',
      intro: 'Informe como podemos entrar em contato com você e a nossa recepção retornará. Por favor, não inclua detalhes médicos.',
      firstName: 'Nome',
      mobile: 'Celular',
      bestTime: 'Melhor horário para ligar',
      morning: 'Manhã',
      afternoon: 'Tarde',
      language: 'Idioma preferido',
      english: 'Inglês',
      spanish: 'Espanhol',
      portuguese: 'Português',
      other: 'Outro',
      patient: 'Paciente novo ou já atendido (opcional)',
      newPatient: 'Paciente novo',
      existingPatient: 'Já sou paciente',
      // Review: consent wording to be agreed with P08 and counsel.
      consent: 'Concordo que a Contemporary Dental Care entre em contato comigo por telefone ou mensagem de texto sobre esta solicitação.',
      submit: 'Enviar solicitação',
      sending: 'Enviando…',
      fallback: 'Prefere falar? Ligue para {phone}.',
      failed: 'Não foi possível enviar a sua solicitação. Ligue para {phone}.',
      errors: {
        firstName: 'Informe o seu nome.',
        mobile: 'Informe um número de celular para o qual possamos ligar ou enviar mensagens.',
        bestTime: 'Escolha um horário para ligarmos.',
        language: 'Escolha um idioma.',
        consent: 'Marque a caixa para que possamos entrar em contato sobre a sua solicitação.',
      },
    },
  },
};
