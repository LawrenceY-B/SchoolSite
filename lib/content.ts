/**
 * All site copy lives here so it can be edited without touching components.
 * Anything marked `TODO: confirm` is a plausible draft — check the facts with the school.
 */

export const school = {
  name: "The Shepherd's Infant School",
  shortName: "Shepherd's",
  motto: "Guide & Care",
  email: "hettywyb@gmail.com",
  phone: "024 433 1550",
  phoneHref: "tel:+233244331550",
  address: ["La Nkwantaneng, Madina Municipal", "Adenta West, Greater Accra", "Ghana"],
  hours: "Mon – Fri · 7:00am – 4:00pm", // TODO: confirm
  proprietress: "Mrs. Hetty Yirenkyi-Boafo",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2802134654107!2d-0.18562618481431847!3d5.6725678340423125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9d22372d52c7%3A0xd76e055e1b24409e!2sThe%20Shepherd's%20Infant%20School!5e0!3m2!1sen!2sgh!4v1677348542006!5m2!1sen!2sgh",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export type GalleryItem =
  | { kind: "image"; src: string; alt: string; tall?: boolean }
  | { kind: "tile"; label: string; glyph: string; color: "sun" | "sky" | "cherry" | "leaf" | "cream"; tall?: boolean };

// TODO: replace text tiles with real photos of school life as they become available.
const gallery: GalleryItem[] = [
  { kind: "image", src: "/images/building.png", alt: "The Shepherd's Infant School building", tall: true },
  { kind: "tile", label: "Story time", glyph: "Aa", color: "sun" },
  { kind: "tile", label: "Paint & play", glyph: "✺", color: "sky" },
  { kind: "image", src: "/images/sample.png", alt: "A teacher leading a lesson", tall: true },
  { kind: "tile", label: "Sing along", glyph: "♪", color: "cherry" },
  { kind: "tile", label: "First letters", glyph: "ABC", color: "leaf", tall: true },
  { kind: "tile", label: "Little explorers", glyph: "✿", color: "cream" },
];

export const home = {
  heroIntro:
    "A nursery and infant school in Madina, Accra, where curious little ones learn through play, faith and a whole lot of care.",
  marquee: ["Play", "Learn", "Grow", "Guide & Care", "Sing", "Explore", "Belong"],
  welcome:
    "Every child who walks through our gates is known by name, celebrated for who they are, and gently guided towards who they can become.",
  welcomeBody:
    "For years, families across Madina and Adenta have trusted Shepherd's with their children's very first steps into school. We keep classes small and days joyful, and we build every lesson around the simple belief that children learn best when they feel safe, seen and loved.",
  why: [
    {
      title: "Small classes, big attention",
      body: "Our teachers know every child's laugh, favourite colour and next learning step, because no one gets lost in a crowd.",
      doodle: "heads",
    },
    {
      title: "Learning through play",
      body: "Blocks become bridges, songs become sums and stories become adventures. Play is the serious work of childhood.",
      doodle: "squiggle",
    },
    {
      title: "Safe, warm and caring",
      body: "A secure compound, attentive staff and a home-from-home feeling, so parents can go to work with peace of mind.",
      doodle: "heart",
    },
    {
      title: "Faith and good values",
      body: "Like a shepherd with the flock, we guide with patience and kindness and teach respect, honesty and gratitude every day.",
      doodle: "crook",
    },
  ],
  // TODO: confirm all stats with the school.
  stats: [
    { value: 15, suffix: "+", label: "Years guiding little ones" },
    { value: 12, prefix: "1:", label: "Teacher to pupil ratio" },
    { value: 3, label: "Learning stages, Crèche to KG" },
  ],
  gallery,
};

export const about = {
  intro:
    "Since our founding, The Shepherd's Infant School has been a gentle first chapter for Madina's youngest learners: a place to grow in confidence, curiosity and character.",
  story:
    "We began with a simple promise to parents: we will guide your child as carefully as a shepherd guides the flock. That promise still shapes everything we do, from the way we greet each child at the gate to the way we celebrate their smallest wins.",
  mission:
    "To give every child a joyful, safe and stimulating start to education by nurturing their minds through play-based learning, their hearts through love and good values, and their confidence through teachers who truly know them.",
  missionMore:
    "We work hand in hand with parents, because a child's first teachers are at home. Together we lay foundations in literacy, numeracy, creativity and character that last a lifetime.",
  vision:
    "To be the most trusted early years school in Greater Accra: a community where children are guided with care, families feel at home, and every little one leaves ready, eager and kind.",
  values: [
    { name: "Love", body: "Every child is welcomed, valued and cared for as our own.", color: "cherry" },
    { name: "Curiosity", body: "We follow questions wherever they lead, and there are always more.", color: "sky" },
    { name: "Respect", body: "For one another, for our teachers, for our families and our world.", color: "leaf" },
    { name: "Joy", body: "Laughter is part of the lesson plan. Learning should feel like play.", color: "sun" },
    { name: "Faith", body: "We guide children in gratitude, honesty and good character.", color: "blue" },
  ],
  letter: [
    "Dear parents,",
    "When I started Shepherd's, I wanted to build the kind of school I would want for my own children: one where little ones are hugged as often as they are taught, and where every small step forward is noticed.",
    "Our teachers share that heart. We will guide your child, we will care for your child, and we will celebrate your child. Come and visit us. The kettle is on and the children will be delighted to show you around.",
  ],
};

export const academics = {
  intro:
    "Play-based, child-centred learning built on Ghana's Standards-Based Curriculum, with plenty of room for wonder.", // TODO: confirm curriculum
  approach:
    "Children learn by doing. Our classrooms are full of hands-on activities, songs, stories and outdoor exploration, carefully planned so that every game builds a skill and every skill builds confidence.",
  // TODO: confirm levels and age ranges offered.
  levels: [
    {
      title: "Crèche",
      meta: "Ages 1 – 2",
      color: "sun",
      body: "A calm, loving room where our littlest ones settle in, make friends and discover the world through their senses: sand, water, music and lots of cuddles.",
      tags: ["Sensory play", "First words", "Routines", "Movement"],
    },
    {
      title: "Nursery 1 & 2",
      meta: "Ages 2 – 4",
      color: "sky",
      body: "Through stories, rhymes and guided play, children build early language, counting and social skills, and learn to share, take turns and express themselves.",
      tags: ["Phonics", "Early numbers", "Rhymes & songs", "Creative arts"],
    },
    {
      title: "Kindergarten 1 & 2",
      meta: "Ages 4 – 6",
      color: "leaf",
      body: "We prepare children for primary school with confident reading, writing and number work, plus science, our world and our people, and plenty of creative projects.",
      tags: ["Reading & writing", "Numeracy", "Our World Our People", "ICT basics"],
    },
  ],
  subjects: ["Language & Literacy", "Numeracy", "Our World & Our People", "Creative Arts", "Music & Movement", "Religious & Moral", "Physical Play"],
  // TODO: confirm daily schedule.
  day: [
    { time: "7:00", title: "Arrival & free play", body: "Warm hellos, puzzles and building blocks while friends arrive." },
    { time: "8:00", title: "Morning devotion", body: "Songs, a short prayer and a thought for the day." },
    { time: "8:30", title: "Literacy & numeracy", body: "Focused small-group learning while minds are fresh." },
    { time: "10:00", title: "Snack & outdoor play", body: "Running, climbing, laughing and lots of fresh air." },
    { time: "11:00", title: "Creative arts & music", body: "Painting, crafting, drumming and dancing." },
    { time: "12:30", title: "Lunch & rest", body: "A healthy meal, then quiet time to recharge." },
    { time: "2:00", title: "Story time", body: "Gathering on the mat for a tale or two, then talking about it." },
    { time: "3:00", title: "Home time", body: "Tidy up, goodbye song and big hugs at the gate." },
  ],
};

export const admissions = {
  intro:
    "Joining the flock is simple. We welcome families all year round, so come and see us, ask anything, and let your child try a day with us.",
  steps: [
    {
      title: "Fill out a basic application",
      body: "Pick up a form at the school or ask us to send one. It takes a few minutes and tells us a little about your child.",
      color: "sun",
    },
    {
      title: "Schedule a personal visiting day",
      body: "Tour the classrooms, meet the teachers and the proprietress, and ask us everything. We love questions.",
      color: "sky",
    },
    {
      title: "Experience a day of school",
      body: "Your child spends a day with their future classmates, so the first real day already feels like coming home.",
      color: "cherry",
    },
  ],
  // TODO: confirm FAQ answers.
  faq: [
    {
      title: "What ages do you admit?",
      content: "We welcome children from about one year old through Kindergarten 2 (around age six).",
    },
    {
      title: "Can my child join in the middle of the term?",
      content: "Yes. We admit children all year round whenever space is available. Get in touch and we'll check the right class.",
    },
    {
      title: "What are the school hours?",
      content: "School runs Monday to Friday, 7:00am to around 3:00pm, with supervised care until 4:00pm.",
    },
    {
      title: "Do you provide meals?",
      content: "We encourage healthy packed lunches and provide a light snack. Ask us about our current meal arrangements.",
    },
    {
      title: "How much are the fees?",
      content: "Fees depend on your child's level. Call or email us and we'll gladly share the current fee schedule.",
    },
  ],
};

export const contact = {
  intro: "Questions, visits or just a friendly hello: we'd love to hear from you, and we usually reply within a day.",
};
