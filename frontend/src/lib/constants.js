export const POPULAR_CITIES = [
  'Delhi',
  'Bengaluru',
  'Mumbai',
  'Lucknow',
  'Noida',
  'Pune',
  'Hyderabad',
  'Jaipur',
  'Chandigarh'
];

export const HOBBIES_LIST = [
  'Coding',
  'Gaming',
  'Photography',
  'Reading',
  'Cricket',
  'Music',
  'Cooking',
  'Travel',
  'Dance',
  'Hiking',
  'Badminton',
  'Running',
  'Art',
  'Football'
];

export const INTERESTS_LIST = [
  'Photography',
  'Gaming',
  'Travel',
  'Technology',
  'Music',
  'Startups',
  'Fitness',
  'Movies',
  'Reading',
  'Design',
  'Art',
  'Cafes',
  'Books'
];

export const ACTIVITIES_LIST = [
  'Cafe hopping',
  'Gaming sessions',
  'Weekend trips',
  'Playing cricket',
  'Concerts',
  'Book clubs',
  'Networking meetups',
  'Photowalks',
  'Trekking',
  'Badminton matches',
  'Sunset watching'
];

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }
];

export const LOOKING_FOR_OPTIONS = [
  { label: 'Anyone', value: 'Anyone', desc: 'Open to meeting all cool people' },
  { label: 'Male Friends', value: 'Male', desc: 'Looking for guy buddies' },
  { label: 'Female Friends', value: 'Female', desc: 'Looking for girl buddies' },
  { label: 'Both Male & Female', value: 'Both', desc: 'Open to both male and female friends' }
];

// Sample profiles for the Constellation Hero & Editorial Collage
export const HERO_SAMPLE_PROFILES = [
  {
    id: 'ananya',
    name: 'Ananya Gupta',
    age: 23,
    city: 'Delhi',
    profession: 'UI/UX Designer',
    matchScore: 94,
    gender: 'Female',
    interests: ['Design', 'Photography', 'Art'],
    hobbies: ['Photography', 'Reading'],
    preferredActivities: ['Cafe hopping', 'Photowalks'],
    bio: 'Passionate about minimalist design, photography, and finding hidden aesthetic cafes.',
    roleInConstellation: 'top'
  },
  {
    id: 'rohan',
    name: 'Rohan Verma',
    age: 26,
    city: 'Delhi',
    profession: 'Data Analyst',
    matchScore: 88,
    gender: 'Male',
    interests: ['Music', 'Technology', 'Movies'],
    hobbies: ['Cricket', 'Music'],
    preferredActivities: ['Playing cricket', 'Concerts'],
    bio: 'Numbers by day, indie music by night. Always down for a cricket match or live acoustic gig.',
    roleInConstellation: 'left'
  },
  {
    id: 'priya',
    name: 'Priya Singh',
    age: 25,
    city: 'Delhi',
    profession: 'Marketing Lead',
    matchScore: 91,
    gender: 'Female',
    interests: ['Travel', 'Movies', 'Cafes'],
    hobbies: ['Dance', 'Travel'],
    preferredActivities: ['Weekend trips', 'Cafe hopping'],
    bio: 'Lover of storytelling, spontaneous road trips, and exploring street food joints.',
    roleInConstellation: 'right'
  },
  {
    id: 'siddharth',
    name: 'Siddharth Rao',
    age: 29,
    city: 'Bengaluru',
    profession: 'Founder',
    matchScore: 85,
    gender: 'Male',
    interests: ['Startups', 'Fitness', 'Gaming'],
    hobbies: ['Running', 'Gaming'],
    preferredActivities: ['Morning runs', 'Gaming sessions'],
    bio: 'Early stage founder staying active with weekend 10k runs and casual multiplayer gaming.',
    roleInConstellation: 'bottom'
  },
  {
    id: 'aarav',
    name: 'Aarav Sharma',
    age: 24,
    city: 'Delhi',
    profession: 'Software Engineer',
    matchScore: 93,
    gender: 'Male',
    interests: ['Technology', 'Startups', 'Gaming'],
    hobbies: ['Coding', 'Gaming'],
    preferredActivities: ['Cafe hopping', 'Gaming sessions'],
    bio: 'Tech enthusiast who loves building cool projects, sipping black coffee, and late night discussions.',
    roleInConstellation: 'secondary'
  }
];

// Mapping interests to related profiles for the "What's your thing?" interactive section
export const INTEREST_COMMUNITIES = {
  Photography: {
    description: 'Photowalks, golden hour chases & 35mm film banter.',
    curatedProfiles: ['Ananya Gupta', 'Aditya Kulkarni'],
    tags: ['Aesthetic cafes', 'Street photography', 'Darkroom']
  },
  Gaming: {
    description: 'Casual multiplayer, late night Discord lobbies & indie games.',
    curatedProfiles: ['Aarav Sharma', 'Siddharth Rao', 'Ishaan Mishra'],
    tags: ['Steam co-op', 'Smash Bros', 'Retro arcades']
  },
  Travel: {
    description: 'Spontaneous mountain getaways, road trips & heritage walks.',
    curatedProfiles: ['Priya Singh', 'Neha Joshi'],
    tags: ['Weekend treks', 'Hostels', 'Train journeys']
  },
  Technology: {
    description: 'Building side projects, AI explorations & tech banter.',
    curatedProfiles: ['Aarav Sharma', 'Kabir Mehta', 'Ayaan Khan'],
    tags: ['Hackathons', 'Open source', 'Espresso fueled']
  },
  Music: {
    description: 'Underground gigs, record hunting & vinyl listening sessions.',
    curatedProfiles: ['Rohan Verma', 'Riya Sen'],
    tags: ['Indie pop', 'Live concerts', 'Acoustic jam']
  },
  Startups: {
    description: 'Brainstorming products, 0-to-1 ideas & founder chats.',
    curatedProfiles: ['Kabir Mehta', 'Siddharth Rao'],
    tags: ['Early stage', 'Pitch practice', 'Product design']
  },
  Fitness: {
    description: 'Morning 5Ks, badminton rallies & post-workout protein shakes.',
    curatedProfiles: ['Siddharth Rao', 'Vikram Malhotra'],
    tags: ['Calisthenics', 'Trail running', 'Badminton']
  },
  Movies: {
    description: 'Film festival screenings, foreign cinema & deep screenplay dissections.',
    curatedProfiles: ['Rohan Verma', 'Meera Nair'],
    tags: ['A24 fans', 'Classic cinema', 'Popcorn debates']
  },
  Reading: {
    description: 'Silent reading hours at quiet cafes & lively book club discussions.',
    curatedProfiles: ['Diya Patel', 'Zoya Agarwal'],
    tags: ['Magical realism', 'Essays', 'Book exchanges']
  },
  Design: {
    description: 'Typography nerdery, tactile UI, art galleries & museum afternoons.',
    curatedProfiles: ['Ananya Gupta', 'Neha Joshi'],
    tags: ['Editorial layouts', 'Figma', 'Poster art']
  }
};
