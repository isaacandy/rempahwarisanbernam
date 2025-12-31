import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Award, 
  Users,
  UtensilsCrossed,
  Facebook,
  Instagram,
  ChevronRight
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const companyInfo = {
    name: "Rempah Warisan Bernam Sdn Bhd",
    regNo: "(202501052286)",
    brand: "Jambu Merah - Pure Spice",
    website: "https://www.rempahwarisanbernam.net",
    email: "info@rempahwarisanbernam.net",
    address: "73 JALAN KANTAN 21, SEKSYEN BB8 BANDAR BUKIT BERUNTUNG, 48300 RAWANG, SELANGOR"
  };

  const products = [
    {
      id: 1,
      name: "Briyani Powder",
      tamil: "பிரியாணி மசாலா",
      category: "specialty",
      description: "A premium blend of cloves, salam leaves, fennel, and star anise for authentic Briyani rice.",
      ingredients: "Clove, Salam leaves, Fennel seed, White Star, Cinnamon, Coriander, Flower of Lawang.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Chicken Curry Powder",
      tamil: "சிக்கன் கறி மசாலா",
      category: "curry",
      description: "Expertly roasted spices including red chili, dhal, and Indian green cardamom.",
      ingredients: "Mustard Seeds, Cloves, Flower of Lawang, Red Chili, Dhal Kacang, Indian Green Cardamom, Cumin, Turmeric.",
      image: "https://images.unsplash.com/photo-1589187151003-0dd30df6a836?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "Fish Curry Powder",
      tamil: "மீன் கறி மசாலா",
      category: "curry",
      description: "Tangy and aromatic blend perfect for traditional Malaysian fish curry.",
      ingredients: "Mustard Seeds, Dry Red Chili, Curry Leaves, Dhal, Halba, Cumin, Coriander, Turmeric, Black/White Pepper.",
      image: "https://images.unsplash.com/photo-1512058560366-cd2427bb5811?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      name: "Chilli Powder",
      tamil: "மிளகாய் தூள்",
      category: "pure",
      description: "100% pure dried red chili powder for that authentic spicy kick.",
      ingredients: "Dry Red Chili only.",
      image: "https://images.unsplash.com/photo-1599330154284-814041d08e5a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      name: "Turmeric Powder",
      tamil: "மஞ்சள் தூள்",
      category: "pure",
      description: "Finely ground high-quality turmeric finger for color and health benefits.",
      ingredients: "Pure Turmeric Finger.",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      name: "Garam Masala Powder",
      tamil: "கரம் மசாலா தூள்",
      category: "specialty",
      description: "A warming blend of star anise, cinnamon, and fennel for rich masala dishes.",
      ingredients: "Star Anise, Cinnamon, Fennel, Cloves, Cumin.",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const filteredProducts = activeTab === 'all' ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center overflow-hidden">
                {/* Logo Placeholder - User should link their actual logo image here */}
                <span className="text-white font-bold text-xs text-center leading-tight">RW B</span>
              </div>
              <div>
                <span className="block font-bold text-red-800 text-lg leading-tight uppercase tracking-tight">Rempah Warisan</span>
                <span className="block text-[10px] text-stone-500 font-medium tracking-widest">{companyInfo.regNo}</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-wider">
              <a href="#home" className="hover:text-red-700 transition">Home</a>
              <a href="#about" className="hover:text-red-700 transition">About Us</a>
              <a href="#products" className="hover:text-red-700 transition">Our Spices</a>
              <a href="#contact" className="hover:text-red-700 transition">Contact</a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-6 space-y-4">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">About Us</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Our Spices</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200" alt="Background" className="object-cover h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-bold mb-6">
              <Award size={16} />
              <span>Authentic Malaysian Heritage</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 leading-tight mb-6">
              Pure Spices for the <span className="text-red-700">Perfect Kitchen.</span>
            </h1>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed">
              Bringing you 100% natural, halal-compliant spice blends from the heart of Rawang. No preservatives, just pure flavor heritage.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#products" className="bg-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-900 transition flex items-center justify-center">
                Explore Catalog <ArrowRight className="ml-2" />
              </a>
              <a href="#contact" className="border-2 border-stone-300 text-stone-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-stone-100 transition flex items-center justify-center">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="about" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1532336411638-af7294273ff8?auto=format&fit=crop&q=80&w=1000" 
                alt="Production" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl hidden lg:block max-w-xs">
                <p className="text-red-800 font-bold text-3xl mb-1">Halal</p>
                <p className="text-stone-500 font-medium">Strict processing standards and MS 1500 compliant.</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 uppercase tracking-wider text-red-800">Our Heritage</h2>
              <p className="text-lg text-stone-700 mb-8 leading-relaxed">
                Rempah Warisan Bernam (Jambu Merah – Pure Spice) produces authentic spice blends and curry powders for both the HORECA and retail markets. Our mission is to deliver pure, flavorful spices while maintaining the highest halal standards in Malaysia.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-red-100 p-2 rounded-lg text-red-800">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Our Mission</h3>
                    <p className="text-stone-600">Delivering pure, flavorful spices for every kitchen across the nation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-red-100 p-2 rounded-lg text-red-800">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Our Vision</h3>
                    <p className="text-stone-600">To be Malaysia's trusted halal spice brand with a regional reach into Singapore, Brunei, and beyond.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-red-200 uppercase text-xs tracking-widest font-semibold">Natural Ingredients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">MS 1500</div>
              <div className="text-red-200 uppercase text-xs tracking-widest font-semibold">Halal Compliant</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0%</div>
              <div className="text-red-200 uppercase text-xs tracking-widest font-semibold">Preservatives</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2025</div>
              <div className="text-red-200 uppercase text-xs tracking-widest font-semibold">Established</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="products" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Spice Collection</h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Authentic blends crafted for professionals and home cooks alike. Available in various pack sizes for retail and bulk B2B supply.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'curry', label: 'Curry Powders' },
              { id: 'pure', label: 'Pure Spices' },
              { id: 'specialty', label: 'Specialty Blends' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-red-800 text-white' 
                    : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition group">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest text-red-800">
                    {product.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-stone-900">{product.name}</h3>
                    <span className="text-red-800 font-medium text-lg" style={{ fontFamily: 'sans-serif' }}>{product.tamil}</span>
                  </div>
                  <p className="text-stone-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="bg-stone-50 p-4 rounded-xl">
                    <p className="text-xs font-bold text-stone-400 uppercase mb-2 tracking-widest">Key Ingredients</p>
                    <p className="text-sm text-stone-700 leading-snug">{product.ingredients}</p>
                  </div>
                  <button className="w-full mt-6 py-3 border-2 border-red-800 text-red-800 font-bold rounded-xl hover:bg-red-800 hover:text-white transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/B2B Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 italic">Partner with <br /><span className="text-red-500">Rempah Warisan</span></h2>
              <p className="text-lg text-stone-400 mb-10 leading-relaxed">
                We supply consistent, high-quality spices to restaurants, caterers, and food factories. Whether you need bulk bags for your HORECA business or retail packs for distribution, we have the capacity to scale with you.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-red-500" />
                  <span>Customizable Blend Profiles</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-red-500" />
                  <span>Tiered Bulk Pricing</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-red-500" />
                  <span>Prompt Delivery & Supply Reliability</span>
                </li>
              </ul>

              <div className="p-8 bg-stone-800 rounded-2xl border border-stone-700">
                <h4 className="font-bold text-xl mb-2">Bulk Inquiry</h4>
                <p className="text-stone-400 mb-4 text-sm">Need more than 20kg per month? Get our wholesale catalog.</p>
                <div className="flex space-x-4">
                  <a href={`mailto:${companyInfo.email}`} className="text-red-500 font-bold flex items-center">
                    Email Sales <ChevronRight size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-800 p-8 rounded-3xl text-center">
                <UtensilsCrossed size={40} className="mx-auto mb-4 text-red-500" />
                <h5 className="font-bold">Restaurants</h5>
              </div>
              <div className="bg-stone-800 p-8 rounded-3xl text-center mt-8">
                <Users size={40} className="mx-auto mb-4 text-red-500" />
                <h5 className="font-bold">Caterers</h5>
              </div>
              <div className="bg-stone-800 p-8 rounded-3xl text-center">
                <ShoppingBag size={40} className="mx-auto mb-4 text-red-500" />
                <h5 className="font-bold">Retailers</h5>
              </div>
              <div className="bg-stone-800 p-8 rounded-3xl text-center mt-8">
                <Award size={40} className="mx-auto mb-4 text-red-500" />
                <h5 className="font-bold">Distributors</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <p className="text-stone-600 text-lg mb-12 leading-relaxed">
                Have questions about our products or want to request samples? Our team is ready to help you bring authentic flavor to your business.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-50 p-4 rounded-xl text-red-800">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Main Office & Facility</h4>
                    <p className="text-stone-600 mt-1 uppercase text-sm leading-relaxed">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-red-50 p-4 rounded-xl text-red-800">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <a href={`mailto:${companyInfo.email}`} className="text-stone-600 hover:text-red-800 transition">{companyInfo.email}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-red-50 p-4 rounded-xl text-red-800">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Corporate Website</h4>
                    <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-red-800 transition">{companyInfo.website}</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex space-x-4">
                <a href="#" className="p-3 bg-stone-100 rounded-full text-stone-600 hover:bg-red-800 hover:text-white transition">
                  <Facebook size={24} />
                </a>
                <a href="#" className="p-3 bg-stone-100 rounded-full text-stone-600 hover:bg-red-800 hover:text-white transition">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            <div className="bg-stone-50 p-8 md:p-12 rounded-3xl border border-stone-200">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Your Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-red-800 outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-red-800 outline-none transition" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Inquiry Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-red-800 outline-none transition bg-white">
                    <option>General Inquiry</option>
                    <option>Bulk/B2B Supply</option>
                    <option>Sample Request</option>
                    <option>Distribution Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-red-800 outline-none transition" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-red-800 text-white font-bold py-4 rounded-xl hover:bg-red-900 transition shadow-lg shadow-red-900/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-100 border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-2 justify-center md:justify-start">
                <span className="font-bold text-red-800 text-xl tracking-tight uppercase">Rempah Warisan Bernam</span>
              </div>
              <p className="text-stone-500 text-sm">{companyInfo.regNo}</p>
              <p className="text-stone-500 text-xs mt-2 italic">© 2025 Rempah Warisan Bernam Sdn Bhd. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-8 text-sm font-bold text-stone-500">
              <a href="#" className="hover:text-red-800 transition">Privacy Policy</a>
              <a href="#" className="hover:text-red-800 transition">Terms of Service</a>
              <a href="#contact" className="hover:text-red-800 transition">Support</a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-stone-200 text-center">
            <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">Built for Jambu Merah – Pure Spice</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;