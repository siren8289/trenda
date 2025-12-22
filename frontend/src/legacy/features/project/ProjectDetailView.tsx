import { motion } from "motion/react";
import { ArrowLeft, Calendar, Eye, Heart, Share2, Star, ExternalLink, Bookmark } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

interface ProjectDetailViewProps {
  onNavigate: (page: string) => void;
  id?: string;
  type?: string;
}

export function ProjectDetailView({ onNavigate, id, type }: ProjectDetailViewProps) {
  const title = type === 'assignments' ? `Assignment #${id}: Algorithm Analysis` :
                type === 'graduation' ? `Graduation Project #${id}: Smart City` :
                type === 'toys' ? `Toy Project #${id}: 3D Visualizer` :
                `Project #${id}`;

  const category = type === 'assignments' ? "Coursework" :
                   type === 'graduation' ? "Capstone" :
                   type === 'toys' ? "Experiment" :
                   "Project";
  
  const score = type === 'graduation' ? "4.9" : "4.5";

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      <div className="w-full h-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate('project-archive')}
            className="flex items-center gap-2 mb-12 text-slate-600 hover:text-[#1CB0F6] hover:bg-transparent pl-0 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Archive
          </Button>

          <div className="bg-white">
            <div className="py-2">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="px-5 py-2 rounded-full text-sm font-bold bg-blue-50 text-[#1CB0F6] border-none">
                    {category}
                  </Badge>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full">
                    <Star size={18} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                    <span className="font-bold text-slate-700">{score}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar size={18} />
                  2023.12.10
                </div>
              </div>

              <h1 className="text-5xl font-bold mb-8 text-slate-900 leading-tight">{title}</h1>
              <p className="text-2xl text-slate-500 mb-12 font-light">A comprehensive study and implementation.</p>

              <div className="flex items-center gap-8 mb-16 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <Eye size={22} />
                  <span className="text-lg">2,341</span>
                </div>
                <div className="flex items-center gap-2 text-[#F43F5E]">
                  <Heart size={22} className="fill-[#F43F5E]" />
                  <span className="text-lg font-bold">156</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-6 text-slate-900">Project Overview</h3>
                  <p className="text-xl text-slate-800 leading-relaxed mb-8">
                    This project focuses on the implementation of advanced algorithms and data structures.
                    The goal was to optimize performance and reduce time complexity for large datasets.
                    We utilized various sorting techniques and graph traversal methods to achieve our results.
                  </p>
                  
                  <h3 className="text-2xl font-bold mb-6 text-slate-900">Key Features</h3>
                  <ul className="list-disc list-inside space-y-4 text-xl text-slate-800 leading-relaxed mb-8">
                    <li>Optimized Quick Sort implementation</li>
                    <li>Visualizer for sorting steps</li>
                    <li>Performance benchmarking suite</li>
                    <li>Comprehensive test coverage</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-8 h-fit">
                  <h4 className="font-bold text-lg mb-4 text-slate-900">Information</h4>
                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Duration</div>
                      <div className="font-medium text-slate-900">2023.09 - 2023.12</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Role</div>
                      <div className="font-medium text-slate-900">Lead Developer</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Tech Stack</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded text-sm text-slate-700">React</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded text-sm text-slate-700">TypeScript</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded text-sm text-slate-700">D3.js</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full py-6 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all mb-3 bg-[#1CB0F6] hover:bg-[#0D8FCC]"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    View Live Demo
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-slate-100">
                <Button
                  variant="outline"
                  className="py-6 px-8 border-2 border-slate-200 hover:border-[#F43F5E] hover:text-[#F43F5E] rounded-xl text-slate-600 font-bold"
                >
                  <Heart size={24} className="mr-2" />
                  Like
                </Button>
                <Button
                  variant="outline"
                  className="py-6 px-8 border-2 border-slate-200 hover:border-[#1CB0F6] hover:text-[#1CB0F6] rounded-xl text-slate-600 font-bold"
                >
                  <Bookmark size={24} className="mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="py-6 px-8 border-2 border-slate-200 hover:border-slate-400 rounded-xl text-slate-600 font-bold ml-auto"
                >
                  <Share2 size={24} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
