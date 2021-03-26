import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { getGroupsData } from "../../util/ApiUtils";
import {API_BASE_URL} from '../../constants';
import CustomInput from "../CustomInput/CustomInput";
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom';

require("es6-promise").polyfill();
require("isomorphic-fetch");

function SearchResults() {


  const [groups, setGroups] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [searchColumns, setSearchColumns] = useState(["groupTitle"]);

  console.log(q);


  function hellog(data) {
    console.log(data);
  }
 const history = useHistory();

    function handleSubmit() {
        history.push(`/searchResults/${q}`);
    }
  // function handleSubmit() {
  //   getGroupsData(q, page).then((response) => {
  //     setGroups(response.content);
  //   });
  // }

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const handleInputChange = (e)=>{
   setQ(e.target.value);
   console.log(q);
  }

  return (
    <div>
      <div style={{ width: "500px", height: "30px" }}>
        <div style={{ width: "70%", float: "left",marginBottom: "15px" }}>
          <CustomInput
            id="regular"
            value={q}
            inputProps={{
              onChange: handleInputChange,
              placeholder: "Search a Group",
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </div>
        <div style={{ width: "20%", float: "left", marginTop: "30px" }}>
          <Button color="info" onClick={handleSubmit} round>
            Search
          </Button>
        </div>
      </div>

      {/*<div>*/}
      {/*  <DataTable data={search(groups)} />*/}
      {/*</div>*/}
    </div>
  );
}
export default SearchResults