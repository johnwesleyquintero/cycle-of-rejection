import { useAudio } from "../../contexts/AudioContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
} from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

export function AudioPlayer() {
  const {
    state,
    playPause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolumeLevel,
    dispatch,
  } = useAudio();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolumeLevel(value[0]);
  };

  const toggleRepeat = () => {
    const modes: Array<"none" | "track" | "all"> = ["none", "track", "all"];
    const currentIndex = modes.indexOf(state.repeat);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    dispatch({ type: "SET_REPEAT", payload: nextMode });
  };

  const toggleShuffle = () => {
    dispatch({ type: "TOGGLE_SHUFFLE" });
  };

  if (!state.currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-black/95 backdrop-blur-md border-t border-brand-gray-lighter/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4 space-x-4">
          {/* Track Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {state.currentTrack.artwork && (
              <img
                src={state.currentTrack.artwork}
                alt={state.currentTrack.title}
                className="w-12 h-12 rounded-md object-cover"
              />
            )}
            <div className="min-w-0">
              <h4 className="text-white font-medium text-sm truncate">
                {state.currentTrack.title}
              </h4>
              <p className="text-gray-400 text-xs truncate">
                {state.currentTrack.artist} • {state.currentTrack.album}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                state.shuffle
                  ? "text-brand-red bg-brand-red/20"
                  : "text-gray-400 hover:text-white hover:bg-brand-gray-lighter/20"
              }`}
            >
              <Shuffle className="h-4 w-4" />
            </button>

            <button
              onClick={previousTrack}
              className="p-2 text-gray-400 hover:text-white hover:bg-brand-gray-lighter/20 rounded-lg transition-all duration-200"
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              onClick={playPause}
              disabled={state.isLoading}
              className="p-3 bg-brand-red hover:bg-brand-red-light text-white rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              {state.isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 text-gray-400 hover:text-white hover:bg-brand-gray-lighter/20 rounded-lg transition-all duration-200"
            >
              <SkipForward className="h-5 w-5" />
            </button>

            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-lg transition-all duration-200 ${
                state.repeat !== "none"
                  ? "text-brand-red bg-brand-red/20"
                  : "text-gray-400 hover:text-white hover:bg-brand-gray-lighter/20"
              }`}
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          {/* Progress */}
          <div className="hidden md:flex items-center space-x-3 flex-1 max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(state.currentTime)}
            </span>
            <div className="flex-1">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={[state.currentTime]}
                max={state.duration || 100}
                step={1}
                onValueChange={handleSeek}
              >
                <Slider.Track className="bg-brand-gray-lighter relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-brand-red rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-3 h-3 bg-brand-red rounded-full hover:bg-brand-red-light focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
              </Slider.Root>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(state.duration)}
            </span>
          </div>

          {/* Volume */}
          <div className="hidden lg:flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <div className="w-20">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={[state.volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              >
                <Slider.Track className="bg-brand-gray-lighter relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-brand-red rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-3 h-3 bg-brand-red rounded-full hover:bg-brand-red-light focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
              </Slider.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
