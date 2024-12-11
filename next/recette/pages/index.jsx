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



export default function Home({ recipes, debugMode }) {


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

    if (isLeftSwipe) {
      console.log('swipe', isLeftSwipe ? 'left' : 'right');
      console.log('id', id);

      setSwipeRecipe((prevSwipeRecipes) =>
        prevSwipeRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, isSwiped: true } : recipe
        )
      );
    }
    if (isRightSwipe) {
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
      : "https://next-js-pres.vercel.app/";

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
    <div className="w-screen h-screen">
      <Header />
      <NavBar />
      < BottomBar />



      < SearchBar searchText={searchText} setSearchText={setSearchText} />


      <div id="mainRecetteDisplay" className="w-full bg-backrgound h-[calc(100vh-129px)] gap-10 items-center px-3 py-4 flex flex-wrap justify-center overflow-y-auto overflow-x-hidden pb-24">

        {recipes.map((recipe, index) => (
          <Link key={index} className="w-full relative h-56 p-2 my-4 z-20  flex justify-center bg-secondary rounded-lg flex-grow basis-56 border-2 max-w-64 border-primary shadow-primary overflow-hidden shadow-lg hover:shadow-pink-600 hover:border-pink-500 transition-shadow duration-500"
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd(recipe.id)}

            href={`/recette/${recipe.id}`} >

            {/* {
              recipe.image && (
                <next_image
                  width={300}
                  height={300}
                  id={index}
                  className="absolute top-0 left-0 w-full h-full object-cover grayscale opacity-5 rounded-lg hover:scale-150 transition-transform duration-500"
                  src={recipe.image}
                  alt={recipe.name}
                />
              )
              
            } */}
          

            <div className="h-full w-full py-3 px-5 md:px-3 text-primaryText">
              <div className="h-4/6">
                <div className="text-2xl font-light">
                  {recipe.name && recipe.name.length > 20 ? recipe.name.slice(0, 20) + "..." : recipe.name}
                </div>
                <div className="text-xs font-light italic">
                  {recipe.description && recipe.description.length > 100 ? recipe.description.slice(0, 100) + "..." : recipe.description}
                </div>
              </div>
              {
                // when the recipe is swiped the div must appear from the right side
                swipeRecipe[index] && swipeRecipe[index].isSwiped ? (
                  <div className="absolute top-0 right-0 rounded-r-lg h-full w-1/2 bg-blue-500 flex ">

                    <button className="bg-red-300 w-1/2 flex justify-center items-center justify-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(recipe.id)
                      }}>
                      <div className="text-white font-bold text-xs">Supprimer</div>
                    </button>
                    <div className="bg-[#AC8778] rounded-r-lg w-1/2 flex justify-center items-center justify-items-center">
                      <div className="text-white font-bold text-xs">Modifier</div>
                    </div>
                  </div>
                ) : null
              }

              {/*Bottom left*/}
              <div className="h-1/6 flex justify-items-center items-end justify-start">
                <div className="text-xs text-primaryText italic font-thin">
                  Ecrit par <span className="font-normal">{recipe.auteur}</span>
                </div>
              </div>
              <div className="h-1/6 flex justify-items-center items-end justify-start">

                <div className="text-[10px] text-primaryText italic font-thin">
                  {// for all recipe.ingredients print map of all names
                    recipe.hashtag && recipe.hashtag.map((hashtag, index) => {
                      return "#" + hashtag
                    }
                    ).join(', ')
                  }
                </div>
              </div>
            </div>



          </Link>
        ))}


      </div>


    </div>
  );
}

export async function getServerSideProps() {

  //let URL = "http://back-end:5000/blogs";
  let URL = "http://localhost:5000/blogs";

  console.log(process.env.DEBUG_MODE);
  if (process.env.DEBUG_MODE === 'false') {
    URL = "https://next-js-pres.vercel.app/";
  }
  const res = await fetch(URL);
  const recipes = await res.json();


  return {
    props: {
      recipes,
      debugMode: process.env.DEBUG_MODE
    }
  }
}