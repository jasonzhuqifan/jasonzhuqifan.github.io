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
    // function scene1() {
    //     d3.select("#container").append("h1").text("Initial Outbreak in 2020");
    //     // Add visualization code for scene 1
    //     d3.select("#container").append("button").text("Next").on("click", nextScene);
    // }

    function scene1() {
        d3.select("#container").html(""); // Clear the container
        d3.select("#container").append("h1").text("Initial Outbreak in 2020");
        d3.select("#container").append("p").text("The initial outbreak of COVID-19 in 2020 and its impact on key states.");

        // Set up the SVG and dimensions
        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Parse the date and set up scales
        const parseDate = d3.timeParse("%Y-%m-%d");
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Load the data
        d3.csv("us-states.csv").then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.cases = +d.cases;
                d.deaths = +d.deaths;
            });

            // Filter data for key states and for the year 2020
            const keyStates = ["California", "Florida"];
            const filteredData = data.filter(d => keyStates.includes(d.state) && d.date.getFullYear() === 2020);

            // Set the domains of the scales
            x.domain(d3.extent(filteredData, d => d.date));
            y.domain([0, d3.max(filteredData, d => d.cases)]);

            // Create line generator
            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.cases));

            // Add the lines for each state
            svg.selectAll(".line")
                .data(d3.group(filteredData, d => d.state))
                .enter().append("path")
                .attr("class", "line")
                .attr("d", d => line(d[1]))
                .style("stroke", (d, i) => d3.schemeCategory10[i])
                .style("fill", "none");

            // Add the X Axis
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("~s")));

            // Manually add annotations
            const annotations = [
                { date: "2020-01-22", cases: 1, label: "First reported case", title: "January 2020" },
                { date: "2020-03-20", cases: 1000, label: "Lockdown starts", title: "March 2020" }
            ];

            annotations.forEach((annotation, index) => {
                const xPos = x(parseDate(annotation.date));
                const yPos = y(annotation.cases);

                // Adjust positions to avoid overlapping and crossing the y-axis
                const offset = (index === 0) ? 100 : 200; // Adjust offset for non-overlapping

                // Add annotation lines
                svg.append("line")
                    .attr("class", "annotation-line")
                    .attr("x1", xPos)
                    .attr("y1", yPos)
                    .attr("x2", xPos + offset)
                    .attr("y2", yPos - 50);

                // Add annotation text
                svg.append("text")
                    .attr("class", "annotation")
                    .attr("x", xPos + offset + 5)
                    .attr("y", yPos - 55)
                    .text(annotation.title);

                svg.append("text")
                    .attr("class", "annotation")
                    .attr("x", xPos + offset + 5)
                    .attr("y", yPos - 40)
                    .text(annotation.label);
            });

            // Add a legend
            const legend = svg.selectAll(".legend")
                .data(keyStates)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => `translate(0,${i * 20})`);

            legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", (d, i) => d3.schemeCategory10[i]);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(d => d);
    });

    d3.select("#container").append("button").text("Next").on("click", nextScene);
}




    // Scene 2: Peak and Decline in 2021
    function scene2() {
        d3.select("#container").html(""); // Clear the container
        d3.select("#container").append("h1").text("COVID-19 Trends in 2021");
        d3.select("#container").append("p").text("Key events and trends in the COVID-19 pandemic during 2021.");

        // Set up the SVG and dimensions
        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Parse the date and set up scales
        const parseDate = d3.timeParse("%Y-%m-%d");
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Load the data
        d3.csv("us-states.csv").then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.cases = +d.cases;
                d.deaths = +d.deaths;
            });

            // Filter data for key states and for the year 2021
            const keyStates = ["California", "Florida"];
            const filteredData = data.filter(d => keyStates.includes(d.state) && d.date.getFullYear() === 2021);

            // Set the domains of the scales
            x.domain(d3.extent(filteredData, d => d.date));
            y.domain([0, d3.max(filteredData, d => d.cases)]);

            // Create line generator
            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.cases));

            // Add the lines for each state
            svg.selectAll(".line")
                .data(d3.group(filteredData, d => d.state))
                .enter().append("path")
                .attr("class", "line")
                .attr("d", d => line(d[1]))
                .style("stroke", (d, i) => d3.schemeCategory10[i])
                .style("fill", "none");

            // Add the X Axis
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("~s")));

            // Manually add annotations
            const annotations = [
                { date: "2021-01-01", cases: 1380000, label: "New Year surge", title: "January 2021" },
                { date: "2021-09-01", cases: 3300000, label: "Delta variant surge", title: "September 2021" }
            ];

            annotations.forEach((annotation, index) => {
                const xPos = x(parseDate(annotation.date));
                const yPos = y(annotation.cases);

                // Adjust positions to avoid overlapping and crossing the y-axis
                const offset = (index === 0) ? 100 : 100; // Adjust offset for non-overlapping

                // Add annotation lines
                svg.append("line")
                    .attr("class", "annotation-line")
                    .attr("x1", xPos)
                    .attr("y1", yPos)
                    .attr("x2", xPos + offset)
                    .attr("y2", yPos - 50);

                // Add annotation text
                svg.append("text")
                    .attr("class", "annotation")
                    .attr("x", xPos + offset + 5)
                    .attr("y", yPos - 55)
                    .text(annotation.title);

                svg.append("text")
                    .attr("class", "annotation")
                    .attr("x", xPos + offset + 5)
                    .attr("y", yPos - 40)
                    .text(annotation.label);
            });

            // Add a legend
            const legend = svg.selectAll(".legend")
                .data(keyStates)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => `translate(0,${i * 20})`);

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", (d, i) => d3.schemeCategory10[i]);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(d => d);
        });

        d3.select("#container").append("button").text("Next").on("click", nextScene);
    }



    // Scene 3: Variants and Continued Impact in 2022
    function scene3() {
        d3.select("#container").html(""); // Clear the container
        d3.select("#container").append("h1").text("COVID-19 Trends Overview (2020-2022)");
        d3.select("#container").append("p").text("An overview of COVID-19 cases and deaths across the entire period from 2020 to 2022.");

        // Set up the SVG and dimensions
        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Parse the date and set up scales
        const parseDate = d3.timeParse("%Y-%m-%d");
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Load the data
        d3.csv("us-states.csv").then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.cases = +d.cases;
                d.deaths = +d.deaths;
            });

            // Filter data for the entire period
            const keyStates = ["California", "New York", "Florida", "Texas"];
            const filteredData = data.filter(d => keyStates.includes(d.state));

            // Set the domains of the scales
            x.domain(d3.extent(filteredData, d => d.date));
            y.domain([0, d3.max(filteredData, d => d.cases)]);

            // Create line generator for cases
            const lineCases = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.cases));

            // Create line generator for deaths
            const lineDeaths = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.deaths));

            // Add the lines for cases and deaths
            svg.selectAll(".line-cases")
                .data(d3.group(filteredData, d => d.state))
                .enter().append("path")
                .attr("class", "line-cases")
                .attr("d", d => lineCases(d[1]))
                .style("stroke", (d, i) => d3.schemeCategory10[i])
                .style("fill", "none")
                .style("stroke-dasharray", "4 4");

            svg.selectAll(".line-deaths")
                .data(d3.group(filteredData, d => d.state))
                .enter().append("path")
                .attr("class", "line-deaths")
                .attr("d", d => lineDeaths(d[1]))
                .style("stroke", (d, i) => d3.schemeCategory10[i])
                .style("fill", "none")
                .style("stroke-dasharray", "2 2");

            // Add the X Axis
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("~s")));

            // Add a legend for cases and deaths
            const legend = svg.selectAll(".legend")
                .data(keyStates)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => `translate(0,${i * 40})`);

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", (d, i) => d3.schemeCategory10[i]);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(d => d);

            // Add annotations for key trends
            const annotations = [
                { date: "2020-03-20", cases: 200000, label: "Initial peak", title: "March 2020 Peak" },
                { date: "2021-01-01", cases: 400000, label: "Winter surge", title: "January 2021 Surge" },
                { date: "2022-07-01", cases: 100000, label: "Summer decline", title: "July 2022 Decline" }
            ];

            annotations.forEach((annotation, index) => {
                const xPos = x(parseDate(annotation.date));
                const yPos = y(annotation.cases);

                // Adjust positions to avoid overlapping and crossing the y-axis
                const offset = (index % 2 === 0) ? 100 : 200; // Alternate offset for non-overlapping

                // Add annotation lines
                svg.append("line")
                    .attr("class", "annotation-line")
                    .attr("x1", xPos)
                    .attr("y1", yPos)
                    .attr("x2", xPos + offset)
                    .attr("y2", yPos - 50);

                // Add annotation text
                svg.append("text")
                    .attr("class", "annotation")
                    .attr("x", xPos + offset + 5)
                    .attr("y", yPos - 55)
                    .text(annotation.title);

                svg.append("text")
                    .attr("class", "annotation")
                    .attr("x", xPos + offset + 5)
                    .attr("y", yPos - 40)
                    .text(annotation.label);
            });

            d3.select("#container").append("button").text("Finish").on("click", () => {
                alert("Thank you for viewing the COVID-19 trends overview!");
            });
        });
    }


    // Exploration Scene: Interactive Data Exploration
    function explorationScene() {
        d3.select("#container").append("h1").text("Explore the Data");
        // Add interactive visualization code for exploration
    }
});
