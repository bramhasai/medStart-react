import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import '../CSS/HospitalData.css';
import { useNavigate } from "react-router-dom";


export default function HospitalData(){
    const [hospitalData,setHospitalData]=useState([]);
    const [latlong,setLatLong]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLatLong({
                    lat:position.coords.latitude,
                    long:position.coords.longitude
                })
            })
        }
    },[])
    useEffect(()=>{
        if(latlong.long && latlong.lat){
            axios.get(`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latlong.long},${latlong.lat},7000&bias=proximity:78.4371616,17.3713207&limit=20&apiKey=383aa42d27734195b048a06800e77b5b`).then((res)=>{
                setHospitalData(res.data.features)
            })
        } 
    },[latlong])
    
    

    return(
        <div className="hospital_cards">
            {hospitalData
                .sort((a,b)=>a.properties.distance-b.properties.distance)
                .map((hospital,index)=>{
                    const { name, formatted, distance, contact, datasource } = hospital.properties;
                    const phone = contact?.phone;
                    const website = hospital.properties.website;
                return(
                    <div key={index} className="div_card" onClick={()=>navigate(`/${name}/details`, {state:{hospital:hospital,latlong:latlong}})}>
                        <Card className="hospital_card" >
                            <Card.Body className="card_body">
                                <Card.Title><h2>{name || "Unknown Hospital"}</h2></Card.Title>
            
                                <Card.Text>{formatted}</Card.Text>
                                {phone && 
                                    <Card.Text style={{margin:"0.2rem 0rem"}}>
                                        Phone: {phone}
                                    </Card.Text>
                                }
                                {website && (
                                        <Card.Link className="hospital_website" href={website} target="_blank">
                                            <Card.Text style={{margin:"0.2rem 0rem"}}>
                                                {website}
                                            </Card.Text>
                                        </Card.Link>
                                )}
                                {/* <Button variant="primary" onClick={()=>handleGetDirections(hospital.properties.lat,hospital.properties.lon)}>Get Directions</Button> */}
                            </Card.Body>
                        </Card>
                    </div>
                    
                )
            })}
        </div>
    )
}