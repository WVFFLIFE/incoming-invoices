import { ChangeEvent } from "react";

export interface SearchProps {
  className?: string;
  searchTerm: string;
  handleChangeSearchTerm(e: ChangeEvent<HTMLInputElement>): void;
}

export default function Search(props: SearchProps): JSX.Element;