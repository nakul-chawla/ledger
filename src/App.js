import './App.css';
import simple_ledger from "./data/complicated_ledger.json"
import React,{ useState, useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";


function App() {

  const [data, changeData] = useState([]);

  useEffect(() => {
    cleanData();
  },[]);

  function cleanData(){
    // here we are cleaning the array by removing the duplicate id's
    var clean = simple_ledger.filter((simple_ledger, index, self) =>
            index === self.findIndex((t) => (t.activity_id === simple_ledger.activity_id))) 

    clean.sort(sortByProperty("date","amount"));

    for(let i=0;i<clean.length;i++){
      let message = toMakeDescription(clean[i]);
      clean[i]["message"] = message;
    }
    
    changeData(clean);
  }

  function toMakeDescription(obj){
    let message="";
    if(obj["type"] === "DEPOSIT"){
      message = obj["method"] + " Deposit for investment";
    }else if(obj["type"] === "INVESTMENT"){
      message = "Investment in " + obj["destination"]["type"] +" "+obj["destination"]["description"];  
    }else if(obj["type"] === "REFUND"){
      message = "Refund from " + obj["source"]["type"] + " " + obj["source"]["description"] 
    }else if(obj["type"] === "WITHDRAWAL"){
      message = "Withdrawal for " + obj["destination"]["type"] + " " + obj["destination"]["description"]
    }else if(obj["type"] === "TRANSFER"){
      if(obj["source"]["type"] === "INVESTOR"){
        message = "Transfer to " + obj["destination"]["type"]
      }else{
        message = "Transfer from " + obj["source"]["type"] + " " + obj["source"]["description"] 
      }
    }else{
      message = "No information to Display"
    } 
  return message;
  }

  function sortByProperty(date,amount){
      // function used to compare two values in the sorting function.
      // the sorting happens on the basis of time, if the time is the same,
      // we give priority to the credit transaction.  
    return function(a,b){  
       if(a[date] > b[date])  
          return -1;  
       else if(a[date] < b[date])  
          return 1;  
       else if(a[amount] > 0 && b[amount] < 0)
          return 1;
       else if(b[amount] > 0 && a[amount] < 0)
          return -1;
       return 0;  
    }  
 }

  return (
    <div className="App">
      {data.length === 0 ? (<p>Trying</p>) :
        (<div>
              <h1>
      Your investing account
      <br/><br/>
      Balance {data[0]["balance"]}
      {/* <div class="small">{data[data.length - 1]["date"]} - {data[0]["date"]}</div> */}
          </h1>
          <TableContainer
            component={Paper}
            style = {{boxShadow: "0px 2px 2px 2px rgba(0,0,0,0.1"}}
          >
            <Table
              sx={{minWidth:900}}
              component={Paper}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align = "center"
                    style={{padding:"19px", fontWeight:600}}                  
                  >
                  Date
                  </TableCell>
                  <TableCell
                    align = "center"
                    style={{padding:"19px", fontWeight:600}}                  
                  >
                  Transaction
                  </TableCell>
                  <TableCell
                    align = "center"
                    style={{padding:"19px", fontWeight:600}}                  
                  >
                  Amount
                  </TableCell>
                  <TableCell
                    align = "center"
                    style={{padding:"19px", fontWeight:600}}                  
                  >
                  Description
                  </TableCell>
                  <TableCell
                    align = "center"
                    style={{padding:"19px", fontWeight:600}}                  
                  >
                  Balance
                  </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item,i)=>(
                    <TableRow
                      hover
                      key={i}
                      sx = {{th:{border : 2}}}
                    >
                      <TableCell
                        align = "center"
                        style={{padding:"6px"}}
                      >
                        {item.date}
                      </TableCell>
                      <TableCell
                        align = "center"
                        style={{padding:"6px"}}
                      >
                        {item.type}
                      </TableCell>
                      <TableCell
                        align = "center"
                        style={{padding:"6px"}}
                      >
                        {item.amount}
                      </TableCell>
                      <TableCell
                        align = "center"
                        style={{padding:"6px"}}
                      >
                        {item.message}
                      </TableCell>
                      <TableCell
                        align = "center"
                        style={{padding:"6px"}}
                      >
                        {item.balance}
                      </TableCell>
                    </TableRow>
                  ))}
                

                </TableBody>
            </Table>
          </TableContainer>
          </div>
        )
      }
    </div>
  );
}

export default App;
