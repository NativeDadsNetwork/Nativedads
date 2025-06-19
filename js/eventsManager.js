$(document).ready(function() {
    let eventsData = EVENTS_DATA.events; // Use embedded data directly
    let currentTab = 'upcoming'; // Track current tab
                
    // Check if an event is current/upcoming
    function isUpcomingEvent(event) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // For recurring events, always show as upcoming
        if (event.recurring) {
            return true;
        }
        
        const eventEndDate = new Date(event.endDate);
        return eventEndDate >= today;
    }
    
    // Generate event card HTML
    function generateEventCard(event) {
        // Check if registration should be disabled
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventEndDate = new Date(event.endDate);
        
        // For recurring events, never disable registration unless manually toggled
        // For non-recurring events, disable if end date has passed
        const isRegistrationActive = event.recurring || eventEndDate >= today;
        
        let registerButton = '';
        if (event.hasRegistration) {
            if (isRegistrationActive) {
                registerButton = `<a href="${event.registerUrl}" class="marginTest1 butn-read"><span>Register</span></a><br>`;
            } else {
                registerButton = `<span class="marginTest1 butn-read disabled" style="opacity: 0.5; cursor: not-allowed; text-decoration: none;"><span>Registration Closed</span></span><br>`;
            }
        }
        
        const timeDisplay = event.time ? 
            `<div class="mb-2 text-secondary small font-weight-600"><i class="ti-time me-1"></i> ${event.time}</div>` : '';
        
        return `
            <div class="col-lg-4 mt-1-9 mb-lg-0 wow fadeIn" data-wow-delay="200ms">
                <div class="card card-style1 border-color-extra-light-gray h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <div class="card-body px-1-6 px-sm-1-9 pb-1-9 pt-2-4 position-relative">
                        <span class="card-btn">${event.displayDate}</span>
                        ${timeDisplay}
                        <h3 class="h4 mb-3"><a href="#!">${event.title}</a></h3>
                        <span>${event.description}</span>
                        <p>${event.contact}</p>
                        <div>
                            ${registerButton}
                            <a href="event-grid.html" class="marginTest1 butn-read"><span>View Event Calendar</span></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Generate tab navigation HTML
    function generateTabNavigation() {
        const upcomingCount = eventsData.filter(isUpcomingEvent).length;
        const pastCount = eventsData.filter(event => !isUpcomingEvent(event)).length;
        
        return `
            <div class="row justify-content-center mb-4">
                <div class="col-auto">
                    <ul class="nav nav-pills event-tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link ${currentTab === 'upcoming' ? 'active' : ''}" 
                                    id="upcoming-tab" 
                                    data-tab="upcoming" 
                                    type="button" 
                                    role="tab">
                                Upcoming Events (${upcomingCount})
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link ${currentTab === 'history' ? 'active' : ''}" 
                                    id="history-tab" 
                                    data-tab="history" 
                                    type="button" 
                                    role="tab">
                                Event History (${pastCount})
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    // Render events based on current tab
    function renderEvents() {
        const upcomingEvents = eventsData.filter(isUpcomingEvent);
        const pastEvents = eventsData.filter(event => !isUpcomingEvent(event));
        
        // Determine which events to show based on current tab
        const eventsToShow = currentTab === 'upcoming' ? upcomingEvents : pastEvents;
        const subtitle = currentTab === 'upcoming' ? 'upcoming events' : 'event history';
        const title = currentTab === 'upcoming' ? 'Our Events' : 'Past Events';
        
        // Render the complete events section
        renderEventsSection(eventsToShow, subtitle, title);
        
        // Bind tab click events
        bindTabEvents();
        
        // Initialize animations
        initializeAnimations();
    }
    
    // Render events section with tabs
    function renderEventsSection(events, subtitle, title) {
        const container = $('#upcoming-events-container');
        if (!container.length) return;
        
        if (events.length === 0) {
            container.html(`
                <div class="container black-overlay">
                    <div class="section-heading">
                        <span class="d-block text-primary display-22 display-md-21 display-lg-20 alt-font wow text-animation" data-in-effect="fadeInRight">${subtitle}</span>
                        <h2 class="whiteColor">${title}</h2>
                    </div>
                    ${generateTabNavigation()}
                    <div class="row justify-content-center p-5">
                        <div class="col-12 text-center">
                            <p class="text-white">No ${subtitle} at this time.</p>
                        </div>
                    </div>
                </div>
            `);
            return;
        }
        
        // Sort events by start date
        events.sort((a, b) => {
            // For upcoming events, sort by start date ascending
            // For past events, sort by start date descending (most recent first)
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return currentTab === 'upcoming' ? dateA - dateB : dateB - dateA;
        });
        
        const eventsHtml = events.map(generateEventCard).join('');
        
        container.html(`
            <div class="container black-overlay pt-8">
                <div class="section-heading">
                    <span class="d-block text-primary display-22 display-md-21 display-lg-20 alt-font wow text-animation" data-in-effect="fadeInRight">${subtitle}</span>
                    <h2 class="whiteColor">${title}</h2>
                </div>
                ${generateTabNavigation()}
                <div class="row justify-content-center p-5">
                    ${eventsHtml}
                </div>
            </div>
        `);
    }
    
    // Bind tab click events
    function bindTabEvents() {
        $('.event-tabs .nav-link').off('click').on('click', function(e) {
            e.preventDefault();
            const newTab = $(this).data('tab');
            if (newTab !== currentTab) {
                currentTab = newTab;
                renderEvents();
            }
        });
    }
    
    // Initialize WOW animations for new content
    function initializeAnimations() {
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    }
    
    // Show error message
    function showErrorMessage() {
        const container = $('#upcoming-events-container');
        if (container.length) {
            container.html(`
                <div class="container">
                    <div class="section-heading">
                        <span class="d-block text-primary display-22 display-md-21 display-lg-20 alt-font">upcoming events</span>
                        <h2 class="whiteColor">Our Events</h2>
                    </div>
                    <div class="row justify-content-center p-5">
                        <div class="col-12 text-center">
                            <div class="alert alert-warning">
                                <h4>Unable to load events</h4>
                                <p>Please check back later or contact us for event information.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
    }
    
    // Public methods for manual refresh and tab switching
    window.EventsManager = {
        refresh: function() {
            eventsData = EVENTS_DATA.events;
            renderEvents();
        },
        switchTab: function(tab) {
            if (tab === 'upcoming' || tab === 'history') {
                currentTab = tab;
                renderEvents();
            }
        },
        getCurrentTab: function() {
            return currentTab;
        },
        getUpcomingEvents: function() {
            return eventsData.filter(isUpcomingEvent);
        },
        getPastEvents: function() {
            return eventsData.filter(event => !isUpcomingEvent(event));
        }
    };
    
    // Initialize
    renderEvents();
});

// Embedded Events Data (unchanged)
const EVENTS_DATA = {
    "events": [
        {
            "id": "wellness-workshop-2025",
            "title": "Wellness Workshop Wednesday",
            "description": "July 2nd, 9th, 19th, 30th, August 6th, and 13th From 5:30pm - 7:30pm",
            "contact": "info@nativedadsnetwork.org",
            "startDate": "2025-07-02",
            "endDate": "2025-08-13",
            "displayDate": "July 2nd - August 13th",
            "time": "5:30pm - 7:30pm",
            "image": "img/2025/06/Wellness-Workshop-Wednesday.jpg",
            "registerUrl": "https://forms.gle/jiLSRgAdbWmc3q5d7",
            "hasRegistration": true,
            "recurring": false
        },
        {
            "id": "healing-together-2025",
            "title": "Healing Together",
            "description": "June 18th - 20th, 2025",
            "contact": "info@nativedadsnetwork.org",
            "startDate": "2025-06-18",
            "endDate": "2025-06-20",
            "displayDate": "June 18th - 20th, 2025",
            "time": "",
            "image": "img/2025/04/HealingTogetherConference.JPG",
            "registerUrl": "https://whitebison.org/events/healing-together-conference-2025/",
            "hasRegistration": true,
            "recurring": false
        },
        {
            "id": "gona-conference-2025",
            "title": "G.O.N.A. Conference",
            "description": "Save The Date!",
            "contact": "info@nativedadsnetwork.org",
            "startDate": "2025-05-31",
            "endDate": "2025-06-01",
            "displayDate": "May 31st - June 1st, 2025",
            "time": "",
            "image": "img/2025/04/GreenvilleGONAFlier.JPG",
            "registerUrl": "https://sirrhcgona.rsvpify.com/?securityToken=Dv0L7YjyeHARgoaA9LjUDbEb7JqyGYxM",
            "hasRegistration": true,
            "recurring": false
        },
        {
            "id": "softball-tournament-2025",
            "title": "UNITY Softball Tournament",
            "description": "Save The Date!",
            "contact": "info@nativedadsnetwork.org",
            "startDate": "2025-06-28",
            "endDate": "2025-06-29",
            "displayDate": "June 28th - June 29th, 2025",
            "time": "",
            "image": "img/2025/06/UNITY.jpg",
            "registerUrl": "https://docs.google.com/forms/d/e/1FAIpQLSckQLWELEQWigC6IWHHxgs2pTmgweKWH3Xvs8d2yutuVPlmgQ/viewform",
            "hasRegistration": true,
            "recurring": false
        },
        {
            "id": "red-road-wellbriety",
            "title": "Red Road To Wellbriety",
            "description": "5:30 pm - 7:30 pm",
            "contact": "info@nativedadsnetwork.org",
            "startDate": "2025-01-01",
            "endDate": "2025-12-31",
            "displayDate": "Weekly: Tuesdays",
            "time": "5:30 pm - 7:30 pm",
            "image": "img/2025/04/RedRoadFlyer1.png",
            "registerUrl": "https://forms.gle/6D7v3xiJWaSxZ1166",
            "hasRegistration": true,
            "recurring": true
        },
        {
            "id": "wake-up-wellness",
            "title": "Wake Up With Wellness",
            "description": "Join Us Weekly!",
            "contact": "Every Tuesday",
            "startDate": "2025-01-01",
            "endDate": "2025-12-31",
            "displayDate": "Weekly",
            "time": "6:30 am PST",
            "image": "img/event/wakeWithWellness.png",
            "registerUrl": "https://www.facebook.com/NativeDadsNetwork",
            "hasRegistration": true,
            "recurring": true
        }
    ]
};