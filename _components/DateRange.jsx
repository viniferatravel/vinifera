"use client";
import React, { useState } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { format, addMonths, startOfMonth } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'; // Import day picker styles

export default function DateRange({ className }) {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Define the starting month and next month
  const today = new Date();
  const currentMonth = startOfMonth(today);
  const nextMonth = addMonths(currentMonth, 1);

  // Handle date selection
  const handleSelect = (range) => {
    setDateRange(range);
    // Close the popover only when both 'from' and 'to' dates are selected
    if (range.from && range.to) {
      setPopoverOpen(false);
    }
  };

  return (
    <div className={className}>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <div
            onClick={() => setPopoverOpen(!popoverOpen)}
            style={{ width: "100%", textAlign: "center", cursor: "pointer" }}
          >
            {dateRange.from ? (
              dateRange.to ? (
                `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
              ) : (
                format(dateRange.from, "MMM dd, yyyy")
              )
            ) : (
              "Pick a date range"
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {/* Current month calendar */}
              <div className="calendar-container">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleSelect}
                  defaultMonth={currentMonth}
                  numberOfMonths={1}
                />
              </div>
              {/* Next month calendar */}
              <div className="calendar-container">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleSelect}
                  defaultMonth={nextMonth}
                  numberOfMonths={1}
                />
              </div>

              {/* Show one month calendar on small devices */}
              <div className="block md:hidden">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleSelect}
                  numberOfMonths={1}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <style jsx>{`
        .calendar-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
