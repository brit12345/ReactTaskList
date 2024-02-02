import AddButton from "../buttons/AddButton";

function TableHeader({ onClick }: { onClick: (header: string) => void}){
  return (
    <tr>
      <th style={{width: "5%"}} onClick={() => onClick("status")}>
        Status &lt;&gt;
      </th>
      <th style={{width: "20%"}}>
        Title
      </th>
      <th style={{width: "15%"}}>
        Description
      </th>
      <th style={{width: "10%"}} onClick={() => onClick("dueDate")}>
        Due Date &lt;&gt;
      </th>
      <th style={{width: "10%"}} onClick={() => onClick("priority")}>
        Priority &lt;&gt;
      </th>
      <th style={{width: "15%"}} onClick={() => onClick("labels")}>
        Labels &lt;&gt;
      </th>
      <th style={{width: "5%"}}>
        <AddButton></AddButton>
      </th>
    </tr>
  );
}

export default TableHeader;