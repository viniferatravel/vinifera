'use client'
import React, { useState, useEffect } from "react"
import TourPackageForm from '@/_components/Form';

const Package = () => {

  const [locationState, setLocationState] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

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
      `/api/categoryApi`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result1 = await response1.json();
    // console.log("Result::::::>", result1)
    setCategoryList(result1.data)
  }

  useEffect(() => {
    initialFxn()
  }, [])
    
    return (<>
        <TourPackageForm locationState={locationState} categoryList={categoryList}/>
    </>)
}
export default Package