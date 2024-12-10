import base64
import json
import os
import traceback
from flask import Flask, current_app
from flask import request
import requests
from supabase import create_client, Client


app = Flask(__name__)


ANON_KEY = os.environ.get('ANON_KEY')
DATABASE_URL = os.environ.get('DATABASE_URL')


@app.route('/')
def home():
    logger = current_app.logger
    logger.info('Hello, World!')
    return 'Hello, World!'



@app.route('/blogs')
def get_blogs():
    logger = current_app.logger
    print("recipes")
    logger.info(f"DATABASE_URL: {DATABASE_URL}")
    logger.info(f"ANON_KEY: {ANON_KEY}")

    try:
        SupabaseClient = create_client(DATABASE_URL, ANON_KEY)
        
        response = SupabaseClient.table('Blog').select('*').execute()
        blogs = response.data

        if len(blogs) == 0:
            return []
        
        return json.dumps(blogs)
            
    except Exception as e:
        print(e)
        return str(e)

@app.route('/blog')
def get_single_blog():
    
    blog_id = request.args.get('id')

    SupabaseClient = create_client(DATABASE_URL, ANON_KEY)
    
    response = SupabaseClient.table('Blog').select('*').eq('id', blog_id).execute()
    blog = response.data
 
    if len(blog) == 0:
        return {"message": "No recipe found"}

    return blog[0]
   
@app.route('/deleteBlog')
def delete_blog():
    try:
        blog_id = request.args.get('id')

        SupabaseClient = create_client(DATABASE_URL, ANON_KEY)

        response = SupabaseClient.table('Blog').delete().eq('id', blog_id).execute()

        return "deleted"
    except Exception as e:
        print(e)
        return "failed"

@app.route('/addBlog', methods=['POST'])
def addRecipe():
    if request.method == 'POST':

        logger = current_app.logger
        
        dictionnary = request.data


        json_object = json.loads(dictionnary)

        logger.info(f"json_object: {json_object}")

        try:
        
            SupabaseClient = create_client(DATABASE_URL, ANON_KEY)       
        
            response = SupabaseClient.table('Blog').insert(
                {'name': json_object['name'], 'description': json_object['description'], 'hashtag': json_object['hashtags'], 'auteur': json_object['auteur']}
            ).execute()
            response = response.data
            blog_id = response[0]['id']

            logger.info(f"created blog_id: {blog_id}")
            
            return "Recette ajoutée avec succès"
        
        except Exception as e:
            logger.error(f"Error: {e} and {traceback.format_exc()}")
            return str(e)

    else:
        return 'Only POST requests are allowed'
