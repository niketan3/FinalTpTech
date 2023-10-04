import logo from "./logo.svg";
import "./App.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "react-data-table-component-extensions/dist/index.css";
import html2canvas from "html2canvas";
// import DataTable from 'react-data-table-component';
// import "bootstrap/dist/css/bootstrap.css";

import { Modal, Button } from "react-bootstrap";
import dist from "react-data-table-component-extensions";
function App() {
  const [Employes, setEmployes] = useState([]);
  const [TpData, setTpData] = useState([]);
  const [checkedEmployes, setcheckedEmployes] = useState([]);
  const [deleteOnCheck, setdelteonCheck] = useState([]);
  const [flag, setflag] = useState(0);
  
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
    setEmployes(json);
    setTpData(json);
    
  };
  const rada=(division)=>{
    if(division=="All")
    {
      setdistrict(All);
    }
    if(division=="Pune")
    {
      setdistrict(Pune);
    }
    else if(division=="Nashik")
    {
      setdistrict(Nashik);
    }
    else if(division=="Nagpur")
    {
      setdistrict(Nagpur)
    }
    else if(division=="Konkan-2")
    {

    }
    else if(division=="Konkan-1")
    {
      
    }
    else if(division=="Chhatrapati Sambhajinagar")
    {
      setdistrict(Aurangabad);
    }
    else if(division=="Amravati")
    {
      setdistrict(Amravati);
    }
  }
  const onChange = async () => {
    console.log(TpData)
    let division = document.getElementById("division");
    let district = document.getElementById("district");
   
    let post = document.getElementById("post");
    division = division.value;
    district = district.value;
    
    post = post.value;
    var searchData = [];
    rada(division);
    if (division != "All") {
      
      if (district != "All") {
       
        if (post != "All") {
          for (let i = 0; i < TpData.length; i++) {
            if (
              TpData[i].Division == division &&
              TpData[i].District == district &&
              TpData[i].Post == post
            ) {
              searchData.push(TpData[i]);
            }
          }
        } else {
          
          for (let i = 0; i < TpData.length; i++) {
            if (
              TpData[i].Division == division &&
              TpData[i].District == district
            ) {
              
              searchData.push(TpData[i]);
            }
          }
        }
      } else {
        if (post != "All") {
          for (let i = 0; i < TpData.length; i++) {
            if (TpData[i].Division == division && post == TpData[i].Post) {
              searchData.push(TpData[i]);
            }
          }
        } else {
          for (let i = 0; i < TpData.length; i++) {
            if (TpData[i].Division == division) {
              searchData.push(TpData[i]);
              
            }
          }
        }
      }
    } else {
      if (district != "All") {
        
        if (post != "All") {
          for (let i = 0; i < TpData.length; i++) {
            if (TpData[i].District == district && post == TpData[i].Post) {
              searchData.push(TpData[i]);
            }
          }
        } else {
          
          for (let i = 0; i < TpData.length; i++) {
            console.log(district)
            if (TpData[i].District == district) {
              searchData.push(TpData[i]);
            }
          }
        }
      } else {
        if (post != "All") {
          for (let i = 0; i < TpData.length; i++) {
           
            if (post == TpData[i].Post) {
              searchData.push(TpData[i]);
            }
          }
        } else {
          
          for (let i = 0; i < TpData.length; i++) {
            searchData.push(TpData[i]);
            
          }
        }
      }
    }

    setEmployes(searchData);
  };
  const Konkan1=(
    <select id="district" onChange={onChange}>
      <option value="All">All </option>
      <option value="Palghar">Palghar </option>
      <option value="Raigad">Raigad </option>
      <option value="Ratnagiri">Ratnagiri </option>
      <option value="Sindhudurg">Sindhudurg </option>
    </select>
  );
  const Konkan2=(
    <select id="district" onChange={onChange}>
      <option value="All">All </option>
      <option value="Mumbai">Mumbai </option>
      <option value="Thane">Thane </option>
    </select>
  );
  const Pune = (
    <select id="district" onChange={onChange}>
      <option value="All">All </option>
      <option value="satara">Satara </option>
      <option value="Sangli">Sangli </option>
      <option value="Solapur">Solapur </option>
      <option value="Pune">Pune </option>
      <option value="Kolhapur">Kolhapur </option>
    </select>
  );
  const Amravati = (
    <select id="district" onChange={onChange}>
      <option value="All">All </option>
      <option value="Akola">Akola </option>
      <option value="Amravati">Amravati </option>
      <option value="Buldhana">Buldhana </option>
      <option value="Yavatmal">Yavatmal </option>
      <option value="Washim">Washim </option>
    </select>
  );
  const Aurangabad = (
    
    <select id="district" onChange={onChange}>
      <option value="All">All </option>
      <option value="Chhatrapati Sambhajinagar">Chatrapati SambhajiNagar </option>
      <option value="Beed">Beed </option>
      <option value="Jalna">Jalna </option>
      <option value="Dharashiva">Dharashiva </option>
      <option value="Nanded">Nanded </option>
      <option value="Latur">Latur </option>
      <option value="Parbhani">Parbhani </option>
      <option value="Hingoli">Hingoli </option>
    </select>
  );
  const Nagpur= (

    <select id="district" onChange={onChange}>
      <option value="All">All </option>
      <option value="Bhandara">Bhandara </option>
      <option value="Chandrapur">Chandrapur </option>
      <option value="Gadchiroli">Gadchiroli </option>
      <option value="Gondia">Gondia </option>
      <option value="Nagpur">Nagpur </option>
      <option value="Wardha">Wardha </option>
    </select>
  );
  const Nashik= (
 
    <select id="district" onChange={onChange}>
      <option value="All">All </option>
      <option value="Ahmednagar">Ahmednagar </option>
      <option value="Dhule">Dhule </option>
      <option value="Jalgaon">Jalgaon </option>
      <option value="Nandurbar">Nandurbar </option>
      <option value="Nashik">Nashik </option>
    </select>
  );
  const All=(<select name="cars" id="district" onChange={onChange}>
    
  <option value="All">All</option>
  <option value="Ahmednagar">Ahmednagar</option>
  <option value="Akola">Akola</option>
  <option value="Chhatrapati Sambhajinagar">
    Chhatrapati Sambhajinagar
  </option>
  <option value="Beed">Beed</option>
  <option value="Bhandara">Bhandara</option>
  <option value="Buldhana">Buldhana </option>
  <option value="Chandrapur">Chandrapur </option>
  <option value="Dhule">Dhule </option>
  <option value="Dharashiva">Dharashiva </option>
  <option value="Gadchiroli">Gadchiroli </option>
  <option value="Gondia">Gondia </option>
  <option value="Hingoli">Hingoli </option>
  <option value="Jalgaon">Jalgaon </option>
  <option value="Jalna">Jalna </option>
  <option value="Kolhapur">Kolhapur </option>
  <option value="Latur">Latur </option>
  <option value="Mumbai">Mumbai </option>
  <option value="Palghar">Palghar </option>
  <option value="parbhani">parbhani </option>
  <option value="Pune">Pune </option>
  <option value="Raigad">Raigad </option>
  <option value="Ratnagiri">Ratnagiri </option>
  <option value="Satara">Satara </option>
  <option value="Sangli">Sangli </option>
  <option value="Solapur">Solapur </option>
  <option value="Sindhudurg">Sindhudurg </option>
  <option value="Thane">Thane </option>
  <option value="Washim">Washim </option>
  <option value="Wardha">Wardha </option>
  <option value="Yavatmal">Yavatmal </option>
</select>)
const [district,setdistrict]=useState();
  useEffect( () => {
    onClickSubmit();
    setflag(0);
    
  }, []);

  const hadnleRowChange = (event) => {
    setcheckedEmployes(event.selectedRows);
  };
  const columns = [
    {
      name: "ServiceId",
      selector: "सेवार्थआयडी",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
      filter: true,
    },
    {
      name: "Name of Government Employee",
      selector: "शासकीयकर्मचाऱ्याचेनाव",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
    },
    {
      name: "Name of Office",

      selector: "कार्यालयाचेनाव",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
    },

    {
      name: (
        <div>
          Post
          <select onChange={onChange} id="post">
            <option value="All">All</option>
            <option value="Director">Director</option>
            <option value="JDTP">JDTP</option>
            <option value="DDTP">DDTP</option>
            <option value="ADTP">ADTP</option>
            <option value="Town Planner">Town Planner</option>
            <option value="ATP (G-1)">ATP (G-1)</option>
            <option value="ATP (G-2)">ATP (G-2)</option>
            <option value="Planning Assistant">PlanningAssistant</option>
          </select>
        </div>
      ),
      selector: "Post",
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
    },
    {
      name: "Contact No",
      selector: "संपर्कक्र",
      // sortable: true,
      filterble: true,
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
    },
    {
      name: "E-Mail",
      selector: "ईमेल",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
      filterable: true,
    },
    {
      name: "Office E-Mail",
      selector: "कार्यालयाचाईमेल",
      sortable: true,
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
    },
    {
      name: (
        <div>
          Division
          <select name="cars" id="division" onChange={onChange}>
            <option value="All">All</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Amravati">Amravati</option>
            <option value="Pune">Pune</option>
            <option value="Konkan-1">Konkan-1</option>
            <option value="Konkan-2">Konkan-2</option>
            <option value="Chhatrapati Sambhajinagar">Chatrapati SambhajiNagar</option>
            <option value="Nashik">Nashik</option>
          </select>
        </div>
      ),
      selector: "Division",
      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
    },
    {
      name: (
        <div>
          District
          {district?district:All}
        </div>
      ),
      selector: "District",

      style: {
        background: "#cbe8ff",
        border: "0.1px solid black",
      },
    },
  ];

  const data = Employes;

  let id1 = 0;
  const tableData = {
    columns,
    data,
  };
  const addNames = () => {
    setEmployes(checkedEmployes);
    setdelteonCheck(checkedEmployes);
    setflag(1);
  };
  const addMoreNames = () => {
    setEmployes(TpData);
    setflag(0);
  };
  let AddMoreNamesBtn;
  let addNamesBtn;
  let deleteNamesBtn;
  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    orientation: "Landscape",
    documentTitle: "Userdata",
  });


  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);

    const title = "My Awesome Report";
    const headers = [["Employee Name", "Post","Office Name","ContactNo","MailID","OfficeContactNo","OfficeEMailID"]];

    const data = Employes.map(elt=> [elt.शासकीयकर्मचाऱ्याचेनाव, elt.Post,elt.कार्यालयाचेनाव,elt.संपर्कक्र,elt.ईमेल,elt.कार्यालयाचासंपर्कक्र,elt.कार्यालयाचाईमेल]);

    let content = {
      // startY: 25,
      head: headers,
      body: data,
      theme: 'grid',
     
    };

    // doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  const deleteNames = () => {
    console.log(Employes)
    // Step 1: Identify rows to be deleted
    let updatedData = [];
    for (let i = 0; i < deleteOnCheck.length; i++) {
      let flag1 = 0;
      for (let j = 0; j < checkedEmployes.length; j++) {
        if (deleteOnCheck[i] == checkedEmployes[j]) {
          flag1 = 1;
          break;
        }
      }
      if (!flag1) {
        updatedData.push(deleteOnCheck[i]);
      }
    }
    setEmployes(updatedData);
  };
  let printList;
  if (flag) {
    AddMoreNamesBtn = (
      <button className="btn" onClick={addMoreNames}>
        Add More Names
      </button>
    );
    addNamesBtn = null;
    deleteNamesBtn = (
      <button className="btn" onClick={deleteNames}>
        Delete Selected Names
      </button>
    );
    printList = (
      <Button variant="success" className="btn" onClick={exportPDF}>
        PrintList
      </Button>
    );
  } else {
    AddMoreNamesBtn = null;
    addNamesBtn = (
      <button className="btn" onClick={addNames}>
        Add Selected Names
      </button>
    );
    deleteNamesBtn = null;
    printList = null;
  }

  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {addNamesBtn}
        {AddMoreNamesBtn}
        {deleteNamesBtn}
        {printList}
      </div>
      <div ref={conponentPDF}>
        <DataTableExtensions {...tableData} print={false} export={false}>
          <DataTable
            actions={[
              {
                // icon: () => <Delete />,
                tooltip: "Delete Rows",
                onClick: deleteNames,
              },
            ]}
            noHeader
            defaultSortField="id"
            // sortIcon={<SortIcon />}
            subHeader
            defaultSortAsc={true}
            pagination
            highlightOnHover
            selectableRowsHighlight
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
