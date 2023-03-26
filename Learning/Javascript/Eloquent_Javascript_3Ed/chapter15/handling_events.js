//


/* Event Handlers */

window.addEventListener("click", () => {
    console.log("You knocked?");
});



/* Events And DOM Nodes */

let button1 = document.querySelector("button");
button1.addEventListener("click", () => {
    console.log("Button clicked.");
});

// A node can only have 1 onclick attribute but one can use addEventListener to add multiple handlers

// Using removeEventListener - same named arguments & functions must be given to both addEventListener and removeEventListener

let button2 = document.querySelectorAll("button")[1];
function once() {
    console.log("Done");
    button2.removeEventListener("click", once);
}
button2.addEventListener("click", once);


/* Event Objects */
// Event objects are what are passed as arguments to event handlers.
// let button3 = document.querySelector("button");

let button3 = document.querySelectorAll("button")[2];
button3.addEventListener("mousedown", event => {
    if (event.button === 0) {
        console.log("Left button");
    } else if (event.button === 1) {
        console.log("Middle button");
    } else if (event.button === 2) {
        console.log("Right button");
    }
});


/* Propagation */

// Stopping event propagation
// let para = document.querySelector("p");
let para = document.querySelectorAll("p")[2];
let button4 = document.querySelectorAll("button")[3];
para.addEventListener("mousedown", () => {
    console.log("Handler for paragraph.");
});
button4.addEventListener("mousedown", event => {
    console.log("Handler for button.");
    if (event.button === 2) {
        event.stopPropagation();
    }
});

// Using the target property of event object
document.body.addEventListener( "click", event => {
    if (event.target.nodeName === "BUTTON") {
        console.log("Clicked", event.target.textContent);
    }
});


/* Default Actions */

// Prevent default actions
let link = document.querySelector("a");
link.addEventListener("click", event => {
    console.log("Nope.");
    event.preventDefault();
});


/* Key Events */

// Using the "keydown" and "keyup" events
window.addEventListener("keydown", event => {
    if (event.key === "v") {
        document.body.style.background = "violet";
    }
});
window.addEventListener("keyup", event => {
    if (event.key === "v") {
        document.body.style.background = "";
    }
});

// Monitoring for modifier keys
window.addEventListener("keydown", event => {
    if (event.key === " " && event.ctrlKey) {
        console.log("Continuing!");
    }
});


/* Pointer Events */

/* Mouse Clicks */
// Primitive drawing programme based on mouse click

window.addEventListener("click", event => {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(dot);
});


/* Mouse Motion */
// Using mouse motion
// Tracks the last observed mouse X position

let lastX;
let bar = document.querySelector("div");

bar.addEventListener("mousedown", event => {
    if (event.button === 0) {
        lastX = event.clientX;
        window.addEventListener("mousemove", moved);
        // Prevents selection
        event.preventDefault();
    }
});

function moved(event) {
    if (event.buttons === 0) {
        window.removeEventListener("mousemove", moved);
    } else {
        let dist = event.clientX - lastX;
        let newWidth = Math.max(10, bar.offsetWidth + dist);
        bar.style.width = newWidth + "px";
        lastX = event.clientX;
    }
};



/* Touch Events */
function update(event) {
    for (let dot; dot = document.querySelector("dot");) {
        dot.remove();
    }
    for (let i = 0; i < event.touches.length; i++) {
        let {pageX, pageY} = event.touches[i];
        let dot = document.createElement("dot");
        dot.style.left = (pageX - 50) + "px";
        dot.style.top = (pageY - 50) + "px";
        document.body.appendChild(dot);
    }
    window.addEventListener("touchstart", update);
    window.addEventListener("touchmove", update);
    window.addEventListener("touchend", update);
}

/* Scroll Events */


// Create some content
document.body.appendChild(document.createTextNode("supercalifragilisticexpialidocious ".repeat(1000)));

let bar2 = document.querySelector("#progress");
window.addEventListener("scroll", () => {
    let max = document.body.scrollHeight - innerHeight;
    // bar2.style.width = `${(pageYOffset / max) * 100}%`;
    bar2.style.width = `${(scrollY / max) * 100}%`;
});


/* Focus Events */
// "focus", "blur" and "scroll" events do not propagate
let help = document.querySelector('#help');
let fields = document.querySelectorAll("input");
for (let field of Array.from(fields)) {
    field.addEventListener("focus", event => {
        let text = event.target.getAttribute("data-help");
        help.textContent = text;
    });
    field.addEventListener("blur", event => {
        help.textContent = "";
    });
}


/* Load Events */
// "load" events do not propagate. Occurs with window, document, images and scripts.
// "beforeunload" events fire before leaving a page


/* Events And The Event Loop */
// Using web workers

let squareWorker = new Worker("code/squareworker.js");
squareWorker.addEventListener("message", event => {
    console.log("The worker responded:", event.data);
});
squareWorker.postMessage(10);
squareWorker.postMessage(24);



/* Timers */

// Using both setTimeout and clearTimeout
let bombTimer = setTimeout(() => {
    console.log("BOOM!");
}, 500);

if (Math.random() < 0.5) {
    console.log("Defused.");
    clearTimeout(bombTimer);
}

// Time animation
let ticks = 0;
let clock = setInterval(() => {
    console.log("tick", ticks++);
    if (ticks === 10) {
        clearInterval(clock);
        console.log("stop.");
    }
}, 200);


/* Debouncing */

// Using timeout
let textarea = document.querySelector("textarea");
let timeout;
textarea.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => console.log("Typed!"), 500);
});

// Using a scheduled timeout

let scheduled = null;
window.addEventListener("mousemove", event => {
    if (!scheduled) {
        setTimeout(() => {
            document.body.textContent = `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
            scheduled = null;
        }, 250);
    }
    scheduled = event;
});


let scheduled2 = null;
let mousePosition = document.createElement("p");
window.addEventListener("mousemove", event => {
    // let mousePosition = document.createElement("p");
    if (!scheduled2) {
        setTimeout(() => {
            mousePosition.textContent = `Mouse at ${scheduled2.pageX}, ${scheduled2.pageY}`;
            scheduled2 = null;
        }, 250);
    }
    scheduled2 = event;
    // document.body.appendChild(mousePosition);
});
document.body.appendChild(mousePosition);

