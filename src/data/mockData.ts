import { Track } from '../contexts/AudioContext';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Descent into Darkness',
    artist: 'Cycle of Rejection',
    album: 'The Hollow Path',
    duration: 245,
    src: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav', // Placeholder
    artwork: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
  {
    id: '2',
    title: 'Echoes of the Void',
    artist: 'Cycle of Rejection',
    album: 'The Hollow Path',
    duration: 320,
    src: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav', // Placeholder
    artwork: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
  {
    id: '3',
    title: 'Rejection\'s Embrace',
    artist: 'Cycle of Rejection',
    album: 'The Hollow Path',
    duration: 285,
    src: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav', // Placeholder
    artwork: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
  {
    id: '4',
    title: 'The Last Light',
    artist: 'Cycle of Rejection',
    album: 'Rebirth',
    duration: 380,
    src: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav', // Placeholder
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
  {
    id: '5',
    title: 'Phoenix Rising',
    artist: 'Cycle of Rejection',
    album: 'Rebirth',
    duration: 295,
    src: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav', // Placeholder
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
];

export const albums = [
  {
    id: 'hollow-path',
    title: 'The Hollow Path',
    artist: 'Cycle of Rejection',
    year: 2023,
    artwork: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2',
    description: 'A journey through the depths of despair and the search for meaning in emptiness.',
    tracks: mockTracks.slice(0, 3),
  },
  {
    id: 'rebirth',
    title: 'Rebirth',
    artist: 'Cycle of Rejection',
    year: 2024,
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2',
    description: 'Rising from the ashes of rejection to embrace a new beginning.',
    tracks: mockTracks.slice(3, 5),
  },
];

export const tourDates = [
  {
    id: '1',
    date: '2024-03-15',
    venue: 'The Underground',
    city: 'New York',
    country: 'USA',
    ticketUrl: 'https://example.com/tickets/1',
    soldOut: false,
  },
  {
    id: '2',
    date: '2024-03-22',
    venue: 'Metal Forge',
    city: 'Los Angeles',
    country: 'USA',
    ticketUrl: 'https://example.com/tickets/2',
    soldOut: true,
  },
  {
    id: '3',
    date: '2024-03-29',
    venue: 'Dark Stage',
    city: 'Chicago',
    country: 'USA',
    ticketUrl: 'https://example.com/tickets/3',
    soldOut: false,
  },
  {
    id: '4',
    date: '2024-04-05',
    venue: 'Void Concert Hall',
    city: 'Seattle',
    country: 'USA',
    ticketUrl: 'https://example.com/tickets/4',
    soldOut: false,
  },
];