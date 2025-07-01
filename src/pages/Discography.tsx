import React, { useEffect } from "react";
import { Play, Clock, Heart } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";
import { albums, mockTracks } from "../data/mockData";

export function Discography() {
  const { dispatch, playTrack, state } = useAudio();

  useEffect(() => {
    dispatch({ type: "SET_QUEUE", payload: mockTracks });
  }, [dispatch]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayAlbum = (albumTracks: any[]) => {
    dispatch({ type: "SET_QUEUE", payload: albumTracks });
    playTrack(albumTracks[0]);
  };

  return (
    <div className="min-h-screen bg-brand-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Discography</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Journey through our complete musical catalog, from the depths of
            despair to the heights of rebirth
          </p>
        </div>

        {/* Albums */}
        <div className="space-y-16">
          {albums.map((album, albumIndex) => (
            <div
              key={album.id}
              className="animate-slide-up"
              style={{ animationDelay: `${albumIndex * 200}ms` }}
            >
              {/* Album Header */}
              <div className="bg-gradient-metal rounded-2xl p-8 mb-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  <div className="relative group">
                    <img
                      src={album.artwork}
                      alt={album.title}
                      className="w-64 h-64 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handlePlayAlbum(album.tracks)}
                        className="p-4 bg-brand-red hover:bg-brand-red-light rounded-full text-white transition-colors duration-200 hover:scale-110"
                      >
                        <Play className="h-8 w-8" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {album.title}
                    </h2>
                    <p className="text-brand-red text-xl font-semibold mb-4">
                      {album.artist} • {album.year}
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl">
                      {album.description}
                    </p>

                    <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{album.tracks.length} tracks</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>Studio Album</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handlePlayAlbum(album.tracks)}
                      className="mt-6 flex items-center space-x-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                    >
                      <Play className="h-5 w-5" />
                      <span>Play Album</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Track List */}
              <div className="bg-gradient-metal rounded-2xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Track List
                  </h3>
                  <div className="space-y-2">
                    {album.tracks.map((track, trackIndex) => (
                      <div
                        key={track.id}
                        className={`group flex items-center space-x-4 p-4 rounded-lg hover:bg-brand-gray-lighter/20 transition-all duration-200 cursor-pointer ${
                          state.currentTrack?.id === track.id
                            ? "bg-brand-red/20"
                            : ""
                        }`}
                        onClick={() => playTrack(track)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 text-gray-400 group-hover:text-white">
                          {state.currentTrack?.id === track.id &&
                          state.isPlaying ? (
                            <div className="flex space-x-1">
                              <div className="w-1 h-4 bg-brand-red animate-pulse"></div>
                              <div
                                className="w-1 h-4 bg-brand-red animate-pulse"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-1 h-4 bg-brand-red animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          ) : (
                            <span className="font-mono text-sm">
                              {(trackIndex + 1).toString().padStart(2, "0")}
                            </span>
                          )}
                        </div>

                        <button
                          className="p-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            playTrack(track);
                          }}
                        >
                          <Play className="h-4 w-4" />
                        </button>

                        <div className="flex-1">
                          <h4
                            className={`font-medium ${
                              state.currentTrack?.id === track.id
                                ? "text-brand-red"
                                : "text-white"
                            }`}
                          >
                            {track.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {track.artist}
                          </p>
                        </div>

                        <div className="text-sm text-gray-400">
                          {formatDuration(track.duration)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
