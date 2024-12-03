import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";


export default function NavBar() {
  return (
    <>
    <div className="  h-16 flex w-full py-2 bg-primary ">
        <div className="flex justify-items-center items-center justify-center w-full ">
            <h1 className="text-4xl text-white font-thin italic ">
                FreeFodMap Bakery
            </h1>
        </div>        
     

    </div>
    <hr className="w-full h-1 bg-slate-300 blur-sm " />
    </>
    
  );
}
