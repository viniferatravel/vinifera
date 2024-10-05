import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Utensils, CookingPot, EggFried } from 'lucide-react';

const DayItem = ({ day }) => {
  return (
    <Accordion isCompact>
      <AccordionItem
        key={day.day}
        aria-label={`Day ${day.day}`}
        title={
          <div className="block items-center">
            <div className="bg-red-500 text-white rounded-md w-14 h-10 flex items-center justify-center mr-3">
              Day {day.day}
            </div>
            <h3 className="text-xl font-semibold pt-4">{day.city_name}</h3>
          </div>
        }
      >
        <div className="px-4 py-2">
          <p className="text-gray-600">{day.description}</p>
          {day.extra && (
            <p className="text-gray-600 font-semibold mt-2">
              Extra Topping: <span className="font-normal">{day.extra}</span>
            </p>
          )}
          <div className="flex mt-4 space-x-2 place-content-end">
            {day.inclusions.map((meal, index) => (
              <div key={index} className="flex items-center space-x-1 text-gray-500">
                {/* <img
                  src={`/${meal.toLowerCase()}.png`}
                  alt={meal}
                  className="w-5 h-5"
                /> */}
                {
                  meal === "Dinner"
                    ? <span className='inline-flex'><Utensils className='w-4 h-4 mt-1'/> &nbsp;{"Dinner"}</span>
                    : ""
                }
                {
                  meal === "Breakfast"
                    ? <span className='inline-flex'><EggFried className='w-4 h-4 mt-1'/> &nbsp;{"Breakfast"}</span>
                    : ""
                }
                {
                  meal === "Lunch"
                    ? <span className='inline-flex'><CookingPot className='w-4 h-4 mt-1'/> &nbsp;{"Lunch"}</span>
                    : ""
                }
              </div>
            ))}
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default DayItem;
