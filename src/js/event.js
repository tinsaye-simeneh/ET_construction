// Importing all other files
import {
    interServe
} from './app.config.js';
import {
    ui
} from './ui';

import { validateQuotation } from "./utils/validator";

interServe.events = () => {

    // This will be called by the "init" function to start our application
    const startApp = _ => {
        // This will attach an event listener to the hamburger menu button
        const activateMenuToggleOnHamburgerCllick = (_ => {
            ui.getUIComp().staticComp.hamburgers.forEach(hamburger => {
                hamburger.addEventListener('click', _ => {
                    // toggle the hamburger
                    ui.toggleHamburger(hamburger);
                    //toggle the main menu
                    ui.toggleMenu(hamburger);
                });
            });

        })();

        // Activating the main banner slider
        ui.initiateBannerSlider();

    }

    return {
        // This function will be called in the "index.js" file to start our application
        init: () => {
            // Loading UI Componenetsthat must be loaded at page load.
            ui.init();
            startApp();
            // Add Evnets that sho=uld happen only after the DOM has completely loaded
            events.onDOMContentLoaded();
            // Add the showQuotaionForm Event Listener
            events.showQuotationEvent();
            // Add Page Specific Event Listeners
            events.startPageSpecificEvents(ui.getCurrentPage());

            document.querySelectorAll('.page-section').forEach(section => {
                window.addEventListener("scroll", () => {
                    console.log(pageYOffset, 0.9 * section.offsetTop, section.scrollHeight);
                    if (pageYOffset > 0.7 * section.offsetTop) {
                        section.classList.add("show-section");
                    } else {
                        section.classList.remove("show-section");
                    }
                });
            });

        },

        /**
         * Starts page-specific Events
         */
        startPageSpecificEvents: page => {
            console.log(page);
            switch (page) {
                case "home":
                    events.homePageEvents();
                    break;
                case "services":
                    events.servicesPageEvents();
                    break;
                case "estimates":
                    // events.estimatesPageEvents();
                    break;
                case "projects":
                    // events.projectsPageEvents();
                    break;
                case "contact":
                    // events.contactPageEvents();
                    break;
                case "about":
                    // events.aboutPageEvents();
                    break;
                case "blog":
                    // events.blogPageEvents();
                    break;
                default:
                    console.log("page doesn't exist");
            }
        },

        /**
         * This starts all events specific to the "home" page
         */
        homePageEvents: () => {},

        /**
         * This starts all events specific to the "services" page
         */
        servicesPageEvents: () => {
            events.toggleServices();
        },



        /**
         * This call events that will only fire after the page has completely loaded
         */
        onDOMContentLoaded: () => {
            // Mutate the navigation bar on scroll
            document.addEventListener("DOMContentLoaded", () => {
                interServe.events().mutateNavOnScrollEvent();
                events.backToTopShowHideEvent();
            });
        },

        /**
         * Pops up the quotation form modal
         */
        showQuotationEvent: () => {
            document.querySelectorAll(".show-quotation").forEach(btn => {
                btn.addEventListener("click", () => {
                    const modal = ui.showQuotationForm(); // this function returns the modal object
                    events.quotationFormSubmitEvent(modal);
                });
            });
        },

        /**
         * Add quotation form submit event listener
         * @modal the modal object holding the quotation form
         */
        quotationFormSubmitEvent: (modal) => {
            document.querySelector("#quotation-form").addEventListener("submit", e => {
                e.preventDefault();
                const qs = document.querySelector;
                const id = e.target.id;
                validateQuotation(qs(`#${id} #name`), qs(`#${id} #email`), qs(`#${id} #phone`), qs(`#${id} #service`), qs(`#${id} #project-description`));
            });
        },

        /**
         * This will bring down the navigation bar after the page has been scrolled a certain number of times.
         */
        mutateNavOnScrollEvent: () => {
            window.addEventListener("scroll", ui.mutateNavOnScroll);
        },


        /**
         * This will bring up the "back to the top" button after the page has been scrolled to a particular level.
         */
        backToTopShowHideEvent: () => window.addEventListener("scroll", function () {
            ui.showBackToTopButton()
        }),


        /**
         * This will add an event listener to the toggle the services that is displayed on the "services page".
         * This applies only on devices of width 768px and larger.
         */
        toggleServices: () => {
            const serviceControls = ui.getUIComp().staticComp.servicesPage.servicesControls;
            serviceControls.forEach(ctrl => {
                ctrl.addEventListener("click", ui.setActiveService);
            })
        }
    }
};

const events = interServe.events();
export default events;