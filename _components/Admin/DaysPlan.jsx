import React from 'react';
import DayItem from './DaysItem';

const DaysPlan = ({selectedPack}) => {
  const days = [
    {
      day: 1,
      city_name: 'Arrive Jabalpur',
      description: 'Arrive at Jabalpur Airport/Station.',
      inclusions: ['Dinner'],
    },
    {
      day: 2,
      title: 'Jabalpur – Panchmarhi',
      description: 'Proceed to Panchmarhi – is a famous hill station also known as Satpura ki rani. On arrival free time for relaxation.',
      extra: 'Tea / Coffee en route to Panchmarhi',
      meals: ['Breakfast', 'Lunch', 'Dinner'],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Days Plan</h2>
      <div>
        {selectedPack.days_plan.map((day, index) => (
          <DayItem key={index} day={day} />
        ))}
      </div>
      <button className="text-red-500 font-bold mt-4">Collapse All</button>
    </div>
  );
};

export default DaysPlan;
