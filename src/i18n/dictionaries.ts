import type { Locale } from './locales';
import { about } from './messages/about';
import { common } from './messages/common';
import { enquiry } from './messages/enquiry';
import { home } from './messages/home';
import { locations } from './messages/locations';
import { money } from './messages/money';
import { services } from './messages/services';
import { visit } from './messages/visit';

/** Every message area for one language. Each area is typed by its English source. */
export function getMessages(locale: Locale) {
  return {
    common: common[locale],
    enquiry: enquiry[locale],
    home: home[locale],
    services: services[locale],
    visit: visit[locale],
    money: money[locale],
    about: about[locale],
    locations: locations[locale],
  };
}

export type Messages = ReturnType<typeof getMessages>;
