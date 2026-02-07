
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  badge?: string;
}

export interface UserPlan {
  name: 'Free' | 'Pro';
  actionsRemaining: number;
}

export interface PDFMetadata {
  name: string;
  size: number;
  pages: number;
}
