"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export default function FriendsPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [friendToRemove, setFriendToRemove] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [removeToast, setRemoveToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Haqiqiy do'stlar va so'rovlarni yuklash
  useEffect(() => {
    if (!user) return;
    fetchFriends();
  }, [user]);

  const fetchFriends = async () => {
    try {
      // O'zingizga kelgan so'rovlar
      const { data: reqData } = await supabase
        .from('friendships')
        .select('*, users!friendships_user_id_fkey(username, display_name)')
        .eq('friend_id', user!.id)
        .eq('status', 'pending');
        
      if (reqData) setRequests(reqData);

      // Qabul qilingan do'stlar (2 tomonlama tekshirish zarur, sodda usul):
      const { data: frData1 } = await supabase
        .from('friendships')
        .select('*, users!friendships_friend_id_fkey(username, display_name)')
        .eq('user_id', user!.id)
        .eq('status', 'accepted');

      const { data: frData2 } = await supabase
        .from('friendships')
        .select('*, users!friendships_user_id_fkey(username, display_name)')
        .eq('friend_id', user!.id)
        .eq('status', 'accepted');

      const combined = [
         ...(frData1?.map(f => ({ ...f, friendDisplay: f.users?.display_name || 'User', friendHandle: f.users?.username, target_id: f.friend_id })) || []),
         ...(frData2?.map(f => ({ ...f, friendDisplay: f.users?.display_name || 'User', friendHandle: f.users?.username, target_id: f.user_id })) || [])
      ];
      setFriends(combined);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteByUsername = async () => {
    const handle = prompt("Do'stingizning Username (login) nomini kiriting:");
    if (!handle) return;
    
    // Foydalanuvchini izlash
    const { data: targetUser } = await supabase.from('users').select('id').eq('username', handle.toLowerCase()).single();
    if (!targetUser) {
      alert("Foydalanuvchi topilmadi!");
      return;
    }
    if (targetUser.id === user?.id) {
      alert("O'zingizni qo'sha olmaysiz!");
      return;
    }

    const { error } = await supabase.from('friendships').insert({
      user_id: user?.id,
      friend_id: targetUser.id,
      status: 'pending'
    });

    if (error) alert("Xatolik yoki siz allaqachon do'stsiz: " + error.message);
    else alert("So'rov yuborildi!");
  };

  const acceptRequest = async (id: string) => {
    await supabase.from('friendships').update({ status: 'accepted' }).eq('id', id);
    fetchFriends(); // update list
  };

  const handleRemoveFriend = async () => {
    if (!friendToRemove) return;
    await supabase.from('friendships').delete().eq('id', friendToRemove.id);
    setRemoveToast(`${friendToRemove.friendDisplay} deleted`);
    setFriendToRemove(null);
    fetchFriends();
    setTimeout(() => setRemoveToast(null), 3500);
  };

  const isEmpty = !isLoading && friends.length === 0 && requests.length === 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-colors duration-500 pb-20 relative overflow-x-hidden">
      
      {/* Header */}
      {isEmpty ? (
        <header className="sticky top-0 z-40 bg-[#F8F9FA]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl transition-colors duration-500">
          <div className="max-w-md mx-auto flex items-center justify-between px-6 h-20 pt-2">
            <h1 className="text-[26px] font-black text-[#0F172A] dark:text-white tracking-tight">Friends</h1>
            
            <button className="w-[42px] h-[42px] rounded-full bg-[#F1F5F9] dark:bg-white/10 text-[#64748B] dark:text-white flex items-center justify-center hover:opacity-80 transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </header>
      ) : (
        <header className="sticky top-0 z-40 bg-[#F8F9FA]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-border/10 transition-colors duration-500">
          <div className="max-w-md mx-auto flex items-center justify-between px-4 h-16">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h1 className="text-[19px] font-black text-[#0F172A] dark:text-white">Friends</h1>
            
            <button className="w-10 h-10 -mr-1 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:opacity-80 transition-opacity shadow-md">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </header>
      )}

      {/* Toast Notification */}
      {removeToast && (
        <div className="max-w-md mx-auto relative z-50">
          <div className="absolute top-4 right-[-10px] sm:right-4 w-[260px] bg-[#0F172A] dark:bg-[#1a1a2e] outline outline-1 outline-white/10 text-white px-5 py-4 rounded-[20px] shadow-2xl animate-in fade-in slide-in-from-right-8 duration-300">
            <p className="text-[14px] leading-snug font-medium">
              {removeToast}
            </p>
          </div>
        </div>
      )}

      <main className="max-w-md mx-auto pt-4 pb-8">
        
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center pt-[5vh] pb-10 px-6 animate-in fade-in duration-500">
            {/* Waving Hand Icon with subtle pulsing rings */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800/30 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-40 mix-blend-multiply dark:mix-blend-screen" />
              <div className="absolute inset-4 bg-gray-100 dark:bg-gray-800/50 rounded-full animate-[ping_3s_ease-in-out_infinite_1s] opacity-50 mix-blend-multiply dark:mix-blend-screen" />
              <div className="relative w-28 h-28 bg-white dark:bg-[#1C1C28] rounded-full shadow-sm flex items-center justify-center border border-gray-50 dark:border-white/5 z-10 overflow-hidden">
                <svg className="w-14 h-14 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-4 0v4" />
                  <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                  <path d="M10 10.5V3a2 2 0 0 0-4 0v9" />
                  <path d="M18 15h1a2 2 0 0 0 2-2v-4a2 2 0 0 0-4 0v2z" />
                  <path d="M6 12v-1a2 2 0 0 0-4 0v5.5c0 3.3 2.7 6 6 6h2c2.1 0 4.1-1.1 5.2-3" />
                  {/* Motion Lines */}
                  <path d="M22 6c0-1.7-1.3-3-3-3" strokeDasharray="2 4" />
                  <path d="M22 10c0-2-1.5-3.5-3.5-3.5" strokeDasharray="2 4" />
                </svg>
              </div>
            </div>

            <h2 className="text-[24px] font-black text-[#0F172A] dark:text-white mb-2.5 text-center tracking-tight">
              No friends yet
            </h2>
            
            <p className="text-[15px] font-medium text-[#64748B] dark:text-gray-400 text-center leading-[1.6] mb-10 max-w-[280px]">
              Connect with people to share your daily pulse and see how they're feeling.
            </p>

            <div className="w-full space-y-3.5">
              <button className="w-full h-[56px] bg-[#D4537E] hover:bg-[#C0466E] active:bg-[#A8385B] text-white text-[16px] font-bold rounded-[18px] flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#D4537E]/20 active:scale-[0.98]">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <rect x="17" y="5" width="6" height="14" rx="2" />
                </svg>
                Sync Contacts
              </button>
              
              <button 
                onClick={inviteByUsername}
                className="w-full h-[56px] bg-[#F1F5F9] hover:bg-[#E2E8F0] dark:bg-white/5 dark:hover:bg-white/10 active:bg-gray-200 text-[#0F172A] dark:text-white text-[16px] font-bold rounded-[18px] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
                Invite by Username
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="px-4 mb-7 relative z-10">
              <div className="bg-white dark:bg-[#1C1C28] h-12 rounded-full px-4 flex items-center shadow-sm border border-transparent dark:border-white/5 transition-colors duration-500">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search friends" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 text-[15px] font-medium text-foreground outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Friend Requests */}
            {requests.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-5 mb-3">
                  <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-widest">
                    Friend Requests
                  </h2>
                  <div className="bg-gray-200 dark:bg-[#1C1C28] text-gray-700 dark:text-gray-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {requests.length}
                  </div>
                </div>
                
                {requests.map(req => (
                  <div key={req.id} className="px-4 cursor-pointer mb-2">
                    <div className="bg-white dark:bg-[#1C1C28] rounded-[24px] p-4 flex items-center shadow-sm border border-transparent dark:border-white/5 transition-colors duration-500">
                      {/* Avatar */}
                      <div className="w-[50px] h-[50px] rounded-full bg-[#F3AD8E] overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                        <span className="text-4xl absolute -bottom-2 text-white/50">👤</span>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 ml-4 pr-2">
                        <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-white mb-0.5">{req.users?.display_name || "User"}</h3>
                        <p className="text-[13px] text-[#64748B] dark:text-gray-400 font-medium tracking-wide">@{req.users?.username}</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button 
                          onClick={() => acceptRequest(req.id)}
                          className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-5 py-2.5 rounded-full text-[13px] font-bold hover:scale-105 active:scale-95 transition-all">
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Your Friends */}
            <div className="mt-8">
              <div className="px-5 mb-3">
                <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-widest">
                  Your Friends
                </h2>
              </div>
              <div className="px-4 space-y-3">
                {friends.length === 0 ? (
                  <p className="text-sm font-medium text-center text-gray-500 mt-6 mb-6">You have no friends on this list yet.</p>
                ) : (
                  friends.map((friend) => (
                    <div 
                      key={friend.id} 
                      onClick={() => setFriendToRemove(friend)}
                      className={`bg-white dark:bg-[#1C1C28] rounded-[24px] p-4 flex items-center shadow-sm border border-transparent dark:border-white/5 transition-colors duration-500 cursor-pointer hover:shadow-md`}
                    >
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-[56px] h-[56px] rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center`}>
                          <span className="text-4xl absolute -bottom-2 text-white/50">👤</span>
                        </div>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 ml-4 pr-2">
                        <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-white mb-0.5">{friend.friendDisplay}</h3>
                        <p className="text-[13px] text-[#64748B] dark:text-gray-400 font-medium tracking-wide">@{friend.friendHandle}</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex-shrink-0">
                         <span className="text-[13px] font-medium text-[#D4537E]">
                           Remove
                         </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

      </main>
      
      {/* Remove Friend Modal */}
      {friendToRemove && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
            onClick={() => setFriendToRemove(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-[#1C1C28] w-full max-w-md mx-auto rounded-t-[32px] px-6 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-300 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-[68px] h-[68px] rounded-full bg-[#FFEFEF] dark:bg-rose-950/40 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FF4D4D]" viewBox="0 0 24 24" fill="currentColor">
                  {/* Person head */}
                  <circle cx="10" cy="8" r="4.5" />
                  {/* Person body */}
                  <path d="M10 14c-3.31 0-10 1.67-10 5v2h20v-2c0-3.33-6.69-5-10-5z" />
                  {/* Minus sign */}
                  <rect x="15" y="7" width="8" height="2.5" rx="1" fill="#FF4D4D" stroke="white" strokeWidth="0.5" className="dark:stroke-[#1C1C28]" />
                </svg>
              </div>
              
              <h3 className="text-[22px] font-black text-[#0F172A] dark:text-white mb-3 max-w-[260px] leading-tight flex flex-col">
                Remove {friendToRemove.friendDisplay}?
              </h3>
              
              <p className="text-[15px] text-[#64748B] dark:text-gray-400 leading-[1.6] mb-8 px-2 max-w-[290px]">
                Are you sure you want to remove them from your friends list? This action cannot be undone.
              </p>
              
              <div className="w-full space-y-3.5">
                <button 
                  onClick={handleRemoveFriend} 
                  className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:bg-[#B91C1C] dark:active:bg-[#991B1B] text-white text-[16px] font-bold py-4 rounded-2xl transition-all shadow-sm active:scale-95"
                >
                  Remove
                </button>
                <button 
                  onClick={() => setFriendToRemove(null)}
                  className="w-full bg-[#F1F5F9] hover:bg-[#E2E8F0] dark:bg-white/5 dark:hover:bg-white/10 active:bg-gray-200 text-[#0F172A] dark:text-white text-[16px] font-bold py-4 rounded-2xl transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!friendToRemove && <BottomNav />}
    </div>
  );
}
