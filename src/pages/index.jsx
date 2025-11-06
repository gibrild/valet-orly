import Layout from "./Layout.jsx";

import Home from "./Home";

import HowItWorks from "./HowItWorks";

import Pricing from "./Pricing";

import Contact from "./Contact";

import Reviews from "./Reviews";

import Booking from "./Booking";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    HowItWorks: HowItWorks,
    
    Pricing: Pricing,
    
    Contact: Contact,
    
    Reviews: Reviews,
    
    Booking: Booking,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/HowItWorks" element={<HowItWorks />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Reviews" element={<Reviews />} />
                
                <Route path="/Booking" element={<Booking />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}