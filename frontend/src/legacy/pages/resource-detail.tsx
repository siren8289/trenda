import { motion } from "motion/react";
import { ArrowLeft, Calendar, Eye, Heart, Share2, Bookmark, User, Tag, Link as LinkIcon, Download } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ResourceDetailPageProps {
  onNavigate: (page: string) => void;
  id?: string;
  type?: string;
}

export default function ResourceDetailPage({ onNavigate, id, type }: ResourceDetailPageProps) {
  const isTool = type === 'tools';
  
  const title = isTool ? `Productivity Tool #${id}` : `Article #${id}: Mastering React`;
  const category = isTool ? "Tool" : "Tutorial";
  const badgeColor = isTool ? "text-indigo-600 bg-indigo-50" : "text-green-600 bg-green-50";

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      <div className="w-full h-full px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate('resources')}
            className="flex items-center gap-2 mb-8 text-slate-600 hover:text-[#1CB0F6] hover:bg-transparent pl-0 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Resources
          </Button>

          <div className="bg-white">
            <div className="py-2">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className={`px-4 py-1.5 rounded-full text-sm font-medium border-none ${badgeColor}`}>
                  {category}
                </Badge>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Calendar size={16} />
                  2024.02.20
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-slate-900">{title}</h1>

              <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <User size={20} className="text-slate-500" />
                  </div>
                  <span className="text-lg font-medium text-slate-900">Tech Writer</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2 text-slate-500">
                  <Eye size={20} />
                  <span>5,678</span>
                </div>
                <div className="flex items-center gap-2 text-[#F43F5E]">
                  <Heart size={20} className="fill-[#F43F5E]" />
                  <span>342</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-12 text-slate-700">
                <p className="text-xl leading-relaxed mb-8">
                  {isTool 
                    ? "This tool helps developers streamline their workflow by automating repetitive tasks. It integrates seamlessly with popular IDEs and provides real-time feedback."
                    : "In this comprehensive guide, we explore the depths of React hooks. We'll cover everything from basic state management to complex side effects and performance optimization."}
                </p>
                
                {isTool ? (
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                    <h3 className="font-bold text-lg mb-4 text-slate-900">Installation</h3>
                    <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
                      <code>npm install @awesome/tool-name</code>
                    </pre>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Why Hooks Matter</h2>
                    <p className="text-xl leading-relaxed mb-8">
                      Hooks allow you to reuse stateful logic without changing your component hierarchy. This makes it easy to share hooks among many components or with the community.
                    </p>
                  </>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-6">Conclusion</h3>
                <p className="text-xl leading-relaxed mb-8">
                  {isTool
                    ? "Give this tool a try and see how it transforms your daily coding routine."
                    : "Mastering these concepts will take your React skills to the next level."}
                </p>
              </div>

              <div className="flex gap-4 pt-8 border-t border-slate-100">
                {isTool ? (
                  <Button 
                    className="flex-1 max-w-xs py-6 rounded-xl text-white font-bold text-lg shadow-md hover:shadow-xl transition-all bg-[#1CB0F6] hover:bg-[#0D8FCC]"
                  >
                    <Download size={24} className="mr-2" />
                    Download Tool
                  </Button>
                ) : (
                   <Button 
                    className="flex-1 max-w-xs py-6 rounded-xl text-white font-bold text-lg shadow-md hover:shadow-xl transition-all bg-[#1CB0F6] hover:bg-[#0D8FCC]"
                  >
                    <Heart size={24} className="fill-white mr-2" />
                    Like Article
                  </Button>
                )}
               
                <Button variant="secondary" className="py-6 px-6 rounded-xl">
                  <Bookmark size={24} />
                </Button>
                <Button variant="secondary" className="py-6 px-6 rounded-xl">
                  <Share2 size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
