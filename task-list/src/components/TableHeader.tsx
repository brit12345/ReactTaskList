import AddButton from "./AddButton";

function TableHeader(){
  return (
    <tr>
      <th style={{width: "2%"}}>
        Status
      </th>
      <th style={{width: "20%"}}>
        Title
      </th>
      <th style={{width: "15%"}}>
        Description
      </th>
      <th style={{width: "10%"}}>
        Due Date
      </th>
      <th style={{width: "10%"}}>
        Priority
      </th>
      <th style={{width: "15%"}}>
        Labels
      </th>
      <th style={{width: "5%"}}>
        <AddButton></AddButton>
      </th>
    </tr>
  );
}

export default TableHeader;