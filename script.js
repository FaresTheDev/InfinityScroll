const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader')

let photosArray = [];

//helper function to set attributes 
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    };
};

//check if all images done loading 
let ready = false;
let loadedImages = 0;
let totalImages = 0

function imageLoaded() {
    loadedImages++;

    if(loadedImages === totalImages) {
        ready = true;
        loader.hidden = true;

        //to make UX better, initial load = 5 photos, then reload with 30 photos
        photosMaxCount = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photosMaxCount}`;
    };
};

//create elements and add to the DOM
function displayPhotos() {
    loadedImages = 0;
    totalImages = photosArray.length;
    console.log('totalImages' ,totalImages);
    //Run function for each element in photoArray
    photosArray.forEach((photo) => {
        //create <a> 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        //create <img>
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Check if images finished loadeing
        img.addEventListener('load', imageLoaded)
        //put <img> in <a>, then both in imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};
//Unsplash API url
const apiKey = 'DGRvFyFN6OToGij3u7FWCX0q4zuf4DGC9NK6eWuZH6o'
let photosMaxCount = 5;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photosMaxCount}`;

//get photos from api
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //error handle here 
    };
};

//check scrolling, if at end load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//on load 
getPhotos();