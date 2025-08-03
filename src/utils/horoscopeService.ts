export enum ZODIAC_SIGN {
  Aries = "Aries",
  Taurus = "Taurus",
  Gemini = "Gemini",
  Cancer = "Cancer",
  Leo = "Leo",
  Virgo = "Virgo",
  Libra = "Libra",
  Scorpio = "Scorpio",
  Sagittarius = "Sagittarius",
  Capricorn = "Capricorn",
  Aquarius = "Aquarius",
  Pisces = "Pisces",
}

// Mock horoscope data for each zodiac sign
// TODO: In production, this would likely come from an external API

const HOROSCOPES = {
  [ZODIAC_SIGN.Aries]: [
    "Today brings exciting opportunities for new beginnings.",
    "Your natural leadership shines through challenges.",
    "Bold decisions lead to unexpected rewards.",
    "Energy levels are high - tackle that big project.",
    "A chance encounter may spark new inspiration.",
  ],
  [ZODIAC_SIGN.Taurus]: [
    "Stability and comfort guide your choices today.",
    "Focus on what truly matters to you.",
    "Your practical nature solves complex problems.",
    "Financial opportunities require careful consideration.",
    "Patience with others brings unexpected rewards.",
  ],
  [ZODIAC_SIGN.Gemini]: [
    "Communication flows easily with others.",
    "Your curious mind discovers fascinating insights.",
    "Versatility becomes your greatest strength.",
    "Social connections open new doors.",
    "Information gathering leads to smart decisions.",
  ],
  [ZODIAC_SIGN.Cancer]: [
    "Emotional intuition guides important decisions.",
    "Family and home bring comfort and joy.",
    "Your caring nature touches someone deeply.",
    "Trust your feelings about a recent situation.",
    "Nurturing others also nurtures your soul.",
  ],
  [ZODIAC_SIGN.Leo]: [
    "Your charisma attracts positive attention.",
    "Creative expression brings fulfillment.",
    "Leadership opportunities present themselves.",
    "Confidence opens doors you didn't expect.",
    "Others look to you for inspiration today.",
  ],
  [ZODIAC_SIGN.Virgo]: [
    "Attention to detail serves you well.",
    "organization brings clarity to confusion.",
    "Your helpful nature makes a real difference.",
    "Practical solutions emerge from careful analysis.",
    "Health and wellness deserve extra attention.",
  ],
  [ZODIAC_SIGN.Libra]: [
    "Balance and harmony guide your path.",
    "Relationships flourish under your care.",
    "Beauty and art inspire your soul.",
    "Diplomatic skills resolve conflicts gracefully.",
    "Partnership brings mutual benefits.",
  ],
  [ZODIAC_SIGN.Scorpio]: [
    "Deep insights reveal hidden truths.",
    "Transformation brings positive change.",
    "Your intensity creates meaningful connections.",
    "Research uncovers valuable information.",
    "Trust your instincts about people's motives.",
  ],
  [ZODIAC_SIGN.Sagittarius]: [
    "Adventure calls your name today.",
    "New horizons expand your worldview.",
    "Freedom and growth align perfectly.",
    "Learning something new brings joy.",
    "Your optimism lifts others' spirits.",
  ],
  [ZODIAC_SIGN.Capricorn]: [
    "Steady progress toward goals satisfies.",
    "Discipline yields concrete results.",
    "Leadership responsibilities suit you well.",
    "Long-term planning pays off today.",
    "Your reputation opens important doors.",
  ],
  [ZODIAC_SIGN.Aquarius]: [
    "Innovation sets you apart from others.",
    "Your unique perspective inspires change.",
    "Technology aids your vision.",
    "Humanitarian efforts bring fulfillment.",
    "Friends appreciate your originality.",
  ],
  [ZODIAC_SIGN.Pisces]: [
    "Intuition and creativity flow freely.",
    "Dreams merge beautifully with reality.",
    "Compassion guides your interactions.",
    "Artistic pursuits bring unexpected joy.",
    "Spiritual insights provide clarity.",
  ],
};

export function generateHoroscope(
  zodiacSign: ZODIAC_SIGN,
  date: Date = new Date()
): string {
  const options = HOROSCOPES[zodiacSign];

  if (!options) {
    return "The stars hold mystery today. Focus on your inner wisdom.";
  }

  const dateStr = date.toISOString().split("T")[0];

  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = seed + dateStr.charCodeAt(i);
  }

  const index = seed % options.length;

  return options[index];
}
