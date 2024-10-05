'use client'
import React, { useState, useEffect, useRef } from "react";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import Image from "next/image"

const ReviewForm = () => {

    const [imageUrls, setImageUrls] = useState([]);

    const [allPackages, setAllPackages] = useState([])

    const [files, setFiles] = useState([]);

    const [selectedValue, setSelectedValue] = React.useState(new Set([]));

    const [carouselImages, setCarouselImages] = useState([]);

    const animals = allPackages;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        packageName: "",
        rating: "",
        tourLeader: "",
        travelledDate: "",
        tagline: "",
        description: ""
    });

    const fileInputRef = useRef(null);

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
            console.log("Err: ", error)
        }

    };

    const handleUpload = async (files, folder) => {

        console.log("File and folder: ", files, folder)
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
        console.log("Date:::::::>0,", data)
        if (data.success) {
            fetchImagesFromFolder(folder)
            setFiles([])
        } else {
            console.error('Upload failed:', data.error);
        }
    };

    const generateUniqueID = async () => {
        const response = await fetch("/api/reviewApi", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        let abc = result.result;

        if (abc.length === 0) {
            return `RF${String(0 + 1).padStart(5, "0")}`;
        } else {
            const lastElement = abc[abc.length - 1];
            const lastElementId = lastElement.package_id;

            const numericPartMatch = lastElementId.match(/RF*(\d+)/);
            const lastNumericId = numericPartMatch ? parseInt(numericPartMatch[1]) : null;


            return `PK${String(lastNumericId + 1).padStart(5, "0")}`;
        }
    };

    function getCurrentDateTime() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const rf_id = await generateUniqueID();

            const folderName = "reviews/" + selectedValue.currentKey + "-" + formData.packageName + `/${rf_id}-${formData.name}`;

            await handleUpload(files, folderName);

            const uploadedImages = await fetchImagesFromFolder(folderName)
            console.log("uploadedImages:::>", uploadedImages)

            const payload = {
                review_id: rf_id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                package_name: formData.packageName,
                package_id: selectedValue.currentKey,
                rating: formData.rating,
                tour_leader: formData.tourLeader,
                traveled_date: formData.travelledDate,
                tagline: formData.tagline,
                description: formData.description,
                image: uploadedImages,
                creation_date: getCurrentDateTime()
            }

            const response = await fetch(
                `/api/reviewApi`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                }
            );
            const result = await response.json();

            if (result.success === true) {
                alert("Thanks for the review!")
                window.location.reload()
            }

        } catch (error) {

        }

    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "packageName") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: allPackages?.find((item) => item.package_id === value).package_name,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        const abc = async () => {
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
            setAllPackages(result1.result)
        }

        abc()
    }, [])

    const handleCarouselImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        setCarouselImages([...carouselImages, ...newImageUrls]);
        setFiles(Array.from(files));
    };

    const removeCarouselImage = (index) => {
        setCarouselImages(carouselImages.filter((_, i) => i !== index));
    };



    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>

            {/* Form Start */}
            <form onSubmit={(e) => {



                handleSubmit(e)



            }}>
                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <Input
                        fullWidth
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <Input
                        fullWidth
                        placeholder="Your Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Phone Number</label>
                    <Input
                        fullWidth
                        placeholder="Your Phone Number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Package Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Package Name</label>
                    {/* <Input
            fullWidth
            placeholder="Package Name"
            name="packageName"
            value={formData.packageName}
            onChange={handleInputChange}
          /> */}

                    <Select
                        name="packageName"
                        variant="bordered"
                        placeholder="Select a package"
                        selectedKeys={selectedValue}
                        className="max-w-xs"
                        onSelectionChange={setSelectedValue}
                        onChange={handleInputChange}
                    >
                        {animals.map((animal) => (
                            <SelectItem key={animal.package_id}>
                                {animal.package_name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Rating */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Rating</label>
                    <Input
                        fullWidth
                        placeholder="Rate from 1 to 5"
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                    />
                </div>

                {/* Tour Leader */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Tour Leader</label>
                    <Input
                        fullWidth
                        placeholder="Tour Leader's Name"
                        name="tourLeader"
                        value={formData.tourLeader}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Travelled Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Travelled Date</label>
                    <Input
                        fullWidth
                        type="date"
                        name="travelledDate"
                        value={formData.travelledDate}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Tagline */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Tag line</label>
                    <Input
                        fullWidth
                        type="text"
                        name="tagline"
                        placeholder="Tag Line"
                        value={formData.tagline}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Description</label>
                    <Textarea
                        fullWidth
                        placeholder="Describe your experience..."
                        minRows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className=" flex items-center justify-center border-2 border-dashed rounded-lg p-8">

                    <div className="flex flex-col items-center">

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleCarouselImageChange}
                            className="hidden"
                            accept="image/*"
                            multiple
                        />
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
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {/* {existingCarouselImages.map((image, index) => (
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
                    ))} */}
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

                {/* Submit Button */}
                <div className="text-right">
                    <Button color="primary" type="submit">
                        Submit Review
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
