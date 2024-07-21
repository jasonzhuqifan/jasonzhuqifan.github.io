d3.csv("us-states.csv").then(data => {
    data.forEach(d => {
        d.date = new Date(d.date);
        d.cases = +d.cases;
        d.deaths = +d.deaths;
    });

    let scenes = [
        introScene,
        scene1,
        scene2,
        scene3,
        explorationScene
    ];

    let currentScene = 0;
    scenes[currentScene]();

    function nextScene() {
        currentScene++;
        if (currentScene < scenes.length) {
            d3.select("#container").html("");
            scenes[currentScene]();
        }
    }

    function introScene() {
        d3.select("#container").append("h1").text("Overview of COVID-19 Pandemic");
        d3.select("#container").append("p").text("This visualization shows the progression of the COVID-19 pandemic from 2020 to 2022...");
        d3.select("#container").append("button").text("Next").on("click", nextScene);
    }

    function scene1() {
        d3.select("#container").html("");
        d3.select("#container").append("h1").text("Initial Outbreak in 2020");
        d3.select("#container").append("p").text("The initial outbreak of COVID-19 in 2020 and its impact on key states.");

        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const parseDate = d3.timeParse("%Y-%m-%d");
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        d3.csv("us-states.csv").then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.cases = +d.cases;
                d.deaths = +d.deaths;
            });

            const keyStates = ["California", "Florida"];
            const filteredData = data.filter(d => keyStates.includes(d.state) && d.date.getFullYear() === 2020);

            x.domain(d3.extent(filteredData, d => d.date));
            y.domain([0, d3.max(filteredData, d => d.cases)]);

            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.cases));

            svg.selectAll(".line")
                .data(d3.group(filteredData, d => d.state))
                .enter().append("path")
                .attr("class", "line")
                .attr("d", d => line(d[1]))
                .style("stroke", (d, i) => d3.schemeCategory10[i])
                .style("fill", "none");

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("~s")));

            const annotations = [
                { date: "2020-01-22", cases: 1, label: "First reported case", title: "January 2020" },
                { date: "2020-03-20", cases: 1000, label: "Lockdown starts", title: "March 2020" }
            ];

            annotations.forEach((annotation, index) => {
                const xPos = x(parseDate(annotation.date));
                const yPos = y(annotation.cases);
                const offset = (index === 0) ? 100 : 200;

                svg.append("line")
                    .attr("class", "annotation-line")
                    .attr("x1", xPos)
                    .attr("y1", yPos)
                    .attr("x2", xPos + offset)
                    .attr("y2", yPos - 50);

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

    function scene2() {
        d3.select("#container").html("");
        d3.select("#container").append("h1").text("COVID-19 Trends in 2021");
        d3.select("#container").append("p").text("Key events and trends in the COVID-19 pandemic during 2021.");

        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const parseDate = d3.timeParse("%Y-%m-%d");
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        d3.csv("us-states.csv").then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.cases = +d.cases;
                d.deaths = +d.deaths;
            });

            const keyStates = ["California", "Florida"];
            const filteredData = data.filter(d => keyStates.includes(d.state) && d.date.getFullYear() === 2021);

            x.domain(d3.extent(filteredData, d => d.date));
            y.domain([0, d3.max(filteredData, d => d.cases)]);

            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.cases));

            svg.selectAll(".line")
                .data(d3.group(filteredData, d => d.state))
                .enter().append("path")
                .attr("class", "line")
                .attr("d", d => line(d[1]))
                .style("stroke", (d, i) => d3.schemeCategory10[i])
                .style("fill", "none");

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("~s")));

            const annotations = [
                { date: "2021-01-01", cases: 1380000, label: "New Year surge", title: "January 2021" },
                { date: "2021-09-01", cases: 3300000, label: "Delta variant surge", title: "September 2021" }
            ];

            annotations.forEach((annotation, index) => {
                const xPos = x(parseDate(annotation.date));
                const yPos = y(annotation.cases);
                const offset = (index === 0) ? 100 : 100;

                svg.append("line")
                    .attr("class", "annotation-line")
                    .attr("x1", xPos)
                    .attr("y1", yPos)
                    .attr("x2", xPos + offset)
                    .attr("y2", yPos - 50);

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

    function scene3() {
        d3.select("#container").html("");
        d3.select("#container").append("h1").text("Continued Impact in 2022");
        d3.select("#container").append("p").text("Key events and trends in the COVID-19 pandemic during 2022.");

        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const parseDate = d3.timeParse("%Y-%m-%d");
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        d3.csv("us-states.csv").then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.cases = +d.cases;
                d.deaths = +d.deaths;
            });

            const keyStates = ["California", "Florida"];
            const filteredData = data.filter(d => keyStates.includes(d.state) && d.date.getFullYear() === 2022);

            x.domain(d3.extent(filteredData, d => d.date));
            y.domain([0, d3.max(filteredData, d => d.cases)]);

            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.cases));

            svg.selectAll(".line")
                .data(d3.group(filteredData, d => d.state))
                .enter().append("path")
                .attr("class", "line")
                .attr("d", d => line(d[1]))
                .style("stroke", (d, i) => d3.schemeCategory10[i])
                .style("fill", "none");

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("~s")));

            const annotations = [
                { date: "2022-01-01", cases: 2000000, label: "Omicron variant surge", title: "January 2022" },
                { date: "2022-07-01", cases: 6000000, label: "Summer wave", title: "July 2022" }
            ];

            annotations.forEach((annotation, index) => {
                const xPos = x(parseDate(annotation.date));
                const yPos = y(annotation.cases);
                const offset = (index === 0) ? 100 : 100;

                svg.append("line")
                    .attr("class", "annotation-line")
                    .attr("x1", xPos)
                    .attr("y1", yPos)
                    .attr("x2", xPos + offset)
                    .attr("y2", yPos - 50);

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

    function explorationScene() {
        d3.select("#container").html("");
        d3.select("#container").append("h1").text("Explore the Data");
        d3.select("#container").append("p").text("Explore COVID-19 data interactively.");

        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const parseDate = d3.timeParse("%Y-%m-%d");
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        d3.csv("us-states.csv").then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.cases = +d.cases;
                d.deaths = +d.deaths;
            });

            const states = Array.from(new Set(data.map(d => d.state)));
            const select = d3.select("#container").append("select");
            select.selectAll("option")
                .data(states)
                .enter().append("option")
                .text(d => d);

            select.on("change", function() {
                const selectedState = d3.select(this).property("value");
                const filteredData = data.filter(d => d.state === selectedState);

                x.domain(d3.extent(filteredData, d => d.date));
                y.domain([0, d3.max(filteredData, d => d.cases)]);

                svg.selectAll(".line").remove();

                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.cases));

                svg.append("path")
                    .datum(filteredData)
                    .attr("class", "line")
                    .attr("d", line)
                    .style("stroke", "steelblue")
                    .style("fill", "none");

                svg.selectAll(".x-axis").remove();
                svg.selectAll(".y-axis").remove();

                svg.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", `translate(0,${height})`)
                    .call(d3.axisBottom(x));

                svg.append("g")
                    .attr("class", "y-axis")
                    .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("~s")));
            });
        });

        d3.select("#container").append("button").text("Restart").on("click", () => {
            currentScene = 0;
            d3.select("#container").html("");
            scenes[currentScene]();
        });
    }
});
