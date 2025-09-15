import React, { useState, useEffect } from 'react';
import { Home, Users, User, Copy, Check, Gift, DollarSign, Star } from 'lucide-react';

const TelegramMiniApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [holdProgress, setHoldProgress] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [userData, setUserData] = useState({https://github.com/Salarlotfi1381/my-mini-app/blob/main/telegram_miniapp_interface%20(1).tsx
    username: 'محمد_احمدی',
    uid: 'UID123456789',
    totalReferrals: 7,
    bonusEarned: 0,
    referralLink: 'https://t.me/YourBot?start=ref123456',
    referredUsers: [
      { name: 'علی رضایی', joinDate: '۱۴۰۳/۰۶/۱۵', verified: true },
      { name: 'فاطمه محمدی', joinDate: '۱۴۰۳/۰۶/۱۶', verified: true },
      { name: 'حسن کریمی', joinDate: '۱۴۰۳/۰۶/۱۷', verified: true },
      { name: 'زهرا احمدی', joinDate: '۱۴۰۳/۰۶/۱۸', verified: true },
      { name: 'امیر حسینی', joinDate: '۱۴۰۳/۰۶/۱۹', verified: true },
      { name: 'مریم صادقی', joinDate: '۱۴۰۳/۰۶/۲۰', verified: true },
      { name: 'رضا مرادی', joinDate: '۱۴۰۳/۰۶/۲۱', verified: false }
    ]
  });

  // شبیه‌سازی نگه داشتن دکمه
  useEffect(() => {
    let interval;
    if (isHolding && !isVerified) {
      interval = setInterval(() => {
        setHoldProgress(prev => {
          if (prev >= 100) {
            setIsVerified(true);
            setIsHolding(false);
            return 100;
          }
          return prev + 2.5;
        });
      }, 100);
    } else if (!isHolding) {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding, isVerified]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(userData.referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const VerificationScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white p-6">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center max-w-sm w-full">
        <div className="text-6xl mb-6">🤖</div>
        <h2 className="text-2xl font-bold mb-4">احراز هویت انسانی</h2>
        <p className="mb-8 text-white/90">برای ادامه، دکمه زیر را برای ۴ ثانیه نگه دارید</p>
        
        <div className="relative mb-6">
          <div className="w-32 h-32 mx-auto relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/30"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - holdProgress / 100)}`}
                className="text-green-400 transition-all duration-100"
              />
            </svg>
            <button
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              className="absolute inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg active:scale-95 transition-transform flex items-center justify-center text-2xl"
            >
              {holdProgress < 100 ? '👆' : '✅'}
            </button>
          </div>
          <div className="mt-4 text-lg font-semibold">
            {Math.floor(holdProgress / 25)}/4 ثانیه
          </div>
        </div>
      </div>
    </div>
  );

  const HomeTab = () => (
    <div className="p-6 space-y-6">
      {/* خوشامدگویی */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">سلام {userData.username}! 👋</h2>
        <p className="opacity-90">به ربات رفرال ما خوش آمدید</p>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Users className="w-6 h-6 ml-2" />
            <span className="font-semibold">رفرال‌های شما</span>
          </div>
          <div className="text-3xl font-bold">{userData.totalReferrals}</div>
          <div className="text-sm opacity-90">{10 - userData.totalReferrals} تا برای پاداش</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-4">
          <div className="flex items-center mb-2">
            <DollarSign className="w-6 h-6 ml-2" />
            <span className="font-semibold">پاداش دریافتی</span>
          </div>
          <div className="text-3xl font-bold">${userData.bonusEarned}</div>
          <div className="text-sm opacity-90">بونوس فیوچرز</div>
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">پیشرفت تا پاداش بعدی</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
            style={{width: `${(userData.totalReferrals % 10) * 10}%`}}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{userData.totalReferrals % 10} از ۱۰</span>
          <span>+۱$ پاداش</span>
        </div>
      </div>

      {/* آخرین رفرال‌ها */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">آخرین دعوت‌شدگان</h3>
        <div className="space-y-3">
          {userData.referredUsers.slice(-3).reverse().map((user, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="mr-3">
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.joinDate}</div>
                </div>
              </div>
              {user.verified ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-yellow-400 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ReferralTab = () => (
    <div className="p-6 space-y-6">
      {/* لینک رفرال */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Gift className="w-6 h-6 ml-2" />
          لینک اختصاصی شما
        </h2>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
          <div className="text-sm mb-2">لینک دعوت:</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/30 rounded-lg p-3 text-sm font-mono break-all">
              {userData.referralLink}
            </div>
            <button
              onClick={copyReferralLink}
              className="bg-white/30 hover:bg-white/40 p-3 rounded-lg transition-colors"
            >
              {linkCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm opacity-90">هر ۱۰ دعوت = ۱ دلار پاداش</p>
        </div>
      </div>

      {/* آمار رفرال */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">آمار دعوت‌های شما</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{userData.totalReferrals}</div>
            <div className="text-sm text-gray-600">کل دعوت‌ها</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {userData.referredUsers.filter(u => u.verified).length}
            </div>
            <div className="text-sm text-gray-600">تایید شده</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {userData.referredUsers.filter(u => !u.verified).length}
            </div>
            <div className="text-sm text-gray-600">در انتظار</div>
          </div>
        </div>
      </div>

      {/* لیست دعوت‌شدگان */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">کاربران دعوت‌شده</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {userData.referredUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="mr-3">
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">عضویت: {user.joinDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user.verified ? (
                  <>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">تایید شده</span>
                    <Check className="w-5 h-5 text-green-500" />
                  </>
                ) : (
                  <>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">در انتظار</span>
                    <div className="w-5 h-5 rounded-full bg-yellow-400 animate-pulse"></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="p-6 space-y-6">
      {/* پروفایل کاربر */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl p-6 text-center">
        <div className="w-20 h-20 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">{userData.username}</h2>
        <p className="opacity-90 mt-1">UID: {userData.uid}</p>
      </div>

      {/* آمار کلی */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">آمار حساب شما</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-700">کل رفرال‌ها</span>
            <span className="font-bold text-blue-600">{userData.totalReferrals}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">پاداش دریافتی</span>
            <span className="font-bold text-green-600">${userData.bonusEarned}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span className="text-gray-700">وضعیت حساب</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              فعال ✅
            </span>
          </div>
        </div>
      </div>

      {/* درخواست برداشت */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">برداشت پاداش</h3>
        {userData.bonusEarned > 0 ? (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-2xl font-bold text-green-600">${userData.bonusEarned}</div>
                <div className="text-sm text-gray-600">قابل برداشت</div>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              درخواست برداشت
            </button>
            <p className="text-xs text-gray-500 text-center">
              برای برداشت، UID اکانت خود را ارسال کنید
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💰</div>
            <p className="text-gray-600">هنوز پاداشی برای برداشت ندارید</p>
            <p className="text-sm text-gray-500 mt-2">
              {10 - userData.totalReferrals} دعوت تا اولین پاداش
            </p>
          </div>
        )}
      </div>

      {/* تنظیمات */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">تنظیمات</h3>
        <div className="space-y-3">
          <button className="w-full text-right p-3 hover:bg-gray-50 rounded-lg transition-colors">
            📱 ویرایش پروفایل
          </button>
          <button className="w-full text-right p-3 hover:bg-gray-50 rounded-lg transition-colors">
            🔔 تنظیمات اعلان‌ها
          </button>
          <button className="w-full text-right p-3 hover:bg-gray-50 rounded-lg transition-colors">
            ❓ راهنما و پشتیبانی
          </button>
          <button className="w-full text-right p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600">
            🚪 خروج از حساب
          </button>
        </div>
      </div>
    </div>
  );

  if (!isVerified) {
    return <VerificationScreen />;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      {/* محتوای اصلی */}
      <div className="pb-20">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'referral' && <ReferralTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>

      {/* منوی پایینی */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">خانه</span>
          </button>
          
          <button
            onClick={() => setActiveTab('referral')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              activeTab === 'referral' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">رفرال</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">پروفایل</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramMiniApp;
