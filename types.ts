export enum ProductivityMode {
  DEEP_WORK = 'Deep Work',
  STUDY = 'Study',
  CREATIVE = 'Creative',
  MEETING_PREP = 'Meeting Prep',
  RELAX = 'Relax'
}

export interface Note {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  aiSummary?: string;
}

export interface SpatialAnchor {
  id: string;
  type: 'Wall' | 'Table' | 'OpenSpace' | 'Window';
  position: { x: number; y: number; z: number };
  dimensions: { width: number; height: number };
  label: string;
}

export interface UserStats {
  focusScore: number;
  focusMinutes: number;
  tasksCompleted: number;
}
