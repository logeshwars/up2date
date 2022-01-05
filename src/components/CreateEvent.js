import React,{useState} from "react";
import "./CreateEvent.css";
import { db} from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection,doc, setDoc, Timestamp } from "firebase/firestore"; 
function CreateEvent() {
  const [shareImage, setShareImage] = useState("");
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("")
  const [cordi,setCordi]=useState("")
  const [cordNo,setCordNo]=useState("")
  const [depart,setDepart]=useState("")
  const [sDate,setSDate]=useState("")
  const [eDate,setEDate]=useState("")
  const [rDate,setRDate]=useState("")
  const [rNeed,setRNeed]=useState("YES")
  const [downloadUrl,setdownloadURL]=useState("")
  const [loading,setLoading]=useState(false);
  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image ,this file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const handleSubmit=(e)=>
  {
    e.preventDefault();

const storage = getStorage();
    const upload =ref(storage, `images/${shareImage.name}`)
   
const uploadTask = uploadBytesResumable(upload, shareImage.image);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'running':
        setLoading(true);
        break;
        default:
          break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setdownloadURL(downloadURL)
      const send= async()=>{
        const newuserRef = doc(collection(db, "events"));
        const data={
                  shareImg: downloadURL,
                  title:title,
                  description:desc,
                  cordinator:cordi,
                  cordinatorPH:cordNo,
                  department:depart,
                  startdate:sDate,
                  enddate:eDate,
                  closedate:rDate,
                  needed:rNeed,
                }
                await setDoc(newuserRef , data).then(()=>{
                 setCordNo("")
                 setTitle("")
                 setCordi("")
                 setDepart("");
                 setDesc("");
                 setdownloadURL("");
                 setShareImage("");
                 setSDate("");
                 setEDate("");
                 setRDate("");
      
              });
            }
         send();
      
    });
  }
);
console.log("dd",downloadUrl)
        setLoading(false);
        }
  return (
    
    <div className="createEvent">
      <div className="createEventTitle">
        <h3>Create Event</h3>
        <div className="eventInputs">
        <div className="eventInside">
        <label>Event Image</label>
        <input
                      type="file"
                      accept="image/gif,image/jpeg"
                      name="image"
                      id="image"
                      style={{ display: "none" }}
                      onChange={handleImage}
                    />
                      {!shareImage && (
                    <p>
                      <label  className="upImage" htmlFor="image">Select a image for share</label>
                    </p>)}
                    {shareImage && (
                      <img className="uploadedImg" alt="" src={URL.createObjectURL(shareImage)} />
                    )}
                     </div>
                     <hr className="hr" />
          <div className="eventInside">
            <label>Event Title</label>
            <input required value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className="eventInside">
          <label>Event Decription</label>
            <textarea  required value={desc}  placeholder="Description" onChange={(e)=>setDesc(e.target.value)}></textarea>
          </div>
          <hr className="hr" />
          <div className="eventInside">
          <div className="eventInside">
            <label>Cordinator</label>
            <input  required value={cordi}  placeholder="Cordinator" onChange={(e)=>setCordi(e.target.value)}/>
          </div>
          <div className="eventInside">
            <label>Cordinator Ph.NO</label>
            <input required value={cordNo} placeholder="Cordinator No" type="tel" onChange={(e)=>setCordNo(e.target.value)}/>
          </div>
          </div>
          <div className="eventInside">
            <label>Department</label>
            <input  required value={depart}  placeholder="Department" onChange={(e)=>setDepart(e.target.value)}/>
          </div>
          <hr className="hr" />
          <div className="eventInside">
            <div className="eventInside">
              <label>Start Date</label>
              <input  required value={sDate}  placeholder="Start Date" type="date" onChange={(e)=>setSDate(e.target.value)}/>
            </div>{" "}
            <div className="eventInside">
              <label>End Date</label>
              <input  required value={eDate}  placeholder="Title" type="date" onChange={(e)=>setEDate(e.target.value)}/>
            </div>
          </div>
          <div className="eventInside">
            <label>Registeration End</label>
            <input  required value={rDate}  placeholder="Title" type="date" onChange={(e)=>setRDate(e.target.value)}/>
          </div>
          <hr className="hr" />
          <div className="eventInside">
            <label>Registeration Needed or not?</label>
            <div className="eventInsideButtons">
            <button onClick={()=>setRNeed("YES")}>Yes</button>
            <button  onClick={()=>setRNeed("NO")}>No</button>
            </div>
           
          </div>
          <div className="eventInside eventCenterButton">
          <form onSubmit={(e)=>handleSubmit(e)}> <button className="eventCreate">Create</button></form>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
