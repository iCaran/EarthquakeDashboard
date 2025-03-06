import requests
from django.shortcuts import render
from datetime import datetime

def dashboard(request):
    url = "https://earthquake.usgs.gov/fdsnws/event/1/query"
    params = {
        "format": "geojson",   # We want the data in GeoJSON format
        "orderby": "time",     # Order by the most recent
        "limit": 500           # Limit to 500 records
    }
    response = requests.get(url, params=params)
    data = response.json() if response.status_code == 200 else {}
    features = data.get("features", [])

    # Process each record to add a human-readable time format
    for quake in features:
        quake['readable_time'] = datetime.utcfromtimestamp(
            quake['properties']['time'] / 1000
        ).strftime('%Y-%m-%d %H:%M:%S')
    
    return render(request, "earthquakes/dashboard.html", {"earthquakes": features})
