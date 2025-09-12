export type SearchBarPropsTypes = {
  searchItem: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  errorMessage: string;
}