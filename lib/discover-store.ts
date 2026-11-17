export type SwipeDirection = "like" | "pass";

export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  city: string;
  college?: string;
  interests: string[];
  photo: string;
  likedByUser: boolean;
  likedByMe: SwipeDirection | null;
}

export interface StoreData {
  profiles: Profile[];
}

const store: StoreData = {
  profiles: seedProfiles(),
};

function seedProfiles(): Profile[] {
  return [
    { id: "p1", name: "Ava", age: 24, bio: "Coffee, city walks, and spontaneous weekend plans.", city: "New York", college: "NYU", interests: ["hiking", "coffee", "music"], photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80", likedByUser: true, likedByMe: null },
    { id: "p2", name: "Leo", age: 27, bio: "Foodie with a soft spot for jazz bars and design stores.", city: "Chicago", college: "DePaul", interests: ["food", "photography", "jazz"], photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p3", name: "Maya", age: 23, bio: "Trying every rooftop spot in the city and collecting playlists.", city: "Seattle", college: "UW", interests: ["travel", "podcasts", "wellness"], photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p4", name: "Noah", age: 29, bio: "Tech nerd by day, live comedy fan by night.", city: "Austin", college: "UT Austin", interests: ["startups", "comedy", "fitness"], photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80", likedByUser: true, likedByMe: null },
    { id: "p5", name: "Priya", age: 26, bio: "Always planning the next adventure and the perfect playlist.", city: "Boston", college: "Boston University", interests: ["travel", "books", "yoga"], photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p6", name: "Ethan", age: 28, bio: "Weekend cyclist and Monday coffee ritual.", city: "Denver", college: "CU Boulder", interests: ["cycling", "coffee", "skiing"], photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p7", name: "Sofia", age: 25, bio: "Artist, brunch enthusiast, and amateur photographer.", city: "Los Angeles", college: "UCLA", interests: ["art", "brunch", "photography"], photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80", likedByUser: true, likedByMe: null },
    { id: "p8", name: "Daniel", age: 30, bio: "Takes pride in both ski trips and home-cooked dinners.", city: "San Diego", college: "UCSD", interests: ["cooking", "skiing", "movies"], photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p9", name: "Emma", age: 24, bio: "Pottery classes, thrift finds, and cozy apartment nights.", city: "Portland", college: "Portland State", interests: ["crafts", "reading", "gardening"], photo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p10", name: "Marcus", age: 31, bio: "Runner, skeptic of small talk, lover of good tacos.", city: "Phoenix", college: "Arizona State", interests: ["running", "food", "music"], photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p11", name: "Olivia", age: 22, bio: "Campus radio host with a to-watch list longer than her calendar.", city: "Miami", college: "University of Miami", interests: ["music", "podcasts", "fashion"], photo: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p12", name: "Sam", age: 27, bio: "Board game nights and long scenic drives are the dream.", city: "Nashville", college: "Vanderbilt", interests: ["board games", "music", "driving"], photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80", likedByUser: true, likedByMe: null },
    { id: "p13", name: "Harper", age: 26, bio: "Finds joy in museums, markets, and late-night ramen.", city: "San Francisco", college: "USF", interests: ["art", "food", "hiking"], photo: "https://images.unsplash.com/photo-1517841905240-472988c2477d?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p14", name: "Gabriel", age: 28, bio: "Beach volleyball, books, and trying new neighborhoods.", city: "San Diego", college: "UC San Diego", interests: ["volleyball", "books", "travel"], photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p15", name: "Nina", age: 25, bio: "Dog mom, coffee snob, and amateur gardener.", city: "Brooklyn", college: "CUNY", interests: ["dogs", "coffee", "gardening"], photo: "https://images.unsplash.com/photo-1517841905240-472988c2477d?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p16", name: "Kai", age: 29, bio: "Weekend coder and full-time explorer of hidden food spots.", city: "Seattle", college: "Seattle University", interests: ["coding", "food", "photography"], photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80", likedByUser: true, likedByMe: null },
    { id: "p17", name: "Zoe", age: 23, bio: "Minimalist wardrobe, huge social life, and a love for concerts.", city: "Chicago", college: "Loyola Chicago", interests: ["concerts", "fashion", "nightlife"], photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p18", name: "Julian", age: 26, bio: "Always up for trivia nights and a good playlist exchange.", city: "Austin", college: "Texas State", interests: ["trivia", "music", "movies"], photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p19", name: "Chloe", age: 24, bio: "Sunrise workouts, bookstore runs, and summer festivals.", city: "Boston", college: "Northeastern", interests: ["fitness", "books", "festivals"], photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80", likedByUser: true, likedByMe: null },
    { id: "p20", name: "Isaac", age: 29, bio: "Sushi lover, weekend hiker, and occasional puzzle addict.", city: "Denver", college: "Colorado State", interests: ["hiking", "food", "puzzles"], photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p21", name: "Aria", age: 25, bio: "Creative types, green spaces, and spontaneous brunch plans.", city: "Los Angeles", college: "Cal State LA", interests: ["art", "brunch", "wellness"], photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p22", name: "Theo", age: 27, bio: "Guitar riffs, good coffee, and weekend city walks.", city: "New York", college: "Fordham", interests: ["music", "coffee", "hiking"], photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p23", name: "Luna", age: 24, bio: "Avid traveler chasing sunny skies and great food markets.", city: "Miami", college: "Florida International", interests: ["travel", "food", "fashion"], photo: "https://images.unsplash.com/photo-1517841905240-472988c2477d?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p24", name: "Ryan", age: 30, bio: "Dog walker, sports fan, and believer in a strong coffee order.", city: "Seattle", college: "University of Washington", interests: ["sports", "coffee", "dogs"], photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p25", name: "Layla", age: 26, bio: "Night market hunter with a deep love for documentaries.", city: "San Francisco", college: "San Jose State", interests: ["documentaries", "food", "travel"], photo: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p26", name: "Victor", age: 28, bio: "Cycling enthusiast with a playlist for every mood.", city: "Portland", college: "University of Oregon", interests: ["cycling", "music", "coffee"], photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p27", name: "Hannah", age: 23, bio: "Museum dates, city walks, and trying the best pastries nearby.", city: "Brooklyn", college: "Brooklyn College", interests: ["art", "food", "walking"], photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80", likedByUser: true, likedByMe: null },
    { id: "p28", name: "Owen", age: 31, bio: "Home chef, sports watcher, and always down for a board game night.", city: "Austin", college: "UT Arlington", interests: ["cooking", "sports", "games"], photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p29", name: "Mila", age: 25, bio: "Lavender lattes, indie films, and social plans with friends.", city: "Chicago", college: "University of Illinois", interests: ["movies", "coffee", "music"], photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p30", name: "Logan", age: 27, bio: "Always chasing live music and low-key adventures.", city: "Nashville", college: "Belmont University", interests: ["music", "travel", "outdoors"], photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p31", name: "Iris", age: 24, bio: "Weekend pottery sessions and long conversations over brunch.", city: "Portland", college: "Lewis & Clark", interests: ["crafts", "brunch", "reading"], photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
    { id: "p32", name: "Finn", age: 26, bio: "Techie by trade, adventurer by nature, and true believer in great playlists.", city: "New York", college: "Columbia", interests: ["tech", "music", "travel"], photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80", likedByUser: false, likedByMe: null },
  ];
}

function cloneProfiles(profiles: Profile[]): Profile[] {
  return profiles.map((profile) => ({
    ...profile,
    interests: [...profile.interests],
  }));
}

export function readStore(): StoreData {
  return {
    profiles: cloneProfiles(store.profiles).map((profile) => ({
      ...profile,
      interests: [...profile.interests],
    })),
  };
}

export function writeStore(data: StoreData) {
  store.profiles = cloneProfiles(data.profiles).map((profile) => ({
    ...profile,
    interests: [...profile.interests],
  }));
}

export function publicProfile(profile: Profile) {
  return {
    id: profile.id,
    name: profile.name,
    age: profile.age,
    bio: profile.bio,
    city: profile.city,
    college: profile.college,
    interests: profile.interests,
    photo: profile.photo,
  };
}

export function getFeedProfiles() {
  const { profiles } = readStore();
  return profiles.filter((profile) => profile.likedByMe === null).map(publicProfile);
}

export function getMutualMatches() {
  const { profiles } = readStore();
  return profiles
    .filter((profile) => profile.likedByMe === "like" && profile.likedByUser)
    .map(publicProfile);
}

export function recordSwipe(profileId: string, direction: SwipeDirection) {
  const { profiles } = readStore();
  const profile = profiles.find((item) => item.id === profileId);

  if (!profile) {
    return { matched: false, profile: null };
  }

  if (profile.likedByMe !== null) {
    return { matched: false, profile: null };
  }

  profile.likedByMe = direction;
  const matched = direction === "like" && profile.likedByUser;

  writeStore({ profiles });

  return {
    matched,
    profile: matched ? publicProfile(profile) : null,
  };
}

export function resetSessionStore() {
  store.profiles = cloneProfiles(seedProfiles());
}
