import { ZODIAC_SIGN } from "./horoscopeService";

export function calculateZodiacSign(birthdate: Date): ZODIAC_SIGN {
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();

  // Traditional zodiac date ranges
  // Note: Some sources vary by a day or two, these are commonly accepted ranges

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return ZODIAC_SIGN.Aries;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return ZODIAC_SIGN.Taurus;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return ZODIAC_SIGN.Gemini;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return ZODIAC_SIGN.Cancer;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return ZODIAC_SIGN.Leo;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return ZODIAC_SIGN.Virgo;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return ZODIAC_SIGN.Libra;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return ZODIAC_SIGN.Scorpio;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return ZODIAC_SIGN.Sagittarius;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return ZODIAC_SIGN.Capricorn;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return ZODIAC_SIGN.Aquarius;

  // Default to Pisces for remaining dates (Feb 19 - Mar 20)
  return ZODIAC_SIGN.Pisces;
}

// TODO: Could use a library like moment.js or date-fns for more robust validation
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
