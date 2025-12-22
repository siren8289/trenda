import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  Filter,
  BarChart3,
  Clock,
  AlertCircle,
  Eye,
  LogOut
} from "lucide-react";

interface AdminReviewViewProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  type: "trend" | "project";
  status: "pending" | "approved" | "rejected";
  date: string;
  thumbnail: string;
  description: string;
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: "AI 기반 디자인 시스템의 진화",
    author: "김디자이너",
    category: "Design System",
    type: "trend",
    status: "pending",
    date: "2024.01.15",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
    description: "AI를 활용한 자동화된 디자인 시스템 구축 방법론"
  },
  {
    id: 2,
    title: "E-커머스 모바일 앱 리디자인",
    author: "이프로젝트",
    category: "Mobile App",
    type: "project",
    status: "pending",
    date: "2024.01.14",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
    description: "사용자 경험을 개선한 쇼핑몰 앱 UI/UX"
  },
  {
    id: 3,
    title: "모션 디자인 트렌드 2024",
    author: "박모션",
    category: "Motion",
    type: "trend",
    status: "approved",
    date: "2024.01.13",
    thumbnail: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&q=80",
    description: "2024년 주목해야 할 모션 디자인 트렌드"
  },
  {
    id: 4,
    title: "헬스케어 대시보드 시스템",
    author: "최대시보드",
    category: "Dashboard",
    type: "project",
    status: "rejected",
    date: "2024.01.12",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    description: "의료 데이터 시각화 및 관리 솔루션"
  },
  {
    id: 5,
    title: "3D 인터페이스의 미래",
    author: "정쓰리디",
    category: "3D UI",
    type: "trend",
    status: "pending",
    date: "2024.01.11",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    description: "차세대 3D 사용자 인터페이스 탐구"
  },
  {
    id: 6,
    title: "AI 학습 플랫폼 디자인",
    author: "강학습",
    category: "Web Platform",
    type: "project",
    status: "pending",
    date: "2024.01.10",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    description: "머신러닝 기반 개인화 학습 시스템"
  }
];

export function AdminReviewView({ onNavigate, onLogout }: AdminReviewViewProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedType, setSelectedType] = useState<"all" | "trend" | "project">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;
    const matchesType = selectedType === "all" || post.type === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const stats = {
    total: posts.length,
    pending: posts.filter((p) => p.status === "pending").length,
    approved: posts.filter((p) => p.status === "approved").length,
    rejected: posts.filter((p) => p.status === "rejected").length
  };

  const handleApprove = (id: number) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, status: "approved" as const } : post)));
  };

  const handleReject = (id: number) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, status: "rejected" as const } : post)));
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      {/* 관리자 헤더 */}
      <div className="bg-gray-900 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1CB0F6] flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">관리자 대시보드</h1>
              <p className="text-sm text-gray-400">트렌드 아카이브 관리</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <LogOut size={18} />
            로그아웃
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 통계 대시보드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-bold">전체 게시물</h3>
              <BarChart3 size={24} className="text-gray-400" />
            </div>
            <p className="text-4xl font-bold">{stats.total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-400"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-bold">대기 중</h3>
              <Clock size={24} className="text-yellow-500" />
            </div>
            <p className="text-4xl font-bold text-yellow-500">{stats.pending}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-400"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-bold">승인됨</h3>
              <CheckCircle size={24} className="text-green-500" />
            </div>
            <p className="text-4xl font-bold text-green-500">{stats.approved}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-400"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-bold">반려됨</h3>
              <XCircle size={24} className="text-red-500" />
            </div>
            <p className="text-4xl font-bold text-red-500">{stats.rejected}</p>
          </motion.div>
        </div>

        {/* 필터 & 검색 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="제목 또는 작성자로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1CB0F6] focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1CB0F6] focus:outline-none bg-white font-medium"
              >
                <option value="all">모든 상태</option>
                <option value="pending">대기 중</option>
                <option value="approved">승인됨</option>
                <option value="rejected">반려됨</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1CB0F6] focus:outline-none bg-white font-medium"
              >
                <option value="all">모든 타입</option>
                <option value="trend">트렌드</option>
                <option value="project">프로젝트</option>
              </select>
            </div>
          </div>
        </div>

        {/* 게시물 리스트 */}
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex gap-6">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-32 h-32 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            post.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : post.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {post.status === "pending" ? "대기 중" : post.status === "approved" ? "승인됨" : "반려됨"}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{ backgroundColor: "#E0F2FE", color: "#1CB0F6" }}
                        >
                          {post.type === "trend" ? "트렌드" : "프로젝트"}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{post.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                        <span>작성자: {post.author}</span>
                        <span>카테고리: {post.category}</span>
                        <span>등록일: {post.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-3 mt-4">
                    {post.status === "pending" && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApprove(post.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors font-bold shadow-sm"
                        >
                          <CheckCircle size={18} />
                          승인
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReject(post.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors font-bold shadow-sm"
                        >
                          <XCircle size={18} />
                          반려
                        </motion.button>
                      </>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors font-bold shadow-sm"
                    >
                      <Eye size={18} />
                      상세보기
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(post.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors font-bold shadow-sm"
                    >
                      <Trash2 size={18} />
                      삭제
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">해당하는 게시물이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
