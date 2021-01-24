import {useState, useEffect} from 'react'
import axios from 'axios'


function StationAPI() {
    const [stations, SetStations] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getStation = async () =>{
            try {
                const res = await axios.get('/api/stations')
                SetStations(res.data.stations)
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
        getStation()
    },[callback])


    return {
        stations: [stations, SetStations]
    }
}

export default StationAPI
