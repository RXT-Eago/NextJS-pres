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
  const [Auteur , setAuteur] = useState("");
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

    const url = "https://next-js-pres.vercel.app/addBlog"


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
        "auteur" : Auteur,
        "description" : Description,
        "hashtags" : Etapes,
        "image" : ""
        //"image" : dataUrl.split(",")[1]
        
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
    
    <div className="w-screen h-auto">

     <div className="fixed z-0 bottom-0 left-0 w-screen h-16  p-2 bg-backrgound">
        <div className="w-full h-full flex justify-center items-center justify-items-center">
          <button className="w-1/2 rounded-3xl h-full bg-primary text-white text-xl font-light"
          onClick={() => SubmitRecipe()}>
            Créer le post
          </button>
        </div>
    </div>


      <Header />
      <NavBar />

      <div className="absolute -z-10 w-full h-[calc(100vh-132px)] bg-backrgound  flex justify-center items-center justify-items-center">
      </div>

      <div className="w-full h-[calc(100vh-132px)]  sm:px-[20%]  overflow-y-auto">

     

      <div className="h-auto text-lg text-center w-full my-4 text-primary relative">
        Créer un nouveau post
      </div>


      <div id="NomRecette" className="w-full h-auto py-1 px-6">
        
        <h1>
          Nom de l&apos;article
        </h1>
        <div className="w-full ">
            <hr className="w-full h-0.5 bg-slate-300 " />
        </div>
        <div className="w-full p-2 ">
          <input className="w-full border-2 text-sm rounded-xl text-primaryText shadow-sm p-2 border-primary bg-secondary"
          type="text"
          placeholder="Saissisez le nom de l'article"
          onChange={(e) => setNom(e.target.value)} />
        </div>
        
      </div>

      <div id="auteur" className="w-full h-auto py-1 px-6">
        
        <h1>
          Auteur
        </h1>
        <div className="w-full ">
            <hr className="w-full h-0.5 bg-slate-300 " />
        </div>
        <div className="w-full p-2 ">
          <input className="w-full border-2 text-sm rounded-xl text-primaryText shadow-sm p-2 border-primary bg-secondary"
          type="text"
          placeholder="Saissisez votre nom"
          onChange={(e) => setAuteur(e.target.value)} />
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
          <textarea className="w-full border-2 text-sm rounded-xl shadow-sm text-primaryText p-2 min-h-[150px] max-h-[250px] border-primary bg-secondary"
           type="text"
           placeholder="Ecrivez votre description"
          onChange={(e) => setDescription(e.target.value)} />
        </div>
        
      </div>


        
  

      <div id="Etapes" className="w-full h-auto py-1 px-6 mb-10">
          <h1>
            Hashtags
          </h1>
          <div className="w-full ">
            <hr className="w-full h-0.5 bg-slate-300 " />
        </div>
          <div className="w-full p-2 ">
            <input className="w-full border-2 border-primary text-primaryText text-sm rounded-xl shadow-sm p-2 bg-secondary" type="text"
            placeholder="Ajouter un ou plusieurs hastags"
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                setEtapes([...Etapes, e.target.value]);
                e.target.value = "";
              }

            }
            }
             />

          </div> 
          {
            Etapes.length > 0 ? (
              <div className="w-full p-2 flex justify-start items-center">
                {
                  Etapes.map((etape, index) => (
                    <button key={index} className="w-auto h-auto bg-secondary text-primaryText text-xs rounded-full p-2 m-1"
                      onClick={() => setEtapes(Etapes.filter((item, i) => i !== index))}>
                      {etape}
                    </button>
                  ))
                }
              </div>
            ) : null
          }
          
          
      </div>

        <div id="Image" className="w-full h-auto mb-5 py-1 px-6 flex justify-center justify-items-center items-center">

          {
            Image ? (
              <div className="relative w-full h-full flex justify-center justify-items-center items-center p-7">
                <Image src={URL.createObjectURL(Image)} className="w-full h-full rounded-xl shadow-xl" alt="" />
                <button className="absolute top-0 right-0 w-8 h-8 border-2 border-primary text-primaryText bg-secondary rounded-full flex justify-center items-center justify-items-center"
                  onClick={() => setImage(null)}>
                  X
                </button>
              </div>
            ) : <>
              <label htmlFor="fileupload" className="w-2/3 h-auto p-4 rounded-2xl border-primaryText border-2 flex justify-center justify-items-center items-center">
                <div className="w-1/2 h-full text-primary flex justify-center justify-items-center items-center text-center">
                  Selectionner une image
                </div>
              </label>
              <input id="fileupload" type="file" accept="image/*" capture="camera"
                onChange={(e) => setImage(e.target.files[0])} placeholder="Ajouter une image" className="hidden" />
                  
            </>
          }
          

        </div>
      
      </div>
      
     
    </div>
    </>
  );
}
