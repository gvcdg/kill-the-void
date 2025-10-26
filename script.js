(() => {
    const RALLIES = [
        "BALANCE IS A SEDATIVE",
        "BALANCE IS BULLSHIT",
        "BE WORTH BELIEVING IN",
        "BREAK THE DEFAULT",
        "CARE THROUGH CHALLENGE",
        "CARING IS NOT CULTURE",
        "COMFORT KILLS GREATNESS",
        "DEMAND DEPTH, NOT JUST DOLLARS",
        "DEMAND REAL",
        "DON'T COZY UP — LEVEL UP",
        "DON'T JUST TURN THE GEARS — REBUILD THEM",
        "EARN YOUR BELONGING",
        "GROWTH BEATS CUSHION",
        "HARD IS HOW WE BOND",
        "HOLLOW WORK HOLLOWS YOU",
        "HOLLOW WORK, HOLLOW LIFE",
        "HUMANS > SYSTEMS",
        "INSPIRE, DON'T INSTRUCT",
        "IT'S CALLED WORK FOR A REASON",
        "LEAD OR LOSE US",
        "LEADERSHIP ISN'T A TITLE",
        "MAKE PEOPLE BIGGER THAN THEIR JOBS",
        "MANAGEMENT ≠ LEADERSHIP",
        "NO MORE COGS",
        "NO ONE FOLLOWS A SPREADSHEET",
        "OWN YOUR OUTPUT",
        "PAYCHECKS DON'T BUILD PURPOSE",
        "PROGRESS OVER PERKS",
        "REAL WORK. REAL YOU.",
        "SHRINK THE LEADERSHIP DEFICIT",
        "SOFT CULTURE, SOFT RESULTS",
        "STOP MANAGING, START MOBILIZING",
        "STOP TRADING HOURS FOR MEANING",
        "STRUGGLE WELL",
        "THE MACHINE NEEDS US MORE THAN WE NEED IT",
        "THINK LIKE A BUILDER, NOT A BOT",
        "TOUGH LOVE BUILDS STRONG TEAMS",
        "VISION > VISIBILITY",
        "WE DESERVE WORK WITH WEIGHT",
        "WE RUN THIS",
        "WE, THE COMPANY",
        "WE'RE NOT HERE TO CLOCK IN",
        "WORK ISN'T A TRANSACTION — IT'S A TRANSFORMATION",
        "WORK SHOULD STIR, NOT NUMB",
        "WORK SHOULDN'T SEDATE US",
        "YOU HAVE MORE CONTROL THAN YOU THINK"
    ];
    const stage = document.getElementById("stage");
    const word = document.getElementById("killthevoid");
    const NUM_LAYERS = 8;
    const NUM_SOUNDS = 84;

    let currentAudio = null;

    function random(min, max) { return Math.random() * (max - min) + min; }

    function spawnLayer(word) {
        const div = document.createElement("div");
        div.className = "layer";
        div.textContent = word;
        const fontSize = random(20, 80);
        const opacity = random(0.5, 0.95);
        const offsetY = (random(-400, 300)) + "px";
        const duration = random(20, 80);
        div.style.fontSize = fontSize + "px";
        div.style.opacity = opacity;
        div.style.setProperty("--offsetY", offsetY);
        div.style.setProperty("--startOpacity", opacity);
        div.style.animationDuration = duration + "s";
        stage.appendChild(div);
        div.addEventListener("animationend", () => {
            div.remove();
            spawnLayer(RALLIES[random(0, RALLIES.length) | 0]);
        });
    }

    for (let i = 0; i < NUM_LAYERS; i++) {
        spawnLayer(RALLIES[Math.floor(random(0, RALLIES.length))]);
    }

    let clickCount = 0;
    const clef = document.querySelector('.clef');

    word.addEventListener("click", () => {
        if (currentAudio && !currentAudio.paused) {
            return;
        }
        clickCount++;
        const index = Math.floor(random(1, NUM_SOUNDS + 1));
        const audio = new Audio(`sound${index.toString().padStart(2, '0')}.mp3`);
        currentAudio = audio;
        audio.volume = 0.6;
        audio.addEventListener("ended", () => {
            if (currentAudio === audio) currentAudio = null;
            if (clickCount === 10) {
                clef.style.display = 'block';
            }
        });
        audio.addEventListener("error", () => {
            if (currentAudio === audio) currentAudio = null;
        });
        audio.play().catch(() => {
            if (currentAudio === audio) currentAudio = null;
        });
    });

    clef.addEventListener("click", () => {
        if (currentAudio && !currentAudio.paused) return;
        clickCount = 0;
        clef.style.display = 'none';
        const audio = new Audio('song.mp3');
        currentAudio = audio;
        audio.volume = 0.6;
        audio.addEventListener("ended", () => {
            if (currentAudio === audio) currentAudio = null;
        });
        audio.play().catch(() => {
            if (currentAudio === audio) currentAudio = null;
        });
    });
})();