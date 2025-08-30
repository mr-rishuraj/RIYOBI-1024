// src/components/dashboard/DhobiDashboard.js - COMPLETE WORKING VERSION
import React, { useState } from 'react';
import { Plus, Minus, Shirt, Filter, Search, Bell, User, LogOut, Home } from 'lucide-react';

const DhobiDashboard = ({ onNavigateHome }) => {
  const [clothes, setClothes] = useState([
    { id: 1, type: 'Shirts', count: 5, status: 'washing', customer: 'Sharma Family' },
    { id: 2, type: 'Pants', count: 3, status: 'drying', customer: 'Hotel Raj' },
    { id: 3, type: 'Sarees', count: 2, status: 'completed', customer: 'Priya Textiles' },
    { id: 4, type: 'Bed Sheets', count: 8, status: 'received', customer: 'Kumar House' },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const clothTypes = ['Shirts', 'Pants', 'Sarees', 'Kurtas', 'Bed Sheets', 'Towels', 'Others'];
  const statusTypes = [
    { value: 'received', label: 'Received', color: 'bg-gray-100 text-gray-800' },
    { value: 'washing', label: 'Washing', color: 'bg-blue-100 text-blue-800' },
    { value: 'drying', label: 'Drying', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'ironing', label: 'Ironing', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  ];

  const [newItem, setNewItem] = useState({
    type: 'Shirts',
    count: 1,
    customer: '',
    status: 'received'
  });

  const updateCount = (id, increment) => {
    setClothes(clothes.map(item => {
      if (item.id === id) {
        const newCount = Math.max(0, item.count + increment);
        return { ...item, count: newCount };
      }
      return item;
    }).filter(item => item.count > 0));
  };

  const updateStatus = (id, newStatus) => {
    setClothes(clothes.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const addNewItem = () => {
    if (newItem.customer.trim()) {
      const newId = Math.max(...clothes.map(c => c.id), 0) + 1;
      setClothes([...clothes, { ...newItem, id: newId }]);
      setNewItem({ type: 'Shirts', count: 1, customer: '', status: 'received' });
    }
  };

  const filteredClothes = clothes.filter(item => {
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    return statusTypes.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusCounts = () => {
    const counts = { total: clothes.length };
    statusTypes.forEach(status => {
      counts[status.value] = clothes.filter(item => item.status === status.value).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  // Navigation function - FIXED
  const goToLanding = () => {
    console.log('Navigating to landing page'); // Debug log
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      console.error('onNavigateHome prop not provided');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Shirt className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">Riyobi</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-lg font-medium text-gray-700">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button 
                onClick={goToLanding}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Go to Home"
              >
                <Home className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Ravi Dhobi</span>
              </div>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.total}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          {statusTypes.map(status => (
            <div key={status.value} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-gray-900">{statusCounts[status.value]}</div>
              <div className="text-sm text-gray-600">{status.label}</div>
            </div>
          ))}
        </div>

        {/* Add New Item */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {clothTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                min="1"
                value={newItem.count}
                onChange={(e) => setNewItem({...newItem, count: parseInt(e.target.value) || 1})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Count"
              />
            </div>
            <div>
              <input
                type="text"
                value={newItem.customer}
                onChange={(e) => setNewItem({...newItem, customer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Customer Name"
              />
            </div>
            <div>
              <select
                value={newItem.status}
                onChange={(e) => setNewItem({...newItem, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusTypes.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={addNewItem}
              disabled={!newItem.customer.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {statusTypes.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search customers or items..."
              />
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Items ({filteredClothes.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredClothes.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No items found matching your criteria
              </div>
            ) : (
              filteredClothes.map(item => (
                <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.customer}</div>
                          <div className="text-sm text-gray-600">{item.type}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateCount(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">{item.count}</span>
                          <button
                            onClick={() => updateCount(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 rounded-full transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="w-32">
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                            className={`w-full px-3 py-1 text-sm rounded-full border-0 font-medium ${getStatusColor(item.status)}`}
                          >
                            {statusTypes.map(status => (
                              <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DhobiDashboard;