import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Image from "next/image";


export default function SearchBar({searchText, setSearchText}) {
  return (
    <div className=" h-16 w-full px-5 py-1 flex justify-items-center items-center justify-center bg-backrgound">

        <div className="w-5/6 flex justify-items-center items-center justify-start">
            <input className="w-full border-2 border-primary rounded-xl text-primaryText shadow-sm bg-secondary p-2"
                type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText}>
            
            </input>
        </div>
     
        <div className="w-1/6 flex justify-items-center items-center justify-end">
            <button className="bg-primary rounded-full p-2  shadow-sm">
                <Image src="/assets/images/search.svg" className="w-5 h-5" alt="search" width={20} height={20} />
            </button>
        </div>

    </div>
    
  );
}
