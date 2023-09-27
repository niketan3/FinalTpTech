import logo from "./logo.svg";
import "./App.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "react-data-table-component-extensions/dist/index.css"

// import "bootstrap/dist/css/bootstrap.css";

import { Modal, Button } from "react-bootstrap";
function App() {

  const [Employes,setEmployes]=useState([]);
  const [TpData,settpData]=useState([]);
  const [checkedEmployes,setcheckedEmployes]=useState([]);
  const [deleteOnCheck,setdelteonCheck]=useState([]);
  const [flag,setflag]=useState(0);
  const onClickSubmit = async (event) => {
    // event.preventDefault();
    const url = "https://tpdata1.onrender.com/tp";
    // const url = "http://localhost/tp";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    
    });
    const json = await response.json();
    console.log(json)
   setEmployes(json)
   settpData(json)
   
  };
  useEffect(() => {
    onClickSubmit()
    setflag(0);
  }, []);
  
  const hadnleRowChange=(event)=>{
    setcheckedEmployes(event.selectedRows)
    
    console.log(event)
  }
  const columns = [
    {
      name: "सेवार्थआयडी",
      selector: "सेवार्थआयडी",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
    {
      name: "शासकीयकर्मचाऱ्याचेनाव",
      selector: "शासकीयकर्मचाऱ्याचेनाव",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
    {
      name: "कार्यालयाचेनाव",
      selector: "कार्यालयाचेनाव",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
   
    
    {
      name: "Post",
      selector: "Post",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
    {
      name: "संपर्कक्र",
      selector: "संपर्कक्र",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
    {
      name: "ईमेल",
      selector: "ईमेल",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
    {
      name: "कार्यालयाचाईमेल",
      selector: "कार्यालयाचाईमेल",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
    {
      name: "Division",
      selector: "Division",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    },
    {
      name: "District",
      selector: "District",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border:"0.1px solid black"
      },
    }
   
    // {
    //   name: "संबंधितपदावरीलनियुक्तीचामार",
    //   sortable: false,
    //   selector: "null",
    //   // cell: (d) => [
    //   //   <i
    //   //     key={d.title}
    //   //     onClick={handleClick.bind(this, d.title)}
    //   //     className="first fas fa-pen"
    //   //   ></i>,
    //   //   <i
    //   //     onClick={handleClick.bind(this, d.title)}
    //   //     className="fas fa-trash-alt"
    //   //   ></i>
    //   // ]
    // },
  ];

  const data = Employes;

  let id1 = 0;
  const tableData = {
    columns,
    data,
  };
  const addNames=()=>{
    console.log(checkedEmployes);
    setEmployes(checkedEmployes);
    setdelteonCheck(checkedEmployes);
    setflag(1);
  }
  const addMoreNames=()=>{
    setEmployes(TpData);
    setflag(0);
  } 
  let AddMoreNamesBtn;
  let addNamesBtn;
  let deleteNamesBtn;
  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    orientation: "Landscape",
    documentTitle: "Userdata",
  });
  const deleteNames = () => {
    // Step 1: Identify rows to be deleted
    let updatedData=[]
    for(let i=0;i<deleteOnCheck.length;i++)
    {
      let flag1=0;
      for(let j=0;j<checkedEmployes.length;j++)
      {
        if(deleteOnCheck[i]==checkedEmployes[j])
        {
          flag1=1;
          break;
        }
      }
      if(!flag1)
      {
        updatedData.push(deleteOnCheck[i]);
      }
    }
    setEmployes(updatedData)
    
  };
  let printList;
  if(flag)
  {
    AddMoreNamesBtn=<button className="btn" onClick={addMoreNames}>Add More Names</button>
    addNamesBtn=null;
    deleteNamesBtn=<button className="btn" onClick={deleteNames}>Delete Selected Names</button>
    printList= (
      <Button variant="success" className="btn" onClick={generatePDF}>
        PrintList
      </Button>
    );
  }
  else
  {
    AddMoreNamesBtn=null;
    addNamesBtn=<button  className="btn" onClick={addNames}>Add Selected Names</button>;
    deleteNamesBtn=null;
    printList=null;
  }

  return (
    <>
      <div style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
      {addNamesBtn}
      {AddMoreNamesBtn}
      {deleteNamesBtn}
      {printList}
      </div>
      <div ref={conponentPDF}>
      <DataTableExtensions  {...tableData}  print={false} export={false} >
        <DataTable
        actions={[
          {
            // icon: () => <Delete />,
            tooltip: "Delete Rows",
            onClick: deleteNames
          }
        ]}
        noHeader
          defaultSortField="id"
          // sortIcon={<SortIcon />}
          subHeader
    
          defaultSortAsc={true}
          pagination
          highlightOnHover
          exportHeaders={false}
          selectableRows
          onSelectedRowsChange={hadnleRowChange}
          

        />
      </DataTableExtensions>
      </div>
    </>
  );
}

export default App;
