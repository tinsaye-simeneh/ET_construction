// jshint esversion: 6
import {
    interServe
} from './app.config.js';
import IovonAwesomeSlider from '../slider/js/slider';
import IovonAwesomeLightBox from './utils/lightbox';
import Modal from './utils/iovon-hybrid-modal';
import quotation from './components/quotation';

const lightbox = new IovonAwesomeLightBox({
    background: "black",
    zIndex: 2,
    closeOnClick: true,
});

interServe.ui = () => {
    const page = document.querySelector('input#page');
    

    console.log(typeof quotation, "hisd");

    const UIComp = {
        staticComp: {
            wrapper: document.querySelector('#wrapper'),
            header: document.querySelector('header'),
            mainContainer: document.querySelector('main'),
            footer: document.querySelector('footer'),
            banner: {
                self: document.querySelector("#main-banner"),
                bannerSlider: document.querySelector("#main-banner-slider")
            },

            

            project: {
                projectSlider: document.querySelector("#projects-slider")
            },

            servicesPage: {
                servicesControls: document.querySelectorAll('#service-controls .service-control'),
            },
        }
    }


    return {
        /**
         * This Inserts the header component into the DOM on page load
         */
        insertNavIntoDOM: () => {
            const html = `<!-- Main Navigation Section -->
			<nav id="main-nav" class="flex flex-row">
            <a href="./" id="logo">Samuel Zewdu Abebe <br>Construction
				</a>
                
				<!-- Hamburger Icon -->
				<div id="main-hamburger" class="hamburger" title="Toggle Menu">
					<div class="bar bar-1"></div>
					<div class="bar bar-2"></div>
					<div class="bar bar-3"></div>
                    </div>
                    
                    <ul id="main-menu" class="menu">
                        <li class="menu-item"><a href="./"><i class="fa fa-home"></i> <span>Home</span></a></li>
                        <li class="menu-item"><a href="services.html"><i class="fa fa-superpowers"></i> <span>Services</span></a></li>
                        <li class="menu-item"><a href="projects.html"><i class="fa fa-building"></i> <span>Projects</span></a></li>
                        <!-- <li class="menu-item"><a href="estimates.html"><i class="fa fa-bar-chart"></i> <span>Find Estimate</span></a></li> -->
                        <li class="menu-item"><a href="contact.php"><i class="fa fa-map-signs"></i> <span>Contact</span></a></li>
                        <li class="menu-item"><a href="about.html"><i class="fa fa-briefcase"></i> <span>About</span></a></li>
                        <li class="menu-item"><span class="show-quotation btn-full-width">Get Quote</span></li>
                        <!-- <li class="menu-item"><a href="blog.html"><i class="fa fa-globe"></i> <span>Blog</span></a></li> -->
                        <!-- <li class="menu-item"><a href=""><a href="">MENU <i class="fa fa-caret-down"></i></a></li> -->
                    </ul>
                    </nav>
            <!-- End of Main Navigation Section -->`;
            
            UIComp.staticComp.header.insertAdjacentHTML("afterBegin", html);
        },
        
        /**
         * This Inserts the header component into the DOM on page load for all admin pages
         */
        insertAdminNavIntoDOM: () => {
            const html = `<!-- Main Navigation Section -->
			<nav id="main-nav" class="admin-nav">
            <a href="../" id="logo">
					<h3>Samuel Zewdu Abebe</h3>
					<p>construction</p>
				</a>

				<!-- Hamburger Icon -->
				<div id="main-hamburger" class="hamburger" title="Toggle Menu">
					<div class="bar bar-1"></div>
					<div class="bar bar-2"></div>
					<div class="bar bar-3"></div>
				</div>

				<ul id="main-menu" class="menu">
					<li class="menu-item"><a href="./"><i class="fa fa-home"></i> <span>Dashboard</span></a></li>
					<li class="menu-item"><a href="contacts.php"><i class="fa fa-users"></i> <span>Messages</span></a></li>
					<li class="menu-item"><a href=".php"><i class="fa fa-building"></i> <span>Projects</span></a></li>
					<li class="menu-item"><a href="estimates.php"><i class="fa fa-bar-chart"></i> <span>Invoicer</span></a></li>
					<li class="menu-item"><a href="about.php"><i class="fa fa-user"></i> <span>Steve</span></a></li>
				</ul>
			</nav>
            <!-- End of Main Navigation Section -->`;

            UIComp.staticComp.header.insertAdjacentHTML("afterBegin", html);
        },


        /**
         * This inserts the footer component into the DOM on page load
         */
        insertFooterIntoDOM: () => {
            const html = `
		<!-- Footer Section -->
        <footer>
            <nav class="footer-nav">
                    <ul class="menu-items">
                        <li class="">Navigation</li>
                        <li class="menu-item"><a class="link" href="/">home</a></li>
                        <li class="menu-item"><a class="link" href="services.html">services</a></li>
                        <li class="menu-item"><a class="link" href="projects.html">projects</a></li>
                        <li class="menu-item"><a class="link" href="about.html">about</a></li>
                    </ul>
                </nav>

                <ul class="menu-items">
                    <li class="">Support</li>
                    <li class="menu-item"><a class="link" href="">privacy policy</a></li>
                    <li class="menu-item"><a class="link" href="">partner</a></li>
                    <li class="menu-item"><a class="link" href="contact.php">contact</a></li>
                </ul>
                
                <ul class="social">
                    <li class="">Social links</li>
                    <li class="menu-item"><a class="" href=""><i class="fa fa-facebook"></i></a></li>
                    <li class="menu-item"><a class="" href=""><i class="fa fa-instagram"></i></a></li>
                    <li class="menu-item"><a class="" href=""><i class="fa fa-twitter"></i></a></li>
                    <li class="menu-item"><a class="" href=""><i class="fa fa-linkedin"></i></a></li>
                </ul>
            </footer>
		<!-- End of Footer Section -->

        <div class="back-to-top">
            <a href="#top" class="flex">
                <i class="fa fa-angle-up"></i>
            </a>
        </div>`;

            UIComp.staticComp.mainContainer.insertAdjacentHTML("afterend", html);
        },

        /**
         * This inserts the header and the footer into the DOM on page load
         */
        insertNavAndFooter: () => {
            ui.insertNavIntoDOM();
            ui.insertFooterIntoDOM();
            ui.getStoreNavComponents();
        },

        /**
         * This inserts the header and the footer into the DOM on page load for only admin pages
         */
        insertAdminNavAndFooter: () => {
            ui.insertAdminNavIntoDOM();
            ui.insertFooterIntoDOM();
            ui.getStoreNavComponents();
        },

        /**
         * This gets and stores the nav-related components in memory so that event listeners can be added to them
         */
        getStoreNavComponents: () => {
            UIComp.staticComp.hamburgers = document.querySelectorAll('.hamburger'),

                UIComp.staticComp.mainNav = {
                    self: document.querySelector("#main-nav"),
                    MainHamburger: document.querySelector('#main-hamburger'),
                    bar1: document.querySelector('.bar-1'),
                    bar2: document.querySelector('.bar-2'),
                    bar3: document.querySelector('.bar-3'),
                    mainMenu: document.querySelector('#main-menu'),
                }
        },

        /**
         * This appends the on-page contact form which appears towards the bottom of every page to the end of the <main> elememen
         */
        insertOnPageContactForm: () => {
            const html = `<!-- Contact us -->
				<h1 class="section-title">Samuel Zewdu Abebe construction</h1>

				<form class="on-page-contact-form">
					<p class="description">
						We'd love to know about your project.
					</p>


					<div class="form-group flex flex-column">
						<label for="name">Name</label>
						<input type="text" id="name" name="clientname">
					</div>

					<div class="form-group flex flex-column">
						<label for="email">Email</label>
						<input type="email" id="email" name="email">
					</div>

					<div class="form-group flex flex-column">
						<label for="Interest">Interest</label>
						<input type="text" id="interest" name="interest"
							placeholder="Something close to what you need?">
					</div>

					<div class="form-group flex flex-column">
						<label for="message">Message</label>
						<input type="text" id="message" name="message">
					</div>

					<button class="btn btn-shadow btn-full-width">Submit <i class="fa fa-location-arrow"></i></button>

					<br />
					<br />
					<p>We do not share your details with any other person or organisation. <a class="link" href="/privacy.html">Privacy Policy</a></p>

				</form>`;

            const art = document.createElement('article');
            art.id = "on-page-contact-static";
            art.innerHTML = html;
            UIComp.staticComp.mainContainer.appendChild(art);

        },

        /**
         * This mutates the navigation bar on page scroll
         */
        mutateNavOnScroll: () => {
            console.log("hello nav");
            const n = UIComp.staticComp.mainNav.self;
            if (window.pageYOffset > (0.2 * document.body.scrollHeight)) {
                n.classList.add("nav-fixed");
            } else {
                n.classList.remove("nav-fixed");
            }
        },

        /**
         * This toggles the style of the hamburger icons
         */
        toggleMenu: hamburger => {
            let menu = hamburger.id.includes("main") ? hamburger.nextElementSibling : hamburger.parentElement;
            menu.classList.toggle('slide-in-x');
            lightbox.onClose(() => {
                if (menu.classList.contains("slide-in-x")) {
                    ui.toggleHamburger(hamburger);
                    ui.toggleMenu(hamburger);
                }
            })
            if (!menu.classList.contains("slide-in-x")) {
                lightbox.close();
            } else {
                lightbox.append();
            }
        },

        toggleHamburger: hamburger => {
            const bars = hamburger.children;
            // toggle hide/show for bar-2
            bars[1].classList.toggle('hide');
            // toggle bend for bar-1 and bar-2
            bars[0].classList.toggle('bend');
            bars[2].classList.toggle('bend');
        },

        // This will start the slider on the home page
        initiateBannerSlider: () => {
            const banner = UIComp.staticComp.banner.self;
            if (document.querySelector(`#${banner ? banner.id : null} .iovon-slides`)) {
                const bannerSlider = new IovonAwesomeSlider(banner);
                bannerSlider.init({
                    interval: 6000,
                    showButtons: true,
                    indicators: true,
                    indicatorControl: true
                });
            }

            const projectSliderContainer = UIComp.staticComp.project.projectSlider;

            // if (document.querySelector(`#${projectSliderContainer ? projectSliderContainer.id : null} .iovon-slides`)) {
            //     const slider = new IovonAwesomeSlider(projectSliderContainer);
            //     slider.init({
            //         interval: 6000,
            //         showButtons: true,
            //         indicators: true,
            //         indicatorControl: true
            //     });
            // }
        },

        /**
         * Displays the "back to the top" button 
         */
        showBackToTopButton: () => {
            const b = document.querySelector(".back-to-top");
            setTimeout(() => {
                if (window.pageYOffset > (0.3 * document.body.scrollHeight)) {
                    b.classList.add("active");
                } else {
                    b.classList.remove("active");
                }
            }, 500);

        },

        /**
         * Deactivates the selected service
         */
        removeActiveFromService: () => {
            const s = document.querySelector(`.service-control.active`);
            s.classList.remove("active");
            document.querySelector(`#${s.dataset.target}`).classList.remove("active");
        },

        /**
         * Shows the selected service
         */
        setActiveService: s => {
            s = s.target;
            ui.removeActiveFromService();
            s.classList.add("active");
            document.querySelector(`#${s.dataset.target}`).classList.add("active")
        },

        /**
         * This shows the quotation form
         * @returns an IovonHybridModal object
         */
        showQuotationForm: () => {
            const modal = new Modal(quotation, []);
            modal.show({showClose: true});
            return modal;
        },

        /**
         * Returns the current page
         */
        getCurrentPage: () => {
            return page.value;
        },

        getUIComp: () => {
            return UIComp;
        },

        /**
         * This just runs a couple of UI Components that should be on the page at page load.
         */
        init: () => {

            if(page.value !== "admin" ) {
                // Inserting user-side navigation, footer and contact form.
                ui.insertNavAndFooter();
                if(page.value !== 'contact') {
                    console.log(page);
                    ui.insertOnPageContactForm();
                }
            } else {
                // insert Admin Nav and Footer
                ui.insertAdminNavAndFooter();
            }
        }
    }
};

export const ui = interServe.ui();