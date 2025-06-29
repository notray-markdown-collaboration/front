
export interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    displayName: string | null;
  };
  members: any[];
  invitations: any[];
}