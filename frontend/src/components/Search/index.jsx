import React, { useState, useContext } from "react";

import { Grid, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Wrapper from "./styles";

// import { SearchContext } from "../../contexts/SearchContext";

const SearchComponent = (props) => {
  const [searchValue, setSearchValue] = useState(null);
  // const { searchData, setSearchData } = useContext(SearchContext);
  const { searchData, setSearchData } = props;

  const implSearch = () => {
    if (searchValue === "") {
      alert("검색 값을 입력해주세요");
    } else {
      setSearchData(searchValue);
    }
  };
  const implSearch2 = (e) => {
    if (e.key === "Enter") {
      if (searchValue === "") {
        alert("검색 값을 입력해주세요");
      } else {
        setSearchData(searchValue);
      }
    }
  };

  const onSearchValue = (e) => {
    setSearchValue(e);
  };

  return (
    <Wrapper>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className="search-component-grid"
      >
        <Grid item>
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            onKeyPress={implSearch2}
          >
            <Grid item xs={3}>
              <IconButton
                onClick={() => {
                  implSearch();
                }}
              >
                <SearchIcon
                  className="search-component-grid-item-se-icon"
                  fontSize="large"
                />
              </IconButton>
            </Grid>
            <Grid item xs={9}>
              <TextField
                value={searchValue}
                placeholder="Search..."
                autoFocus={true}
                onChange={(e) => {
                  onSearchValue(e.target.value);
                }}
                className="input2"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SearchComponent;
