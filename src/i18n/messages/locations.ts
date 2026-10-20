import type { Locale } from '../locales';

// Locations index and the Orlando and Ocoee office pages. Addresses, phone numbers, email and
// opening hours are facts: addresses and contact details come from content/site.ts and the hours
// from messages.common.hours. {address} and {hours} are filled in the page.
const en = {
  labels: {
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Hours',
    services: 'Services',
    arrivalTip: 'Arrival tip',
    arrivalLandmarks: 'Arrival landmarks',
  },
  orlando: {
    title: 'Orlando',
    pageHeading: 'Our Orlando office',
    metaTitle: 'Dental Care in Orlando',
    metaDescription: 'Our Orlando office on S John Young Parkway: address, phone, hours, services, map and directions.',
    photoAlt: 'The Contemporary Dental Care office at 5330 S John Young Parkway, Orlando',
    tableCaption: 'Orlando office details',
    services: 'All of our services, including root canal treatment and after-hours emergency care.',
    arrivalTip: 'Ground floor location with zero steps. Situated right off Florida\'s Turnpike and 4 minutes south of The Mall at Millenia.',
    arrivalLandmarks: 'Minutes from The Mall at Millenia and I-4 / Florida\'s Turnpike intersection. Ideal for Central Orlando and tourist corridor.',
  },
  ocoee: {
    title: 'Ocoee office',
    pageHeading: 'Our Ocoee office',
    metaTitle: 'Dental Care in Ocoee',
    metaDescription: 'Our Ocoee office on Maguire Road, open Mondays: address, phone, hours, services, map and directions.',
    tableCaption: 'Ocoee office details',
    services: 'New-patient exams, cleanings, crowns and dentures at our Ocoee office, open Mondays. Root canal treatment is performed at our Orlando office, and Ocoee patients who need it are scheduled there.',
    arrivalTip: 'Shaded plaza off Maguire Rd & Hwy 50 (Maguire Reserve). Ideal for high-anxiety patients who favor total privacy.',
    arrivalLandmarks: 'Just off Maguire Rd & Highway 50. Quick connection for Windermere, Winter Garden Village, and Clermont residents.',
  },
};

export type LocationsMessages = typeof en;

export const locations: Record<Locale, LocationsMessages> = {
  en,
  es: {
    labels: {
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo electrónico',
      hours: 'Horario',
      services: 'Servicios',
      // Review: arrival tip and landmark wording is not yet approved; both stay empty until it is.
      arrivalTip: 'Consejo de llegada',
      arrivalLandmarks: 'Puntos de referencia',
    },
    orlando: {
      title: 'Orlando',
      pageHeading: 'Nuestro consultorio de Orlando',
      metaTitle: 'Atención dental en Orlando',
      metaDescription: 'Nuestro consultorio de Orlando en S John Young Parkway: dirección, teléfono, horario, servicios, mapa y cómo llegar.',
      photoAlt: 'El consultorio de Contemporary Dental Care en 5330 S John Young Parkway, Orlando',
      tableCaption: 'Datos del consultorio de Orlando',
      services: 'Todos nuestros servicios, incluida la endodoncia y la atención de urgencias fuera del horario de atención.',
      arrivalTip: '',
      arrivalLandmarks: '',
    },
    ocoee: {
      title: 'Consultorio de Ocoee',
      pageHeading: 'Nuestro consultorio de Ocoee',
      metaTitle: 'Atención dental en Ocoee',
      metaDescription: 'Nuestro consultorio de Ocoee en Maguire Road, abierto los lunes: dirección, teléfono, horario, servicios, mapa y cómo llegar.',
      tableCaption: 'Datos del consultorio de Ocoee',
      services: 'Exámenes para nuevos pacientes, limpiezas, coronas y prótesis en nuestro consultorio de Ocoee, abierto los lunes. La endodoncia se realiza en nuestro consultorio de Orlando, y a los pacientes de Ocoee que la necesitan se les programa allí.',
      arrivalTip: '',
      arrivalLandmarks: '',
    },
  },
  pt: {
    labels: {
      address: 'Endereço',
      phone: 'Telefone',
      email: 'E-mail',
      hours: 'Horário',
      services: 'Serviços',
      // Review: arrival tip and landmark wording is not yet approved; both stay empty until it is.
      arrivalTip: 'Dica de chegada',
      arrivalLandmarks: 'Pontos de referência',
    },
    orlando: {
      title: 'Orlando',
      pageHeading: 'Nosso consultório de Orlando',
      metaTitle: 'Atendimento odontológico em Orlando',
      metaDescription: 'Nosso consultório de Orlando na S John Young Parkway: endereço, telefone, horário, serviços, mapa e como chegar.',
      photoAlt: 'O consultório da Contemporary Dental Care na 5330 S John Young Parkway, Orlando',
      tableCaption: 'Informações do consultório de Orlando',
      services: 'Todos os nossos serviços, incluindo tratamento de canal e atendimento de emergência fora do horário.',
      arrivalTip: '',
      arrivalLandmarks: '',
    },
    ocoee: {
      title: 'Consultório de Ocoee',
      pageHeading: 'Nosso consultório de Ocoee',
      metaTitle: 'Atendimento odontológico em Ocoee',
      metaDescription: 'Nosso consultório de Ocoee na Maguire Road, aberto às segundas-feiras: endereço, telefone, horário, serviços, mapa e como chegar.',
      tableCaption: 'Informações do consultório de Ocoee',
      services: 'Consultas para novos pacientes, limpezas, coroas e dentaduras no nosso consultório de Ocoee, aberto às segundas-feiras. O tratamento de canal é realizado em nosso consultório de Orlando, e os pacientes de Ocoee que precisam dele são agendados lá.',
      arrivalTip: '',
      arrivalLandmarks: '',
    },
  },
};
