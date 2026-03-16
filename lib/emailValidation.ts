// Regex RFC 5322 simplificada — cobre 99% dos casos reais
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

// Domínios conhecidos de e-mail descartável / temporário
export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.de", "guerrillamail.biz", "guerrillamail.info", "grr.la",
  "sharklasers.com", "spam4.me", "trashmail.com", "trashmail.at", "trashmail.io",
  "trashmail.me", "trashmail.net", "dispostable.com", "10minutemail.com",
  "10minutemail.net", "maildrop.cc", "mailnesia.com", "mailnull.com",
  "spamgourmet.com", "throwaway.email", "yopmail.com", "yopmail.fr",
  "cool.fr.nf", "jetable.fr.nf", "nospam.ze.tc", "nomail.xl.cx",
  "mega.zik.dj", "speed.1s.fr", "courriel.fr.nf", "moncourrier.fr.nf",
  "monemail.fr.nf", "monmail.fr.nf", "tempmail.com", "tempmail.net",
  "tempmail.org", "temp-mail.org", "fakeinbox.com", "mailtemporaire.fr",
  "throwam.com", "getnada.com", "filzmail.com", "spamfree24.org",
  "spamfree24.de", "spamfree24.net", "spamfree24.com", "objectmail.com",
  "obobbo.com", "oneoffemail.com", "onewaymail.com", "rppkn.com",
]);

/** Validação de formato — usada tanto no frontend quanto no backend */
export function isValidEmailFormat(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/** Verifica se o domínio está na lista de descartáveis */
export function isDisposableDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.has(domain);
}
