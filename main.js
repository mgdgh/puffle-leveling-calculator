let timeBetweenRuns = undefined;
let currentLevel = undefined;
let targetLevel = undefined;
let allStamps = false;
let orderedPetFood = false;
let doubleCoins = false;
let doubleXP = false;
let higherLvlPufflesAmount = undefined;

let userTimeAveragePerAttempt = document.getElementById("time-per-attempt");
userTimeAveragePerAttempt.addEventListener("change", (event) => {
    let selectedValue = Number(event.target.value);
    if (selectedValue === 6) { timeBetweenRuns = 90; }
    else if (selectedValue === 5) { timeBetweenRuns = 81; }
    else if (selectedValue === 4) { timeBetweenRuns = 72; }
    else { console.log("Not a valid option."); }
});

let userCurrentLevel = document.getElementById("current-level");
userCurrentLevel.addEventListener("change", (event) => { currentLevel = Number(event.target.value); });

let userTargetLevel = document.getElementById("target-level");
userTargetLevel.addEventListener("change", (event) => { targetLevel = Number(event.target.value); });

let userAllStamps = document.getElementById("have-all-stamps");
userAllStamps.addEventListener("change", (event) => { allStamps = event.target.checked; });

let userOrderedPetFood = document.getElementById("have-ordered-pet-food");
userOrderedPetFood.addEventListener("change", (event) => { orderedPetFood = event.target.checked; });

let userDoubleCoins = document.getElementById("double-coins");
userDoubleCoins.addEventListener("change", (event) => { doubleCoins = event.target.checked; });

let userDoubleXP = document.getElementById("double-xp");
userDoubleXP.addEventListener("change", (event) => { doubleXP = event.target.checked; });

let userAmountOfHighLvlPuffles = document.getElementById("high-level-puffles");
userAmountOfHighLvlPuffles.addEventListener("change", (event) => { higherLvlPufflesAmount = Number(event.target.value); });

let calculateTime = document.getElementById("submit");
calculateTime.addEventListener("click", () => {
    // 1. Guard clauses to prevent calculations with missing inputs
    if (currentLevel === undefined || targetLevel === undefined || timeBetweenRuns === undefined || higherLvlPufflesAmount === undefined) {
        alert("Please fill out all fields before calculating.");
        return;
    }

    // 2. XP Per Run Calculation
    let baseCoins = allStamps ? 3600 : 1800;
    let coinMultiplier = doubleCoins ? 2 : 1;
    let modifiedCoins = baseCoins * coinMultiplier;
    let puffleBonus = modifiedCoins * 0.1 * higherLvlPufflesAmount;
    
    let xpPerRun = Math.pow(modifiedCoins + puffleBonus, 0.75) * (orderedPetFood ? 1.2 : 1) * (doubleXP ? 2 : 1);

    // 3. Precise XP Needed Cumulative Calculation Loop
    let xpNeeded = (targetLevel - currentLevel) * ((125 * (currentLevel + targetLevel) - 75) / 2);

    console.log("XP Per Run:", xpPerRun);
    console.log("XP Needed Total:", xpNeeded);

    // 4. Time Derivation
    let totalSeconds = (xpNeeded * timeBetweenRuns) / xpPerRun;
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);

    // FIX 1: Declare result in the function scope
    let result = "";

    // FIX 2: Correct conditional logic ordering
    if (hours === 1 && minutes === 1) { 
        result = `You will need approximately 1 hour and 1 minute to reach the target level without distractions.`; 
    }
    else if (hours === 1) { 
        result = `You will need approximately 1 hour and ${minutes} minutes to reach the target level without distractions.`; 
    }
    else if (minutes === 1) { 
        result = `You will need approximately ${hours} hours and 1 minute to reach the target level without distractions.`; 
    }
    else { 
        result = `You will need approximately ${hours} hours and ${minutes} minutes to reach the target level without distractions.`; 
    }
    
    // FIX 3: Clear previous output before appending new calculation results
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = ""; 
    resultContainer.insertAdjacentHTML('beforeend', `<p style="margin-bottom: 0;">${result}</p>`);
});
