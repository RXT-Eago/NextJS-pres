import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";


export default function NavBar() {
  return (


        <Link className="fixed z-50 bottom-8 right-8 w-12 h-12 shadow-md flex justify-center justify-items-center items-center rounded-full bg-primary text-2xl text-white "
                href="/newRecipe">
                +
        </Link>        
    
  );
}
