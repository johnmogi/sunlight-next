import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          {/* Main Heading */}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Join the Build
          </h3>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 SunLight. All rights reserved.
          </p>

          {/* Tagline */}
          <p className="text-base font-medium text-foreground">
            Guided by intuition, powered by community
          </p>

          {/* Collaboration Link */}
          <p className="text-sm text-muted-foreground">
            Looking for collaborations?{" "}
            <Link
              href="https://johnmogi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Visit johnmogi.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
