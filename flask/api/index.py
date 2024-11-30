import base64
import json
import os
from flask import Flask, current_app
from flask import request
import requests
from supabase import create_client, Client


app = Flask(__name__)


ANON_KEY = os.environ.get('ANON_KEY')
DATABASE_URL = os.environ.get('DATABASE_URL')

app.config['ANON_KEY'] = ANON_KEY
app.config['DATABASE_URL'] = DATABASE_URL

#URL = "https://api-recette-zouzou.vercel.app/"

@app.route('/')
def home():
    logger = current_app.logger
    logger.info('Hello, World!')
    return 'Hello, World!'



@app.route('/recipes')
def recipes():
    logger = current_app.logger
    logger.info(f"DATABASE_URL: {DATABASE_URL}")
    logger.info(f"ANON_KEY: {ANON_KEY}")
    
    try:
        SupabaseClient = create_client(DATABASE_URL, ANON_KEY)
        
        response = SupabaseClient.table('Recettes').select('*').execute()
        recettes = response.data 

        

        if len(recettes) == 0:
            return []

        for recette in recettes:
            response = SupabaseClient.table('Ingredients').select('*').eq('recette_id', recette['id']).execute()
            ingredients = response.data
            recette['ingredients'] = ingredients

        
        return json.dumps(recettes)
            
    except Exception as e:
        print(e)
        return str(e)

@app.route('/recette')
def getSingleRecipe():
    
    recette_id = request.args.get('id')
    print(recette_id)
    SupabaseClient = create_client(DATABASE_URL, ANON_KEY)
    
    response = SupabaseClient.table('Recettes').select('*').eq('id', recette_id).execute()
    recette = response.data
 
    if len(recette) == 0:
        return {"message": "No recipe found"}

    response = SupabaseClient.table('Ingredients').select('*').eq('recette_id', recette_id).execute()
    ingredients = response.data
    recette[0]['ingredients'] = ingredients

    return recette[0]
   
@app.route('/deleteRecipe')
def deleteRecipe():
    try:
        recette_id = request.args.get('id')
        print(recette_id)
        SupabaseClient = create_client(DATABASE_URL, ANON_KEY)
        
        response = SupabaseClient.table('Ingredients').delete().eq('recette_id', recette_id).execute()

        response = SupabaseClient.table('Recettes').delete().eq('id', recette_id).execute()
        print("deleted")
        return "deleted"
    except Exception as e:
        print(e)
        return "failed"

@app.route('/addRecipe', methods=['POST'])
def addRecipe():
    if request.method == 'POST':
        
        dictionnary = request.data

        """
        {
            "name": "Poulet aux champignons",
            "description": "Une recette de poulet aux champignons",
            "image": "https://www.google.com",
            "etapes": ["manger", "boire"],
            "nb_personnes": "4",
            "ingredients": [
                {
                    "name": "Poulet",
                    "quantite": "2",
                    "unite": "kg"
                },
                {
                    "name": "Champignons",
                    "quantite": "500",
                    "unite": "g"
                }
            ]
        }
        """

        
        json_object = json.loads(dictionnary)

        try:
        

      
            SupabaseClient = create_client(DATABASE_URL, ANON_KEY)       

            

            response = SupabaseClient.table('Recettes').insert(
                {'name': json_object['name'], 'description': json_object['description'], 'image': json_object['image'], 'etapes': json_object['etapes'], 'nb_personnes': json_object['nb_personnes']}
            ).execute()
            response = response.data
            recette_id = response[0]['id']
            
            print(recette_id)
            for ingredient in json_object['ingredients']:
                print(ingredient['name'])
                response = SupabaseClient.table('Ingredients').insert(
                    [{'name': ingredient['name'], 'quantite': ingredient['quantite'], 'unite': ingredient['unite'], 'recette_id': recette_id}]
                ).execute()

                data = response.data

            return "Recette ajoutée avec succès"
        
        except Exception as e:
            print(e)
            return str(e)
        
        
        

    else:
        return 'Only POST requests are allowed'


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)