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



export default function Home({recipes, debugMode}) {
  

  console.log("debug mode is ", debugMode);

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const [swipeRecipe, setSwipeRecipe] = useState([])

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50 

  useEffect(() => {
    if (recipes.length > 0) {
      // Initialize swipeRecipe based on the recipes array
      setSwipeRecipe(recipes.map(recipe => ({ id: recipe.id, isSwiped: false })));
      
      recipes.forEach((recipe, index) => {
        const img = document.getElementById(index);
        if (img) {
          let real_image = new Image();
          real_image.src = recipe.image;
          img.src = real_image.src;
        }
      });
    }
  }, [recipes]);

 

  const [searchText, setSearchText] = useState("");

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
  
  const onTouchEnd = (id) => () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
  
    if (isLeftSwipe ) {
      console.log('swipe', isLeftSwipe ? 'left' : 'right');
      console.log('id', id);
  
      setSwipeRecipe((prevSwipeRecipes) =>
        prevSwipeRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, isSwiped: true } : recipe
        )
      );
    }
    if (isRightSwipe ) {
      console.log('swipe', isLeftSwipe ? 'left' : 'right');
      console.log('id', id);
  
      setSwipeRecipe((prevSwipeRecipes) =>
        prevSwipeRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, isSwiped: false } : recipe
        )
      );
    }
  };

  function handleDelete(id) {
    console.log("debug mode is ", debugMode);
    const url = debugMode 
    ? "http://localhost:5000/deleteBlog" 
    : "https://production-url-unavailable";

    fetch(url + `?id=${id}`, {
      method: 'GET', // or 'PUT'
      mode: 'no-cors',
      
      
    })
      
      .then((data) => {
        console.log("data", data);
        recipes.filter(recipe => recipe.id !== id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    
    
  }
  

  return (
    <div className="w-screen h-auto">
      <Header />
      <NavBar />
      < BottomBar />

     

      < SearchBar searchText={searchText} setSearchText={setSearchText} />

      <hr className="w-full mt-2 h-0.5 bg-black opacity-20" />

      <div id="mainRecetteDisplay" className="w-full h-auto mt-3 px-3 py-4 gap-4 grid grid-cols-2 grid-flow-row mb-16">

        {recipes.map((recipe, index) => (
          <Link key={index}  className="w-full relative h-auto p-2 my-4  flex justify-center shadow-lg bg-primary  rounded-lg col-span-2 md:col-span-1 "
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd( recipe.id)}
            
            href={`/recette/${recipe.id}`} >

            

            {
              index % 2 === 0 ? (
                <>
                  <div className="w-1/2 aspect-square p-5">
                    <img id={index} className="w-full aspect-square  shadow-xl rounded-xl" alt="crepes" />
                  </div>

                  <div className="h-full w-1/2 py-3 px-5 md:px-3 text-end">
                    <div className="h-2/3">
                      <div className="text-2xl font-light">
                        {recipe.name}
                      </div>
                      <div className="text-xs font-light italic">
                        {recipe.description}
                      </div>
                    </div>
                    {
                      // when the recipe is swiped the div must appear from the right side
                      swipeRecipe[index] && swipeRecipe[index].isSwiped ? (
                        <div className="absolute top-0 right-0 rounded-r-lg h-full w-1/2 bg-blue-500 flex ">
                          
                          <button className="bg-red-300 w-1/2 flex justify-center items-center justify-items-center"
                            onClick={(e) => {
                            e.preventDefault();
                            handleDelete(recipe.id)}}>
                            <div className="text-white font-bold text-xs">Supprimer</div>
                          </button>
                          <div className="bg-[#AC8778] rounded-r-lg w-1/2 flex justify-center items-center justify-items-center">
                            <div className="text-white font-bold text-xs">Modifier</div>
                          </div>
                        </div>
                      ) : null
                    }

                    {/*Bottom left*/}
                    <div className="h-1/3 flex justify-items-center items-end justify-start">

                      <div className="text-[10px]  font-light flex">
                        {// for all recipe.ingredients print map of all names
                          recipe.ingredients && recipe.ingredients.map((ingredient, index) => ingredient.name).join(', ')
                        }
                      </div>
                    </div>
                  </div>
                </>
              ) : <>

                  <div className="h-full w-1/2 py-3 px-5 md:px-3 ">
                    <div className="h-2/3">
                      <div className="text-2xl font-light">
                        {recipe.name}
                      </div>
                      <div className="text-xs font-light italic">
                        {recipe.description}
                      </div>
                    </div>

                    {
                      // when the recipe is swiped the div must appear from the right side
                      swipeRecipe[index] && swipeRecipe[index].isSwiped ? (
                        <div className="absolute z-30 top-0 right-0 rounded-r-lg h-full w-1/2 bg-blue-500 flex ">
                          
                          <button className="bg-red-300 w-1/2 flex justify-center items-center justify-items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(recipe.id)}}>
                            <div className="text-white font-bold text-xs">Supprimer</div>
                          </button>
                          <div className="bg-[#AC8778] rounded-r-lg w-1/2 flex justify-center items-center justify-items-center">
                            <div className="text-white font-bold text-xs">Modifier</div>
                          </div>
                        </div>
                      ) : null
                    }

                    {/*Bottom left*/}
                    <div className="h-1/3 flex justify-items-center items-end justify-start">

                      <div className="text-[10px]  font-light flex">
                        {// for all recipe.ingredients print map of all names
                          recipe.ingredients && recipe.ingredients.map((ingredient, index) => ingredient.name).join(', ')
                        }
                      </div>
                    </div>
                  </div>


                  <div className="w-1/2 aspect-square p-5">
                    <img id={index} className="w-full aspect-square shadow-xl rounded-xl" alt="crepes" />
                  </div>

              
            </>
            }

            

          </Link>
        ))}
        
      
      </div>

     
    </div>
  );
}

export async function getServerSideProps() {

  let URL = "http://back-end:5000/blogs";
  console.log(process.env.DEBUG_MODE);
  if(process.env.DEBUG_MODE === 'false'){
    URL = "https://production-url-unavailable";
  }
  console.log(URL);
  const res = await fetch(URL);
  const recipes = await res.json();

  recipes.forEach((recipe, index) => {
    recipe.image = `data:image/jpeg;base64,${recipe.image}`;
  }
  )


  return {
    props: {
      recipes,
      debugMode: process.env.DEBUG_MODE
    }
  }
}