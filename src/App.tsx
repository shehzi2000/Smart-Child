/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { UnderstandSection } from './components/UnderstandSection';
import { SolutionSection } from './components/SolutionSection';
import { MoveSection } from './components/MoveSection';
import { EatSmartSection } from './components/EatSmartSection';
import { DiscoverAiSection } from './components/DiscoverAiSection';
import { CreateSection } from './components/CreateSection';
import { WorldOfAiSection } from './components/WorldOfAiSection';
import { CorePillars } from './components/CorePillars';
import { TransformationSection } from './components/TransformationSection';
import { FutureSection } from './components/FutureSection';
import { ChallengeSection } from './components/ChallengeSection';
import { Footer } from './components/Footer';
import { TalkToAiModal } from './components/TalkToAiModal';
import { ParentFamilyViewModal } from './components/ParentFamilyViewModal';
import { InfoModal } from './components/InfoModal';
import { QuickTourModal } from './components/QuickTourModal';
import { FinalCtaSection } from './components/FinalCtaSection';
import { ScrollReveal } from './components/ScrollReveal';

export default function App() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [infoModalTopic, setInfoModalTopic] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartJourney = () => {
    scrollToSection('challenges');
  };

  const handleExploreFuture = () => {
    scrollToSection('world-of-ai');
  };

  const handleSeeSolution = () => {
    scrollToSection('solution');
  };

  const handleStartMoveChallenge = () => {
    scrollToSection('challenges');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900 flex flex-col antialiased selection:bg-teal-100 selection:text-teal-950">
      {/* Primary Sticky Top Bar */}
      <Navbar
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenParentMode={() => setIsParentModalOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartJourney={handleStartJourney}
          onExploreFuture={handleExploreFuture}
          onOpenTour={() => setIsTourOpen(true)}
        />

        {/* Premium Section: Why Smart Child? Video Presentation */}
        <ScrollReveal>
          <VideoSection onExploreClick={() => scrollToSection('understand')} />
        </ScrollReveal>

        {/* Understand Section: When Screen Time Starts Replacing Real Life */}
        <ScrollReveal>
          <UnderstandSection onDiscoverSolution={handleSeeSolution} />
        </ScrollReveal>

        {/* Section: The Solution - Don't Just Remove. Redirect. */}
        <ScrollReveal>
          <SolutionSection onExploreMore={() => scrollToSection('move')} />
        </ScrollReveal>

        {/* Section: Move - Move Your Body. Clear Your Mind. */}
        <ScrollReveal>
          <MoveSection onStartMoveChallenge={handleStartMoveChallenge} />
        </ScrollReveal>

        {/* Section: Eat Smart - Fuel Your Body. Feed Your Future. */}
        <ScrollReveal>
          <EatSmartSection onBuildRoutine={() => scrollToSection('challenges')} />
        </ScrollReveal>

        {/* Section: Discover AI - Don't Just Use AI. Learn To Create With It. */}
        <ScrollReveal>
          <DiscoverAiSection onStartCreating={() => scrollToSection('create')} />
        </ScrollReveal>

        {/* Section: Create - What If Screen Time Became Creation Time? */}
        <ScrollReveal>
          <CreateSection onTakeChallenge={() => scrollToSection('challenges')} />
        </ScrollReveal>

        {/* Section: World of AI - The Future Isn't Just Something You Watch. It's Something You Can Build. */}
        <ScrollReveal>
          <WorldOfAiSection
            onExploreFutureSkills={() => scrollToSection('challenges')}
            onStartProject={() => scrollToSection('create')}
            onOpenAiPlan={() => setIsAiModalOpen(true)}
          />
        </ScrollReveal>

        {/* 4 Core Pillars Section: The Solution & Balance Foundation */}
        <ScrollReveal>
          <CorePillars />
        </ScrollReveal>

        {/* The Answer Isn't Always Put The Phone Away (Transformation Pipeline) */}
        <ScrollReveal>
          <TransformationSection />
        </ScrollReveal>

        {/* The World is Changing. Are Our Children Ready? (Future AI & Skills) */}
        <ScrollReveal>
          <FutureSection />
        </ScrollReveal>

        {/* Section: The 7-Day Smart Child Challenge */}
        <ScrollReveal>
          <ChallengeSection onOpenAiPlan={() => setIsAiModalOpen(true)} />
        </ScrollReveal>

        {/* Section: Final Call to Action */}
        <ScrollReveal>
          <FinalCtaSection
            onStartExploring={() => scrollToSection('why-smart-child')}
            onTalkToAi={() => setIsAiModalOpen(true)}
            onForParents={() => setIsParentModalOpen(true)}
          />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer onOpenTopic={(topic) => setInfoModalTopic(topic)} />

      {/* Interactive Talk to AI Companion Modal */}
      <TalkToAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Parent & Family View Modal */}
      <ParentFamilyViewModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        onOpenAiCoach={() => {
          setIsParentModalOpen(false);
          setIsAiModalOpen(true);
        }}
        onOpenSmartBalancePlan={() => {
          setIsParentModalOpen(false);
          setIsAiModalOpen(true);
        }}
        onOpenChallenge={() => {
          setIsParentModalOpen(false);
          scrollToSection('challenges');
        }}
      />

      {/* Footer Topics / Transparency Modal */}
      <InfoModal
        isOpen={Boolean(infoModalTopic)}
        activeTopic={infoModalTopic || 'about'}
        onClose={() => setInfoModalTopic(null)}
      />

      {/* First-Time Visitor Quick Tour Modal */}
      <QuickTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onOpenAiCoach={() => setIsAiModalOpen(true)}
        onOpenParentMode={() => setIsParentModalOpen(true)}
        onWatchVideo={() => scrollToSection('why-smart-child')}
        onStartExploring={() => scrollToSection('challenges')}
      />
    </div>
  );
}
