"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Tab = "home" | "discover" | "matches";

type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  city: string;
  college?: string;
  interests: string[];
  photo: string;
};

const swipeOptions = [
  { direction: "pass", label: "Pass", accent: "bg-zinc-200 text-zinc-900", icon: "✕" },
  { direction: "like", label: "Like", accent: "bg-rose-500 text-white", icon: "♥" },
] as const;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed for ${url}`);
  }
  return response.json() as Promise<T>;
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState<Tab>("discover");
  const [feed, setFeed] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [matchProfile, setMatchProfile] = useState<Profile | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const dragStartXRef = useRef<number | null>(null);

  const currentProfile = feed[0] ?? null;
  const swipeDirection = dragOffset > 16 ? "like" : dragOffset < -16 ? "pass" : null;

  const loadFeed = async () => {
    setIsLoadingFeed(true);
    try {
      const data = await fetchJson<{ profiles: Profile[] }>("/api/feed");
      setFeed(data.profiles ?? []);
    } catch {
      setFeed([]);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  const loadMatches = async () => {
    setIsLoadingMatches(true);
    try {
      const data = await fetchJson<{ matches: Profile[] }>("/api/matches");
      setMatches(data.matches ?? []);
    } catch {
      setMatches([]);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  useEffect(() => {
    if (currentTab === "discover") {
      const timeout = setTimeout(() => {
        void loadFeed();
      }, 0);
      return () => clearTimeout(timeout);
    }

    if (currentTab === "matches") {
      const timeout = setTimeout(() => {
        void loadMatches();
      }, 0);
      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [currentTab]);

  const handleSwipe = async (direction: "like" | "pass") => {
    if (!currentProfile) {
      return;
    }

    try {
      const response = await fetch("/api/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: currentProfile.id, direction }),
      });

      const data: { matched?: boolean; profile?: Profile | null } = await response.json();

      setFeed((previous) => previous.filter((profile) => profile.id !== currentProfile.id));

      if (data.matched && data.profile) {
        setMatchProfile(data.profile);
      }

      if (currentTab === "matches") {
        void loadMatches();
      }
    } catch {
      setFeed((previous) => previous.filter((profile) => profile.id !== currentProfile.id));
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartXRef.current === null) {
      return;
    }

    setDragOffset(event.clientX - dragStartXRef.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) {
      return;
    }

    const threshold = 110;
    if (dragOffset > threshold) {
      void handleSwipe("like");
    } else if (dragOffset < -threshold) {
      void handleSwipe("pass");
    }

    dragStartXRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const renderTabButton = (tab: Tab, label: string) => (
    <button
      key={tab}
      onClick={() => setCurrentTab(tab)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        currentTab === tab
          ? "bg-zinc-900 text-white shadow-sm"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col border-x border-zinc-200 bg-white shadow-sm">
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-lg font-semibold tracking-tight">Coy</div>
            <nav className="flex gap-2 rounded-full bg-zinc-100 p-1">
              {renderTabButton("home", "Home")}
              {renderTabButton("discover", "Discover")}
              {renderTabButton("matches", "Matches")}
            </nav>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {currentTab === "home" && <div className="h-full bg-zinc-50" />}

          {currentTab === "discover" && (
            <div className="flex h-full flex-col px-4 pb-6 pt-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Discover</p>
                  <h1 className="mt-1 text-2xl font-semibold">Meet someone new</h1>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentTab("matches")}
                  className="rounded-full bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600"
                >
                  Matches
                </button>
              </div>

              {isLoadingFeed ? (
                <div className="flex flex-1 items-center justify-center text-sm text-zinc-500">Loading profiles…</div>
              ) : !currentProfile ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-50 px-6 text-center">
                  <div className="mb-3 text-4xl">✨</div>
                  <h2 className="text-xl font-semibold">You&apos;re all caught up</h2>
                  <p className="mt-2 text-sm text-zinc-500">No more profiles to review. Head to Matches to see mutual likes.</p>
                  <button
                    type="button"
                    onClick={() => setCurrentTab("matches")}
                    className="mt-5 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white"
                  >
                    View matches
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative flex flex-1 flex-col justify-center">
                    <div
                      className="card-surface absolute inset-0 overflow-hidden"
                      style={{
                        transform: `translateX(${dragOffset}px) rotate(${dragOffset / 18}deg) scale(${1 - Math.min(Math.abs(dragOffset) / 1600, 0.04)})`,
                        transition: isDragging ? "none" : "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms ease",
                        boxShadow: `0 ${Math.abs(dragOffset) > 15 ? 30 : 18}px ${Math.abs(dragOffset) > 15 ? 54 : 40}px rgba(15, 23, 42, ${Math.abs(dragOffset) > 15 ? 0.18 : 0.12})`,
                        opacity: Math.abs(dragOffset) > 110 ? 0.94 : 1,
                        touchAction: "pan-y",
                      }}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                    >
                      <div
                        className={`pointer-events-none absolute inset-y-4 left-4 z-20 flex items-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-lg backdrop-blur-sm ${
                          swipeDirection === "pass"
                            ? "border-red-200 bg-red-500/90 text-white"
                            : "opacity-0"
                        }`}
                        style={{
                          transform: swipeDirection === "pass" ? "translateX(0)" : "translateX(-18px)",
                          opacity: swipeDirection === "pass" ? 1 : 0,
                          transition: "all 180ms ease",
                        }}
                      >
                        Pass
                      </div>

                      <div
                        className={`pointer-events-none absolute inset-y-4 right-4 z-20 flex items-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-lg backdrop-blur-sm ${
                          swipeDirection === "like"
                            ? "border-emerald-200 bg-emerald-500/90 text-white"
                            : "opacity-0"
                        }`}
                        style={{
                          transform: swipeDirection === "like" ? "translateX(0)" : "translateX(18px)",
                          opacity: swipeDirection === "like" ? 1 : 0,
                          transition: "all 180ms ease",
                        }}
                      >
                        Like
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-900/15 to-transparent" />

                      <Image
                        src={currentProfile.photo}
                        alt={currentProfile.name}
                        width={800}
                        height={1200}
                        className="h-[420px] w-full rounded-[2rem] object-cover"
                        unoptimized
                      />

                      <div className="absolute inset-x-0 bottom-0 z-10 rounded-b-[2rem] bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white">
                        <div className="mb-2 flex items-center gap-2 text-2xl font-semibold leading-tight">
                          <span>{currentProfile.name}</span>
                          <span className="text-zinc-200">{currentProfile.age}</span>
                        </div>

                        <div className="mb-2 flex flex-wrap gap-2 text-xs text-zinc-200">
                          <span>{currentProfile.city}</span>
                          {currentProfile.college && <span>• {currentProfile.college}</span>}
                        </div>

                        <p className="mb-3 text-sm text-zinc-100">{currentProfile.bio}</p>

                        <div className="flex flex-wrap gap-2">
                          {currentProfile.interests.slice(0, 4).map((interest) => (
                            <span key={interest} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-100 backdrop-blur-sm">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-4">
                    {swipeOptions.map(({ direction, label, accent, icon }) => (
                      <button
                        key={direction}
                        type="button"
                        onClick={() => void handleSwipe(direction)}
                        className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition duration-200 hover:-translate-y-0.5 hover:scale-105 ${accent}`}
                        aria-label={`${label} ${currentProfile.name}`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {currentTab === "matches" && (
            <div className="flex h-full flex-col px-4 pb-6 pt-4">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Matches</p>
                <h1 className="mt-1 text-2xl font-semibold">Your mutual matches</h1>
              </div>

              {isLoadingMatches ? (
                <div className="flex flex-1 items-center justify-center text-sm text-zinc-500">Loading matches…</div>
              ) : matches.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-50 px-6 text-center">
                  <div className="mb-3 text-4xl">💞</div>
                  <h2 className="text-xl font-semibold">No matches yet</h2>
                  <p className="mt-2 text-sm text-zinc-500">Swipe right on people who liked you back to create a match.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {matches.map((match) => (
                    <div key={match.id} className="flex gap-3 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-3">
                      <Image src={match.photo} alt={match.name} width={160} height={160} className="h-20 w-20 rounded-2xl object-cover" unoptimized />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-semibold">{match.name}</h2>
                          <span className="text-sm text-zinc-500">{match.age}</span>
                        </div>
                        <p className="text-sm text-zinc-600">{match.city}</p>
                        <p className="mt-1 text-sm text-zinc-500">{match.bio}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {match.interests.slice(0, 3).map((interest) => (
                            <span key={interest} className="rounded-full bg-rose-100 px-2 py-1 text-[10px] font-medium text-rose-700">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {matchProfile && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-[2rem] bg-white p-5 text-center shadow-[0_30px_80px_rgba(15,23,42,0.28)] ring-1 ring-zinc-100 animate-[pop_220ms_ease-out]">
            <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-pink-200 text-3xl shadow-inner">💘</div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-500">It&apos;s a match!</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">You and {matchProfile.name} matched</h2>
            <p className="mt-2 text-sm text-zinc-600">You can both now start connecting.</p>

            <button
              type="button"
              onClick={() => {
                setMatchProfile(null);
                void loadMatches();
                setCurrentTab("matches");
              }}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-zinc-900 to-zinc-700 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-zinc-300 transition hover:-translate-y-0.5"
            >
              View matches
            </button>
            <button
              type="button"
              onClick={() => setMatchProfile(null)}
              className="mt-3 w-full rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Keep swiping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
