const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageLoad = 0;
let totalImages = 0;
let photosArray = [];

let isInitialLoad = true;

// Unsplash API
// const count = 10;
let initialLoad = 5;
const apiKey = '-DddpPrsotGfB7ry1tVpkZFen0AT81-jnKodZMLIe4E';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialLoad}`

// 
function updateApiUrlWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`
}
// 

// Check if all images were loaded
function imageLoaded() {
    // console.log('Image loaded...')
    imageLoad++;
    if(imageLoad === totalImages) {
        ready = true;
        loader.hidden = true;
        // console.log('ready = ', ready)
    }
}

//Helper function to set Attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//  Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    imageLoad = 0;
    totalImages = photosArray.length;
    // console.log('total images: ', totalImages);
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        
        //put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad) {
            updateApiUrlWithNewCount(20);
            isInitialLoad = false;
        }
    } catch (error) {
        console.log('Error: ', error)
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


//on load
getPhotos()