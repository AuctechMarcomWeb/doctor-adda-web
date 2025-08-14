import React, { useState, useRef, useEffect } from "react";
import { Bell, X, Check, Mail, MessageSquare, Calendar, AlertCircle, Settings, ChevronRight } from "lucide-react";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message from Sarah",
      message: "Hey! Can we schedule a meeting for tomorrow?",
      time: "2 min ago",
      type: "message",
      read: false,
      priority: "normal"
    },
    {
      id: 2,
      title: "Project deadline reminder",
      message: "Your project 'Website Redesign' is due in 2 days",
      time: "1 hour ago",
      type: "deadline",
      read: false,
      priority: "high"
    },
    {
      id: 3,
      title: "System maintenance scheduled",
      message: "Scheduled maintenance will occur tonight at 2:00 AM",
      time: "3 hours ago",
      type: "system",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      title: "New team member joined",
      message: "Welcome Alex Johnson to the development team!",
      time: "1 day ago",
      type: "team",
      read: false,
      priority: "normal"
    },
    {
      id: 5,
      title: "Invoice payment received",
      message: "Payment of $2,500 has been successfully processed",
      time: "2 days ago",
      type: "payment",
      read: true,
      priority: "normal"
    },
    {
      id: 6,
      title: "Security alert",
      message: "New login detected from an unrecognized device",
      time: "3 days ago",
      type: "security",
      read: false,
      priority: "high"
    }
  ]);

  const bellRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "message": return <MessageSquare className={iconClass} />;
      case "deadline": return <Calendar className={iconClass} />;
      case "system": return <Settings className={iconClass} />;
      case "team": return <Mail className={iconClass} />;
      case "payment": return <Check className={iconClass} />;
      case "security": return <AlertCircle className={iconClass} />;
      default: return <Bell className={iconClass} />;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "high") return "text-red-600 bg-red-50";
    if (priority === "low") return "text-gray-500 bg-gray-50";
    
    switch (type) {
      case "message": return "text-blue-600 bg-blue-50";
      case "deadline": return "text-orange-600 bg-orange-50";
      case "system": return "text-purple-600 bg-purple-50";
      case "team": return "text-green-600 bg-green-50";
      case "payment": return "text-emerald-600 bg-emerald-50";
      case "security": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative hidden md:block" ref={bellRef}>
      {/* Notification Bell Button */}
      <div className="relative">
        <button
          className="relative bg-[#3c83f8] hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bell className={`  md:w-4 md:h-4  xl:w-6 xl:h-6 ${isOpen ? 'animate-pulse' : ''}`} />
          
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-md">
              {unreadCount > 99 ? '99+' : unreadCount}
            </div>
          )}
          
          {/* Pulse animation for new notifications */}
          {unreadCount > 0 && (
            <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20"></div>
          )}
        </button>
      </div>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-6 py-4 pt-14 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Notifications</h3>
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer group ${
                    !notification.read ? 'bg-blue-25' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-2 rounded-lg ${getNotificationColor(notification.type, notification.priority)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium truncate ${
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        notification.read ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{notification.time}</span>
                        {notification.priority === 'high' && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                            High Priority
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

       
        </div>
      )}
    </div>
  );
};

export default NotificationBell;