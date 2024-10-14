"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const FooterTabs = () => {
  const [activeTab, setActiveTab] = useState("popular");

  const [allPackage, setAllPackage] = useState([]);

  const [showMore, setShowMore] = useState(false);

  const router = useRouter();

  const tabs = [
    { id: "popular", label: "Popular" },
    { id: "winter", label: "Winter Special" },
    { id: "beaches", label: "Beaches" },
    { id: "mountains", label: "Mountains" },
    { id: "unique", label: "Unique Stays" },
  ];

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

        setAllPackage(result.result)
      } catch (error) {

      }
    }
    abc()

  }, [])

  const handleCardClick = (id) => {
    if (id) {
      router.push(`/packages/${id}`)
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
      <div className="flex flex-col ">
        <div className="flex justify-between mb-5 flex-col lg:flex-row gap-5">
          <h2 className="text-lg lg:text-2xl font-semibold">
            Inspiration for future getaways
          </h2>
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

      <div className="mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
          {displayedPackages?.map((link) => (
            <div
              key={link.package_id}
              className="flex items-center p-1 lg:p-1 rounded-lg text-start hover:bg-gray-100 gap-2 bg-white border shadow-sm cursor-pointer"
              onClick={() => handleCardClick(link.package_id)}
            >
              <div className="relative h-[60px] w-[35%] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={link?.package_image[0]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-fit"
                />
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
      </div>
    </div>
  );
};

export default FooterTabs;
