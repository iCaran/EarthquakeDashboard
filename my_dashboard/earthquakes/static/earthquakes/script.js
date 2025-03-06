document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("earthquakeTable");
    const headers = table.querySelectorAll("th");
    const tbody = table.querySelector("tbody");
  
    // For filters
    const locationFilter = document.getElementById("locationFilter");
    const magnitudeFilter = document.getElementById("magnitudeFilter");
    const applyFiltersBtn = document.getElementById("applyFilters");
  
    // For pagination
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");
  
    // We'll store the original data in an array of objects for easy manipulation
    let rowsData = Array.from(tbody.querySelectorAll("tr")).map((row) => {
      const cells = row.querySelectorAll("td");
      return {
        rowElement: row,
        time: cells[0].innerText,
        place: cells[1].innerText,
        mag: parseFloat(cells[2].innerText || 0),
        url: cells[3].querySelector("a").href
      };
    });
  
    // Sorting
    headers.forEach((th, columnIndex) => {
      th.addEventListener("click", () => {
        const dataType = th.getAttribute("data-type");
        rowsData.sort((a, b) => {
          if (dataType === "number") {
            return a.mag - b.mag;
          } else if (dataType === "time") {
            return new Date(a.time) - new Date(b.time);
          } else {
            // Sorting by place if no data-type
            return a.place.localeCompare(b.place);
          }
        });
        renderTableRows(currentPage, pageSize);
      });
    });
  
    // Filtering
    applyFiltersBtn.addEventListener("click", () => {
      const locationVal = locationFilter.value.toLowerCase();
      const minMagVal = parseFloat(magnitudeFilter.value) || 0;
  
      // Filter the data
      const filtered = rowsData.filter((item) => {
        const locationMatch = item.place.toLowerCase().includes(locationVal);
        const magnitudeMatch = item.mag >= minMagVal;
        return locationMatch && magnitudeMatch;
      });
      // Reassign rowsData to filtered set
      rowsData = filtered;
      currentPage = 1; // reset to first page
      renderTableRows(currentPage, pageSize);
    });
  
    // Pagination
    let currentPage = 1;
    const pageSize = 20; // show 20 records per page
  
    function renderTableRows(page, size) {
      // Clear table body
      tbody.innerHTML = "";
      // Calculate start/end indices
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const totalRecords = rowsData.length;
  
      // Slice out the records for this page
      const pageData = rowsData.slice(startIndex, endIndex);
  
      // Populate table body
      pageData.forEach((item) => {
        tbody.appendChild(item.rowElement);
      });
  
      // Update pagination buttons and info
      pageInfo.textContent = `Showing ${startIndex + 1} - ${
        endIndex > totalRecords ? totalRecords : endIndex
      } of ${totalRecords} earthquakes`;
      prevPageBtn.disabled = page === 1;
      nextPageBtn.disabled = endIndex >= totalRecords;
    }
  
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTableRows(currentPage, pageSize);
      }
    });
  
    nextPageBtn.addEventListener("click", () => {
      const maxPage = Math.ceil(rowsData.length / pageSize);
      if (currentPage < maxPage) {
        currentPage++;
        renderTableRows(currentPage, pageSize);
      }
    });
  
    // Initial render
    renderTableRows(currentPage, pageSize);
  
    // --- OPTIONAL: Leaflet Map Integration ---
    // 1. Include Leaflet's CSS/JS in your HTML:
    //    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
    //    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
    // 2. Here is a snippet to initialize a map:
    /*
    const map = L.map('map').setView([20, 0], 2); // center map on the world
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    // Add earthquake markers
    rowsData.forEach((item) => {
      // If your quake data has geometry => quake.geometry.coordinates = [longitude, latitude, depth]
      const coords = item.rowElement.getAttribute('data-coords'); // you'd store them somehow
      if (!coords) return;
      const [lon, lat] = coords.split(',').map(parseFloat);
      L.marker([lat, lon]).addTo(map)
        .bindPopup(`${item.place}<br>Mag: ${item.mag}<br>${item.time}`);
    });
    */
    // --- Leaflet Map Integration ---
  // Parse the earthquake data from the JSON script tag
  const earthquakeData = JSON.parse(document.getElementById("earthquake-data").textContent);

  // Initialize the map centered roughly on the world
  const map = L.map('map').setView([20, 0], 2);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors'
  }).addTo(map);

  // Loop through each earthquake and add a marker
  earthquakeData.forEach(quake => {
      // Each quake's coordinates: [longitude, latitude, depth]
      const coords = quake.geometry.coordinates;
      const lon = coords[0];
      const lat = coords[1];
      
      // Create a marker and add it to the map
      const marker = L.marker([lat, lon]).addTo(map);
      
      // Bind a popup with earthquake details
      marker.bindPopup(`
          <strong>${quake.properties.place}</strong><br>
          Magnitude: ${quake.properties.mag}<br>
          Time: ${quake.readable_time}
      `);
  });

  });
  