import React, { useState } from 'react';
import { MapPin, Home, Users, Star, Plus, Menu, X, Sparkles, Search, Globe, Heart, Calendar, User, Share2, Bell, Filter, ChevronDown, SlidersHorizontal, Shield, CheckCircle, Lock, Clock, Award, Zap, ArrowLeft, CreditCard } from 'lucide-react';
import { calculateBookingFees, calculateNights, FEE_CONFIG } from './utils/paymentUtils';

const MyHostApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState(null);
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);
  const [roomsFilter, setRoomsFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null); // 'checkIn' or 'checkOut'
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(false);
  const [showRoomsFilter, setShowRoomsFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Popular destinations and search suggestions
  const popularDestinations = [
    'Nairobi', 'Mombasa', 'Nakuru', 'Kisumu', 'Eldoret', 
    'Thika', 'Nyeri', 'Malindi', 'Kitale', 'Garissa'
  ];
  
  // Get unique locations from properties for suggestions
  const getLocationSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    const queryLower = query.toLowerCase();
    const locations = [...new Set(properties.map(p => p.location))];
    return locations
      .filter(loc => loc.toLowerCase().includes(queryLower))
      .slice(0, 5);
  };
  
  const getPropertyTitleSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    const queryLower = query.toLowerCase();
    return properties
      .filter(p => p.title.toLowerCase().includes(queryLower))
      .slice(0, 3)
      .map(p => ({ type: 'property', title: p.title, location: p.location, id: p.id }));
  };
  
  const searchSuggestions = [
    ...getLocationSuggestions(searchQuery),
    ...getPropertyTitleSuggestions(searchQuery)
  ];

  // Helper function to handle category navigation
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentPage('category');
  };

  // Helper function to handle search click
  const handleSearchClick = () => {
    setCurrentPage('search');
  };
  
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Lakeside Villa",
      location: "Kisumu, Kenya",
      description: "Beautiful 4-bedroom villa with stunning lake view. Perfect for families and groups.",
      rooms: 4,
      dailyRate: 5000,
      amenities: ["WiFi", "Pool", "Garden", "Parking", "Kitchen", "Washing Machine"],
      host: "Jane Kimani",
      caretaker: "John Ochieng",
      caretakerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Mountain Retreat",
      location: "Nanyuki, Kenya",
      description: "Cozy 3-bedroom house near Mt. Kenya with fireplace and garden views.",
      rooms: 3,
      dailyRate: 4000,
      amenities: ["WiFi", "Fireplace", "Garden", "Kitchen", "Parking"],
      host: "Peter Mwangi",
      caretaker: "Mary Wanjiku",
      caretakerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Countryside Cottage",
      location: "Nakuru, Kenya",
      description: "Peaceful 2-bedroom cottage with farm views. Ideal for couples and small families.",
      rooms: 2,
      dailyRate: 3000,
      amenities: ["WiFi", "Garden", "Kitchen", "Parking"],
      host: "Sarah Njeri",
      caretaker: "David Kamau",
      caretakerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
      ]
    }
  ]);

  const [bookingForm, setBookingForm] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    customerEmail: '',
    customerPhone: '',
    customerFirstName: '',
    customerLastName: '',
    customerIdPassport: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  // Admin account: email: admin@myhost.com, password: admin123
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check if admin is logged in (in production, check from backend/auth)
    const adminEmail = localStorage.getItem('adminEmail');
    return adminEmail === 'admin@myhost.com';
  });
  
  const handleSignupLogin = (formData) => {
    // Simple admin check - in production, verify with backend
    if (formData.email === 'admin@myhost.com' && formData.password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('adminEmail', 'admin@myhost.com');
      setCurrentUser({ email: formData.email, firstName: formData.firstName, lastName: formData.lastName });
      setShowSignup(false);
      alert('Admin login successful!');
    } else {
      setCurrentUser({ email: formData.email, firstName: formData.firstName, lastName: formData.lastName });
      setShowSignup(false);
      alert('Sign up successful!');
    }
  };

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pesapal'); // 'pesapal', 'mpesa', 'card', 'bank'
  const [paidBookings, setPaidBookings] = useState(new Set()); // Track which property bookings have been paid


  const [newProperty, setNewProperty] = useState({
    title: '',
    location: '',
    description: '',
    rooms: 1,
    dailyRate: 0,
    amenities: '',
    host: '',
    caretaker: '',
    category: 'properties', // properties, group, exchange, student, store
    // MyStore specific fields
    storageType: 'unit', // 'garage' or 'unit'
    length: '',
    width: '',
    height: '',
    sizeSqm: '',
    rateType: 'daily', // daily, weekly, monthly, annual
    availableFrom: '',
    availableTo: '',
    images: []
  });
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setUploadingImages(true);
    
    // Mock image upload - in production, upload to server
    const imageUrls = files.map(file => {
      // Create a local URL for preview
      return URL.createObjectURL(file);
    });
    
    setNewProperty({
      ...newProperty,
      images: [...newProperty.images, ...imageUrls]
    });
    
    setUploadingImages(false);
  };

  const handleAddProperty = () => {
    if (!newProperty.title || !newProperty.location || !newProperty.description || !newProperty.host) {
      alert('Please fill in all required fields');
      return;
    }
    
    // MyStore validation
    if (newProperty.category === 'store') {
      if (!newProperty.storageType || !newProperty.length || !newProperty.width || !newProperty.height || !newProperty.rateType || !newProperty.availableFrom || !newProperty.availableTo) {
        alert('For MyStore units, please fill in storage type (garage/unit), dimensions (length, width, height), rate type, and availability dates');
        return;
      }
    } else {
      if (!newProperty.caretaker || !newProperty.rooms) {
        alert('Please fill in all required fields');
        return;
      }
    }
    
    const property = {
      id: properties.length + 1,
      title: newProperty.title,
      location: newProperty.location,
      description: newProperty.description,
      rooms: newProperty.category === 'store' ? null : newProperty.rooms,
      dailyRate: newProperty.dailyRate,
      amenities: newProperty.amenities ? newProperty.amenities.split(',').map(a => a.trim()) : [],
      host: newProperty.host,
      caretaker: newProperty.category === 'store' ? null : newProperty.caretaker,
      category: newProperty.category,
      rating: 0,
      reviews: 0,
      image: newProperty.images.length > 0 ? newProperty.images[0] : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
      images: newProperty.images.length > 0 ? newProperty.images : ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500"],
      storageType: newProperty.category === 'store' ? newProperty.storageType : null,
      length: newProperty.category === 'store' ? newProperty.length : null,
      width: newProperty.category === 'store' ? newProperty.width : null,
      height: newProperty.category === 'store' ? newProperty.height : null,
      sizeSqm: newProperty.category === 'store' ? (parseFloat(newProperty.length) * parseFloat(newProperty.width) / 10000).toFixed(2) : null,
      rateType: newProperty.category === 'store' ? newProperty.rateType : 'daily',
      availableFrom: newProperty.category === 'store' ? newProperty.availableFrom : null,
      availableTo: newProperty.category === 'store' ? newProperty.availableTo : null
    };
    setProperties([...properties, property]);
    setNewProperty({
      title: '',
      location: '',
      description: '',
      rooms: 1,
      dailyRate: 0,
      amenities: '',
      host: '',
      caretaker: '',
      category: 'properties',
      storageType: 'unit',
      length: '',
      width: '',
      height: '',
      sizeSqm: '',
      rateType: 'daily',
      availableFrom: '',
      availableTo: '',
      images: []
    });
    alert('Property added successfully!');
  };

  const filteredProperties = properties.filter(p => {
    // Search filter
    const matchesSearch = !searchQuery || 
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (!bookingForm.location || p.location.toLowerCase().includes(bookingForm.location.toLowerCase()));
    
    // Price filter
    if (priceFilter && p.dailyRate > priceFilter) {
      return false;
    }
    
    // Amenities filter - check if property has ALL selected amenities
    if (amenitiesFilter.length > 0 && (!p.amenities || !amenitiesFilter.every(amenity => p.amenities.includes(amenity)))) {
      return false;
    }
    
    // Rooms filter
    if (roomsFilter && (!p.rooms || p.rooms < roomsFilter)) {
      return false;
    }
    
    // Type filter
    if (typeFilter) {
      const typeLower = typeFilter.toLowerCase();
      // Check if property title or description contains the type
      const titleMatch = p.title.toLowerCase().includes(typeLower);
      const descMatch = p.description?.toLowerCase().includes(typeLower);
      // Also check for common variations
      const variations = {
        'ranch': ['ranch', 'ranching'],
        'farm': ['farm', 'farming', 'farmhouse'],
        'homestead': ['homestead', 'homesteading'],
        'cottage': ['cottage'],
        'villa': ['villa'],
        'country house': ['country house', 'countryside house'],
        'farmhouse': ['farmhouse', 'farm house'],
        'bungalow': ['bungalow'],
        'estate': ['estate']
      };
      const typeVariations = variations[typeLower] || [typeLower];
      const hasVariation = typeVariations.some(v => 
        p.title.toLowerCase().includes(v) || p.description?.toLowerCase().includes(v)
      );
      
      if (!titleMatch && !descMatch && !hasVariation) {
        return false;
      }
    }
    
    // Rating filter
    if (ratingFilter && p.rating < ratingFilter) {
      return false;
    }
    
    // Location filter
    if (locationFilter && !p.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (categoryFilter) {
      if (categoryFilter === 'group' && (!p.rooms || p.rooms < 3)) {
        return false;
      } else if (categoryFilter === 'student' && p.dailyRate > 3500) {
        return false;
      } else if (categoryFilter === 'store' && p.category !== 'store') {
        return false;
      } else if (categoryFilter === 'exchange' && p.category !== 'exchange') {
        return false;
      } else if (categoryFilter === 'properties' && p.category !== 'properties') {
        return false;
      }
    }
    
    // Category filter (activeCategory)
    if (activeCategory === 'group') {
      return matchesSearch && p.rooms >= 3; // Group hosting = 3+ rooms
    } else if (activeCategory === 'student') {
      return matchesSearch && p.dailyRate <= 3500; // Student longstay = budget-friendly
    } else if (activeCategory === 'exchange') {
      return matchesSearch; // Host exchange - all properties
    } else if (activeCategory === 'store') {
      return matchesSearch; // MyStore units - all properties (can be filtered later)
    } else if (activeCategory === 'properties') {
      return matchesSearch; // All properties
    }
    
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.dailyRate - b.dailyRate;
    if (sortBy === 'price-high') return b.dailyRate - a.dailyRate;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // popular - keep original order
  });

  // Clean Modern Header - VacationRenter Style
  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-[var(--logo-primary)] shadow-xl">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Premium Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <img 
              src="/myhost-logo.png" 
              alt="MyHost Logo" 
              className="h-8 md:h-10 w-auto mr-2 group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                // Try alternative path
                if (e.target.src.includes('/myhost-logo.png')) {
                  e.target.src = '/logo.png';
                } else {
                  // Fallback to text logo if image doesn't load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }
              }}
            />
            <span className="text-xl md:text-2xl font-bold text-[var(--logo-primary)]">MyHost</span>
            <div className="hidden items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--logo-primary)] via-[var(--logo-secondary)] to-[var(--logo-accent)] rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{boxShadow: '0 0 20px rgba(var(--logo-primary-rgb, 26, 115, 232), 0.3)'}}>
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>


          {/* Premium Right Menu */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                console.log('Become a Host button clicked');
                setCurrentPage('host');
              }}
              type="button"
              className="flex items-center space-x-1.5 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-extrabold bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border-2 border-orange-700"
              style={{ minWidth: '120px', display: 'flex', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4 text-black" />
              <span className="whitespace-nowrap text-black">Become a Host</span>
            </button>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 text-orange-600 hover:text-white bg-white hover:bg-orange-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border-2 border-orange-600 relative group"
              style={{ boxShadow: '0 2px 10px rgba(251, 146, 60, 0.3)' }}
            >
              <Bell className={`w-4 h-4 md:w-5 md:h-5 text-orange-600 group-hover:text-white transition-all duration-300 ${showNotifications ? 'animate-pulse' : 'group-hover:scale-110'}`} />
              {showNotifications && (
                <div className="absolute top-full right-0 mt-3 bg-gradient-to-br from-white via-[var(--logo-primary)]/5 to-white backdrop-blur-md border-2 border-[var(--logo-primary)] rounded-2xl shadow-2xl z-50 p-5 min-w-[320px] animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotifications(false);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
            </button>
              </div>
                  <div className="flex flex-col items-center justify-center py-8">
                    <Bell className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-600 font-medium">No new notifications</p>
                  </div>
                </div>
              )}
            </button>
            <button 
              onClick={() => {
                if (favorites.size > 0) {
                  setCurrentPage('favorites');
                } else {
                  alert('You have no favorite properties yet');
                }
              }}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 text-orange-600 hover:text-white bg-white hover:bg-orange-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border-2 border-orange-600 relative group"
              style={{ boxShadow: '0 2px 10px rgba(251, 146, 60, 0.3)' }}
            >
              <Heart className={`w-4 h-4 md:w-5 md:h-5 text-orange-600 group-hover:text-white transition-all duration-300 ${favorites.size > 0 ? 'fill-orange-600 text-orange-600 scale-110' : 'group-hover:scale-110'}`} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-accent)] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {favorites.size}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white border-2 border-orange-600 rounded-full hover:border-orange-700 hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 relative group"
              style={{ boxShadow: '0 2px 10px rgba(251, 146, 60, 0.3)' }}
            >
              <Menu className={`w-4 h-4 md:w-4 md:h-4 text-orange-600 group-hover:text-white transition-colors duration-300 ${showUserMenu ? 'text-white' : ''}`} />
              <User className={`w-4 h-4 md:w-4 md:h-4 text-orange-600 group-hover:text-white transition-colors duration-300 ${showUserMenu ? 'text-white' : ''}`} />
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 bg-gradient-to-br from-white via-[var(--logo-primary)]/5 to-white backdrop-blur-md border-2 border-[var(--logo-primary)]/30 rounded-xl shadow-2xl z-50 p-2 min-w-[200px]">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="font-semibold text-gray-900">{currentUser.firstName} {currentUser.lastName}</p>
                        <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
                      <button
                        onClick={() => {
                          setCurrentUser(null);
                          setIsAdmin(false);
                          localStorage.removeItem('adminEmail');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 rounded-lg transition-all duration-200 flex items-center space-x-2 group"
                      >
                        <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Log out</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setShowSignup(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-3 text-sm font-bold bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group border-2 border-orange-700"
                      >
                        <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Sign Up</span>
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode('login');
                          setShowLogin(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-3 text-sm font-semibold bg-orange-600 text-white border-2 border-orange-700 rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                      >
                        <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Log In</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // Filter Bar - VacationRenter Style - Bigger
  const FilterBar = () => {
    const minPrice = 0;
    const maxPrice = 20000;
    
    return (
      <div className="sticky top-16 md:top-20 z-40 bg-gradient-to-r from-[var(--logo-primary)]/90 via-[var(--logo-secondary)]/90 to-[var(--logo-primary)]/90 backdrop-blur-md border-b border-[var(--logo-primary)]/20 shadow-md">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center space-x-2 py-2.5 overflow-x-auto">
            {/* Price Filter */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowPriceFilter(!showPriceFilter);
                  setShowAmenitiesFilter(false);
                  setShowRoomsFilter(false);
                  setShowTypeFilter(false);
                  setShowRatingFilter(false);
                  setShowLocationFilter(false);
                  setShowCategoryFilter(false);
                  setShowSortMenu(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showPriceFilter ? 'scale-105' : 'hover:scale-105'}`}
              >
                <span className="text-base">💰</span>
                <span>Price</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showPriceFilter ? 'rotate-180' : ''}`} />
              </button>
              {showPriceFilter && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowPriceFilter(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[500px] max-w-[600px] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Price Range</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Select your maximum budget</p>
                      </div>
                      <button
                        onClick={() => setShowPriceFilter(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[var(--logo-primary)]/10 to-[var(--logo-secondary)]/10 rounded-xl p-4">
                        <input
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          step={500}
                          value={priceFilter || maxPrice}
                          onChange={(e) => setPriceFilter(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--logo-primary)]"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>KSh {minPrice.toLocaleString()}</span>
                          <span className="font-bold text-lg text-[var(--logo-primary)]">KSh {priceFilter?.toLocaleString() || maxPrice.toLocaleString()}</span>
                          <span>KSh {maxPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setPriceFilter(null);
                            setShowPriceFilter(false);
                          }}
                          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <X className="w-4 h-4" />
                          <span>Clear</span>
                        </button>
                        <button
                          onClick={() => setShowPriceFilter(false)}
                          className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
        </div>
        
            {/* Amenities Filter */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowAmenitiesFilter(!showAmenitiesFilter);
                  setShowPriceFilter(false);
                  setShowRoomsFilter(false);
                  setShowTypeFilter(false);
                  setShowRatingFilter(false);
                  setShowLocationFilter(false);
                  setShowCategoryFilter(false);
                  setShowSortMenu(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showAmenitiesFilter ? 'scale-105' : 'hover:scale-105'}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Popular amenities</span>
                {amenitiesFilter.length > 0 && (
                  <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    {amenitiesFilter.length}
                </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAmenitiesFilter ? 'rotate-180' : ''}`} />
              </button>
              {showAmenitiesFilter && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowAmenitiesFilter(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[500px] max-w-[600px] max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Popular Amenities</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Select amenities you need</p>
            </div>
                      <button
                        onClick={() => setShowAmenitiesFilter(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
          </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['WiFi', 'Pool', 'Garden', 'Parking', 'Kitchen', 'Washing Machine', 'Fireplace', 'Air Conditioning'].map(amenity => {
                        const isSelected = amenitiesFilter.includes(amenity);
                        return (
                          <label 
                            key={amenity} 
                            className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-[var(--logo-primary)] bg-gradient-to-r from-[var(--logo-primary)]/10 to-[var(--logo-secondary)]/10'
                                : 'border-gray-200 hover:border-[var(--logo-primary)]/50 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setAmenitiesFilter([...amenitiesFilter, amenity]);
                                } else {
                                  setAmenitiesFilter(amenitiesFilter.filter(a => a !== amenity));
                                }
                              }}
                              className="w-4 h-4 text-[var(--logo-primary)] rounded"
                            />
                            <span className={`text-sm font-medium ${isSelected ? 'text-[var(--logo-primary)]' : 'text-gray-700'}`}>{amenity}</span>
                          </label>
                        );
                      })}
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setAmenitiesFilter([]);
                          setShowAmenitiesFilter(false);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                      </button>
                      <button
                        onClick={() => setShowAmenitiesFilter(false)}
                        className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
        </div>
        
            {/* Rooms Filter */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowRoomsFilter(!showRoomsFilter);
                  setShowPriceFilter(false);
                  setShowAmenitiesFilter(false);
                  setShowTypeFilter(false);
                  setShowRatingFilter(false);
                  setShowLocationFilter(false);
                  setShowCategoryFilter(false);
                  setShowSortMenu(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showRoomsFilter ? 'scale-105' : 'hover:scale-105'}`}
              >
                <Home className="w-4 h-4" />
                <span>Rooms and baths</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showRoomsFilter ? 'rotate-180' : ''}`} />
              </button>
              {showRoomsFilter && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowRoomsFilter(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[500px] max-w-[600px] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Rooms & Baths</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Select minimum number of rooms</p>
            </div>
                      <button
                        onClick={() => setShowRoomsFilter(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
          </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <button
                          key={num}
                          onClick={() => {
                            setRoomsFilter(roomsFilter === num ? null : num);
                          }}
                          className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 font-bold text-base ${
                            roomsFilter === num 
                              ? 'border-[var(--logo-primary)] bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white shadow-md scale-105' 
                              : 'border-gray-300 text-gray-700 hover:border-[var(--logo-primary)]/60 hover:bg-[var(--logo-primary)]/5 hover:scale-105 active:scale-95'
                          }`}
                        >
                          {num}+
                        </button>
                      ))}
        </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setRoomsFilter(null);
                          setShowRoomsFilter(false);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                      </button>
                      <button
                        onClick={() => setShowRoomsFilter(false)}
                        className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
      </div>

            {/* Type Filter */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowTypeFilter(!showTypeFilter);
                  setShowPriceFilter(false);
                  setShowAmenitiesFilter(false);
                  setShowRoomsFilter(false);
                  setShowRatingFilter(false);
                  setShowLocationFilter(false);
                  setShowCategoryFilter(false);
                  setShowSortMenu(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showTypeFilter ? 'scale-105' : 'hover:scale-105'}`}
              >
                <MapPin className="w-4 h-4" />
                <span>Type of place</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showTypeFilter ? 'rotate-180' : ''}`} />
              </button>
              {showTypeFilter && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowTypeFilter(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[500px] max-w-[600px] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Type of Place</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Select property type</p>
                      </div>
                      <button
                        onClick={() => setShowTypeFilter(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['All', 'Ranch', 'Farm', 'Homestead', 'Cottage', 'Villa', 'Country House', 'Farmhouse', 'Bungalow', 'Estate'].map(type => (
                        <button
                          key={type}
                          onClick={() => {
                            setTypeFilter(type === 'All' ? null : type);
                          }}
                          className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                            typeFilter === type || (type === 'All' && !typeFilter)
                              ? 'bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white shadow-md'
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-[var(--logo-primary)]/10 hover:to-[var(--logo-secondary)]/10 hover:text-[var(--logo-primary)] border-2 border-gray-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setTypeFilter(null);
                          setShowTypeFilter(false);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                      </button>
                      <button
                        onClick={() => setShowTypeFilter(false)}
                        className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowRatingFilter(!showRatingFilter);
                  setShowPriceFilter(false);
                  setShowAmenitiesFilter(false);
                  setShowRoomsFilter(false);
                  setShowTypeFilter(false);
                  setShowLocationFilter(false);
                  setShowCategoryFilter(false);
                  setShowSortMenu(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showRatingFilter ? 'scale-105' : 'hover:scale-105'}`}
              >
                <Star className="w-4 h-4" />
                <span>Rating</span>
                {ratingFilter && (
                  <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                    {ratingFilter}+
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showRatingFilter ? 'rotate-180' : ''}`} />
              </button>
              {showRatingFilter && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowRatingFilter(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[500px] max-w-[600px] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Minimum Rating</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Select minimum rating</p>
                      </div>
                      <button
                        onClick={() => setShowRatingFilter(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[4.0, 4.2, 4.5, 4.7, 4.9].map(rating => (
                        <button
                          key={rating}
                          onClick={() => {
                            setRatingFilter(ratingFilter === rating ? null : rating);
                          }}
                          className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 font-bold text-base ${
                            ratingFilter === rating 
                              ? 'border-[var(--logo-primary)] bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white shadow-md scale-105' 
                              : 'border-gray-300 text-gray-700 hover:border-[var(--logo-primary)]/60 hover:bg-[var(--logo-primary)]/5 hover:scale-105 active:scale-95'
                          }`}
                        >
                          {rating}+
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setRatingFilter(null);
                          setShowRatingFilter(false);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                      </button>
                      <button
                        onClick={() => setShowRatingFilter(false)}
                        className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Location Filter */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowLocationFilter(!showLocationFilter);
                  setShowPriceFilter(false);
                  setShowAmenitiesFilter(false);
                  setShowRoomsFilter(false);
                  setShowTypeFilter(false);
                  setShowRatingFilter(false);
                  setShowCategoryFilter(false);
                  setShowSortMenu(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showLocationFilter ? 'scale-105' : 'hover:scale-105'}`}
              >
                <MapPin className="w-4 h-4" />
                <span>Location</span>
                {locationFilter && (
                  <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                    ✓
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showLocationFilter ? 'rotate-180' : ''}`} />
              </button>
              {showLocationFilter && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowLocationFilter(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[500px] max-w-[600px] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Filter by Location</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Enter location name</p>
                      </div>
                      <button
                        onClick={() => setShowLocationFilter(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="e.g. Nairobi, Kisumu, Mombasa"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[var(--logo-primary)] focus:ring-2 focus:ring-[var(--logo-primary)] outline-none"
                      />
                      <div className="text-sm text-gray-600">
                        <p className="font-semibold mb-2">Popular locations:</p>
                        <div className="flex flex-wrap gap-2">
                          {popularDestinations.map(loc => (
                            <button
                              key={loc}
                              onClick={() => setLocationFilter(loc)}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                locationFilter === loc
                                  ? 'bg-[var(--logo-primary)] text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {loc}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setLocationFilter('');
                          setShowLocationFilter(false);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                      </button>
                      <button
                        onClick={() => setShowLocationFilter(false)}
                        className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowCategoryFilter(!showCategoryFilter);
                  setShowPriceFilter(false);
                  setShowAmenitiesFilter(false);
                  setShowRoomsFilter(false);
                  setShowTypeFilter(false);
                  setShowRatingFilter(false);
                  setShowLocationFilter(false);
                  setShowSortMenu(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showCategoryFilter ? 'scale-105' : 'hover:scale-105'}`}
              >
                <Home className="w-4 h-4" />
                <span>Category</span>
                {categoryFilter && (
                  <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                    ✓
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCategoryFilter ? 'rotate-180' : ''}`} />
              </button>
              {showCategoryFilter && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowCategoryFilter(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[500px] max-w-[600px] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Property Category</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Select category type</p>
                      </div>
                      <button
                        onClick={() => setShowCategoryFilter(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {[
                        { value: null, label: 'All Categories' },
                        { value: 'properties', label: '🏠 Properties' },
                        { value: 'student', label: '⭐ Student Longstay' },
                        { value: 'store', label: '✨ MyStore Units' },
                        { value: 'exchange', label: '🌍 Host Exchange' },
                        { value: 'group', label: '👥 Group Hosting' }
                      ].map(cat => (
                        <button
                          key={cat.value || 'all'}
                          onClick={() => {
                            setCategoryFilter(cat.value);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                            categoryFilter === cat.value || (cat.value === null && !categoryFilter)
                              ? 'bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white shadow-md'
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-[var(--logo-primary)]/10 hover:to-[var(--logo-secondary)]/10 hover:text-[var(--logo-primary)]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setCategoryFilter(null);
                          setShowCategoryFilter(false);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                      </button>
                      <button
                        onClick={() => setShowCategoryFilter(false)}
                        className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sort Menu */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowSortMenu(!showSortMenu);
                  setShowPriceFilter(false);
                  setShowAmenitiesFilter(false);
                  setShowRoomsFilter(false);
                  setShowTypeFilter(false);
                  setShowRatingFilter(false);
                  setShowLocationFilter(false);
                  setShowCategoryFilter(false);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:bg-orange-700 ${showSortMenu ? 'scale-105' : 'hover:scale-105'}`}
              >
                <Filter className="w-4 h-4" />
                <span>Sort</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showSortMenu ? 'rotate-180' : ''}`} />
              </button>
              {showSortMenu && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md animate-in fade-in" onClick={() => setShowSortMenu(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-8 min-w-[450px] max-w-[550px] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
          <div>
                        <h3 className="text-2xl font-bold text-gray-900">Sort By</h3>
                        <p className="text-base text-gray-700 mt-1 font-medium">Choose how to sort results</p>
          </div>
                      <button
                        onClick={() => setShowSortMenu(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-[var(--logo-primary)]"
                      >
                        <X className="w-5 h-5 text-gray-600" />
          </button>
                    </div>
                    <div className="space-y-2">
                      {['popular', 'price-low', 'price-high', 'rating'].map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold flex items-center space-x-2 ${
                            sortBy === option
                              ? 'bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white shadow-md'
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-[var(--logo-primary)]/10 hover:to-[var(--logo-secondary)]/10 hover:text-[var(--logo-primary)]'
                          }`}
                        >
                          {option === 'popular' ? '⭐ Popular' : option === 'price-low' ? '💰 Price: Low to High' : option === 'price-high' ? '💰 Price: High to Low' : '⭐ Highest Rated'}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setSortBy('popular');
                          setShowSortMenu(false);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                      <button
                        onClick={() => setShowSortMenu(false)}
                        className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-orange-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
        </div>
        
            {/* Filters Button */}
            <button 
              onClick={() => {
                setShowFiltersMenu(!showFiltersMenu);
                setShowPriceFilter(false);
                setShowAmenitiesFilter(false);
                setShowRoomsFilter(false);
                setShowTypeFilter(false);
                setShowRatingFilter(false);
                setShowLocationFilter(false);
                setShowCategoryFilter(false);
                setShowSortMenu(false);
              }}
              className={`flex items-center space-x-1.5 px-4 py-2 bg-orange-600 text-white border-2 border-orange-700 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ml-auto shadow-lg hover:shadow-xl hover:bg-orange-700 ${showFiltersMenu ? 'scale-105' : 'hover:scale-105'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {(priceFilter || amenitiesFilter.length > 0 || roomsFilter || typeFilter || ratingFilter || locationFilter || categoryFilter) && (
                <span className="ml-1 bg-[var(--logo-primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {[priceFilter, amenitiesFilter.length > 0, roomsFilter, typeFilter, ratingFilter, locationFilter, categoryFilter].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Welcoming Home Page - Airbnb Style
  const HomePage = () => (
    <div className="pb-12">
      {/* Hero Section with Search Bar Overlay */}
      <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&h=1080&fit=crop&q=80)',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-2xl">
              Find your perfect stay
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-xl">
              Discover unique places to stay in the countryside
            </p>
          </div>

          {/* Search Bar Overlay - Prominent Horizontal Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
                {/* WHERE Field */}
                <div className="flex-1 border-r-0 md:border-r border-gray-200 pr-0 md:pr-4">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">WHERE</label>
                  <input
                    type="text"
                    placeholder="Nairobi"
                    value={bookingForm.location || searchQuery}
                    onChange={(e) => {
                      setBookingForm({...bookingForm, location: e.target.value});
                      setSearchQuery(e.target.value);
                    }}
                    className="w-full border-none outline-none text-base text-gray-900 placeholder-gray-400 bg-transparent"
                  />
                </div>

                {/* CHECK IN Field */}
                <div className="flex-1 border-r-0 md:border-r border-gray-200 pr-0 md:pr-4 relative">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">CHECK IN</label>
                  <div 
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDateType('checkIn');
                      setShowDatePicker(true);
                    }}
                  >
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={bookingForm.checkIn ? new Date(bookingForm.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                      readOnly
                      className="w-full border-none outline-none text-base text-gray-900 placeholder-gray-400 bg-transparent cursor-pointer"
                    />
                  </div>
                  {showDatePicker && selectedDateType === 'checkIn' && (
                    <div className="absolute top-full left-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl z-[60] p-4 min-w-[300px]" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-semibold text-gray-900">Select Check-in Date</label>
                        <button
                          onClick={() => {
                            setShowDatePicker(false);
                            setSelectedDateType(null);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--logo-primary)] pointer-events-none" />
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={bookingForm.checkIn}
                          onChange={(e) => {
                            setBookingForm({...bookingForm, checkIn: e.target.value});
                            if (e.target.value && bookingForm.checkOut && e.target.value >= bookingForm.checkOut) {
                              setBookingForm({...bookingForm, checkIn: e.target.value, checkOut: ''});
                            }
                            setShowDatePicker(false);
                            setSelectedDateType(null);
                          }}
                          className="w-full text-lg p-3 pl-12 border-2 border-gray-300 rounded-lg focus:border-[var(--logo-primary)] focus:ring-2 focus:ring-[var(--logo-primary)] outline-none cursor-pointer"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* CHECK OUT Field */}
                <div className="flex-1 border-r-0 md:border-r border-gray-200 pr-0 md:pr-4 relative">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">CHECK OUT</label>
                  <div 
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!bookingForm.checkIn) {
                        alert('Please select check-in date first');
                        return;
                      }
                      setSelectedDateType('checkOut');
                      setShowDatePicker(true);
                    }}
                  >
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={bookingForm.checkOut ? new Date(bookingForm.checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                      readOnly
                      className="w-full border-none outline-none text-base text-gray-900 placeholder-gray-400 bg-transparent cursor-pointer"
                    />
                  </div>
                  {showDatePicker && selectedDateType === 'checkOut' && bookingForm.checkIn && (
                    <div className="absolute top-full left-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl z-[60] p-4 min-w-[300px]" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-semibold text-gray-900">Select Check-out Date</label>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDatePicker(false);
                            setSelectedDateType(null);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {bookingForm.checkIn && (
                        <p className="text-xs text-gray-600 mb-2 bg-gray-50 p-2 rounded">
                          Check-in: {new Date(bookingForm.checkIn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--logo-primary)] pointer-events-none" />
                        <input
                          type="date"
                          min={bookingForm.checkIn ? (() => {
                            const checkInDate = new Date(bookingForm.checkIn);
                            checkInDate.setDate(checkInDate.getDate() + 1);
                            return checkInDate.toISOString().split('T')[0];
                          })() : new Date().toISOString().split('T')[0]}
                          value={bookingForm.checkOut || ''}
                          onChange={(e) => {
                            e.stopPropagation();
                            const selectedDate = e.target.value;
                            if (selectedDate && bookingForm.checkIn) {
                              const checkIn = new Date(bookingForm.checkIn);
                              const checkOut = new Date(selectedDate);
                              if (checkOut <= checkIn) {
                                alert('Check-out date must be after check-in date');
                                return;
                              }
                            }
                            setBookingForm({...bookingForm, checkOut: selectedDate});
                            setShowDatePicker(false);
                            setSelectedDateType(null);
                          }}
                          className="w-full text-lg p-3 pl-12 border-2 border-gray-300 rounded-lg focus:border-[var(--logo-primary)] focus:ring-2 focus:ring-[var(--logo-primary)] outline-none cursor-pointer"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* GUESTS Field */}
                <div className="flex-1 border-r-0 md:border-r border-gray-200 pr-0 md:pr-4">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">GUESTS</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="2"
                    value={bookingForm.guests || 2}
                    onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value) || 1})}
                    className="w-full border-none outline-none text-base text-gray-900 placeholder-gray-400 bg-transparent"
                  />
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setShowDatePicker(false);
                      setShowSearchSuggestions(false);
                      handleSearchClick();
                    }}
                    className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-4 md:py-3 flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Boxes - Image Based with Photos */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {/* Properties Box */}
          <div 
            onClick={() => handleCategoryClick('properties')}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
              activeCategory === 'properties' ? 'ring-4 ring-[var(--logo-primary)] shadow-2xl' : 'shadow-xl hover:shadow-2xl'
            }`}
          >
            {/* Background Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" 
                alt="Beautiful countryside properties"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80';
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Home className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">Properties</h3>
                  <p className="text-sm text-white/90 font-medium">Browse all available stays</p>
                </div>
              </div>
            </div>
          </div>
        
          {/* Group Hosting Box */}
          <div 
            onClick={() => handleCategoryClick('group')}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
              activeCategory === 'group' ? 'ring-4 ring-pink-500 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
            }`}
          >
            <div className="relative w-full h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" 
                alt="Group hosting for families"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">Group Hosting</h3>
                  <p className="text-sm text-white/90 font-medium">Perfect for groups & families</p>
                </div>
              </div>
            </div>
          </div>
        
          {/* Host Exchange Box */}
          <div 
            onClick={() => handleCategoryClick('exchange')}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
              activeCategory === 'exchange' ? 'ring-4 ring-pink-500 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
            }`}
          >
            <div className="relative w-full h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80" 
                alt="Host exchange program"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Globe className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">Host Exchange</h3>
                  <p className="text-sm text-white/90 font-medium">Same families host travelers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Longstay Box */}
          <div 
            onClick={() => handleCategoryClick('student')}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
              activeCategory === 'student' ? 'ring-4 ring-pink-500 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
            }`}
          >
            <div className="relative w-full h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80" 
                alt="Student accommodation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Star className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">Student Longstay</h3>
                  <p className="text-sm text-white/90 font-medium">Linking students to schools & property owners</p>
                </div>
              </div>
            </div>
          </div>

          {/* MyStore Units Box */}
          <div 
            onClick={() => handleCategoryClick('store')}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
              activeCategory === 'store' ? 'ring-4 ring-pink-500 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
            }`}
          >
            <div className="relative w-full h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" 
                alt="Commercial storage units"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">MyStore Units</h3>
                  <p className="text-sm text-white/90 font-medium">Garage & warehouse rental</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      {/* Search Results Summary - Premium */}
      <div id="properties-section" className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="flex items-center justify-between flex-wrap gap-6 bg-gradient-to-br from-[var(--logo-primary)]/10 via-[var(--logo-secondary)]/10 to-[var(--logo-accent)]/10 rounded-2xl p-6 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              Countryside Accommodations in Kenya
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {filteredProperties.length.toLocaleString()}+ budget-friendly countryside stays with urban ambience
            </p>
          </div>
          <div className="flex items-center space-x-2.5 px-5 py-3 border-2 border-[var(--logo-primary)]/20 rounded-xl bg-[var(--logo-primary)]/10 backdrop-blur-sm shadow-sm">
            <Star className="w-4 h-4 text-[var(--logo-primary)] fill-[var(--logo-primary)]" />
            <span className="text-sm font-semibold text-[var(--logo-dark)]">
              Starting at KSh {Math.min(...properties.map(p => p.dailyRate)).toLocaleString()}/night
            </span>
          </div>
        </div>
      </div>

      {/* Property Grid - Expanded Layout */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="cursor-pointer group"
              onClick={() => {
                setSelectedProperty(property);
                setCurrentPage('details');
              }}
            >
              {/* Property Image Card - Premium Airbnb Style */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 group cursor-pointer">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Guest Favorite Badge - Premium Style */}
                {property.rating >= 4.5 && (
                  <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-1.5">
                      <Star className="w-3.5 h-3.5 fill-[var(--logo-primary)] text-[var(--logo-primary)]" />
                      <span className="text-xs font-semibold text-gray-900">Guest favorite</span>
                </div>
                  </div>
                )}
                
                {/* Image Carousel Dots - Refined */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[1, 2, 3, 4, 5].map((dot, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-200 ${i === 0 ? 'bg-white w-6' : 'bg-white/60 w-1.5'}`}
                    />
                  ))}
                    </div>
                
                {/* Favorite Button - Premium Style */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newFavorites = new Set(favorites);
                    if (favorites.has(property.id)) {
                      newFavorites.delete(property.id);
                    } else {
                      newFavorites.add(property.id);
                    }
                    setFavorites(newFavorites);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm"
                >
                  <Heart 
                    className={`w-5 h-5 transition-all duration-200 ${favorites.has(property.id) ? 'fill-[var(--logo-primary)] text-[var(--logo-primary)] scale-110' : 'text-gray-700'}`} 
                  />
                </button>
              </div>
              
              {/* Property Details - Premium Airbnb Style with Amenities & Host Info */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[15px] text-gray-900 leading-tight line-clamp-1 group-hover:text-[var(--logo-primary)] transition-colors cursor-pointer">
                      {property.title}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-600 truncate">{property.location}</p>
                    </div>
                    {/* MyStore Storage Info */}
                    {property.category === 'store' && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded capitalize">
                            {property.storageType || 'Unit'}
                          </span>
                          {property.length && property.width && property.height && (
                            <span className="text-xs text-gray-600">
                              {property.length}×{property.width}×{property.height}cm
                            </span>
                          )}
                        </div>
                        {property.sizeSqm && (
                          <p className="text-xs text-gray-500">
                            {property.sizeSqm} sq/m
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Amenities Preview - Show when category is active */}
                {activeCategory && property.amenities && property.amenities.length > 0 && (
                  <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                    {property.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">+{property.amenities.length - 3}</span>
                    )}
                  </div>
                )}
                
                {/* Host Info - Show when category is active */}
                {activeCategory && property.host && (
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <User className="w-3 h-3" />
                    <span>Host: {property.host}</span>
                    {property.caretaker && (
                      <>
                        <span>·</span>
                        <span>Caretaker: {property.caretaker}</span>
                      </>
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-1.5 text-sm">
                    <div className="flex items-center space-x-1">
                    <Star className="w-[14px] h-[14px] fill-black text-black" />
                    <span className="font-semibold text-gray-900">{property.rating}</span>
                    </div>
                    <span className="text-gray-400">·</span>
                  <span className="text-gray-600 underline cursor-pointer hover:text-gray-900 transition-colors">
                    {property.reviews} {property.reviews === 1 ? 'review' : 'reviews'}
                  </span>
                  </div>
                
                <div className="pt-0.5">
                  <span className="text-[15px] font-semibold text-gray-900">
                    KSh {property.dailyRate.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 font-normal"> night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="group relative glass p-8 rounded-3xl card-shadow hover:card-shadow-hover transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-gray-900">Short & Long Stay</h3>
            <p className="text-gray-600 leading-relaxed mb-4">Budget accommodation for countryside travelers. Perfect for those seeking decent accommodation in smaller towns and rural areas with flexible duration options.</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full pulse-animation"></div>
              <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full pulse-animation" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-gradient-to-br from-[var(--logo-primary)] to-[var(--logo-accent)] rounded-full pulse-animation" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
        
        <div className="group relative glass p-8 rounded-3xl card-shadow hover:card-shadow-hover transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-gray-900">Student Longstay</h3>
            <p className="text-gray-600 leading-relaxed mb-4">Extensions linking students to schools and connecting property owners around schools with students. Monthly & semester stays for students near educational institutions.</p>
            <button 
              onClick={() => {
                alert('Student Longstay connects students with property owners around schools. Find accommodation near your school and get linked to nearby educational institutions.');
              }}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold"
            >
              Find Properties Near Schools
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full pulse-animation"></div>
              <div className="w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full pulse-animation" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full pulse-animation" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
        
        <div className="group relative glass p-8 rounded-3xl card-shadow hover:card-shadow-hover transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--logo-primary)]/20 to-[var(--logo-accent)]/20 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--logo-primary)] to-[var(--logo-accent)] rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-gray-900">Host Exchange</h3>
            <p className="text-gray-600 leading-relaxed mb-4">The same families can host people traveling. Reciprocal hosting where families host each other's members when traveling.</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-br from-[var(--logo-primary)] to-[var(--logo-accent)] rounded-full pulse-animation"></div>
              <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full pulse-animation" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full pulse-animation" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose MyHost - Compact Section */}
      <div className="bg-white py-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Why choose MyHost? ✨
            </h2>
            <p className="text-lg text-gray-600">Connecting countryside homeowners with travelers</p>
          </div>

          {/* Stats Row - Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Home className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">150+</p>
              <p className="text-xs text-gray-600">Properties</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">5,000+</p>
              <p className="text-xs text-gray-600">Guests</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">20+</p>
              <p className="text-xs text-gray-600">Locations</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
          </div>

          {/* Key Benefits Grid - Compact */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">
                Industry-standard encryption protects all transactions.
              </p>
            </div>

            <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Properties</h3>
              <p className="text-sm text-gray-600">
                All properties are verified and quality-checked.
              </p>
            </div>

            <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Round-the-clock customer support available.
              </p>
            </div>

            <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Booking</h3>
              <p className="text-sm text-gray-600">
                Book instantly with confirmed reservations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Combined Section */}
      <div className="bg-white py-12">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              How it works 🏡
            </h2>
            <p className="text-lg text-gray-600">Simple steps for hosts and travelers</p>
          </div>

          {/* Combined Grid - Hosts and Travelers */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Hosts */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Hosts</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: "1", title: "List Property", description: "Create listing with photos and pricing" },
                  { step: "2", title: "Set Availability", description: "Control your calendar" },
                  { step: "3", title: "Receive Bookings", description: "Get instant notifications" },
                  { step: "4", title: "Get Paid", description: "Secure payments to your account" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <span className="text-lg font-bold text-blue-600">{item.step}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Travelers */}
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Travelers</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Browse Properties", description: "Search by location, dates, and price" },
                  { step: "2", title: "Book & Pay", description: "Secure online booking and payment" },
                  { step: "3", title: "Check-In", description: "Enjoy caretaker-managed stays" },
                  { step: "4", title: "Review", description: "Share your experience" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <span className="text-lg font-bold text-green-600">{item.step}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 bg-orange-500 py-12 px-4">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* Quick Links */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => setCurrentPage('home')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setCurrentPage('properties')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Browse Properties
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('student')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Student Longstay
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('store')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        MyStore Units
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setCurrentPage('host')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Become a Host
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => alert('Help Center - In production, this would open a help center page.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Help Center
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => alert('Contact Us - Email: support@myhost.com\nPhone: +254 XXX XXX XXX')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Contact Us
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => alert('FAQs - Frequently asked questions about bookings, payments, and hosting.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        FAQs
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => alert('Safety Tips - Important safety information for guests and hosts.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Safety Tips
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Cookie Policy */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => alert('Cookie Policy - We use cookies to enhance your experience. By using our site, you agree to our use of cookies.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Cookie Policy
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => alert('Privacy Policy - How we collect, use, and protect your personal information.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => alert('Terms of Service - Terms and conditions for using MyHost platform.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Terms of Service
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => alert('Refund Policy - Information about refunds and cancellations.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Refund Policy
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Accessibility */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Accessibility</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => alert('Accessibility Statement - MyHost is committed to making our platform accessible to all users.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Accessibility Statement
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          // Increase font size or other accessibility features
                          alert('Accessibility Features - Options to adjust text size, contrast, and other accessibility settings.');
                        }}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Accessibility Features
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => alert('Report an Issue - Report accessibility issues or request accommodations.')}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        Report an Issue
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="border-t border-white/20 pt-8 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-white/80 text-sm mb-4 md:mb-0">
                    © {new Date().getFullYear()} MyHost. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setCurrentPage('home')}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <img 
                        src="/myhost-logo.png" 
                        alt="MyHost Logo" 
                        className="h-8 w-auto"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PropertiesPage = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Home className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-4xl font-bold">Available Properties</h1>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
            <input
              type="text"
              placeholder="e.g. Kisumu"
              value={bookingForm.location}
              onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Check In</label>
            <input
              type="date"
              value={bookingForm.checkIn}
              onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Check Out</label>
            <input
              type="date"
              value={bookingForm.checkOut}
              onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Guests</label>
            <input
              type="number"
              min="1"
              value={bookingForm.guests}
              onChange={(e) => setBookingForm(b => ({ ...b, guests: parseInt(e.target.value, 10) || 1 }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-red-300" onClick={() => {
            setSelectedProperty(property);
            setCurrentPage('details');
          }}>
            <div className="relative">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
              <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg">
                <Star className="w-5 h-5 text-yellow-500" fill="currentColor" stroke="none" />
              </div>
              <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {property.rooms} Rooms
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{property.title}</h3>
                <div className="flex items-center text-yellow-500">
                  <span className="ml-1 text-sm font-semibold">{property.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-sm">{property.location}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{property.description}</p>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-sm text-gray-500">{property.reviews} reviews</span>
                <span className="font-bold text-red-600 text-lg">KSh {property.dailyRate}/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Favorites Page
  const FavoritesPage = () => {
    const favoriteProperties = properties.filter(p => favorites.has(p.id));
    
    return (
      <div className="pb-12">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Your Favorites</h1>
              <p className="text-lg text-gray-600">{favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved</p>
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 px-5 py-3 text-base font-bold text-black bg-white border-4 border-black rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          
          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {favoriteProperties.map((property) => (
                <div
                  key={property.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedProperty(property);
                    setCurrentPage('details');
                  }}
                >
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newFavorites = new Set(favorites);
                        newFavorites.delete(property.id);
                        setFavorites(newFavorites);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg"
                    >
                      <Heart className="w-5 h-5 fill-[var(--logo-primary)] text-[var(--logo-primary)]" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-[15px] text-gray-900">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <div className="flex items-center space-x-1.5 text-sm">
                      <Star className="w-[14px] h-[14px] fill-black text-black" />
                      <span className="font-semibold">{property.rating}</span>
                    </div>
                    <div className="text-[15px] font-semibold text-gray-900">
                      KSh {property.dailyRate.toLocaleString()} <span className="text-sm text-gray-600 font-normal">night</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-600 mb-6">Start saving properties you love!</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="px-8 py-4 bg-gradient-to-r from-[var(--logo-primary)] via-[var(--logo-secondary)] to-[var(--logo-primary)] text-white rounded-full font-extrabold text-base hover:from-[var(--logo-dark)] hover:via-[var(--logo-primary)] hover:to-[var(--logo-dark)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[var(--logo-primary)]/30 hover:scale-105 active:scale-95 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Browse Properties</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Search Page - Premium Design Matching Home Page
  const SearchPage = () => {
    return (
      <div className="pb-12">
        {/* Back Button */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 px-5 py-3 text-base font-bold text-black bg-white border-4 border-black rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
        {/* Hero Section - Matching Home Page Style */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--logo-primary)] via-[var(--logo-secondary)] to-[var(--logo-accent)] mb-6 shadow-2xl">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight gradient-text-premium">
              🔍 Search Properties
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-5 max-w-3xl mx-auto leading-relaxed font-light">
              Find your perfect countryside accommodation
            </p>
            
            {/* Enhanced Search Input */}
            <div className="max-w-3xl mx-auto mt-8 relative">
              <div className={`flex items-center w-full bg-white border-2 rounded-full px-8 py-6 shadow-xl transition-all ${
                searchFocused 
                  ? 'border-[var(--logo-primary)] shadow-2xl shadow-[var(--logo-primary)]/30 scale-105' 
                  : 'border-gray-300 hover:border-[var(--logo-primary)]'
              }`}>
                <Search className="w-7 h-7 text-[var(--logo-primary)] mr-4 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => {
                    setSearchFocused(true);
                    setShowSearchSuggestions(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setSearchFocused(false);
                      setShowSearchSuggestions(false);
                    }, 200);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setShowSearchSuggestions(false);
                      setCurrentPage('home');
                    } else if (e.key === 'Escape') {
                      setShowSearchSuggestions(false);
                      setSearchFocused(false);
                    }
                  }}
                  placeholder="Search by location, property name, amenities..."
                  className="flex-1 border-none outline-none text-lg text-gray-900 placeholder-gray-400 bg-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchSuggestions(false);
                    }}
                    className="mr-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setShowSearchSuggestions(false);
                      setCurrentPage('home');
                    }
                  }}
                  className="ml-2 bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white rounded-full px-8 py-3 hover:from-[var(--logo-dark)] hover:to-[var(--logo-primary)] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
              
              {/* Search Suggestions Dropdown for Search Page */}
              {showSearchSuggestions && (searchQuery || searchFocused) && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-[var(--logo-primary)] rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {searchQuery && searchSuggestions.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200 bg-gray-50">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-1">Search Results</div>
                      </div>
                      {searchSuggestions.map((suggestion, idx) => {
                        if (typeof suggestion === 'string') {
                          // Location suggestion
                          return (
                            <div
                              key={`loc-${idx}`}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                setShowSearchSuggestions(false);
                                setCurrentPage('home');
                              }}
                              className="flex items-center space-x-3 px-5 py-4 hover:bg-[var(--logo-primary)]/10 cursor-pointer transition-colors group border-b border-gray-100 last:border-0"
                            >
                              <div className="w-10 h-10 bg-[var(--logo-primary)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--logo-primary)]/20 transition-colors">
                                <MapPin className="w-5 h-5 text-[var(--logo-primary)]" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-base">{suggestion}</div>
                                <div className="text-sm text-gray-500">Location</div>
                              </div>
                              <ChevronDown className="w-5 h-5 text-gray-400 rotate-[-90deg] group-hover:text-[var(--logo-primary)] transition-colors" />
                            </div>
                          );
                        } else {
                          // Property suggestion
                          return (
                            <div
                              key={`prop-${suggestion.id}`}
                              onClick={() => {
                                setSearchQuery(suggestion.title);
                                setShowSearchSuggestions(false);
                                const prop = properties.find(p => p.id === suggestion.id);
                                if (prop) {
                                  setSelectedProperty(prop);
                                  setCurrentPage('details');
                                }
                              }}
                              className="flex items-center space-x-3 px-5 py-4 hover:bg-[var(--logo-primary)]/10 cursor-pointer transition-colors group border-b border-gray-100 last:border-0"
                            >
                              <div className="w-10 h-10 bg-[var(--logo-secondary)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--logo-secondary)]/20 transition-colors">
                                <Home className="w-5 h-5 text-[var(--logo-secondary)]" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-base">{suggestion.title}</div>
                                <div className="text-sm text-gray-500">{suggestion.location}</div>
                              </div>
                              <ChevronDown className="w-5 h-5 text-gray-400 rotate-[-90deg] group-hover:text-[var(--logo-primary)] transition-colors" />
                            </div>
                          );
                        }
                      })}
                    </div>
                  ) : !searchQuery ? (
                    <div className="p-6">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">Popular Destinations</div>
                      <div className="flex flex-wrap gap-3">
                        {popularDestinations.map((dest, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSearchQuery(dest);
                              setShowSearchSuggestions(false);
                              setCurrentPage('home');
                            }}
                            className="px-5 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[var(--logo-primary)]/10 hover:to-[var(--logo-secondary)]/10 border border-gray-200 hover:border-[var(--logo-primary)] rounded-full text-sm font-semibold text-gray-700 hover:text-[var(--logo-primary)] transition-all hover:scale-105 shadow-sm hover:shadow-md"
                          >
                            <MapPin className="w-4 h-4 inline mr-2" />
                            {dest}
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Quick Tips</div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-[var(--logo-primary)]" />
                            <span>Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to search</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-[var(--logo-primary)]" />
                            <span>Type location or property name</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-1">No results found</p>
                      <p className="text-sm text-gray-500 mb-4">Try searching with different keywords</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setShowSearchSuggestions(false);
                        }}
                        className="px-4 py-2 text-sm text-[var(--logo-primary)] hover:bg-[var(--logo-primary)]/10 rounded-lg transition-colors font-medium"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                Search Results
              </h2>
              <p className="text-lg text-gray-600 font-light">
                {filteredProperties.length > 0 ? (
                  <>
                    <span className="font-semibold text-[var(--logo-primary)]">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'} found
                  </>
                ) : (
                  <span className="text-orange-600 font-medium">No properties found. Try a different search.</span>
                )}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentPage('home');
              }}
              className="px-6 py-3 text-sm font-semibold bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-all hover:scale-105 shadow-md"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Properties Grid - Premium Style */}
        {filteredProperties.length > 0 ? (
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedProperty(property);
                    setCurrentPage('details');
                  }}
                >
                  {/* Property Image Card - Premium Airbnb Style */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 group cursor-pointer">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Guest Favorite Badge */}
                    {property.rating >= 4.5 && (
                      <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-1.5">
                          <Star className="w-3.5 h-3.5 fill-[var(--logo-primary)] text-[var(--logo-primary)]" />
                          <span className="text-xs font-semibold text-gray-900">Guest favorite</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newFavorites = new Set(favorites);
                        if (favorites.has(property.id)) {
                          newFavorites.delete(property.id);
                        } else {
                          newFavorites.add(property.id);
                        }
                        setFavorites(newFavorites);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all duration-200 ${favorites.has(property.id) ? 'fill-[var(--logo-primary)] text-[var(--logo-primary)] scale-110' : 'text-gray-700'}`} 
                      />
                    </button>
                  </div>
                  
                  {/* Property Details */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[15px] text-gray-900 leading-tight line-clamp-1 group-hover:text-[var(--logo-primary)] transition-colors cursor-pointer">
                          {property.title}
                        </h3>
                        <div className="flex items-center space-x-1 mt-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <p className="text-sm text-gray-600 truncate">{property.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-[14px] h-[14px] fill-black text-black" />
                        <span className="font-semibold text-gray-900">{property.rating}</span>
                      </div>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-600 underline cursor-pointer hover:text-gray-900 transition-colors">
                        {property.reviews} {property.reviews === 1 ? 'review' : 'reviews'}
                      </span>
                    </div>
                    
                    <div className="pt-0.5">
                      <span className="text-[15px] font-semibold text-gray-900">
                        KSh {property.dailyRate.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600 font-normal"> night</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
            <div className="text-center">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No properties found</h3>
              <p className="text-lg text-gray-600 mb-6">Try searching with different keywords</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage('home');
                }}
                className="px-8 py-3 bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white rounded-full font-semibold hover:from-[var(--logo-dark)] hover:to-[var(--logo-primary)] transition-all shadow-lg hover:scale-105"
              >
                Browse All Properties
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Category Page - Premium Design Matching Home Page
  const CategoryPage = () => {
    if (!activeCategory) {
      setCurrentPage('home');
      return null;
    }

    const categoryProperties = properties.filter(p => {
      if (activeCategory === 'group') {
        return p.rooms >= 3;
      } else if (activeCategory === 'student') {
        return p.dailyRate <= 3500;
      }
      return true;
    });

    const categoryInfo = {
      'properties': {
        title: '🏠 All Properties',
        description: 'Browse all available countryside stays with urban ambience',
        icon: Home,
        gradient: 'from-blue-500 via-blue-600 to-indigo-700'
      },
      'group': {
        title: '👥 Group Hosting',
        description: 'Perfect for families and groups - properties with 3+ rooms',
        icon: Users,
        gradient: 'from-green-500 via-emerald-600 to-teal-700'
      },
      'exchange': {
        title: '🌍 Host Exchange',
        description: 'The same families can host people traveling - reciprocal hosting between families',
        icon: Globe,
        gradient: 'from-purple-500 via-pink-600 to-rose-700'
      },
      'student': {
        title: '⭐ Student Longstay',
        description: 'Extensions linking students to schools and property owners around schools with students',
        icon: Star,
        gradient: 'from-orange-500 via-amber-600 to-yellow-700'
      },
      'store': {
        title: '✨ MyStore Units',
        description: 'Rent commercial spaces like garages and warehouses for your business needs',
        icon: Sparkles,
        gradient: 'from-cyan-500 via-blue-600 to-indigo-700'
      }
    };

    const info = categoryInfo[activeCategory];

    return (
      <div className="pb-12">
        {/* Back Button */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <button 
            onClick={() => {
              setActiveCategory(null);
              setCurrentPage('home');
            }}
            className="flex items-center space-x-2 px-5 py-3 text-base font-bold text-black bg-white border-4 border-black rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
        {/* Hero Section - Matching Home Page Style */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${info.gradient} mb-6 shadow-2xl`}>
              <info.icon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight gradient-text-premium">
              {info.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-5 max-w-3xl mx-auto leading-relaxed font-light">
              {info.description}
            </p>
            <div className="flex items-center justify-center space-x-2 px-6 py-3.5 border-2 border-[var(--logo-primary)]/30 rounded-full bg-gradient-to-r from-[var(--logo-primary)]/10 via-[var(--logo-secondary)]/10 to-[var(--logo-accent)]/10 backdrop-blur-sm inline-flex shadow-lg glow-pink hover:shadow-xl hover:scale-105 transition-all border-glow">
              <Star className="w-5 h-5 text-[var(--logo-primary)] fill-pink-600 animate-pulse" />
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)]">
                {categoryProperties.length} {categoryProperties.length === 1 ? 'Property' : 'Properties'} Available
              </span>
            </div>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                {info.title} - Available Properties
              </h2>
              <p className="text-lg text-gray-600 font-light">
                {categoryProperties.length > 0 ? (
                  <>
                    <span className="font-semibold text-[var(--logo-primary)]">{categoryProperties.length}</span> {categoryProperties.length === 1 ? 'property' : 'properties'} ready for booking
                  </>
                ) : (
                  <span className="text-orange-600 font-medium">No properties found in this category</span>
                )}
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory(null);
                setCurrentPage('home');
              }}
              className="px-6 py-3 text-sm font-semibold bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-all hover:scale-105 shadow-md"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Properties Grid - Premium Style */}
        {categoryProperties.length > 0 ? (
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {categoryProperties.map((property) => (
                <div
                  key={property.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedProperty(property);
                    setCurrentPage('details');
                  }}
                >
                  {/* Property Image Card - Premium Airbnb Style */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 group cursor-pointer">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Guest Favorite Badge */}
                    {property.rating >= 4.5 && (
                      <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-1.5">
                          <Star className="w-3.5 h-3.5 fill-[var(--logo-primary)] text-[var(--logo-primary)]" />
                          <span className="text-xs font-semibold text-gray-900">Guest favorite</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newFavorites = new Set(favorites);
                        if (favorites.has(property.id)) {
                          newFavorites.delete(property.id);
                        } else {
                          newFavorites.add(property.id);
                        }
                        setFavorites(newFavorites);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all duration-200 ${favorites.has(property.id) ? 'fill-[var(--logo-primary)] text-[var(--logo-primary)] scale-110' : 'text-gray-700'}`} 
                      />
                    </button>
                  </div>
                  
                  {/* Property Details - Premium Style with Amenities & Host Info */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[15px] text-gray-900 leading-tight line-clamp-1 group-hover:text-[var(--logo-primary)] transition-colors cursor-pointer">
                          {property.title}
                        </h3>
                        <div className="flex items-center space-x-1 mt-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <p className="text-sm text-gray-600 truncate">{property.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amenities Preview */}
                    {property.amenities && property.amenities.length > 0 && (
                      <div className="flex items-center space-x-1.5 flex-wrap gap-1.5 mt-2">
                        <span className="text-xs font-semibold text-gray-500">Amenities:</span>
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gradient-to-r from-[var(--logo-primary)]/10 to-[var(--logo-secondary)]/10 text-gray-700 rounded-full border border-[var(--logo-primary)]/20 font-medium">
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-xs text-gray-500 font-medium">+{property.amenities.length - 3}</span>
                        )}
                      </div>
                    )}
                    
                    {/* Host Info */}
                    {property.host && (
                      <div className="flex items-start space-x-2 text-xs text-gray-700 mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <User className="w-3.5 h-3.5 text-[var(--logo-primary)] mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-xs mb-0.5">Host: {property.host}</div>
                          {property.caretaker && (
                            <div className="text-gray-600 text-xs">Caretaker: {property.caretaker}</div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-1.5 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-[14px] h-[14px] fill-black text-black" />
                        <span className="font-semibold text-gray-900">{property.rating}</span>
                      </div>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-600 underline cursor-pointer hover:text-gray-900 transition-colors">
                        {property.reviews} {property.reviews === 1 ? 'review' : 'reviews'}
                      </span>
                    </div>
                    
                    <div className="pt-0.5">
                      <span className="text-[15px] font-semibold text-gray-900">
                        KSh {property.dailyRate.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600 font-normal"> night</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
            <div className="text-center">
              <div className="text-8xl mb-6">🏠</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No properties found</h3>
              <p className="text-lg text-gray-600 mb-6">We couldn't find any properties matching this category</p>
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setCurrentPage('home');
                }}
                className="px-8 py-3 bg-gradient-to-r from-[var(--logo-primary)] to-[var(--logo-secondary)] text-white rounded-full font-semibold hover:from-[var(--logo-dark)] hover:to-[var(--logo-primary)] transition-all shadow-lg hover:scale-105"
              >
                Browse All Properties
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Property Details - Airbnb Style
  const PropertyDetails = () => {
    if (!selectedProperty) return null;
    
    const nights = calculateNights(bookingDetails.checkIn, bookingDetails.checkOut);
    const fees = calculateBookingFees(selectedProperty.dailyRate, nights || 1);
    const minDate = new Date().toISOString().split('T')[0];
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => {
            setSelectedProperty(null);
            setCurrentPage('home');
          }}
            className="flex items-center space-x-2 px-5 py-3 mb-6 text-base font-bold text-white bg-orange-600 border-4 border-orange-700 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div>
              <h1 className="text-3xl font-semibold mb-2">{selectedProperty.title}</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="w-5 h-5 fill-black" />
                <span className="font-medium">{selectedProperty.rating}</span>
                <span>·</span>
                <span className="underline">{selectedProperty.reviews} reviews</span>
                <span>·</span>
                <MapPin className="w-4 h-4" />
                <span className="underline">{selectedProperty.location}</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
              <div className="col-span-2 row-span-2 h-96">
                <img
                  src={selectedProperty.images?.[0] || selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedProperty.images?.slice(1, 3).map((img, idx) => (
                <div key={idx} className="h-48">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Description */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                    <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
                  </div>

                  {/* Student Longstay - School Information */}
                  {selectedProperty.category === 'student' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                      <h3 className="text-lg font-semibold mb-4 text-blue-900">Student-School Connection</h3>
                      <p className="text-gray-700 mb-4">This extension links students to schools and connects property owners around schools with students. You'll receive:</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">Direct connection to nearby schools and colleges</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">Property owners around schools with student accommodation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">Transportation options and student-friendly amenities</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          alert('Student Longstay extension connects you with property owners around schools. Find accommodation near your educational institution and get linked to nearby schools.');
                        }}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                      >
                        Connect to Schools & Property Owners
                      </button>
                    </div>
                  )}

                  {/* MyStore Specific Information */}
                  {selectedProperty.category === 'store' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-4">
                      <h3 className="text-lg font-semibold mb-4 text-orange-900">Storage Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Storage Type</p>
                          <p className="font-semibold text-gray-900 capitalize">{selectedProperty.storageType || 'Unit'}</p>
                        </div>
                        {selectedProperty.length && selectedProperty.width && selectedProperty.height && (
                          <>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Dimensions</p>
                              <p className="font-semibold text-gray-900">
                                {selectedProperty.length}cm × {selectedProperty.width}cm × {selectedProperty.height}cm
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Floor Area</p>
                              <p className="font-semibold text-gray-900">
                                {selectedProperty.sizeSqm || ((parseFloat(selectedProperty.length) * parseFloat(selectedProperty.width) / 10000).toFixed(2))} sq/m
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Volume</p>
                              <p className="font-semibold text-gray-900">
                                {((parseFloat(selectedProperty.length) * parseFloat(selectedProperty.width) * parseFloat(selectedProperty.height)) / 1000000).toFixed(2)} m³
                              </p>
                            </div>
                          </>
                        )}
                        {selectedProperty.rateType && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Rate Type</p>
                            <p className="font-semibold text-gray-900 capitalize">{selectedProperty.rateType}</p>
                          </div>
                        )}
                        {selectedProperty.availableFrom && selectedProperty.availableTo && (
                          <>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Available From</p>
                              <p className="font-semibold text-gray-900">{new Date(selectedProperty.availableFrom).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Available To</p>
                              <p className="font-semibold text-gray-900">{new Date(selectedProperty.availableTo).toLocaleDateString()}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">What this place offers</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProperty.amenities && selectedProperty.amenities.length > 0 ? (
                        selectedProperty.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                            </div>
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No amenities listed</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Host Info */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Meet your host</h3>
                  <div className="space-y-2 mb-4">
                    <p className="font-medium">{selectedProperty.host}</p>
                    <p className="text-sm text-gray-600">Host · {selectedProperty.reviews} reviews</p>
                  </div>
                  <button 
                    onClick={() => {
                      const bookingKey = `${selectedProperty.id}-${bookingDetails.checkIn}-${bookingDetails.checkOut}`;
                      if (!paidBookings.has(bookingKey)) {
                        alert('Please complete payment first before contacting the host. Payment is required to access host contact information.');
                        return;
                      }
                      // Contact host functionality - in production, this would open a messaging interface
                      alert(`Contacting ${selectedProperty.host}...\n\nIn production, this would open a messaging interface.`);
                    }}
                    className={`w-full border-2 border-orange-700 rounded-xl px-6 py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group ${
                      paidBookings.has(`${selectedProperty.id}-${bookingDetails.checkIn}-${bookingDetails.checkOut}`)
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-400'
                    }`}
                  >
                    <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{paidBookings.has(`${selectedProperty.id}-${bookingDetails.checkIn}-${bookingDetails.checkOut}`) ? 'Contact host' : 'Complete payment to contact host'}</span>
                  </button>
                </div>

                {/* Caretaker Info */}
                {selectedProperty.caretaker && (
                  <div className="border border-gray-200 rounded-xl p-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Meet your caretaker</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      {selectedProperty.caretakerPhoto && (
                        <img 
                          src={selectedProperty.caretakerPhoto} 
                          alt={selectedProperty.caretaker}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                        />
                      )}
                      <div>
                        <p className="font-medium">{selectedProperty.caretaker}</p>
                        <p className="text-sm text-gray-600">Property Caretaker</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Your caretaker will assist you during your stay and ensure everything is in order.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Premium Booking Card - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass rounded-3xl p-8 card-shadow border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-3xl font-extrabold gradient-text">KSh {selectedProperty.dailyRate}</span>
                  <span className="text-gray-600 font-medium"> / night</span>
                </div>
              </div>

              {/* Premium Date Picker */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="glass border border-white/30 rounded-xl p-4 hover:border-rose-300 transition-colors">
                  <label className="text-xs font-bold text-gray-700 mb-2 block">CHECK-IN</label>
                  <input
                    type="date"
                    min={minDate}
                    value={bookingDetails.checkIn}
                    onChange={(e) => setBookingDetails({...bookingDetails, checkIn: e.target.value})}
                    className="w-full border-none outline-none text-sm font-medium text-gray-900 bg-transparent"
                  />
                </div>
                <div className="glass border border-white/30 rounded-xl p-4 hover:border-rose-300 transition-colors">
                  <label className="text-xs font-bold text-gray-700 mb-2 block">CHECKOUT</label>
                  <input
                    type="date"
                    min={bookingDetails.checkIn || minDate}
                    value={bookingDetails.checkOut}
                    onChange={(e) => setBookingDetails({...bookingDetails, checkOut: e.target.value})}
                    className="w-full border-none outline-none text-sm font-medium text-gray-900 bg-transparent"
                  />
                </div>
              </div>

              {/* Premium Guests Input */}
              <div className="glass border border-white/30 rounded-xl p-4 mb-6 hover:border-rose-300 transition-colors">
                <label className="text-xs font-bold text-gray-700 mb-2 block">GUESTS</label>
                <input
                  type="number"
                  min="1"
                  value={bookingDetails.guests}
                  onChange={(e) => setBookingDetails({...bookingDetails, guests: parseInt(e.target.value) || 1})}
                  className="w-full border-none outline-none text-sm font-medium text-gray-900 bg-transparent"
                />
              </div>

              {/* Premium Price Breakdown */}
              {nights > 0 && (
                <div className="space-y-4 mb-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">KSh {selectedProperty.dailyRate} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span className="font-semibold text-gray-900">KSh {fees.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Service fee</span>
                    <span className="font-semibold text-gray-900">KSh {fees.guestFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-lg pt-4 border-t-2 border-gray-200">
                    <span className="gradient-text">Total</span>
                    <span className="gradient-text">KSh {fees.total.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Premium Reserve Button */}
              <button
                onClick={() => {
                  if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
                    alert('Please select check-in and check-out dates');
                    return;
                  }
                  if (nights <= 0) {
                    alert('Check-out date must be after check-in date');
                    return;
                  }
                  // Show booking form to collect all required information
                  setShowBookingForm(true);
                }}
                className="w-full bg-orange-600 text-white py-5 rounded-xl font-extrabold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 relative overflow-hidden group border-2 border-orange-700"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Reserve</span>
                  </span>
              </button>

              <p className="text-xs text-center text-gray-500 mt-4 font-medium">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HostDashboard = () => (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 space-y-6">
      {/* Back Button */}
      <button 
        onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 px-5 py-3 mb-6 text-base font-bold text-white bg-orange-600 border-4 border-orange-700 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[var(--logo-primary)] via-[var(--logo-secondary)] to-[var(--logo-accent)] bg-clip-text text-transparent">Host Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your properties and listings</p>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
        <div className="space-y-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              value={newProperty.category}
              onChange={(e) => setNewProperty({...newProperty, category: e.target.value})}
              className="w-full p-2 border rounded-lg"
            >
              <option value="properties">Properties</option>
              <option value="group">Group Hosting</option>
              <option value="exchange">Host Exchange</option>
              <option value="student">Student Longstay</option>
              <option value="store">MyStore Units</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property Title</label>
              <input
                type="text"
                value={newProperty.title}
                onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g. Lakeside Villa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={newProperty.location}
                onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g. Kisumu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={newProperty.description}
              onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Describe your property..."
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Property Photos *</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg"
              disabled={uploadingImages}
            />
            {uploadingImages && <p className="text-sm text-gray-500 mt-1">Uploading images...</p>}
            {newProperty.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {newProperty.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                    <button
                      onClick={() => setNewProperty({...newProperty, images: newProperty.images.filter((_, i) => i !== idx)})}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conditional Fields based on Category */}
          {newProperty.category !== 'store' ? (
            <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
                  <label className="block text-sm font-medium mb-2">Number of Rooms *</label>
              <input
                type="number"
                min="1"
                value={newProperty.rooms}
                onChange={(e) => setNewProperty({...newProperty, rooms: parseInt(e.target.value)})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
                  <label className="block text-sm font-medium mb-2">Daily Rate (KSh) *</label>
              <input
                type="number"
                min="0"
                value={newProperty.dailyRate}
                onChange={(e) => setNewProperty({...newProperty, dailyRate: parseInt(e.target.value)})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amenities (comma-separated)</label>
            <input
              type="text"
              value={newProperty.amenities}
              onChange={(e) => setNewProperty({...newProperty, amenities: e.target.value})}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g. WiFi, Pool, Garden, Parking"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
                  <label className="block text-sm font-medium mb-2">Host Name *</label>
              <input
                type="text"
                value={newProperty.host}
                onChange={(e) => setNewProperty({...newProperty, host: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
                  <label className="block text-sm font-medium mb-2">Caretaker Name *</label>
              <input
                type="text"
                value={newProperty.caretaker}
                onChange={(e) => setNewProperty({...newProperty, caretaker: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
            </>
          ) : (
            <>
              {/* Storage Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Storage Type *</label>
                <select
                  value={newProperty.storageType}
                  onChange={(e) => setNewProperty({...newProperty, storageType: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="unit">Storage Unit</option>
                  <option value="garage">Garage</option>
                </select>
              </div>

              {/* Dimensions */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Length (cm) *</label>
                  <input
                    type="number"
                    min="1"
                    value={newProperty.length}
                    onChange={(e) => setNewProperty({...newProperty, length: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="e.g. 300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Width (cm) *</label>
                  <input
                    type="number"
                    min="1"
                    value={newProperty.width}
                    onChange={(e) => setNewProperty({...newProperty, width: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="e.g. 200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height (cm) *</label>
                  <input
                    type="number"
                    min="1"
                    value={newProperty.height}
                    onChange={(e) => setNewProperty({...newProperty, height: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="e.g. 250"
                  />
                </div>
              </div>
              
              {/* Calculated Size Display */}
              {newProperty.length && newProperty.width && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-orange-800">
                    Calculated Size: {((parseFloat(newProperty.length) || 0) * (parseFloat(newProperty.width) || 0) / 10000).toFixed(2)} sq/m
                    {newProperty.height && ` • Volume: ${((parseFloat(newProperty.length) || 0) * (parseFloat(newProperty.width) || 0) * (parseFloat(newProperty.height) || 0) / 1000000).toFixed(2)} m³`}
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Storage Rate Type *</label>
                  <select
                    value={newProperty.rateType}
                    onChange={(e) => setNewProperty({...newProperty, rateType: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
            </div>
          </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rate (KSh) *</label>
                  <input
                    type="number"
                    min="0"
                    value={newProperty.dailyRate}
                    onChange={(e) => setNewProperty({...newProperty, dailyRate: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-lg"
                    placeholder={`Rate per ${newProperty.rateType}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Host Name *</label>
                  <input
                    type="text"
                    value={newProperty.host}
                    onChange={(e) => setNewProperty({...newProperty, host: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Available From *</label>
                  <input
                    type="date"
                    value={newProperty.availableFrom}
                    onChange={(e) => setNewProperty({...newProperty, availableFrom: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Available To *</label>
                  <input
                    type="date"
                    value={newProperty.availableTo}
                    min={newProperty.availableFrom}
                    onChange={(e) => setNewProperty({...newProperty, availableTo: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </>
          )}

          <button 
            onClick={handleAddProperty} 
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 relative overflow-hidden group border-2 border-orange-700"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add Property</span>
            </span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Properties ({properties.length})</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {properties.map(property => (
            <div key={property.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="font-bold">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-red-600 font-semibold mt-2">KSh {property.dailyRate}/day</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--logo-primary)]/3 via-[var(--logo-secondary)]/3 to-[var(--logo-accent)]/3">
      <Header />
      {currentPage === 'home' && <FilterBar />}
      
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'properties' && <HomePage />}
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'category' && <CategoryPage />}
        {currentPage === 'details' && <PropertyDetails />}
        {currentPage === 'host' && <HostDashboard />}
        {currentPage === 'admin' && <AdminDashboard />}
        {currentPage === 'favorites' && <FavoritesPage />}
      </main>

      {/* Date Picker Overlay */}
      {showDatePicker && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowDatePicker(false);
            setSelectedDateType(null);
          }}
        ></div>
      )}

      {/* Filter Overlays */}
      {(showPriceFilter || showAmenitiesFilter || showRoomsFilter || showTypeFilter || showSortMenu) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowPriceFilter(false);
            setShowAmenitiesFilter(false);
            setShowRoomsFilter(false);
            setShowTypeFilter(false);
            setShowSortMenu(false);
          }}
        ></div>
      )}

      {/* Notifications & User Menu Overlay */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        ></div>
      )}

      {/* Search Suggestions Overlay */}
      {showSearchSuggestions && (
        <div 
          className="fixed inset-0 z-[60]" 
          onClick={() => {
            setShowSearchSuggestions(false);
            setSearchFocused(false);
          }}
        ></div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in">
          <div className="bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[var(--logo-primary)]/5 to-[var(--logo-secondary)]/5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
                <p className="text-xs text-gray-600 mt-0.5">Sign up to start booking</p>
              </div>
              <button 
                onClick={() => setShowSignup(false)} 
                className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:border-2 hover:border-red-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">First Name *</label>
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Telephone *</label>
                <input
                  type="tel"
                  className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                  placeholder="+254 700 000 000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Email *</label>
                <input
                  type="email"
                  className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">ID/Passport Number *</label>
                <input
                  type="text"
                  className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                  placeholder="For security purposes"
                />
                <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Required for security</span>
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Password *</label>
                <input
                  type="password"
                  className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button 
                onClick={() => {
                  handleSignupLogin({ email: 'user@example.com', firstName: 'John', lastName: 'Doe' });
                }}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-base hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 relative overflow-hidden group border-2 border-black"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Sign Up</span>
                </span>
              </button>
              <div className="text-center pt-1">
                <p className="text-xs text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setShowSignup(false);
                      setShowLogin(true);
                    }}
                    className="text-[var(--logo-primary)] font-semibold hover:underline"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in">
          <div className="bg-white border-4 border-[var(--logo-primary)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[var(--logo-secondary)]/5 to-[var(--logo-primary)]/5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-xs text-gray-600 mt-0.5">Log in to your account</p>
              </div>
              <button 
                onClick={() => setShowLogin(false)} 
                className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:border-2 hover:border-red-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Email *</label>
                <input
                  type="email"
                  className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Password *</label>
                <input
                  type="password"
                  className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--logo-primary)] focus:border-[var(--logo-primary)] transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 text-[var(--logo-primary)] rounded" />
                  <span className="text-xs text-gray-600">Remember me</span>
                </label>
                <button className="text-xs text-[var(--logo-primary)] font-semibold hover:underline">
                  Forgot password?
                </button>
              </div>
              <button 
                onClick={() => {
                  handleSignupLogin({ email: 'user@example.com', firstName: 'John', lastName: 'Doe' });
                }}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-base hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 relative overflow-hidden group border-2 border-black"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Log In</span>
                </span>
              </button>
              <div className="text-center pt-1">
                <p className="text-xs text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setShowLogin(false);
                      setShowSignup(true);
                    }}
                    className="text-[var(--logo-primary)] font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
              <button 
                onClick={() => setShowBookingForm(false)} 
                className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:border-2 hover:border-red-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedProperty.title}</h3>
                <p className="text-sm text-gray-600">{selectedProperty.location}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {bookingDetails.checkIn} to {bookingDetails.checkOut} · {nights} {nights === 1 ? 'night' : 'nights'} · {bookingDetails.guests} {bookingDetails.guests === 1 ? 'guest' : 'guests'}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm mb-1">
                    <span>KSh {selectedProperty.dailyRate} × {nights} nights</span>
                    <span>KSh {fees.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Service fee</span>
                    <span>KSh {fees.guestFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300">
                    <span>Total</span>
                    <span>KSh {fees.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    value={bookingDetails.customerFirstName}
                    onChange={(e) => setBookingDetails({...bookingDetails, customerFirstName: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={bookingDetails.customerLastName}
                    onChange={(e) => setBookingDetails({...bookingDetails, customerLastName: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={bookingDetails.customerEmail}
                  onChange={(e) => setBookingDetails({...bookingDetails, customerEmail: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telephone *</label>
                <input
                  type="tel"
                  value={bookingDetails.customerPhone}
                  onChange={(e) => setBookingDetails({...bookingDetails, customerPhone: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="+254 700 000 000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ID/Passport Number *</label>
                <input
                  type="text"
                  value={bookingDetails.customerIdPassport}
                  onChange={(e) => setBookingDetails({...bookingDetails, customerIdPassport: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Required for security purposes"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Required for security and verification</p>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Payment Method *</label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Pesapal */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('pesapal')}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedPaymentMethod === 'pesapal'
                        ? 'border-black bg-black text-white shadow-lg'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">P</span>
                      </div>
                      <span className="font-semibold text-sm">Pesapal</span>
                      <span className="text-xs opacity-75">Cards & Mobile</span>
                    </div>
                  </button>

                  {/* M-Pesa */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('mpesa')}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedPaymentMethod === 'mpesa'
                        ? 'border-black bg-black text-white shadow-lg'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">M</span>
                      </div>
                      <span className="font-semibold text-sm">M-Pesa</span>
                      <span className="text-xs opacity-75">Mobile Money</span>
                    </div>
                  </button>

                  {/* Credit/Debit Card */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('card')}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedPaymentMethod === 'card'
                        ? 'border-black bg-black text-white shadow-lg'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-semibold text-sm">Card</span>
                      <span className="text-xs opacity-75">Visa/Mastercard</span>
                    </div>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('bank')}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedPaymentMethod === 'bank'
                        ? 'border-black bg-black text-white shadow-lg'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏦</span>
                      </div>
                      <span className="font-semibold text-sm">Bank</span>
                      <span className="text-xs opacity-75">Direct Transfer</span>
                    </div>
                  </button>
                </div>
              </div>

              <button
                onClick={async () => {
                  if (!bookingDetails.customerFirstName || !bookingDetails.customerLastName || !bookingDetails.customerEmail || !bookingDetails.customerPhone || !bookingDetails.customerIdPassport) {
                    alert('Please fill in all required fields');
                    return;
                  }
                  
                  setIsProcessingPayment(true);
                  setShowBookingForm(false);
                  
                  try {
                    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                    
                    // Determine the payment endpoint based on selected method
                    let paymentEndpoint = '/api/pesapal/initiate';
                    if (selectedPaymentMethod === 'mpesa') {
                      paymentEndpoint = '/api/mpesa/initiate';
                    } else if (selectedPaymentMethod === 'card') {
                      paymentEndpoint = '/api/card/initiate';
                    } else if (selectedPaymentMethod === 'bank') {
                      paymentEndpoint = '/api/bank/initiate';
                    }
                    
                    const response = await fetch(`${API_BASE_URL}${paymentEndpoint}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        propertyId: selectedProperty.id,
                        checkIn: bookingDetails.checkIn,
                        checkOut: bookingDetails.checkOut,
                        guests: bookingDetails.guests,
                        baseAmount: selectedProperty.dailyRate,
                        nights: nights,
                        customerEmail: bookingDetails.customerEmail,
                        customerPhone: bookingDetails.customerPhone,
                        customerFirstName: bookingDetails.customerFirstName,
                        customerLastName: bookingDetails.customerLastName,
                        customerIdPassport: bookingDetails.customerIdPassport,
                        paymentMethod: selectedPaymentMethod
                      })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                      // Mark booking as paid
                      const bookingKey = `${selectedProperty.id}-${bookingDetails.checkIn}-${bookingDetails.checkOut}`;
                      setPaidBookings(prev => new Set([...prev, bookingKey]));
                      
                      // Handle different payment method responses
                      if (selectedPaymentMethod === 'pesapal' && data.redirectUrl) {
                        // Pesapal redirects to external payment page
                        // Payment will be confirmed via webhook, but mark as paid for now
                        window.location.href = data.redirectUrl;
                      } else if (selectedPaymentMethod === 'mpesa') {
                        // M-Pesa shows STK push message
                        alert(data.message || 'M-Pesa payment prompt sent to your phone. Please complete the payment.');
                        setCurrentPage('home');
                      } else if (selectedPaymentMethod === 'card') {
                        // Card payment might redirect or show inline form
                        if (data.redirectUrl) {
                          window.location.href = data.redirectUrl;
                        } else {
                          alert('Card payment initiated. Please check your email for payment instructions.');
                          setCurrentPage('home');
                        }
                      } else if (selectedPaymentMethod === 'bank') {
                        // Bank transfer shows account details
                        alert(`Bank transfer details:\n\n${data.bankDetails || 'Please contact support for bank transfer instructions.'}`);
                        setCurrentPage('home');
                      }
                    } else {
                      throw new Error(data.error || 'Failed to initiate payment');
                    }
                  } catch (error) {
                    console.error('Payment error:', error);
                    alert(`Payment initiation failed: ${error.message}. Please try again.`);
                    setIsProcessingPayment(false);
                    setShowBookingForm(true);
                  }
                }}
                disabled={isProcessingPayment}
                className="w-full bg-black text-white py-5 rounded-xl font-extrabold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group border-2 border-black"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isProcessingPayment ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>
                        {selectedPaymentMethod === 'pesapal' && 'Pay with Pesapal'}
                        {selectedPaymentMethod === 'mpesa' && 'Pay with M-Pesa'}
                        {selectedPaymentMethod === 'card' && 'Pay with Card'}
                        {selectedPaymentMethod === 'bank' && 'Pay via Bank Transfer'}
                        {!selectedPaymentMethod && 'Proceed to Payment'}
                      </span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard Component */}
      {currentPage === 'admin' && (
        <AdminDashboard />
      )}
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ setCurrentPage }) => {
  // Mock booking data for analytics
  const [bookings] = useState([
    { id: 1, propertyId: 1, category: 'properties', location: 'Kisumu', date: '2025-01-15', amount: 5000 },
    { id: 2, propertyId: 2, category: 'group', location: 'Nanyuki', date: '2025-01-16', amount: 4000 },
    { id: 3, propertyId: 3, category: 'student', location: 'Nakuru', date: '2025-01-17', amount: 3000 },
  ]);

  const getBookingsByPeriod = (period) => {
    const now = new Date();
    const periods = {
      daily: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      weekly: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      monthly: new Date(now.getFullYear(), now.getMonth(), 1),
      annual: new Date(now.getFullYear(), 0, 1)
    };
    return bookings.filter(b => new Date(b.date) >= periods[period]);
  };

  const getBookingsByCategory = () => {
    const categories = {};
    bookings.forEach(b => {
      categories[b.category] = (categories[b.category] || 0) + 1;
    });
    return categories;
  };

  const getBookingsByLocation = () => {
    const locations = {};
    bookings.forEach(b => {
      locations[b.location] = (locations[b.location] || 0) + 1;
    });
    return locations;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button 
        onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 px-5 py-3 mb-6 text-base font-bold text-white bg-orange-600 border-4 border-orange-700 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Period Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['daily', 'weekly', 'monthly', 'annual'].map(period => {
          const periodBookings = getBookingsByPeriod(period);
          const totalRevenue = periodBookings.reduce((sum, b) => sum + b.amount, 0);
          return (
            <div key={period} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase">{period} Bookings</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{periodBookings.length}</p>
              <p className="text-sm text-gray-600">Revenue: KSh {totalRevenue.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Category Analytics */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
        <h2 className="text-2xl font-bold mb-4">Bookings by Category</h2>
        <div className="space-y-3">
          {Object.entries(getBookingsByCategory()).map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="font-medium capitalize">{category}</span>
              <span className="text-lg font-bold text-[var(--logo-primary)]">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Location Analytics */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Bookings by Location</h2>
        <div className="space-y-3">
          {Object.entries(getBookingsByLocation()).map(([location, count]) => (
            <div key={location} className="flex items-center justify-between">
              <span className="font-medium">{location}</span>
              <span className="text-lg font-bold text-[var(--logo-primary)]">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyHostApp;





