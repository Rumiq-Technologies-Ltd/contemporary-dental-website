import Link from 'next/link';
import type { CSSProperties } from 'react';
import { routes, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './whyus.module.css';

export async function WhyUs() {
  const lang = await getLocale();
  const { common, home } = getMessages(lang);
  const t = home.whyUs;

  // Every row restates the content file (About, Home, Emergency and New patients copy). The table
  // has one column on purpose: it lists what we offer and makes no claim about other dentists.
  const promises = [...t.promises, whenOcoee(t.phoneLines.withOcoee, t.phoneLines.orlandoOnly)];

  return <Screen id="why-us" labelledBy="why-us-title" className={styles.whyUs}>
    <div className={styles.intro}>
      <h2 id="why-us-title" data-reveal="mask">{t.heading}</h2>
      <div data-reveal=""><Link href={localePath(lang, routes.requestAppointment)} className="pill pill-outline pill-large">{common.requestAppointment}</Link></div>
    </div>
    <table className={styles.table} data-reveal="">
      <thead>
        <tr>
          <th scope="col"><span className="sr-only">{t.tableLabel}</span></th>
          <th scope="col" className={styles.brand}>Contemporary<br />Dental Care</th>
        </tr>
      </thead>
      <tbody>
        {promises.map((promise, index) => <tr key={promise} data-reveal="right" style={{ '--i': index } as CSSProperties}>
          <th scope="row">{promise}</th>
          <td className={styles.brand}><span className={styles.check}><Icon name="check" /><span className="sr-only">{t.yes}</span></span></td>
        </tr>)}
      </tbody>
    </table>
  </Screen>;
}
