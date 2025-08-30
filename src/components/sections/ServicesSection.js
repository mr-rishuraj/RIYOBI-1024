import React from 'react';
import { Shirt, Clock, Users, BarChart3 } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';

const ServicesSection = () => {
  const services = [
    {
      icon: Shirt,
      title: "Order Management",
      description: "Efficiently track and manage all your laundry orders from pickup to delivery with our intuitive dashboard.",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBgColor: "bg-blue-600"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build lasting relationships with customers through detailed profiles, order history, and personalized service.",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBgColor: "bg-green-600"
    },
    {
      icon: Clock,
      title: "Delivery Tracking",
      description: "Real-time tracking system to monitor pickups and deliveries, ensuring timely service for all customers.",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBgColor: "bg-purple-600"
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Gain insights into your business performance with detailed reports, revenue tracking, and growth metrics.",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBgColor: "bg-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Dhobi Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From order management to customer relations, Riyobi provides all the tools you need to run a successful laundry business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Dhobi Business?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of dhobis who have already modernized their operations with Riyobi
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;