import React from "react";
import { BookOpen, Scroll, Eye, Heart } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { loreEntries } from "../data/codexData";

export function Codex() {
  return (
    <div className="min-h-screen bg-brand-black pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-brand-red to-brand-red-light rounded-2xl">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">The Codex</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Dive deep into the lore, philosophy, and conceptual framework that
            drives our musical narrative. Explore the meaning behind the music
            and the stories within the songs.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            "All",
            "Album Concept",
            "Core Philosophy",
            "Spiritual Theme",
            "Musical Approach",
          ].map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-brand-gray-lighter/20 hover:bg-brand-red/20 text-gray-300 hover:text-white rounded-full transition-all duration-200 text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lore Entries */}
        <Accordion.Root type="single" collapsible className="space-y-4">
          {loreEntries.map((entry, index) => (
            <Accordion.Item
              key={entry.id}
              value={entry.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Accordion.Trigger className="group w-full bg-gradient-metal rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-brand-red/10 transition-all duration-300 [&[data-state=open]]:rounded-b-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-brand-red/20 rounded-xl">
                      {entry.category === "Album Concept" && (
                        <Scroll className="h-6 w-6 text-brand-red" />
                      )}
                      {entry.category === "Core Philosophy" && (
                        <Eye className="h-6 w-6 text-brand-red" />
                      )}
                      {entry.category === "Spiritual Theme" && (
                        <Heart className="h-6 w-6 text-brand-red" />
                      )}
                      {entry.category === "Musical Approach" && (
                        <BookOpen className="h-6 w-6 text-brand-red" />
                      )}
                      {entry.category === "The Protagonist" && (
                        <BookOpen className="h-6 w-6 text-brand-red" />
                      )}
                      {entry.category === "The Architect" && (
                        <Scroll className="h-6 w-6 text-brand-red" />
                      )}
                      {entry.category === "The Musician" && (
                        <Eye className="h-6 w-6 text-brand-red" />
                      )}
                      {entry.category === "The Scholar" && (
                        <Heart className="h-6 w-6 text-brand-red" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-red-lighter transition-colors duration-200">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-brand-red font-medium">
                        {entry.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors duration-200">
                    <svg
                      className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </Accordion.Trigger>

              <Accordion.Content className="bg-gradient-metal rounded-b-2xl px-6 pb-6 animate-slide-up">
                <div className="pt-6 border-t border-brand-gray-lighter/20">
                  <div className="prose prose-invert max-w-none">
                    {entry.content.map((part, partIndex) => {
                      if (part.type === "paragraph") {
                        // Handle bold text formatting within paragraphs
                        const paragraphs = Array.isArray(part.content)
                          ? part.content
                          : [part.content];
                        return paragraphs.map((paragraph, pIndex) => {
                          const parts = paragraph.split("**");
                          return (
                            <p
                              key={`${partIndex}-${pIndex}`}
                              className="text-gray-300 leading-relaxed mb-4"
                            >
                              {parts.map((textPart, textPartIndex) =>
                                textPartIndex % 2 === 1 ? (
                                  <strong
                                    key={textPartIndex}
                                    className="text-white font-semibold"
                                  >
                                    {textPart}
                                  </strong>
                                ) : (
                                  textPart
                                ),
                              )}
                            </p>
                          );
                        });
                      } else if (part.type === "heading") {
                        return (
                          <h2
                            key={partIndex}
                            className="text-2xl font-bold text-white mb-4 mt-6"
                          >
                            {part.content}
                          </h2>
                        );
                      } else if (part.type === "list") {
                        return (
                          <ul
                            key={partIndex}
                            className="list-disc list-inside text-gray-300 mb-4"
                          >
                            {Array.isArray(part.content) &&
                              part.content.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                              ))}
                          </ul>
                        );
                      } else if (part.type === "code") {
                        return (
                          <pre
                            key={partIndex}
                            className="bg-brand-gray-darker p-4 rounded-lg text-sm text-gray-100 overflow-x-auto mb-4"
                          >
                            <code>{part.content}</code>
                          </pre>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-metal rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Explore Further
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              The codex is ever-expanding as our musical journey continues. Stay
              connected to receive updates when new lore entries and conceptual
              explorations are added.
            </p>
            <button className="bg-brand-red hover:bg-brand-red-light text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105">
              Subscribe for Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
