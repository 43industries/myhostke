import React, { useState } from 'react';
import { MapPin, Home, Users, Star, Plus, Menu, X, Sparkles } from 'lucide-react';

const MyHostApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Lakeside Villa",
      location: "Kisumu",
      description: "Beautiful 4-bedroom villa with lake view",
      rooms: 4,
      dailyRate: 5000,
      amenities: ["WiFi", "Pool", "Garden", "Parking"],
      host: "Jane Kimani",
      caretaker: "John Ochieng",
      rating: 4.8,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500"
    },
    {
      id: 2,
      title: "Mountain Retreat",
      location: "Nanyuki",
      description: "Cozy 3-bedroom house near Mt. Kenya",
      rooms: 3,
      dailyRate: 4000,
      amenities: ["WiFi", "Fireplace", "Garden"],
      host: "Peter Mwangi",
      caretaker: "Mary Wanjiku",
      rating: 4.9,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500"
    },
    {
      id: 3,
      title: "Countryside Cottage",
      location: "Nakuru",
      description: "Peaceful 2-bedroom cottage with farm views",
      rooms: 2,
      dailyRate: 3000,
      amenities: ["WiFi", "Garden", "Kitchen"],
      host: "Sarah Njeri",
      caretaker: "David Kamau",
      rating: 4.7,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500"
    }
  ]);

  const [bookingForm, setBookingForm] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const [newProperty, setNewProperty] = useState({
    title: '',
    location: '',
    description: '',
    rooms: 1,
    dailyRate: 0,
    amenities: '',
    host: '',
    caretaker: ''
  });

  const handleAddProperty = () => {
    if (!newProperty.title || !newProperty.location || !newProperty.description || !newProperty.host || !newProperty.caretaker) {
      alert('Please fill in all required fields');
      return;
    }
    
    const property = {
      id: properties.length + 1,
      title: newProperty.title,
      location: newProperty.location,
      description: newProperty.description,
      rooms: newProperty.rooms,
      dailyRate: newProperty.dailyRate,
      amenities: newProperty.amenities.split(',').map(a => a.trim()),
      host: newProperty.host,
      caretaker: newProperty.caretaker,
      rating: 0,
      reviews: 0,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500"
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
      caretaker: ''
    });
    setCurrentPage('properties');
  };

  const filteredProperties = properties.filter(p => 
    !bookingForm.location || p.location.toLowerCase().includes(bookingForm.location.toLowerCase())
  );

  // Logo Component - Two connected human figures (handshake/infinity design)
  const Logo = ({ size = 40, color = "#FB923C", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left figure: head and body */}
      <circle cx="60" cy="55" r="22" stroke={color} strokeWidth="14" fill="none"/>
      <path d="M 60 77 Q 60 100 55 120 Q 50 140 60 150 Q 70 160 85 160" stroke={color} strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Right figure: head and body */}
      <circle cx="140" cy="55" r="22" stroke={color} strokeWidth="14" fill="none"/>
      <path d="M 140 77 Q 140 100 145 120 Q 150 140 140 150 Q 130 160 115 160" stroke={color} strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Connection loop at bottom - forms the infinity/handshake */}
      <path d="M 85 160 Q 92 165 100 165 Q 108 165 115 160" stroke={color} strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const DecorativePattern = () => (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hearts" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="8" fill="#D15449"/>
            <circle cx="50" cy="30" r="8" fill="#D15449"/>
            <path d="M20 40 Q30 50 40 40 Q50 30 60 40 Q70 50 60 60 Q50 70 40 60 Q30 50 20 60 Q10 50 20 40 Z" fill="#D15449"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hearts)"/>
      </svg>
    </div>
  );

  const HomePage = () => (
    <div className="space-y-12">
      <div className="relative bg-gradient-to-r from-red-500 via-red-400 to-orange-400 text-white rounded-2xl p-12 text-center overflow-hidden">
        <DecorativePattern />
        
        <div className="absolute top-10 left-10 animate-bounce">
          <Home className="w-8 h-8 opacity-30" />
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse">
          <Star className="w-10 h-10 opacity-30" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 right-20 animate-bounce" style={{animationDelay: '0.5s'}}>
          <MapPin className="w-6 h-6 opacity-30" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to MyHost</h1>
          <p className="text-xl mb-8">Alternative countryside accommodation in homely settings</p>
          <button 
            onClick={() => setCurrentPage('properties')}
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            Explore Properties
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="relative bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full opacity-50"></div>
          <Home className="w-12 h-12 text-red-500 mb-4 relative z-10" />
          <h3 className="text-xl font-bold mb-2">Short & Long Stay</h3>
          <p className="text-gray-600">Budget accommodation for countryside travelers with flexible duration</p>
          <div className="mt-4 flex space-x-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
          </div>
        </div>
        
        <div className="relative bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500 hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50"></div>
          <Users className="w-12 h-12 text-orange-500 mb-4 relative z-10" />
          <h3 className="text-xl font-bold mb-2">Student Longstay</h3>
          <p className="text-gray-600">Monthly or semester-based accommodation closer to colleges</p>
          <div className="mt-4 flex space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          </div>
        </div>
        
        <div className="relative bg-white p-6 rounded-xl shadow-md border-t-4 border-red-400 hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full opacity-50"></div>
          <Star className="w-12 h-12 text-red-400 mb-4 relative z-10" />
          <h3 className="text-xl font-bold mb-2">WeHost Exchange</h3>
          <p className="text-gray-600">Reciprocal hosting arrangements between families</p>
          <div className="mt-4 flex space-x-2">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl border border-red-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Why Choose MyHost?</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-red-600">150+</p>
            <p className="text-gray-600">Properties</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-orange-600">5,000+</p>
            <p className="text-gray-600">Happy Guests</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-red-500">20+</p>
            <p className="text-gray-600">Locations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <p className="text-3xl font-bold text-orange-600">4.8</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#D15449"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3 text-red-600 flex items-center">
              <Home className="w-5 h-5 mr-2" />
              For Hosts
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">1</span>
                <span>Post your property with details</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">2</span>
                <span>Set availability and pricing</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">3</span>
                <span>Manage bookings and guests</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">4</span>
                <span>Earn from unused properties</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#FB923C"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3 text-orange-600 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              For Travelers
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">1</span>
                <span>Browse countryside properties</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">2</span>
                <span>Book your preferred dates</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">3</span>
                <span>Enjoy homely accommodation</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">4</span>
                <span>Leave reviews and ratings</span>
              </li>
            </ul>
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

  const PropertyDetails = () => {
    if (!selectedProperty) return null;
    
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setCurrentPage('properties')}
          className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-2 hover:underline"
        >
          <span>←</span>
          <span>Back to properties</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-red-100">
          <div className="relative">
            <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-96 object-cover" />
            <div className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-xl">
              <Star className="w-8 h-8 text-yellow-500" fill="currentColor" stroke="none" />
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{selectedProperty.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  <span>{selectedProperty.location}</span>
                </div>
              </div>
              <div className="text-right bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center text-yellow-500 mb-2">
                  <Star className="w-6 h-6" fill="currentColor" stroke="none" />
                  <span className="ml-2 text-2xl font-bold">{selectedProperty.rating}</span>
                </div>
                <span className="text-gray-600 text-sm">({selectedProperty.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6 text-lg">{selectedProperty.description}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-100">
                <h3 className="font-bold text-xl mb-4 flex items-center text-red-700">
                  <Home className="w-6 h-6 mr-2" />
                  Property Details
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <span>{selectedProperty.rooms} Rooms Available</span>
                  </li>
                  <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span>Host: {selectedProperty.host}</span>
                  </li>
                  <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span>Caretaker: {selectedProperty.caretaker}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                <h3 className="font-bold text-xl mb-4 flex items-center text-orange-700">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.amenities.map((amenity, index) => (
                    <span key={index} className="bg-white text-red-700 px-4 py-2 rounded-full text-sm border-2 border-red-200 font-semibold shadow-sm flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl border-2 border-red-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-bl-full opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200 rounded-tr-full opacity-20"></div>
              
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price per night</p>
                  <span className="text-4xl font-bold text-red-600">KSh {selectedProperty.dailyRate}</span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg flex items-center space-x-2">
                  <Star className="w-5 h-5" fill="currentColor" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HostDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Host Dashboard</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
        <div className="space-y-4">
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Rooms</label>
              <input
                type="number"
                min="1"
                value={newProperty.rooms}
                onChange={(e) => setNewProperty({...newProperty, rooms: parseInt(e.target.value)})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Daily Rate (KSh)</label>
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
              <label className="block text-sm font-medium mb-2">Host Name</label>
              <input
                type="text"
                value={newProperty.host}
                onChange={(e) => setNewProperty({...newProperty, host: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Caretaker Name</label>
              <input
                type="text"
                value={newProperty.caretaker}
                onChange={(e) => setNewProperty({...newProperty, caretaker: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <button onClick={handleAddProperty} className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition shadow-md">
            <Plus className="inline w-5 h-5 mr-2" />
            Add Property
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Logo size={40} color="#FB923C" />
              <span className="text-2xl font-serif">
                <span className="text-gray-700 font-bold">My</span>
                <span className="text-orange-500 font-bold">Host</span>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-red-600 font-semibold' : 'text-gray-600'} hover:text-red-600 transition`}>
                Home
              </button>
              <button onClick={() => setCurrentPage('properties')} className={`${currentPage === 'properties' ? 'text-red-600 font-semibold' : 'text-gray-600'} hover:text-red-600 transition`}>
                Properties
              </button>
              <button onClick={() => setCurrentPage('host')} className={`${currentPage === 'host' ? 'text-red-600 font-semibold' : 'text-gray-600'} hover:text-red-600 transition`}>
                Become a Host 
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              <button onClick={() => {setCurrentPage('home'); setMenuOpen(false);}} className="block w-full text-left py-2 text-gray-600">Home</button>
              <button onClick={() => {setCurrentPage('properties'); setMenuOpen(false);}} className="block w-full text-left py-2 text-gray-600">Properties</button>
              <button onClick={() => {setCurrentPage('host'); setMenuOpen(false);}} className="block w-full text-left py-2 text-gray-600">Become a Host</button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'properties' && <PropertiesPage />}
        {currentPage === 'details' && <PropertyDetails />}
        {currentPage === 'host' && <HostDashboard />}
      </main>

      <footer className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <Logo size={60} color="white" />
          </div>
          <p className="text-lg">&copy; 2025 MyHost - Connecting countryside travelers with homely accommodation</p>
        </div>
      </footer>
    </div>
  );
};

export default MyHostApp;


