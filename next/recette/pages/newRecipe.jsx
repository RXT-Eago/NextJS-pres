import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

import { useState } from "react";
import { useEffect } from "react";


export default function NewBlog() {


  const [Nom , setNom] = useState("");
  const [Description , setDescription] = useState("");
  const [NbPersonnes , setNbPersonnes] = useState(2);
  const [Ingredients , setIngredients] = useState([]);
  const [currentIngredient , setCurrentIngredient] = useState("");
  const [currentQuantite , setCurrentQuantite] = useState("");
  const [currentType , setCurrentType] = useState("g");
  const [OpenIngredientModal , setOpenIngredientModal] = useState(false);
  const [Image , setImage] = useState("");
  const [Etapes , setEtapes] = useState([]);
  const [isWaiting , setIsWaiting] = useState(false);

  const debugMode = process.env.DEBUG_MODE === 'false';


  function addPersonne(){
    setNbPersonnes(NbPersonnes+1);
  }
  function removePersonne(){
    if(NbPersonnes>1){
      setNbPersonnes(NbPersonnes-1);

    }
  }

  function addIngredient(){
    const IngredientFormat = {
      "name": currentIngredient,
      "quantite": currentQuantite,
      "unite": currentType
    }
    console.log(IngredientFormat);
    setIngredients([...Ingredients, IngredientFormat]);
    setOpenIngredientModal(false);
  }

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  function PostRecipe(Recipe){


    setIsWaiting(true);

    const url = "http://localhost:5000/addBlog"


    console.log(url);
    console.log(Recipe);
    let data = Recipe;

    fetch(url, {
      method: 'POST', // or 'PUT'
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
      setIsWaiting(false);
      window.location.href = "/";
    }).catch((error) => {
      setIsWaiting(false);
      console.error('Error:', error);
    }
    );

  }

  

  function SubmitRecipe(){
    // convert image to base64 string
    const base64image = Image ? URL.createObjectURL(Image) : null;
    console.log(base64image);
    
    toDataURL(base64image, function(dataUrl) {      
      const Recipe = {
        "name" : Nom,
        "ingredients" : Ingredients,
        "description" : Description,
        "nb_personnes" : NbPersonnes,
        "hashtags" : Etapes,
        "image" : dataUrl.split(",")[1]
        
      }
      
      PostRecipe (Recipe);
    }
    )

    
    
    
  }

  return (
    <>
      
       {
        isWaiting ? (
          <div className="fixed z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-full h-full relative rounded-xl shadow-lg  flex justify-center justify-items-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-300"></div>
            </div>
          </div>
        ) : null
       } 
      
       {
        OpenIngredientModal ? (
          <div className="fixed sm:px-[20%] z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-4/5 h-1/2 relative bg-white rounded-xl shadow-lg p-4 flex justify-center justify-items-center items-center">
              
              <div className="absolute top-2 right-4 w-9 h-9 flex justify-center items-center justify-items-center">
                <button className="bg-slate-300 border-2 w-full h-full text-sm rounded-full shadow-sm"
                onClick={() => setOpenIngredientModal(false)}>
                  X
                </button>
              </div>

              <div className="w-full h-2/3">
              <h1>
                Ajouter un ingrédient
              </h1>
              <div className="w-full px-2">
                <hr className="w-full h-0.5 bg-slate-300 " />
              </div>

              <div className="w-full p-2 ">
                <input className="w-full border-2 text-sm rounded-xl shadow-sm p-2" type="text"
                onChange={(e) => setCurrentIngredient(e.target.value)} />
              </div>

              <h1>
                Quantité
              </h1>
              <div className="w-full px-2">
                <hr className="w-full h-0.5 bg-slate-300 " />
              </div>

              <div className="w-full p-2 flex gap-x-1">
                <input className="w-1/2 border-2 text-sm rounded-xl shadow-sm p-2" type="text"
                onChange={(e) => setCurrentQuantite(e.target.value)} />

                <select className="w-1/2 border-2 text-sm rounded-xl shadow-sm p-2"
                value={currentType}
                onChange={(e) => setCurrentType(e.target.value)}>
                  <option>g</option>
                  <option>mg</option>
                  <option>cl</option>
                  <option>ml</option>
                  <option>L</option>
                  <option>cuillère à café</option>
                  <option>cuillère à soupe</option>
                  <option>unité</option>
                </select>
              </div>

              <div className="w-full p-2 ">
                <button className="w-full bg-slate-300 border-2 text-sm  rounded-xl shadow-sm p-3"
                onClick={() => addIngredient()}>
                  Ajouter
                </button>
              </div>
            </div>
            </div>
          </div>
        ) : null
      }
    <div className="w-screen h-auto" style={{filter: OpenIngredientModal || isWaiting ? "blur(5px)" : "none"}}>

     <div className="fixed z-0 bottom-0 left-0 w-screen h-16  p-2 mt-5">
        <div className="w-full h-full flex justify-center items-center justify-items-center">
          <button className="w-1/2 rounded-3xl h-full bg-primary text-white text-xl font-extralight"
          onClick={() => SubmitRecipe()}>
            Créer la recette
          </button>
        </div>
    </div>


      <Header />
      <NavBar />

      <div className="w-full h-[calc(100vh-8rem)] sm:px-[20%]  overflow-y-auto">

     

      <div className="h-atuo text-lg text-center w-full my-4 font-thin relative">
        Créer une nouvelle recette
          <Link className="absolute top-0 left-0 h-10 w-10 text-black font-bold text-2xl  z-10"
            href="/">
            {"<-"}
           </Link>
      </div>


      <div id="NomRecette" className="w-full h-auto py-1 px-6">
        
        <h1>
          Nom de la recette
        </h1>
        <div className="w-full ">
            <hr className="w-full h-0.5 bg-slate-300 " />
        </div>
        <div className="w-full p-2 ">
          <input className="w-full border-2 text-sm rounded-xl shadow-sm p-2" type="text"
          onChange={(e) => setNom(e.target.value)} />
        </div>
        
      </div>


      <div id="NomRecette" className="w-full h-auto py-1 px-6">
        
        <h1>
          Description
        </h1>
        <div className="w-full ">
            <hr className="w-full h-0.5 bg-slate-300 " />
        </div>
        <div className="w-full p-2 ">
          <input className="w-full border-2 text-sm rounded-xl shadow-sm p-2" type="text" 
          onChange={(e) => setDescription(e.target.value)} />
        </div>
        
      </div>

      <div id="NomRecette" className="w-full h-auto py-1 px-6">
        
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


      <div id="Ingredient" className="w-full h-auto py-1 px-6">
        
        <h1>
          Ingrédients
        </h1>
        <div className="w-full ">
            <hr className="w-full h-0.5 bg-slate-300 " />
        </div>

        {
          Ingredients && Ingredients.map((ingredient, index) => (
            <div key={index} className="w-full p-2 flex gap-1">
              <div className="w-1/2 border-2 text-sm rounded-xl shadow-sm p-2">
                {ingredient.name}
              </div>
              <div className="w-1/4 border-2 text-sm rounded-xl shadow-sm p-2">
                {ingredient.quantite} 
                <span className="pl-1"> {ingredient.unite}</span>
              </div>
              

              <button className="w-1/4 bg-slate-300 border-2 text-sm  rounded-xl shadow-sm p-2"
              onClick={() => setIngredients(Ingredients.filter((item, i) => i !== index))}>
                -
              </button>
            </div>
          ))

        }


        <div className="w-full p-2 ">
          <button className="w-full bg-slate-300 border-2 text-sm  rounded-xl shadow-sm p-3"
          onClick={() => setOpenIngredientModal(true)}>
            Ajouter un ingrédient
          </button>
        </div>

        
        
      </div>

      <div id="Etapes" className="w-full h-auto py-1 px-6 mb-10">
          <h1>
            Etapes
          </h1>
          <hr className="w-full h-0.5 bg-slate-300 " />
          {
            Etapes && Etapes.map((etape, index) => (
              <div key={index} className="w-full p-2 flex gap-1">
                <div className="w-1/6 border-2 text-sm flex justify-center items-center rounded-full shadow-sm p-2">
                  {index+1}
                </div>
                <textarea className="w-2/3  border-2 text-sm rounded-xl shadow-sm p-2"
                onChange={(e) => { Etapes[index] = e.target.value; setEtapes([...Etapes])}}
                style={{resize: "none"}}
                >


                  {etape}
                </textarea>
                <button className="w-1/6 bg-slate-300 border-2 text-sm  rounded-xl shadow-sm p-2"
                onClick={() => setEtapes(Etapes.filter((item, i) => i !== index))}>
                  -
                </button>
              </div>
            ))
          }
          <div className="w-full p-2 ">
            <button className="w-full bg-slate-300 border-2 text-sm  rounded-xl shadow-sm p-3"
            onClick={() => setEtapes([...Etapes, ""])}>
              Ajouter une étape
            </button>
          </div>
          
          
      </div>

        <div id="Image" className="w-full h-auto mb-5 py-1 px-6 flex justify-center justify-items-center items-center">

          {
            Image ? (
              <img src={URL.createObjectURL(Image)} className="w-1/2 h-1/2 rounded-xl shadow-xl" />
            ) : <>
              <label htmlFor="fileupload" className="w-2/3 h-auto p-4 rounded-xl border-gray-900 border-2   text-white flex justify-center justify-items-center items-center">
                <div className="w-1/2 h-full text-black flex justify-center justify-items-center items-center text-center">
                  Selectionner une image
                </div>
              </label>
              <input id="fileupload" type="file" accept="image/*" capture="camera"
                onChange={(e) => setImage(e.target.files[0])}>
              </input>
            </>
          }
          

        </div>
      
      </div>
      
     
    </div>
    </>
  );
}
