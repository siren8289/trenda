import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Upload, Tag, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface CreateProjectViewProps {
  onNavigate: (page: string) => void;
}

export function CreateProjectView({ onNavigate }: CreateProjectViewProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('project-archive')}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-[#1CB0F6] transition-colors"
        >
          <ArrowLeft size={20} />
          뒤로 가기
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl mb-8">새 프로젝트 등록</h1>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700">프로젝트 제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1CB0F6] focus:outline-none"
                placeholder="프로젝트 제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1CB0F6] focus:outline-none"
              >
                <option value="">카테고리 선택</option>
                <option value="mobile-app">Mobile App</option>
                <option value="web-platform">Web Platform</option>
                <option value="dashboard">Dashboard</option>
                <option value="branding">Branding</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">간단한 설명</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1CB0F6] focus:outline-none"
                placeholder="프로젝트를 한 줄로 설명해주세요"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">프로젝트 URL</label>
              <div className="flex items-center gap-2">
                <LinkIcon size={20} className="text-gray-400" />
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1CB0F6] focus:outline-none"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">대표 이미지</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#1CB0F6] transition-colors cursor-pointer">
                <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">클릭하여 이미지 업로드</p>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">상세 설명</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1CB0F6] focus:outline-none resize-none"
                placeholder="프로젝트에 대한 상세한 설명을 입력하세요"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">태그</label>
              <div className="flex items-center gap-2">
                <Tag size={20} className="text-gray-400" />
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1CB0F6] focus:outline-none"
                  placeholder="태그를 쉼표로 구분하여 입력하세요"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 rounded-xl text-white text-lg"
                style={{ backgroundColor: "#1CB0F6" }}
              >
                <Upload className="inline mr-2" size={20} />
                등록하기
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('project-archive')}
                className="px-8 py-4 bg-gray-200 rounded-xl text-lg"
              >
                취소
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
