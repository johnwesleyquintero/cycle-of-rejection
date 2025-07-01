import { useState, useMemo, ReactNode } from "react";
import { BookOpen, Scroll, Eye, Heart, Music } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { loreEntries } from "../data/codexData";

// --- Helper: Icon Mapping ---
// This moves the icon logic out of the JSX, making it much cleaner.
// If you add a new category, you just add it here.
const categoryIcons: { [key: string]: React.ElementType } = {
  "Album Concept": Music,
  "Core Philosophy": Eye,
  "Spiritual Theme": Heart,
  "Musical Approach": BookOpen,
};

// --- Helper: Content Renderer ---
// A dedicated function to render URLs within a paragraph.
const renderWithLinks = (text: string): ReactNode[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-red hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export function Codex() {
  // --- State Management ---
  // 1. We add state to track the currently selected category.
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- Dynamic Data Processing (with useMemo for performance) ---
  // 2. We derive the list of categories directly from your data.
  // This means if you add a new category to loreEntries, it appears automatically.
  const categories = useMemo(() => {
    const allCategories = loreEntries.map((entry) => entry.category);
    const uniqueCategories = [...new Set(allCategories)];
    return ["All", ...uniqueCategories];
  }, []); // Empty dependency array means this runs only once.

  // 3. We filter the entries based on the selected category.
  // useMemo ensures this only re-runs when the category changes.
  const filteredEntries = useMemo(() => {
    if (selectedCategory === "All") {
      return loreEntries;
    }
    return loreEntries.filter((entry) => entry.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-brand-black pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header (No changes needed) */}
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

        {/* --- Functional Navigation --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red-light focus:ring-offset-2 focus:ring-offset-brand-black ${
                selectedCategory === category
                  ? "bg-brand-red text-white shadow-lg shadow-brand-red/20"
                  // A subtle but clear style for active buttons
                  : "bg-brand-gray-lighter/20 hover:bg-brand-red/20 text-gray-300 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- Filtered Lore Entries --- */}
        <Accordion.Root type="single" collapsible className="space-y-4">
          {/* We now map over the 'filteredEntries' array */}
          {filteredEntries.map((entry, index) => {
            const Icon = categoryIcons[entry.category] || Scroll; // Default to Scroll icon
            return (
              <Accordion.Item
                key={entry.id}
                value={entry.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Accordion.Trigger className="group w-full bg-gradient-metal rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-brand-red/10 transition-all duration-300 [&[data-state=open]]:rounded-b-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-brand-red/20 rounded-xl">
                        <Icon className="h-6 w-6 text-brand-red" />
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
                        // --- Refined Content Rendering ---
                        if (part.type === "paragraph") {
                          return (
                            <p
                              key={partIndex}
                              // 'whitespace-pre-line' respects newlines in your data (for lyrics)
                              className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line"
                            >
                              {renderWithLinks(part.content as string)}
                            </p>
                          );
                        }
                        if (part.type === "heading") {
                          return (
                            <h2
                              key={partIndex}
                              className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0"
                            >
                              {part.content as string}
                            </h2>
                          );
                        }
                        if (part.type === "list") {
                          return (
                            <ul
                              key={partIndex}
                              className="list-disc list-inside text-gray-300 mb-4 space-y-2"
                            >
                              {(part.content as string[]).map(
                                (item, itemIndex) => (
                                  <li key={itemIndex}>{renderWithLinks(item)}</li>
                                ),
                              )}
                            </ul>
                          );
                        }
                        if (part.type === "code") {
                          return (
                            <pre
                              key={partIndex}
                              className="bg-brand-gray-darker p-4 rounded-lg text-sm text-gray-100 overflow-x-auto mb-4"
                            >
                              <code>{part.content as string}</code>
                            </pre>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>

        {/* Call to Action (No changes needed) */}
        <div className="mt-16 text-center">
          {/* ... */}
        </div>
      </div>
    </div>
  );
}