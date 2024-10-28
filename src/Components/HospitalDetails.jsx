import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row,Col } from "react-bootstrap";
import '../CSS/HospitalDetails.css'
import axios from "axios";
import { Timeline,TimelineItem,TimelineDot,TimelineSeparator,TimelineConnector,TimelineContent } from "@mui/lab";
import {Button} from "react-bootstrap";
export default function HospitalDetails(){
    const location=useLocation();
    const [userAddress,setUserAddress]=useState([]);
    const [Directions,setDirections]=useState([]);
    const {hospital,latlong}=location.state;
    const {properties}=hospital;
    const {name,lat,lon,formatted,website,contact,city,state}=properties;
    const phone = contact?.phone;
    useEffect(()=>{
        if(latlong){
            axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlong.lat}&lon=${latlong.long}`).then((res)=>{
                setUserAddress(res.data.display_name);
            });
        }
    },[latlong]);
    
    useEffect(()=>{
        if(latlong && properties){
            axios.get(`https://api.geoapify.com/v1/routing?waypoints=${latlong.lat},${latlong.long}|${properties.lat},${properties.lon}&mode=drive&details=instruction_details,route_details&apiKey=fce17384f884437a86c3f1b4901f4740`).then((res)=>{
                setDirections(res.data.features[0].properties.legs[0].steps);
                // console.log(res.data.features[0].properties.legs[0].steps);
            })
        }
    },[latlong,properties]);

    

    const handleGetDirections = (latitude,longitude)=>{
        const directionsUrl=`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        window.open(directionsUrl, "_blank");
    }
    return(
        <div className="hospital_details">
            <Row className="hospital_details_row">
                <Col className="details">
                    <h2>{name}</h2>
                    <div>
                        <p><strong>User Latitude : </strong> {latlong.lat}</p>
                        <p><strong>User Longitude : </strong> {latlong.long}</p>
                        <p><strong>User Formatted Address : </strong> {userAddress}</p>
                    </div>

                    <div>
                        <p><strong>Hospital Latitude : </strong>{lat}</p>
                        <p><strong>Hospital Longitude : </strong>{lon}</p>
                        <p><strong>Hospital Formatted Address : </strong>{formatted} </p>
                    </div>
                    
                    <p style={{marginTop:"1rem"}}><strong>Hospital Mobile : </strong>{phone || 'Not Available'}</p>
                    <p><strong>Hospital Website : </strong>{website || 'Not Available'}</p>
                    <p><strong>City : </strong>{city}</p>
                    <p><strong>State : </strong>{state}</p>
                    
                </Col>
                <Col className="display_directions_col">
                    <div className="heading_directions" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <h2>Directions to Hospital</h2>
                        <Button onClick={()=>handleGetDirections(lat,lon)}>Get Directions</Button>
                    </div>
                    <div className="directions">
                        {Directions.length > 0 ? (
                            <Timeline>
                                {Directions.filter(direction => direction.instruction).map((direction, index,filtered_directions) => (
                                    <TimelineItem key={index}>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary" />
                                            {index < filtered_directions.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            {direction.instruction ? (
                                                <p>
                                                    {direction.instruction.transition_instruction} {direction.instruction.post_transition_instruction}
                                                </p>
                                            ) : (
                                                <p>No instruction available for this step.</p>
                                            )}
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        ) : (<p></p>)
                    }
                    </div>
                </Col>
            </Row>
        </div>
    )
}