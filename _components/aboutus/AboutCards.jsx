"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

const AboutCards = () => {
  const cardContainerRef = useRef(null);
  const cardRef = useRef(null); // Ref for individual card
  const [activeCardIndex, setActiveCardIndex] = useState(0); // State for active card index

  // State for button disabled status
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  // Sample card data
  const cardData = [
    {
      id: 1,
      title: "Lord Krishna - The Teacher",
      description:
        "Learn from the past, have a stronghold on the present and never lose sight of the future.",
    },
    {
      id: 2,
      title: "“Make it Easy” for Everyone",
      description: "Team Guests Associates Family",
    },
    {
      id: 3,
      title: "“Six Thinking Hats” for decision making",
      description:
        "Simply put, the blue hat manages the meeting, the white hat pulls all the information on the table, the red hat pulls all the feelings on the table, the black hat finds risks, the yellow hat finds optimistic solutions and the green hat creates new ideas.",
    },
    {
      id: 4,
      title: "“6W2H” for project planning",
      description:
        "What | Where | When | Why | Whom | How | HurdlesA set of questions, which must be answered to ensure smooth start, process and completion of a project.",
    },
    {
      id: 5,
      title: "Muda & Kaizen",
      description:
        "Identify and eliminate wasteful actions (Muda) for improved productivity. Use Kaizen for continuous improvement in processes.",
    },
    {
      id: 6,
      title: "“The rule of ONE”",
      description:
        "One task at a time. One set of complete & clear instructions saves time and avoids confusion. One percent saving leads to mega savings in the long run.",
    },
    {
      id: 7,
      title: "“Cow” for problem solving",
      description:
        "When the cow falls into the ditch...don’t blame or find how. First get the cow out of the ditch then check how the cow went into the ditch and take measures so that the same cow or any other cow doesn’t go into the ditch again. First solve the problem, then find the root cause, and eventually implement preventive measures.",
    },
    {
      id: 8,
      title: "Cheap vs Amazing",
      description:
        "Don’t look for the cheapest way of doing things; look for the most amazing ways to do it!",
    },
    {
      id: 9,
      title: "Make People Happy",
      description: "My business is making people happy” - Walt Disney",
    },
    {
      id: 10,
      title: "When in doubt, we ask...",
      description:
        "Are we legally right? Are we ethically right? Are we morally right?",
    },
  ];

  // Update active card index and button disabled status based on scroll position
  const updateActiveCardIndex = () => {
    if (cardContainerRef.current) {
      const scrollLeft = cardContainerRef.current.scrollLeft;
      const cardWidth = cardRef.current.offsetWidth + 20; // Including gap between cards
      const newIndex = Math.round(scrollLeft / cardWidth); // Determine active index based on scroll
      setActiveCardIndex(Math.max(0, Math.min(newIndex, cardData.length - 1))); // Clamp index within bounds
      
      // Update button disabled states
      setIsLeftButtonDisabled(newIndex === 0); // Disable left button if on first card
      setIsRightButtonDisabled(newIndex === cardData.length - 1); // Disable right button if on last card
    }
  };

  // Scroll to the left
  const scrollLeft = () => {
    if (cardContainerRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + 20; // Including gap between cards
      cardContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
      setTimeout(updateActiveCardIndex, 300); // Delay to allow scroll to complete
    }
  };

  // Scroll to the right
  const scrollRight = () => {
    if (cardContainerRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + 20; // Including gap between cards
      cardContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
      setTimeout(updateActiveCardIndex, 300); // Delay to allow scroll to complete
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-red-100">
      <div className="flex w-[95%] h-full lg:h-[70vh] justify-between flex-col lg:flex-row mx-auto lg:p-10 gap-10">
        {/* Text Section */}
        <div className="flex w-full h-full flex-col gap-5 p-5 justify-between">
          <div className="flex flex-col gap-10">
            <h2 className="text-4xl lg:text-5xl font-semibold text-themeColor">
              10 Principles
            </h2>
            <p className="text-lg text-black">
              To live life to the fullest and to be productive and efficient at
              our workplace, as Veena World team members, we practice certain
              values that guide us in every action and at every step.
            </p>
          </div>
          {/* Navigation Buttons */}
          <div className="hidden lg:flex gap-5">
            <button
              onClick={scrollLeft}
              className={`p-4 rounded-full border bg-white ${isLeftButtonDisabled ? 'opacity-50 ' : ''}`} // Disable button styling
              disabled={isLeftButtonDisabled} // Disable the button
            >
              <ChevronLeft className="text-black" />
            </button>
            <button
              onClick={scrollRight}
              className={`p-4 rounded-full border bg-white ${isRightButtonDisabled ? 'opacity-50 ' : ''}`} // Disable button styling
              disabled={isRightButtonDisabled} // Disable the button
            >
              <ChevronRight className="text-black" />
            </button>
          </div>
        </div>

        {/* Card Slider Section */}
        <div
          className="flex overflow-x-scroll lg:overflow-hidden relative w-full hide-scrollbar-x snap-x snap-mandatory lg:snap-none scroll-smooth"
          ref={cardContainerRef}
          onScroll={updateActiveCardIndex} // Update active card on scroll
        >
          <div className="flex transition-transform duration-500 ease-in-out gap-x-5 py-5">
            {cardData.map((card, index) => (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                cardRef={cardRef}
                isActive={index === activeCardIndex} // Check if the card is active
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCards;

const Card = ({ title, description, cardRef, isActive }) => {
  return (
    <motion.div
      className={`flex-none w-[300px] lg:w-[410px] h-96 flex gap-10 flex-col snap-start lg:snap-none p-5 rounded-xl border bg-white text-black`}
      ref={cardRef} // Set ref on card
      initial={{ scale: 0.9, opacity: 0.5 }} // Initial state for animation
      animate={{
        scale: isActive ? 1 : 0.9, // Scale up when active, scale down when inactive
        opacity: isActive ? 1 : 0.5, // Opacity changes for active and inactive states
      }}
      transition={{ duration: 0.3 }} // Transition duration
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-800">{description}</p>
    </motion.div>
  );
};
