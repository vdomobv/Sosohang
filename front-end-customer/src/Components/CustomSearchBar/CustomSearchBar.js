import styles from "./styles";
import { SearchBar } from "@rneui/themed";

export default function CustomSearchBar({
  placeholderText,
  updateSearch,
  updateSearchState,
  cancelSearchState,
  search,
}) {
  return (
    <SearchBar
      value={search}
      onChangeText={updateSearch}
      onFocus={updateSearchState}
      onBlur={cancelSearchState}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      style={[styles.searchbar]}
      lightTheme
      platform="android"
      searchIcon={false}
      clearIcon={false}
      cancelIcon={false}
      placeholder={placeholderText}
      inputStyle={styles.inputStyle}
    ></SearchBar>
  );
}
