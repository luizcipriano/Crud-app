import './App.scss'
import {useState} from "react";
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () =>{
    Axios.post('http://localhost:3001/create', {
      name: name,
      age:age,
      country:country,
      position:position,
      wage:wage,
      }).then(() =>{
        setEmployeeList([...employeeList, {
          name: name,
          age:age,
          country:country,
          position:position,
          wage:wage,
        }])
      });
  };
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
     setEmployeeList(response.data);
    });
  };
  const uptadeEmployeeWage = (id) =>{
    Axios.put("http://localhost:3001/update", {wage: newWage, id : id}).then((response)=>{
      setEmployeeList(employeeList.map((val)=>{
        return val.id == id ? {id: val.id, name: val.name, country: val.country, age: val.age, position: val.position, wage: newWage} : val
      }))
    })
  }
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className='form'>

      <label htmlFor="">Name:</label>
      <input type="text" name='name' id='name'  
      onChange={(event) =>{
        setName(event.target.value);
      }}
      />
      <label htmlFor="">Age:</label>
      <input type="number" name="age" id="age"
       onChange={(event) =>{
        setAge(event.target.value);
      }} />
      <label htmlFor="Country">Country:</label>
      <input type="text" name="country" id="country" 
       onChange={(event) =>{
        setCountry(event.target.value);
      }}/>
      <label htmlFor="">Position:</label>
      <input type="text" name="position" id='position'
       onChange={(event) =>{
        setPosition(event.target.value);
      }}/>
      <label htmlFor="">Wage (year):</label>
      <input type="number" name='wage' id='wage' 
       onChange={(event) =>{
        setWage(event.target.value);
      }}/>
      <button onClick={addEmployee}>Add Employees</button>
      </div>
      <hr />
      <div className='employees'>

      <button onClick={getEmployees}>Show Employees</button>

      {employeeList.map((val, key) =>{
        return ( 
          <div className='employee'>
            <div>
          <h2>Name:{val.name}   </h2> 
          <h2>Age:{val.age}   </h2> 
          <h2>Country:{val.country}   </h2> 
          <h2>Position:{val.position}   </h2> 
          <h2>Wage(year):{val.wage}   </h2> 
            </div>
          
          <div><input 
            type="text" 
            placeholder='wage...'
            onChange={(event) =>{
            setNewWage(event.target.value);
            }} 
          />
            <button onClick={()=>{uptadeEmployeeWage(val.id)}}>Update</button>
            <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
          </div>
           </div>
      );
      })}
      </div>
    </div>
  )
}

export default App
