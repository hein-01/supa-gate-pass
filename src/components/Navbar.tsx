import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { Building2, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";

export const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">wellfinds</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                🏠 Home
              </Link>
              <Link
                to="/businesses"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                🏪 Find Shops
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
              <Smartphone className="h-4 w-4" />
              <span>Get App</span>
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth/signin">Sign in / Register</Link>
              </Button>
            )}
            
            <div className="relative">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                Get Online Shop Website + POS
              </Button>
              <Badge className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-2 py-0">
                New
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};