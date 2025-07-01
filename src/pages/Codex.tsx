import React from 'react';
import { BookOpen, Scroll, Eye, Heart } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

export function Codex() {
  const loreEntries = [
    {
      id: 'hollow-path',
      title: 'The Hollow Path',
      category: 'Album Concept',
      content: `The Hollow Path represents the initial descent into darkness, where rejection becomes not just an experience but an identity. This concept album explores the psychological landscape of those who have been cast aside, forgotten, or deemed unworthy by society's standards.

Each track on this album represents a different stage of this descent - from the initial shock of rejection to the eventual embrace of isolation. The hollow path is not empty by accident; it is carved by the footsteps of those who walk alone, creating a sacred space for the rejected to find solace.

The album's narrative follows a protagonist who, after experiencing profound rejection, chooses to walk deeper into the darkness rather than seek the light. This choice becomes both a prison and a liberation, as the character discovers that in the depths of rejection lies a brutal honesty about the human condition.`,
    },
    {
      id: 'cycle-meaning',
      title: 'The Cycle',
      category: 'Core Philosophy',
      content: `The cycle of rejection is not linear but circular, representing the eternal return to moments of abandonment and isolation. This concept draws from ancient philosophies of eternal recurrence, suggesting that our deepest wounds become the source of our greatest strength.

In our musical interpretation, the cycle has three distinct phases:

**Phase 1: The Wound** - The initial experience of rejection, raw and unprocessed
**Phase 2: The Descent** - The journey deeper into isolation and self-reflection  
**Phase 3: The Transformation** - The emergence of a new self, forged in darkness

What makes this cycle unique is its non-linear nature. One can enter at any phase and spiral through multiple iterations, each time discovering new layers of meaning and understanding.`,
    },
    {
      id: 'rebirth-concept',
      title: 'Rebirth Through Darkness',
      category: 'Spiritual Theme',
      content: `Our concept of rebirth challenges traditional notions of renewal and transformation. Rather than seeking light after darkness, we propose that true rebirth occurs within the darkness itself - not as an escape, but as an embrace.

This philosophy suggests that the phoenix doesn't rise from ashes to escape the fire, but rather learns to become the fire itself. In our musical narrative, characters don't overcome their rejection; they transform it into a source of power and authentic self-expression.

The rebirth we explore is not about becoming socially acceptable or finding acceptance from others. Instead, it's about discovering the fierce beauty in being permanently changed by rejection, and finding strength in that transformation.`,
    },
    {
      id: 'sound-philosophy',
      title: 'Sonic Landscapes',
      category: 'Musical Approach',
      content: `Our sound design philosophy centers on creating "emotional architecture" - sonic spaces that listeners can inhabit and explore. Each song is constructed as a room in a larger mansion of meaning, with hidden passages and secret chambers waiting to be discovered.

We use dissonance not as chaos, but as honest expression of internal conflict. The heavy, atmospheric elements in our music represent the weight of rejection, while the melodic elements that emerge from this heaviness represent the beauty that can only be found in darkness.

Our production approach involves layering sounds to create depth and space, allowing listeners to discover new elements with each listening. We believe that music about rejection should itself be something that rewards deep listening and emotional investment.`,
    },
  ];

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
            Dive deep into the lore, philosophy, and conceptual framework that drives our musical narrative. 
            Explore the meaning behind the music and the stories within the songs.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Album Concept', 'Core Philosophy', 'Spiritual Theme', 'Musical Approach'].map((category) => (
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
                      {entry.category === 'Album Concept' && <Scroll className="h-6 w-6 text-brand-red" />}
                      {entry.category === 'Core Philosophy' && <Eye className="h-6 w-6 text-brand-red" />}
                      {entry.category === 'Spiritual Theme' && <Heart className="h-6 w-6 text-brand-red" />}
                      {entry.category === 'Musical Approach' && <BookOpen className="h-6 w-6 text-brand-red" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-red-lighter transition-colors duration-200">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-brand-red font-medium">{entry.category}</p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors duration-200">
                    <svg
                      className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </Accordion.Trigger>
              
              <Accordion.Content className="bg-gradient-metal rounded-b-2xl px-6 pb-6 animate-slide-up">
                <div className="pt-6 border-t border-brand-gray-lighter/20">
                  <div className="prose prose-invert max-w-none">
                    {entry.content.split('\n\n').map((paragraph, pIndex) => {
                      if (paragraph.includes('**')) {
                        // Handle bold text formatting
                        const parts = paragraph.split('**');
                        return (
                          <p key={pIndex} className="text-gray-300 leading-relaxed mb-4">
                            {parts.map((part, partIndex) => 
                              partIndex % 2 === 1 ? (
                                <strong key={partIndex} className="text-white font-semibold">{part}</strong>
                              ) : (
                                part
                              )
                            )}
                          </p>
                        );
                      }
                      return (
                        <p key={pIndex} className="text-gray-300 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
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
            <h2 className="text-2xl font-bold text-white mb-4">Explore Further</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              The codex is ever-expanding as our musical journey continues. Stay connected to receive updates 
              when new lore entries and conceptual explorations are added.
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