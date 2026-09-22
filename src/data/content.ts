export const brand = {
  name: "Dharan Sports Studios",
  short: "DSS",
  tagline: "Unleash Your Potential",
  unit: "OXFS",
  parent: "OX & FOX Sports and Charitable Trust",
  founded: 2006,
  statusBadge: "TNCA & DISTRICT SELECTION TRIALS ACTIVE",
};

export const navLinks = [
  { label: "Profile & Mission", href: "#profile" },
  { label: "Leadership", href: "#leadership" },
  { label: "Coaching Matrix", href: "#coaching" },
  { label: "Pathways (TNCA)", href: "#pathways" },
  { label: "Locations", href: "#locations" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headline: "WHERE DISCIPLINE MEETS DOMINANCE.",
  subtitle:
    "Nurturing multi-sport athletes across Cricket, Traditional Silambam, Karate, and Archery under the OX & FOX Sports Trust.",
  ctas: {
    primary: { label: "Explore Coaching Batches", href: "#coaching" },
    secondary: { label: "View Academy Profile", href: "#profile" },
  },
};

export const stats = [
  { value: 250, suffix: "+", label: "Active Players" },
  { value: 17, suffix: "", label: "Years of Heritage" },
  { value: 7, suffix: "+", label: "Sport Programs" },
  { value: 95, suffix: "%", label: "Annual Retention" },
];

export const trustRibbon = [
  "TNCA LEAGUE",
  "CDCA LEAGUE",
  "OXFS CHARITABLE TRUST",
  "VAUMAN AGENCIES",
  "ESTD. 2006",
  "250+ ATHLETES",
];

export const profile = {
  organizationalBacking:
    "Dharan Sports Studios is operated under the OX & FOX Sports (OXFS) & Charitable Trust, founded in 2006 to support players who are gifted in sport but financially disadvantaged.",
  vision:
    "To be recognized as a premier institution dedicated to shaping the future of sports — cultivating driven athletes who embody excellence, integrity, and innovation.",
  mission:
    "Empower athletes of all ages and skill levels to unlock their full potential, both on and off the field.",
  coreValues: [
    {
      title: "Performance First",
      description: "Every session is measured against competitive standards, not just participation.",
    },
    {
      title: "Passion for Sport",
      description: "Coaching staff who chose this as a calling, not a job.",
    },
    {
      title: "Transparency",
      description: "Clear progress tracking and honest selection-trial feedback for every athlete.",
    },
    {
      title: "Reliability",
      description: "Consistent batches, consistent coaches — discipline built through routine.",
    },
    {
      title: "Premium Branding",
      description: "Facilities and delivery held to a standard worthy of district-level competition.",
    },
    {
      title: "Creative Fun",
      description: "Discipline without joy doesn't last — enjoyment is engineered into every drill.",
    },
  ],
};

export type LeadershipMember = {
  name: string;
  title: string;
  bio: string;
  credentials?: string[];
};

export const leadership: LeadershipMember[] = [
  {
    name: "Founder & CEO",
    title: "Founder & Chief Executive",
    bio: "Leads academy strategy, curriculum design, and athlete development philosophy across all four disciplines.",
    credentials: [
      "ICC Level 1 Certified",
      "PG Diploma, Fitness & Nutrition",
      "Assistant Yoga Teacher — Patanjali Group",
      "Master's Degree, Sports Science",
    ],
  },
  {
    name: "Nuthan Prasad",
    title: "Head of Operations",
    bio: "Focuses on delivering customized training plans and one-on-one coaching pathways for every athlete on the roster.",
  },
  {
    name: "Sankar M",
    title: "Trustee",
    bio: "Oversees tailored player-development approaches on behalf of the OX & FOX Sports and Charitable Trust.",
  },
];

export const pathwaySteps = [
  {
    step: "01",
    title: "Grassroots Scouting",
    description: "Open enrollment across Sithalapakkam and Medavakkam campuses — talent identified early, regardless of financial background.",
  },
  {
    step: "02",
    title: "Skill Nurturing Batches",
    description: "Structured weekly coaching across Cricket, Silambam, Karate, and Archery builds technical and mental fundamentals.",
  },
  {
    step: "03",
    title: "Selection Trials",
    description: "Open tryouts for Fast Bowlers, Spinners, and Middle-Order Batsmen feed directly into district-level trial pipelines.",
  },
  {
    step: "04",
    title: "CDCA / TNCA Representation",
    description: "Club-sponsored entries for district and state matches — zero fees for selected athletes, so focus stays purely on performance.",
  },
];

export const pathway = {
  divisions: [
    { name: "CDCA", full: "Chennai District Cricket Association" },
    { name: "TNCA", full: "Tamil Nadu Cricket Association" },
  ],
  trials: ["Fast Bowlers", "Spinners (Left-Arm / Off-Spin)", "Middle-Order Batsmen"],
  welfare:
    "Nominal monthly fees for practice nets, with club-sponsored entries for district/state matches so athletes can focus purely on performance.",
};

export type CoachingProgram = {
  id: "cricket" | "silambam" | "karate" | "archery";
  sport: string;
  schedule: { label: string; time: string }[];
  focus: string;
  focusAreas: string[];
};

export const coachingPrograms: CoachingProgram[] = [
  {
    id: "cricket",
    sport: "Cricket Skill Nurturing",
    schedule: [
      { label: "Morning · Tue, Wed & Thu", time: "6:00 AM – 7:00 AM" },
      { label: "Evening · Mon & Thu", time: "5:00 PM – 6:30 PM" },
    ],
    focus: "Pitch analysis, net simulations, biomechanical shot selection.",
    focusAreas: ["Attitude", "Strategy", "Fitness", "Bowling", "Batting", "Fielding"],
  },
  {
    id: "silambam",
    sport: "Silambam Skill Nurturing",
    schedule: [{ label: "Tue & Wed", time: "6:30 PM – 7:30 PM" }],
    focus: "Traditional Tamil martial arts, staff agility, footwork coordination, and defensive reflex conditioning.",
    focusAreas: ["Fitness", "Technique", "Footwork", "Reflexes"],
  },
  {
    id: "karate",
    sport: "Karate Skill Nurturing",
    schedule: [{ label: "Tue & Wed", time: "5:00 PM – 6:00 PM" }],
    focus: "Kata, Kumite, posture, balance, and self-defense discipline. (Budokai)",
    focusAreas: ["Discipline", "Self-Defense", "Kata", "Kumite"],
  },
  {
    id: "archery",
    sport: "Archery Skill Nurturing",
    schedule: [{ label: "Mon & Thu", time: "6:30 PM – 7:30 PM" }],
    focus: "Mental concentration, upper-body stability, release mechanics, and target consistency.",
    focusAreas: ["Precision", "Concentration", "Beginner → Advanced"],
  },
];

export const auxiliaryCohorts = [
  "Sports Nutrition & Hydration Planning",
  "Core Mobility & Yoga",
  "School Holiday & Summer Performance Bootcamps",
];

export type Campus = {
  id: string;
  name: string;
  tag: string;
  address: string;
  highlights: string[];
};

export const campuses: Campus[] = [
  {
    id: "sithalapakkam",
    name: "Campus 1 — Main Academy & Turfs",
    tag: "Sithalapakkam",
    address: "Palm Avenue, 5th Street, Sankarapuram, Sithalapakkam, Chennai - 600131",
    highlights: ["Primary nets", "Martial arts training floor", "Floodlit evening coaching"],
  },
  {
    id: "medavakkam",
    name: "Campus 2 — Branch Grounds",
    tag: "Medavakkam",
    address: "Sastha Nagar Main Road, Sowmya Nagar / Vadakupattu, Medavakkam, Chennai",
    highlights: ["Weekend match venue", "Summer camp grounds", "Turf pitch matches"],
  },
];

export const facilityRentals = [
  { title: "Cricket Nets", description: "Premium practice facilities with flexible rental packages for individuals and teams." },
  { title: "Box Cricket", description: "Indoor urban cricket venues sized for groups, corporates, and weekend leagues." },
  { title: "Football Turf", description: "Professional-grade turf maintenance with customizable scheduling windows." },
  { title: "Multi-Purpose Spaces", description: "Adaptable indoor venues for events, camps, and off-season training." },
];

export const streamingTiers = [
  { tier: "Mobile Coverage", description: "Single-camera mobile streaming for local matches and practice sessions." },
  { tier: "Multi-Camera HD", description: "Multi-angle HD streaming with digital scoreboard overlays for tournaments." },
  { tier: "Blackmagic Broadcast", description: "Camcorder (Blackmagic) technology streams — crystal-clear, lag-free, broadcast grade." },
];

export const services = [
  {
    title: "Video Biomechanics Analysis",
    description: "Frame-by-frame analysis of bowling action and batting stance to correct technique early.",
  },
  {
    title: "HD Match Streaming",
    description: "Live broadcast services with digital scoreboards for local tournaments — mobile to Blackmagic-grade.",
  },
  {
    title: "Turf & Ground Rentals",
    description: "Cricket nets, box cricket, football turf, and multi-purpose spaces for teams, corporates, and camps.",
  },
];

export const sponsorSpotlight = {
  name: "Vauman Agencies",
  since: 1937,
  description:
    "An industrial chemicals distribution agency headquartered in Kolkata, representing Chemplast Sanmar, Arkema Peroxides India, Bayer Material Science, Cray Valley Resins India, and Cabot Sanmar across Eastern India's steel, fertilizer, pharma, and energy sectors.",
  quote:
    "Vauman Agencies has partnered with Dharan Sports Studio for the long term, committed to our goals and vision as we support their business with curated branding and marketing strategies.",
};

export const partners = ["Vauman Agencies", "Playtonia", "OXF", "Dharan Sports"];

export const testimonials = [
  {
    quote: "A go-to coaching center for all things sports — top-notch coaching that takes players from basic skills to tournament-ready.",
    name: "Pradeep",
    role: "Parent",
  },
  {
    quote: "Well-trained coaches dedicated to helping the players succeed, treating sport as a life discipline.",
    name: "Gourav",
    role: "DSS Management",
  },
  {
    quote: "Their experience and coaching methodology is very interesting — a practical, grueling approach with visible transformation from day one.",
    name: "Jeyaseelan",
    role: "Athlete",
  },
];

export const contact = {
  whatsapp: {
    number: "+91-9840874713",
    message: "Hi DSS, I would like to enquire about coaching trials.",
  },
  call: "+91-8939988127",
  email: "dharansports@gmail.com",
  social: [
    { label: "YouTube", handle: "@OXFSDharanSports", href: "https://youtube.com/@OXFSDharanSports" },
    { label: "Instagram", handle: "@oxfsdharansports", href: "https://instagram.com/oxfsdharansports" },
    { label: "Facebook", handle: "DSSOXF", href: "https://facebook.com/DSSOXF" },
  ],
};

export const registrationOptions = {
  ageGroups: ["Under 10", "Under 14", "Under 19", "Adult (19+)"],
  sports: ["Cricket", "Silambam", "Karate", "Archery", "Multiple"],
  campuses: ["Sithalapakkam", "Medavakkam"],
};
