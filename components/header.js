class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      

      <header class="header" id="main-header">
        <div class="container">
            <div class="header-content">
                <div class="logo-section animate-slide-in-left">
                    <!-- <div class="logo-placeholder">
                        <i class="fas fa-flask"></i>
                        <a href="index.html" class="logo-link">
                        <img src="assets/images/logo_PILT2.jpg" alt="Testing Lab Logo"  />
                        </a>
                    </div> -->
                    
                    <div class="company-info">
                        <h1 class="company-name typewriter" data-text="PRIYAN INTERNATIONAL LAB AND TECHNOLOGY">PRIYAN INTERNATIONAL LAB AND TECHNOLOGY</h1>
                        <p class="tagline">Professional Testing Laboratory Services</p>
                    </div>
                </div>
                
                <!-- Mobile menu button -->
                <button class="mobile-menu-btn" id="mobile-menu-btn">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
                
                <!-- Navigation -->
                <nav class="nav" id="main-nav">
                    <ul class="nav-list">
                        <li class="nav-item nav-item-1">
                            <a href="index.html" class="nav-link active" data-tab="home">
                                <i class="fas fa-home"></i> Home
                            </a>
                        </li>
                        <li class="nav-item nav-item-2 dropdown">
                            <a href="testing-services.html" class="nav-link dropdown-toggle">
                                <i class="fas fa-microscope"></i> Testing Services <i class="fas fa-chevron-down dropdown-arrow"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-item-1"><a href="services/chemical-analysis.html" class="dropdown-link" data-tab="food-agriculture">Food & Agriculture Products</a></li>
                                <li class="dropdown-item-2"><a href="#" class="dropdown-link" data-tab="water-waste">Water, Waste Water & Residue</a></li>
                                <li class="dropdown-item-3"><a href="#" class="dropdown-link" data-tab="pharmaceuticals">Pharmaceuticals</a></li>
                                <li class="dropdown-item-4"><a href="#" class="dropdown-link" data-tab="cosmetics">Cosmetics & Skin Care</a></li>
                                <li class="dropdown-item-5"><a href="#" class="dropdown-link" data-tab="personal-care">Home & Personal Care</a></li>
                                <li class="dropdown-item-6"><a href="#" class="dropdown-link" data-tab="fertiliser">Fertiliser</a></li>
                                <li class="dropdown-item-6"><a href="#" class="dropdown-link" data-tab="herbal">Herbal & Ayurveda</a></li>
                                <li class="dropdown-item-6"><a href="#" class="dropdown-link" data-tab="dietary">Dietary Supplements</a></li>
                                <li class="dropdown-item-6"><a href="#" class="dropdown-link" data-tab="medical">Medical Devices</a></li>
                                <li class="dropdown-item-6"><a href="#" class="dropdown-link" data-tab="polymer">Polymer & Pesticides</a></li>
                            </ul>
                        </li>
                        <li class="nav-item nav-item-3 dropdown">
                            <a href="other-services.html" class="nav-link dropdown-toggle">
                                <i class="fas fa-cogs"></i> Other Services <i class="fas fa-chevron-down dropdown-arrow"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-item-1"><a href="#" class="dropdown-link" data-tab="training">Training</a></li>
                                <li class="dropdown-item-2"><a href="#" class="dropdown-link" data-tab="method-development">Analytical Method Development & Validation</a></li>
                                <li class="dropdown-item-3"><a href="#" class="dropdown-link" data-tab="consultancies">Projects & Consultancies</a></li>
                                <li class="dropdown-item-4"><a href="#" class="dropdown-link" data-tab="inspection">Inspection</a></li>
                            </ul>
                        </li>
                        <li class="nav-item nav-item-4">
                            <a href="about-us.html" class="nav-link" data-tab="about">
                                <i class="fas fa-info-circle"></i> About Us
                            </a>
                        </li>
                        <li class="nav-item nav-item-5">
                            <a href="contact-us.html" class="nav-link" data-tab="contact">
                                <i class="fas fa-envelope"></i> Contact Us
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', Header);

