import { Track } from "../contexts/AudioContext";

export const mockTracks: Track[] = [
  {
    id: "6",
    title: "Advance Scout (The Cynic's Eyes)",
    artist: "CYCLE OF REJECTION",
    album: "Break the Cycle",
    duration: 240,
    src: "/break-the-cycle-full-album/Advance Scout (The Cynic's Eyes).mp3",
    artwork: "/images/1.png",
  },
  {
    id: "7",
    title: "The Forge (Anvil of Anger)",
    artist: "CYCLE OF REJECTION",
    album: "Break the Cycle",
    duration: 270,
    src: "/break-the-cycle-full-album/The Forge (Anvil of Anger).mp3",
    artwork: "/images/2.png",
  },
  {
    id: "8",
    title: "The Quartermaster (Never Unarmed Again)",
    artist: "CYCLE OF REJECTION",
    album: "Break the Cycle",
    duration: 300,
    src: "/break-the-cycle-full-album/The Quartermaster (Never Unarmed Again).mp3",
    artwork: "/images/3.png",
  },
  {
    id: "9",
    title: "The Spymaster (A Colder War)",
    artist: "CYCLE OF REJECTION",
    album: "Break the Cycle",
    duration: 330,
    src: "/break-the-cycle-full-album/The Spymaster (A Colder War).mp3",
    artwork: "/images/4.png",
  },
];

export const albums = [
  {
    id: "break-the-cycle",
    title: "Break the Cycle",
    artist: "CYCLE OF REJECTION",
    year: 2024,
    artwork: "/images/6.png",
    description:
      "The latest album breaking free from the CYCLE OF REJECTION and forging a new path.",
    tracks: [
      {
        id: "6",
        title: "Advance Scout (The Cynic's Eyes)",
        artist: "CYCLE OF REJECTION",
        album: "Break the Cycle",
        duration: 240,
        src: "/break-the-cycle-full-album/Advance Scout (The Cynic's Eyes).mp3",
        artwork: "/images/1.png",
      },
      {
        id: "7",
        title: "The Forge (Anvil of Anger)",
        artist: "CYCLE OF REJECTION",
        album: "Break the Cycle",
        duration: 270,
        src: "/break-the-cycle-full-album/The Forge (Anvil of Anger).mp3",
        artwork: "/images/2.png",
      },
      {
        id: "8",
        title: "The Quartermaster (Never Unarmed Again)",
        artist: "CYCLE OF REJECTION",
        album: "Break the Cycle",
        duration: 300,
        src: "/break-the-cycle-full-album/The Quartermaster (Never Unarmed Again).mp3",
        artwork: "/images/3.png",
      },
      {
        id: "9",
        title: "The Spymaster (A Colder War)",
        artist: "CYCLE OF REJECTION",
        album: "Break the Cycle",
        duration: 330,
        src: "/break-the-cycle-full-album/The Spymaster (A Colder War).mp3",
        artwork: "/images/4.png",
      },
    ],
  },
];

export const tourDates = [
  {
    id: "1",
    date: "2024-03-15",
    venue: "The Underground",
    city: "New York",
    country: "USA",
    ticketUrl: "https://example.com/tickets/1",
    soldOut: false,
  },
  {
    id: "2",
    date: "2024-03-22",
    venue: "Metal Forge",
    city: "Los Angeles",
    country: "USA",
    ticketUrl: "https://example.com/tickets/2",
    soldOut: true,
  },
  {
    id: "3",
    date: "2024-03-29",
    venue: "Dark Stage",
    city: "Chicago",
    country: "USA",
    ticketUrl: "https://example.com/tickets/3",
    soldOut: false,
  },
  {
    id: "4",
    date: "2024-04-05",
    venue: "Void Concert Hall",
    city: "Seattle",
    country: "USA",
    ticketUrl: "https://example.com/tickets/4",
    soldOut: false,
  },
];
