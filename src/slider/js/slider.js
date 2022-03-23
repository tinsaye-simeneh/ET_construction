//let parent = document.querySelector("#banner");

// Create the Slider Class
class IovonAwesomeSlider {

	// This takes as input the main parent wrapper of the items we want to slide across
	constructor(parentContainer) {
		this.parent = parentContainer;
		this.slider = document.querySelector(`#${parentContainer.id} .iovon-slides`);
		this.slides = this.slider.children;
		this.length = this.slides.length;

		// control variables
		this.currentSlideIndex = 0;
		this.prevSlideIndex = this.length - 2;
		this.nextSlideIndex = this.currentSlideIndex + 0;
		this.interval = 5000;

		// buttons
		this.buttons = {
			currentState: false,
			leftButton: null,
			rightButton: null
		}

		// auto slider
		this.autoSlider = null;

		// indicators
		this.indicator = {
			currentState: false,
			slideIndicators: "",
			activeSlideIndicator: 0,
		}
	}

	readyParentContainer() {
		this.parent.style.cssText = "width: 100%; position: relative;";
	}

	// This starts the AutoSlider
	startAutoSlide() {
		this.autoSlider = setInterval(() => {
			// update the prev and next slide indices
			this.updatePreviousAndNextSlidesIndices();
			//update the activeSlideIndicator conditionally
			if (this.indicator.currentState) {
				this.indicator.activeSlideIndicator = this.currentSlideIndex;
			}

			// update buttonBackgroundColor if the control buttons are visible in the DOM
			if (this.buttons.currentState) {
				this.updateButtonBackGround();
			}

			// reset slide and slideIndicator styles
			this.reset();

			// style slides
			this.styleSlides();

			//style active indicator
			if (this.indicator.currentState) {
				this.styleActiveIndicator(this.indicator.activeSlideIndicator);
			}

			//			console.log(this.slides[this.prevSlideIndex].textContent, this.slides[this.currentSlideIndex].textContent, this.slides[this.nextSlideIndex].textContent);

			if (this.currentSlideIndex == (this.slides.length - 1)) {
				this.currentSlideIndex = -1;
			}

			this.currentSlideIndex++;

		}, this.interval);
	}

	// This activates the slider control buttons
	showSliderButtons() {
		// activate buttons
		this.buttons.currentState = true;

		// create the slide-control element. It will house the buttons inside the DOM
		let slideControls = document.createElement("div");
		slideControls.className = "slide-controls";

		// make the left button
		let leftControl = document.createElement("div");
		leftControl.classList.add("slide-control", "left-control");
		let leftControlIcon = document.createElement("i");
		leftControlIcon.classList.add("fa", "fa-angle-left");
		leftControl.appendChild(leftControlIcon);

		// make the right button
		let rightControl = document.createElement("div");
		rightControl.classList.add("slide-control", "right-control");
		let rightControlIcon = document.createElement("i");
		rightControlIcon.classList.add("fa", "fa-angle-right");
		rightControl.appendChild(rightControlIcon);

		// append both buttons to the slideControls element
		slideControls.appendChild(leftControl);
		slideControls.appendChild(rightControl);

		// push button controls wrapper into the main parent container right in the DOM
		this.parent.appendChild(slideControls);

		// stored buttons
		this.buttons.leftButton = leftControl;
		this.buttons.rightButton = rightControl;

		// makeButtonsActive
		this.initiateLeftButton();
		this.initiateRightButton();
	}

	// This makes the left-control button active
	initiateLeftButton() {
		this.buttons.leftButton.addEventListener("mouseenter", event => {
			event.target.classList.remove("reverseRotate");
			event.target.classList.add("rotate")
		});
		this.buttons.leftButton.addEventListener("mouseleave", event => {
			event.target.classList.remove("rotate");
			event.target.classList.add("reverseRotate");
		});
		this.buttons.leftButton.addEventListener("click", () => this.getPrevSlide());
	}

	// This makes the left-control button active
	initiateRightButton() {
		this.buttons.rightButton.addEventListener("mouseenter", event => {
			event.target.classList.remove("reverseRotate");
			event.target.classList.add("rotate")
		});
		this.buttons.rightButton.addEventListener("mouseleave", event => {
			event.target.classList.remove("rotate");
			event.target.classList.add("reverseRotate");
		});
		this.buttons.rightButton.addEventListener("click", () => this.getNextSlide());
	}

	// This updates the background image of both control buttons
	updateButtonBackGround() {
		let bcgSetup = `background-repeat: no-repeat; background-size: cover; background-position: center; `;
		let overlay = `linear-gradient(45deg, rgba(180, 6, 120, 0.3), rgba(211, 227, 18, 0.2))`;

		// update left button
		let leftButtonBackroundImage = this.slides[this.prevSlideIndex].firstElementChild.src;
		this.buttons.leftButton.style.cssText = `background: ${overlay}, url(${leftButtonBackroundImage}); ${bcgSetup}`;

		// update right button
		let rightButtonBackroundImage = this.slides[this.nextSlideIndex].firstElementChild.src;
		this.buttons.rightButton.style.cssText = `background: ${overlay}, url(${rightButtonBackroundImage}); ${bcgSetup}`;

	}

	// This sets the currentSlideIndex to the previousSlideIndex, updates the prev and next slide indices resets all styles, stops and restarts the autoSlider
	getPrevSlide() {
		this.setCurrentSlideIndex(this.prevSlideIndex);
	}

	// This sets the currentSlideIndex to the previousSlideIndex, updates the prev and next slide indices resets all styles, stops and restarts the autoSlider
	getNextSlide() {
		this.setCurrentSlideIndex(this.nextSlideIndex);
	}

	// This reset the classes on the current, next and prev slides as well as on the slide indicator
	reset() {
		for (let slide of this.slides) {
			slide.classList.remove("prev");
			slide.classList.remove("current");
			slide.classList.remove("next");
		}

		if (this.indicator.currentState) {
			for (let indicator of this.indicator.slideIndicators) {
				indicator.classList.remove("active");
			}
		}

	}

	// This sets the Current Slide Index on clicking an indicator or on clicking the slide control buttons
	setCurrentSlideIndex(index) {
		this.currentSlideIndex = index;
		this.updatePreviousAndNextSlidesIndices();
		this.updateButtonBackGround();

		// pause the autoSlider
		clearInterval(this.autoSlider);

		// reset all styles
		this.reset();

		// style slides and the clicked slideIndicator
		this.styleSlides();
		this.styleActiveIndicator(index);

		// play autoSlider again
		this.startAutoSlide(this.interval);
	}

	// This switches the previous and next slides
	updatePreviousAndNextSlidesIndices() {
		this.prevSlideIndex = this.currentSlideIndex == 0 ? (this.slides.length - 1) : this.currentSlideIndex - 1;
		this.nextSlideIndex = this.currentSlideIndex == (this.slides.length - 1) ? 0 : this.currentSlideIndex + 1;
	}

	// This assign css classes to the prev, current and next slides
	styleSlides() {
		this.slides[this.prevSlideIndex].classList.add("prev");
		this.slides[this.currentSlideIndex].classList.add("current");
		this.slides[this.nextSlideIndex].classList.add("next");
	}

	// This activate the indicator state
	activateIndicator() {
		this.indicator.currentState = true;
		this.createIndicators();
	}

	// This will create the indicator objects
	createIndicators() {
		let slideIndicator = document.createElement('div');
		slideIndicator.className = 'slide-indicator';

		// create individual indicator
		for (let i = 0; i < this.length; i++) {
			let slide = document.createElement('span');
			slide.className = 'indicator';

			// add an identifier to point each indicator to its respective slide
			slide.dataset.slideNumber = i;

			slideIndicator.appendChild(slide);
		}

		//		console.log(slideIndicator.children);
		this.parent.appendChild(slideIndicator);

		// Store the slide-indicator
		this.indicator.slideIndicators = slideIndicator.children;

		// initialize active indicator
		this.initializeActiveIndicator();
	}


	// This initializes the active indicator to the first one
	initializeActiveIndicator() {
		this.indicator.slideIndicators[0].classList.add("active");
	}

	// This highlights the current active indicator only if Slide Indicators are enabled
	styleActiveIndicator(indicatorIndex) {
		if (this.indicator.currentState) {
			this.indicator.slideIndicators[indicatorIndex].classList.add("active");
		}
	}

	// This enables the user to click on an indicator and move to the associated slide
	enableSlideIndicatorControl() {
		for (let indicator of this.indicator.slideIndicators) {
			indicator.addEventListener("click", () => {
				this.setCurrentSlideIndex(Number.parseInt(event.target.dataset.slideNumber));
			});
		}
	}

	// This starts the carousel slider
	init(options) {
		if (options) {
			const {
				interval,
				indicators,
				showButtons,
				indicatorControl
			} = options;
			// store the interval
			this.interval = interval ? interval : this.interval;
			//update the buttonState
			this.buttons.currentState = showButtons ? showButtons : null;
			// activate indicators conditionally
			if (indicators) {
				this.activateIndicator();
				// enable indicator slide control
				if (indicatorControl) {
					this.enableSlideIndicatorControl();
				}
			}
			// update buttonBackgroundColor if the control buttons are visible in the DOM
			if (this.buttons.currentState) {
				this.showSliderButtons();
				this.updateButtonBackGround();
			}
		}

		// Initializing States
		this.readyParentContainer();

		this.updatePreviousAndNextSlidesIndices();
		this.styleSlides();


		// activating the auto slide
		this.startAutoSlide();
	}
}

export default IovonAwesomeSlider;