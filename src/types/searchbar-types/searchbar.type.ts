export type SearchBarPropsTypes = {
  searchItem: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitSearch: () => void;
  handleClickCancel: () => void;
  errorMessage: string;
};
