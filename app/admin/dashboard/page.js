'use client'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User, Input, Tabs,
  Tab,
  Card,
  CardBody, CardHeader,
  Badge, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete,
  AutocompleteItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Power, IndianRupee } from "lucide-react";
import Link from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import TourPackageForm from '@/_components/Form';
import Image from 'next/image';
import Swal from 'sweetalert2';
import PackageSlider from "@/_components/Admin/PackageSlider"
import PlacesSlider from "@/_components/Admin/PlaceSlider"
import Highlights from '@/_components/Admin/Highlights';
import DaysPlan from '@/_components/Admin/DaysPlan';
import Notes from '@/_components/Admin/Notes';
import SpecialNotes from '@/_components/Admin/SpecialNotes';
import OurSpeciality from '@/_components/Admin/OurSpeciality';
import ImportantNotes from '@/_components/Admin/ImportantNotes';


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

const Dashboard = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [actionModal, setActionModal] = useState("")

  const [selectedPack, setSelectedPack] = useState({})

  const [categoryList, setCategoryList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("ALL");

  let tabs = [
    {
      id: "all",
      label: "All",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: "active",
      label: "Active",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      id: "inactive",
      label: "Inactive",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];


  const [allPackages, setAllPackages] = useState([]);

  const [session, setSession] = useState({});
  const [locationState, setLocationState] = useState([]);

  let router = useRouter();

  useEffect(() => {

    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();

  }, []);


  const initialFxn = async () => {
    const response = await fetch(
      `/api/locationApi`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    // console.log("Result::::::>", result)
    setLocationState(result.result)


    const response1 = await fetch(
      `/api/packageApi`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result1 = await response1.json();
    // console.log("Result::::::>", result1)
    setAllPackages(result1.result)

    const response2 = await fetch(
      `/api/categoryApi`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result2 = await response2.json();
    // console.log("Result::::::>", result2)
    setCategoryList(result2.data)
  }

  useEffect(() => {
    initialFxn()
  }, [])

  const handleDelete = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const payload = {
          package_id: id,
          action: "delete"
        }

        const response = await fetch(
          `/api/packageApi`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
          }
        );
        const result = await response.json();

        setAllPackages(result.result)

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });



  }

  const handleEdit = async (id) => {

    setActionModal("editModal")

    const pack = allPackages.find((item) => item.package_id === id)

    setSelectedPack(pack)

    onOpen()

  }

  const handleCloseModal = async (val) => {
    if (val === true) {
      const response1 = await fetch(
        `/api/packageApi`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result1 = await response1.json();
      // console.log("Result::::::>", result1)
      setAllPackages(result1.result)

      onClose()
    }
  }

  const handleSeeDetails = (id) => {

    const pack = allPackages.find((item) => item.package_id === id)

    setSelectedPack(pack)

    setActionModal("seedetails")

    onOpen()

  }

  // useEffect(() => {
  //   if (selectedCategory) {
  //     const filteredPackages = allPackages.find((item) => item.category === selectedCategory)
  //   }
  // }, [selectedCategory])


  return (<>


    {/* <div className='flex justify-end p-4'>
          <Button
            className=''
            onClick={() => {
              setPackageClicked(prev => !prev);
            }}
          >
            Add Package
          </Button>
        </div> */}
    <div className="min-h-screen p-4 bg-gray-100">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold drop-shadow-md">Packages</h1>
        <div className="text-gray-500">Wednesday, 12 July 2023</div>
      </header>
      <div className='pb-4'>

        <Autocomplete
          variant="bordered"
          placeholder="Category"
          className="max-w-xs"
          defaultSelectedKey={selectedCategory}
          value={selectedCategory}
          onInputChange={(value) => {
            setSelectedCategory(value)
          }}
        >
          <AutocompleteItem key={"ALL"} value={"ALL"}>{"ALL"}</AutocompleteItem>
          {categoryList.map((item) => {
            return (
              <AutocompleteItem key={item.category_name} value={item.category_name}>{item.category_name}</AutocompleteItem>
            )
          })}
        </Autocomplete>
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex w-full flex-col">

          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item) => {

              let filteredPackages = [];

              if (item.id === "all") {
                filteredPackages = allPackages;
              }

              if (item.id === "active") {
                filteredPackages = allPackages.filter((item) => item.status === "active");
              }

              if (item.id === "inactive") {
                filteredPackages = allPackages.filter((item) => item.status === "inactive");
              }

              if (selectedCategory !== "ALL") {
                filteredPackages = filteredPackages.filter((item) => item.category === selectedCategory)
              }

              return (
                <Tab key={item.id} title={item.label}>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {filteredPackages.map((pack) => (
                      <Card key={pack.package_id} className="flex flex-col h-auto">
                        <div className="flex flex-col flex-grow">
                          {/* Card Header with Image */}
                          <div className="relative group flex-shrink-0 h-[220px] overflow-hidden">
                            <Image
                              src={pack.package_image[0]}
                              fill
                              className='object-cover rounded-t-lg transition-transform duration-500 ease-in-out transform group-hover:scale-110'
                              alt={pack.package_name}
                            />
                          </div>

                          {/* Card Body */}
                          <CardBody className="flex flex-col justify-between flex-grow">
                            {/* Package Name and Location */}
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <h2 className="text-lg font-semibold">{pack.package_name}</h2>
                                <p className="text-sm text-gray-500">{`${pack.state}, ${pack.city}`}</p>
                              </div>
                              <Button variant="default" className="font-semibold">{(pack.status).toUpperCase()}</Button>
                            </div>
                            {/* 
                                  <div className='border bottom'></div>
  
                                  <div className='flex flex-row flex-wrap gap-4 justify-evenly pt-2 pb-2'>
                                    <div className='w-28 text-center'>Days</div>
                                    <div className='w-28 text-center'>Description</div>
                                    {pack.days_plan.map((day, index) => (
                                      <React.Fragment key={index}>
                                        <div className='w-28 text-sm opacity-80 text-center'>{day.day}</div>
                                        <div className='w-28 text-sm opacity-80 text-center'>{day.description}</div>
                                      </React.Fragment>
                                    ))}
                                  </div>
  
                                  <div className='border bottom'></div> */}

                            <div className="flex justify-between text-lg font-semibold mb-4">
                              <p>Price</p>
                              <p className='inline-flex'>
                                <IndianRupee className='h-5 w-5 mt-1' />
                                {pack.price}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between mt-auto">
                              <Button className="bg-green-200 text-black font-semibold px-4 py-2 rounded-lg" onClick={() => handleEdit(pack.package_id)}>
                                Edit
                              </Button>
                              <Button className="bg-red-200 text-black font-semibold px-4 py-2 rounded-lg" onClick={() => handleDelete(pack.package_id)}>
                                Delete
                              </Button>
                              <Button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg" onClick={() => handleSeeDetails(pack.package_id)}>
                                See Details
                              </Button>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    ))}
                  </div>


                </Tab>
              )
            }}
          </Tabs>
          {/* <Button variant="outline">All</Button>
                <Button variant="default">On Process</Button>
                <Button variant="outline">Completed</Button> */}
        </div>
        {/* <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input type="search" placeholder="Search a name, order, or etc" className="pl-10" />
              </div> */}
      </div>
    </div>







    <Modal
      size={"5xl"}
      isOpen={isOpen}
      onClose={onClose}
      placement='top'
      scrollBehavior='inside'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{actionModal === "seedetails" ? "Details" : "Edit Package"}</ModalHeader>
            <ModalBody className="">
              {actionModal === "seedetails" ? (
                <>
                  <div>
                    <PackageSlider selectedPack={selectedPack} />

                    <div className="flex flex-col space-y-2 w-full pt-8">
                      <div className="w-[90%] self-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {selectedPack.package_name}
                        </h1>
                        <p className="text-lg text-gray-600">
                          {selectedPack.state + "," + selectedPack.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 w-full pt-8">
                      <div className="w-[90%] self-center">
                        <p className="text-2xl font-semibold mb-4">Category</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedPack.category.map((item, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full shadow-sm border border-blue-200 text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 w-full pt-8">
                      <div className="w-[90%] self-center">
                        <p className="text-2xl font-semibold mb-4">Sub Category</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedPack.sub_category.map((item, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full shadow-sm border border-blue-200 text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>


                    <PlacesSlider selectedPack={selectedPack} />

                    <Highlights selectedPack={selectedPack} />

                    <Notes selectedPack={selectedPack} />

                    <SpecialNotes selectedPack={selectedPack} />

                    <OurSpeciality selectedPack={selectedPack} />

                    <SpecialNotes selectedPack={selectedPack} />

                    <ImportantNotes selectedPack={selectedPack} />

                    <div className="max-w-4xl mx-auto p-4">
                      <h2 className="text-2xl font-semibold mb-4">Tour Itenerary</h2>
                      <p className="text-md font-semibold mb-4">{selectedPack.tour_itinerary.days} Days {selectedPack.tour_itinerary.nights} Nights, {selectedPack.tour_itinerary.cities} Cities</p>
                      <ul className="space-y-4">
                        <span className='font-semibold'>{selectedPack.tour_itinerary.state_description.split(":" || "-")[0] + ":"}</span>
                        <span className="font-normal">
                          {selectedPack.tour_itinerary.state_description.split(":" || "-")[1]}
                        </span>
                      </ul>
                    </div>

                    <DaysPlan selectedPack={selectedPack} />



                    {selectedPack?.hotels?.length > 0
                      ? <div className="flex flex-col gap-5 max-w-4xl mx-auto p-4">
                        <h2 className="text-xl font-semibold">Hotels</h2>
                        <Table aria-label="Hotel Information Table">
                          <TableHeader>
                            <TableColumn>Place</TableColumn>
                            <TableColumn>Hotel</TableColumn>
                            <TableColumn>Nights</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {selectedPack?.hotels?.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.place}</TableCell>
                                <TableCell>{item.hotel}</TableCell>
                                <TableCell>{item.nights}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* <div className="flex justify-center items-center">
                          <p>
                            <span className="text-lg ">Note :</span> Under unavoidable
                            circumtances Hotels are subject to change, in such condition
                            substitute hotel of similar category is provided.
                          </p>
                        </div> */}

                      </div>
                      : ""}
                  </div>
                </>
              ) : (
                <TourPackageForm
                  locationState={locationState}
                  action="edit"
                  selectedPack={selectedPack}
                  onCloseModal={handleCloseModal}
                  categoryList={categoryList}
                />
              )}
            </ModalBody>

            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button> */}
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>

  )
}

export default Dashboard;
