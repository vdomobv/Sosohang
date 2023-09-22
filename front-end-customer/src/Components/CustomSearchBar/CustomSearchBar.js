import styles from "./styles";
import { SearchBar } from "@rneui/themed";

export default function CustomSearchBar({ placeholderText }) {
  return (
    <SearchBar
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
