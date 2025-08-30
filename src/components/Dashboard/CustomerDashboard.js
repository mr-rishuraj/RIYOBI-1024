import React, { useState } from 'react';
import { 
  Plus, 
  Shirt, 
  Clock, 
  CheckCircle, 
  User, 
  Bell, 
  Home, 
  LogOut, 
  Package, 
  Star,
  MessageCircle,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';

export default function CustomerDashboard({ onNavigateHome }) {
  // Customer data - this would come from props or API in real app
  const [customer] = useState({
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123 MG Road, Pilani, Rajasthan',
    joinDate: '2024-01-15',
    totalOrders: 24,
    loyaltyPoints: 150
  });

  const [activeOrders, setActiveOrders] = useState([
    { 
      id: 'ORD001', 
      items: [
        { type: 'Shirts', count: 3, price: 90 },
        { type: 'Pants', count: 2, price: 80 }
      ],
      status: 'washing', 
      dhobi: 'Ravi Dhobi',
      orderDate: '2024-08-28',
      estimatedDelivery: '2024-08-30',
      total: 170,
      pickupTime: '10:30 AM'
    },
    { 
      id: 'ORD002', 
      items: [
        { type: 'Sarees', count: 2, price: 120 },
        { type: 'Kurtas', count: 1, price: 40 }
      ],
      status: 'completed', 
      dhobi: 'Ravi Dhobi',
      orderDate: '2024-08-26',
      estimatedDelivery: '2024-08-29',
      total: 160,
      pickupTime: '2:00 PM'
    }
  ]);

  const [orderHistory] = useState([
    { id: 'ORD003', date: '2024-08-20', items: 'Shirts (5), Pants (3)', total: 240, rating: 5 },
    { id: 'ORD004', date: '2024-08-15', items: 'Bed Sheets (4), Towels (6)', total: 180, rating: 4 },
    { id: 'ORD005', date: '2024-08-10', items: 'Kurtas (3), Dupatta (2)', total: 150, rating: 5 },
  ]);

  const [newOrder, setNewOrder] = useState({
    items: [{ type: 'Shirts', count: 1 }],
    pickupDate: '',
    pickupTime: '',
    specialInstructions: ''
  });

  const [activeTab, setActiveTab] = useState('overview');

  const clothTypes = ['Shirts', 'Pants', 'Sarees', 'Kurtas', 'Bed Sheets', 'Towels', 'Others'];
  const pricing = {
    'Shirts': 30, 'Pants': 40, 'Sarees': 60, 'Kurtas': 40, 
    'Bed Sheets': 25, 'Towels': 15, 'Others': 35
  };

  const statusConfig = {
    'received': { label: 'Order Received', color: 'bg-gray-100 text-gray-800', icon: Package },
    'washing': { label: 'In Washing', color: 'bg-blue-100 text-blue-800', icon: Shirt },
    'drying': { label: 'Drying', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    'ironing': { label: 'Ironing', color: 'bg-purple-100 text-purple-800', icon: Shirt },
    'completed': { label: 'Ready for Pickup', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  };

  const addOrderItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { type: 'Shirts', count: 1 }]
    });
  };

  const removeOrderItem = (index) => {
    const items = newOrder.items.filter((_, i) => i !== index);
    setNewOrder({ ...newOrder, items });
  };

  const updateOrderItem = (index, field, value) => {
    const items = [...newOrder.items];
    items[index][field] = field === 'count' ? parseInt(value) || 1 : value;
    setNewOrder({ ...newOrder, items });
  };

  const calculateOrderTotal = () => {
    return newOrder.items.reduce((total, item) => {
      return total + (pricing[item.type] || 0) * item.count;
    }, 0);
  };

  const submitOrder = () => {
    if (!newOrder.pickupDate || !newOrder.pickupTime) {
      alert('Please select pickup date and time');
      return;
    }
    
    const orderId = 'ORD' + String(Date.now()).slice(-3);
    const total = calculateOrderTotal();
    
    const order = {
      id: orderId,
      items: newOrder.items.map(item => ({
        ...item,
        price: pricing[item.type] * item.count
      })),
      status: 'received',
      dhobi: 'Ravi Dhobi',
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total,
      pickupTime: newOrder.pickupTime,
      specialInstructions: newOrder.specialInstructions
    };

    setActiveOrders([order, ...activeOrders]);
    setNewOrder({
      items: [{ type: 'Shirts', count: 1 }],
      pickupDate: '',
      pickupTime: '',
      specialInstructions: ''
    });
    setActiveTab('orders');
    
    alert('Order placed successfully! Your dhobi will contact you soon.');
  };

  const goToLanding = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      console.log('Navigate to landing page');
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  );

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
              <span className="text-lg font-medium text-gray-700">My Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={goToLanding}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-gray-700">{customer.name}</span>
                  <div className="text-xs text-gray-500">{customer.loyaltyPoints} points</div>
                </div>
              </div>
              <button 
                onClick={goToLanding}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {customer.name.split(' ')[0]}! 👋</h1>
              <p className="text-blue-100 mb-4">Ready to get your clothes sparkling clean?</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>{customer.totalOrders} Total Orders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span>{customer.loyaltyPoints} Loyalty Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(customer.joinDate).getFullYear()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Shirt className="h-16 w-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="newOrder" 
            label="Place New Order" 
            isActive={activeTab === 'newOrder'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="orders" 
            label="Active Orders" 
            isActive={activeTab === 'orders'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="history" 
            label="Order History" 
            isActive={activeTab === 'history'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="profile" 
            label="My Profile" 
            isActive={activeTab === 'profile'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Orders</p>
                      <p className="text-2xl font-bold text-blue-600">{activeOrders.filter(o => o.status !== 'completed').length}</p>
                    </div>
                    <Package className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">This Month</p>
                      <p className="text-2xl font-bold text-green-600">₹{activeOrders.reduce((sum, o) => sum + o.total, 0)}</p>
                    </div>
                    <Star className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Loyalty Points</p>
                      <p className="text-2xl font-bold text-purple-600">{customer.loyaltyPoints}</p>
                    </div>
                    <Star className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {activeOrders.slice(0, 2).map(order => {
                    const StatusIcon = statusConfig[order.status].icon;
                    return (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${statusConfig[order.status].color}`}>
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Order {order.id}</div>
                            <div className="text-sm text-gray-600">
                              {order.items.map(item => `${item.type} (${item.count})`).join(', ')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">₹{order.total}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${statusConfig[order.status].color}`}>
                            {statusConfig[order.status].label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('newOrder')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Place New Order</span>
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Contact Dhobi</span>
                  </button>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{customer.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{customer.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'newOrder' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Place New Order</h2>
            
            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items to Clean</h3>
              {newOrder.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <select
                    value={item.type}
                    onChange={(e) => updateOrderItem(index, 'type', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {clothTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    value={item.count}
                    onChange={(e) => updateOrderItem(index, 'count', e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-600 w-20">₹{(pricing[item.type] || 0) * item.count}</span>
                  <button
                    onClick={() => removeOrderItem(index)}
                    className="text-red-600 hover:text-red-800 p-2"
                    disabled={newOrder.items.length === 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={addOrderItem}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
                <div className="text-xl font-bold text-gray-900">
                  Total: ₹{calculateOrderTotal()}
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                <input
                  type="date"
                  value={newOrder.pickupDate}
                  onChange={(e) => setNewOrder({...newOrder, pickupDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                <select
                  value={newOrder.pickupTime}
                  onChange={(e) => setNewOrder({...newOrder, pickupTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</label>
              <textarea
                value={newOrder.specialInstructions}
                onChange={(e) => setNewOrder({...newOrder, specialInstructions: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Any special care instructions for your clothes..."
              />
            </div>

            <button
              onClick={submitOrder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Place Order - ₹{calculateOrderTotal()}
            </button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {activeOrders.map(order => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${statusConfig[order.status].color}`}>
                        <StatusIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                        <p className="text-gray-600">Placed on {order.orderDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">₹{order.total}</div>
                      <div className={`text-sm px-3 py-1 rounded-full ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Items:</span>
                      <div className="font-medium">
                        {order.items.map(item => `${item.type} (${item.count})`).join(', ')}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Dhobi:</span>
                      <div className="font-medium">{order.dhobi}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Pickup Time:</span>
                      <div className="font-medium">{order.pickupTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Estimated Delivery:</span>
                      <div className="font-medium">{order.estimatedDelivery}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            <div className="space-y-4">
              {orderHistory.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-900">Order {order.id}</div>
                    <div className="text-sm text-gray-600">{order.items}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹{order.total}</div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={customer.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={customer.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="text"
                    value={new Date(customer.joinDate).toLocaleDateString()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={customer.address}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}