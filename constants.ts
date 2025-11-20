import { ProductivityMode, Note, SpatialAnchor } from './types';
import { Layers, PenTool, BookOpen, Coffee, Briefcase } from 'lucide-react';

export const MODE_CONFIG = {
  [ProductivityMode.DEEP_WORK]: { color: 'text-blue-500', bg: 'bg-blue-500/20', border: 'border-blue-500', icon: Layers },
  [ProductivityMode.STUDY]: { color: 'text-teal-500', bg: 'bg-teal-500/20', border: 'border-teal-500', icon: BookOpen },
  [ProductivityMode.CREATIVE]: { color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500', icon: PenTool },
  [ProductivityMode.MEETING_PREP]: { color: 'text-purple-500', bg: 'bg-purple-500/20', border: 'border-purple-500', icon: Briefcase },
  [ProductivityMode.RELAX]: { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400', icon: Coffee },
};

export const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Project Alpha Brainstorm',
    body: 'Need to focus on the core architecture. The latency requirements are strict. Consider using edge computing for the semantic processing. Team meeting at 2 PM.',
    tags: ['Architecture', 'Urgent'],
    createdAt: '2023-10-27T10:00:00Z'
  },
  {
    id: '2',
    title: 'Design System Audit',
    body: 'The color palette feels disconnected in dark mode. Need to review the contrast ratios for the secondary text elements.',
    tags: ['Design', 'UI/UX'],
    createdAt: '2023-10-26T15:30:00Z'
  }
];

export const MOCK_ANCHORS: SpatialAnchor[] = [
  { id: 'a1', type: 'Wall', position: { x: 100, y: 50, z: 0 }, dimensions: { width: 200, height: 10 }, label: 'Main Wall' },
  { id: 'a2', type: 'Table', position: { x: 100, y: 150, z: 0 }, dimensions: { width: 120, height: 60 }, label: 'Work Desk' },
  { id: 'a3', type: 'OpenSpace', position: { x: 250, y: 150, z: 0 }, dimensions: { width: 100, height: 100 }, label: 'Focus Zone' },
];
