import { motion } from "motion/react";
import { Bell } from "lucide-react";

interface NotificationsViewProps {
  onNavigate: (page: string) => void;
}

export function NotificationsView({ onNavigate }: NotificationsViewProps) {
  const notifications = [
    {
      id: 1,
      type: "like",
      message: "이프로젝트님이 회원님의 게시물을 좋아합니다",
      time: "5분 전",
      read: false
    },
    {
      id: 2,
      type: "comment",
      message: "박디자인님이 댓글을 남겼습니다",
      time: "1시간 전",
      read: false
    },
    {
      id: 3,
      type: "follow",
      message: "최UI님이 회원님을 팔로우하기 시작했습니다",
      time: "3시간 전",
      read: true
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Bell size={32} style={{ color: "#1CB0F6" }} />
            <h1 className="text-3xl">알림</h1>
          </div>
          <p className="text-gray-600">새로운 활동을 확인하세요</p>
        </motion.div>

        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg p-6 ${
                !notification.read ? "border-l-4" : ""
              }`}
              style={!notification.read ? { borderColor: "#1CB0F6" } : {}}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#1CB0F6" }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
