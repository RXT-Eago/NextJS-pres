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

    const[fixedRecipe, setFixedRecipe] = useState();
    const [NbPersonnes, setNbPersonnes] = useState(0);
    const [adjustedIngredients, setAdjustedIngredients] = useState([]);


    function addPersonne() {
        setNbPersonnes(NbPersonnes + 1);
    }

    function removePersonne() {
        if (NbPersonnes > 1) {
            setNbPersonnes(NbPersonnes - 1);
        }
    }



    useEffect(() => {

       

    }, [recipe]);

    useEffect(() => {
      
      }, [NbPersonnes , fixedRecipe]);






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
                <div className="w-full h-[calc(100vh-132px)] bg-backrgound text-primaryText flex justify-center items-center">

    
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

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '1' } }, // See the "paths" section below
        ],
        fallback: true // See the "fallback" section below
    };
}

export async function getStaticProps({ params }) {

    const id = params.id
    console.log(id);

    let URL = "http://back-end:5000/blog?id=" + id;

    if (process.env.DEBUG_MODE === 'false') {
        URL = "https://production-url-unavailable" + id;
    }

    const res = await fetch(URL);
    const recipe = await res.json();
    console.log(recipe);
    


    recipe.image = `data:image/jpeg;base64,${recipe.image}`;

    return {
        props: {
            recipe
        }
    }
}
