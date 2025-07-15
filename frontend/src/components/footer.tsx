import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "./ui/button"

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-12 sm:py-16 lg:py-20 mt-16 sm:mt-20 lg:mt-24 rounded-t-2xl sm:rounded-t-3xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-turquoise-500 to-coral-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-md opacity-90"></div>
              </div>
              <span className="text-xl sm:text-2xl font-black">CodeArena</span>
            </div>
            <p className="text-sm sm:text-base text-navy-300 mb-4 sm:mb-6 max-w-md leading-relaxed">
              Empowering developers worldwide with comprehensive coding challenges, contests, and career opportunities.
              Join our community and accelerate your programming journey.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-navy-300 hover:text-white hover:bg-navy-800 p-2 rounded-xl"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-navy-300 hover:text-white hover:bg-navy-800 p-2 rounded-xl"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-navy-300 hover:text-white hover:bg-navy-800 p-2 rounded-xl"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-navy-300 hover:text-white hover:bg-navy-800 p-2 rounded-xl"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Contests
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Practice
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Learn
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-navy-300 hover:text-turquoise-400 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-navy-400 text-center sm:text-left">
            © 2024 CodeArena. All rights reserved. Built with ❤️ for developers.
          </p>
          <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <a href="#" className="text-navy-400 hover:text-turquoise-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-navy-400 hover:text-turquoise-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-navy-400 hover:text-turquoise-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
