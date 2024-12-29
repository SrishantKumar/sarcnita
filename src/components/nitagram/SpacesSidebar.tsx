import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Lightbulb, 
  Calendar, 
  Users, 
  BookOpen,
  Code,
  GraduationCap,
  Trophy
} from 'lucide-react';

interface SpacesSidebarProps {
  activeSpace: string;
  onSpaceChange: (space: string) => void;
}

const spaces = [
  { id: 'all', name: 'All Posts', icon: Users },
  { id: 'placements', name: 'Placements', icon: Briefcase },
  { id: 'tech', name: 'Tech Corner', icon: Code },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'alumni', name: 'Alumni Stories', icon: GraduationCap },
  { id: 'research', name: 'Research', icon: Lightbulb },
  { id: 'academics', name: 'Academics', icon: BookOpen },
  { id: 'achievements', name: 'Achievements', icon: Trophy },
];

const SpacesSidebar: React.FC<SpacesSidebarProps> = ({ activeSpace, onSpaceChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 px-2">NITAGRAM Spaces</h2>
      <nav className="space-y-1">
        {spaces.map((space) => {
          const Icon = space.icon;
          const isActive = activeSpace === space.name;

          return (
            <motion.button
              key={space.id}
              onClick={() => onSpaceChange(space.name)}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ x: isActive ? 0 : 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-5 w-5 mr-3" />
              {space.name}
              {isActive && (
                <motion.div
                  className="ml-auto h-2 w-2 rounded-full bg-blue-100"
                  layoutId="activeSpaceDot"
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default SpacesSidebar;
