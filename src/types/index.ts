export interface RootState {
  menu: {
    activeMenuItem: string;
    actionMenuItem: string;
  };
  toolbox: {
    [key: string]: {
      color: string;
      size: number;
    };
  };
}
