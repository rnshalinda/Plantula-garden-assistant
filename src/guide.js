// get the promts object from sessionStorage
// promts = {overviewPrompt, conditionsPrompt, wateringPrompt, soilPrompt, outcomePrompt, issuesPrompt, tipsPrompt}
let storedPromt = sessionStorage.getItem('sharedData');
let promts = storedPromt ? JSON.parse(storedPromt) : null;

// Gemini API
// const API_KEY = "AIzaSyDX22c_1zhgspxYlK2GewqZ-cMPyLbrXlg";

// async function callAPI(promptText) {
//     const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 contents: [{ parts: [{ text: promptText }] }],
//             }),
//         }
//     );

//     const data = await res.json();
//     //console.log(data.candidates?.[0]?.content?.parts?.[0]?.text || "No response");
//     return cleanAIResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || "No response");
// }




// OpenRouter API
const API_KEY = "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";

async function callAPI(promptText) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "google/gemma-3n-e4b-it:free", // or "mistralai/mistral-7b-instruct"
            messages: [
                {
                    role: "user",
                    content: promptText
                }
            ]
        })
    });

    const data = await res.json();
    console.log("OpenRouter response:", data);
    return cleanAIResponse(data.choices?.[0]?.message?.content || "No response");   // clean the response (unwanted charactors) and return
}



// Trim out unwated charaters from AI response
function cleanAIResponse(str) {
    return str.replace(/```html\n?/g, "").replace(/```$/g, "").trim();  
}


//////////////////////////////////////////////////////////////////////////////////////////////////////

// Start promt call

// this works but sends all fetch calls at once hitiing API limitations

// if (promts) {
//     Object.keys(promts).forEach(async key => {
//         //console.log(key, promts[key]) // key, value
//         document.getElementById(`${key}`).innerHTML = await callAPI(promts[key])
//     });

// }


// As fix for Limit treshold added a delay and sequatial calling
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// with delay and sequential
async function renderSections(promts) {
    for (const key of Object.keys(promts)) {
        
        document.getElementById(`${key}`).innerHTML = await callAPI(promts[key]);

        await sleep(1000);
    }
}


// activate promt call to LLM
if (promts) {
    //renderSections(promts);
}


document.addEventListener('DOMContentLoaded', () => {
    // if(sessionStorage.getItem('plantType') == "Healthy, fast-growing plants with good yield"){
    //     getPlantImage(sessionStorage.getItem('plantName'), "plant");
    // }
    // else{
    //     getPlantImage(sessionStorage.getItem('plantName'),sessionStorage.getItem('plantType'));
    // }
    document.querySelector('.plantImage').innerHTML = `<img src="https://t1.pixers.pics/img-1fb6f67c/wall-murals-set-fruits-and-vegies.jpg?H4sIAAAAAAAAA3WOW2oDMQxFt2PDZORn7JkF5DdLCMaPdJp5GNttQlZfmdLPIsSVBFfnwtdeXYrg495igW0JYY2QlhW3OpdYl3ckbDBM0RmvK2GM0fn4jsWXI5OTtUNvM4nedH46NG6uPMhHa7nOAFWOeXnhNxRfwW8VBOMG2Bn0pJVTIlkfJnNrLsfmTo-nC8W1Me_3gfWifzEUY4Pq-FaWjWCeA0mNfOY7hX9ovzOgCy5X0BKsAMNhMv10u1y1tMJwhHuppODBRKHFWaJaw5OQMnlpgpvSiJQfRctl9ywBAAA=" style="border-radius: 15px; width:360px; height:280px;" alt="">`;
});


// pixabay API - plant images
const pixabayAPI = "";

function getPlantImage(plantName, type){
    console.log(type);
    
    fetch(`https://pixabay.com/api/?key=${pixabayAPI}&q=${plantName}+${type}&image_type=photo&pretty=true`).
    then(res => res.json()).
    then(data => {
        // console.log(data);
        let imgTag = document.querySelector('.plantImage');
        imgTag.innerHTML = `<img src="${data.hits[0].webformatURL}" style="border-radius: 15px; width:75%; height:65%" alt="">`;
        
    });
}






// section scroll background change
// let backgrounds = [
//     "url('/assets/images/bg/overview-bg1.jpg')",
//     "url('/assets/images/bg/overview-bg2.jpg')",
//     "url('/assets/images/bg/overview-bg3.jpg')",
//     "url('/assets/images/bg/overview-bg4.jpg')",
//     "url('/assets/images/bg/overview-bg5.jpg')",
//     "url('/assets/images/bg/overview-bg6.jpg')",
//     "url('/assets/images/bg/overview-bg7.jpg')",
// ];

// const sections = document.querySelectorAll("section");
// let scrollSections = document.querySelector('.scroll-container');

// scrollSections.addEventListener('scroll', (event) => {
//     console.log('Window scrolled!');
//     console.log(scrollSections.scrollTop);
//     let scrollAmount_fromTop = scrollSections.scrollTop;    // out a certain distance number from top of the page 
//     let index;
//     if(scrollAmount_fromTop == 0){
//         index = 0;
//     }
//     if(scrollAmount_fromTop > 0){
//         index = 1;
//     }
//     if(scrollAmount_fromTop > 759){
//         index = 2;
//     }
//     if(scrollAmount_fromTop > 1517){
//         index = 3;
//     }
//     if(scrollAmount_fromTop > 2275){
//         index = 4;
//     }
//     if(scrollAmount_fromTop > 3033){
//         index = 5;
//     }
//     if(scrollAmount_fromTop == 4466){
//         index = 6;
//     }

//     document.body.style.setProperty("--bg-image", backgrounds[index]);
// });


let backgrounds = [
    "url('/assets/images/bg/overview-bg1.webp')",
    "url('/assets/images/bg/overview-bg2.webp')",
    "url('/assets/images/bg/overview-bg3.webp')",
    "url('/assets/images/bg/overview-bg4.webp')",
    "url('/assets/images/bg/overview-bg5.webp')",
    "url('/assets/images/bg/overview-bg6.webp')",
    "url('/assets/images/bg/overview-bg7.webp')",
];

const sections = document.querySelectorAll(".scroll-container section");
const scrollContainer = document.querySelector('.scroll-container');

scrollContainer.addEventListener('scroll', () => {
    let sectionHeight = sections[5].offsetHeight;       // height of one section, each 834px section according to my display size
    // console.log(sectionHeight);
    
    let scrollPos = scrollContainer.scrollTop;          // how far scrolled from top, when in section2 => 834*2 = 1668px
    // console.log(scrollPos);

    let index = Math.floor(scrollPos / sectionHeight);  // devide total stcrolled amount by section size => get section index

    // Safety: clamp index to last section
    if (index >= backgrounds.length) index = backgrounds.length - 1;
    console.log(index);
    
    // Change the CSS variable
    document.body.style.setProperty("--bg-image", backgrounds[index]);
});