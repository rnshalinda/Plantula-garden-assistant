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
    document.querySelector('.plantImage').innerHTML = `<img src="https://pixabay.com/get/gecfae0542494915be00d7ea070790b5ef7ce4fb7ecf4264bae37d08f8807337348ab9a646c89b9abe342848186021636_640.jpg" style="border-radius: 15px; width:360px; height:280px;" alt="">`;
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

