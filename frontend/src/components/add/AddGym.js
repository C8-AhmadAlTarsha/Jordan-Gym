import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./addgym.css"; 


const AddGym = () => {
  const navigate = useNavigate();
  const buttonClass ="inActive"
  const status=false
const [days,setDays]=useState([{day:"SU",status:status,buttonClass:buttonClass},{day:"MO",status:status,buttonClass:buttonClass},{day:"TU",status:status,buttonClass:buttonClass},{day:"WE",status:status,buttonClass:buttonClass},{day:"TH",status:status,buttonClass:buttonClass},{day:"FR",status:status,buttonClass:buttonClass},{day:"SA",status:status,buttonClass:buttonClass}])
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [nameOfTriner, setNameOfTrainer] = useState(['']);
  const [oneMonth,setOneMonth]=useState(0)
  const [threeMonth,setThreeMonth]=useState(0)
  const [oneYear,setOneYear]=useState(0)
  const [mempershipPrice, setMembershipPrice] = useState({oneMonth:0,threeMonth:0,oneYear:0});
  const [numberOfMember,setNumberOfMember]=useState(0)
  const [ClosingDays,setClosingDays]=useState([""])
  const [facilities, setFacilities] = useState("");
  const { token, userId, gymOwner } = useContext(AppContext);
  const [AddMassege, setAddMassege] = useState("");
  const [numInputs, setNumInputs] = useState(1);
  const [inputValues, setInputValues] = useState(['']);
  
  
  
  


    
    const handleNumInputsChange = (e) => {
      const count = parseInt(e.target.value, 10) || 0;
      setNumInputs(count);
      setInputValues(new Array(count).fill(''));
    };
  
    const handleInputChange = (e, index) => {
     
      const newInputValues = [...nameOfTriner];
      newInputValues[index] = e.target.value;
      setNameOfTrainer(newInputValues);
    };
  
    const handleSubmit = (e) => {
      
      console.log(nameOfTriner);
    };
  
  return (
    <div className="add-gym-container">
      <input
        type="text"
        name="name"
        placeholder="Gym Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Gym Location"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        required
      />
       <div >
      
      <form className="dynamic_input" >
        <label htmlFor="numInputs">Number of Coach:</label>
        <input
 placeholder="Write The Numper Of Coach You Have"
          type="number"
          id="numInputs"
          min="0"
         // value={numInputs}
          onChange={handleNumInputsChange}
        />
       
        <div>
          {Array.from({ length: numInputs }, (_, index) => (
            <div key={index}>
              <input
                type="text"
            placeholder={`Coach Num ${index+1}`}
                value={nameOfTriner[index]}
                onChange={(e) => {handleInputChange(e, index)
                }}
              />
            </div>
          ))}
        </div>
       
      </form>
    </div>
<label>Mempership Price :</label>
<div className="memperShip_input"><input
       
        name="membershipPrice"
        placeholder="one Month"
        onChange={(e) => {
 // setOneMonth(e.target.value)
 setMembershipPrice({
   ...mempershipPrice, // Spread the existing values
   oneMonth: e.target.value // Update the oneMonth property
  });
  console.log(mempershipPrice);
        }}
        required
      /><input
      type="text"
      name="membershipPrice"
      placeholder="Three Month"
      onChange={(e) => {
        setMembershipPrice({
          ...mempershipPrice, // Spread the existing values
          threeMonth: e.target.value // Update the oneMonth property
         });
      }}
      required
    /><input 
    type="text"
    name="membershipPrice"
    placeholder="Annually"
    onChange={(e) => {
      setMembershipPrice({
        ...mempershipPrice, // Spread the existing values
        oneYear: e.target.value // Update the oneMonth property
       });
    }}
    required
  /></div>
      <input
        type="number"
        name="Number Of Members"
        placeholder="Number Of Members"
        onChange={(e) => {
          setNumberOfMember(e.target.value);
        }}
        required
      />
    
     <div class="weekDays-selector">
       <label>Closing Days:</label>
 
{days?.map((oneDay)=>{
 const toggleDayStatus = (dayName) => {
  console.log(dayName);
  setDays((prevDays) => {
 
    return prevDays.map((day) => {
      if (day.day === dayName&&day.buttonClass=="inActive") {

        return {day:dayName,status:!day.status,buttonClass:"active"}
      }else if (day.day === dayName&&day.buttonClass=="active") {
        return {day:dayName,status:!day.status,buttonClass:"inActive"}
      }
      return day;
    });
  });
};

  return <div class="weekDays-selector"> <button  onClick={
    (e) => {toggleDayStatus(oneDay.day)
      console.log(oneDay.buttonClass);
     
      // if (e.target.className=="inActive") {
      //   setButtonClass("active")
      //   console.log(1);
      // }else{setButtonClass("inActive"), console.log(0);}
    
    }
    
  } type="checkbox" className={oneDay.buttonClass} value={oneDay.status}  >{oneDay.day}</button>
  <label ></label></div>
})}

</div>
      <input
        type="text"
        name="facilities"
        placeholder="Gym Facilities"
        onChange={(e) => {
          setFacilities(e.target.value);
        }}
        required
      />
      <button
        className="add-button"
        onClick={() => {
          // let arr=  days.filter((ele)=>{
          //   return ele.status==true
          //           })
          //           console.log(arr);
          //           setClosingDays(arr)
           handleSubmit()
           setMembershipPrice({oneMonth:oneMonth,threeMonth:threeMonth,oneYear:oneYear})
           console.log(oneMonth);
           console.log(threeMonth);
           console.log(oneYear);
           console.log(mempershipPrice);
          const newGym = {
            gymOwner: userId,
            name,
            location,
            nameOfTriner,
            mempershipPrice,
            facilities,
            numberOfMember,
            ClosingDays

          };
         
          axios.post(`http://localhost:5000/gym/create`, newGym, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => {
            console.log(res.data);
            setAddMassege(res.data.message)
            console.log(res);
          }).catch((err) => {
            console.log(err);
            setAddMassege("Verify that all information has been entered")
          });
        }}
      >
        Submit
      </button>
     
      <p className="xx">{AddMassege}</p>
      <button onClick={()=>{
        let arr=  days.filter((ele)=>{
            return ele.status==true
                    })
                    console.log(arr);
                    setClosingDays(arr)
                   
                    console.log(mempershipPrice);
      }} >test</button>
    </div>
  );
}

export default AddGym;



  
 
 