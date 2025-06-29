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
                    <li><a href="vice-chair.html">Vice Chair</a></li>
                    <li><a href="secretary.html">Secretary</a></li>
                    <li><a href="treasurer.html">Treasurer</a></li>
                    <li><a href="boardmember.html">Member At Large</a></li>
                </ul>
            </li>

            <li><a href="#!">Staff</a>
                <ul>
                    <li><a href="executivedirector.html">Executive Director</a></li>
                    <li><a href="director.html">Deputy Director</a></li>
                    <li><a href="executive-assistant.html">Executive Assistant</a></li>
                    <li><a href="coordinator.html">Program Coordinator</a></li>
                    <li><a href="impactt-coordinator.html">IMPACTT Program Coordinator</a></li>
                    <li><a href="admin-assistant.html">Administrative Assistant</a></li>
                    <li><a href="youth-intern.html">IMPACTT Youth Intern</a></li>
                </ul>
            </li>
            <li><a href="#!">Get Involved</a>
                <ul>
                    <li><a href="volunteer.html">Volunteer</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="donate.html" target="blank">Donate Now</a></li>
                    <li><a href="careers.html">Careers</a></li>
                </ul>
            </li>
            <li><a href="event-grid.html">Events</a></li>
            <li><a href="#!">Our Programs</a>
                <ul>
                    <li><a href="wellness.html">Wellness Department</a></li>
                    <li><a href="youth-programming.html">Youth Programming</a></li>
                    <li><a href="conferences.html">Conferences</a></li>
                </ul>
            </li>
            <li><a href="contact.html">Contact Us</a></li>
        </ul>
        <div class="attr-nav">
            <ul>
                <li class="d-none d-xl-inline-block"><a href="donate.html" class="butn theme small text-white">Donate Now</a></li>
            </ul>
        </div>
    `);
});

// <li><a href="impactt.html">Our Programs</a></li>

$(document).ready(function() {
    // Page configurations
    const pageConfigs = {
        board: [
            { url: 'boardChair.html', title: 'Board Chair' },
            { url: 'vice-chair.html', title: 'Vice Chair' },
            { url: 'secretary.html', title: 'Secretary' },
            { url: 'treasurer.html', title: 'Treasurer' },
            { url: 'boardmember.html', title: 'Member At Large' }
        ],
        staff: [
            { url: 'executivedirector.html', title: 'Executive Director' },
            { url: 'director.html', title: 'Deputy Director' },
            { url: 'executive-assistant.html', title: 'Executive Assistant' },
            { url: 'coordinator.html', title: 'Program Coordinator' },
            { url: 'impactt-coordinator.html', title: 'IMPACTT Program Coordinator' },
            { url: 'admin-assistant.html', title: 'Administrative Assistant' },
            { url: 'youth-intern.html', title: 'IMPACTT Youth Intern' }
        ]
    };
    
    // Determine page type and current page index
    function getPageInfo() {
        const currentUrl = window.location.pathname.split('/').pop();
        
        for (const [type, pages] of Object.entries(pageConfigs)) {
            const pageIndex = pages.findIndex(page => page.url === currentUrl);
            if (pageIndex !== -1) {
                return { type, pages, currentPage: pageIndex + 1 };
            }
        }
        return { type: 'board', pages: pageConfigs.board, currentPage: 1 };
    }
    
    // Initialize pagination
    function initPagination(containerId, pageType) {
        const config = pageConfigs[pageType];
        const pageInfo = getPageInfo();
        const pages = config || pageInfo.pages;
        const currentPage = pageInfo.currentPage;
        
        const pagination = $(containerId);
        pagination.empty();
        
        // Previous button
        const prevDisabled = currentPage === 1 ? 'disabled' : '';
        const prevUrl = currentPage > 1 ? pages[currentPage - 2].url : '#';
        pagination.append(`
            <li class="page-item ${prevDisabled}">
                <a class="page-link" href="${prevUrl}" data-action="prev">
                    <i class="fas fa-long-arrow-alt-left me-1 d-none d-sm-inline-block"></i>
                    Prev
                </a>
            </li>
        `);
        
        // Page numbers
        pages.forEach((page, index) => {
            const pageNum = index + 1;
            const activeClass = pageNum === currentPage ? 'active' : '';
            pagination.append(`
                <li class="page-item ${activeClass}">
                    <a class="page-link" href="${page.url}" data-page="${pageNum}" title="${page.title}">
                        ${pageNum}
                    </a>
                </li>
            `);
        });
        
        // Next button
        const nextDisabled = currentPage === pages.length ? 'disabled' : '';
        const nextUrl = currentPage < pages.length ? pages[currentPage].url : '#';
        pagination.append(`
            <li class="page-item ${nextDisabled}">
                <a class="page-link" href="${nextUrl}" data-action="next">
                    Next
                    <i class="fas fa-long-arrow-alt-right ms-1 d-none d-sm-inline-block"></i>
                </a>
            </li>
        `);
    }
    
    // Handle pagination clicks (prevent default for disabled links)
    $(document).on('click', '.pagination .page-link', function(e) {
        const $this = $(this);
        const $listItem = $this.closest('.page-item');
        
        // Prevent navigation for disabled items
        if ($listItem.hasClass('disabled')) {
            e.preventDefault();
            return false;
        }
        
        // For active page, prevent navigation
        if ($listItem.hasClass('active')) {
            e.preventDefault();
            return false;
        }
        
        // Allow normal navigation for other links
        // The href attribute will handle the navigation
    });
    
    // Auto-initialize pagination based on container presence
    if ($('#dynamic-pagination-board').length) {
        initPagination('#dynamic-pagination-board', 'board');
    }
    if ($('#dynamic-pagination-staff').length) {
        initPagination('#dynamic-pagination-staff', 'staff');
    }
    // Legacy support for old container name
    if ($('#dynamic-pagination').length) {
        const pageInfo = getPageInfo();
        initPagination('#dynamic-pagination', pageInfo.type);
    }
});