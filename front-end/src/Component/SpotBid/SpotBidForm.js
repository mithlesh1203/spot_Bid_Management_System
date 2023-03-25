import React, { useState } from 'react'
import { Button, Row, Col, Input, DatePicker, message } from 'antd';
import { api } from '../../Api';
import { useNavigate } from 'react-router-dom';

function SpotBidForm() {
    const navigate = useNavigate();
    const [usersName, setUsersName] = useState('');
    const [email, setEmail] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [from, setFrom] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState();
    const [charge, setCharge] = useState();

    const [pickupTime, setPickupTime] = useState(null);
    const [bidEndTime, setBidEndTime] = useState(null);
    const [spotStatus, setSpotStatus] = useState();


    const postData = async () => {

        if (!usersName || !email || !phoneNo || !from || !destination || !distance || !charge || !pickupTime || !bidEndTime) {
            return message.warning('All fields are compersary please fill')
        }
        
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
        let endDate = new Date(bidEndTime)
        let startDate = new Date(pickupTime)
        let currentDate = new Date(currentTime)
    
        let paylod = {
            name: usersName,
            email: email,
            phoneNo: phoneNo,
            from: from,
            destination: destination,
            distance: distance,
            charge: charge,
            pickupTime: pickupTime,
            bidEndTime: bidEndTime,
            status :spotStatus,

        };
        if(((currentDate -startDate )> 0) && (endDate -startDate > 0)){
            paylod.status = 'LIVE'
          }else if(endDate -startDate < 0){
            return window.alert('Please Enter valid Time')
          }else {
            paylod.status = 'UPCOMMING'
          }
        const usersdata = await api.post('/spot-bid-registation', paylod)

        if (usersdata.status === 200) {
            window.alert('Registation Sucessfull')
            navigate('/spot-bid-details')
        } else {
            window.alert('Invalid Registation')
            console.log('Invalid Registation')
        }
    }



    return (
        <>
            <Row span={24} type="flex" justify="center" align="middle" style={{ marginTop: '5%' }}>
                <Col span={8} >
                    <Row justify="center" align="middle" >
                        <h1>SPOT BID FORM</h1>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>
                        <Col span={24}>
                            <Input type='text' name='usersName' id='usersName' placeholder='Your Name'
                                value={usersName}
                                onChange={(e) => setUsersName(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='text' name='email' id='email' placeholder='Email Id'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='text' name='phoneNo' id='phoneNo' placeholder='Phone Number'
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={9} >
                            <Input type='From' name='From' id='From' placeholder='From'
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            ></Input>
                        </Col>
                        <Col span={2} style={{ margin: '0 5% 0 5%' }}>
                            To
                        </Col>
                        <Col span={9}>
                            <Input type='Destination' name='destination' id='destination' placeholder='Enter Destination'
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='Number' name='distance' id='distance' placeholder='Total Distance'
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='Number' name='charge' id='charge' placeholder='Total Amount in INR'
                                value={charge}
                                onChange={(e) => setCharge(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={12}>
                            <DatePicker
                                showTime
                                placeholder="Select Time"
                                //   css={tw`w-full`}
                                time={pickupTime}
                                onChange={(value, dateString) => {
                                    setPickupTime(dateString);
                                }}
                            />

                        </Col>
                        <Col span={12}>
                            <DatePicker
                                showTime
                                placeholder="Select Time"
                                //   css={tw`w-full`}
                                time={bidEndTime}
                                onChange={(value, dateString) => {
                                    setBidEndTime(dateString);
                                }}
                            />

                        </Col>
                    </Row>

                    <Row justify="center" align="middle" style={{ margin: '10%' }}>
                        <Col >
                            <Button
                                onClick={postData}
                            >SUBMIT</Button>
                        </Col>
                    </Row>

                </Col>

            </Row >
        </>
    )
}

export default SpotBidForm