import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, Compass } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import BusinessDirectory from "./BusinessDirectory";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("product");
  
  const categories = [
    { value: "product", label: "Product" },
    { value: "service", label: "Service" },
    { value: "business", label: "Business" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
            Exclusively businesses with both online and in-store sales
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Start Shopping</span>
            </Button>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-medium flex items-center space-x-2">
              <Compass className="h-5 w-5" />
              <span>Explore Shopping</span>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
            <div className="w-40 bg-yellow-400 rounded-md overflow-hidden">
              <Swiper
                direction="vertical"
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-10"
                modules={[Autoplay]}
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.value} className="flex items-center justify-center">
                    <button
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full h-full text-black font-medium text-sm flex items-center justify-center ${
                        selectedCategory === category.value ? 'bg-yellow-500' : 'bg-yellow-400'
                      }`}
                    >
                      {category.label}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            <Input
              type="text"
              placeholder="iPhone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-0 text-gray-600 placeholder-gray-400 focus-visible:ring-0"
            />
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Business Directory Section */}
      <section className="py-12">
        <BusinessDirectory />
      </section>
    </div>
  );
};

export default Index;
