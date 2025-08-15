// Get Growing Guide button action
let promts = {}

// used for image serach API call, plant overview section in guid page
let plantName;
let outcome;

let formatString = `
        You are writing a section to be embedded inside a webpage.
        Only return clean HTML content with basic tags like <h2>, <p>, <ul>, <li>, <strong>, and <em>, according to the given instruction above.
        Do NOT include <html>, <head>, <body>, or <!DOCTYPE html>.
        Keep everything concise so the total visible text fits within about 15-20 lines on a laptop screen.
        Limit lists of bullet points to 5 max.
        Avoid unnecessary explanations — focus on the most essential and practical information.
        If there is a heading (<h1>), separate it visually from the rest of the content with a blank line.
`;


// collect promt data from form
document.getElementById('btn-gotoGuide').addEventListener('click', () => {
        // by putting these here, update new data every btn click
        plantName = document.getElementById("plantName").value;
        let environment = document.getElementById("environment").value;
        let climate = document.getElementById("climate").value;
        let temp = document.getElementById("temp").value;
        let sunlightHours = document.getElementById("sunlightHours").value;
        let water = document.getElementById("water").value;
        let soil = document.getElementById("soil").value;
        let container = document.getElementById("container").value;
        let nutrients = document.getElementById("nutrients").value;
        outcome = document.getElementById("outcome").value;
        let experience = document.getElementById("experience").value;
        let additionalNote = document.getElementById("additional-note").value;

        // Promts for each section
        promts = {
                overviewPrompt: `
                Give a short introduction to growing ${plantName}. Include benefits, difficulty level, and whether it's good for ${experience} gardeners.
                ${formatString}
                `,

                conditionsPrompt: `
                Explain the best growing conditions for ${plantName}. The user plans to grow it in a ${environment} with a ${climate} climate and average temperature around ${temp}°C.
                Include:
                - Preferred sunlight (the user reports ${sunlightHours} hours)
                - Soil type (${soil})
                - Placement type on (${container})
                ${formatString}
                `,

                wateringPrompt: `
                Give watering instructions for ${plantName} grown in ${environment} where sunlight is about ${sunlightHours} hours daily.
                The user plans to water: ${water}.

                Explain how to water correctly, how to check soil moisture, and signs of overwatering.
                ${formatString}
                `,

                soilPrompt: `
                The user will use ${soil} soil and plans to apply ${nutrients} as nutrients.

                Provide soil preparation tips for growing ${plantName}. Include guidance on how to enrich soil and when to add fertilizer or compost. if the user had specified that he doesn't use any compost or fertilizer give him guidance what to do instead.
                Use <ul> and <strong> to highlight key tips.
                ${formatString}
                `,

                outcomePrompt: `
                The user wants the outcome to be: ${outcome}.
                Explain what to expect when growing ${plantName}. Include when the plant reaches maturity, flower/fruit/or Vegitables timelines, and what success looks like.
                Use clear formatting with headings and bullet points.
                ${formatString}
                `,

                issuesPrompt: `
                List most common issues only, faced when growing ${plantName} in ${environment}. Include things like pests, leaf color changes, diseases, etc.

                For each issue, provide how to identify and fix it. Use <h4> per issue, <ul> for signs, and <strong> for remedies.
                ${formatString}
                `,

                tipsPrompt: `
                Give bonus tips or hacks for growing ${plantName}, especially for ${experience} experience gardeners. Include mistakes to avoid, ideal companion plants, or weather precautions.

                Make it fun and helpful. Format as a list (<ul>), with emojis if suitable.
                ${formatString}
                `,
        }

        // if user gave additional note add it to all promts
        if (additionalNote) {
                // console.log("text"); // debug line

                for (let key in promts) {
                        promts[key] += `\n\nThe user added this note: "${additionalNote}". Please take this into consideration.`;
                };
        }
        savePromts();
});


// open link page (src/guide.html) and store promt data in sessionStorage
function savePromts(){
        sessionStorage.setItem('sharedData', JSON.stringify(promts));   // store promt data in sessionStorage 

        sessionStorage.setItem('plantName', plantName);     // Store plant name separately

        sessionStorage.setItem('plantType', outcome); 

        window.location.href = 'src/guide.html';    // launch page
}



// Jump to specific slider functionality by linking both box1 & box2 swiper


// window.addEventListener('DOMContentLoaded', () => {                                     // This ensures your code runs only after the full HTML DOM has been loaded (not images, etc.)
//         customElements.whenDefined('swiper-container').then(() => {                     // Waits for the Swiper Web Component (<swiper-container> js) to be fully initialized by the browser.
//                 let box1_swiper = document.querySelector('.box1_swiper').swiper;        // with querrySelector, can access anything unlike getElimentbyId
//                 let box2_swiper = document.querySelector('.box2_swiper').swiper;

//                 Promise.all([box1_swiper.ready, box2_swiper.ready]).then(() => {        // Even after .swiper is available, Swiper still does async setup (e.g., DOM calculations, CDN swiper-js).  Waits until both Swipers are fully ready.
//                         box2_swiper.on('click', () => {                                 // event listener for click events on the box2_swiper.
//                                 let clickedIndex = box2_swiper.clickedIndex;            // clickedIndex gives you the index of the clicked slide in the thumbnail Swiper, return undefined if no slide
//                                 if (clickedIndex !== undefined) {                       // ensures outside clicks within the swiper won't count. otherwise swiper jumps to the first index if clicked outside (return undefined)
//                                         box1_swiper.slideToLoop(clickedIndex);          // -: slideToLoop(index) → move slide to the correct slide even if looping is enabled.
//                                 }
//                         });
//                 });
//         });
// });


window.addEventListener('DOMContentLoaded', () => {

        let box1_swiper = document.querySelector('.box1_swiper').swiper;
        let box2_swiper = document.querySelector('.box2_swiper').swiper; 
        
        Promise.all([box1_swiper.ready, box2_swiper.ready]).then(() => {

                 // box2 slide click -> jump to correct slide in box1 
                box2_swiper.on('click',() => {
                        index = box2_swiper.clickedIndex;
                        if (index !== undefined) {  
                                //console.log(index);    
                                box1_swiper.slideToLoop(index);
                        }
                });   

                // box1 slide click -> get the plant name fromt the clicked slide (img.alt) and pass it to promt 
                box1_swiper.on('click', () => {
                        index = box1_swiper.clickedIndex;                               // get slide index
                        if(index !== undefined){
                                clickedSlide = box1_swiper.slides[index];               // get slide element <swiper-slide>
                                //console.log(clickedSlide.querySelector('img').alt);   // get image inside the slide <img  alt>
                                defaultPromts(clickedSlide.querySelector('img').alt);   // pass as function     
                        }
                })

        });
});



function defaultPromts(name){
        plantName = name;
        environment =  "Outdoor gardens";
        climate = "Warm, temperate climate";
        temp = "18–27";
        sunlightHours = "9";
        soil = "Loamy soil";
        container = "Raised beds"
        water = "few times a week"
        nutrients = "compost for long-term soil health, fertilizer for immediate boost"
        outcome = "Healthy, fast-growing plants with good yield"
        experience = "between beginner to intermediate"

        // Promts for each section
        promts = {
                overviewPrompt: `
                Give a short introduction to growing ${name}. Include benefits, difficulty level, and whether it's good for beginer gardeners.
                ${formatString}
                `,

                conditionsPrompt: ` Explain the best growing conditions for ${name}. The user plans to grow it in a ${environment} with a ${climate} climate and average temperature around ${temp}°C.
                Include:
                - Preferred sunlight (the user reports ${sunlightHours} hours)
                - Soil type (${soil})
                - Placement type on (${container})
                ${formatString}
                `,

                wateringPrompt: `
                Give watering instructions for ${name} grown in ${environment} where sunlight is about ${sunlightHours} hours daily.
                The user plans to water: ${water}.

                Explain how to water correctly, how to check soil moisture, and signs of overwatering.
                ${formatString}
                `,

                soilPrompt: `
                The user will use ${soil} soil and plans to apply ${nutrients} as nutrients.

                Provide soil preparation tips for growing ${name}. Include guidance on how to enrich soil and when to add fertilizer or compost. if the user had specified that he doesn't use any compost or fertilizer give him guidance what to do instead.
                Use <ul> and <strong> to highlight key tips.
                ${formatString}
                `,

                outcomePrompt: `
                The user wants the outcome to be: ${outcome}.
                Explain what to expect when growing ${name}. Include when the plant reaches maturity, flower/fruit/or Vegitables timelines, and what success looks like.
                Use clear formatting with headings and bullet points.
                ${formatString}
                `,

                issuesPrompt: `
                List most common issues only, faced when growing ${name} in ${environment}. Include things like pests, leaf color changes, diseases, etc.

                For each issue, provide how to identify and fix it. Use <h4> per issue, <ul> for signs, and <strong> for remedies.
                ${formatString}
                `,

                tipsPrompt: `
                Give bonus tips or hacks for growing ${name}, especially for ${experience} experienced gardeners. Include mistakes to avoid, ideal companion plants, or weather precautions.

                Make it fun and helpful. Format as a list (<ul>), with emojis if suitable.
                ${formatString}
                `,
        }

        savePromts();
}





// Animated cursor gif section
const images = document.querySelectorAll('.box1_swiper swiper-slide img');
const anim = document.getElementById('hoverAnim');

images.forEach((img) => {
        img.addEventListener('mousemove', (e) => {
                anim.style.display = 'block';
                anim.style.left = `${e.pageX - 65}px`; // center alignment by half the size of gif ( w h / 2 )
                anim.style.top = `${e.pageY - 65}px`;
        });

        img.addEventListener('mouseleave', () => {
                anim.style.display = 'none';
        });
});