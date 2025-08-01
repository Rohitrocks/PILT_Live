# PS Testing LABTech Website

## Deployment Instructions for GoDaddy

### Step 1: Access Your GoDaddy Hosting Account
1. Log in to your GoDaddy account
2. Navigate to "My Products" > "Web Hosting"
3. Click "Manage" next to your hosting account

### Step 2: Access File Manager
1. In the hosting control panel, click on "File Manager"
2. Navigate to the `public_html` directory (this is your website's root folder)

### Step 3: Upload Website Files
1. Extract the contents of this zip file
2. Upload ALL files and folders to the `public_html` directory
3. Ensure the folder structure is maintained:
   ```
   public_html/
   ├── index.html
   ├── testing-services.html
   ├── pt-services.html
   ├── other-services.html
   ├── about-us.html
   ├── contact-us.html
   ├── assets/
   │   ├── css/
   │   ├── js/
   │   └── images/
   └── services/
   ```

### Step 4: Add Your Logo
1. Replace the placeholder logo in `assets/images/` with your actual `logo_PILT2.jpg` file
2. Ensure the logo file is named exactly `logo_PILT2.jpg`

### Step 5: Enable SSL (Optional but Recommended)
1. In your GoDaddy hosting control panel, go to "Security" > "SSL Certificates"
2. Enable "Auto-SSL" or install a custom SSL certificate
3. This will secure your website with HTTPS

### Step 6: Test Your Website
1. Visit your domain name in a web browser
2. Navigate through all pages to ensure everything loads correctly
3. Test the contact form and navigation menus
4. Verify all images and styles load properly

## Website Features

### ✅ Complete Page Structure
- Home page with interactive service cards
- Testing Services hub with 10 service categories
- PT Services page with proficiency testing programs
- Other Services page with additional offerings
- About Us page with company information
- Contact Us page with detailed contact form

### ✅ Enhanced Navigation
- **Breadcrumb navigation** on every page for easy navigation
- Responsive mobile-friendly design
- Dropdown menus for service categories
- Back-to-top button for better user experience

### ✅ Professional Design
- White backgrounds with teal (#247194) and olive (#617742) branding
- Smooth hover animations and transitions
- Professional laboratory aesthetic
- Font Awesome icons throughout

### ✅ SEO Optimized
- Meta descriptions and keywords
- Proper heading structure
- Fast loading times
- Mobile responsive design

## Technical Support

If you encounter any issues during deployment:
1. Check that all file paths are correct
2. Ensure your domain DNS is properly configured
3. Clear your browser cache after making changes
4. Contact your hosting provider for server-specific issues

## Contact Information

For questions about this website template:
- Technical issues: Check file permissions and paths
- Design modifications: Edit the CSS files in `assets/css/`
- Content updates: Edit the HTML files directly

Your website is now ready for professional deployment!
