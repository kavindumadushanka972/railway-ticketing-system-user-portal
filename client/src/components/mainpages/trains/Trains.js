import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import Filter from './Filter'
import axios from 'axios'
import Footer from '../../footers/Footer'
import {Link} from 'react-router-dom'


function Trains() {

    const state = useContext(GlobalState)
    const [trains, setTrains] = state.trainAPI.trains
    const [token] = state.token
    const [callback, setCallback] = state.trainAPI.callback
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = state.trainAPI.sort
    const [Id, setId] = state.trainAPI.Id
    const [name, setName] = state.trainAPI.name

    useEffect(() => {
        const getTrains = async () =>{
            const res = await axios.get(`/api/trains?Id[regex]=${Id}&name[regex]=${name}&${sort}`)
            setTrains(res.data.trains)
            console.log(res.data.trains)
        }
        getTrains()
    },[callback, sort, Id, name])

    const deleteTrain = async (id) => {
        try {
            const confirm = window.confirm("Are you sure?")
            if(confirm){
                const res = await axios.delete(`/api/trains/${id}`,{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
                setCallback(!callback)
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    if(loading) return <div><Loading /></div>
    return (
        <div>
            <Filter />

            <table class="table table-hover container">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trains.map(train => (
                            <tr class="table-primary">
                                <td>{train.Id}</td>
                                <td>{train.name.toUpperCase()}</td>
                                <td><Link type="button" class="btn btn-outline-success" to={`/createTrain/${train.Id}`}>Update</Link></td>
                                <td><Link type="button" class="btn btn-outline-danger" onClick={() => deleteTrain(train.Id)}>Delete</Link></td>
                            </tr>
                        ))
                    }
                
                    
                    
                </tbody>
            </table>
            {trains.length === 0 && <Loading />}
            {trains.length !== 0 && <Footer />}
        </div>
    )
}

export default Trains

