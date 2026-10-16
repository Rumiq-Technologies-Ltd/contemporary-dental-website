import styles from './membership.module.css';

export interface MembershipPlan {
  name: string;
  ages: string;
  price: string;
  activationFee: string;
  features: readonly string[];
}

interface PlanCardsProps {
  plans: readonly MembershipPlan[];
  /** The period after the monthly price, for example "/mo.". */
  perMonth: string;
}

// One card per membership plan: the name and who it is for, the monthly price, the one-time
// activation fee, and what the plan includes.
export function PlanCards({ plans, perMonth }: PlanCardsProps) {
  return <ul className={styles.grid}>
    {plans.map(plan => <li key={plan.name} className={styles.card} data-reveal="flip">
      <h3 className={styles.name}>{plan.name}</h3>
      <p className={styles.ages}>{plan.ages}</p>
      <p className={styles.price}>{plan.price}<span>{perMonth}</span></p>
      <p className={styles.activation}>{plan.activationFee}</p>
      <ul className={styles.features}>
        {plan.features.map(feature => <li key={feature}>{feature}</li>)}
      </ul>
    </li>)}
  </ul>;
}
