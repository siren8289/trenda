import { useState } from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Gamepad2,
  UserCheck
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AdminDashboardViewProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

// Mock Data for Charts
const weeklyData = [
  { name: 'Mon', users: 120, plays: 240 },
  { name: 'Tue', users: 132, plays: 180 },
  { name: 'Wed', users: 101, plays: 320 },
  { name: 'Thu', users: 134, plays: 290 },
  { name: 'Fri', users: 190, plays: 450 },
  { name: 'Sat', users: 230, plays: 510 },
  { name: 'Sun', users: 210, plays: 480 },
];

const skillData = [
  { name: 'Frontend', value: 400, color: '#1CB0F6' },
  { name: 'Backend', value: 300, color: '#58CC02' },
  { name: 'Design', value: 200, color: '#FF4B4B' },
  { name: 'PM', value: 100, color: '#FFC800' },
];

// Mock Data for Users
const users = [
  { id: 1, name: "김철수", email: "kim@example.com", role: "User", status: "Active", joinDate: "2023-12-01" },
  { id: 2, name: "이영희", email: "lee@example.com", role: "User", status: "Active", joinDate: "2023-12-05" },
  { id: 3, name: "박관리", email: "park@example.com", role: "Admin", status: "Active", joinDate: "2023-11-20" },
  { id: 4, name: "최정지", email: "choi@example.com", role: "User", status: "Suspended", joinDate: "2023-12-10" },
  { id: 5, name: "정신입", email: "jung@example.com", role: "User", status: "Active", joinDate: "2023-12-21" },
];

export function AdminDashboardView({ onNavigate, onLogout }: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "users":
        return <UserManagementContent />;
      case "content":
        return <ContentManagementContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1CB0F6] rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold">Trenda Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="대시보드" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="사용자 관리" 
            active={activeTab === "users"} 
            onClick={() => setActiveTab("users")} 
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="콘텐츠 관리" 
            active={activeTab === "content"} 
            onClick={() => setActiveTab("content")} 
          />
          <SidebarItem 
            icon={<BarChart2 size={20} />} 
            label="통계 및 분석" 
            active={activeTab === "analytics"} 
            onClick={() => setActiveTab("analytics")} 
          />
          <div className="pt-4 mt-4 border-t border-slate-800">
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="관리자 설정" 
              active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")} 
            />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === "dashboard" && "대시보드 개요"}
            {activeTab === "users" && "사용자 관리"}
            {activeTab === "content" && "콘텐츠 관리"}
            {activeTab === "analytics" && "통계 및 리포트"}
            {activeTab === "settings" && "관리자 설정"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="검색..." 
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1CB0F6]"
              />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
        active 
          ? "bg-[#1CB0F6] text-white shadow-lg shadow-blue-500/30" 
          : "text-gray-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

// --- Content Components ---

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="총 사용자" value="1,234" change="+12.5%" icon={<Users size={24} className="text-blue-500" />} />
        <StatCard title="오늘의 플레이" value="856" change="+5.2%" icon={<Gamepad2 size={24} className="text-green-500" />} />
        <StatCard title="새로운 게시물" value="42" change="+8.1%" icon={<FileText size={24} className="text-purple-500" />} />
        <StatCard title="시스템 상태" value="정상" change="99.9%" icon={<CheckCircle size={24} className="text-emerald-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>주간 활동 추이</CardTitle>
            <CardDescription>사용자 유입 및 게임 플레이 수</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#1CB0F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="plays" stroke="#58CC02" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>사용자 직무 분포</CardTitle>
            <CardDescription>가입자 관심 분야 비율</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserManagementContent() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>전체 가입 사용자 조회 및 관리</CardDescription>
        </div>
        <Button>
          <UserCheck className="mr-2 h-4 w-4" />
          신규 사용자 등록
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>구분</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>상세 정보 보기</DropdownMenuItem>
                      <DropdownMenuItem>활동 로그 확인</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">계정 정지</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ContentManagementContent() {
  return (
    <Tabs defaultValue="trend" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="trend">TrendFlash</TabsTrigger>
          <TabsTrigger value="code">CodeFlash</TabsTrigger>
          <TabsTrigger value="review">게시물 심사</TabsTrigger>
        </TabsList>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          새 콘텐츠 등록
        </Button>
      </div>

      <TabsContent value="trend" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>TrendFlash 문제 관리</CardTitle>
            <CardDescription>현재 서비스 중인 트렌드 퀴즈 목록입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">등록된 문제: 156개</p>
            {/* 리스트 자리 */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="code" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>CodeFlash 문제 관리</CardTitle>
            <CardDescription>코드 퀴즈 및 챌린지 관리</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">등록된 문제: 89개</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="review" className="space-y-4">
        {/* 기존 AdminReviewView의 기능을 축소하여 이곳에 통합 */}
        <div className="grid gap-4">
          <Card className="border-l-4 border-l-yellow-400">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">AI 기반 디자인 시스템의 진화</h4>
                <p className="text-sm text-gray-500">작성자: 김디자이너 • 카테고리: Design System</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-500 hover:bg-green-600">승인</Button>
                <Button size="sm" variant="destructive">반려</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-400">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">E-커머스 모바일 앱 리디자인</h4>
                <p className="text-sm text-gray-500">작성자: 이프로젝트 • 카테고리: Mobile App</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-500 hover:bg-green-600">승인</Button>
                <Button size="sm" variant="destructive">반려</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>월간 트래픽 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart2 className="w-12 h-12 text-gray-300" />
            <span className="ml-2 text-gray-500">상세 데이터 로딩 중...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsContent() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>관리자 계정 설정</CardTitle>
        <CardDescription>보안 및 알림 설정을 변경합니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">관리자 이메일</label>
          <Input defaultValue="admin@trenda.com" readOnly />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">비밀번호 변경</label>
          <Input type="password" placeholder="새 비밀번호 입력" />
        </div>
        <Button>설정 저장</Button>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value, change, icon }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {icon}
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className="text-sm font-medium text-green-600 mb-1">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
}
