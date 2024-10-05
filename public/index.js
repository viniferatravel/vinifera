import * as React from "react";

const HotelName = ({ hotel_Name, onHotelName, hotel_ID }) => {
  var h_name = "";

  h_name = capitalize_each_word(hotel_Name);
  function capitalize_each_word(val) {
    if (val === undefined || val === null) {
      return "";
    }

    const words = val.toString().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    var str = words.join("");
    var replacedStr = "";

    for (var i = 0; i < str.length; i++) {
      if (str[i] === ",") {
        replacedStr += "";
      } else {
        replacedStr += str[i];
      }
    }

    return replacedStr;
  }

  var Imgs = {
    [h_name + "1"]:
      "/img/" + h_name + "-" + hotel_ID + "/Property Main-PM00001/1.jpg",
    [h_name + "2"]:
      "/img/" + h_name + "-" + hotel_ID + "/Property Main-PM00001/2.jpeg",
    [h_name + "3"]:
      "/img/" + h_name + "-" + hotel_ID + "/Property Main-PM00001/3.jpg",
    [h_name + "4"]:
      "/img/" + h_name + "-" + hotel_ID + "/Property Main-PM00001/4.jpeg",
    [h_name + "5"]:
      "/img/" + h_name + "-" + hotel_ID + "/Property Main-PM00001/5.jpg",
  };

  React.useEffect(() => {
    onHotelName(Imgs);
  }, [h_name]);

  return <></>;
};

const IMAGES = {
  "Adminloginbg": "/image/adminloginbg.jpg"

};
export { IMAGES };

export default HotelName;
