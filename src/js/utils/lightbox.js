class IovonAwesomeLightBox {

    /**
     * LightBox OBject. This creates a lightbox and injects it into the DOM
     * 
     * @param options(Object optional)
     * 
     */
    constructor(options = {}) {
        this.cbOnClose = null;
        this.background = {
            black: 'rgba(0, 0, 0, 0.6)',
            white: 'rgba(255, 255, 255, 0.9)',
            brown: 'rgba(62.5, 0, 0, 0.55)',
            blue: 'rgba(31, 31, 95, 0.6);'
        }
        this.lb = document.createElement('div');
        this.lb.id = 'iovon-awesome-lightbox';
        this.lb.style.cssText = `
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${ options.background ? (options.background.__proto__.isPrototypeOf(Object) ? options.background.customBackground : this.background[options.background]) : this.background.black };
        z-index: ${options.zIndex ? options.zIndex : 10};
        `;
        
        this.lbContainer = document.createElement('div');
        this.lbContainer.id = 'iovon-awesome-lightbox-container';
        this.lbContainer.style.cssText = `
        height: 100%;
        width: 100%;
        padding: 3em 0;
        position: relative`;
        this.lb.appendChild(this.lbContainer);

        // Attaching a click listener that closes the 
        if((options.closeOnClick === true) && true) {
            this.on("click", _ => this.close());
        }
    }

    /**
     * This pushes the lightbox into the dom
     * @param assoElement An associated event The element to that needs the lightbox behind it. It could be a modal for example. The LightBox needs to know
     */
    append() {
        document.body.appendChild(this.lb);
        return this.lbContainer;
    }

    /**
     * An EventListener called on the lightbox
     * @param event
     * @param callback
     */
    on(event, callback) {
        this.lb.addEventListener(event, callback);
    }

    onClose(callback) {
        this.cbOnClose = callback || this.cbOnClose;
    }

    callCbOnClose() {
        if (this.cbOnClose) {
            this.cbOnClose();
        }
    }

    /**
     * This removes the lightbox from the DOM
     */
    remove() {
        if(this.isInDOM() !== null) {
            console.log("is");
            document.body.removeChild(this.isInDOM());
            this.callCbOnClose();
        }
    }

    /**
     * Called on the IovonAwesomeLightBox object to close the  lightbox
     */
    close() {
        this.remove();
    }

    /**
     * Checks if the lightbox is already in the DOM and returns it if true. Otherwise null.
     */
    isInDOM() {
        return document.querySelector("#iovon-awesome-lightbox");
    }
}

export default IovonAwesomeLightBox;