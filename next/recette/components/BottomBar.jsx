import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";


export default function NavBar() {
  return (
    <>
    <div className=" fixed bottom-0 z-30  h-16 flex w-full  bg-[#AC8778] ">

     
        <div className="flex w-full text-2xl text-white ">
            <h1 className="w-1/2 py-2 flex justify-center items-center justify-items-center ">
                Articles
            </h1>
            <div className="w-[2px] h-full bg-black"></div>
            <h1 className="w-1/2 py-2 flex justify-center items-center justify-items-center ">
            <Link className=""
                href="/newRecipe">
                Nouvelle Recette
            </Link>
            </h1>
        </div>        
     

    </div>
    <hr className="w-full h-1 bg-slate-300 blur-sm " />
    </>
    
  );
}
