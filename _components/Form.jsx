"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import HotelTable from "@/_components/Admin/HotelTable";
import PdfUpload from "@/_components/Admin/PdfUpload";

const BASE_URL = process.env.BASE_URL;

// // console.log("Base Url: ", BASE_URL)

export default function TourPackageForm({ locationState, action, selectedPack, onCloseModal, categoryList }) {
  // console.log("selectedPack:::::>", selectedPack)

  const router = useRouter()

  const [packageName, setPackageName] = useState(action === "edit" ? selectedPack.package_name : "");
  const [packagePrice, setPackagePrice] = useState(action === "edit" ? selectedPack.price : "");
  const [places, setPlaces] = useState(action === "edit" ? selectedPack.places : [{ key: "0", image: "", name: "", file: File }]);
  const [highlights, setHighlights] = useState(action === "edit" ? selectedPack.highlights : [""]);
  const [notes, setNotes] = useState(action === "edit" ? selectedPack.notes : [""]);
  const [specialNotes, setSpecialNotes] = useState(action === "edit" ? selectedPack.special_notes : [""]);
  const [ourSpeciality, setOurSpeciality] = useState(action === "edit" ? selectedPack.our_speciality : [""]);
  const [importantNotes, setImportantNotes] = useState(action === "edit" ? selectedPack.important_notes : [""]);
  const [itinerary, setItinerary] = useState(action === "edit" ? [
    selectedPack.tour_itinerary
  ] : [
    { days: "", nights: "", cities: "", state_description: "" },
  ]);
  const [daysPlan, setDaysPlan] = useState(action === "edit" ? selectedPack.days_plan : [
    { day: 1, city_name: "", description: "", extra: "", inclusions: [] },
  ]);
  const [packageImage, setPackageImage] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);
  const [existingCarouselImages, setExistingCarouselImages] = useState(action === "edit" ? selectedPack.package_image : []);
  const fileInputRef = useRef(null);
  const fileInputRefPlace = useRef(null);


  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState('');

  const [selectedImageUrls, setSelectedImageUrls] = useState([]);

  const [imageUrls, setImageUrls] = useState([]);

  const [deleteImageUrls, setDeleteImageUrls] = useState([]);

  const [deletePlaces, setDeletePlaces] = useState([]);

  const [selectedState, setSelectedState] = useState(action === "edit" ? selectedPack.state : "");

  const [selectedCity, setSelectedCity] = useState(action === "edit" ? selectedPack.city : "");

  const [selectFlag, setSelectFlag] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("active");

  const [locationCity, setLocationCity] = useState([]);

  const [hotelsData, setHotelsData] = useState([]);

  const [packagePdfLink, setPackagePdfLink] = useState("");

  // const [selectedCategory, setSelectedCategory] = useState(action === "edit" ? selectedPack.category : []);

  const [selectedCategory, setSelectedCategory] = useState(action === "edit" ? {
    category: selectedPack.category,
  } : {
    category: [],
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState(action === "edit" ? {
    category: selectedPack.sub_category,
  } : {
    category: [],
  });

  // const [formData, setFormData] = useState({
  //   category: [],
  // });

  const addPlace = (index) => {
    setPlaces([...places, { key: index.toString(), image: "", name: "", file: File }]);
  };

  const addHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const addNotes = () => {
    setNotes([...notes, ""]);
  };

  const addSpecialNotes = () => {
    setSpecialNotes([...specialNotes, ""]);
  };

  const addOurSpeciality = () => {
    setOurSpeciality([...ourSpeciality, ""]);
  };

  const addImportantNotes = () => {
    setImportantNotes([...importantNotes, ""]);
  };

  const addItinerary = () => {
    setItinerary([
      ...itinerary,
      { days: "", nights: "", cities: "", state_description: "" },
    ]);
  };

  const addDayPlan = () => {
    setDaysPlan([
      ...daysPlan,
      {
        day: daysPlan.length + 1,
        city_name: "",
        description: "",
        extra: "",
        inclusions: [],
      },
    ]);
  };

  const handlePackageImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPackageImage(imageUrl);
    }
  };

  const handleCarouselImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setCarouselImages([...carouselImages, ...newImageUrls]);
    setFiles(Array.from(files));
  };

  const handlePlaceImageChange = (e, ind) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    const newPlaces = [...places];
    newPlaces[ind].image = newImageUrls[0];
    newPlaces[ind].file = files[0];
    setPlaces(newPlaces);
  };

  const removeCarouselImage = (index) => {
    setCarouselImages(carouselImages.filter((_, i) => i !== index));
  };

  const removeExistingCarouselImage = (index) => {
    deleteImageUrls.push(existingCarouselImages[index])
    setExistingCarouselImages(existingCarouselImages.filter((_, i) => i !== index));
  }

  useEffect(() => {
    // console.log("places::::::::>", carouselImages, files)
  }, [carouselImages, files])





  const handleUpload = async (files, folder) => {

    // console.log("File and folder: ", files, folder)
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('folder', folder);

    const response = await fetch('/api/imageApi', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    // console.log("Date:::::::>0,", data)
    if (data.success) {
      fetchImagesFromFolder(folder)
      setFiles([])
      // setSelectedImage("")
      // setSelectedFile([])
      // window.alert("Uploaded Successfully!")
    } else {
      console.error('Upload failed:', data.error);
    }
  };

  const fetchImagesFromFolder = async (folder) => {
    try {
      const response = await fetch(`/api/imageApi?folder=${encodeURIComponent(folder)}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setImageUrls(data.results);
        return data.results
      } else {
        console.error('Fetch failed:', data.error);
      }
    } catch (error) {
      // console.log("Err: ", error)
    }

  };

  const fetchImagesFromFolderPackage = async (folder) => {
    try {
      const response = await fetch(`/api/imageApi?folder=${encodeURIComponent(folder)}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setImageUrls(data.results);
        return data.resultPackage
      } else {
        console.error('Fetch failed:', data.error);
      }
    } catch (error) {
      // console.log("Err: ", error)
    }

  };


  const handleImageSelect = (url) => {
    setSelectedImageUrls((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };



  const handleDelete = async () => {
    try {
      const publicIds = deleteImageUrls.map(url => {
        // Extract the public ID from the image URL
        const urlParts = url.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];
        return publicId;
      });

      const response = await fetch('/api/imageApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicIds: publicIds, action: "delete", folder: selectedPack.package_id + "-" + selectedPack.package_name }),
      });

      const result = await response.json();
      if (result.success) {
        // Remove deleted images from the state
        setImageUrls((prev) =>
          prev.filter((url) => !selectedImageUrls.includes(url))
        );
        setSelectedImageUrls([]);
        // window.alert("Images deleted successfully!");
      } else {
        console.error('Delete failed:', result.error);
      }
    } catch (error) {
      console.error('Error deleting images:', error);
    }
  };


  const handleDeletePlaces = async () => {
    try {
      const response = await fetch("/api/imageApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ places: deletePlaces, action: "deletePlaces", folder: `${selectedPack.package_id}-${selectedPack.package_name}` }),
      });

      const result = await response.json();
      if (result.success) {
        setImageUrls((prev) => prev.filter((url) => !selectedImageUrls.includes(url)));
        setSelectedImageUrls([]);
        // Optional: Notify the user of success
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Error deleting place images:", error);
    }
  };






  const handlePlaceUpload = async (files, folder, subfolder) => {
    // console.log("File and folder: ", files, folder, subfolder)
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file.file);
    });

    places.forEach((place) => {
      if (place.file) {
        formData.append('files', place.file);
      }
      const { file, ...placeWithoutFile } = place;
      formData.append('places', JSON.stringify(placeWithoutFile));
    });

    formData.append('folder', folder);
    formData.append('subfolder', subfolder);
    formData.append('action', "placeUpload");

    const response = await fetch('/api/imageApi', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    // console.log("Date:::::::>0,", data)
    if (data.success) {
      fetchImagesFromFolder(folder)
      setFiles([])
      // setSelectedImage("")
      // setSelectedFile([])
      // window.alert("Uploaded Successfully!")
    } else {
      console.error('Upload failed:', data.error);
    }
  }



  const generateUniqueID = async () => {
    const response = await fetch("/api/packageApi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    let abc = result.result;

    if (abc.length === 0) {
      return `PK${String(0 + 1).padStart(5, "0")}`;
    } else {
      const lastElement = abc[abc.length - 1];
      const lastElementId = lastElement.package_id;

      const numericPartMatch = lastElementId.match(/PK0*(\d+)/);
      const lastNumericId = numericPartMatch ? parseInt(numericPartMatch[1]) : null;


      return `PK${String(lastNumericId + 1).padStart(5, "0")}`;
    }
  };

  useEffect(() => {
    // console.log("selectedCategory", selectedCategory)
  }, [selectedCategory])


  const handleSubmitPackage = async (e) => {

    e.preventDefault()
    // console.log("Datas::::::::>", packageName, packagePrice, places, highlights, itinerary, daysPlan, selectedCategory)

    const pk_id = await generateUniqueID();

    const folderName = pk_id + "-" + packageName;

    try {
      await handleUpload(files, folderName);

      const uploadedImages = await fetchImagesFromFolder(folderName)

      await handlePlaceUpload(places?.filter(item => item.file), folderName, "places");

      const pl = await Promise.all(places.map(async (item) => {

        const image = await fetchImagesFromFolder(`${folderName}/places/${item.name}`);

        return {
          name: item.name,
          image: image ? image[0] : ""
        };
      }));

      const payload = {
        package_id: pk_id,
        package_name: packageName,
        price: packagePrice,
        category: selectedCategory.category,
        sub_category: selectedSubCategory.category,
        state: selectedState,
        city: selectedCity,
        package_image: uploadedImages,
        places: pl,
        highlights: highlights,
        tour_itinerary: itinerary[0],
        days_plan: daysPlan,
        hotels: hotelsData,
        notes: notes,
        special_notes: specialNotes,
        our_speciality: ourSpeciality,
        important_notes: importantNotes,
        package_pdf: packagePdfLink,
        status: selectedStatus
      };

      // console.log("Datas payload::::::::>", payload);

      const response = await fetch("/api/packageApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      // console.log("Final Result::::::::>", payload);

      if (result.success === true) {
        alert("Data Saved Successfully!")
        router.push(`/admin/dashboard`)
      }

    } catch (error) {
      console.error("Error during package submission:", error);
    }

  }

  const handleSelectedState = async (selectedState) => {
    const encodedState = encodeURIComponent(selectedState);
    const response = await fetch(
      `/api/locationApi?state=${encodedState}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    // console.log("Result::::::>", result)
    setLocationCity(result.result1)
  }

  useEffect(() => {
    // console.log("Location::::>", selectedState)
    if (selectedState !== "") {
      handleSelectedState(selectedState)
      setSelectFlag(true)
    }
  }, [selectedState])

  async function renameFolder(oldFolderName, newFolderName) {
    try {
      const response = await fetch('/api/imageApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "rename", oldFolderName: oldFolderName, newFolderName: newFolderName }),
      });
    } catch (error) {
      console.error('Error renaming folder:', error);
    }
  }



  const handleEditPackage = async (e) => {
    // console.log("selectedCategory", selectedCategory)
    e.preventDefault();

    if (deleteImageUrls.length > 0) {
      await handleDelete();
    }

    if (deletePlaces.length > 0) {
      await handleDeletePlaces();
    }

    const folderName = `${selectedPack.package_id}-${selectedPack.package_name}`;

    // console.log("folderName::::::>", folderName)

    await handleUpload(files, folderName);

    const uploadedImages = await fetchImagesFromFolderPackage(folderName);

    // console.log("uploadedImages::::::>", places)

    await handlePlaceUpload(places?.filter(item => item.file), folderName, "places");

    const updatedPlaces = await Promise.all(
      places.map(async (place) => {

        const placeImages = await fetchImagesFromFolder(`${folderName}/places/${place.name}`);

        return {
          name: place.name,
          image: placeImages.length > 0 ? placeImages[0] : "",
        };
      })
    );

    // if(selectedPack.package_name !== packageName) {
    //   renameFolder((selectedPack.package_id + "-" + selectedPack.package_name), (selectedPack.package_id + "-" + packageName));
    // }

    const payload = {
      package_id: selectedPack.package_id,
      package_name: packageName,
      price: packagePrice,
      category: selectedCategory.category,
      sub_category: selectedSubCategory.category,
      state: selectedState,
      city: selectedCity,
      package_image: uploadedImages,
      places: updatedPlaces.filter((place) => place.name !== "" && place.image !== ""),
      highlights: highlights,
      tour_itinerary: itinerary[0],
      days_plan: daysPlan,
      hotels: hotelsData,
      notes: notes,
      special_notes: specialNotes,
      status: selectedStatus,
      our_speciality: ourSpeciality,
      important_notes: importantNotes,
      package_pdf: packagePdfLink,
      action: "edit",
    };

    // console.log("Payload Edit::::::>", payload)

    // Send the payload to the API
    try {
      const response = await fetch("/api/packageApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert("Updated Successfully!")
        onCloseModal(true)
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      // console.log("selectedCategory::::::::>", selectedCategory.category)
    }
  }, [selectedCategory])

  const handleCategoryRemove = (serviceToRemove) => {
    setSelectedCategory((prevData) => ({
      ...prevData,
      category: prevData.category.filter(
        (service) => service !== serviceToRemove
      ),
    }));
  };

  const handleSubCategoryRemove = (serviceToRemove) => {
    setSelectedSubCategory((prevData) => ({
      ...prevData,
      category: prevData.category.filter(
        (service) => service !== serviceToRemove
      ),
    }));
  };


  const handleHotelsTableChange = (val) => {
    setHotelsData(val)
  }


  const handleSetDownloadURL = (val) => {
    setPackagePdfLink(val)
  }



  return (
    <form onSubmit={(e) => {

      if (action === "edit") {

        handleEditPackage(e)

      } else {

        handleSubmitPackage(e)

      }

    }}>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="space-y-4 bg-white shadow-md p-5">
          <h2 className="text-xl font-semibold">Package Details</h2>
          <div className="rounded-lg space-y-4  gap-5">
            <div className=" md:grid-cols-2 gap-4 flex flex-col">

              <input
                type="text"
                placeholder="Package Name"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Package Price"
                value={packagePrice}
                onChange={(e) => setPackagePrice(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">

              <div>
                <p className="text-lg font-semibold pb-2">Main Category:</p>
                <select
                  className="block w-full px-4 py-2 border rounded-lg mb-4"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue && !selectedCategory?.category?.includes(selectedValue)) {
                      setSelectedCategory((prevData) => ({
                        ...prevData,
                        category: [...(prevData.category || []), selectedValue],  // Provide default empty array
                      }));

                    }
                  }}
                  value=""
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {categoryList?.filter((item) => item.category_type === "main").map((category) => (
                    <option
                      key={category.category_name}
                      value={category.category_name}
                      disabled={selectedCategory?.category?.includes(category.category_name)}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>


                {/* Selected Services */}
                <div className="mb-4 grid grid-cols-2 gap-2 h-[50%] overflow-auto">
                  {selectedCategory?.category?.map((service) => (
                    <div
                      key={service}
                      className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-xl"
                    >
                      <span>{service}</span>
                      <button
                        type="button"
                        onClick={() => handleCategoryRemove(service)}
                        className="ml-1 text-black font-bold p-1 bg-white rounded-full"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>





              <div>
                <p className="text-lg font-semibold pb-2">Sub Category:</p>
                <select
                  className="block w-full px-4 py-2 border rounded-lg mb-4"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue && !selectedSubCategory?.category?.includes(selectedValue)) {
                      setSelectedSubCategory((prevData) => ({
                        ...prevData,
                        category: [...(prevData.category || []), selectedValue],  // Provide default empty array
                      }));

                    }
                  }}
                  value=""
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {categoryList?.filter((item) => item.category_type === "sub").map((category) => (
                    <option
                      key={category.category_name}
                      value={category.category_name}
                      disabled={selectedSubCategory?.category?.includes(category.category_name)}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>


                {/* Selected Services */}
                <div className="mb-4 grid grid-cols-2 gap-2 h-[50%] overflow-auto">
                  {selectedSubCategory?.category?.map((service) => (
                    <div
                      key={service}
                      className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-xl"
                    >
                      <span>{service}</span>
                      <button
                        type="button"
                        onClick={() => handleSubCategoryRemove(service)}
                        className="ml-1 text-black font-bold p-1 bg-white rounded-full"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>





            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold pb-2">State</h2>
                <Autocomplete
                  variant="bordered"
                  placeholder="State"
                  className="max-w-xs"
                  value={selectedState}
                  defaultSelectedKey={selectedState}
                  // selectedKey={value}
                  // onSelectionChange={setValue}
                  onInputChange={(value) => {
                    setSelectedState(value.toLocaleLowerCase())
                  }}
                >
                  {
                    locationState?.map((item) => {

                      const sentenceCaseItem = item.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ');

                      return (
                        <AutocompleteItem key={item}>{sentenceCaseItem}</AutocompleteItem>
                      )
                    })
                  }
                </Autocomplete>
              </div>
              <div>
                <h2 className="text-xl font-semibold pb-2">City</h2>
                <Autocomplete
                  variant="bordered"
                  placeholder="City"
                  className="max-w-xs"
                  defaultSelectedKey={action === "edit" ? selectedCity : locationCity.length > 0 ? locationCity[0].city : ""}
                  value={selectedCity}
                  // selectedKey={value}
                  // onSelectionChange={setValue}
                  onInputChange={(value) => {
                    setSelectedCity(value.toLocaleLowerCase())
                  }}
                  isDisabled={selectFlag === true ? false : true}
                >
                  {
                    locationCity?.map((item) => {

                      const sentenceCaseItem = item?.city.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ');

                      return (
                        <AutocompleteItem key={item.city}>{sentenceCaseItem}</AutocompleteItem>
                      )
                    })
                  }
                </Autocomplete>
              </div>



            </div>

            <h2 className="text-xl font-semibold">Carousel Images</h2>
            <div className=" flex items-center justify-center border-2 border-dashed rounded-lg p-8">

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="border p-2 rounded-md flex items-center"
                >
                  <div className="relative w-40 h-40 flex justify-center items-center">
                    <Plus className="size-8 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {existingCarouselImages.map((image, index) => (
              <div key={index} className="relative ">
                <div className="h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center gap-5">
                  <div className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={`Carousel ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeExistingCarouselImage(index)}
                  className="absolute top-0 right-0 text-red-500 p-2 rounded-full flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {carouselImages.map((image, index) => (
              <div key={index} className="relative ">
                <div className="h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center gap-5">
                  <div className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={`Carousel ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeCarouselImage(index)}
                  className="absolute top-0 right-0 text-red-500 p-2 rounded-full flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Places */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Places you&apos;ll see</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place, index) => (
              <><div key={index} className="relative px-4 py-6 border">
                <div className="h-[150px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
                  {place.image ? (
                    <div className="relative h-[150px] w-full">
                      <Image
                        src={place.image}
                        alt={place.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg w-full h-full" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRefPlace.current.click()}
                      className="border p-2 rounded-md flex items-center"
                    >
                      <div className="relative w-40 h-40 flex justify-center items-center">
                        <Plus className="text-gray-400 cursor-pointer" />
                      </div>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Place name"
                  value={place.name}
                  onChange={(e) => {
                    const newPlaces = [...places];
                    newPlaces[index].name = e.target.value;
                    setPlaces(newPlaces);
                  }}
                  className="mt-2 border border-gray-300 p-2 rounded-md w-full" />
                <button
                  type="button"
                  onClick={() => {
                    deletePlaces.push(places[index].name)
                    const newPlaces = places.filter((_, i) => i !== index);
                    setPlaces(newPlaces);
                  }}
                  className="absolute top-0 right-0 text-red-500 p-2 rounded-full flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

                <input
                  type="file"
                  ref={fileInputRefPlace}
                  onChange={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handlePlaceImageChange(e, index);
                  }}
                  className="hidden"
                  accept="image/*" />
              </>
            ))}
            <button
              type="button"
              onClick={() => addPlace(places.length)}
              className="border border-gray-300 p-2 rounded-md w-full flex items-center justify-center"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>

        `        {/* Highlights */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Highlights</h2>
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => {
                  const newHighlights = [...highlights];
                  newHighlights[index] = e.target.value;
                  setHighlights(newHighlights);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const newHighlights = highlights.filter((_, i) => i !== index);
                  setHighlights(newHighlights);
                }}
                className="bg-transparent p-2 rounded-md"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="border border-gray-300 p-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </button>
        </div>`


        {/* Notes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notes</h2>
          {notes?.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => {
                  const newHighlights = [...notes];
                  newHighlights[index] = e.target.value;
                  setNotes(newHighlights);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const newHighlights = notes.filter((_, i) => i !== index);
                  setNotes(newHighlights);
                }}
                className="bg-transparent p-2 rounded-md"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNotes}
            className="border border-gray-300 p-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </button>
        </div>



        {/* Special Notes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Special Notes</h2>
          {specialNotes?.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => {
                  const newHighlights = [...specialNotes];
                  newHighlights[index] = e.target.value;
                  setSpecialNotes(newHighlights);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const newHighlights = specialNotes.filter((_, i) => i !== index);
                  setSpecialNotes(newHighlights);
                }}
                className="bg-transparent p-2 rounded-md"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecialNotes}
            className="border border-gray-300 p-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </button>
        </div>




        {/* Our Speciality */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Our Speciality</h2>
          {ourSpeciality?.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => {
                  const newHighlights = [...ourSpeciality];
                  newHighlights[index] = e.target.value;
                  setOurSpeciality(newHighlights);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const newHighlights = ourSpeciality?.filter((_, i) => i !== index);
                  setOurSpeciality(newHighlights);
                }}
                className="bg-transparent p-2 rounded-md"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOurSpeciality}
            className="border border-gray-300 p-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </button>
        </div>



        {/* Important Notes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Important Notes</h2>
          {importantNotes?.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => {
                  const newHighlights = [...importantNotes];
                  newHighlights[index] = e.target.value;
                  setImportantNotes(newHighlights);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const newHighlights = importantNotes?.filter((_, i) => i !== index);
                  setImportantNotes(newHighlights);
                }}
                className="bg-transparent p-2 rounded-md"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImportantNotes}
            className="border border-gray-300 p-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </button>
        </div>





        {/* Tour Itinerary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tour Itinerary</h2>
          {itinerary.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 lg:grid-cols-5 gap-4 items-center"
            >
              <input
                type="text"
                placeholder="Days"
                value={item.days}
                onChange={(e) => {
                  const newItinerary = [...itinerary];
                  newItinerary[index].days = e.target.value;
                  setItinerary(newItinerary);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Nights"
                value={item.nights}
                onChange={(e) => {
                  const newItinerary = [...itinerary];
                  newItinerary[index].nights = e.target.value;
                  setItinerary(newItinerary);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Cities"
                value={item.cities}
                onChange={(e) => {
                  const newItinerary = [...itinerary];
                  newItinerary[index].cities = e.target.value;
                  setItinerary(newItinerary);
                }}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <textarea
                type="text"
                placeholder="State Description"
                value={item.state_description}
                onChange={(e) => {
                  const newItinerary = [...itinerary];
                  newItinerary[index].state_description = e.target.value;
                  setItinerary(newItinerary);
                }}
                className="border border-gray-300 p-2 rounded-md w-full col-span-2 h-11"
              />
              {/* <button
              onClick={() => {
                const newItinerary = itinerary.filter((_, i) => i !== index);
                setItinerary(newItinerary);
              }}
              className="bg-transparent p-2 rounded-md flex justify-end"
            >
              <X className="h-4 w-4 text-red-500" />
            </button> */}
            </div>
          ))}
          {/* <button
          onClick={addItinerary}
          className="border border-gray-300 p-2 rounded-md flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> Add
        </button> */}
        </div>

        {/* Days Plan */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Days Plan</h2>
          {daysPlan.map((day, index) => (
            <div
              key={index}
              className="bg-white p-4 border border-gray-300 rounded-lg shadow-md relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Day {day.day}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newDaysPlan = daysPlan.filter((_, i) => i !== index);
                    setDaysPlan(newDaysPlan);
                  }}
                  className="absolute top-2 right-2 border border-red-500 text-red-500 p-2 rounded-full flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter City Name"
                value={day.city_name}
                onChange={(e) => {
                  const newDaysPlan = [...daysPlan];
                  newDaysPlan[index].city_name = e.target.value;
                  setDaysPlan(newDaysPlan);
                }}
                className="border border-gray-300 p-2 rounded-md w-full mb-2"
              />
              <textarea
                placeholder="Enter Description"
                value={day.description}
                onChange={(e) => {
                  const newDaysPlan = [...daysPlan];
                  newDaysPlan[index].description = e.target.value;
                  setDaysPlan(newDaysPlan);
                }}
                className="border border-gray-300 p-2 rounded-md w-full mb-4"
              />
              <input
                type="text"
                placeholder="Enter Extra Toppings"
                value={day.extra}
                onChange={(e) => {
                  const newDaysPlan = [...daysPlan];
                  newDaysPlan[index].extra = e.target.value;
                  setDaysPlan(newDaysPlan);
                }}
                className="border border-gray-300 p-2 rounded-md w-full mb-2"
              />
              <div className="flex space-x-2">
                {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                  <button
                    type="button"
                    key={meal}
                    onClick={() => {
                      const newDaysPlan = [...daysPlan];
                      if (newDaysPlan[index].inclusions.includes(meal)) {
                        newDaysPlan[index].inclusions = newDaysPlan[
                          index
                        ].inclusions.filter((i) => i !== meal);
                      } else {
                        newDaysPlan[index].inclusions.push(meal);
                      }
                      setDaysPlan(newDaysPlan);
                    }}
                    className={`border border-gray-300 p-2 rounded-md ${day.inclusions.includes(meal)
                      ? "bg-blue-500 text-white"
                      : ""
                      }`}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>
          ))}


          <button
            type="button"
            onClick={addDayPlan}
            className="border border-gray-300 p-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add more Days
          </button>
        </div>


        <div>
          <div className="text-xl font-semibold">Hotels</div>

          <HotelTable onHotelsChange={handleHotelsTableChange} selectedPack={selectedPack} action={action} />

        </div>
        <div className="p-4">
          <PdfUpload onSetDownloadURL={handleSetDownloadURL} selectedPack={selectedPack}/>
        </div>


        <Autocomplete
          variant="bordered"
          placeholder="Status"
          className="max-w-xs"
          defaultSelectedKey={action === "edit" ? selectedPack.status : "active"}
          value={selectedStatus}
          onInputChange={(value) => {
            setSelectedStatus(value.toLowerCase())
          }}
        >

          <AutocompleteItem key={"active"} value={"active"}>{"Active"}</AutocompleteItem>
          <AutocompleteItem key={"inactive"} value={"inactive"}>{"Inactive"}</AutocompleteItem>


        </Autocomplete>


        <input
          type="file"
          ref={fileInputRef}
          onChange={handleCarouselImageChange}
          className="hidden"
          accept="image/*"
          multiple
        />
      </div>

      <div className="flex justify-center p-4">
        <Button
          type="submit"
          size="lg"
          className="border border-gray-300 p-2 rounded-lg bg-blue-500 text-white"
        >
          Submit
        </Button>
        {action === "edit" ? ""
          : <Button
            type="button"
            size="lg"
            className="border border-gray-300 p-2 rounded-lg bg-white text-black ml-4"
            onClick={() => window.location.reload()}
          >
            Cancel
          </Button>
        }

      </div>

    </form>
  );
}