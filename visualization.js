// Load the data
d3.csv("us-states.csv").then(data => {
    // Parse the data
    data.forEach(d => {
        d.date = new Date(d.date);
        d.cases = +d.cases;
        d.deaths = +d.deaths;
    });

    // Set up scenes
    let scenes = [
        introScene,
        scene1,
        scene2,
        scene3,
        explorationScene
    ];

    // Initialize the narrative
    let currentScene = 0;
    scenes[currentScene]();

    function nextScene() {
        currentScene++;
        if (currentScene < scenes.length) {
            d3.select("#container").html("");
            scenes[currentScene]();
        }
    }

    // Introduction Scene
    function introScene() {
        d3.select("#container").append("h1").text("Overview of COVID-19 Pandemic");
        d3.select("#container").append("p").text("This visualization shows the progression of the COVID-19 pandemic from 2020 to 2022...");
        d3.select("#container").append("button").text("Next").on("click", nextScene);
    }

    // Scene 1: Initial Outbreak in 2020
    function scene1() {
        d3.select("#container").append("h1").text("Initial Outbreak in 2020");
        // Add visualization code for scene 1
        d3.select("#container").append("button").text("Next").on("click", nextScene);
    }

    // Scene 2: Peak and Decline in 2021
    function scene2() {
        d3.select("#container").append("h1").text("Peak and Decline in 2021");
        // Add visualization code for scene 2
        d3.select("#container").append("button").text("Next").on("click", nextScene);
    }

    // Scene 3: Variants and Continued Impact in 2022
    function scene3() {
        d3.select("#container").append("h1").text("Variants and Continued Impact in 2022");
        // Add visualization code for scene 3
        d3.select("#container").append("button").text("Next").on("click", nextScene);
    }

    // Exploration Scene: Interactive Data Exploration
    function explorationScene() {
        d3.select("#container").append("h1").text("Explore the Data");
        // Add interactive visualization code for exploration
    }
});
