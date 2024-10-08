"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const FooterTabs = () => {
  const [activeTab, setActiveTab] = useState("popular");

  const [allPackage, setAllPackage] = useState([]);
  console.log(allPackage, "allPackage");

  const [showMore, setShowMore] = useState(false);
  console.log(showMore, "showMore");

  const router = useRouter();

  const tabs = [
    { id: "popular", label: "Popular" },
    { id: "winter", label: "Winter Special" },
    { id: "beaches", label: "Beaches" },
    { id: "mountains", label: "Mountains" },
    { id: "unique", label: "Unique Stays" },
  ];

  // const kutchLinks = [
  //   { id: 1, name: "Rann of Kutch 1", link: "#" },
  //   { id: 2, name: "Rann of Kutch 2", link: "#" },
  //   { id: 3, name: "Rann of Kutch 3", link: "#" },
  //   { id: 4, name: "Rann of Kutch 4", link: "#" },
  //   { id: 5, name: "Rann of Kutch 5", link: "#" },
  //   { id: 6, name: "Rann of Kutch 6", link: "#" },
  //   { id: 7, name: "Rann of Kutch 7", link: "#" },
  //   { id: 8, name: "Rann of Kutch 8", link: "#" },
  //   { id: 9, name: "Rann of Kutch 9", link: "#" },
  //   { id: 10, name: "Rann of Kutch 10", link: "#" },
  //   { id: 11, name: "Rann of Kutch 11", link: "#" },
  //   { id: 12, name: "Rann of Kutch 12", link: "#" },
  // ];

  useEffect(() => {
    const abc = async () => {
      try {
        const response = await fetch("/api/packageApi", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        // console.log("Data:", result.result);
        setAllPackage(result.result)
      } catch (error) {
        // console.log("Error:", error);
      }
    }
    abc()

  }, [])

  const handleCardClick = (id) => {
    if (id) {
      router.push(`/packages?id=${id}`)
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } else {
      console.error("No package ID provided");
    }
  }

  const handleShowMoreToggle = () => {
    setShowMore(!showMore);
  };

  const filteredPackages = allPackage.filter((item) =>
    item.sub_category.includes(activeTab.toUpperCase())
  );

  const displayedPackages = showMore ? filteredPackages : filteredPackages.slice(0, 14);

  return (
    <div className="flex w-[95%] mx-auto flex-col py-10 border-b-2 gap-5">
      {/* Tabs Header */}
      <div className="flex flex-col ">
        <div className="flex justify-between mb-5 flex-col lg:flex-row gap-5">
          <h2 className="text-lg lg:text-2xl font-semibold">
            Inspiration for future getaways
          </h2>
          {/* <div>
            <button className="p-3 lg:px-8 lg:py-3 bg-themeColor text-white rounded-xl font-semibold">
              Get a call back!
            </button>
          </div> */}
        </div>

        <div className="flex w-full overflow-x-auto border-b border-gray-200 scrollbar-hide justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowMore(false);
              }}
              className={`text-sm lg:text-lg py-2 px-4 whitespace-nowrap ${activeTab === tab.id
                ? "text-themeColor border-b-2 border-themeColor"
                : "text-gray-400"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
          {displayedPackages.map((link) => (
            <div
              key={link.package_id}
              className="flex items-center p-1 lg:p-1 rounded-lg text-start hover:bg-gray-100 gap-2 bg-white border shadow-sm cursor-pointer"
              onClick={() => handleCardClick(link.package_id)}
            >
              <div className="relative h-[60px] w-[35%] rounded-xl overflow-hidden shadow-lg">
                <Image src={link?.package_image[0]} alt="" fill className="object-fit" />
              </div>
              <p className="w-[50%] text-sm lg:text-[15px] font-semibold lg:font-medium lg:w-full opacity-80 lg:pl-2">
                {link.package_name}
              </p>
            </div>
          ))}

          {filteredPackages.length > 14 && (
            <div className="flex justify-start items-center">
              <button
                onClick={handleShowMoreToggle}
                className="px-4 py-2 font-bold underline text-gray-600 cursor-pointer"
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>

        {/* {filteredPackages.length > 15 && (
          <div className="mt-4">
            <button
              onClick={handleShowMoreToggle}
              className="px-4 py-2 bg-themeColor text-white rounded-lg"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FooterTabs;
