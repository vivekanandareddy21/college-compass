import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const collegesData = [
  {
    name: "Apex Institute of Technology",
    location: "San Francisco, CA",
    fees: 48000,
    rating: 4.8,
    placementPercentage: 96,
    overview: "A world-renowned technological research university focusing on cutting-edge computer science, artificial intelligence, and engineering disciplines.",
    courses: [
      { name: "B.S. Computer Science", duration: "4 Years" },
      { name: "M.S. Artificial Intelligence", duration: "2 Years" },
      { name: "B.S. Data Science", duration: "4 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Top-tier faculty, incredible job placements, and a brilliant student community." },
      { rating: 4, comment: "Academically rigorous, but the workload can be stressful. Excellent tech networking." },
    ],
  },
  {
    name: "Beacon State University",
    location: "Boston, MA",
    fees: 32000,
    rating: 4.2,
    placementPercentage: 88,
    overview: "A prestigious public research institution offering a comprehensive curriculum across liberal arts, sciences, and professional fields.",
    courses: [
      { name: "B.A. Economics", duration: "4 Years" },
      { name: "B.S. Biology", duration: "4 Years" },
      { name: "M.A. English Literature", duration: "2 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Great campus environment, excellent professors, and a very inclusive community." },
      { rating: 4, comment: "Solid academic foundation and good career services, though administrative processes are slow." },
    ],
  },
  {
    name: "Cascade Business School",
    location: "New York, NY",
    fees: 55000,
    rating: 4.6,
    placementPercentage: 94,
    overview: "Located in the heart of Manhattan, Cascade prepares future global leaders through experiential learning and strong industry partnerships.",
    courses: [
      { name: "Master of Business Administration (MBA)", duration: "2 Years" },
      { name: "B.B.A. Finance", duration: "4 Years" },
      { name: "B.B.A. Marketing", duration: "4 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Unbeatable location, incredible networking opportunities on Wall Street!" },
      { rating: 4, comment: "High tuition fees, but the return on investment is definitely worth it." },
    ],
  },
  {
    name: "Delta College of Design",
    location: "Austin, TX",
    fees: 28000,
    rating: 4.1,
    placementPercentage: 85,
    overview: "A vibrant center for creative arts, design thinking, and digital media, fostering innovation and artistic exploration.",
    courses: [
      { name: "B.F.A. Graphic Design", duration: "4 Years" },
      { name: "B.S. User Experience Design", duration: "4 Years" },
      { name: "M.F.A. Animation & VFX", duration: "2 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Excellent labs and studio spaces. Faculty are active industry professionals." },
      { rating: 4, comment: "Very creative atmosphere. Career services could be better for freelance support." },
    ],
  },
  {
    name: "Evergreen Environmental University",
    location: "Seattle, WA",
    fees: 25000,
    rating: 4.4,
    placementPercentage: 82,
    overview: "Dedicated to sustainability and environmental sciences, Evergreen combines scientific research with active policy advocacy.",
    courses: [
      { name: "B.S. Environmental Science", duration: "4 Years" },
      { name: "M.S. Climate Policy", duration: "2 Years" },
      { name: "B.S. Marine Biology", duration: "4 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Beautiful campus, hands-on field research, and passionate professors." },
      { rating: 4, comment: "Highly specialized. If you love ecology and nature, this is the best place." },
    ],
  },
  {
    name: "Frontier Medical Academy",
    location: "Chicago, IL",
    fees: 62000,
    rating: 4.9,
    placementPercentage: 99,
    overview: "A premier academic medical center and health sciences school renowned for medical breakthroughs and healthcare education.",
    courses: [
      { name: "Doctor of Medicine (M.D.)", duration: "4 Years" },
      { name: "B.S. Nursing", duration: "4 Years" },
      { name: "M.S. Public Health", duration: "2 Years" },
    ],
    reviews: [
      { rating: 5, comment: "World-class hospital affiliations and cutting-edge simulation labs." },
      { rating: 5, comment: "Demanding but highly rewarding. The faculty are leaders in medical research." },
    ],
  },
  {
    name: "Gulf Coast Engineering College",
    location: "Houston, TX",
    fees: 30000,
    rating: 4.3,
    placementPercentage: 91,
    overview: "Providing practical engineering education with deep ties to the energy, aerospace, and chemical manufacturing industries.",
    courses: [
      { name: "B.S. Petroleum Engineering", duration: "4 Years" },
      { name: "B.S. Mechanical Engineering", duration: "4 Years" },
      { name: "B.S. Chemical Engineering", duration: "4 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Huge job fair with top energy companies. Great labs." },
      { rating: 4, comment: "Very technical curriculum. Great placement records in Texas." },
    ],
  },
  {
    name: "Horizon Hospitality Institute",
    location: "Miami, FL",
    fees: 26000,
    rating: 4.0,
    placementPercentage: 86,
    overview: "Preparing students for international careers in luxury hotel management, tourism, and culinary arts in a top tourist destination.",
    courses: [
      { name: "B.S. Hotel Management", duration: "4 Years" },
      { name: "B.A. Culinary Arts", duration: "3 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Miami is the perfect backdrop. Internship options at luxury resorts are fantastic." },
      { rating: 4, comment: "Practical training is top-notch, though theoretical lectures can feel dry." },
    ],
  },
  {
    name: "Ivy Global College",
    location: "Philadelphia, PA",
    fees: 52000,
    rating: 4.7,
    placementPercentage: 95,
    overview: "A historically rich institution offering world-class programs in law, history, international relations, and public policy.",
    courses: [
      { name: "Juris Doctor (J.D.)", duration: "3 Years" },
      { name: "B.A. Political Science", duration: "4 Years" },
      { name: "M.A. International Relations", duration: "2 Years" },
    ],
    reviews: [
      { rating: 5, comment: "The history, the libraries, and the intellectual conversations are unmatched." },
      { rating: 4, comment: "Very competitive admissions. Academic rigor is standard Ivy quality." },
    ],
  },
  {
    name: "Junction Communications College",
    location: "Atlanta, GA",
    fees: 29000,
    rating: 4.2,
    placementPercentage: 89,
    overview: "Fostering excellence in journalism, public relations, cinema, and digital media in a booming entertainment hub.",
    courses: [
      { name: "B.A. Journalism", duration: "4 Years" },
      { name: "B.A. Film and Media Arts", duration: "4 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Atlanta is a great media hub. Studio equipment is industry standard." },
      { rating: 4, comment: "Diverse course selections. Very helpful career office for media internships." },
    ],
  },
  {
    name: "Keystone Science Academy",
    location: "Denver, CO",
    fees: 31000,
    rating: 4.3,
    placementPercentage: 87,
    overview: "Focusing on fundamental sciences, geology, and physics, nestled near the Rocky Mountains for perfect fieldwork opportunities.",
    courses: [
      { name: "B.S. Geology & Earth Sciences", duration: "4 Years" },
      { name: "B.S. Physics", duration: "4 Years" },
      { name: "M.S. Astrophysics", duration: "2 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Fantastic field trips and hands-on geology work. Denver is amazing." },
      { rating: 4, comment: "Small class sizes mean you get to know the professors well." },
    ],
  },
  {
    name: "Lakeside Liberal Arts College",
    location: "Minneapolis, MN",
    fees: 34000,
    rating: 4.4,
    placementPercentage: 83,
    overview: "Emphasizing critical thinking, creative writing, philosophy, and classical studies in a supportive environment.",
    courses: [
      { name: "B.A. Philosophy", duration: "4 Years" },
      { name: "B.A. Creative Writing", duration: "4 Years" },
      { name: "B.A. Sociology", duration: "4 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Taught me how to think, write, and communicate. Brilliant professors." },
      { rating: 4, comment: "If you want a job in tech, you'll need to double major. But excellent education." },
    ],
  },
  {
    name: "Metro Cyber Security School",
    location: "Washington, DC",
    fees: 45000,
    rating: 4.7,
    placementPercentage: 97,
    overview: "Directly serving the capital with cybersecurity research, cryptography, defense systems, and intelligence-related certifications.",
    courses: [
      { name: "B.S. Cybersecurity", duration: "4 Years" },
      { name: "M.S. Information Security", duration: "2 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Direct recruiting pipelines into federal agencies and defense contractors." },
      { rating: 4, comment: "Tough security clearances needed for many internships, but the course is stellar." },
    ],
  },
  {
    name: "Northwest Aerospace College",
    location: "Seattle, WA",
    fees: 46000,
    rating: 4.6,
    placementPercentage: 93,
    overview: "Specialized in aeronautical engineering, pilot training, and commercial aviation management near key aerospace hubs.",
    courses: [
      { name: "B.S. Aerospace Engineering", duration: "4 Years" },
      { name: "B.S. Aviation Management", duration: "4 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Close collaboration with Boeing. Flight simulators are state of the art." },
      { rating: 4, comment: "Expensive flight hours fees, but top-notch instruction." },
    ],
  },
  {
    name: "Oasis Agricultural University",
    location: "Phoenix, AZ",
    fees: 23000,
    rating: 3.9,
    placementPercentage: 80,
    overview: "Pioneering drylands agriculture, soil science, irrigation design, and desert ecology research.",
    courses: [
      { name: "B.S. Agronomy", duration: "4 Years" },
      { name: "B.S. Landscape Architecture", duration: "4 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Leading research in drought-resistant farming. Vital study domain." },
      { rating: 4, comment: "Affordable tuition. Excellent practical testing farm sites." },
    ],
  },
  {
    name: "Pacific Marine College",
    location: "San Diego, CA",
    fees: 38000,
    rating: 4.5,
    placementPercentage: 90,
    overview: "Offering specialized degrees in marine engineering, oceanography, naval architecture, and transport systems.",
    courses: [
      { name: "B.S. Oceanography", duration: "4 Years" },
      { name: "B.S. Marine Engineering", duration: "4 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Oceanography labs are practically inside the ocean. Unparalleled." },
      { rating: 4, comment: "Rigorous math and physics requirement, but very fulfilling." },
    ],
  },
  {
    name: "Quantum Physics Institute",
    location: "Pasadena, CA",
    fees: 58000,
    rating: 4.9,
    placementPercentage: 98,
    overview: "A highly selective institute focused on high-energy physics, quantum mechanics, and mathematical research.",
    courses: [
      { name: "B.S. Physics", duration: "4 Years" },
      { name: "Ph.D. Theoretical Physics", duration: "5 Years" },
    ],
    reviews: [
      { rating: 5, comment: "Home to Nobel laureates. Mind-bending courses, brilliant peers." },
      { rating: 5, comment: "Intense, selective, and outstanding. The peak of academic physics." },
    ],
  },
  {
    name: "Redwood Music Conservatory",
    location: "Los Angeles, CA",
    fees: 49000,
    rating: 4.4,
    placementPercentage: 84,
    overview: "Training classical musicians, jazz virtuosos, and digital audio engineers in the entertainment capital.",
    courses: [
      { name: "Bachelor of Music (B.Mus.)", duration: "4 Years" },
      { name: "B.S. Music Production", duration: "4 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Great recording studios and performance halls. Amazing local music scene." },
      { rating: 4, comment: "Competitive environment. You must practice constantly to keep up." },
    ],
  },
  {
    name: "Summit Sports & Health Academy",
    location: "Salt Lake City, UT",
    fees: 24000,
    rating: 4.1,
    placementPercentage: 86,
    overview: "Combining sports science, kinesiology, physical therapy, and athletic training with outdoor recreation.",
    courses: [
      { name: "B.S. Kinesiology", duration: "4 Years" },
      { name: "M.S. Sports Management", duration: "2 Years" },
    ],
    reviews: [
      { rating: 4, comment: "Perfect location for outdoor sports and winter training. Good labs." },
      { rating: 4, comment: "Very practical. Great links to professional athletic clubs." },
    ],
  },
  {
    name: "Vanguard Academy of Law",
    location: "Chicago, IL",
    fees: 50000,
    rating: 4.6,
    placementPercentage: 92,
    overview: "A boutique law school preparing litigation lawyers, corporate compliance specialists, and human rights advocates.",
    courses: [
      { name: "Juris Doctor (J.D.)", duration: "3 Years" },
      { name: "Master of Laws (LL.M.)", duration: "1 Year" },
    ],
    reviews: [
      { rating: 5, comment: "Outstanding moot court achievements. Professors are top practicing lawyers." },
      { rating: 4, comment: "Tough grading curve, but mock trials and legal clinics are excellent." },
    ],
  },
];

async function main() {
  console.log("Starting seeding process...");

  // Clean old entries
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleared old database records.");

  // Insert seed data
  for (const item of collegesData) {
    const { courses, reviews, ...collegeInfo } = item;

    const createdCollege = await prisma.college.create({
      data: {
        ...collegeInfo,
        courses: {
          create: courses,
        },
        reviews: {
          create: reviews,
        },
      },
    });

    console.log(`Seeded college: ${createdCollege.name}`);
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
