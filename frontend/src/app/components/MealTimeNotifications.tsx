import { useState, useEffect } from 'react';
import { Clock, X, Coffee, Utensils, Moon, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MealNotification {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  message: string;
  time: string;
  icon: typeof Coffee;
}

export function MealTimeNotifications() {
  const [notifications, setNotifications] = useState<MealNotification[]>([]);
  const [lastCheckDate, setLastCheckDate] = useState('');
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Check if notifications are enabled
    const notifyPref = localStorage.getItem('nutriwise-notifications');
    setEnabled(notifyPref !== 'false');

    // Listen for storage changes
    const handleStorageChange = () => {
      const notifyPref = localStorage.getItem('nutriwise-notifications');
      const newEnabled = notifyPref !== 'false';
      setEnabled(newEnabled);
      // Clear notifications if disabled
      if (!newEnabled) {
        setNotifications([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for changes in same tab
    const interval = setInterval(() => {
      const notifyPref = localStorage.getItem('nutriwise-notifications');
      const newEnabled = notifyPref !== 'false';
      if (newEnabled !== enabled) {
        setEnabled(newEnabled);
        if (!newEnabled) {
          setNotifications([]);
        }
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [enabled]);

  // Get user's meal times from profile
  const getUserMealTimes = () => {
    const profileData = localStorage.getItem('nutriwise-profile');
    if (profileData) {
      const profile = JSON.parse(profileData);
      return {
        breakfast: profile.breakfastTime || '08:00',
        lunch: profile.lunchTime || '13:00',
        dinner: profile.dinnerTime || '20:00',
      };
    }
    return {
      breakfast: '08:00',
      lunch: '13:00',
      dinner: '20:00',
    };
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return Coffee;
      case 'lunch':
        return Utensils;
      case 'dinner':
        return Moon;
      default:
        return Bell;
    }
  };

  const getMealMessages = (type: string) => {
    const messages = {
      breakfast: [
        'Good morning! Time for a healthy breakfast to kickstart your day!',
        "Rise and shine! Don't skip your breakfast today!",
        'Start your day right with a nutritious breakfast!',
        'Breakfast time! Fuel up for an energetic day ahead!',
      ],
      lunch: [
        "It's lunch time! Take a break and refuel your body!",
        'Time for lunch! Remember to eat mindfully and stay hydrated.',
        'Midday meal alert! Make it balanced and nutritious!',
        'Lunch break! Treat yourself to a wholesome meal.',
      ],
      dinner: [
        'Dinner time! Wind down with a healthy, balanced meal.',
        "Time for dinner! Don't eat too late, it's better for digestion.",
        'Evening meal alert! Keep it light and nutritious.',
        'Dinner is served! End your day with good nutrition.',
      ],
    };
    const messageList = messages[type as keyof typeof messages] || messages.breakfast;
    return messageList[Math.floor(Math.random() * messageList.length)];
  };

  const checkMealTimes = () => {
    // Don't show notifications if disabled
    if (!enabled) {
      return;
    }

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const currentDate = now.toDateString();

    // Only check once per day for each meal
    if (lastCheckDate === currentDate) {
      return;
    }

    const mealTimes = getUserMealTimes();
    const newNotifications: MealNotification[] = [];

    // Check if it's within 15 minutes of any meal time
    const checkTime = (mealTime: string, mealType: 'breakfast' | 'lunch' | 'dinner') => {
      const [mealHour, mealMin] = mealTime.split(':').map(Number);
      const mealDate = new Date();
      mealDate.setHours(mealHour, mealMin, 0, 0);

      const timeDiff = now.getTime() - mealDate.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));

      // Show notification if within 15 minutes before or after meal time
      if (minutesDiff >= -15 && minutesDiff <= 15) {
        // Check if notification for this meal was already shown today
        const storageKey = `nutriwise-meal-${mealType}-${currentDate}`;
        if (!localStorage.getItem(storageKey)) {
          newNotifications.push({
            id: `${mealType}-${Date.now()}`,
            type: mealType,
            message: getMealMessages(mealType),
            time: mealTime,
            icon: getMealIcon(mealType),
          });
          localStorage.setItem(storageKey, 'true');
        }
      }
    };

    checkTime(mealTimes.breakfast, 'breakfast');
    checkTime(mealTimes.lunch, 'lunch');
    checkTime(mealTimes.dinner, 'dinner');

    if (newNotifications.length > 0) {
      setNotifications((prev) => [...prev, ...newNotifications]);
      setLastCheckDate(currentDate);
    }
  };

  useEffect(() => {
    // Check meal times immediately
    checkMealTimes();

    // Check every minute
    const interval = setInterval(checkMealTimes, 60000);

    return () => clearInterval(interval);
  }, [enabled]);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-2xl border-2 border-green-200 p-4 relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-60" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 capitalize">{notification.type} Time</h4>
                      <p className="text-sm text-gray-600 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{notification.time}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {notification.message}
                </p>
                <div className="mt-3 pt-3 border-t border-green-100">
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
