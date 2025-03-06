# Earthquake Dashboard

An interactive **Django** web application that displays the **latest 500 earthquake records** from the [USGS API](https://earthquake.usgs.gov) on a **sortable table** and an **interactive Leaflet map**. Users can **filter** results by location or minimum magnitude, **paginate** through the data, and **toggle** between **light** and **dark** modes for a visually appealing experience.

---
![Screenshot 2025-03-06 at 15-36-57 Latest 500 Earthquakes](https://github.com/user-attachments/assets/dee5b298-6c4c-4ccd-a563-9328812b83b3)
---

## Features

1. **Live Earthquake Data**  
   - Fetches the latest 500 earthquake records (GeoJSON) from the USGS API.

2. **Interactive Table**  
   - Clickable headers to **sort** by Time or Magnitude.  
   - **Filtering** by location keyword and minimum magnitude.  
   - **Pagination** to navigate large datasets smoothly.

3. **Leaflet Map**  
   - **Markers** for each earthquake location with a popup showing place, magnitude, and time.

4. **Light/Dark Mode Toggle**  
   - Switch between a bright, clean UI and a dark theme that’s easier on the eyes.

5. **Responsive & Modern Design**  
   - Built with **Bootstrap** for a professional look and responsiveness.  
   - Smooth **CSS transitions** and microinteractions.

---

## Technologies Used

- **Python 3**  
- **Django 4**  
- **Requests** (Python library for making API calls)  
- **Bootstrap 5** (via CDN)  
- **Leaflet.js** (via CDN)  
- **JavaScript** (for sorting, filtering, pagination, and map integration)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/earthquake-dashboard.git
cd earthquake-dashboard
```

### 2. Create and Activate a Virtual Environment
```bash
python -m venv env
# On Windows:
env\Scripts\activate
# On macOS/Linux:
source env/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```
*(If you don’t have a `requirements.txt`, install manually: `pip install django requests`.)*

### 4. Run Database Migrations
```bash
python manage.py migrate
```

### 5. Start the Development Server
```bash
python manage.py runserver
```
Open your browser and navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000) to see the dashboard.

---

## Project Structure

```
earthquake-dashboard/
├── manage.py
├── my_dashboard/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── earthquakes/
│   ├── views.py
│   ├── urls.py
│   ├── templates/
│   │   └── earthquakes/
│   │       └── dashboard.html
│   └── static/
│       └── earthquakes/
│           ├── style.css
│           └── script.js
└── README.md
```

- **my_dashboard**: Main Django project folder with settings and configuration.  
- **earthquakes**: Django app containing all earthquake-related logic (views, URLs, templates, static files).  
- **templates/earthquakes/dashboard.html**: The main template for displaying the data and map.  
- **static/earthquakes/style.css**: Custom CSS for both light and dark themes.  
- **static/earthquakes/script.js**: JavaScript handling table sorting, filtering, pagination, map plotting, and dark/light mode toggling.

---

## How It Works

1. **Fetching Data**  
   - The `dashboard` view in `earthquakes/views.py` uses `requests` to fetch the latest earthquake data from USGS.  
   - Data is passed to the `dashboard.html` template as a context variable named `earthquakes`.

2. **Rendering & Interactivity**  
   - **Table**: Displays time, place, magnitude, and a “More Info” link for each earthquake.  
   - **JavaScript**: Handles sorting (by clicking column headers), client-side filtering, pagination, and map integration.  
   - **Leaflet**: Renders an interactive map with markers at each earthquake’s coordinates.

3. **Dark/Light Mode**  
   - A toggle button switches classes on the `<body>` and `<navbar>`, letting you apply different CSS rules for each theme.

---

## Customization

1. **Modify Table Columns**  
   - Edit the `dashboard.html` template to display additional data (e.g., depth, updated time) from the USGS API.

2. **Change Map Tiles or Markers**  
   - Use another tile provider (e.g., Mapbox, Stamen) or custom markers in the JavaScript code.

3. **Refine the Filter Logic**  
   - Adjust filters for date range, maximum magnitude, or exact location matching.

4. **Improve the UI**  
   - Tweak Bootstrap classes, add animations, or integrate a custom color palette in `style.css`.

---

## Contributing

1. **Fork** this repository.  
2. **Create** a new branch for your feature or bugfix.  
3. **Commit** and **push** your changes.  
4. Open a **Pull Request** and describe your changes.

All contributions are welcome!

---

## License

This project is open-sourced under the [Unlicense](LICENSE). You are free to use and modify this project for personal or commercial purposes.

---

## Contact

- **Author:** Karan Pratap Shaw (karanpratapshaw@proton.me)  
- **LinkedIn:** [LinkedIn](https://www.linkedin.com/in/karanpratapshaw)  
- **GitHub:** [@iCaran](https://github.com/iCaran)

If you encounter any issues or have feature requests, feel free to [open an issue](https://github.com/iCaran/EarthquakeDashboard/issues).

---

**Enjoy exploring real-time earthquake data in style!**
