type CookieOptions = {
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  expires?: number; // Durée en jours
};

// Fonction pour définir un cookie
const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const { domain, secure, sameSite, expires = 7 } = options;

  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + expires * 24 * 60 * 60 * 1000); // Durée de vie en jours

  let cookieString = `${name}=${value};expires=${expiresDate.toUTCString()};path=/`;

  if (domain) cookieString += `;domain=${domain}`;
  if (secure) cookieString += `;secure`;
  if (sameSite) cookieString += `;samesite=${sameSite}`;

  document.cookie = cookieString;
};

// Fonction pour obtenir un cookie
const getCookie = (name: string): string | null => {
  const nameEq = name + "=";
  const cookies = document.cookie.split(";");
  const cookie = cookies.map((c) => c.trim()).find((c) => c.startsWith(nameEq));

  return cookie ? cookie.substring(nameEq.length) : null;
};

// Fonction pour supprimer un cookie
const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

export { setCookie, getCookie, deleteCookie };
