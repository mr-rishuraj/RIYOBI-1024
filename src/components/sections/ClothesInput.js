import React, { useState } from 'react';

const ClothesInput = () => {
  const [clothesData, setClothesData] = useState({
    customerName: '',
    phoneNumber: '',
    numberOfClothes: '',
    clothesType: 'mixed',
    specialInstructions: '',
    urgentService: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClothesData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!clothesData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!clothesData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(clothesData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!clothesData.numberOfClothes) {
      newErrors.numberOfClothes = 'Number of clothes is required';
    } else if (clothesData.numberOfClothes <= 0) {
      newErrors.numberOfClothes = 'Number of clothes must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call to your backend
      // This is where you'll connect to your database later
      console.log('Submitting clothes data:', clothesData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Send data to both customer and dhobi dashboards
      // const response = await fetch('/api/clothes-order', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(clothesData)
      // });

      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setClothesData({
          customerName: '',
          phoneNumber: '',
          numberOfClothes: '',
          clothesType: 'mixed',
          specialInstructions: '',
          urgentService: false
        });
        setSubmitSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setClothesData({
      customerName: '',
      phoneNumber: '',
      numberOfClothes: '',
      clothesType: 'mixed',
      specialInstructions: '',
      urgentService: false
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RIYOBI</h1>
          <p className="text-xl text-blue-600 font-semibold">Laundry Service</p>
          <p className="text-gray-600 mt-2">Quick Order Entry</p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Order Submitted Successfully!</h3>
            <p className="text-green-700">Your laundry order has been received and will be processed soon.</p>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={clothesData.customerName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.customerName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter customer name"
                disabled={isSubmitting}
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={clothesData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit phone number"
                disabled={isSubmitting}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Number of Clothes */}
            <div>
              <label htmlFor="numberOfClothes" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Clothes *
              </label>
              <input
                type="number"
                id="numberOfClothes"
                name="numberOfClothes"
                value={clothesData.numberOfClothes}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.numberOfClothes ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter number of clothes"
                min="1"
                disabled={isSubmitting}
              />
              {errors.numberOfClothes && (
                <p className="mt-1 text-sm text-red-600">{errors.numberOfClothes}</p>
              )}
            </div>

            {/* Clothes Type */}
            <div>
              <label htmlFor="clothesType" className="block text-sm font-medium text-gray-700 mb-2">
                Clothes Type
              </label>
              <select
                id="clothesType"
                name="clothesType"
                value={clothesData.clothesType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={isSubmitting}
              >
                <option value="mixed">Mixed Clothes</option>
                <option value="cotton">Cotton Only</option>
                <option value="silk">Silk/Delicate</option>
                <option value="denim">Denim/Heavy</option>
                <option value="formal">Formal Wear</option>
              </select>
            </div>

            {/* Special Instructions */}
            <div>
              <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={clothesData.specialInstructions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Any special washing instructions (optional)"
                rows="3"
                disabled={isSubmitting}
              />
            </div>

            {/* Urgent Service Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="urgentService"
                name="urgentService"
                checked={clothesData.urgentService}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                disabled={isSubmitting}
              />
              <label htmlFor="urgentService" className="ml-3 text-sm font-medium text-gray-700">
                Urgent Service (24-hour delivery) - Additional charges apply
              </label>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Order'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">How it works:</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                1
              </div>
              <p className="text-blue-800">Enter your details and number of clothes</p>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                2
              </div>
              <p className="text-blue-800">Your order will appear on both customer and dhobi dashboards</p>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                3
              </div>
              <p className="text-blue-800">Track your laundry progress in real-time</p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ClothesInput;



