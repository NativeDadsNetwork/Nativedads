$(document).ready(function() {
    $('#nav-bar').html(`

        <div class="navbar-header navbar-header-custom">
            <a href="index.html" class="navbar-brand logowhite"><img id="logo" src="img/logos/ndnCutLogo.png" alt="logo"></a>
        </div>
        <div class="navbar-toggler bg-primary"></div>

        <ul class="navbar-nav ms-auto mt-lg-2" id="nav" style="display: none;">
            <li><a href="index.html">Home</a></li>
            <li><a href="#!">About Us</a>
                <ul>
                    <li><a href="purpose.html">Purpose</a></li>
                    <li><a href="vision.html">Vision</a></li>
                    <li><a href="background.html">Background</a></li>
                </ul>
            </li>

            <li><a href="#!">Board of Directors</a>
                <ul>
                    <li><a href="boardChair.html">Board Chair</a></li>
                </ul>
            </li>

            <li><a href="#!">Staff</a>
                <ul>
                    <li><a href="executivedirector.html">Executive Director</a></li>
                    <li><a href="director.html">Deputy Director</a></li>
                    <li><a href="coordinator.html">Program Coordinator</a></li>
                </ul>
            </li>
            <li><a href="#!">Get Involved</a>
                <ul>
                    <li><a href="volunteer.html">Volunteer</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="coming-soon.html">Shirt Store</a></li>
                    <li><a href="https://www.paypal.com/paypalme/Healingtogether22?country.x=US&locale.x=en_US" target="blank">Donate Now</a></li>
                    <li><a href="careers.html">Careers</a></li>
                </ul>
            </li>
            <li><a href="event-grid.html">Events</a></li>
            <li><a href="contact.html">Contact Us</a></li>
        </ul>
        <div class="attr-nav">
            <ul>
                <li class="d-none d-xl-inline-block"><a href="https://www.paypal.com/paypalme/Healingtogether22?country.x=US&locale.x=en_US" target="blank" class="butn theme small text-white">Donate Now</a></li>
            </ul>
        </div>
    `);
});