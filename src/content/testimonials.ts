// Patient reviews for the website, copied word for word from docs/CD Website_Testimonials.xlsx.
// A review appears only when its reviewer's written authorization is recorded (the sheet's
// "Authorization received?" column) and it has no hold. Never edit a reviewer's words to clear a
// hold: leave the review out instead.
// Written authorization for all eight reviewers was confirmed by the practice on 20 October 2026.
// Record it in the spreadsheet's column too, so both stay in step.

export interface Testimonial {
  id: string;
  /** As the reviewer gave it: first name and last initial. */
  name: string;
  quote: string;
  /** Mirrors the spreadsheet's "Authorization received?" column. */
  authorizationReceived: boolean;
  /** Why the review cannot be published anywhere as written. */
  hold?: string;
  /**
   * Why the review stays off the homepage, which is an ad landing page with its own banned wording.
   * It still appears on the reviews page.
   */
  homepageHold?: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    id: 'judian-d',
    name: 'Judian D.',
    quote: 'This was my first time at Contemporary Dental and I am absolutely impressed and satisfied. The staff was friendly and showed genuine care and interest . . . This definitely will be my place for future dental care.',
    authorizationReceived: true,
  },
  {
    id: 'brian-c',
    name: 'Brian C.',
    quote: 'Had an emergency dental situation that needed to be addressed before I left town in the morning. They were available on Sunday and did a great job taking care of my problem. Dr Khan was very personable and professional. Highly recommend.',
    authorizationReceived: true,
    hold: 'Says the practice was available on a Sunday. C14 §3.1 bars Sunday availability claims, and a review cannot be edited.',
  },
  {
    id: 'declan-r',
    name: 'Declan R.',
    quote: 'While on vacation, I was concerned about a few issues. Came to see Dr Khan and his team. . . I immediately felt at ease . . . (with a few good laughs!) . . . Not once was I felt pressured into anything (especially for me being a tourist) but I was felt more welcomed to make me want to return in the future if needs be. Thank You Dr Khan and your team. Everything was very much appreciated',
    authorizationReceived: true,
  },
  {
    id: 'melba-z',
    name: 'Melba Z.',
    quote: 'Dr. Khan took the time to explain every step of my treatment and answered all my questions with patience and care. I really appreciated how gentle they were during my procedure. I left feeling confident and well taken care of. Highly recommend this office to anyone looking for a dentist who truly cares about their patients . . . The entire team is friendly, professional and made me feel completely comfortable from start to finish.',
    authorizationReceived: true,
  },
  {
    id: 'mayank-o',
    name: 'Mayank O.',
    quote: 'I\'ve been seeing Dr. Khan for a while now, and I can honestly say it\'s the best dental experience I\'ve had. Dr. Khan is not only skilled, but also down-to-earth and easy to talk to. You never feel rushed, and they actually take the time to explain what\'s going on and why something needs to be done. . . It doesn\'t feel like a typical clinic — there\'s a calm vibe, and you can tell they\'ve put effort into making the space feel welcoming. If you\'re someone who usually dreads going to the dentist, this place will change your mind. Dr. Khan\'s approach is thoughtful, honest, and genuinely caring. I\'m really glad I found this clinic.',
    authorizationReceived: true,
    homepageHold: 'Uses "best", which the landing page brief bars on the homepage (tests/launch.spec.ts).',
  },
  {
    id: 'nilson-d',
    name: 'Nilson D.',
    quote: 'I\'ve had an excellent experience with Dr. Khan, Bruno, and the entire team at Contemporary Dental Care, both at the John Young Parkway and Ocoee locations. From the moment I walked in, they put together a clear treatment plan and executed it flawlessly. The staff is always friendly, with a positive attitude and a warm smile, making me feel completely welcome every time I visit. Highly recommend!',
    authorizationReceived: true,
  },
  {
    id: 'steph',
    name: 'Steph',
    quote: 'I\'ve always dreaded going to the dentist — until I found this office!! They\'re so patient, kind, and really care about their patients. For anyone putting off that appointment, trust me… this place will change how you feel about going to the dentist.',
    authorizationReceived: true,
  },
  {
    id: 'samuel-j',
    name: 'Samuel J.',
    quote: 'Best staffing I have ever came across on . . . very friendly and kind and helpful in any kind of way, made me feel like family while I was in there . . . if you want your teeth clean and other great service I definitely recommend this place . . . Front desk was great, best customer service I have ever had.',
    authorizationReceived: true,
    homepageHold: 'Uses "best", which the landing page brief bars on the homepage (tests/launch.spec.ts).',
  },
];

/** The reviews that may be shown anywhere: authorized and with no hold. They all appear on the reviews page. */
export const publishedTestimonials: readonly Testimonial[] = testimonials.filter(review => review.authorizationReceived && !review.hold);

/** The published reviews that may also appear on the homepage. */
export const homepageTestimonials: readonly Testimonial[] = publishedTestimonials.filter(review => !review.homepageHold);
