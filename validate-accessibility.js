/**
 * Accessibility Validation Script
 * Run this in the browser console to validate accessibility improvements
 */

(function() {
    'use strict';
    
    console.log('🔍 Starting Accessibility Validation...\n');
    
    // Test 1: Check for semantic landmarks
    function testLandmarks() {
        console.log('1. Testing Semantic Landmarks:');
        
        const main = document.querySelector('main[role="main"]');
        const nav = document.querySelector('nav[role="navigation"]');
        const header = document.querySelector('header[role="banner"]');
        const footer = document.querySelector('footer[role="contentinfo"]');
        
        console.log('   ✅ Main landmark:', main ? 'Found' : '❌ Missing');
        console.log('   ✅ Navigation landmark:', nav ? 'Found' : '❌ Missing');
        console.log('   ✅ Header banner:', header ? 'Found' : '❌ Missing');
        console.log('   ✅ Footer contentinfo:', footer ? 'Found' : '❌ Missing');
        
        // Check skip link
        const skipLink = document.querySelector('.skip-link, a[href="#main-content"]');
        console.log('   ✅ Skip link:', skipLink ? 'Found' : '❌ Missing');
        
        console.log('');
    }
    
    // Test 2: Check heading structure
    function testHeadingStructure() {
        console.log('2. Testing Heading Structure:');
        
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        let issues = [];
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            if (index === 0 && level !== 1) {
                issues.push('Page should start with h1');
            } else if (level > lastLevel + 1) {
                issues.push(`Heading level skipped: ${heading.tagName} after h${lastLevel}`);
            }
            lastLevel = level;
        });
        
        if (issues.length === 0) {
            console.log('   ✅ Heading structure: Valid');
        } else {
            console.log('   ❌ Heading structure issues:', issues);
        }
        
        console.log(`   📊 Total headings found: ${headings.length}`);
        console.log('');
    }
    
    // Test 3: Check ARIA labels
    function testAriaLabels() {
        console.log('3. Testing ARIA Labels:');
        
        // Check buttons
        const buttons = document.querySelectorAll('button');
        let unlabeledButtons = 0;
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                unlabeledButtons++;
            }
        });
        console.log(`   📊 Buttons: ${buttons.length} total, ${unlabeledButtons} unlabeled`);
        
        // Check SVG icons
        const svgs = document.querySelectorAll('svg');
        let unlabeledSvgs = 0;
        svgs.forEach(svg => {
            if (!svg.getAttribute('aria-label') && !svg.getAttribute('aria-hidden') && !svg.getAttribute('aria-labelledby')) {
                unlabeledSvgs++;
            }
        });
        console.log(`   📊 SVG icons: ${svgs.length} total, ${unlabeledSvgs} without accessibility attributes`);
        
        // Check images
        const images = document.querySelectorAll('img');
        let unlabeledImages = 0;
        images.forEach(img => {
            if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
                unlabeledImages++;
            }
        });
        console.log(`   📊 Images: ${images.length} total, ${unlabeledImages} without alt text`);
        
        console.log('');
    }
    
    // Test 4: Check focus management
    function testFocusManagement() {
        console.log('4. Testing Focus Management:');
        
        // Check if focus styles are defined
        const focusStyles = getComputedStyle(document.documentElement).getPropertyValue('--focus-outline');
        console.log('   ✅ Focus outline CSS variable:', focusStyles ? 'Defined' : '❌ Missing');
        
        // Check focusable elements
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        console.log(`   📊 Focusable elements: ${focusableElements.length}`);
        
        // Check for skip link
        const skipLink = document.querySelector('.skip-link');
        console.log('   ✅ Skip link present:', skipLink ? 'Yes' : '❌ No');
        
        console.log('');
    }
    
    // Test 5: Check mobile menu accessibility
    function testMobileMenu() {
        console.log('5. Testing Mobile Menu Accessibility:');
        
        const menuToggle = document.querySelector('.menu-toggle, [aria-controls="menu"]');
        const menu = document.getElementById('menu');
        
        if (menuToggle && menu) {
            console.log('   ✅ Menu toggle found');
            console.log('   ✅ Menu element found');
            console.log('   ✅ aria-expanded:', menuToggle.hasAttribute('aria-expanded') ? 'Present' : '❌ Missing');
            console.log('   ✅ aria-controls:', menuToggle.hasAttribute('aria-controls') ? 'Present' : '❌ Missing');
        } else {
            console.log('   ❌ Mobile menu components not found');
        }
        
        console.log('');
    }
    
    // Test 6: Check color contrast (basic test)
    function testColorContrast() {
        console.log('6. Testing Color Contrast Support:');
        
        // Check if high contrast media query is supported
        const highContrastSupported = window.matchMedia('(prefers-contrast: high)').matches !== undefined;
        console.log('   ✅ High contrast media query support:', highContrastSupported ? 'Yes' : '❌ No');
        
        // Check if reduced motion is supported
        const reducedMotionSupported = window.matchMedia('(prefers-reduced-motion: reduce)').matches !== undefined;
        console.log('   ✅ Reduced motion media query support:', reducedMotionSupported ? 'Yes' : '❌ No');
        
        console.log('   💡 Use browser dev tools or WebAIM Contrast Checker for detailed contrast testing');
        
        console.log('');
    }
    
    // Test 7: Check for common accessibility issues
    function testCommonIssues() {
        console.log('7. Testing Common Accessibility Issues:');
        
        // Check for missing language attribute
        const htmlLang = document.documentElement.getAttribute('lang');
        console.log('   ✅ HTML lang attribute:', htmlLang ? `"${htmlLang}"` : '❌ Missing');
        
        // Check for title
        const title = document.title;
        console.log('   ✅ Page title:', title ? `"${title}"` : '❌ Missing');
        
        // Check for meta viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        console.log('   ✅ Viewport meta tag:', viewport ? 'Present' : '❌ Missing');
        
        console.log('');
    }
    
    // Run all tests
    testLandmarks();
    testHeadingStructure();
    testAriaLabels();
    testFocusManagement();
    testMobileMenu();
    testColorContrast();
    testCommonIssues();
    
    console.log('🎉 Accessibility validation complete!\n');
    console.log('📝 Recommendations:');
    console.log('   1. Run axe-core automated testing');
    console.log('   2. Test with screen readers (NVDA, JAWS, VoiceOver)');
    console.log('   3. Perform keyboard-only navigation testing');
    console.log('   4. Use Lighthouse accessibility audit');
    console.log('   5. Validate color contrast with WebAIM Contrast Checker');
    
})();
