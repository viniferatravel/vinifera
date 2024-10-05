import React, { useState } from 'react'
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Calendar, Dot, ListFilter, MapPin } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const Datemodal = ({ onSelectedDuration }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState('md');

  const [minDays, setMinDays] = useState(4);
  // console.log(minDays, "minDays");

  const [maxDays, setMaxDays] = useState(15);
  // console.log(maxDays, "maxDays");

  const [selectedDuration, setSelectedDuration] = useState(maxDays);
  // console.log(selectedDuration, "selectedDuration");

  const [showdeparture, setshowdeparture] = useState(false);
  // console.log(showdeparture, "showdeparture");

  const handleChange = (e) => {
    setSelectedDuration(Number(e.target.value));
    onSelectedDuration(Number(e.target.value))
  };

  const handledeparture = () => {
    setshowdeparture(!showdeparture)
  }

  const sizes = ["full"];

  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <>

      <div className="w-full">
        {sizes.map((size) => (
          <Button key={size} onPress={() => handleOpen(size)} className='text-sm w-full bg-white border border-[#f33624] text-[#f33624] p-1 rounded-full' color='default' radius='none'><Calendar className='w-[14px] h-[14px] text-[#f33624] ' /> <span><p className='font-semibold'>Dates & length</p></span></Button>

        ))}
      </div>


      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-semibold">Date & Length</ModalHeader>
              <ModalBody>
                <hr className='border border-[#c6cbd1]' />
                <div className='border border-[#c6cbd1] mt-3 rounded-sm'>
                  <Accordion>
                    <AccordionItem key="1" aria-label="Duration" title="Duration" className='font-semibold'>
                      <div className='pb-3'>
                        <div className="flex justify-between text-sm mb-2">
                          <p className='font-semibold'>min. <span>{minDays} days</span></p>
                          <p className='font-semibold'>max. <span>{selectedDuration} days</span></p>
                        </div>

                        <input
                          type="range"
                          min={minDays}
                          max={maxDays}
                          value={selectedDuration}
                          onChange={handleChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, red ${((selectedDuration - minDays) / (maxDays - minDays)) * 100}%, #ddd 0%)`,
                          }}
                        />
                      </div>
                    </AccordionItem>
                    {/* <AccordionItem key="2" aria-label="Departure date" title="Departure date" className='font-semibold pl-1'>
                      <div className='flex flex-col gap-3 font-normal pb-3'>
                        <Checkbox size="md" radius='sm'>September-2024</Checkbox>
                        <Checkbox size="md" radius='sm'>October-2024</Checkbox>
                        {showdeparture && (
                          <>
                            <Checkbox size="md" radius='sm'>November-2024</Checkbox>
                            <Checkbox size="md" radius='sm'>December-2024</Checkbox>
                          </>
                        )}
                        <Button onClick={() => handledeparture()} className='w-full bg-[#ed1c24] text-white font-extrabold mt-3 text-base' radius='sm'>
                          {showdeparture ? 'show Less' : 'show More'}
                        </Button>
                      </div>
                    </AccordionItem> */}
                  </Accordion>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// const Placemodal = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [size, setSize] = React.useState('md');

//   const [showstate, setshowstate] = useState(false);
//   // console.log(showstate, "showstate");

//   const handlestate = () => {
//     setshowstate(!showstate)
//   }

//   const sizes = ["full"];


//   const handleOpen = (size) => {
//     setSize(size)
//     onOpen();
//   }

//   return (
//     <>

//       <div className="w-full">
//         {sizes.map((size) => (
//           <Button key={size} onPress={() => handleOpen(size)} className='text-sm w-full bg-white border border-[#f33624] text-[#f33624] p-1 rounded-full' color='default' radius='none'><MapPin className='w-[14px] h-[14px] text-[#f33624] ' /> <span><p className='font-semibold'>places</p></span></Button>

//         ))}
//       </div>


//       <Modal
//         size={size}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1 font-semibold">Indian Tour</ModalHeader>
//               <ModalBody>
//                 <hr className='border border-[#c6cbd1]' />

//                 <div className='border border-[#c6cbd1] mt-3 rounded-sm'>
//                   <Accordion>
//                     <AccordionItem key="3" aria-label="Indian Tours" title="Indian Tours" className='font-semibold pl-1'>
//                       <div className='flex flex-col gap-3 font-normal pb-3'>
//                         <Checkbox size="md" radius='sm'>Andman</Checkbox>
//                         <Checkbox size="md" radius='sm'>Goa</Checkbox>
//                         {showstate && (
//                           <>
//                             <Checkbox size="md" radius='sm'>Gujrat</Checkbox>
//                             <Checkbox size="md" radius='sm'>Kerala</Checkbox>
//                           </>
//                         )}
//                         <Button onClick={() => handlestate()} className='w-full bg-[#ed1c24] text-white font-extrabold mt-3 text-base' radius='sm'>
//                           {showstate ? 'show Less' : 'show More'}
//                         </Button>
//                       </div>
//                     </AccordionItem>
//                   </Accordion>
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

const Filtermodal = ({ onselectedprice }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState('md');

  const [minprice, setminprice] = useState(25990);
  // console.log(minprice, "minprice");

  const [maxprice, setmaxprice] = useState(90326);
  // console.log(maxprice, "maxprice");

  const [selectedprice, setselectedprice] = useState(maxprice);
  // console.log(selectedprice, "selectedprice");

  const handleprice = (e) => {
    setselectedprice(Number(e.target.value));
    onselectedprice(Number(e.target.value));
  };

  // const [sortdata, setsortdata] = useState("Duation: Shortest first");
  // // console.log(sortdata, "sortdata");

  // const sortings = [
  //   { label: "Duation: Shortest first", value: "Duation: Shortest first" },
  //   { label: "Duation: Longest first", value: "Duation: Longest first" },
  //   { label: "Biggest Deals: Highest Saving", value: "Biggest Deals: Highest Saving" },
  //   { label: "Lowest first", value: "Lowest first" },
  //   { label: "Highest first", value: "Highest first" }
  // ];

  // const handlesortingdata = (value) => {
  //   setsortdata(value);
  // }

  const sizes = ["full"];


  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <>

      <div className="w-full">
        {sizes.map((size) => (
          <Button key={size} onPress={() => handleOpen(size)} className='text-sm w-full bg-white border border-[#f33624] text-[#f33624] p-1 rounded-full' color='default' radius='none'><ListFilter className='w-[14px] h-[14px] text-[#f33624] ' /> <span><p className='font-semibold'>Filter</p></span></Button>

        ))}
      </div>


      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-semibold">Filter</ModalHeader>
              <ModalBody>
                <hr className='border border-[#c6cbd1]' />

                {/* <div className=''>
                  <Autocomplete color='default' variant='bordered' radius='sm' defaultSelectedKey={sortdata} onInputChange={handlesortingdata}>
                    {sortings.map((sorting) => (
                      <AutocompleteItem key={sorting.value} value={sorting.value} className='rounded-sm'>
                        {sorting.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div> */}

                <div className='border border-[#c6cbd1] mt-3 rounded-sm'>
                  <Accordion>
                    <AccordionItem key="4" aria-label="Price" title="Price" className='font-semibold pl-1'>
                      <div className='pb-3'>
                        <div className="flex justify-between text-sm mb-2">
                          <p className='font-semibold'>min. <span>&#8377; {minprice} </span></p>
                          <p className='font-semibold'>max. <span>&#8377; {selectedprice}</span></p>
                        </div>

                        <input
                          type="range"
                          min={minprice}
                          max={maxprice}
                          value={selectedprice}
                          onChange={handleprice}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, red ${((selectedprice - minprice) / (maxprice - minprice)) * 100}%, #ddd 0%)`,
                          }}
                        />
                      </div>
                    </AccordionItem>
                  </Accordion>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const Sitefilter = ({ onSelectedDuration, onselectedprice }) => {

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1", "2", "3", "4"]));

  const [showdeparture, setshowdeparture] = useState(false);
  // console.log(showdeparture, "showdeparture");

  const [showstate, setshowstate] = useState(false);
  // console.log(showstate, "showstate");

  const [minDays, setMinDays] = useState(4);
  // console.log(minDays, "minDays");

  const [maxDays, setMaxDays] = useState(15);
  // console.log(maxDays, "maxDays");

  const [selectedDuration, setSelectedDuration] = useState(maxDays);
  // console.log(selectedDuration, "selectedDuration");

  const [minprice, setminprice] = useState(25990);
  // console.log(minprice, "minprice");

  const [maxprice, setmaxprice] = useState(90326);
  // console.log(maxprice, "maxprice");

  const [selectedprice, setselectedprice] = useState(maxprice);
  // console.log(selectedprice, "selectedprice");

  const handledeparture = () => {
    setshowdeparture(!showdeparture)
  }

  const handlestate = () => {
    setshowstate(!showstate)
  }

  const handleChange = (e) => {
    setSelectedDuration(Number(e.target.value));
    onSelectedDuration(Number(e.target.value))
  };

  const handleprice = (e) => {
    setselectedprice(Number(e.target.value));
    onselectedprice(Number(e.target.value));
  }

  return (
    <div>

      {/* for desktop view */}

      <div className='hidden lg:block '>
        <div className='w-full p-3 font-extrabold text-white bg-[#ed1c24] rounded-md flex justify-start gap-3'>
          <ListFilter />
          <p>Sort & Filter</p>
        </div>

        <div className='border border-[#c6cbd1] mt-3 rounded-md'>
          <Accordion selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys} selectionMode="multiple">

            <AccordionItem key="1" aria-label="Duration" title="Duration" className='font-semibold pl-1'>
              <div className='pb-3'>
                <div className="flex justify-between text-sm mb-2">
                  <p className='font-semibold'>Min. <span>{minDays} days</span></p>
                  <p className='font-semibold'>Max. <span>{selectedDuration} days</span></p>
                </div>

                <input
                  type="range"
                  min={minDays}
                  max={maxDays}
                  value={selectedDuration}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, red ${((selectedDuration - minDays) / (maxDays - minDays)) * 100}%, #ddd 0%)`,
                  }}
                />
              </div>
            </AccordionItem>
            {/* 
            <AccordionItem key="2" aria-label="Departure date" title="Departure date" className='font-semibold pl-1'>
              <div className='flex flex-col gap-3 font-normal pb-3'>
                <Checkbox size="md" radius='sm'>September-2024</Checkbox>
                <Checkbox size="md" radius='sm'>October-2024</Checkbox>
                {showdeparture && (
                  <>
                    <Checkbox size="md" radius='sm'>November-2024</Checkbox>
                    <Checkbox size="md" radius='sm'>December-2024</Checkbox>
                  </>
                )}
                <Button onClick={() => handledeparture()} className='w-full bg-[#ed1c24] text-white font-extrabold mt-3 text-base' radius='sm'>
                  {showdeparture ? 'show Less' : 'show More'}
                </Button>
              </div>
            </AccordionItem>

            <AccordionItem key="3" aria-label="Indian Tours" title="Indian Tours" className='font-semibold pl-1'>
              <div className='flex flex-col gap-3 font-normal pb-3'>
                <Checkbox size="md" radius='sm'>Andman</Checkbox>
                <Checkbox size="md" radius='sm'>Goa</Checkbox>
                {showstate && (
                  <>
                    <Checkbox size="md" radius='sm'>Gujrat</Checkbox>
                    <Checkbox size="md" radius='sm'>Kerala</Checkbox>
                  </>
                )}
                <Button onClick={() => handlestate()} className='w-full bg-[#ed1c24] text-white font-extrabold mt-3 text-base' radius='sm'>
                  {showstate ? 'show Less' : 'show More'}
                </Button>
              </div>
            </AccordionItem> */}

            <AccordionItem key="4" aria-label="Price" title="Price" className='font-semibold pl-1'>
              <div className='pb-3'>
                <div className="flex justify-between text-sm mb-2">
                  <p className='font-semibold'>Min. <span>&#8377; {minprice} </span></p>
                  <p className='font-semibold'>Max. <span>&#8377; {selectedprice}</span></p>
                </div>

                <input
                  type="range"
                  min={minprice}
                  max={maxprice}
                  value={selectedprice}
                  onChange={handleprice}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, red ${((selectedprice - minprice) / (maxprice - minprice)) * 100}%, #ddd 0%)`,
                  }}
                />
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>


      {/* for mobile view */}
      <div className='flex lg:hidden'>
        <div className=' w-full flex justify-between items-center gap-3 text-center'>
          <div className='w-[48%]'>
            {/* className='w-[40%]' */}
            <Datemodal onSelectedDuration={onSelectedDuration} />
          </div>
          {/* <div className='w-[25%]'>
            <Placemodal />
          </div> */}
          <div className='w-[48%]'>
            {/* className='w-[25%] */}
            <Filtermodal onselectedprice={onselectedprice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sitefilter