class Responder {
    constructor() {
        this.container = "";
        this.containerOnDOM = document.querySelector("#responder");
    }

    static create() {
        this.container = document.createElement("div");
        this.container.id = "responder";

        this.container.style.cssText = `
            display: inline-block;
            background: linear-gradient(-135deg, rgba(47, 6, 51, 0.904), rgba(172, 21, 66, 0.99));
            background: linear-gradient(-135deg, rgba(0, 0, 0, 0.904), rgba(0, 0, 0, 0.7));
            background: #e1e1e1;
            background: rgb(11, 20, 65);
            color: #e7e7e7;
            padding: 1em 0.5em;
            position: fixed;
            top: 50px;
            right: 50px;
            border-radius: 5px;
            box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.7);
            transform: translateY(-200%);
            z-index: 900;
            transition: all 0.6s ease;
        `;
    }

    static addToDOM() {
        document.body.appendChild(this.container);
    }

    static showResponse() {
        setTimeout(() => {
            document.querySelector("#responder").style.transform = "translateY(0)";
        }, 100);
    }

    static hide() {
        setTimeout(() => {
            document.querySelector("#responder").style.transform = "translateY(-200%)";
        }, 5000);
    }

    static remove() {
        setTimeout(() => {
            let containerOnDOM = document.querySelector("#responder");
            document.body.removeChild(containerOnDOM);
        }, 8000);
    }

    static send(message) {
        this.create();
        this.container.textContent = message;
        this.addToDOM();
        this.showResponse();
        this.hide();
        this.remove();
    }
}