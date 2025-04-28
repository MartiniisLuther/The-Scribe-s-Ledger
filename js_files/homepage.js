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
    0: { emoji: '😭', label: 'Miserable' },
    2: { emoji: '😢', label: 'Sad' },
    4: { emoji: '😐', label: 'Neutral' },
    6: { emoji: '🙂', label: 'Okay' },
    8: { emoji: '😊', label: 'Happy' },
    10: { emoji: '😁', label: 'Excited' },
    12: { emoji: '🤩', label: 'Ecstatic' }
};

const ctx = document.getElementById('lineGraph').getContext('2d'); // Replace with your canvas ID

const lineGraph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
        datasets: [{
            label: "A Scroll of Today's Cheer",
            data: [], // Populate with your Y-axis values (e.g., [2, 4, 6, 8, 10, 8, 6, 4, 2])
            backgroundColor: 'gold',
            borderColor: 'rgba(210, 180, 140, 1)',
            pointBackgroundColor: 'gold',
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
            pointStyle: 'circle'
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'The Turning of the Hourglass',
                    font: { family: "'Barriecito'", size: 14, weight: 'bold' },
                    color: 'teal'
                },
                grid: { color: 'rgba(210, 180, 140, 0.5)' }
            },
            y: {
                beginAtZero: true,
                max: 12,
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return emojiMap[value]?.emoji || ''; // Show emoji on Y-axis
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
                        const yValue = context.parsed.y;
                        const emojiJoy = emojiMap[yValue];
                        return emojiJoy 
                            ? `${yValue}: ${emojiJoy.label} ${emojiJoy.emoji}` 
                            : `${yValue}: Mood Unknown 🤷‍♂️`;
                    }
                }
            }
        },
        onHover: (event, chartElement) => {
            if (event.native) {
                ctx.canvas.style.cursor = chartElement[0] ? 'pointer' : 'default';
            }
        }
    }
});
