import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  src: string;
  artwork?: string;
}

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Track[];
  currentIndex: number;
  isLoading: boolean;
  repeat: "none" | "track" | "all";
  shuffle: boolean;
}

type AudioAction =
  | { type: "SET_TRACK"; payload: Track }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_QUEUE"; payload: Track[] }
  | { type: "NEXT_TRACK" }
  | { type: "PREVIOUS_TRACK" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_REPEAT"; payload: "none" | "track" | "all" }
  | { type: "TOGGLE_SHUFFLE" };

const initialState: AudioState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  queue: [],
  currentIndex: -1,
  isLoading: false,
  repeat: "none",
  shuffle: false,
};

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case "SET_TRACK": {
      const trackIndex = state.queue.findIndex(
        (track) => track.id === action.payload.id,
      );
      return {
        ...state,
        currentTrack: action.payload,
        currentIndex: trackIndex,
        currentTime: 0,
      };
    }
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "SET_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_QUEUE":
      return { ...state, queue: action.payload };
    case "NEXT_TRACK": {
      if (state.queue.length === 0) return state;
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.queue.length) {
        return {
          ...state,
          currentTrack:
            state.repeat === "all" ? state.queue[0] : state.currentTrack,
          currentIndex: state.repeat === "all" ? 0 : state.currentIndex,
          currentTime: 0,
        };
      }
      return {
        ...state,
        currentTrack: state.queue[nextIndex],
        currentIndex: nextIndex,
        currentTime: 0,
      };
    }
    case "PREVIOUS_TRACK": {
      if (state.queue.length === 0) return state;
      const prevIndex = state.currentIndex - 1;
      if (prevIndex < 0) {
        return {
          ...state,
          currentTrack:
            state.repeat === "all"
              ? state.queue[state.queue.length - 1]
              : state.currentTrack,
          currentIndex:
            state.repeat === "all"
              ? state.queue.length - 1
              : state.currentIndex,
          currentTime: 0,
        };
      }
      return {
        ...state,
        currentTrack: state.queue[prevIndex],
        currentIndex: prevIndex,
        currentTime: 0,
      };
    }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_REPEAT":
      return { ...state, repeat: action.payload };
    case "TOGGLE_SHUFFLE":
      return { ...state, shuffle: !state.shuffle };
    default:
      return state;
  }
}

interface AudioContextType {
  state: AudioState;
  dispatch: React.Dispatch<AudioAction>;
  audioRef: React.RefObject<HTMLAudioElement>;
  playTrack: (track: Track) => void;
  playPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  setVolumeLevel: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playTrack = (track: Track) => {
    dispatch({ type: "SET_TRACK", payload: track });
    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.load();
      dispatch({ type: "PLAY" }); // Ensure playback starts after setting a new track
    }
  };

  const playPause = () => {
    if (!audioRef.current) return;

    if (state.isPlaying) {
      audioRef.current.pause();
      dispatch({ type: "PAUSE" });
    } else {
      audioRef.current.play();
      dispatch({ type: "PLAY" });
    }
  };

  const nextTrack = () => {
    dispatch({ type: "NEXT_TRACK" });
  };

  const previousTrack = () => {
    dispatch({ type: "PREVIOUS_TRACK" });
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch({ type: "SET_TIME", payload: time });
    }
  };

  const setVolumeLevel = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      dispatch({ type: "SET_VOLUME", payload: volume });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.currentTrack && audio.src !== state.currentTrack.src) {
      audio.src = state.currentTrack.src;
      audio.load();
    }

    if (state.isPlaying) {
      audio.play().catch(error => console.error("Audio play failed:", error));
    } else {
      audio.pause();
    }

    const handleTimeUpdate = () => {
      dispatch({ type: "SET_TIME", payload: audio.currentTime });
    };

    const handleDurationChange = () => {
      dispatch({ type: "SET_DURATION", payload: audio.duration });
    };

    const handleEnded = () => {
      if (state.repeat === "track") {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    const handleLoadStart = () => {
      dispatch({ type: "SET_LOADING", payload: true });
    };

    const handleCanPlay = () => {
      dispatch({ type: "SET_LOADING", payload: false });
      if (state.isPlaying && state.currentTrack) {
        audio.play().catch(error => console.error("Audio play failed:", error));
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [state.isPlaying, state.repeat, state.currentTrack]);

  return (
    <AudioContext.Provider
      value={{
        state,
        dispatch,
        audioRef,
        playTrack,
        playPause,
        nextTrack,
        previousTrack,
        seekTo,
        setVolumeLevel,
      }}
    >
      {children}
      <audio ref={audioRef} preload="metadata" />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
