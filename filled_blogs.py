import base64
import json
import os
import traceback
import requests
import random
from supabase import create_client, Client


ANON_KEY = os.environ.get('ANON_KEY_NEXTJS')
DATABASE_URL = os.environ.get('DATABASE_URL_NEXTJS')


def url_to_data_url(image_url):
    try:
        # Fetch the image from the URL
        response = requests.get(image_url)
        response.raise_for_status()  # Raise an error for bad responses
        
        # Get the content type of the image
        content_type = response.headers.get('Content-Type', 'application/octet-stream')
        
        # Convert the image content to base64
        base64_data = base64.b64encode(response.content).decode('utf-8')
        
        # Format as a data URL
        data_url = f"{base64_data}"
        return data_url
    except requests.RequestException as e:
        print(f"Error fetching the image: {e}")
        return None
    

SupabaseClient = create_client(DATABASE_URL, ANON_KEY)

names = [
    "Mastering Forex Strategies",
    "Stock Market Secrets Unveiled",
    "The Art of Day Trading",
    "Crypto Trading 101",
    "Swing Trading Masterclass",
    "Understanding Market Volatility"
]

descriptions = [
    "Learn the best forex trading strategies to maximize your gains and minimize risks. Perfect for beginners and pros alike!",
    "Discover the hidden techniques that successful stock traders use to stay ahead in the market.",
    "A complete guide to day trading, including tips on risk management and chart analysis.",
    "Get started with cryptocurrency trading and learn how to profit in a volatile market.",
    "Master the art of swing trading and take advantage of short- to medium-term market trends.",
    "Navigate the complexities of market volatility with proven strategies and tools."
]

hashtags = [
    "ForexTrading",
    "StockTrading",
    "DayTrading",
    "CryptoTrading",
    "SwingTrading",
    "MarketVolatility"
]


auteurs = [
    "John Trader",
    "Emily Stocksworth",
    "Michael Chartman",
    "CryptoGuru101",
    "Sophia Swinger",
    "Victor Volatility"
]



images = [
    "https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I=",
    "https://media.istockphoto.com/id/1465618017/fr/photo/les-investisseurs-hommes-daffaires-r%C3%A9fl%C3%A9chissent-avant-dacheter-un-investissement-boursier.jpg?s=612x612&w=0&k=20&c=2SemnSpqqtbId7EQ_1T0osSllw9KcAamjT3N6WeVFTI="
]

for i in range(0, 10):
    response = SupabaseClient.table('Blog').insert(
        {
            'name': random.choice(names),
            'description': random.choice(descriptions),
            #'image': url_to_data_url(random.choice(images)),
            'hashtag': list(random.sample(hashtags, 2)),
            'auteur': random.choice(auteurs)
        }
    ).execute()