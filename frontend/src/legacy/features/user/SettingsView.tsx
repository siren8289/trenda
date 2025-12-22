import { motion } from "motion/react";
import { Settings as SettingsIcon, Mail, Bell, Lock, Globe } from "lucide-react";
import { useState } from "react";

interface SettingsViewProps {
  onNavigate: (page: string) => void;
}

export function SettingsView({ onNavigate }: SettingsViewProps) {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon size={32} style={{ color: "#1CB0F6" }} />
          <h1 className="text-3xl">설정</h1>
        </div>
        <p className="text-gray-600">계정 및 앱 설정을 관리하세요</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-xl mb-6">알림 설정</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              <span>이메일 알림</span>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-[#1CB0F6] transition-colors cursor-pointer"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-400" />
              <span>푸시 알림</span>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={pushNotif}
                onChange={(e) => setPushNotif(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-[#1CB0F6] transition-colors cursor-pointer"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
            </label>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-xl mb-6">계정 설정</h2>
        <div className="space-y-3">
          <button className="w-full p-4 text-left bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3">
            <Lock size={20} className="text-gray-400" />
            <span>비밀번호 변경</span>
          </button>
          <button className="w-full p-4 text-left bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3">
            <Globe size={20} className="text-gray-400" />
            <span>언어 설정</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
