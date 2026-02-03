import { motion } from "motion/react";
import { Trophy, Users, Calendar, Award, Clock, Star } from "lucide-react";

export function CommunityContestView() {
  const contests = [
    {
      id: 1,
      title: "2024 UI 디자인 챌린지",
      description: "혁신적인 사용자 인터페이스 디자인 공모전",
      prize: "상금 1,000만원",
      deadline: "2024.02.28",
      participants: 234,
      status: "진행중",
      daysLeft: 15,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"
    },
    {
      id: 2,
      title: "모바일 앱 아이콘 디자인",
      description: "독창적인 모바일 앱 아이콘 디자인 공모",
      prize: "상금 500만원",
      deadline: "2024.03.15",
      participants: 189,
      status: "진행중",
      daysLeft: 30,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
    },
    {
      id: 3,
      title: "웹 애니메이션 쇼케이스",
      description: "창의적인 웹 애니메이션 작품 공모전",
      prize: "상금 700만원",
      deadline: "2024.03.31",
      participants: 156,
      status: "진행중",
      daysLeft: 45,
      image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80"
    },
    {
      id: 4,
      title: "브랜딩 디자인 공모전",
      description: "스타트업을 위한 브랜드 아이덴티티 디자인",
      prize: "상금 800만원",
      deadline: "2024.04.15",
      participants: 203,
      status: "모집중",
      daysLeft: 60,
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
    },
    {
      id: 5,
      title: "3D UI 인터페이스 챌린지",
      description: "차세대 3D 사용자 경험 디자인",
      prize: "상금 1,200만원",
      deadline: "2024.04.30",
      participants: 145,
      status: "모집중",
      daysLeft: 75,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
    },
    {
      id: 6,
      title: "다크모드 UI 디자인",
      description: "아름다운 다크모드 인터페이스 공모",
      prize: "상금 600만원",
      deadline: "2024.05.15",
      participants: 178,
      status: "모집중",
      daysLeft: 90,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    }
  ];

  const winners = [
    { rank: 1, name: "김디자이너", project: "혁신적인 대시보드 UI", prize: "1등 1,000만원" },
    { rank: 2, name: "이크리에이터", project: "모던 뱅킹 앱", prize: "2등 500만원" },
    { rank: 3, name: "박아티스트", project: "3D 포트폴리오", prize: "3등 300만원" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      {/* 헤더 */}
      <div style={{ backgroundColor: "#1CB0F6" }} className="text-white py-16">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={48} />
                <h1 className="text-5xl font-bold">Community Contest</h1>
              </div>
              <p className="text-2xl opacity-90">디자인 실력을 뽐내고 상금을 받아가세요</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* 지난 수상자 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award size={32} style={{ color: "#FFD700" }} />
              <h2 className="text-2xl font-bold">지난 콘테스트 수상자</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {winners.map((winner, index) => (
                <motion.div
                  key={winner.rank}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-50 rounded-xl"
                >
                  <div className="relative inline-block mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: winner.rank === 1 ? "#FFD700" : winner.rank === 2 ? "#C0C0C0" : "#CD7F32"
                      }}
                    >
                      {winner.rank === 1 ? "🥇" : winner.rank === 2 ? "🥈" : "🥉"}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{winner.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{winner.project}</p>
                  <p className="text-sm font-bold" style={{ color: "#1CB0F6" }}>{winner.prize}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 진행 중인 콘테스트 */}
          <h2 className="text-3xl font-bold mb-8">진행 중인 콘테스트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contests.map((contest, index) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy size={20} style={{ color: "#FFD700" }} />
                    <span className="text-sm font-bold" style={{ color: "#1CB0F6" }}>
                      {contest.prize}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#1CB0F6] transition-colors">{contest.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{contest.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={16} />
                      <span>{contest.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Users size={16} />
                      <span>{contest.participants}명</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl text-white text-lg font-bold shadow-md hover:shadow-lg transition-all"
                    style={{ backgroundColor: "#1CB0F6" }}
                  >
                    참가하기
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 콘테스트 혜택 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">콘테스트 참가 혜택</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
                <Trophy size={48} className="mx-auto mb-4" style={{ color: "#1CB0F6" }} />
                <h3 className="text-lg font-bold mb-2">상금 획득</h3>
                <p className="text-gray-600">총 상금 최대 1,200만원</p>
              </div>
              <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
                <Star size={48} className="mx-auto mb-4" style={{ color: "#1CB0F6" }} />
                <h3 className="text-lg font-bold mb-2">포트폴리오 강화</h3>
                <p className="text-gray-600">수상작은 플랫폼에 노출</p>
              </div>
              <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
                <Users size={48} className="mx-auto mb-4" style={{ color: "#1CB0F6" }} />
                <h3 className="text-lg font-bold mb-2">네트워킹</h3>
                <p className="text-gray-600">디자이너들과 교류</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
