import { Col, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { api } from '../../Api';

const SpotBidDetails = () => {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const [show, setShow] = useState(false);

    const [bidId, setBidId] = useState();

    const [bidderNmae, setBidderName] = useState('');
    const [biddingPrice, setBiddingPrice] = useState();
    const [biddersDetails, setBiddersDetails] = useState();
    const [upcommingBid, setUpcommingBid] = useState();




    const [activeSpotBidData, setActiveSpotBidData] = useState([]);
    const [expireSpotBidData, setExpireSpotBidData] = useState([]);
    useEffect(() => {
        getActiveSpotBidData();
        getExpireSpotBidData();
        getUpcommingSpotBidData()
    }, [])
    const getActiveSpotBidData = async () => {
        const datas = await api.get('/spot-bid-active-details')
        setActiveSpotBidData(datas.data)
    }
    const getExpireSpotBidData = async () => {
        const datas = await api.get('/spot-bid-expire-details')
        setExpireSpotBidData(datas.data)
    }

    const getUpcommingSpotBidData = async () => {
        const datas = await api.get('/spot-bid-upcomming-details')
        setUpcommingBid(datas.data)
    }

    const handleBidDetailsShow = async (data) => {
        setBiddersDetails(data.placeBidDetails)
        setLgShow(true)
        // setLgShow(false)
    }


    const handleClose = async () => {
        const paylod = {
            bidId: bidId,
            bidderNmae,
            biddingPrice,

        }
        setShow(false)
        const usersdata = await api.post('/place-spot-bid', paylod)
        if (usersdata.status === 200) {
            window.alert('Registation Sucessfull')
            Navigate('/spot-bid-details')
        } else {
            window.alert('Invalid Registation')
            console.log('Invalid Registation')
        }
    };


    const handleShow = (_id) => {
        setBidId(_id)
        setShow(true)
    };

    // const handleBidDetailsShow = (_id) => {
    //     setBidId(_id)
    //     setLgShow(true)
    // };






    return (
        <>
            <div className='product-list'>
                <h3>SpotBid Details  Active</h3>
                <ul>
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Email I'd</li>
                    <li>Phone No</li>
                    <li>From</li>
                    <li>Destination</li>
                    <li>Distance</li>
                    <li>Bid Amount(INR)</li>
                    <li>Place Bid</li>
                </ul>
                {activeSpotBidData &&
                    activeSpotBidData.map((spotBid, index) =>
                        <ul key={spotBid._id}>
                            <li>{index + 1}</li>
                            <li>{spotBid.name}</li>
                            <li>{spotBid.email}</li>
                            <li>{spotBid.phoneNo}</li>
                            <li>{spotBid.from}</li>
                            <li>{spotBid.destination}</li>
                            <li>{spotBid.distance}</li>
                            <li>{spotBid.charge}</li>
                            <li><button variant="primary" onClick={() => handleShow(spotBid._id)}>
                                Place Bid
                            </button></li>
                        </ul>)
                }
            </div>

            <div className='product-list'>
                <h3>SpotBid Details  (Bid Completed)</h3>
                <ul>
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Email I'd</li>
                    <li>Phone No</li>
                    <li>From</li>
                    <li>Destination</li>
                    <li>Distance</li>
                    <li>Bid Amount(INR)</li>
                    <li>View Bids</li>
                </ul>
                {expireSpotBidData &&
                    expireSpotBidData.map((spotBid, index) =>
                        <ul key={spotBid._id}>
                            <li>{index + 1}</li>
                            <li>{spotBid.name}</li>
                            <li>{spotBid.email}</li>
                            <li>{spotBid.phoneNo}</li>
                            <li>{spotBid.from}</li>
                            <li>{spotBid.destination}</li>
                            <li>{spotBid.distance}</li>
                            <li>{spotBid.charge}</li>
                            <li><button variant="primary" onClick={() => handleBidDetailsShow(spotBid)}>
                            View Bid
                            </button></li>
                        </ul>)
                }
            </div>

            <div className='product-list'>
                <h3>SpotBid Details  (Upcomming Bid)</h3>
                <ul>
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Email I'd</li>
                    <li>Phone No</li>
                    <li>From</li>
                    <li>Destination</li>
                    <li>Distance</li>
                    <li>Bid Amount(INR)</li>
                    <li>Bid Start Time</li>
                </ul>
                {upcommingBid &&
                    upcommingBid.map((spotBid, index) =>
                        <ul key={spotBid._id}>
                            <li>{index + 1}</li>
                            <li>{spotBid.name}</li>
                            <li>{spotBid.email}</li>
                            <li>{spotBid.phoneNo}</li>
                            <li>{spotBid.from}</li>
                            <li>{spotBid.destination}</li>
                            <li>{spotBid.distance}</li>
                            <li>{spotBid.charge}</li>
                            <li>{spotBid.pickupTime}</li>

                        </ul>)
                }
            </div>

            <>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Col>Enter Name
                            <Input type='text' name='usersName' id='usersName' placeholder='Your Name'
                                value={bidderNmae}
                                onChange={(e) => setBidderName(e.target.value)}
                            ></Input>
                        </Col>

                    </Modal.Header>
                    <Modal.Header >
                        <Col>Enter Bidding Amount
                            <Input type='Number' name='charge' id='charge' placeholder='Total Amount in INR'
                                value={biddingPrice}
                                onChange={(e) => setBiddingPrice(e.target.value)}
                            ></Input>
                        </Col>

                    </Modal.Header>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Bidders Details with Ranking
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='product-list'>
                            <h3>SpotBid Details  (Bid Completed)</h3>
                            <ul>
                                <li>S. No</li>
                                <li>Name</li>
                                <li>Place Bid Amt</li>
                            </ul>
                            {biddersDetails &&
                                biddersDetails.map((spotBid, index) =>
                                    <ul key={spotBid._id}>
                                        <li>{index + 1}</li>
                                        <li>{spotBid.bidderNmae}</li>
                                        <li>{spotBid.biddingPrice}</li>
                                    </ul>)
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        </>
    )
}

export default SpotBidDetails