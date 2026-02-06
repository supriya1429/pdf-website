
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link 
      to={tool.href}
      className="group relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col items-start"
    >
      {tool.badge && (
        <span className="absolute top-4 right-4 px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider">
          {tool.badge}
        </span>
      )}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {tool.icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
        {tool.name}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {tool.description}
      </p>
    </Link>
  );
};

export default ToolCard;
