"use client"
import Breadcrumb from '@/_components/Filterpage/Breadcrumb'
import Tour from '@/_components/Filterpage/Tour'
import React, { useEffect, useState } from 'react'


const Filterpage = ({ params }) => {

  console.log(params.slug, "params");

  const [decodeslug, setdecodeslug] = useState('');
  const [category, setCategory] = useState({});
  // console.log(decodeslug, "decodeslug");

  useEffect(() => {
    if (params.slug) {
      const decodevalue = decodeURIComponent(params.slug);
      setdecodeslug(decodevalue)
    }

    const fetchData = async () => {
      try {
        const decodevalue = decodeURIComponent(params.slug);
        const response = await fetch(`/api/categoryApi?category=${decodevalue}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        // const updatedData = result.data.map((item) => ({
        //   ...item,
        //   category_type: item.category_type.toUpperCase(),
        // }));
        // console.log("Data11111111111:", result, decodevalue);
        setCategory(result.data1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()

  }, [params.slug])

  return (
    <div>
      <Breadcrumb slug={decodeslug} category={category} />
      <Tour slug={decodeslug} />
    </div>
  )
}

export default Filterpage