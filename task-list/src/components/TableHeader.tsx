import AddButton from "./AddButton";

function TableHeader({ onClick }: { onClick: (header: string) => void}){
  return (
    <tr>
      <th style={{width: "2%"}} onClick={() => onClick("status")}>
        Status
      </th>
      <th style={{width: "20%"}}>
        Title
      </th>
      <th style={{width: "15%"}}>
        Description
      </th>
      <th style={{width: "10%"}} onClick={() => onClick("dueDate")}>
        Due Date
      </th>
      <th style={{width: "10%"}} onClick={() => onClick("priority")}>
        Priority
      </th>
      <th style={{width: "15%"}} onClick={() => onClick("labels")}>
        Labels
      </th>
      <th style={{width: "5%"}}>
        <AddButton></AddButton>
      </th>
    </tr>
  );
}

export default TableHeader;