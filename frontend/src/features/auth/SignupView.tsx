import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Chrome, TrendingUp, Github, Facebook, Check, ArrowRight, ArrowLeft, User as UserIcon, ShieldCheck, Briefcase, Code, PenTool, Layout } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Separator } from '../../ui/separator';
import { Card } from '../../ui/card';
import { apiClient } from '@/shared/api/client';
import type { ApiResponse, User } from '@/shared/api/types';

interface SignupViewProps {
  onNavigate: (page: string) => void;
  onSignup: (user: User, asAdmin?: boolean) => void;
}

export function SignupView({ onNavigate, onSignup }: SignupViewProps) {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'user' | 'admin'>('user');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleCompleteSignup = async () => {
    if (!email.trim() || !name.trim()) {
      setError("이메일과 이름을 모두 입력해주세요.");
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiClient.post<ApiResponse<User>>("/api/users", {
        body: {
          email: email.trim(),
          displayName: name.trim(),
        },
      });

      if (!response.success || !response.data) {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      onSignup(response.data, accountType === 'admin');
    } catch (e) {
      setError("이미 가입된 이메일이거나 서버 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1: // Account Type Select
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">계정 유형을 선택하세요</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`p-4 cursor-pointer transition-all border-2 rounded-[24px] ${accountType === 'user' ? 'border-[#1CB0F6] bg-blue-50 shadow-md ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-200 shadow-sm'}`}
                onClick={() => setAccountType('user')}
              >
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${accountType === 'user' ? 'bg-[#1CB0F6] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <UserIcon size={28} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 text-lg">일반 회원</h4>
                    <p className="text-sm text-gray-500 mt-2 leading-tight">포트폴리오 관리 및<br/>트렌드 탐색</p>
                  </div>
                </div>
              </Card>

              <Card 
                className={`p-4 cursor-pointer transition-all border-2 rounded-[24px] ${accountType === 'admin' ? 'border-[#1CB0F6] bg-blue-50 shadow-md ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-200 shadow-sm'}`}
                onClick={() => setAccountType('admin')}
              >
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${accountType === 'admin' ? 'bg-[#1CB0F6] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <ShieldCheck size={28} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 text-lg">관리자</h4>
                    <p className="text-sm text-gray-500 mt-2 leading-tight">시스템 관리 및<br/>콘텐츠 승인</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 2: // Basic Info
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">기본 정보 입력</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-700 text-sm font-medium pl-1">이메일</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] focus:ring-[#1CB0F6]/20 h-12 text-base rounded-xl px-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-gray-700 text-sm font-medium pl-1">이름 / 닉네임</Label>
                <Input 
                  id="signup-name" 
                  type="text" 
                  placeholder="홍길동" 
                  className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] focus:ring-[#1CB0F6]/20 h-12 text-base rounded-xl px-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-700 text-sm font-medium pl-1">비밀번호</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  placeholder="8자 이상 입력" 
                  className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] focus:ring-[#1CB0F6]/20 h-12 text-base rounded-xl px-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3: // Detail Info (Interest or Admin Info)
        if (accountType === 'user') {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">관심 분야 선택</h3>
                <p className="text-sm text-gray-500">맞춤형 콘텐츠 추천에 활용됩니다.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'frontend', label: 'Frontend', icon: <Layout size={20} /> },
                  { id: 'backend', label: 'Backend', icon: <Code size={20} /> },
                  { id: 'design', label: 'UI/UX Design', icon: <PenTool size={20} /> },
                  { id: 'pm', label: 'Product / PM', icon: <Briefcase size={20} /> },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all h-32 ${
                      selectedInterests.includes(item.id)
                        ? 'border-[#1CB0F6] bg-blue-50 text-[#1CB0F6] ring-2 ring-blue-100'
                        : 'border-gray-100 hover:border-blue-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">관리자 정보 입력</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org" className="text-gray-700 text-sm font-medium pl-1">소속 조직</Label>
                  <Input 
                    id="org" 
                    placeholder="예: Trenda HQ" 
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] h-12 text-base rounded-xl px-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700 text-sm font-medium pl-1">직책 / 역할</Label>
                  <Input 
                    id="role" 
                    placeholder="예: 시스템 관리자" 
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] h-12 text-base rounded-xl px-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-gray-700 text-sm font-medium pl-1">관리자 인증 코드</Label>
                  <Input 
                    id="code" 
                    placeholder="발급받은 코드 입력" 
                    className="bg-gray-50 border-gray-200 focus:border-[#1CB0F6] h-12 text-base rounded-xl px-4"
                  />
                </div>
              </div>
            </div>
          );
        }

      case 4: // Terms
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">약관 동의</h3>
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 space-y-5">
              <div className="flex items-center justify-between">
                <label htmlFor="all-terms" className="text-gray-900 cursor-pointer font-bold text-base">
                  전체 약관 동의
                </label>
                <Checkbox id="all-terms" className="h-6 w-6 rounded-md data-[state=checked]:bg-[#1CB0F6] data-[state=checked]:border-[#1CB0F6]" />
              </div>

              <Separator className="bg-gray-200" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="terms-service" className="text-gray-700 cursor-pointer text-sm flex-1">
                    <span className="text-[#1CB0F6] font-semibold">서비스 이용약관</span> (필수)
                  </label>
                  <Checkbox id="terms-service" className="data-[state=checked]:bg-[#1CB0F6]" />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="terms-privacy" className="text-gray-700 cursor-pointer text-sm flex-1">
                    <span className="text-[#1CB0F6] font-semibold">개인정보 수집 및 이용</span> (필수)
                  </label>
                  <Checkbox id="terms-privacy" className="data-[state=checked]:bg-[#1CB0F6]" />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="terms-marketing" className="text-gray-700 cursor-pointer text-sm flex-1">
                    마케팅 정보 수신 (선택)
                  </label>
                  <Checkbox id="terms-marketing" className="data-[state=checked]:bg-[#1CB0F6]" />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* Signup Form Card */}
      <div className="w-full max-w-[480px] bg-white p-8 md:p-10 rounded-[32px] shadow-xl">
        <div className="w-full flex flex-col justify-center h-full">
          {/* Logo & Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1CB0F6] to-[#0D8FCC] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-900" style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                Trenda
              </span>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                  회원가입
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  {step === 1 && "계정 유형을 선택해주세요"}
                  {step === 2 && "기본 정보를 입력해주세요"}
                  {step === 3 && (accountType === 'user' ? "관심 분야를 선택해주세요" : "관리자 정보를 입력해주세요")}
                  {step === 4 && "약관에 동의해주세요"}
                </p>
              </div>
              {/* Step Indicator */}
              <div className="flex gap-1.5 mb-2">
                {[1, 2, 3, 4].map(s => (
                  <div 
                    key={s} 
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      s === step 
                        ? 'bg-[#1CB0F6] w-8' 
                        : s < step 
                          ? 'bg-[#1CB0F6] opacity-40' 
                          : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="min-h-[360px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={handleBack} 
                className="flex-1 h-12 rounded-xl text-base font-bold border-gray-200 hover:bg-gray-50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                이전
              </Button>
            )}
            
            {step < 4 ? (
              <Button 
                onClick={handleNext} 
                className={`flex-1 h-12 rounded-xl text-base font-bold shadow-lg shadow-blue-500/20 bg-[#1CB0F6] hover:bg-[#0D8FCC] ${step === 1 ? 'w-full' : ''}`}
              >
                다음
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleCompleteSignup}
                className="flex-1 h-12 rounded-xl text-base font-bold shadow-lg shadow-blue-500/20 bg-[#1CB0F6] hover:bg-[#0D8FCC]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "가입 중..." : "가입 완료"}
                <Check className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-3 px-1">
              {error}
            </p>
          )}

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <span className="text-gray-500 text-sm font-medium">이미 계정이 있으신가요? </span>
            <button 
              onClick={() => onNavigate('login')}
              className="text-[#1CB0F6] hover:underline text-sm font-bold ml-1"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
