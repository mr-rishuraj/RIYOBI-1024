import React from 'react';

const ServiceCard = ({ icon: Icon, title, description, bgColor, iconBgColor }) => {
  return (
    <div className={`group ${bgColor} p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
      <div className={`${iconBgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;