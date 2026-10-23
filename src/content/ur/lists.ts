import type {
  CertificateText,
  RoleText,
  ServiceText,
  SkillGroupText,
  TestimonialText,
} from "@/types/content"

// Urdu wording of the list files in src/content. Every list has the same order as its English file.
// Tech names (React.js, Node.js, MongoDB ...) stay in English on purpose: that is how they are written everywhere.

export const servicesUr: ServiceText[] = [
  {
    name: "فل اسٹیک ویب ایپس",
    description:
      "ہر فیچر شروع سے آخر تک: ڈیٹا ماڈل، REST API اور اس کے اوپر ریسپانسو انٹرفیس، MERN اسٹیک اور ٹائپ اسکرپٹ کے ساتھ۔",
    tags: ["Next.js", "React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "ای کامرس اور PWAs",
    description:
      "کیٹلاگ، کارٹ اور چیک آؤٹ والے اسٹورز اور انسٹال ہونے والی ویب ایپس، جو موبائل فرسٹ انداز میں اس طرح ڈیزائن کی جاتی ہیں جیسے لوگ حقیقت میں خریداری کرتے ہیں۔",
    tags: ["PWA", "کارٹ اور چیک آؤٹ", "Cloudinary", "Vercel"],
  },
  {
    name: "APIs اور ڈیٹا بیس",
    description:
      "صاف ستھری REST APIs اور اچھی ساخت کے ڈیٹا ماڈل جو معلومات تک محفوظ رسائی دیتے ہیں اور آسانی سے برقرار رکھے جا سکتے ہیں۔",
    tags: ["REST API ڈیزائن", "MongoDB", "PostgreSQL", "Firebase", "Supabase"],
  },
  {
    name: "پورٹ فولیو اور بزنس سائٹس",
    description:
      "تیز اور قابلِ رسائی مارکیٹنگ سائٹس اور پورٹ فولیوز، سوچی سمجھی ٹائپوگرافی، ہموار حرکت اور صاف، قابلِ ترمیم مواد کے ساتھ۔",
    tags: ["Next.js", "Tailwind CSS", "Motion", "SEO"],
  },
]

export const experienceUr: RoleText[] = [
  {
    title: "فل اسٹیک ویب ڈویلپمنٹ انٹرن",
    organisation: "Teyzix Core Pvt. Ltd.",
    description:
      "ایک عملی انٹرن شپ مکمل کی جس میں حقیقی ٹیم پروجیکٹس میں حصہ لیا، اور لائیو ڈویلپمنٹ ماحول میں React.js، Node.js، Express.js اور REST API ڈویلپمنٹ کو استعمال کیا۔",
    tags: ["React.js", "Node.js", "Express.js", "REST API"],
  },
  {
    title: "فل اسٹیک ویب ڈویلپمنٹ پروگرام",
    organisation: "سیلانی ماس آئی ٹی ٹریننگ (SMIT)",
    description:
      "React.js اور Next.js کے ساتھ اعلیٰ کارکردگی کی ایپلی کیشنز بنانے میں مہارت حاصل کی، اور Node.js، Express.js اور RESTful API آرکیٹیکچر کے ساتھ سرور سائیڈ پروگرامنگ میں مہارت پائی۔",
    tags: ["React.js", "Next.js", "Node.js", "Express.js"],
  },
  {
    title: "انفارمیشن ٹیکنالوجی میں ڈپلومہ",
    organisation: "میمن انڈسٹریل اینڈ ٹیکنیکل انسٹی ٹیوٹ (MITI)",
    description:
      "سافٹ ویئر پروگرامنگ، ریلیشنل ڈیٹا بیس ڈیزائن اور جدید ویب ڈویلپمنٹ آرکیٹیکچر میں بنیادی کورس ورک۔",
    tags: ["پروگرامنگ", "ڈیٹا بیس", "ویب آرکیٹیکچر"],
  },
]

export const skillsUr: SkillGroupText[] = [
  { name: "فرنٹ اینڈ" },
  { name: "بیک اینڈ" },
  { name: "ڈیٹا بیس" },
  { name: "ٹولز اور دیگر" },
]

// DUMMY, like the English entries: placeholders to replace with real credentials.
export const certificatesUr: CertificateText[] = [
  { title: "عارضی سند: فل اسٹیک ویب ڈویلپمنٹ", issuer: "عارضی ادارہ", type: "سرٹیفکیٹ" },
  { title: "عارضی سند: Node.js اور Express", issuer: "عارضی ادارہ", type: "کورس" },
  { title: "عارضی سند: React اور Next.js", issuer: "عارضی ادارہ", type: "کورس" },
  { title: "عارضی سند: MongoDB کی بنیادیں", issuer: "عارضی ادارہ", type: "سرٹیفکیٹ" },
  { title: "عارضی سند: ریسپانسو ویب ڈیزائن", issuer: "عارضی ادارہ", type: "کورس" },
]

// DUMMY, like the English entries.
export const testimonialsUr: TestimonialText[] = [
  {
    text: "عارضی رائے۔ اسے آپ کے ساتھ کام کرنے کے بارے میں ایک حقیقی رائے سے بدل دیں: آپ نے کیا بنایا، آپ کا رابطہ کیسا رہا، اور ان کے لیے کیا بدلا۔",
    author: "کلائنٹ کا نام",
    role: "عہدہ، کمپنی (عارضی)",
  },
  {
    text: "عارضی رائے۔ دوسری عارضی رائے، جو اتنی مختصر ہے کہ صفحے پر ایک بڑے بیان کے طور پر آرام سے پڑھی جا سکے۔",
    author: "ساتھی کا نام",
    role: "عہدہ، کمپنی (عارضی)",
  },
  {
    text: "عارضی رائے۔ تیسری عارضی رائے۔ حقیقی نام، عہدے اور الفاظ یہاں اس وقت آئیں گے جب آپ کے پاس وہ ہوں۔",
    author: "مینٹور کا نام",
    role: "عہدہ، کمپنی (عارضی)",
  },
]
