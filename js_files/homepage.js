document.addEventListener('DOMContentLoaded', function() {
    // Set today's date
    const dateElement = document.getElementById('date');
    if (dateElement) {
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        dateElement.textContent = today;
    }

    // Add note functionality
    document.getElementById('add_goal').addEventListener('click', function() {
        const goalList = document.getElementById('goals_list');
        const newGoal = document.createElement('li');
        newGoal.innerHTML = `
            <input type="checkbox" class="goal_checkbox">
            <input type="text" class="goal_input" placeholder="add goal">
        `;
        goalList.appendChild(newGoal);
        newGoal.querySelector('.goal_input').focus(); // auto-focus new input
    });

});


// graph area

// emoji scale
// emoji mapping for hover effects
const emojiMap = {
    0: { emoji: '😭', label: 'miserable' },
    2: { emoji: '😢', label: 'sad' },
    4: { emoji: '😐', label: 'neutral' },
    6: { emoji: '🙂', label: 'okay' },
    8: { emoji: '😊', label: 'happy' },
    10: { emoji: '😁', label: 'excited' },
    12: { emoji: '🤩', label: 'ecstatic' }
};

// Canvas setup from html
const ctx = document.getElementById('lineGraph').getContext('2d');

// custom tooltip div for y-axis emojis
const yAxisTooltip = document.createElement('div'); // Create a new div for the tooltip
yAxisTooltip.style.display = 'none';
yAxisTooltip.style.position = 'absolute';
yAxisTooltip.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
yAxisTooltip.style.color = 'gold';
yAxisTooltip.style.padding = '5px';
yAxisTooltip.style.borderRadius = '5px';
yAxisTooltip.style.pointerEvents = 'none'; // Prevent mouse events
yAxisTooltip.style.zIndex = '1000'; // Ensure it appears above other elements
yAxisTooltip.style.fontamily = "'Sour Gummy'";
yAxisTooltip.style.fontSize = '16px';
document.body.appendChild(yAxisTooltip); // Append to body

// chart to plot happines to time setup
const lineGraph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
        datasets: [{
            label: "A Scroll of Today's Cheer",
            data: [], 
            backgroundColor: 'gold',
            borderColor: 'rgba(210, 180, 140, 1)',
            pointBackgroundColor: 'gold',
            fill: false, // No fill under the line
            pointRadius: 5, // Default size
            pointHoverRadius: 7, // Increase size on hover
            tension: 0.4, // Smooth line
            pointStyle: 'circle' // Circle shape for points
        }]
    },
    options: {
        responsive: true, // Make the chart responsive
        scales: {
            // Customizing the x-axis
            x: {
                title: {
                    display: true, // Show title on x-axis
                    text: 'The Turning of the Hourglass',
                    font: { family: "'Barriecito'", size: 14},
                    color: 'teal'
                },
                grid: { color: 'rgba(210, 180, 140, 0.5)' } // Custom grid-lines color
            },
            // Customizing the y-axis - vertical axis of the chart
            y: {
                beginAtZero: true, 
                max: 12,
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return emojiMap[value]?.emoji || ''; // Shows emoji on Y-axis
                    },
                    font: { size: 20 }
                },
                title: {
                    display: true,
                    text: 'The Joyous Quotient',
                    font: { family: "'Barriecito'", size: 14, weight: 'bold' },
                    color: 'teal'
                },
                grid: { color: 'rgba(210, 180, 140, 0.5)' }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: { family: "'Barriecito'", size: 14, weight: 'bold' },
                    color: 'rgba(255, 215, 0, 1)'
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        const yValue = context.parsed.y; // gets the y-value
                        const emojiJoy = emojiMap[yValue]; // gets the corresponding emoji
                        return emojiJoy 
                            ? `${yValue}: ${emojiJoy.label} ${emojiJoy.emoji}` // shows the emoji and label
                            : `${yValue}: Mood Unknown 🤷‍♂️`; // default message if no emoji found
                    }
                }
            }
        },
        onHover: (event, chartElement) => {
            if (event.native) { // check if the event is native
                ctx.canvas.style.cursor = chartElement[0] ? 'pointer' : 'default'; //
            }
        }
    }
});


// Add event listener to handle hover on y-axis emojis (ticks)
ctx.canvas.addEventListener('mousemove', function(event) { // gets the position of the mouse
    const psnRect = ctx.canvas.getBoundingClientRect(); // gets the position of the canvas
    const mouseX = event.clientX - psnRect.left; // gets the x-coordinate of the mouse
    const mouseY = event.clientY - psnRect.top; // gets the y-coordinate of the mouse

    // check if the mouse is over the y-axis
    const yAxisWidth = ctx.canvas.width * 0.1; // width of the y-axis

    if (mouseX <= yAxisWidth) { // if the mouse is over the y-axis
        // gets the chart area
        const chartArea = lineGraph.chartArea;

        // check if coursor within the cahrt's vertical range
        if (mouseY >= chartArea.top && mouseY <= chartArea.bottom) {
            //convert mouse Y position to chart value
            const yScale = lineGraph.scales.y; // gets the y-axis scale
            const valueIndex = Math.round(yScale.getValueForPixel(mouseY) / 2) * 2; // round to nearest tick value ~ 2

            // check if the value is in the emoji map
            if (emojiMap[valueIndex]) {
                const emoji = emojiMap[valueIndex]; // gets the emoji

                // shows the tooltip describing the emoji
                yAxisTooltip.textContent = `${emoji.label} (${valueIndex})`; //
                yAxisTooltip.style.display = 'block'; // show the tooltip
                yAxisTooltip.style.left = (event.clientX + 10) + 'px'; // position the tooltip
                yAxisTooltip.style.top = (event.clientY - 30) + 'px'; // position the tooltip

                ctx.canvas.style.cursor = 'pointer'; // change cursor to pointer

                return; // exit the function
            }
        }
    }

    //hide the tooltip if not hovering over emoji
    if (!lineGraph.getElementdAtEventForMode(event, 'nearest', { intersect: true}, false).length) { // if not hovering over a point
        yAxisTooltip.style.display = 'none'; // hide the tooltip
        ctx.canvas.style.cursor = 'default'; // change cursor to default
    }
});

// hide the tooltip when mouse leaves canvas
ctx.canvas.addEventListener('mouseleave', function() {
    yAxisTooltip.style.display = 'none'; // hide the tooltip
});
