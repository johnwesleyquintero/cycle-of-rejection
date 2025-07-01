import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Music, Calendar, BookOpen, Mail } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";
import { mockTracks, albums } from "../data/trackData";

export function Home() {
  const { dispatch, playTrack } = useAudio();

  useEffect(() => {
    // Set up the audio queue with all tracks
    dispatch({ type: "SET_QUEUE", payload: mockTracks });
  }, [dispatch]);

  const handlePlayFeatured = () => {
    playTrack(mockTracks[0]);
  };

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-gray to-brand-black opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')] bg-cover bg-center opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-brand-red-lighter to-brand-red bg-clip-text text-transparent">
                Cycle of
              </span>
              <br />
              <span className="text-brand-red">Rejection</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in our dark atmospheric soundscapes. Experience
              the journey through rejection, acceptance, and rebirth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handlePlayFeatured}
                className="flex items-center space-x-3 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-red/25"
              >
                <Play className="h-6 w-6" />
                <span>Play Latest</span>
              </button>

              <Link
                to="/discography"
                className="flex items-center space-x-3 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                <Music className="h-6 w-6" />
                <span>Explore Music</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Albums */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Albums
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dive deep into our musical journey through darkness and redemption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {albums.map((album, index) => (
              <div
                key={album.id}
                className="group bg-gradient-metal rounded-2xl p-6 hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={album.artwork}
                      alt={album.title}
                      className="w-24 h-24 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {album.title}
                    </h3>
                    <p className="text-brand-red font-medium mb-2">
                      {album.year}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {album.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-gray/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/tour"
              className="group bg-gradient-metal rounded-2xl p-8 hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-brand-red rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Tour Dates</h3>
              <p className="text-gray-300 leading-relaxed">
                Catch us live on our upcoming tour. Experience the raw energy of
                our performances.
              </p>
            </Link>

            <Link
              to="/codex"
              className="group bg-gradient-metal rounded-2xl p-8 hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-brand-red rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Codex</h3>
              <p className="text-gray-300 leading-relaxed">
                Explore the deep lore and concepts that drive our musical
                narrative.
              </p>
            </Link>

            <div className="group bg-gradient-metal rounded-2xl p-8 hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-brand-red rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Connected
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Subscribe to our newsletter for exclusive content and early
                access.
              </p>
              <button className="w-full bg-brand-red hover:bg-brand-red-light text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
