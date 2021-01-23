import {useState, useEffect} from 'react'
import axios from 'axios'


function StationAPI() {
    const [stations, SetStations] = useState([])

    useEffect(() =>{
        const getStation = async () =>{
            try {
                const res = await axios.get('/api/stations')
                SetStations(res.data)
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
        getStation()
    })


    return {
        stations: [stations, SetStations]
    }
}

export default StationAPI
