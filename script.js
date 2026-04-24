let allTasks = [];

function addTask() {

    const name = document.getElementById("taskName").value;
    const date = document.getElementById("taskDate").value;
    const day = document.getElementById("day").value;

    const startHourVal = document.getElementById("startHour").value;
    const startMinuteVal = document.getElementById("startMinute").value;
    const startAMPMVal = document.getElementById("startAMPM").value;

    const endHourVal = document.getElementById("endHour").value;
    const endMinuteVal = document.getElementById("endMinute").value;
    const endAMPMVal = document.getElementById("endAMPM").value;

    if (!name || !date) {
        alert("Fill all fields");
        return;
    }

    const start24 = convertTo24(startHourVal, startMinuteVal, startAMPMVal);
    const end24 = convertTo24(endHourVal, endMinuteVal, endAMPMVal);

    // ✅ FIXED DATE + TIME HANDLING
    const [startH, startM] = start24.split(":");
    const [endH, endM] = end24.split(":");

    const startDateTime = new Date(date);
    startDateTime.setHours(startH, startM, 0);

    const endDateTime = new Date(date);
    endDateTime.setHours(endH, endM, 0);

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
        <div><strong>${name}</strong></div>
        <div>${startHourVal}:${startMinuteVal} ${startAMPMVal} - ${endHourVal}:${endMinuteVal} ${endAMPMVal}</div>
        <button class="delete-btn">Delete</button>
    `;

    taskDiv.querySelector(".delete-btn").onclick = function() {
        taskDiv.remove();
        allTasks = allTasks.filter(t => t.div !== taskDiv);
    };

    document.getElementById(day).appendChild(taskDiv);

    allTasks.push({
        div: taskDiv,
        start: startDateTime,
        end: endDateTime
    });

    updateColors();
}

function convertTo24(hour, minute, ampm) {
    hour = parseInt(hour);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return hour.toString().padStart(2, "0") + ":" + minute;
}

function updateColors() {
    const now = new Date();

    allTasks.forEach(task => {
        task.div.classList.remove("in-progress", "completed");

        // ✅ CORRECT REAL-TIME COMPARISON
        if (now.getTime() >= task.end.getTime()) {
            // 🟢 Completed
            task.div.classList.add("in-progress");
        } else {
            // 🔴 Not completed
            task.div.classList.add("completed");
        }
    });
}

setInterval(updateColors, 60000);

function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();
