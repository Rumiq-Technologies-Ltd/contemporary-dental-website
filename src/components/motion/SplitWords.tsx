import { Fragment, type CSSProperties, type ElementType } from 'react';

interface SplitWordsProps {
  as?: ElementType;
  text: string;
  id?: string;
  className?: string;
  /** Milliseconds before the first word starts. */
  delay?: number;
}

// Server component: each word rises out of a mask when the page first paints. The CSS lives
// in globals.css ("Motion"); without JavaScript or with reduced motion the words simply show.
// Headings keep their real text: an aria-label carries the sentence, the split spans are hidden,
// and real spaces sit between words so crawlers that strip tags still read the sentence.
export function SplitWords({ as: Component = 'span', text, id, className, delay = 0 }: SplitWordsProps) {
  const words = text.split(' ');
  let index = 0;
  return <Component id={id} className={className} aria-label={text} data-split="" style={{ '--d': `${delay}ms` } as CSSProperties}>
    {words.map((word, wordIndex) => <Fragment key={`${word}-${wordIndex}`}>
      {/* Hyphenated words split after each hyphen, so a long word can still wrap there on phones. */}
      {word.split(/(?<=-)/).map(part => <span key={`${part}-${index}`} className="split-mask" aria-hidden="true">
        <span className="split-unit" style={{ '--i': index++ } as CSSProperties}>{part}</span>
      </span>)}
      {wordIndex < words.length - 1 && ' '}
    </Fragment>)}
  </Component>;
}
