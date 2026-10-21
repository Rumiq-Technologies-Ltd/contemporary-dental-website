import type { ServiceId } from '@/content/serviceIds';
import type { Locale } from '../locales';

// Copy for the services index, the service pages and the content module in src/content/services.ts.
// {atOffices} is replaced by the "atOffices" phrase, which switches with the Ocoee hold.
// Held items from the content file (same-day crowns, implant offer, All-on-4,
// orthobrain wording, trademarked product names) are left out of every language on purpose.

/** One service's copy. `paragraphs` has two forms only where the wording changes with the Ocoee hold. */
export interface ServiceCopy {
  /** Card label and homepage list entry. */
  title: string;
  /** Page heading (h1). */
  heading: string;
  /** Sub-header under the heading, where the practice supplied one. */
  lead?: string;
  /** Title tag, without the site suffix. */
  titleTag: string;
  /** Short line used in the homepage "What we treat" list. Empty when the service has none. */
  summary: string;
  /** The full homepage list entry, written out because the joining punctuation differs by language. */
  listLabel: string;
  description: string;
  paragraphs: readonly string[] | { withOcoee: readonly string[]; orlandoOnly: readonly string[] };
  /** A closing note, shown in italics after the paragraphs. */
  note?: string;
}

const enItems: Record<ServiceId, ServiceCopy> = {
  'cleanings-checkups': {
    title: 'Cleanings and check-ups',
    heading: 'Cleanings and check-ups',
    titleTag: 'Cleanings and Check-Ups',
    summary: 'routine preventive care',
    listLabel: 'Cleanings and check-ups: routine preventive care',
    description: 'Regular cleanings and check-ups every six months help us catch problems early.',
    // The practice's copy of 20 October 2026. Digital radiography is confirmed in C04.
    lead: 'Gentle preventive care to keep your smile healthy, bright, and strong.',
    paragraphs: {
      withOcoee: ['Routine cleanings and check-ups every six months allow us to protect your oral health and address minor issues before they become major problems. We take digital X-rays only when clinically necessary for a complete diagnosis. Dedicated hygiene care is available at both our Orlando and Ocoee locations.'],
      orlandoOnly: ['Routine cleanings and check-ups every six months allow us to protect your oral health and address minor issues before they become major problems. We take digital X-rays only when clinically necessary for a complete diagnosis. Dedicated hygiene care is available at our Orlando location.'],
    },
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
    // The practice's copy of 20 October 2026, with "best step" as "right step" (no superlatives, by the
    // practice's choice). The same-day wording matches C14's "clinical suitability and availability".
    lead: 'Gentle, thoughtful care focused on your long-term health and comfort.',
    paragraphs: [
      'When a tooth is severely damaged or cannot be saved, a gentle extraction is often the right step to relieve pain and protect the rest of your smile. We provide same-day extractions whenever clinically appropriate and schedule permitting.',
      'Before any treatment begins, Dr. Sheryar Khan will walk you through your diagnostic results, explain your options in clear language, and make sure you feel completely comfortable with your care plan.',
    ],
    note: 'Note: For specialized or complex surgical cases beyond general care, we work closely with trusted local oral surgery partners to ensure you receive the safest treatment possible.',
  },
  restorative: {
    title: 'Fillings and restorative care',
    heading: 'Fillings and restorative care',
    titleTag: 'Fillings and Restorative Care',
    summary: '',
    listLabel: 'Fillings and restorative care',
    description: 'Fillings and other restorative treatment repair teeth damaged by decay, cracks or breakage.',
    // The practice's copy of 21 October 2026. C04 confirms restorative care; "tooth-colored materials" is the
    // practice's wording and not in the governed documents yet.
    lead: 'Restore your smile’s natural strength, function, and seamless appearance.',
    paragraphs: {
      withOcoee: ['Whether repairing minor decay, cracks, or structural breakage, our restorative care is designed to look natural and feel like your own teeth. Dr. Sheryar Khan uses durable, tooth-colored materials that blend seamlessly with your smile, protecting your long-term dental health without compromising aesthetics.', 'Complete restorative treatments are available at both our Orlando and Ocoee locations.'],
      orlandoOnly: ['Whether repairing minor decay, cracks, or structural breakage, our restorative care is designed to look natural and feel like your own teeth. Dr. Sheryar Khan uses durable, tooth-colored materials that blend seamlessly with your smile, protecting your long-term dental health without compromising aesthetics.', 'Complete restorative treatments are available at our Orlando location.'],
    },
  },
  crowns: {
    title: 'Crowns',
    heading: 'Dental crowns',
    titleTag: 'Dental Crowns',
    summary: '',
    listLabel: 'Crowns',
    description: 'A crown covers and protects a damaged or weakened tooth. Crowns need a dental laboratory case.',
    // The practice's copy of 21 October 2026. It keeps C14's limits: crowns are not same-day, and crown
    // preparation is a first step at an emergency visit.
    lead: 'Custom-crafted protection to restore the strength, function, and appearance of your tooth.',
    paragraphs: [
      'A dental crown acts as a protective cover, fully encasing a weakened or damaged tooth to restore its structure and prevent further health issues. Because each crown is custom-crafted by a specialized dental laboratory for a precise fit and natural look, treatment is completed over two scheduled visits rather than on the same day.',
      'If you are experiencing pain or an urgent tooth injury, initial crown preparation can begin during an emergency visit to stabilize your tooth right away. Dr. Sheryar Khan will explain every step of the process so you feel confident and fully informed throughout your care.',
    ],
  },
  'root-canal': {
    title: 'Root canal treatment',
    heading: 'Root canal treatment',
    titleTag: 'Root Canal Treatment',
    summary: '(Orlando)',
    listLabel: 'Root canal treatment (Orlando)',
    description: 'Root canal treatment is performed at our Orlando office.',
    // The practice's copy of 21 October 2026. Referral to endodontists is not a specialty claim (C14 §3.2).
    lead: 'Save your natural tooth and eliminate dental pain with gentle, focused care.',
    paragraphs: {
      withOcoee: [
        'Root canal therapy is a routine procedure designed to relieve severe tooth pain and preserve your natural smile. When the inner soft tissue of a tooth (the pulp) becomes inflamed or infected due to deep decay or injury, we carefully remove the infected tissue, thoroughly clean and seal the interior, and restore the tooth so it functions comfortably again.',
        '**Location note:** Root canal procedures are performed exclusively at our Orlando office. If you are an Ocoee patient requiring root canal treatment, our team will coordinate your appointment seamlessly at our Orlando facility.',
        '**Specialized referrals:** For root canal retreatments or highly complex root canal cases, we work closely with trusted local endodontists to ensure you receive specialized care.',
      ],
      orlandoOnly: [
        'Root canal therapy is a routine procedure designed to relieve severe tooth pain and preserve your natural smile. When the inner soft tissue of a tooth (the pulp) becomes inflamed or infected due to deep decay or injury, we carefully remove the infected tissue, thoroughly clean and seal the interior, and restore the tooth so it functions comfortably again.',
        '**Location note:** Root canal procedures are performed exclusively at our Orlando office.',
        '**Specialized referrals:** For root canal retreatments or highly complex root canal cases, we work closely with trusted local endodontists to ensure you receive specialized care.',
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
    // The practice's copy of 21 October 2026, with two lines reworded at its choice to keep to C14 §3.2 (no
    // specialty-implying wording) and avoid a superlative. Same-day placement wording matches C14 §2.
    lead: 'A permanent, natural-looking solution to replace missing teeth and renew your confidence.',
    paragraphs: [
      'Dental implants provide a durable, natural-looking replacement for missing teeth. By replacing the tooth root itself, an implant creates a secure, long-lasting foundation for a custom crown, bridge, or replacement tooth—restoring full chewing function, preserving jaw structure, and blending seamlessly with your smile.',
      'Dr. Khan provides implant treatment as part of his general practice. He works closely with you to plan your treatment in clear, transparent stages so you always know what to expect. Depending on your clinical evaluation and appointment availability, same-day implant placement options may be available.',
    ],
  },
  dentures: {
    title: 'Dentures',
    heading: 'Dentures',
    titleTag: 'Dentures',
    summary: '',
    listLabel: 'Dentures',
    description: 'Dentures replace missing teeth. Dr. Khan will walk you through the options and the process.',
    // The practice's copy of 21 October 2026. Partial dentures are confirmed at both offices (the hold is lifted).
    lead: 'Comfortable, natural-looking tooth replacement designed to restore your smile and confidence.',
    paragraphs: {
      withOcoee: [
        'Missing teeth shouldn’t keep you from enjoying your favorite foods, speaking clearly, or smiling with confidence. Modern dentures offer a custom-crafted, comfortable solution tailored to complement your natural facial features and restore full function to your smile.',
        'Whether you need full or partial dentures, Dr. Khan will walk you through every option and step of the process during your consultation, ensuring your new smile feels secure and natural. Complete denture care is available at both our Orlando and Ocoee locations.',
      ],
      orlandoOnly: [
        'Missing teeth shouldn’t keep you from enjoying your favorite foods, speaking clearly, or smiling with confidence. Modern dentures offer a custom-crafted, comfortable solution tailored to complement your natural facial features and restore full function to your smile.',
        'Whether you need full or partial dentures, Dr. Khan will walk you through every option and step of the process during your consultation, ensuring your new smile feels secure and natural. Complete denture care is available at our Orlando location.',
      ],
    },
  },
  'clear-aligners-braces': {
    title: 'Clear aligners and braces',
    heading: 'Clear aligners and braces',
    titleTag: 'Clear Aligners and Braces',
    summary: '',
    listLabel: 'Clear aligners and braces',
    description: 'Dr. Khan provides clear aligners and traditional braces.',
    // The practice's copy of 21 October 2026. It names no orthodontist and keeps braces as most cases (C14 §3.2).
    lead: 'Straighten your teeth with options tailored to your lifestyle, comfort, and goals.',
    paragraphs: {
      withOcoee: [
        'A well-aligned smile not only boosts your confidence but also supports better long-term oral health and chewing function. Contemporary Dental Care provides both clear aligners and traditional braces to help you achieve a straight, healthy smile on your terms.',
        '**Clear aligners:** A series of custom-molded, virtually invisible trays that gently guide your teeth into place. Because they are removable, you can eat, drink, brush, and floss with complete freedom.',
        '**Traditional braces:** A time-tested system using brackets and wires to deliver precise, effective alignment for a wide variety of cases. Due to their proven reliability and versatility, traditional braces represent the majority of our orthodontic care.',
        'Complete orthodontic consultations and care are offered at both our Orlando and Ocoee locations.',
      ],
      orlandoOnly: [
        'A well-aligned smile not only boosts your confidence but also supports better long-term oral health and chewing function. Contemporary Dental Care provides both clear aligners and traditional braces to help you achieve a straight, healthy smile on your terms.',
        '**Clear aligners:** A series of custom-molded, virtually invisible trays that gently guide your teeth into place. Because they are removable, you can eat, drink, brush, and floss with complete freedom.',
        '**Traditional braces:** A time-tested system using brackets and wires to deliver precise, effective alignment for a wide variety of cases. Due to their proven reliability and versatility, traditional braces represent the majority of our orthodontic care.',
        'Complete orthodontic consultations and care are offered at our Orlando location.',
      ],
    },
  },
  cosmetic: {
    title: 'Cosmetic dentistry',
    heading: 'Cosmetic dentistry',
    titleTag: 'Cosmetic Dentistry',
    summary: '',
    listLabel: 'Cosmetic dentistry',
    description: 'Veneers, smile design and other cosmetic treatment, planned around your goals and your oral health.',
    // The practice's copy of 21 October 2026. Veneers and smile design are confirmed in C04.
    lead: 'A personalized approach to enhancing your natural smile with confidence and care.',
    paragraphs: {
      withOcoee: [
        'Your smile is uniquely yours, and cosmetic care should reflect your personal vision while protecting your long-term oral health. Whether you want to make subtle enhancements or completely transform your look, we design every treatment around your goals.',
        '**Porcelain veneers:** Custom-crafted, ultra-thin shells bonded to the front of your teeth to refine color, shape, symmetry, and alignment with a natural finish.',
        '**Collaborative smile design:** A step-by-step planning process where Dr. Khan works directly with you to map out your overall aesthetic before treatment even begins.',
        'To help make your treatment fit comfortably into your budget, flexible payment plans are available through our financing partners (subject to approval). Cosmetic care is offered at both our Orlando and Ocoee offices.',
      ],
      orlandoOnly: [
        'Your smile is uniquely yours, and cosmetic care should reflect your personal vision while protecting your long-term oral health. Whether you want to make subtle enhancements or completely transform your look, we design every treatment around your goals.',
        '**Porcelain veneers:** Custom-crafted, ultra-thin shells bonded to the front of your teeth to refine color, shape, symmetry, and alignment with a natural finish.',
        '**Collaborative smile design:** A step-by-step planning process where Dr. Khan works directly with you to map out your overall aesthetic before treatment even begins.',
        'To help make your treatment fit comfortably into your budget, flexible payment plans are available through our financing partners (subject to approval). Cosmetic care is offered at our Orlando office.',
      ],
    },
  },
};

const en = {
  index: {
    meta: {
      title: 'Dental Services',
      description: 'Cleanings, emergency care, extractions, fillings, crowns, root canal treatment, implants, dentures, clear aligners and braces, and cosmetic dentistry.',
    },
    title: 'Our services',
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
        lead: 'Atención preventiva amable para mantener su sonrisa sana, luminosa y fuerte.',
        paragraphs: {
          withOcoee: ['Las limpiezas y revisiones de rutina cada seis meses nos permiten proteger su salud bucal y tratar los problemas pequeños antes de que se conviertan en grandes. Tomamos radiografías digitales solo cuando son clínicamente necesarias para un diagnóstico completo. Ofrecemos atención de higiene dental en nuestros dos consultorios, Orlando y Ocoee.'],
          orlandoOnly: ['Las limpiezas y revisiones de rutina cada seis meses nos permiten proteger su salud bucal y tratar los problemas pequeños antes de que se conviertan en grandes. Tomamos radiografías digitales solo cuando son clínicamente necesarias para un diagnóstico completo. Ofrecemos atención de higiene dental en nuestro consultorio de Orlando.'],
        },
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
        lead: 'Atención amable y cuidadosa, centrada en su salud y comodidad a largo plazo.',
        paragraphs: [
          'Cuando un diente está muy dañado o no se puede salvar, una extracción cuidadosa suele ser el paso adecuado para aliviar el dolor y proteger el resto de su sonrisa. Realizamos extracciones el mismo día siempre que sea clínicamente apropiado y la agenda lo permita.',
          'Antes de comenzar cualquier tratamiento, el Dr. Sheryar Khan revisará con usted los resultados de su diagnóstico, le explicará sus opciones en un lenguaje claro y se asegurará de que se sienta completamente cómodo con su plan de atención.',
        ],
        note: 'Nota: para casos quirúrgicos especializados o complejos que van más allá de la atención general, trabajamos en estrecha colaboración con cirujanos orales locales de confianza para que reciba el tratamiento más seguro posible.',
      },
      restorative: {
        title: 'Empastes y atención restauradora',
        heading: 'Empastes y atención restauradora',
        titleTag: 'Empastes y atención restauradora',
        summary: '',
        listLabel: 'Empastes y atención restauradora',
        description: 'Los empastes y otros tratamientos restauradores reparan los dientes dañados por caries, grietas o fracturas.',
        lead: 'Recupere la fuerza, la función y la apariencia natural de su sonrisa.',
        paragraphs: {
          withOcoee: ['Ya sea para reparar caries leves, grietas o fracturas, nuestra atención restauradora está pensada para verse natural y sentirse como sus propios dientes. El Dr. Sheryar Khan utiliza materiales duraderos del color del diente que se integran con su sonrisa y protegen su salud dental a largo plazo sin sacrificar la estética.', 'Ofrecemos tratamientos restauradores completos en nuestros dos consultorios, Orlando y Ocoee.'],
          orlandoOnly: ['Ya sea para reparar caries leves, grietas o fracturas, nuestra atención restauradora está pensada para verse natural y sentirse como sus propios dientes. El Dr. Sheryar Khan utiliza materiales duraderos del color del diente que se integran con su sonrisa y protegen su salud dental a largo plazo sin sacrificar la estética.', 'Ofrecemos tratamientos restauradores completos en nuestro consultorio de Orlando.'],
        },
      },
      crowns: {
        title: 'Coronas',
        heading: 'Coronas dentales',
        titleTag: 'Coronas dentales',
        summary: '',
        listLabel: 'Coronas',
        description: 'Una corona cubre y protege un diente dañado o debilitado. Las coronas requieren un trabajo de laboratorio dental.',
        lead: 'Protección hecha a medida para devolver a su diente la fuerza, la función y la apariencia.',
        paragraphs: [
          'Una corona dental actúa como una cubierta protectora que envuelve por completo un diente debilitado o dañado para restaurar su estructura y prevenir otros problemas de salud. Como cada corona se elabora a medida en un laboratorio dental especializado para lograr un ajuste preciso y un aspecto natural, el tratamiento se completa en dos citas programadas y no el mismo día.',
          'Si tiene dolor o una lesión dental urgente, la preparación inicial de la corona puede comenzar durante una visita de urgencia para estabilizar su diente de inmediato. El Dr. Sheryar Khan le explicará cada paso del proceso para que se sienta seguro y bien informado durante toda su atención.',
        ],
      },
      'root-canal': {
        title: 'Endodoncia',
        heading: 'Endodoncia',
        titleTag: 'Endodoncia',
        summary: '(Orlando)',
        listLabel: 'Endodoncia (Orlando)',
        description: 'La endodoncia se realiza en nuestro consultorio de Orlando.',
        lead: 'Salve su diente natural y elimine el dolor dental con una atención cuidadosa y enfocada.',
        paragraphs: {
          withOcoee: [
            'La endodoncia es un procedimiento habitual que alivia el dolor dental intenso y conserva su sonrisa natural. Cuando el tejido blando interno del diente (la pulpa) se inflama o se infecta por una caries profunda o una lesión, retiramos con cuidado el tejido infectado, limpiamos y sellamos a fondo el interior y restauramos el diente para que vuelva a funcionar con comodidad.',
            '**Nota sobre el consultorio:** las endodoncias se realizan únicamente en nuestro consultorio de Orlando. Si es paciente de Ocoee y necesita una endodoncia, nuestro equipo coordinará su cita en nuestro consultorio de Orlando sin complicaciones.',
            '**Derivaciones especializadas:** para retratamientos de conducto o casos de endodoncia muy complejos, trabajamos de cerca con endodoncistas locales de confianza para que reciba una atención especializada.',
          ],
          orlandoOnly: [
            'La endodoncia es un procedimiento habitual que alivia el dolor dental intenso y conserva su sonrisa natural. Cuando el tejido blando interno del diente (la pulpa) se inflama o se infecta por una caries profunda o una lesión, retiramos con cuidado el tejido infectado, limpiamos y sellamos a fondo el interior y restauramos el diente para que vuelva a funcionar con comodidad.',
            '**Nota sobre el consultorio:** las endodoncias se realizan únicamente en nuestro consultorio de Orlando.',
            '**Derivaciones especializadas:** para retratamientos de conducto o casos de endodoncia muy complejos, trabajamos de cerca con endodoncistas locales de confianza para que reciba una atención especializada.',
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
        lead: 'Una solución permanente y de aspecto natural para reemplazar los dientes que faltan y renovar su confianza.',
        paragraphs: [
          'Los implantes dentales son un reemplazo duradero y de aspecto natural para los dientes que faltan. Al sustituir la raíz del diente, el implante crea una base firme y duradera para una corona, un puente o un diente de reemplazo hechos a medida, que devuelve la función completa al masticar, ayuda a conservar la estructura del maxilar y se integra con su sonrisa.',
          'El Dr. Khan ofrece tratamiento con implantes como parte de su práctica general. Trabaja de cerca con usted para planificar su tratamiento en etapas claras y transparentes, para que siempre sepa qué esperar. Según su evaluación clínica y la disponibilidad de citas, puede haber opciones de colocación de implantes el mismo día.',
        ],
      },
      dentures: {
        title: 'Prótesis dentales',
        heading: 'Prótesis dentales',
        titleTag: 'Prótesis dentales',
        summary: '',
        listLabel: 'Prótesis dentales',
        description: 'Las prótesis dentales reemplazan los dientes que faltan. El Dr. Khan le explicará las opciones y el proceso.',
        lead: 'Reemplazo dental cómodo y de aspecto natural, pensado para devolverle la sonrisa y la confianza.',
        paragraphs: {
          withOcoee: [
            'La falta de dientes no debería impedirle disfrutar de sus comidas favoritas, hablar con claridad o sonreír con confianza. Las dentaduras modernas ofrecen una solución cómoda y hecha a medida, adaptada a sus rasgos faciales naturales, que devuelve la función completa a su sonrisa.',
            'Ya sea que necesite una dentadura completa o parcial, el Dr. Khan le explicará cada opción y cada paso del proceso durante su consulta, para que su nueva sonrisa se sienta firme y natural. Ofrecemos atención completa de dentaduras en nuestros dos consultorios, Orlando y Ocoee.',
          ],
          orlandoOnly: [
            'La falta de dientes no debería impedirle disfrutar de sus comidas favoritas, hablar con claridad o sonreír con confianza. Las dentaduras modernas ofrecen una solución cómoda y hecha a medida, adaptada a sus rasgos faciales naturales, que devuelve la función completa a su sonrisa.',
            'Ya sea que necesite una dentadura completa o parcial, el Dr. Khan le explicará cada opción y cada paso del proceso durante su consulta, para que su nueva sonrisa se sienta firme y natural. Ofrecemos atención completa de dentaduras en nuestro consultorio de Orlando.',
          ],
        },
      },
      'clear-aligners-braces': {
        title: 'Alineadores transparentes y brackets',
        heading: 'Alineadores transparentes y brackets',
        titleTag: 'Alineadores transparentes y brackets',
        summary: '',
        listLabel: 'Alineadores transparentes y brackets',
        description: 'El Dr. Khan ofrece alineadores transparentes y brackets tradicionales.',
        lead: 'Enderece sus dientes con opciones adaptadas a su estilo de vida, su comodidad y sus objetivos.',
        paragraphs: {
          withOcoee: [
            'Una sonrisa bien alineada no solo aumenta su confianza, también favorece la salud bucal a largo plazo y la función al masticar. Contemporary Dental Care ofrece alineadores transparentes y brackets tradicionales para ayudarle a lograr una sonrisa recta y sana a su manera.',
            '**Alineadores transparentes:** una serie de férulas hechas a medida y prácticamente invisibles que guían sus dientes con suavidad hasta su lugar. Como son removibles, puede comer, beber, cepillarse y usar hilo dental con total libertad.',
            '**Brackets tradicionales:** un sistema de eficacia comprobada con brackets y alambres que logra una alineación precisa y eficaz en una gran variedad de casos. Por su fiabilidad y versatilidad, los brackets tradicionales son la mayoría de nuestros tratamientos de ortodoncia.',
            'Ofrecemos consultas y atención de ortodoncia completas en nuestros dos consultorios, Orlando y Ocoee.',
          ],
          orlandoOnly: [
            'Una sonrisa bien alineada no solo aumenta su confianza, también favorece la salud bucal a largo plazo y la función al masticar. Contemporary Dental Care ofrece alineadores transparentes y brackets tradicionales para ayudarle a lograr una sonrisa recta y sana a su manera.',
            '**Alineadores transparentes:** una serie de férulas hechas a medida y prácticamente invisibles que guían sus dientes con suavidad hasta su lugar. Como son removibles, puede comer, beber, cepillarse y usar hilo dental con total libertad.',
            '**Brackets tradicionales:** un sistema de eficacia comprobada con brackets y alambres que logra una alineación precisa y eficaz en una gran variedad de casos. Por su fiabilidad y versatilidad, los brackets tradicionales son la mayoría de nuestros tratamientos de ortodoncia.',
            'Ofrecemos consultas y atención de ortodoncia completas en nuestro consultorio de Orlando.',
          ],
        },
      },
      cosmetic: {
        title: 'Odontología estética',
        heading: 'Odontología estética',
        titleTag: 'Odontología estética',
        summary: '',
        listLabel: 'Odontología estética',
        description: 'Carillas, diseño de sonrisa y otros tratamientos estéticos, planificados según sus objetivos y su salud bucal.',
        lead: 'Un enfoque personalizado para realzar su sonrisa natural con confianza y cuidado.',
        paragraphs: {
          withOcoee: [
            'Su sonrisa es única, y la atención estética debe reflejar lo que usted imagina, sin descuidar su salud bucal a largo plazo. Ya sea que busque mejoras sutiles o un cambio completo, diseñamos cada tratamiento en torno a sus objetivos.',
            '**Carillas de porcelana:** láminas ultrafinas hechas a medida que se adhieren a la parte frontal de los dientes para mejorar el color, la forma, la simetría y la alineación con un acabado natural.',
            '**Diseño de sonrisa en conjunto:** un proceso de planificación paso a paso en el que el Dr. Khan trabaja directamente con usted para definir el aspecto general de su sonrisa antes de comenzar el tratamiento.',
            'Para que su tratamiento se ajuste cómodamente a su presupuesto, ofrecemos planes de pago flexibles a través de nuestras empresas de financiamiento (sujeto a aprobación). Ofrecemos atención estética en nuestros dos consultorios, Orlando y Ocoee.',
          ],
          orlandoOnly: [
            'Su sonrisa es única, y la atención estética debe reflejar lo que usted imagina, sin descuidar su salud bucal a largo plazo. Ya sea que busque mejoras sutiles o un cambio completo, diseñamos cada tratamiento en torno a sus objetivos.',
            '**Carillas de porcelana:** láminas ultrafinas hechas a medida que se adhieren a la parte frontal de los dientes para mejorar el color, la forma, la simetría y la alineación con un acabado natural.',
            '**Diseño de sonrisa en conjunto:** un proceso de planificación paso a paso en el que el Dr. Khan trabaja directamente con usted para definir el aspecto general de su sonrisa antes de comenzar el tratamiento.',
            'Para que su tratamiento se ajuste cómodamente a su presupuesto, ofrecemos planes de pago flexibles a través de nuestras empresas de financiamiento (sujeto a aprobación). Ofrecemos atención estética en nuestro consultorio de Orlando.',
          ],
        },
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
        lead: 'Cuidados preventivos gentis para manter seu sorriso saudável, bonito e forte.',
        paragraphs: {
          withOcoee: ['Limpezas e revisões de rotina a cada seis meses nos permitem proteger sua saúde bucal e tratar pequenos problemas antes que se tornem grandes. Fazemos radiografias digitais apenas quando são clinicamente necessárias para um diagnóstico completo. O atendimento de higiene dental está disponível nos nossos dois consultórios, Orlando e Ocoee.'],
          orlandoOnly: ['Limpezas e revisões de rotina a cada seis meses nos permitem proteger sua saúde bucal e tratar pequenos problemas antes que se tornem grandes. Fazemos radiografias digitais apenas quando são clinicamente necessárias para um diagnóstico completo. O atendimento de higiene dental está disponível no nosso consultório de Orlando.'],
        },
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
        lead: 'Cuidado gentil e atencioso, focado na sua saúde e no seu conforto a longo prazo.',
        paragraphs: [
          'Quando um dente está muito danificado ou não pode ser salvo, uma extração cuidadosa costuma ser o passo certo para aliviar a dor e proteger o restante do seu sorriso. Realizamos extrações no mesmo dia sempre que clinicamente adequado e a agenda permitir.',
          'Antes de qualquer tratamento começar, o Dr. Sheryar Khan vai explicar os resultados do seu diagnóstico, apresentar as suas opções em linguagem clara e garantir que você se sinta totalmente confortável com o seu plano de cuidados.',
        ],
        note: 'Observação: para casos cirúrgicos especializados ou complexos, que vão além do atendimento geral, trabalhamos em estreita colaboração com parceiros locais de confiança em cirurgia oral para garantir que você receba o tratamento mais seguro possível.',
      },
      restorative: {
        title: 'Restaurações e cuidados restauradores',
        heading: 'Restaurações e cuidados restauradores',
        titleTag: 'Restaurações e cuidados restauradores',
        summary: '',
        listLabel: 'Restaurações e cuidados restauradores',
        description: 'Restaurações e outros tratamentos restauradores reparam dentes danificados por cárie, rachaduras ou quebras.',
        lead: 'Recupere a força, a função e a aparência natural do seu sorriso.',
        paragraphs: {
          withOcoee: ['Seja para reparar cáries leves, rachaduras ou quebras, nosso tratamento restaurador foi pensado para parecer natural e ser sentido como os seus próprios dentes. O Dr. Sheryar Khan utiliza materiais duráveis da cor do dente, que se integram ao seu sorriso e protegem a sua saúde bucal a longo prazo sem abrir mão da estética.', 'Tratamentos restauradores completos estão disponíveis nos nossos dois consultórios, Orlando e Ocoee.'],
          orlandoOnly: ['Seja para reparar cáries leves, rachaduras ou quebras, nosso tratamento restaurador foi pensado para parecer natural e ser sentido como os seus próprios dentes. O Dr. Sheryar Khan utiliza materiais duráveis da cor do dente, que se integram ao seu sorriso e protegem a sua saúde bucal a longo prazo sem abrir mão da estética.', 'Tratamentos restauradores completos estão disponíveis no nosso consultório de Orlando.'],
        },
      },
      crowns: {
        title: 'Coroas',
        heading: 'Coroas dentárias',
        titleTag: 'Coroas dentárias',
        summary: '',
        listLabel: 'Coroas',
        description: 'Uma coroa cobre e protege um dente danificado ou enfraquecido. As coroas exigem um trabalho de laboratório odontológico.',
        lead: 'Proteção feita sob medida para devolver ao seu dente a força, a função e a aparência.',
        paragraphs: [
          'Uma coroa dentária funciona como uma cobertura protetora que envolve por completo um dente enfraquecido ou danificado, restaurando a sua estrutura e prevenindo outros problemas de saúde. Como cada coroa é feita sob medida por um laboratório odontológico especializado, para um encaixe preciso e uma aparência natural, o tratamento é concluído em duas consultas agendadas, e não no mesmo dia.',
          'Se você estiver com dor ou com uma lesão dentária urgente, o preparo inicial da coroa pode começar durante um atendimento de emergência para estabilizar o seu dente imediatamente. O Dr. Sheryar Khan vai explicar cada etapa do processo para que você se sinta confiante e bem informado durante todo o tratamento.',
        ],
      },
      'root-canal': {
        title: 'Tratamento de canal',
        heading: 'Tratamento de canal',
        titleTag: 'Tratamento de canal',
        summary: '(Orlando)',
        listLabel: 'Tratamento de canal (Orlando)',
        description: 'O tratamento de canal é realizado no nosso consultório de Orlando.',
        lead: 'Salve o seu dente natural e acabe com a dor de dente com um cuidado gentil e focado.',
        paragraphs: {
          withOcoee: [
            'O tratamento de canal é um procedimento rotineiro que alivia a dor de dente intensa e preserva o seu sorriso natural. Quando o tecido mole interno do dente (a polpa) fica inflamado ou infectado por uma cárie profunda ou uma lesão, removemos com cuidado o tecido infectado, limpamos e selamos bem o interior e restauramos o dente para que ele volte a funcionar com conforto.',
            '**Observação sobre o local:** os tratamentos de canal são realizados exclusivamente no nosso consultório de Orlando. Se você é paciente de Ocoee e precisa de tratamento de canal, nossa equipe vai coordenar a sua consulta no consultório de Orlando sem complicações.',
            '**Encaminhamentos especializados:** para retratamentos de canal ou casos de canal muito complexos, trabalhamos em estreita colaboração com endodontistas locais de confiança para que você receba um atendimento especializado.',
          ],
          orlandoOnly: [
            'O tratamento de canal é um procedimento rotineiro que alivia a dor de dente intensa e preserva o seu sorriso natural. Quando o tecido mole interno do dente (a polpa) fica inflamado ou infectado por uma cárie profunda ou uma lesão, removemos com cuidado o tecido infectado, limpamos e selamos bem o interior e restauramos o dente para que ele volte a funcionar com conforto.',
            '**Observação sobre o local:** os tratamentos de canal são realizados exclusivamente no nosso consultório de Orlando.',
            '**Encaminhamentos especializados:** para retratamentos de canal ou casos de canal muito complexos, trabalhamos em estreita colaboração com endodontistas locais de confiança para que você receba um atendimento especializado.',
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
        lead: 'Uma solução permanente e de aparência natural para substituir dentes perdidos e renovar a sua confiança.',
        paragraphs: [
          'Os implantes dentários são uma substituição durável e de aparência natural para dentes perdidos. Ao substituir a própria raiz do dente, o implante cria uma base firme e duradoura para uma coroa, uma ponte ou um dente de substituição feitos sob medida, devolvendo a função completa da mastigação, ajudando a preservar a estrutura do maxilar e se integrando ao seu sorriso.',
          'O Dr. Khan oferece tratamento com implantes como parte da sua clínica geral. Ele trabalha junto com você para planejar o tratamento em etapas claras e transparentes, para que você sempre saiba o que esperar. Dependendo da sua avaliação clínica e da disponibilidade de agenda, pode haver opções de colocação de implantes no mesmo dia.',
        ],
      },
      dentures: {
        title: 'Prótese dentária',
        heading: 'Prótese dentária',
        titleTag: 'Prótese dentária',
        summary: '',
        listLabel: 'Prótese dentária',
        description: 'A prótese dentária substitui dentes ausentes. O Dr. Khan vai explicar as opções e o processo para você.',
        lead: 'Substituição dentária confortável e de aparência natural, pensada para devolver o seu sorriso e a sua confiança.',
        paragraphs: {
          withOcoee: [
            'A falta de dentes não deve impedir você de aproveitar as suas comidas favoritas, falar com clareza ou sorrir com confiança. As dentaduras modernas oferecem uma solução confortável e feita sob medida, adaptada aos seus traços faciais naturais, que devolve a função completa ao seu sorriso.',
            'Seja uma dentadura total ou parcial, o Dr. Khan vai explicar cada opção e cada etapa do processo durante a sua consulta, para que o seu novo sorriso fique firme e natural. O atendimento completo em dentaduras está disponível nos nossos dois consultórios, Orlando e Ocoee.',
          ],
          orlandoOnly: [
            'A falta de dentes não deve impedir você de aproveitar as suas comidas favoritas, falar com clareza ou sorrir com confiança. As dentaduras modernas oferecem uma solução confortável e feita sob medida, adaptada aos seus traços faciais naturais, que devolve a função completa ao seu sorriso.',
            'Seja uma dentadura total ou parcial, o Dr. Khan vai explicar cada opção e cada etapa do processo durante a sua consulta, para que o seu novo sorriso fique firme e natural. O atendimento completo em dentaduras está disponível no nosso consultório de Orlando.',
          ],
        },
      },
      'clear-aligners-braces': {
        title: 'Alinhadores transparentes e aparelho fixo',
        heading: 'Alinhadores transparentes e aparelho fixo',
        titleTag: 'Alinhadores transparentes e aparelho fixo',
        summary: '',
        listLabel: 'Alinhadores transparentes e aparelho fixo',
        description: 'O Dr. Khan oferece alinhadores transparentes e aparelho fixo tradicional.',
        lead: 'Alinhe os seus dentes com opções adaptadas ao seu estilo de vida, ao seu conforto e aos seus objetivos.',
        paragraphs: {
          withOcoee: [
            'Um sorriso bem alinhado não só aumenta a sua confiança, como também favorece a saúde bucal a longo prazo e a função mastigatória. A Contemporary Dental Care oferece alinhadores transparentes e aparelhos tradicionais para ajudar você a conquistar um sorriso alinhado e saudável do seu jeito.',
            '**Alinhadores transparentes:** uma série de placas feitas sob medida e praticamente invisíveis que guiam os seus dentes suavemente até a posição certa. Como são removíveis, você pode comer, beber, escovar os dentes e usar fio dental com total liberdade.',
            '**Aparelhos tradicionais:** um sistema consagrado, com bráquetes e fios, que oferece um alinhamento preciso e eficaz para uma grande variedade de casos. Pela sua confiabilidade e versatilidade comprovadas, os aparelhos tradicionais representam a maior parte dos nossos tratamentos ortodônticos.',
            'Consultas e tratamentos ortodônticos completos são oferecidos nos nossos dois consultórios, Orlando e Ocoee.',
          ],
          orlandoOnly: [
            'Um sorriso bem alinhado não só aumenta a sua confiança, como também favorece a saúde bucal a longo prazo e a função mastigatória. A Contemporary Dental Care oferece alinhadores transparentes e aparelhos tradicionais para ajudar você a conquistar um sorriso alinhado e saudável do seu jeito.',
            '**Alinhadores transparentes:** uma série de placas feitas sob medida e praticamente invisíveis que guiam os seus dentes suavemente até a posição certa. Como são removíveis, você pode comer, beber, escovar os dentes e usar fio dental com total liberdade.',
            '**Aparelhos tradicionais:** um sistema consagrado, com bráquetes e fios, que oferece um alinhamento preciso e eficaz para uma grande variedade de casos. Pela sua confiabilidade e versatilidade comprovadas, os aparelhos tradicionais representam a maior parte dos nossos tratamentos ortodônticos.',
            'Consultas e tratamentos ortodônticos completos são oferecidos no nosso consultório de Orlando.',
          ],
        },
      },
      cosmetic: {
        title: 'Odontologia estética',
        heading: 'Odontologia estética',
        titleTag: 'Odontologia estética',
        summary: '',
        listLabel: 'Odontologia estética',
        description: 'Lentes de contato dental, design do sorriso e outros tratamentos estéticos, planejados de acordo com os seus objetivos e a sua saúde bucal.',
        lead: 'Uma abordagem personalizada para realçar o seu sorriso natural com confiança e cuidado.',
        paragraphs: {
          withOcoee: [
            'O seu sorriso é único, e o cuidado estético deve refletir o que você imagina, protegendo a sua saúde bucal a longo prazo. Seja para pequenos ajustes ou para uma transformação completa, planejamos cada tratamento em torno dos seus objetivos.',
            '**Facetas de porcelana:** lâminas ultrafinas feitas sob medida, coladas na parte da frente dos dentes para melhorar a cor, a forma, a simetria e o alinhamento com um acabamento natural.',
            '**Planejamento do sorriso em conjunto:** um processo de planejamento passo a passo em que o Dr. Khan trabalha diretamente com você para definir a estética geral do seu sorriso antes mesmo de o tratamento começar.',
            'Para que o tratamento caiba confortavelmente no seu orçamento, há planos de pagamento flexíveis por meio dos nossos parceiros de financiamento (sujeito a aprovação). O atendimento estético é oferecido nos nossos dois consultórios, Orlando e Ocoee.',
          ],
          orlandoOnly: [
            'O seu sorriso é único, e o cuidado estético deve refletir o que você imagina, protegendo a sua saúde bucal a longo prazo. Seja para pequenos ajustes ou para uma transformação completa, planejamos cada tratamento em torno dos seus objetivos.',
            '**Facetas de porcelana:** lâminas ultrafinas feitas sob medida, coladas na parte da frente dos dentes para melhorar a cor, a forma, a simetria e o alinhamento com um acabamento natural.',
            '**Planejamento do sorriso em conjunto:** um processo de planejamento passo a passo em que o Dr. Khan trabalha diretamente com você para definir a estética geral do seu sorriso antes mesmo de o tratamento começar.',
            'Para que o tratamento caiba confortavelmente no seu orçamento, há planos de pagamento flexíveis por meio dos nossos parceiros de financiamento (sujeito a aprovação). O atendimento estético é oferecido no nosso consultório de Orlando.',
          ],
        },
      },
    },
  },
};
