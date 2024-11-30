import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";


export default function SearchBar({searchText, setSearchText}) {
  return (
    <div className=" h-16 w-full px-5 py-1 flex justify-items-center items-center justify-center">

        <div className="w-5/6 flex justify-items-center items-center justify-start">
            <input className="border-2 w-full  rounded-xl shadow-sm "
                type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText}>
            
            </input>
        </div>
     
        <div className="w-1/6 flex justify-items-center items-center justify-end">
            <button className="bg-black rounded-full p-2">
                <img src="/assets/images/search.svg" className="w-5 h-5" alt="search" />
            </button>
        </div>

    </div>
    
  );
}
