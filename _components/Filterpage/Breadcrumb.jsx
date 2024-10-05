"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const statesInfo = {
    "Madhya Pradesh": {
        nickname: "The Heart of India",
        features: [
            "treasure trove of history",
            "culture",
            "nature"
        ],
        rulers: "many prominent dynasties",
        attractions: [
            "historical places from the Stone Age",
            "temples and pilgrimage sites",
            "abundant natural wonders"
        ],
        naturalAttraction: "tiger safaris and verdant forests",
        festival: "Kumbh Mela",
    },
    "Rajasthan": {
        nickname: "The Land of Kings",
        features: [
            "royal heritage",
            "grand forts",
            "vast deserts"
        ],
        rulers: "the brave Rajputs",
        attractions: [
            "majestic palaces",
            "colorful festivals",
            "the golden dunes of the Thar"
        ],
        naturalAttraction: "camel safaris in the desert",
        festival: "Pushkar Camel Fair",
    },
    "Kerala": {
        nickname: "God's Own Country",
        features: [
            "lush landscapes",
            "serene backwaters",
            "beaches"
        ],
        rulers: "the Cheras and Travancore royalty",
        attractions: [
            "houseboat cruises",
            "scenic hill stations",
            "Ayurvedic retreats"
        ],
        naturalAttraction: "the wildlife of Periyar National Park",
        festival: "Onam",
    },
    "Uttar Pradesh": {
        nickname: "The Land of Spirituality",
        features: [
            "rich history",
            "religious significance",
            "cultural diversity"
        ],
        rulers: "the Mughals, the Mauryas",
        attractions: [
            "the iconic Taj Mahal",
            "sacred cities like Varanasi and Ayodhya",
            "magnificent forts and palaces"
        ],
        naturalAttraction: "the Ganges River and serene ghats",
        festival: "Kumbh Mela",
    },
    "Maharashtra": {
        nickname: "The Gateway to the Heart of India",
        features: [
            "diverse landscapes",
            "rich history",
            "modern cities"
        ],
        rulers: "the Marathas and the British",
        attractions: [
            "Ajanta and Ellora caves",
            "the vibrant city of Mumbai",
            "Shirdi and religious shrines"
        ],
        naturalAttraction: "the Western Ghats and beautiful hill stations",
        festival: "Ganesh Chaturthi",
    },
    "Gujarat": {
        nickname: "The Land of Legends",
        features: [
            "vibrant culture",
            "ancient temples",
            "industrial hubs"
        ],
        rulers: "the Mauryas and the Mughals",
        attractions: [
            "the Rann of Kutch",
            "Somnath and Dwarka temples",
            "Sabarmati Ashram"
        ],
        naturalAttraction: "the Gir National Park, home of Asiatic lions",
        festival: "Navratri",
    },
    "Tamil Nadu": {
        nickname: "The Land of Temples",
        features: [
            "ancient temples",
            "classical music",
            "rich traditions"
        ],
        rulers: "the Cholas, the Pallavas",
        attractions: [
            "Meenakshi Temple in Madurai",
            "Brihadeeswarar Temple",
            "the beaches of Chennai"
        ],
        naturalAttraction: "hill stations like Ooty and Kodaikanal",
        festival: "Pongal",
    },
    "Karnataka": {
        nickname: "One State, Many Worlds",
        features: [
            "diverse landscapes",
            "ancient history",
            "modern technology"
        ],
        rulers: "the Chalukyas, the Hoysalas",
        attractions: [
            "Hampi and its ancient ruins",
            "Mysore Palace",
            "the IT hub of Bengaluru"
        ],
        naturalAttraction: "the Western Ghats and coffee plantations in Coorg",
        festival: "Dasara",
    },
    "West Bengal": {
        nickname: "The Cultural Capital of India",
        features: [
            "literature",
            "art",
            "history"
        ],
        rulers: "the British, the Nawabs of Bengal",
        attractions: [
            "Victoria Memorial",
            "the Sundarbans, home of the Royal Bengal Tiger",
            "the Howrah Bridge"
        ],
        naturalAttraction: "the Darjeeling tea gardens and Himalayan views",
        festival: "Durga Puja",
    },
    "Bihar": {
        nickname: "The Land of Enlightenment",
        features: [
            "Buddhist heritage",
            "ancient universities",
            "rich history"
        ],
        rulers: "the Mauryas and the Guptas",
        attractions: [
            "Mahabodhi Temple in Bodh Gaya",
            "Nalanda University ruins",
            "Vaishali and Rajgir"
        ],
        naturalAttraction: "the Ganges River",
        festival: "Chhath Puja",
    },
    "Punjab": {
        nickname: "The Land of Five Rivers",
        features: [
            "vibrant culture",
            "history of bravery",
            "religious significance"
        ],
        rulers: "the Sikh Gurus, the Mughals",
        attractions: [
            "the Golden Temple in Amritsar",
            "Wagah Border",
            "Jallianwala Bagh"
        ],
        naturalAttraction: "fertile plains of the Punjab",
        festival: "Baisakhi",
    },
    "Himachal Pradesh": {
        nickname: "The Land of Gods",
        features: [
            "majestic mountains",
            "serene valleys",
            "temples"
        ],
        rulers: "local chieftains and the British",
        attractions: [
            "Shimla, the Queen of Hill Stations",
            "Manali and Rohtang Pass",
            "Dharamshala, home of the Dalai Lama"
        ],
        naturalAttraction: "the Himalayan range and lush green valleys",
        festival: "Dussehra",
    },
    "Assam": {
        nickname: "The Land of Red Rivers and Blue Hills",
        features: [
            "tea gardens",
            "wildlife",
            "tribal culture"
        ],
        rulers: "the Ahoms",
        attractions: [
            "Kaziranga National Park",
            "Majuli, the largest river island",
            "Kamakhya Temple"
        ],
        naturalAttraction: "the Brahmaputra River and tea gardens",
        festival: "Bihu",
    },
    "Odisha": {
        nickname: "The Soul of Incredible India",
        features: [
            "ancient temples",
            "tribal traditions",
            "coastal beauty"
        ],
        rulers: "the Kalinga dynasty",
        attractions: [
            "Jagannath Temple in Puri",
            "Konark Sun Temple",
            "Chilika Lake"
        ],
        naturalAttraction: "the Chilika Lagoon, Asia’s largest brackish water lake",
        festival: "Rath Yatra",
    },
    "Goa": {
        nickname: "The Pearl of the Orient",
        features: [
            "pristine beaches",
            "Portuguese heritage",
            "vibrant nightlife"
        ],
        rulers: "the Portuguese",
        attractions: [
            "Basilica of Bom Jesus",
            "Anjuna Beach",
            "Dudhsagar Falls"
        ],
        naturalAttraction: "beautiful beaches and the Western Ghats",
        festival: "Goa Carnival",
    },
    "Sikkim": {
        nickname: "The Organic State",
        features: [
            "natural beauty",
            "Buddhist culture",
            "Himalayan views"
        ],
        rulers: "the Namgyal dynasty",
        attractions: [
            "Tsomgo Lake",
            "Nathula Pass",
            "Rumtek Monastery"
        ],
        naturalAttraction: "Kanchenjunga, the third highest mountain in the world",
        festival: "Losar",
    },
    "Telangana": {
        nickname: "The Land of Nawabs",
        features: [
            "rich heritage",
            "Hyderabadi cuisine",
            "ancient monuments"
        ],
        rulers: "the Nizams and Qutb Shahi dynasty",
        attractions: [
            "Charminar",
            "Golconda Fort",
            "Ramoji Film City"
        ],
        naturalAttraction: "lakes like Hussain Sagar and forests of Adilabad",
        festival: "Bathukamma",
    },
    "Andhra Pradesh": {
        nickname: "The Kohinoor of India",
        features: [
            "ancient temples",
            "beaches",
            "Buddhist heritage"
        ],
        rulers: "the Satavahanas and the Vijayanagar Empire",
        attractions: [
            "Tirupati Temple",
            "Amaravati",
            "Araku Valley"
        ],
        naturalAttraction: "picturesque hill stations and beaches along the coastline",
        festival: "Ugadi",
    },
    "Jharkhand": {
        nickname: "The Land of Forests",
        features: [
            "tribal culture",
            "mineral wealth",
            "natural beauty"
        ],
        rulers: "various local dynasties",
        attractions: [
            "Betla National Park",
            "Dassam Falls",
            "Baidyanath Temple in Deoghar"
        ],
        naturalAttraction: "dense forests and wildlife sanctuaries",
        festival: "Sarhul",
    },
    "Chhattisgarh": {
        nickname: "The Rice Bowl of India",
        features: [
            "tribal traditions",
            "waterfalls",
            "rich forests"
        ],
        rulers: "the Kalachuri dynasty",
        attractions: [
            "Chitrakote Falls, India's Niagara",
            "Barnawapara Wildlife Sanctuary",
            "Sirpur, an ancient city"
        ],
        naturalAttraction: "dense forests and beautiful waterfalls",
        festival: "Bastar Dussehra",
    },
    "Uttarakhand": {
        nickname: "The Land of Gods",
        features: [
            "pilgrimage sites",
            "mountains",
            "adventure tourism"
        ],
        rulers: "the Katyuri dynasty and the British",
        attractions: [
            "Char Dham Yatra",
            "Jim Corbett National Park",
            "Nainital and Mussoorie hill stations"
        ],
        naturalAttraction: "the Himalayas and lush valleys",
        festival: "Kumbh Mela",
    },
    "Haryana": {
        nickname: "The Land of Abundance",
        features: [
            "agricultural wealth",
            "sports culture",
            "history"
        ],
        rulers: "the Tomaras and the Mughals",
        attractions: [
            "Kurukshetra, the site of the Mahabharata",
            "Sultanpur National Park",
            "Surajkund Mela"
        ],
        naturalAttraction: "rural landscapes and wetlands",
        festival: "Surajkund Mela",
    },
    "Arunachal Pradesh": {
        nickname: "The Land of the Rising Sun",
        features: [
            "tribal culture",
            "pristine landscapes",
            "Buddhist monasteries"
        ],
        rulers: "various indigenous tribes",
        attractions: [
            "Tawang Monastery",
            "Ziro Valley",
            "Namdapha National Park"
        ],
        naturalAttraction: "snow-capped peaks and dense forests",
        festival: "Losar",
    },
    "Meghalaya": {
        nickname: "The Abode of Clouds",
        features: [
            "picturesque landscapes",
            "tribal culture",
            "living root bridges"
        ],
        rulers: "the Khasi, Jaintia, and Garo tribes",
        attractions: [
            "Cherrapunji, one of the wettest places on Earth",
            "Shillong, the Scotland of the East",
            "Living root bridges in Mawlynnong"
        ],
        naturalAttraction: "lush forests and waterfalls",
        festival: "Wangala",
    },
    "Nagaland": {
        nickname: "The Land of Festivals",
        features: [
            "tribal heritage",
            "colorful festivals",
            "hill stations"
        ],
        rulers: "various indigenous tribes",
        attractions: [
            "Kohima, the capital city",
            "Dzukou Valley",
            "Hornbill Festival"
        ],
        naturalAttraction: "mountains and scenic valleys",
        festival: "Hornbill Festival",
    },
    "Manipur": {
        nickname: "The Jewel of India",
        features: [
            "dance forms",
            "handicrafts",
            "martial arts"
        ],
        rulers: "the Meitei kingdom",
        attractions: [
            "Loktak Lake, the floating lake",
            "Kangla Fort",
            "Keibul Lamjao National Park"
        ],
        naturalAttraction: "serene lakes and lush valleys",
        festival: "Yaoshang (Holi)",
    },
    "Mizoram": {
        nickname: "The Land of the Hill People",
        features: [
            "lush landscapes",
            "tribal traditions",
            "bamboo forests"
        ],
        rulers: "various indigenous tribes",
        attractions: [
            "Phawngpui National Park",
            "Vantawng Falls",
            "Aizawl, the capital city"
        ],
        naturalAttraction: "green hills and rivers",
        festival: "Chapchar Kut",
    },
    "Tripura": {
        nickname: "The Queen of the Eastern Hills",
        features: [
            "tribal culture",
            "Buddhist heritage",
            "royal palaces"
        ],
        rulers: "the Manikya dynasty",
        attractions: [
            "Ujjayanta Palace",
            "Neermahal Palace",
            "Unakoti, the rock-cut sculptures"
        ],
        naturalAttraction: "lush green valleys and rivers",
        festival: "Kharchi Puja",
    },
    "Sikkim": {
        nickname: "The Organic State",
        features: [
            "natural beauty",
            "Buddhist culture",
            "Himalayan views"
        ],
        rulers: "the Namgyal dynasty",
        attractions: [
            "Tsomgo Lake",
            "Nathula Pass",
            "Rumtek Monastery"
        ],
        naturalAttraction: "Kanchenjunga, the third highest mountain in the world",
        festival: "Losar",
    },
    "Andaman and Nicobar Islands": {
        nickname: "The Emerald Isles",
        features: [
            "beaches",
            "coral reefs",
            "marine life"
        ],
        rulers: "various local tribes and the British",
        attractions: [
            "Radhanagar Beach",
            "Cellular Jail in Port Blair",
            "Ross Island"
        ],
        naturalAttraction: "pristine beaches and coral reefs",
        festival: "Island Tourism Festival",
    },
    "Lakshadweep": {
        nickname: "The Coral Paradise of India",
        features: [
            "pristine islands",
            "marine life",
            "coral reefs"
        ],
        rulers: "the Cheras and the Mughals",
        attractions: [
            "Agatti Island",
            "Bangaram Island",
            "Minicoy Island"
        ],
        naturalAttraction: "crystal-clear waters and coral reefs",
        festival: "Eid-ul-Fitr",
    },
    "Delhi": {
        nickname: "The City of Hearts",
        features: [
            "historic monuments",
            "cosmopolitan culture",
            "political significance"
        ],
        rulers: "the Mughals, the British",
        attractions: [
            "Red Fort",
            "India Gate",
            "Qutub Minar"
        ],
        naturalAttraction: "Yamuna River",
        festival: "Republic Day Parade",
    },
    "Puducherry": {
        nickname: "The French Riviera of the East",
        features: [
            "colonial architecture",
            "serene beaches",
            "spirituality"
        ],
        rulers: "the French",
        attractions: [
            "Auroville",
            "Promenade Beach",
            "Sri Aurobindo Ashram"
        ],
        naturalAttraction: "serene beaches and backwaters",
        festival: "Bastille Day",
    },
    "Ladakh": {
        nickname: "The Land of High Passes",
        features: [
            "mountains",
            "Buddhist monasteries",
            "deserted landscapes"
        ],
        rulers: "the Namgyal dynasty",
        attractions: [
            "Pangong Lake",
            "Leh Palace",
            "Nubra Valley"
        ],
        naturalAttraction: "the Himalayas and cold deserts",
        festival: "Hemis Festival",
    },
};

const Breadcrumb = ({ slug, category }) => {

    console.log(slug, "check props");

    const [fetchfilterdata, setfetchfilterdata] = useState([]);
    console.log(fetchfilterdata, "fetchfilterdata")

    const renderDynamicParagraph = (selectedState) => {


        const stateInfo = statesInfo[selectedState];

        console.log("selectedState::::>", stateInfo)

        if (stateInfo === undefined) {
            return false
        } else {
            return (
                <p className='mt-2 text-justify'>
                    Discover the timeless beauty of {selectedState}, {stateInfo?.nickname}!
                    Known for its {stateInfo?.features.join(", ")}, {selectedState} has been shaped by {stateInfo?.rulers}, leaving behind
                    {stateInfo?.attractions.join(", ")}. Immerse yourself in
                    its natural splendor, where you can enjoy {stateInfo?.naturalAttraction}.
                    Don’t miss out on the famous {stateInfo?.festival} festival, which brings
                    the state’s culture to life. Whether it’s history, nature, or culture,
                    {selectedState} offers something for everyone.
                    Explore it all with Vinifera&apos;s {selectedState} holiday packages.
                </p>
            );
        }


    };

    const generateCityParagraph = (city) => {
        if(city === "All") {
            city = "All tour packages"
        }
        return (
            <p className='mt-2 text-justify'>
                Welcome to {city}, a vibrant tapestry of culture, history, and modernity. Known for its unique blend of traditions and contemporary living, {city} offers an exciting array of experiences for every traveler. Wander through bustling markets filled with colorful crafts, savor the diverse culinary delights that reflect the rich heritage of the region, and explore historic landmarks that narrate tales of the past. Whether you’re captivated by the serene beauty of its parks, the lively spirit of its festivals, or the warmth of its people, {city} invites you to discover the heart of India, where every corner has a story to tell.
            </p>
        );
    };

    useEffect(() => {
        async function getData() {
            try {
                // Make both requests simultaneously
                const [cityResponse, categoryResponse] = await Promise.all([
                    axios.post("/api/fetchcategory", {
                        operation: "fetchdatacitywise",
                        city: slug,
                    }),
                    axios.post("/api/fetchcategory", {
                        operation: "fetchdatacategorieswise",
                        category: slug,
                    })
                ]);

                // Check the responses and decide which one to use
                if (cityResponse.data.fetchcitydata && cityResponse.data.fetchcitydata.length > 0) {
                    console.log(cityResponse.data.fetchcitydata, "check city response");
                    setfetchfilterdata(cityResponse.data.fetchcitydata);
                } else if (categoryResponse.data.packages && categoryResponse.data.packages.length > 0) {
                    console.log(categoryResponse.data.packages, "check category response");
                    setfetchfilterdata(categoryResponse.data.packages);
                }

            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        getData();
    }, [slug]);


    // useEffect(() => {
    //         async function getData() {
    //             const response = await axios.post("/api/fetchcategory", {
    //                 operation: "fetchdatacitywise",
    //                 city: slug,
    //             })
    //             console.log(response.data.fetchcitydata, "check response");
    //             setfetchfilterdata(response.data.fetchcitydata)
    //         }
    //         getData()
    // }, [slug]);

    // useEffect(() => {
    //     async function getData() {
    //         const response = await axios.post("/api/fetchcategory", {
    //             operation: "fetchdatacategorieswise",
    //             category: slug,
    //         })
    //         console.log(response.data.packages, "check response");
    //         setfetchfilterdata(response.data.packages)
    //     }
    //     getData()
    // }, [slug])

    const [hidesection, sethidesection] = useState(false);
    console.log(hidesection, "hidesection");

    const readmore = () => {
        sethidesection(hidesection === false ? true : false);
    }

    function capitalizeWords(sentence) {
        return sentence
            .toLowerCase() // Convert the whole sentence to lowercase
            .split(" ") // Split the sentence by spaces into an array of words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(" "); // Join the words back into a sentence
    }

    return (
        <div>
            <div className=' w-[95%] m-auto'>
                <div className='w-full pt-2 pb-2'>
                    {console.log("capitalizeWords(slug)", capitalizeWords(slug))}
                    <p className='text-sm md:text-base'>Group-Tours / {capitalizeWords(slug)}</p>
                </div>

                <div className='w-full py-2'>
                    <h1 className='text-2xl md:text-4xl font-semibold'>{capitalizeWords(slug)} {slug.includes("TOUR") ? "" : "Tour"} Packages</h1>
                    {/* {fetchfilterdata && fetchfilterdata.map((tour, index) => (
                        <p key={index} className='mt-2'>{tour.tour_itinerary?.state_description || "No description available"}</p>
                    ))}  */}


                    {category?.description === "" || category?.description === undefined ? renderDynamicParagraph(capitalizeWords(slug)) === false ? generateCityParagraph(capitalizeWords(slug)) : renderDynamicParagraph(capitalizeWords(slug))
                        : <p key={""} className='mt-2 text-justify'>{category?.description}</p>}



                    {/* <p className='text-base mt-2 font-medium'>Timeless historical tales in every fort and heritage site and the echoing calls of the wild witnessed in India’s Heart!</p> */}
                    {/* <p className='mt-2'>The treasure trove of history, culture and nature, Madhya Pradesh is renowned ‘The Heart of India’. Situated right in the centre, Madhya Pradesh has been ruled by many of the most prominent dynasties of India who have left their marks here, which are evident in the architecture,culture and lifestyle. Madhya Pradesh has a plethora of attractions from historical places whose roots can be traced back to the Stone - age, prominent temples and pilgrimage sites, as well as an ... <span className='mt-2 text-sm text-red-600 font-semibold cursor-pointer' onClick={() => readmore()}>{hidesection ? 'Read less' : 'Read more'}</span></p>

                    {hidesection &&
                        <p className='mt-2'>Submerge in the core beauty of the country, where the past still lives, with Vinifera’s Madhya Pradesh holiday packages. The spiritual and cultural legacy of nearly every religion can be found here. Innumerable monuments, intricately carved temples, caves, stupas, forts and palaces are dotted all over the state. Blessed with natural wonders, the state has everything, from mighty mountain ranges to meandering rivers to miles of verdant forests, offering unique and exciting wildlife safaris that are full of tiger spotting. Some of the most sacred cities and ghats are here in this state, and it is the host of the most sacred festival in the country, ‘Kumbh Mela’. With Vinifera’s Madhya Pradesh tour packages, you can experience the gist of the entire country in one place, in its heart. </p>
                    } */}
                </div>


            </div>
        </div>
    )
}

export default Breadcrumb