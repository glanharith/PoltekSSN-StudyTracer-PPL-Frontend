export interface AlumniItemProps {
  name: string;
  onClick: () => void;
}

export type AlumniPagination = {
  page: number;
  totalAlumni: number;
  totalPage: number;
  from: number;
  to: number;
};
