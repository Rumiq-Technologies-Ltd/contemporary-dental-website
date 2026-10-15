import { Resend } from 'resend';

export interface OutgoingEmail {
  to: string;
  subject: string;
  text: string;
}

/**
 * Sends one plain-text email through Resend. Throws when the service is not configured or Resend
 * rejects the send. The error's name is the only detail reported, so no email content reaches logs.
 */
export async function sendEmail({ to, subject, text }: OutgoingEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) throw new Error('Email is not configured.');

  const { error } = await new Resend(apiKey).emails.send({ from, to, subject, text });
  if (error) throw new Error(`Resend rejected the email: ${error.name}`);
}
