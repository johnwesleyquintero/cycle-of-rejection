import { MapPin, ExternalLink, Clock } from "lucide-react";
import { tourDates } from "../data/trackData";

export function Tour() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    };
  };

  return (
    <div className="min-h-screen bg-brand-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Tour Dates</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the raw energy and atmosphere of our live performances.
            Join us on our journey across the country.
          </p>
        </div>

        {/* Upcoming Shows */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Clock className="h-8 w-8 text-brand-red mr-3" />
            Upcoming Shows
          </h2>

          <div className="space-y-4">
            {tourDates.map((show, index) => {
              const dateInfo = formatDate(show.date);

              return (
                <div
                  key={show.id}
                  className="group bg-gradient-metal rounded-2xl p-6 hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-500 hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Date */}
                    <div className="flex-shrink-0 text-center">
                      <div className="bg-brand-red rounded-2xl p-4 w-20 h-20 flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="text-white font-bold text-xl">
                          {dateInfo.day}
                        </div>
                        <div className="text-white text-xs font-semibold">
                          {dateInfo.month}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {dateInfo.weekday}
                      </div>
                    </div>

                    {/* Venue Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {show.venue}
                      </h3>
                      <div className="flex items-center text-gray-300 mb-2">
                        <MapPin className="h-4 w-4 text-brand-red mr-2" />
                        <span>
                          {show.city}, {show.country}
                        </span>
                      </div>
                    </div>

                    {/* Ticket Button */}
                    <div className="flex-shrink-0">
                      {show.soldOut ? (
                        <div className="bg-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold cursor-not-allowed">
                          Sold Out
                        </div>
                      ) : (
                        <a
                          href={show.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-brand-red hover:bg-brand-red-light text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                        >
                          <span>Get Tickets</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tour Info */}
        <div className="bg-gradient-metal rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Tour Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                What to Expect
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Full live performance of songs from both "The Hollow Path"
                    and "Rebirth"
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Immersive visual experience with custom lighting and stage
                    design
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Exclusive merchandise available at venue</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Meet & greet opportunities (VIP tickets)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Contact & Booking
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  For booking inquiries and private events, reach out to our
                  management team.
                </p>
                <div className="space-y-2">
                  <p>
                    <strong className="text-white">Management:</strong>{" "}
                    booking@cycleofrejection.com
                  </p>
                  <p>
                    <strong className="text-white">Press:</strong>{" "}
                    press@cycleofrejection.com
                  </p>
                  <p>
                    <strong className="text-white">General:</strong>{" "}
                    hello@cycleofrejection.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
