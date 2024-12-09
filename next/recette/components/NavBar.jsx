import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";


export default function NavBar() {
  return (
    <>
    <div className="  h-16 flex w-full py-2 bg-backrgound ">
        <div className="flex justify-items-center items-center justify-center w-full ">
            <h2 className="text-4xl text-primaryText font-normal ">
                SIA's Partners Blog
            </h2>
        </div>        
     

    </div>
    <hr className="w-full h-[1px] bg-slate-300 blur-sm " />
    </>
    
  );
}
