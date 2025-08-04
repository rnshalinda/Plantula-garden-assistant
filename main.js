// Get Growing Guide button action
let promts = {}

document.getElementById('btn-gotoGuide').addEventListener('click', () => {
        // function btnGotoGuideAction(){

        let plantName = document.getElementById("plantName").value;
        let location = document.getElementById("location").value;
        let climate = document.getElementById("climate").value;
        let temp = document.getElementById("temp").value;
        let sunlightHours = document.getElementById("sunlightHours").value;
        let water = document.getElementById("water").value;
        let soil = document.getElementById("soil").value;
        let container = document.getElementById("container").value;
        let nutrients = document.getElementById("nutrients").value;
        let outcome = document.getElementById("outcome").value;
        let experience = document.getElementById("experience").value;
        let additionalNote = document.getElementById("additional-note").value;

        let formatString = `
            You are writing a section to be embedded inside a webpage.
            Only return clean HTML content with basic tags like <h1>, <h2>, <p>, <ul>, <li>, <strong>, and <em>, accoording to the given instruction above if there are.
            Do NOT include <html>, <head>, <body>, or <!DOCTYPE html>.
            Seperate content from its heading by adding visual space.
            Keep everything short, clear, and user-friendly.
        `;

        // Promts for each section
        promts = {
                overviewPrompt: `
                Give a short introduction to growing ${plantName}. Include benefits, difficulty level, and whether it's good for ${experience} gardeners.
                ${formatString}
                `,

                conditionsPrompt: `
                Explain the best growing conditions for ${plantName}. The user plans to grow it in a ${location} with a ${climate} climate and average temperature around ${temp}°C.
                Include:
                - Preferred sunlight (the user reports ${sunlightHours} hours)
                - Soil type (${soil})
                - Container or ground type (${container})
                ${formatString}
                `,

                wateringPrompt: `
                Give watering instructions for ${plantName} grown in ${location} where sunlight is about ${sunlightHours} hours daily.
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
                List most common issues only, faced when growing ${plantName} in ${location}. Include things like pests, leaf color changes, diseases, etc.

                For each issue, provide how to identify and fix it. Use <h4> per issue, <ul> for signs, and <strong> for remedies.
                ${formatString}
                `,

                tipsPrompt: `
                Give bonus tips or hacks for growing ${plantName}, especially for ${experience} gardeners. Include mistakes to avoid, ideal companion plants, or weather precautions.

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
        //console.log(promts.tipsPrompt); // debug line

        sessionStorage.setItem('sharedData', JSON.stringify(promts));   // store the data in sessionStorage 

        window.location.href = 'src/guide.html';    // launch the guide page src/guide.html

});



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
                box2_swiper.on('click',() => {
                        index = box2_swiper.clickedIndex;
                        if (index !== undefined) {      
                                box1_swiper.slideToLoop(index);
                        }
                });   
        });
});


