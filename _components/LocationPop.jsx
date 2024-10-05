"use client";
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const suggestions = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"]; // Example suggestions

export default function LocationPop({ className }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className={className}>
      <Popover placement="bottom">
        <PopoverTrigger>
          <div className="cursor-pointer text-black">Anywhere</div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-4">
          <div className="space-y-4">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Suggestions List */}
            {filteredSuggestions.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 mt-2">No results found</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
