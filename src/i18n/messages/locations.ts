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
    title: 'Orlando office',
    photoAlt: 'The Contemporary Dental Care office at 5330 S John Young Parkway, Orlando',
    tableCaption: 'Orlando office details',
    hoursNote: 'We are also open one Saturday a month. The date changes, so please call to check.',
    services: 'All of our services, including root canal treatment and after-hours emergency care.',
    arrivalTip: 'Ground floor location with zero steps. Situated right off Florida\'s Turnpike and 4 minutes south of The Mall at Millenia.',
    arrivalLandmarks: 'Minutes from The Mall at Millenia and I-4 / Florida\'s Turnpike intersection. Ideal for Central Orlando and tourist corridor.',
  },
  ocoee: {
    title: 'Ocoee office',
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
      title: 'Consultorio de Orlando',
      photoAlt: 'El consultorio de Contemporary Dental Care en 5330 S John Young Parkway, Orlando',
      tableCaption: 'Datos del consultorio de Orlando',
      hoursNote: 'También abrimos un sábado al mes. La fecha cambia, así que llame para confirmarla.',
      services: 'Todos nuestros servicios, incluida la endodoncia y la atención de urgencias fuera del horario de atención.',
      arrivalTip: '',
      arrivalLandmarks: '',
    },
    ocoee: {
      title: 'Consultorio de Ocoee',
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
      title: 'Consultório de Orlando',
      photoAlt: 'O consultório da Contemporary Dental Care na 5330 S John Young Parkway, Orlando',
      tableCaption: 'Informações do consultório de Orlando',
      hoursNote: 'Também abrimos um sábado por mês. A data muda, então ligue para conferir.',
      services: 'Todos os nossos serviços, incluindo tratamento de canal e atendimento de emergência fora do horário.',
      arrivalTip: '',
      arrivalLandmarks: '',
    },
    ocoee: {
      title: 'Consultório de Ocoee',
      tableCaption: 'Informações do consultório de Ocoee',
      services: 'Consultas para novos pacientes, limpezas, coroas e dentaduras no nosso consultório de Ocoee, aberto às segundas-feiras. O tratamento de canal é realizado em nosso consultório de Orlando, e os pacientes de Ocoee que precisam dele são agendados lá.',
      arrivalTip: '',
      arrivalLandmarks: '',
    },
  },
};
