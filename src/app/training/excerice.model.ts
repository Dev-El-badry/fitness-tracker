export interface Excerice {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  type?: "complated" | "cancel" | null;
}

