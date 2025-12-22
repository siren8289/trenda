export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#1CB0F6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Trenda</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              개발자와 디자이너를 위한<br />
              올인원 트렌드 학습 플랫폼
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-gray-500">
              <li>TrendFlash</li>
              <li>CodeFlash</li>
              <li>Project Archive</li>
              <li>Pricing</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-500">
              <li>Blog</li>
              <li>Community</li>
              <li>Help Center</li>
              <li>API Docs</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-gray-500">
              <li>About Us</li>
              <li>Careers</li>
              <li>Legal</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
          © 2024 Trenda Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
