import React, { useState, useEffect } from 'react';
import { UserProfile, Scholarship, Volunteering, TipGuide, PaymentReceipt, PaymentInfo, DiscussionPost, AppNotification } from './types';
import { SCHOLARSHIPS_DATA } from './data/scholarships';
import { VOLUNTEERING_DATA } from './data/volunteering';
import { TIPS_DATA } from './data/tips';
import { INITIAL_DISCUSSIONS } from './data/discussions';

import { Header } from './components/Header';
import { UserProfileCard } from './components/UserProfileCard';
import { PaymentCcpBaridimobCard } from './components/PaymentCcpBaridimobCard';
import { ScholarshipCard } from './components/ScholarshipCard';
import { VolunteeringCard } from './components/VolunteeringCard';
import { TipGuideCard } from './components/TipGuideCard';
import { DiscussionsSection } from './components/DiscussionsSection';
import { OpportunityModal } from './components/OpportunityModal';
import { EditProfileModal } from './components/EditProfileModal';
import { PaymentModal } from './components/PaymentModal';
import { OpportunityFormModal } from './components/OpportunityFormModal';
import { EditPaymentInfoModal } from './components/EditPaymentInfoModal';
import { LegalWarningModal } from './components/LegalWarningModal';

import { Search, Sparkles, Filter, Bookmark, GraduationCap, HeartHandshake, Lightbulb, MessageSquare, X, AlertCircle, Plus, PlusCircle, RotateCcw } from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr-dz-1',
  name: 'عبد الرحمن زياني',
  email: 'a.ziani@etudiant.dz',
  phone: '0661 24 58 90',
  wilaya: '16 - الجزائر العاصمة',
  academicLevel: 'ماستر (M1/M2)',
  fieldOfStudy: 'هندسة البرمجيات والذكاء الاصطناعي',
  memberId: 'DZ-STU-2026-7842',
  isPremium: false,
  registrationDate: '2026-01-10',
  savedOpportunityIds: ['tr-burslari-2026', 'vol-eu-esc-spain-2026'],
};

const DEFAULT_PAYMENT_INFO: PaymentInfo = {
  ccpNumber: '0021458796',
  ccpCle: '45',
  ripNumber: '00799999002145879645',
  accountHolder: 'منصة المنح والتطوع الجزائرية (DZ-Edu Opportunities)',
  baridimobPhone: '0555 12 34 56',
};

export default function App() {
  // Load profile from localStorage or fallback
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('dz_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Load scholarships with persistence
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    try {
      const saved = localStorage.getItem('dz_scholarships');
      return saved ? JSON.parse(saved) : SCHOLARSHIPS_DATA;
    } catch {
      return SCHOLARSHIPS_DATA;
    }
  });

  // Load volunteering with persistence
  const [volunteeringList, setVolunteeringList] = useState<Volunteering[]>(() => {
    try {
      const saved = localStorage.getItem('dz_volunteering');
      return saved ? JSON.parse(saved) : VOLUNTEERING_DATA;
    } catch {
      return VOLUNTEERING_DATA;
    }
  });

  // Load payment info with persistence
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(() => {
    try {
      const saved = localStorage.getItem('dz_payment_info');
      return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_INFO;
    } catch {
      return DEFAULT_PAYMENT_INFO;
    }
  });

  // Save profile changes
  useEffect(() => {
    try {
      localStorage.setItem('dz_user_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Save scholarships changes
  useEffect(() => {
    try {
      localStorage.setItem('dz_scholarships', JSON.stringify(scholarships));
    } catch {
      // ignore
    }
  }, [scholarships]);

  // Save volunteering changes
  useEffect(() => {
    try {
      localStorage.setItem('dz_volunteering', JSON.stringify(volunteeringList));
    } catch {
      // ignore
    }
  }, [volunteeringList]);

  // Save payment info changes
  useEffect(() => {
    try {
      localStorage.setItem('dz_payment_info', JSON.stringify(paymentInfo));
    } catch {
      // ignore
    }
  }, [paymentInfo]);

  // Load discussions with persistence
  const [discussions, setDiscussions] = useState<DiscussionPost[]>(() => {
    try {
      const saved = localStorage.getItem('dz_discussions');
      return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
    } catch {
      return INITIAL_DISCUSSIONS;
    }
  });

  // Load notifications with persistence
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('dz_notifications');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'notif-1',
              type: 'reply' as const,
              title: 'رد جديد على سؤالك',
              message: '💬 رد جديد: قام أحد المستخدمين بالرد على استفسارك في قسم المحادثات. اضغط هنا لمشاهدة الرد.',
              createdAt: 'منذ 10 دقائق',
              isRead: false,
              targetPostId: 'post-1',
            },
            {
              id: 'notif-2',
              type: 'system_update' as const,
              title: 'جديد التطبيق والتحديثات',
              message: '📢 جديد التطبيق: توجد ميزات وتحديثات جديدة متاحة الآن داخل التطبيق!',
              createdAt: 'اليوم',
              isRead: false,
            },
          ];
    } catch {
      return [];
    }
  });

  // Save discussions changes
  useEffect(() => {
    try {
      localStorage.setItem('dz_discussions', JSON.stringify(discussions));
    } catch {
      // ignore
    }
  }, [discussions]);

  // Save notifications changes
  useEffect(() => {
    try {
      localStorage.setItem('dz_notifications', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  // Navigation & Filters
  const [activeTab, setActiveTab] = useState<'scholarships' | 'volunteering' | 'tips' | 'discussions'>('scholarships');
  const [scholarshipFundingFilter, setScholarshipFundingFilter] = useState<'all' | 'fully' | 'partially'>('all');
  const [volunteeringLocationFilter, setVolunteeringLocationFilter] = useState<'all' | 'inside' | 'outside'>('all');
  const [tipsCategoryFilter, setTipsCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSavedFilterActive, setIsSavedFilterActive] = useState(false);

  // Modals state
  const [selectedOpportunity, setSelectedOpportunity] = useState<Scholarship | Volunteering | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isOpportunityFormOpen, setIsOpportunityFormOpen] = useState(false);
  const [formInitialType, setFormInitialType] = useState<'scholarship' | 'volunteering'>('scholarship');
  const [editingItem, setEditingItem] = useState<Scholarship | Volunteering | null>(null);
  const [isEditPaymentInfoOpen, setIsEditPaymentInfoOpen] = useState(false);
  const [isLegalWarningOpen, setIsLegalWarningOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  // Toggle bookmark / save
  const handleToggleSave = (id: string) => {
    setProfile((prev) => {
      const isSaved = prev.savedOpportunityIds.includes(id);
      const updatedSaved = isSaved
        ? prev.savedOpportunityIds.filter((item) => item !== id)
        : [...prev.savedOpportunityIds, id];

      showNotification(
        isSaved ? 'تمت إزالة الفرصة من بطاقتك' : 'تم حفظ الفرصة بنجاح في بطاقة الطالب الخاصة بك'
      );

      return {
        ...prev,
        savedOpportunityIds: updatedSaved,
      };
    });
  };

  // Handle payment confirmation - immediately sends legal warning notification & opens alert
  const handleConfirmPayment = (receipt: PaymentReceipt) => {
    setProfile((prev) => ({
      ...prev,
      isPremium: true,
    }));

    // Add high-priority legal warning notification
    const legalNotification: AppNotification = {
      id: 'notif-legal-' + Date.now(),
      type: 'legal_warning',
      title: '⚠️ تنبيه وتحذير قانوني',
      message: '⚠️ تنبيه وتحذير قانوني:\nجميع البيانات والمعلومات داخل التطبيق هي ملك حصري ومحمية. يمنع منعًا باتًا تصوير الشاشة أو مشاركة أي محتوى عبر وسائل التواصل الاجتماعي. أي انتهاك لهذه الشروط سيعرّض صاحب الحساب لإلغاء اشتراكه فورًا وللعقوبات القانونية.',
      createdAt: 'الآن',
      isRead: false,
    };
    setNotifications((prev) => [legalNotification, ...prev]);

    // Immediately trigger prominent alert dialog
    setIsLegalWarningOpen(true);

    showNotification('⚠️ تنبيه وتحذير قانوني: يمنع منعًا باتًا تصوير الشاشة أو مشاركة المحتوى');
  };

  // Open add modal
  const handleOpenAdd = (type?: 'scholarship' | 'volunteering') => {
    setEditingItem(null);
    setFormInitialType(type || (activeTab === 'volunteering' ? 'volunteering' : 'scholarship'));
    setIsOpportunityFormOpen(true);
  };

  // Edit scholarship
  const handleEditScholarship = (item: Scholarship) => {
    setEditingItem(item);
    setFormInitialType('scholarship');
    setIsOpportunityFormOpen(true);
  };

  // Edit volunteering
  const handleEditVolunteering = (item: Volunteering) => {
    setEditingItem(item);
    setFormInitialType('volunteering');
    setIsOpportunityFormOpen(true);
  };

  // Delete scholarship
  const handleDeleteScholarship = (id: string) => {
    setScholarships((prev) => prev.filter((s) => s.id !== id));
    // Also remove from saved if present
    setProfile((prev) => ({
      ...prev,
      savedOpportunityIds: prev.savedOpportunityIds.filter((itemId) => itemId !== id),
    }));
    showNotification('تم حذف المنحة الدراسية من القائمة بنجاح');
  };

  // Delete volunteering
  const handleDeleteVolunteering = (id: string) => {
    setVolunteeringList((prev) => prev.filter((v) => v.id !== id));
    // Also remove from saved if present
    setProfile((prev) => ({
      ...prev,
      savedOpportunityIds: prev.savedOpportunityIds.filter((itemId) => itemId !== id),
    }));
    showNotification('تم حذف فرصة التطوع من القائمة بنجاح');
  };

  // Save scholarship (new or edit)
  const handleSaveScholarship = (scholarship: Scholarship, isNew: boolean) => {
    if (isNew) {
      setScholarships((prev) => [scholarship, ...prev]);
      showNotification('تمت إضافة المنحة الدراسية الجديدة بنجاح!');
      setActiveTab('scholarships');
    } else {
      setScholarships((prev) => prev.map((s) => (s.id === scholarship.id ? scholarship : s)));
      showNotification('تم تحديث بيانات بطاقة المنحة الدراسية بنجاح!');
      if (selectedOpportunity && selectedOpportunity.id === scholarship.id) {
        setSelectedOpportunity(scholarship);
      }
    }
  };

  // Save volunteering (new or edit)
  const handleSaveVolunteering = (vol: Volunteering, isNew: boolean) => {
    if (isNew) {
      setVolunteeringList((prev) => [vol, ...prev]);
      showNotification('تمت إضافة فرصة التطوع الجديدة بنجاح!');
      setActiveTab('volunteering');
    } else {
      setVolunteeringList((prev) => prev.map((v) => (v.id === vol.id ? vol : v)));
      showNotification('تم تحديث بيانات بطاقة التطوع بنجاح!');
      if (selectedOpportunity && selectedOpportunity.id === vol.id) {
        setSelectedOpportunity(vol);
      }
    }
  };

  // Reset defaults
  const handleResetAllDefaults = () => {
    setScholarships(SCHOLARSHIPS_DATA);
    setVolunteeringList(VOLUNTEERING_DATA);
    setPaymentInfo(DEFAULT_PAYMENT_INFO);
    setDiscussions(INITIAL_DISCUSSIONS);
    showNotification('تمت استعادة كافة البيانات والبطاقات الافتراضية بنجاح');
  };

  // Discussion Handlers
  const handleAddPost = (newPostData: Omit<DiscussionPost, 'id' | 'createdAt' | 'likes' | 'replies'>) => {
    const newPost: DiscussionPost = {
      ...newPostData,
      id: 'post-' + Date.now(),
      createdAt: 'الآن',
      likes: 0,
      replies: [],
    };
    setDiscussions((prev) => [newPost, ...prev]);
    showNotification('تم نشر سؤالك واستفسارك في قسم المحادثات بنجاح!');
  };

  const handleAddReply = (postId: string, replyContent: string, authorName: string) => {
    setDiscussions((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newReply = {
            id: 'rep-' + Date.now(),
            authorName,
            authorWilaya: profile.wilaya,
            authorLevel: profile.academicLevel,
            content: replyContent,
            createdAt: 'الآن',
            likes: 0,
          };
          return {
            ...post,
            replies: [...post.replies, newReply],
          };
        }
        return post;
      })
    );

    // Add notification matching the exact prompt template
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'reply',
      title: 'رد جديد على سؤالك',
      message: '💬 رد جديد: قام أحد المستخدمين بالرد على استفسارك في قسم المحادثات. اضغط هنا لمشاهدة الرد.',
      createdAt: 'الآن',
      isRead: false,
      targetPostId: postId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showNotification('💬 رد جديد: قام أحد المستخدمين بالرد على استفسارك في قسم المحادثات.');
  };

  const handleLikePost = (postId: string) => {
    setDiscussions((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: p.replies.map((r) =>
              r.id === replyId ? { ...r, likes: r.likes + 1 } : r
            ),
          };
        }
        return p;
      })
    );
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showNotification('تم تحديد جميع الإشعارات كمقروءة');
  };

  const handleTriggerTestNotification = (type: 'reply' | 'system_update' | 'legal_warning') => {
    if (type === 'legal_warning') {
      const legalNotif: AppNotification = {
        id: 'notif-' + Date.now(),
        type: 'legal_warning',
        title: '⚠️ تنبيه وتحذير قانوني',
        message:
          '⚠️ تنبيه وتحذير قانوني:\nجميع البيانات والمعلومات داخل التطبيق هي ملك حصري ومحمية. يمنع منعًا باتًا تصوير الشاشة أو مشاركة أي محتوى عبر وسائل التواصل الاجتماعي. أي انتهاك لهذه الشروط سيعرّض صاحب الحساب لإلغاء اشتراكه فورًا وللعقوبات القانونية.',
        createdAt: 'الآن',
        isRead: false,
      };
      setNotifications((prev) => [legalNotif, ...prev]);
      setIsLegalWarningOpen(true);
      showNotification('⚠️ تم إرسال التنبيه والتحذير القانوني للمستخدم فور تأكيد الدفع');
      return;
    }

    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      type,
      title: type === 'reply' ? 'رد جديد على سؤالك' : 'جديد التطبيق',
      message:
        type === 'reply'
          ? '💬 رد جديد: قام أحد المستخدمين بالرد على استفسارك في قسم المحادثات. اضغط هنا لمشاهدة الرد.'
          : '📢 جديد التطبيق: توجد ميزات وتحديثات جديدة متاحة الآن داخل التطبيق!',
      createdAt: 'الآن',
      isRead: false,
      targetPostId: 'post-1',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showNotification(newNotif.message);
  };

  // Filtered Scholarships
  const filteredScholarships = scholarships.filter((s) => {
    if (isSavedFilterActive && !profile.savedOpportunityIds.includes(s.id)) {
      return false;
    }
    if (scholarshipFundingFilter !== 'all' && s.fundingType !== scholarshipFundingFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        s.title.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.university.toLowerCase().includes(q) ||
        s.fields.some((f) => f.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Filtered Volunteering
  const filteredVolunteering = volunteeringList.filter((v) => {
    if (isSavedFilterActive && !profile.savedOpportunityIds.includes(v.id)) {
      return false;
    }
    if (volunteeringLocationFilter !== 'all' && v.locationType !== volunteeringLocationFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        v.title.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.organization.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Filtered Tips
  const filteredTips = TIPS_DATA.filter((t) => {
    if (tipsCategoryFilter !== 'all' && t.category !== tipsCategoryFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.categoryTitle.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Dynamic counts for scholarships by funding type (including all newly added or edited scholarships)
  const totalScholarshipsCount = scholarships.length;
  const fullyFundedScholarshipsCount = scholarships.filter((s) => s.fundingType === 'fully').length;
  const partiallyFundedScholarshipsCount = scholarships.filter((s) => s.fundingType === 'partially').length;

  // Dynamic counts for volunteering by location
  const totalVolunteeringCount = volunteeringList.length;
  const insideVolunteeringCount = volunteeringList.filter((v) => v.locationType === 'inside').length;
  const outsideVolunteeringCount = volunteeringList.filter((v) => v.locationType === 'outside').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main App Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsSavedFilterActive(false);
        }}
        savedCount={profile.savedOpportunityIds.length}
        onOpenSavedOnly={() => setIsSavedFilterActive(!isSavedFilterActive)}
        isSavedFilterActive={isSavedFilterActive}
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        onOpenAddOpportunity={() => handleOpenAdd()}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onTriggerTestNotification={handleTriggerTestNotification}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* ========================================================
            الواجهة الأولى (First Interface View):
            بطاقة فيها معلومات المستخدم وأيضا طريقة الدفع بـ CCP/baridimob
            ======================================================== */}
        <section id="first-view-hero" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span>لوحة الحساب وطرق الدفع المعتمدة</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </h2>
            <button
              id="reset-all-data-btn"
              type="button"
              onClick={handleResetAllDefaults}
              className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer transition-colors"
              title="استعادة البيانات الأصلية الافتراضية"
            >
              <RotateCcw className="w-3 h-3" />
              <span>استعادة البيانات الافتراضية</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {/* بطاقة معلومات المستخدم (User Profile Card) */}
            <UserProfileCard
              profile={profile}
              savedCount={profile.savedOpportunityIds.length}
              onEditProfile={() => setIsEditProfileOpen(true)}
              onOpenPayment={() => setIsPaymentModalOpen(true)}
            />

            {/* طريقة الدفع بـ CCP / BaridiMob (Payment Card) */}
            <PaymentCcpBaridimobCard
              paymentInfo={paymentInfo}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
              onEditPaymentInfo={() => setIsEditPaymentInfoOpen(true)}
              isPremium={profile.isPremium}
            />
          </div>

          {/* Quick Access to Discussions Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-5 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-right">
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black">
                  قسم الأسئلة والمحادثات للطلبة الجزائريين 💬
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  اطرح تساؤلاتك، شارك في النقاشات، وتلقّ إشعارات فورية عند ورود أي رد جديد على استفسارك!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTab('discussions');
                setIsSavedFilterActive(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-black transition-all shadow-xs cursor-pointer flex-shrink-0 whitespace-nowrap"
            >
              فتح قسم المحادثات الآن ←
            </button>
          </div>
        </section>

        {/* ========================================================
            Search Bar & Filter Controls Bar
            ======================================================== */}
        {activeTab !== 'discussions' && (
          <section className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <input
                id="search-opportunities-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'scholarships'
                    ? 'ابحث باسم المنحة، الدولة، التخصص، أو الجامعة...'
                    : activeTab === 'volunteering'
                    ? 'ابحث باسم فرصة التطوع، الولاية، الدولة، أو المنظمة...'
                    : 'ابحث في النصائح والإرشادات، رسالة الدافع، الفيزا...'
                }
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 pr-9 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-slate-50/50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-3 left-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Saved Filter toggle indicator */}
            {isSavedFilterActive && (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
                <Bookmark className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                <span>عرض الفرص المحفوظة في بطاقتك فقط</span>
                <button
                  type="button"
                  onClick={() => setIsSavedFilterActive(false)}
                  className="text-amber-700 hover:text-amber-950 mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Sub-Filters per active tab */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
            {activeTab === 'scholarships' && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-600 font-medium ml-2">نوع تمويل المنحة:</span>
                <button
                  id="filter-schol-all"
                  type="button"
                  onClick={() => setScholarshipFundingFilter('all')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    scholarshipFundingFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>الكل</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    scholarshipFundingFilter === 'all'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    {totalScholarshipsCount}
                  </span>
                </button>

                <button
                  id="filter-schol-fully"
                  type="button"
                  onClick={() => setScholarshipFundingFilter('fully')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    scholarshipFundingFilter === 'fully'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span>ممولة بالكامل (Fully Funded)</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    scholarshipFundingFilter === 'fully'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-200/80 text-emerald-900'
                  }`}>
                    {fullyFundedScholarshipsCount}
                  </span>
                </button>

                <button
                  id="filter-schol-partially"
                  type="button"
                  onClick={() => setScholarshipFundingFilter('partially')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    scholarshipFundingFilter === 'partially'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>ممولة جزئياً (Partially Funded)</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    scholarshipFundingFilter === 'partially'
                      ? 'bg-amber-700 text-white'
                      : 'bg-amber-200/80 text-amber-950'
                  }`}>
                    {partiallyFundedScholarshipsCount}
                  </span>
                </button>
              </div>
            )}

            {activeTab === 'volunteering' && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-600 font-medium ml-2">نطاق التطوع:</span>
                <button
                  id="filter-vol-all"
                  type="button"
                  onClick={() => setVolunteeringLocationFilter('all')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    volunteeringLocationFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>الكل</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    volunteeringLocationFilter === 'all'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    {totalVolunteeringCount}
                  </span>
                </button>

                <button
                  id="filter-vol-inside"
                  type="button"
                  onClick={() => setVolunteeringLocationFilter('inside')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    volunteeringLocationFilter === 'inside'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <span>🇩🇿</span>
                  <span>تطوع داخل الجزائر (محلي)</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    volunteeringLocationFilter === 'inside'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-200/80 text-emerald-900'
                  }`}>
                    {insideVolunteeringCount}
                  </span>
                </button>

                <button
                  id="filter-vol-outside"
                  type="button"
                  onClick={() => setVolunteeringLocationFilter('outside')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    volunteeringLocationFilter === 'outside'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
                  }`}
                >
                  <span>✈️</span>
                  <span>تطوع خارج الجزائر (دولي)</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    volunteeringLocationFilter === 'outside'
                      ? 'bg-sky-700 text-white'
                      : 'bg-sky-200/80 text-sky-950'
                  }`}>
                    {outsideVolunteeringCount}
                  </span>
                </button>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-600 font-medium ml-2">تصنيف النصائح:</span>
                <button
                  type="button"
                  onClick={() => setTipsCategoryFilter('all')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    tipsCategoryFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  جميع الأدلة ({TIPS_DATA.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTipsCategoryFilter('motivation_letter')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    tipsCategoryFilter === 'motivation_letter'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  رسالة الدافع
                </button>
                <button
                  type="button"
                  onClick={() => setTipsCategoryFilter('cv_europass')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    tipsCategoryFilter === 'cv_europass'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  سيرة ذاتية Europass
                </button>
                <button
                  type="button"
                  onClick={() => setTipsCategoryFilter('translation_legalization')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    tipsCategoryFilter === 'translation_legalization'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  الترجمة والتصديق بالجزائر
                </button>
                <button
                  type="button"
                  onClick={() => setTipsCategoryFilter('visa_dz')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    tipsCategoryFilter === 'visa_dz'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  ملف الفيزا (Visa)
                </button>
              </div>
            )}
          </div>
        </section>
        )}

        {/* ========================================================
            Tab 1: المنح الدراسية (Scholarships Section)
            ======================================================== */}
        {activeTab === 'scholarships' && (
          <section id="scholarships-section" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <span>دليل المنح الدراسية للطلبة الجزائريين</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  منح حكومية وجامعية معتمدة ممولة بالكامل وممولة جزئياً لمختلف الأطوار الأكاديمية
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-700 font-medium bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  {scholarshipFundingFilter === 'all' && !isSavedFilterActive && !searchQuery.trim() ? (
                    <span>
                      <strong className="text-slate-900 font-bold">{totalScholarshipsCount}</strong> منحة متوفرة (
                      <strong className="text-emerald-700 font-bold">{fullyFundedScholarshipsCount}</strong> ممولة بالكامل •{' '}
                      <strong className="text-amber-700 font-bold">{partiallyFundedScholarshipsCount}</strong> جزئياً)
                    </span>
                  ) : (
                    <span>
                      <strong className="text-slate-900 font-bold">{filteredScholarships.length}</strong> من أصل{' '}
                      <strong className="text-slate-900 font-bold">{totalScholarshipsCount}</strong> منحة
                    </span>
                  )}
                </span>
                <button
                  id="add-scholarship-btn"
                  type="button"
                  onClick={() => handleOpenAdd('scholarship')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm shadow-emerald-200 hover:shadow-md"
                  title="فتح نموذج فارغ لإدخال وكتابة منحة دراسية جديدة"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة منحة جديدة</span>
                </button>
              </div>
            </div>

            {filteredScholarships.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">لا توجد منح مطابقة للبحث أو الفلتر</h4>
                <p className="text-xs text-slate-500">
                  جرّب إزالة شروط التصفية أو إلغاء تحديد الفرص المحفوظة، أو قم بإضافة منحة جديدة.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setScholarshipFundingFilter('all');
                      setSearchQuery('');
                      setIsSavedFilterActive(false);
                    }}
                    className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                  >
                    إعادة تعيين الفلاتر
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('scholarship')}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    + إضافة منحة دراسية
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredScholarships.map((schol) => (
                  <ScholarshipCard
                    key={schol.id}
                    scholarship={schol}
                    isSaved={profile.savedOpportunityIds.includes(schol.id)}
                    onToggleSave={handleToggleSave}
                    onSelect={(s) => setSelectedOpportunity(s)}
                    onEdit={handleEditScholarship}
                    onDelete={handleDeleteScholarship}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            Tab 2: فرص التطوع (Volunteering Section - Inside & Outside DZ)
            ======================================================== */}
        {activeTab === 'volunteering' && (
          <section id="volunteering-section" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-600" />
                  <span>فرص التطوع داخل وخارج الجزائر</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  برامج تطوع إنسانية وبيئية وتعليمية مع تغطية الإقامة والتنقل وشهادات معتمدة
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-700 font-medium bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  {volunteeringLocationFilter === 'all' && !isSavedFilterActive && !searchQuery.trim() ? (
                    <span>
                      <strong className="text-slate-900 font-bold">{totalVolunteeringCount}</strong> فرصة تطوع (
                      <strong className="text-emerald-700 font-bold">{insideVolunteeringCount}</strong> داخل الجزائر •{' '}
                      <strong className="text-sky-700 font-bold">{outsideVolunteeringCount}</strong> بالخارج)
                    </span>
                  ) : (
                    <span>
                      <strong className="text-slate-900 font-bold">{filteredVolunteering.length}</strong> من أصل{' '}
                      <strong className="text-slate-900 font-bold">{totalVolunteeringCount}</strong> فرصة
                    </span>
                  )}
                </span>
                <button
                  id="add-volunteering-btn"
                  type="button"
                  onClick={() => handleOpenAdd('volunteering')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة فرصة تطوع</span>
                </button>
              </div>
            </div>

            {filteredVolunteering.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">لا توجد فرص تطوع مطابقة للبحث</h4>
                <p className="text-xs text-slate-500">
                  جرّب تغيير خيارات البحث بين داخل وخارج الجزائر، أو قم بإضافة فرصة تطوع جديدة.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVolunteeringLocationFilter('all');
                      setSearchQuery('');
                      setIsSavedFilterActive(false);
                    }}
                    className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                  >
                    إعادة تعيين الفلاتر
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('volunteering')}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    + إضافة فرصة تطوع
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVolunteering.map((vol) => (
                  <VolunteeringCard
                    key={vol.id}
                    volunteering={vol}
                    isSaved={profile.savedOpportunityIds.includes(vol.id)}
                    onToggleSave={handleToggleSave}
                    onSelect={(v) => setSelectedOpportunity(v)}
                    onEdit={handleEditVolunteering}
                    onDelete={handleDeleteVolunteering}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            Tab 3: خانة النصائح والإرشادات (Tips & Guidance Section)
            ======================================================== */}
        {activeTab === 'tips' && (
          <section id="tips-guidance-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                  <span>خانة النصائح والإرشادات للتقديم الأكاديمي والتطوعي</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  نماذج جاهزة لرسائل الدافع، صياغة السيرة الذاتية Europass، وخطوات الفيزا والتصديق
                </p>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {filteredTips.length} دليل إرشادي
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredTips.map((guide) => (
                <TipGuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            Tab 4: قسم الأسئلة والمحادثات (Discussions Section)
            ======================================================== */}
        {activeTab === 'discussions' && (
          <DiscussionsSection
            posts={discussions}
            onAddPost={handleAddPost}
            onAddReply={handleAddReply}
            onLikePost={handleLikePost}
            onLikeReply={handleLikeReply}
            currentUserName={profile.name}
            currentUserWilaya={profile.wilaya}
            currentUserLevel={profile.academicLevel}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700">
            منح وتطوع الجزائر • المنصة الأولى للطلبة والشباب الجزائري 🇩🇿
          </p>
          <p className="text-[11px] text-slate-400">
            دعم كامل للمنح الممولة بالكامل وجزئياً، برامج التطوع المحلية والدولية، مع الدفع المعتمد عبر بريد الجزائر CCP وبريدي موب.
          </p>
        </div>
      </footer>

      {/* Opportunity Modal (Scholarship / Volunteering) */}
      <OpportunityModal
        item={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        isSaved={selectedOpportunity ? profile.savedOpportunityIds.includes(selectedOpportunity.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={profile}
        onSave={(updated) => {
          setProfile(updated);
          showNotification('تم تحديث بطاقة معلومات الطالب بنجاح');
        }}
      />

      {/* Payment CCP / BaridiMob Confirmation Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirmPayment={handleConfirmPayment}
        userDefaultName={profile.name}
        userDefaultPhone={profile.phone}
      />

      {/* Add / Edit Opportunity Modal (Scholarship or Volunteering) */}
      <OpportunityFormModal
        isOpen={isOpportunityFormOpen}
        onClose={() => {
          setIsOpportunityFormOpen(false);
          setEditingItem(null);
        }}
        initialType={formInitialType}
        editItem={editingItem}
        onSaveScholarship={handleSaveScholarship}
        onSaveVolunteering={handleSaveVolunteering}
      />

      {/* Edit Payment CCP / BaridiMob Details Modal */}
      <EditPaymentInfoModal
        isOpen={isEditPaymentInfoOpen}
        onClose={() => setIsEditPaymentInfoOpen(false)}
        paymentInfo={paymentInfo}
        onSave={(updated) => {
          setPaymentInfo(updated);
          showNotification('تم تحديث أرقام ومعلومات بطاقة الدفع البريدي بنجاح');
        }}
        onResetDefault={() => {
          setPaymentInfo(DEFAULT_PAYMENT_INFO);
          showNotification('تمت استعادة معلومات بطاقة CCP الافتراضية');
        }}
      />

      {/* Immediate Legal Warning Alert Dialog on Payment Confirmation */}
      <LegalWarningModal
        isOpen={isLegalWarningOpen}
        onClose={() => setIsLegalWarningOpen(false)}
      />
    </div>
  );
}
