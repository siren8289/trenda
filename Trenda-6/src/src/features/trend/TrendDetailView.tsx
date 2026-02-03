import { motion } from "motion/react";
import { ArrowLeft, Calendar, Eye, Heart, Share2, Bookmark, User, Tag } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

interface TrendDetailViewProps {
  onNavigate: (page: string) => void;
  id?: string;
  type?: string;
}

export function TrendDetailView({ onNavigate, id, type }: TrendDetailViewProps) {
  // Mock data - in a real app this would come from an API based on ID
  const title = type === 'tech' ? `Tech Trend #${id}` : 
                type === 'design' ? `Design Trend #${id}` : 
                type === 'personalized' ? `Recommended Trend #${id}` : 
                "Trend Detail";
  
  const category = type === 'tech' ? "Technology" : 
                   type === 'design' ? "Design System" : 
                   type === 'personalized' ? "For You" : 
                   "General";

  const color = type === 'tech' ? "text-blue-600 bg-blue-50" :
                type === 'design' ? "text-purple-600 bg-purple-50" :
                "text-green-600 bg-green-50";

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      <div className="w-full h-full px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate('trend-research')}
            className="flex items-center gap-2 mb-8 text-slate-600 hover:text-[#1CB0F6] hover:bg-transparent pl-0 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Research
          </Button>

          <div className="bg-white">
            <div className="py-2">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className={`px-4 py-1.5 rounded-full text-sm font-medium border-none ${color}`}>
                  {category}
                </Badge>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Calendar size={16} />
                  2024.03.15
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-slate-900">{title}: The Future of {category}</h1>

              <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <User size={20} className="text-slate-500" />
                  </div>
                  <span className="text-lg font-medium text-slate-900">Editor</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2 text-slate-500">
                  <Eye size={20} />
                  <span>1,234</span>
                </div>
                <div className="flex items-center gap-2 text-[#F43F5E]">
                  <Heart size={20} className="fill-[#F43F5E]" />
                  <span>89</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-12 text-slate-700">
                <p className="text-xl leading-relaxed mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-xl leading-relaxed mb-8">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Key Takeaways</h3>
                <p className="text-xl leading-relaxed mb-8">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </p>
                <ul className="list-disc pl-6 space-y-4 mb-8">
                  <li>Evolution of {category} patterns in 2024</li>
                  <li>Impact of AI on daily workflows</li>
                  <li>Case studies from top industry leaders</li>
                </ul>
                <p className="text-xl leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </p>
              </div>

              <div className="flex gap-4 pt-8 border-t border-slate-100">
                <Button 
                  className="flex-1 max-w-xs py-6 rounded-xl text-white font-bold text-lg shadow-md hover:shadow-xl transition-all bg-[#1CB0F6] hover:bg-[#0D8FCC]"
                >
                  <Heart size={24} className="fill-white mr-2" />
                  Like Trend
                </Button>
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
