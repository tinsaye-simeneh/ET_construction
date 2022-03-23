import IovonAwesomeLightBox from "./lightbox";
/*  This is a hybrid modal object
    
*/
class IovonHybridModal {

    /**
     * Creates an instance of the modal
     * Arguments: a callback which links attaches data to the content to be displayed, a data object of the data to be displayed
     * 
     * @cb Function - A callback that returns HTML or any string.
     * @data Array - An optional argument of the callback function. Example a string, object, array, etc.
     * @options Object - An optional object used to set specific features of the modal
     * 
     * The following options can be set
     * @lightbox .background String | Object - Possible string values are "white", "black", "blue" and "brown"
     * @lightbox .closeOnClick Boolean - Possible values are true or false
     * @lightbox .zIndex Integer - Sets the z-index property of the lightbox sitting behind the modal
     */
    constructor(cb, data, options = {}) { // cb = callback
        this.cb = cb;
        this.data = data;
        this.modal = document.createElement("div");
        this.modalBody = document.createElement("div");
        this.modalOnUI = null;
        this.modalClose = document.createElement("div");
        this.modalCloseOnUI = null;
        const lightboxBg = "white";
        this.lightbox = new IovonAwesomeLightBox({
            background: options.lightbox !== undefined ? options.lightbox.background || lightboxBg : lightboxBg,
            zIndex: options.lightbox !== undefined ? options.lightbox.zIndex || 9 : 9,
            closeOnClick: options.lightbox !== undefined ? options.lightbox.closeOnClick : false
        });
        this.lightbox.onClose(() => {
            this.closeModal();
        });
        // The append method of the lightbox object also returns the lightbox element that goes into the DOM.
        // We'll save that in a property of this Modal class called "lightboxContainer"
        this.lightboxContainer = this.lightbox.append();
    }

    // Creates the modal
    makeModal(showClose = true) {
        this.modal.id = "iovon-hybrid-modal";
        // add styles to the modal
        this.modal.style.cssText = `min-width: 250px;
        width: calc(90% - 200px);
        max-width: calc(550px);
        background: rgb(246, 246, 246);
        position: absolute;
        top: 0%;
        left: 50%;
        -moz-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        padding: 4em 1em;
        z-index: 10;
        opacity: 0;
        transition: all 0.5s ease;
        -o-border-radius: 5px;
        -ms-border-radius: 5px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        -khtml-border-radius: 5px;
        border-radius: 5px;`;

        // add a close button to the modal
        if (showClose) {
            this.modalClose.id = "iovon-hybrid-modal-close-button";
            this.modalClose.title = "Close";
            this.modalClose.innerHTML = `<i class="fa fa-close"></i>`;
            this.modalClose.style.cssText = `
            display: -o-flex;
            display: -moz-flex;
            display: -ms-flex;
            display: -webkit-flex;
            display: flex;
            -ms-flex-direction: row-reverse;
            -moz-flex-direction: row-reverse;
            -o-flex-direction: row-reverse;
            -webkit-flex-direction: row-reverse;
            flex-direction: row-reverse;
            color: #AAAAAA;
            cursor: pointer;
            font-size: 1.1rem;
            text-align: right;
            margin-bottom: 0.5em;`;
            // changing the reducing the padding top definition for the modal when the showClose button is set to true
            this.modal.style.removeProperty("padding");
            this.modal.style.padding = "1em";

            this.modal.appendChild(this.modalClose);
        }

        // Appending the Modal Body into the Modal. The Modal Body holds all the HTML, SVG or string that will be passed to the modal
        this.modalBody.id = "iovon-hybrid-modal-body";
        this.modal.appendChild(this.modalBody);
    }

    /**
     * This will fill the modal content with the HTML returned by the callback 
     * @param {cb, data} options
     * 
     * @content The callback that returns HTML
     * @data Optional - Any arguments that will be passed to the callback
     */
    fillModalContent() {
        // creating a variable "content" to hold the html returned in the callback function (this.cb) supplied to the constructor
        let content;
        // fill data conditionally if any data has been supplied with the content to be displayed
        if (this.data) {
            // attach the supplied data and expose the content to be displayed to the variable "content"
            content = this.cb(...this.data);
        } else {
            // just expose the content to be displayed to the variable "content"
            content = this.cb();
        }
        // append the variable "content" to the modal element
        this.modalBody.innerHTML = content;
    }

    // Displays the modal
    show(options = {}) {
        // First check that the modal is not currently on the page
        if (!document.getElementById("iovon-hybrid-modal")) {
            // check if the user set the option to hide the close button for the modal
            if (options.showClose !== undefined) {
                // create modal
                this.makeModal(options.showClose);
            } else {
                // create modal
                this.makeModal();
            }
            // Fill the modal with content
            this.fillModalContent();
            // append the modal to the body of the opened document
            this.lightboxContainer.appendChild(this.modal);
            // get the modal from the UI and set it to the "modalOnUI" property of this class
            this.getAndSetModalOnUI();
            // get the modal from the UI and set it to the "modalOnUI" property of this class
            this.getAndSetModalCloseOnUI();
            // animate modal entry
            this.slideDown();
            // activate the close button
            this.activateCloseButton();
        }
    }

    /**
     * This will replace the modal content with a different onoe
     * 
     * @param { cb, data }
     * 
     * @cb The Call back that returns the HTML repeacement in the Modal
     * @data Optional - An array of argunments to be passed to the cb. Defaults to null
     */
    changeModalContent(cb, data, hideCloseIcon = true) {
        this.cb = cb;
        this.data = data;

        // Updating the Modal now
        this.fillModalContent();
        // Check if the "hideCloseIcon" is set to true or false
        if (hideCloseIcon) {
            this.hideCloseIcon();
        }
    }

    // Sets the modal retrieved from the UI
    getAndSetModalOnUI() {
        this.modalOnUI = document.getElementById("iovon-hybrid-modal");
    }

    // Sets the modal retrieved from the UI
    getAndSetModalCloseOnUI() {
        this.modalCloseOnUI = document.getElementById("iovon-hybrid-modal-close-button");
    }

    // activate the modal close button
    activateCloseButton() {
        if (this.modalCloseOnUI !== undefined && this.modalCloseOnUI !== null) {
            this.modalCloseOnUI.firstChild.addEventListener("click", () => {
                this.closeModal();
            });
        }
    }

    /**
     * hides close icon
     */
    hideCloseIcon() {
        this.modalCloseOnUI.style.display = "none";
    }

    // Closes the modal
    closeModal() {
        setTimeout(() => {
            //slide Up the Modal
            this.slideUp();
            // remove the modal from the document
            setTimeout(() => {
                if (this.isInDOM()) {
                    this.lightboxContainer.removeChild(this.modalOnUI);
                    this.lightbox.remove();
                }
            }, 400);
        }, 100);
    }

    /**
     * This checks if the modal is already in the DOM or not.
     * It returns true if the modal is in the DOM otherwise a false value will be returned.
     */
    isInDOM() {
        return document.querySelector("#iovon-hybrid-modal") !== null;
    }

    // Adds the slide-down animation to the modal
    slideUp() {
        this.modalOnUI.style.removeProperty("top");
        this.modalOnUI.style.removeProperty("opacity");
        this.modalOnUI.style.setProperty("top", "0%");
        this.modalOnUI.style.setProperty("opacity", "0");
    }

    // Adds the slide-down animation to the modal
    slideDown() {
        setTimeout(() => {
            // this.modalOnUI.style.removeProperty("top");
            this.modalOnUI.style.removeProperty("opacity");
            this.modalOnUI.style.setProperty("top", "5%");
            this.modalOnUI.style.setProperty("opacity", "1");
        }, 200);
    }
}

export default IovonHybridModal;

// function showCollections(name, state) {
//     return `<h1>My name is ${name}.</h1><p> I come from ${state}.</p>`;
// }

// let collectionsBox = new IovonHybridModal(showCollections, ["Ifeanyi", "Anambra"])
// collectionsBox.show();