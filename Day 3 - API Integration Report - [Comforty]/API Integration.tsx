"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heading from "./Heading";
import { client } from "@/sanity/lib/client";
import SkeletonLoader from "./SkeletonLoader";
import ProductCard from "./ProductCard";
const Products = () => {
    // settting sates for handling data , errors and loading messsages
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchingData=async ()=>{
    setLoading(true)
    setError(null)
    try{
const products = await client.fetch(`*[_type == "products"]{
  _id,
  "imageUrl": image.asset->url, // Fetch the actual image URL
  price,
  priceWithoutDiscount,
  title,
  greenTag,
  badge,
  "slug":slug.current,
}`) 
// adding featured products in the state of products array to dispaly data
setProducts(products)
}
// catching error and setting state for displaying a readable error message for the user
catch(err) {
  console.error("failed to fetch products",err);
  setError("Failed to load products, please try refreshing");
}
 // setting the state to stop loading if the data is displayed or error message is displayed
finally{
  setLoading(false);
}
}
  useEffect(()=>{
fetchingData()
  },[])
    // displaying skeleton loading while data is being fetched and displayed after the fetch operation is completed or error is encountered.
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center">
        <SkeletonLoader/>
        </div>
      );
    }
  // displaying readable error message
  if (error) {
    return (
      <div className="text-center mt-16 text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchingData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }
  
  
  return (
    <div className="max-w-[1920px] mx-auto w-full">
    <div className="w-full px-2 sm:px-10 lg:px-20 mt-16">
        <div>
            <Heading Head="All Products" />
        </div>
            
             <ProductCard products={products} />
        
        </div>
        
      <div className="mt-20 bg-[rgba(30,40,50,0.05)] w-full flex flex-col items-center justify-center py-[100px]">
        <h2 className="font-[Roboto] not-italic font-medium text-[20px] md:text-[30px] lg:text-[50px] leading-[25px] md-leading-[35px] lg:leading-[59px] capitalize text-[#000000]">
          Or subscribe to the newsletter
        </h2>
        <div className="flex gap-5 pt-[80px]">
          <input
            type="email"
            placeholder="Email Address"
            className="border-input-product w-full md:w-[300px] lg:w-[643px] "
          />
          <button className="btn-border">SUBMIT</button>
        </div>
        <Image
          src={"/ProductBottomImage.png"}
          alt="Img"
          height={319}
          width={1324}
          className="pt-[80px]"
        />
      </div>
    </div>
  );
};


export default Products;
