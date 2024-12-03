import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";


export default function NavBar() {
  return (
    <>
    <div className=" fixed bottom-0 right-2 z-30  h-16 flex w-full justify-end items-center   ">

        <Link className="w-12 h-12 shadow-[rgba(0,0,15,0.5)_3px_3px_4px_0px] shadow-md flex justify-center justify-items-center items-center rounded-full bg-primary text-2xl text-white "
                href="/newRecipe">
                +
        </Link>        
     

    </div>
    <hr className="w-full h-1 bg-slate-300 blur-sm " />
    </>
    
  );
}
