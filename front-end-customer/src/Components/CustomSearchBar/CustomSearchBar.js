import styles from "./styles";
import { SearchBar } from "@rneui/themed";

export default function CustomSearchBar({ placeholderText}) {
  return (
    <SearchBar
      style={[styles.searchbar]}
      lightTheme
      platform="android"
      searchIcon={false}
      clearIcon={false}
      cancelIcon={false}
      placeholder={placeholderText}
      inputStyle={{ marginHorizontal: 0, width: "100%" }}
    ></SearchBar>

  );
}
