import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Moon, Sun, User } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { authService } from '../utils/auth';
import { toast } from 'sonner';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logout realizado com sucesso');
      onLogout();
      navigate('/');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold">FonoMed</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              data-testid="theme-toggle-btn"
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button data-testid="user-menu-btn" variant="ghost" size="icon">
                    {user.picture ? (
                      <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/exercises')}>
                    Exercícios
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/appointments')}>
                    Consultas
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem data-testid="logout-btn" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                data-testid="nav-login-btn" 
                onClick={() => navigate('/auth')}
                className="bg-primary text-white hover:bg-primary/90 font-semibold"
              >
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
