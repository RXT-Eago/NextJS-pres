import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import BottomBar from "@/components/BottomBar";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router'



export default function Home({ recipe }) {





    return (
        <div className="w-screen h-auto">
            <Header />
            <NavBar />
            < BottomBar />

            {
                recipe && recipe.message && recipe.message === "No recipe found" ? (
                    <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
                        <h1 className="text-2xl">Article non trouvé</h1>
                    </div>
                ) : (
                <div className="w-full h-[calc(100vh-65px)] bg-backrgound text-primaryText flex justify-center items-center">

    
                    <div className="w-full h-auto">

                        <h1 className="text-2xl text-center py-5 underline">{recipe && recipe.name}</h1>
                        
                        <div className="w-full h-auto  p-5 flex justify-center items-center justify-items-center">
                            <div className="w-1/2 h-auto text-justify">
                                {recipe && recipe.description}
                            </div>
                        </div>
                        
                        <div className="w-full h-auto p-5 flex justify-center items-center justify-items-center">
                            <div className="w-1/2 h-auto font-bold">
                                { recipe && recipe.auteur }
                            </div>
                        </div>

                    </div>

    
    
                </div>
    
                )
            }




        </div>
    )
}


// export async function generateStaticPaths() {

//     //let URL = "http://back-end:5000/blog";
//     let URL = "http://localhost:5000/blog";

//     const res = await fetch(URL);
//     const recipes = await res.json();

//     const paths = recipes.map((recipe) => ({
//         params: { id: recipe.id.toString() },
//     }))

//     console.log("generateStaticPaths: ", paths);
//     return {
//         paths,
//         fallback: true
//     }
// }

// export async function getServerSideProps({ params }) {
    
//     const id = params.id
//     console.log("server side props id: ", params);

//     // let URL = "http://back-end:5000/blog?id=" + id;
//     let URL = "http://localhost:5000/blog?id=" + id;

//     if (process.env.DEBUG_MODE === 'false') {
//         URL = "https://production-url-unavailable" + id;
//     }

//     const res = await fetch(URL);
//     const recipe = await res.json();
    
//     return {
//         props: {
//             recipe
//         }
//     }

// }


export async function getStaticPaths() {
    
    let URL = "http://localhost:5000/blogs";

    const res = await fetch(URL);
    const recipes = await res.json();

    const paths = recipes.map((recipe) => ({
        params: { id: recipe.id.toString() },
    }))

    console.log("getStaticPaths: ", paths);
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {

    const id = params.id
    console.log(id);

    // let URL = "http://back-end:5000/blog?id=" + id;
    let URL = "http://localhost:5000/blog?id=" + id;

    if (process.env.DEBUG_MODE === 'false') {
        URL = "https://production-url-unavailable" + id;
    }

    const res = await fetch(URL);
    const recipe = await res.json();
   

    return {
        props: {
            recipe
        }
    }
}
