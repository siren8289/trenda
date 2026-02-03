import { Mail, Lock, Chrome, TrendingUp, Github, Facebook, ShieldCheck, User as UserIcon, Building2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { useState } from 'react';

interface LoginViewProps {
  onNavigate: (page: string) => void;
  onLogin: (asAdmin?: boolean) => void;
}

export function LoginView({ onNavigate, onLogin }: LoginViewProps) {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* Login Form Card */}
      <div className="w-full max-w-[480px] bg-white p-8 md:p-10 rounded-[32px] shadow-xl">
        <div className="w-full flex flex-col justify-center h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1CB0F6] to-[#0D8FCC] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-900" style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              Trenda
            </span>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
              환영합니다!
            </h1>
            <p className="text-gray-500 text-base">
              서비스 이용을 위해 로그인해주세요.
            </p>
          </div>

          <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 h-14 p-1.5 rounded-full">
              <TabsTrigger 
                value="user" 
                className="flex items-center gap-2 rounded-full h-full text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
              >
                <UserIcon size={18} />
                일반 회원
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="flex items-center gap-2 rounded-full h-full text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
              >
                <ShieldCheck size={18} />
                관리자
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 text-sm font-medium pl-1">이메일</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com"
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] focus:ring-[#1CB0F6]/20 h-12 text-base rounded-xl px-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 text-sm font-medium pl-1">비밀번호</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] focus:ring-[#1CB0F6]/20 h-12 text-base rounded-xl px-4"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2.5">
                    <Checkbox id="remember" className="h-5 w-5 rounded-[6px] border-gray-300 data-[state=checked]:bg-[#1CB0F6] data-[state=checked]:border-[#1CB0F6]" />
                    <Label htmlFor="remember" className="text-gray-600 cursor-pointer text-sm font-medium">
                      로그인 상태 유지
                    </Label>
                  </div>
                  <button className="text-[#1CB0F6] hover:underline text-sm font-semibold">
                    비밀번호 찾기
                  </button>
                </div>

                <Button 
                  className="w-full bg-[#1CB0F6] hover:bg-[#0D8FCC] text-white h-12 text-base font-bold rounded-xl mt-2 shadow-lg shadow-blue-500/20"
                  onClick={() => onLogin(false)}
                >
                  로그인
                </Button>

                <div className="relative py-4">
                  <Separator className="bg-gray-100" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-400 text-sm font-medium">
                    또는
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 h-12 rounded-xl text-sm font-medium"
                    onClick={() => onLogin(false)}
                  >
                    <Chrome className="w-5 h-5 mr-2" />
                    Google
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 h-12 rounded-xl text-sm font-medium"
                    onClick={() => onLogin(false)}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 h-12 rounded-xl text-sm font-medium"
                    onClick={() => onLogin(false)}
                  >
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-slate-500 mt-0.5 shrink-0" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-slate-700">관리자 전용 로그인</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      시스템 접근 권한이 있는 관리자 계정으로 로그인합니다.<br/>
                      보안을 위해 2단계 인증(OTP)이 요구됩니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="admin-id" className="text-gray-700 text-sm font-medium pl-1">관리자 ID</Label>
                  <Input 
                    id="admin-id" 
                    type="text" 
                    placeholder="admin_id"
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] h-12 text-base rounded-xl px-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-pw" className="text-gray-700 text-sm font-medium pl-1">비밀번호</Label>
                  <Input 
                    id="admin-pw" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] h-12 text-base rounded-xl px-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="security-code" className="text-gray-700 text-sm font-medium pl-1">보안 코드 (OTP)</Label>
                  <Input 
                    id="security-code" 
                    type="text" 
                    placeholder="6자리 숫자 입력"
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] h-12 text-lg tracking-[0.5em] text-center font-bold rounded-xl"
                    maxLength={6}
                  />
                </div>

                <Button 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-bold rounded-xl mt-4 shadow-lg shadow-slate-900/20"
                  onClick={() => onLogin(true)}
                >
                  관리자 로그인
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Sign Up Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <span className="text-gray-500 text-sm font-medium">아직 계정이 없으신가요? </span>
            <button 
              onClick={() => onNavigate('signup')}
              className="text-[#1CB0F6] hover:underline text-sm font-bold ml-1"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
