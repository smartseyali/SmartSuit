import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap, Settings } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-card/95 backdrop-blur-lg shadow-soft border-b border-border/50'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-all duration-300 overflow-hidden">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`text-xl font-display font-bold transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}>
                Sparkle
              </span>
              <span className={`text-xs font-display font-medium transition-colors duration-300 ${isScrolled ? 'text-foreground/80' : 'text-primary-foreground/70'
                }`}>
                Allied Health Science
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 hover:text-primary ${location.pathname === link.path
                  ? 'text-primary'
                  : isScrolled
                    ? 'text-foreground/70'
                    : 'text-primary-foreground/80'
                  }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* <Link
              to="/admin"
              className={`p-2 rounded-lg transition-colors hover:bg-primary/10 ${isScrolled ? 'text-foreground/70' : 'text-primary-foreground/80'
                }`}
              title="Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </Link> */}
            <Button
              variant={isScrolled ? 'outline' : 'heroOutline'}
              size="sm"
              asChild
            >
              <Link to="/apply">Talk to Counsellor</Link>
            </Button>
            <Button
              variant={isScrolled ? 'default' : 'hero'}
              size="sm"
              asChild
            >
              <Link to="/apply">Apply Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'
              }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium py-2 transition-colors ${location.pathname === link.path
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button variant="outline" asChild className="w-full">
                <Link to="/apply">Talk to Counsellor</Link>
              </Button>
              <Button variant="default" asChild className="w-full">
                <Link to="/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
