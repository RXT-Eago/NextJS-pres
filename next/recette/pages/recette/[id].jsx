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

       

        if (recipe != undefined && recipe.message != "No recipe found") {
            console.log(recipe);
            setFixedRecipe(recipe);
            const img = document.getElementById("recette");
            let real_image = new Image();
            real_image.src = recipe.image;
            img.src = real_image.src;
            setNbPersonnes(recipe.nb_personnes);
            console.log(recipe.nb_personnes);
            
        }

    }, [recipe]);

    useEffect(() => {
        if (recipe !== undefined && fixedRecipe !== undefined && recipe.ingredients !== undefined) {
          const newIngredients = recipe.ingredients.map((ingredient, index) => {
            const newQuantite =
              (fixedRecipe.ingredients[index].quantite * NbPersonnes) /
              fixedRecipe.nb_personnes;
            return {
              ...ingredient,
              quantite: newQuantite.toFixed(0),
            };
          });
          setAdjustedIngredients(newIngredients);
        }
      }, [NbPersonnes , fixedRecipe]);






    return (
        <div className="w-screen h-auto">
            <Header />
            <NavBar />
            < BottomBar />




            {
                recipe && recipe.message && recipe.message === "No recipe found" ? (
                    <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
                        <h1 className="text-2xl">Recette non trouvée</h1>
                    </div>
                ) : (
                    <div className="w-full h-auto p-2 ">

                    <div className="w-full h-auto relative">
    
                        <Link className="absolute top-0 left-0 h-10 w-10 text-black font-bold text-2xl  z-10"
                            href="/"    >
                            {"<-"}
                        </Link>
    
                        <h1 className="text-2xl text-center mb-2">{recipe && recipe.name}</h1>
    
    
                        <div className="flex justify-center items-center w-full justify-items-center">
                            <img id="recette" className=" aspect-square w-1/2 rounded-md shadow-xl " />
    
                        </div>
    
    
                        <div id="NomRecette" className="w-full h-auto py-1 px-4 mt-4">
    
                            <h1>
                                Nombre de personnes
                            </h1>
                            <div className="w-full ">
                                <hr className="w-full h-0.5 bg-slate-300 " />
                            </div>
                            <div className="w-full p-2 flex gap-1">
                                <button className="w-1/4 bg-slate-300 border-2 text-sm  rounded-xl shadow-sm p-2"
                                    onClick={() => removePersonne()}>
                                    -
                                </button>
                                <div className="w-1/2 border-2 font-bold text-sm rounded-xl shadow-sm p-2 text-center">
                                    {NbPersonnes}
                                </div>
                                <button className="w-1/4 bg-slate-400 border-2 text-sm rounded-xl shadow-sm p-2"
                                    onClick={() => addPersonne()}>
                                    +
                                </button>
    
                            </div>
    
                        </div>
    
    
    
                        <div className="px-4">
                            <h1 className="text-lg text-left mt-4">Ingredients</h1>
                            <hr className="w-full mt-2 h-0.5 bg-black opacity-20 mb-3" />
    
                        </div>
    
                        <div className="w-full p-1 gap-2 grid grid-flow-rows grid-cols-2 text-xs ">
                            {adjustedIngredients.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className="h-auto p-2 text-center flex justify-center items-center justify-items-center"
                                >
                                    <p>
                                        <span className="font-bold" > {ingredient.name} </span> <br />
                                        {ingredient.quantite} <span className="font-normal">{ingredient.unite} </span> 
                                    </p>
                                </div>
                            ))}
                        </div>
    
                        <div className="px-4">
                            <h1 className="text-lg text-left mt-4">Etapes</h1>
                            <hr className="w-full mt-2 h-0.5 bg-black opacity-20 mb-3" />
    
                        </div>
    
                        <div className="w-full p-1 ">
                            {recipe && recipe.etapes && recipe.etapes.map((etape, index) => (
    
                                <div key={index} className="w-full ">
                                    {
                                        index % 2 === 0 ? (
                                            <div id={index} className="w-full flex justify-center items-center justify-items-center gap-2 p-2">
                                                <div className="w-10 aspect-square text-center flex justify-center items-center rounded-full border-[1px] border-gray-300">
                                                    {index + 1}
                                                </div>
                                                <div className="w-5/6 p-2 rounded-xl border-gray-300 border-[1px]">
                                                    {etape}
                                                </div>

                                            </div>
                                        ) : (
                                            <div id={index} className="w-full my-3 flex justify-center items-center justify-items-center gap-2 p-2">
                                                <div className="w-5/6 p-2 rounded-xl border-[#AC8778] border-[1px]">
                                                    {etape}
                                                </div>
                                                <div className="w-10 aspect-square text-center flex justify-center items-center rounded-full border-[1px] border-[#AC8778]">
                                                    {index + 1}
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
    
                                
    
                                
                                
                            ))}
                        </div>

                        
                        <hr className="w-full mt-2 h-0.5 bg-black opacity-20" />
                        <h1 className="text-center text-3xl mt-4 mb-20">Bon appétit</h1>
    
    
    
    
    
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
