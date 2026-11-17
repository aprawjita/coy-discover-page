# Coy Discover Tab

This project is a small Next.js app built for the Coy SDE Intern Assignment. The goal was to create a standalone Discover experience inspired by Tinder/Bumble, while keeping the Home tab intentionally blank and making the app feel like a polished mobile-first product demo.

## What I built

- A new Discover tab with a single-profile card layout
- Swipe left to pass and swipe right to like
- Desktop buttons as fallback controls for the same interactions
- 30+ seeded mock profiles with names, age, bio, city/college, interests, and placeholder images
- Mutual-only match logic: a match is created only when both users liked each other
- A Matches screen showing only mutual matches
- Persistence across reloads using a local JSON-backed store
- A match celebration modal when a mutual match is created

## Screenshots
  <img width="682" height="893" alt="image" src="https://github.com/user-attachments/assets/b486d5a6-c4ef-451e-95d2-61a637b78401" />
  <img width="697" height="795" alt="image" src="https://github.com/user-attachments/assets/3b1fffe2-80bd-47b9-ab88-a67ddb1aba26" />


## Personal notes

This was a useful exercise because it combined product thinking, UI design, and backend logic. The most important part for me was making sure the app behaved like a real discovery flow instead of just looking good. The privacy rule was especially important: unmatched likes must never be shown, and only mutual likes are exposed as a match.

I also kept the implementation simple and reliable: no heavy auth system or external database, just a local JSON file and a clean API layer. That keeps the project easy to understand and demonstrates the actual assignment logic without overengineering the solution.

## Project structure

- `app/page.tsx` — main Discover UI and tab navigation
- `app/api/feed/route.ts` — returns the remaining un-swiped profiles
- `app/api/swipe/route.ts` — records like/pass and checks match creation
- `app/api/matches/route.ts` — returns the user's mutual matches
- `lib/discover-store.ts` — local persistence and matching logic
- `data/db.json` — seeded profile data and persisted state

## How to run locally

```bash
npm install
npm run dev -- --hostname 0.0.0.0
```

Then open:

- Local browser: `http://localhost:3000`
- Mobile device on same network: `http://<your-computer-ip>:3000`

For example, if your machine IP is `192.168.1.20`, open `http://192.168.1.20:3000` on your phone.

## Mobile vs desktop experience

### Mobile
- Swipe gestures are the main interaction method
- Cards are presented full-screen with a polished, app-like feel
- Larger touch targets and stronger CTA spacing make the flow easier to use

### Desktop
- The same core interactions work with buttons instead of drag gestures
- The layout is still responsive and centered, but it is primarily optimized for mobile-first use
- Some visual spacing and card sizing may feel slightly more compact than a phone layout, but the experience remains consistent

## Notes on behavior

- Swiped profiles do not reappear
- Likes and passes persist after refresh
- The Home tab remains intentionally blank
- Matches only appear when they are mutual
- In the UI, the user never sees who liked them unless that like becomes mutual

## Validation

This app was checked with the project build and lint pipeline, and it builds successfully with:

```bash
npm run build
```

## Summary

This project is a compact, working demo of a dating-style discovery flow built for a coding assignment. It focuses on product behavior, privacy guarantees, and a clean user experience rather than heavy complexity. The result is a simple but realistic Discover experience that matches the assignment requirements and is easy to run locally.
