import { db, storeImage, loadImage } from "./db.js";
import { isVisited, setVisited, removeVisited } from "./storage.js";
import { themes, applyTheme, loadSavedTheme } from "./themes.js";

export function initMap(countries) {
    const map = document.getElementById("map");
    const panel = document.getElementById("panel");
    const fileInput = document.getElementById("fileInput");
    const uploadBtn = document.getElementById("uploadBtn");
    const toggle = document.getElementById("toggle");
    const image = document.getElementById("image");
    const closeBtn = document.getElementById("close");

    const optionsPanel = document.getElementById("options-panel");
    const openOptions = document.getElementById("open-options");
    const closeOptions = document.getElementById("close-options");
    const themeGrid = document.getElementById("theme-grid");
    const clearBtn = document.getElementById("clear-images");

    let currentCountryId = null;

    Object.keys(countries).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        if (isVisited(id)) {
            el.classList.add("visited");
        }
    });

    document.addEventListener("click", (e) => {
        if (!panel.contains(e.target) && !e.target.closest("path")) {
            panel.style.display = "none";
        }
    });

    closeBtn.addEventListener("click", () => {
        panel.style.display = "none";
    });

    map.addEventListener("click", (e) => {
        if (!e.target.id) return;

        const id = e.target.id;
        const name = e.target.getAttribute("name");
        const data = countries[id];

        if (!data) return;

        currentCountryId = id;

        document.getElementById("country-name").textContent = name;
        document.getElementById("peak").textContent = data.peak;
        document.getElementById("height").textContent = data.height + " m";

        const el = document.getElementById(id);

        if (isVisited(id)) {
            el.classList.add("visited");
            toggle.textContent = "Unmark as visited";
        } else {
            el.classList.remove("visited");
            toggle.textContent = "Mark as visited";
        }

        image.src = "";

        loadImage(id, (url) => {
            if (url) {
                image.src = url;
            } else {
                image.src = `images/${id.toLowerCase()}.jpg`;
            }
        });

        panel.style.display = "block";
    });

    toggle.addEventListener("click", () => {
        if (!currentCountryId) return;

        const el = document.getElementById(currentCountryId);

        if (isVisited(currentCountryId)) {
            removeVisited(currentCountryId);
            el.classList.remove("visited");
            toggle.textContent = "Mark as visited";
        } else {
            setVisited(currentCountryId);
            el.classList.add("visited");
            toggle.textContent = "Unmark as visited";
        }
    });

    uploadBtn.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file || !currentCountryId) return;

        storeImage(currentCountryId, file);

        const url = URL.createObjectURL(file);
        image.src = url;

        fileInput.value = "";
    });


    // Render theme grid
    themes.forEach(theme => {
        const div = document.createElement("div");
        div.className = "theme-card";

        div.style.background = `linear-gradient(45deg, ${theme.bg}, ${theme.accent})`;

        div.addEventListener("click", () => {
            applyTheme(theme);
        });

        themeGrid.appendChild(div);
    });

    loadSavedTheme();

    openOptions.addEventListener("click", () => {
        optionsPanel.style.display = "block";
    });

    closeOptions.addEventListener("click", () => {
        optionsPanel.style.display = "none";
    });

    clearBtn.addEventListener("click", () => {
        if (!confirm("Delete all uploaded photos?")) return;

        const tx = db.transaction("images", "readwrite");
        const store = tx.objectStore("images");
        store.clear();

        alert("All photos deleted");
        image.src = "";
    });
}