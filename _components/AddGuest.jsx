"use client";
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Plus, Minus } from "lucide-react";

export default function AddGuest({ className }) {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const incrementAdults = () => setAdults(adults + 1);
  const decrementAdults = () => setAdults(adults > 0 ? adults - 1 : 0);
  const incrementChildren = () => setChildren(children + 1);
  const decrementChildren = () => setChildren(children > 0 ? children - 1 : 0);
  const incrementInfants = () => setInfants(infants + 1);
  const decrementInfants = () => setInfants(infants > 0 ? infants - 1 : 0);

  return (
    <div className={className}>
      <Popover placement="bottom">
        <PopoverTrigger>
          <div className="cursor-pointer text-black">Add guests</div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <div className="space-y-4">
              {/* Adults Section */}
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold">Adults</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementAdults}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span>{adults}</span>
                  <button
                    onClick={incrementAdults}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Children Section */}
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold">Children</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementChildren}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span>{children}</span>
                  <button
                    onClick={incrementChildren}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Infants Section */}
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold">Infants</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementInfants}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span>{infants}</span>
                  <button
                    onClick={incrementInfants}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}


