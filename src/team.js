/**
 * People shown on the Team page. Edit this file; no other code needs to change.
 *
 * - Names, roles and bios are per language: { en, he, ar }. Please check the Hebrew and Arabic spellings.
 * - photo: put an image in /public/team/ (for example '/team/rwad.jpg', a portrait about 800 x 1000)
 *   and set the path here. While it is empty, a placeholder with the Axiom mark is shown.
 * - links: anything left empty is hidden.
 *
 * The CEO's bio text lives in the language files (src/i18n/*.js, under team.ceo).
 */
export const ceo = {
  name: { en: 'Rwad Abuelhija', he: 'רואד אבו אלהיג׳ה', ar: 'رواد أبو الهيجاء' },
  photo: '',
  links: { linkedin: '', github: '' },
}

export const members = [
  {
    name: { en: 'Mohammad Hijazi', he: 'מוחמד חיג׳אזי', ar: 'محمد حجازي' },
    role: { en: 'Head of Development and Production', he: 'ראש תחום פיתוח וייצור', ar: 'مسؤول قسم التطوير والإنتاج' },
    study: { en: 'Computer scientist, specializing in artificial intelligence.', he: 'מדען מחשב, מתמחה בבינה מלאכותית.', ar: 'عالم حاسوب، متخصص في الذكاء الاصطناعي.' },
    bio: {
      en: 'Leads development and production, from the first prototype to a system that is ready to install.',
      he: 'מוביל את הפיתוח והייצור, מהאב־טיפוס הראשון ועד מערכת מוכנה להתקנה.',
      ar: 'يقود التطوير والإنتاج، من النموذج الأول حتى نظام جاهز للتركيب.',
    },
    photo: '',
  },
  {
    name: { en: 'Alaa Abuelhija', he: 'עלאא אבו אלהיג׳ה', ar: 'علاء أبو الهيجاء' },
    role: { en: 'Head of AI and Automation', he: 'ראש תחום בינה מלאכותית ואוטומציה', ar: 'مسؤول قسم الذكاء الاصطناعي والأتمتة' },
    study: { en: 'Information systems and computer vision.', he: 'מערכות מידע וראייה ממוחשבת.', ar: 'نظم المعلومات والرؤية الحاسوبية.' },
    bio: {
      en: 'Leads AI and automation, so repetitive work in your business runs by itself.',
      he: 'מוביל את תחום הבינה המלאכותית והאוטומציה, כדי שעבודה חוזרת בעסק שלכם תרוץ מעצמה.',
      ar: 'يقود الذكاء الاصطناعي والأتمتة، لتعمل المهام المتكررة في عملكم من تلقاء نفسها.',
    },
    photo: '',
  },
]
