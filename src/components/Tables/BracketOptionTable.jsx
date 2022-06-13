
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { GetBracketOptionData, getbSearch, GetSingleBracketOptionData } from '../../services/BracketOptionServices'
import BracketOptionModal from '../Modals/BracketOptionModal'

const BracketOptionTable = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value)
  };
  const [search, setSearch] = useState('')

    const [modal, setModal] = useState(false)
    const [ids, setIds] = useState()
    const [showDeleteModal, setShowdeleteModal] = useState(false)
    const [updateState,setUpdateState] = useState(false)
    const dispatch = useDispatch()
    const {loading,data} = useSelector((state)=> state.BracketOptionReducer)
    useEffect(() => {
        dispatch(GetBracketOptionData(page))
    }, [page])
    

    const AddDataHandler = () => {
        setUpdateState(false)
        setModal(true)
    }

    const deleteHandler = (id) => {
        setModal(true)
        setShowdeleteModal(true)
        setIds(id)
    }

    const updatehandler = (id) => {

        dispatch(GetSingleBracketOptionData(id))
        setUpdateState(true)
        setModal(true)
    }
    const handleSearch = () => {
      dispatch(getbSearch(search))
    }
    
    if (loading) {
        return <div>Loading..</div>
    }
    if (data) {
        return (
            <div>

<Pagination page={page} onChange={handleChange} count={3} />

<button onClick={() => AddDataHandler()}>Add Data</button>
<input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="search"
></input>
<button onClick={() => handleSearch()}>Search</button>

            
            <table>
                      <tr>
                        <th>BracketOption</th>
                        <th>TRod</th>
                        <th>SArm</th>
                        <th>LArm</th>
                      
                      </tr>
            {
                data[0].data.map((res)=><React.Fragment key = {res._id}>
                    <tr>
                        <td>
                          {res.BracketOption}
                        </td>
                        <td>
                          {res.TRod}
                        </td>
                        <td>
                          {res.SArm}
                        </td>
                        <td>
                          {res.LArm}
                        </td>
                        
                       
            
                        <button
                                  onClick={() => updatehandler(res._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  update
                                </button>
                                <button
                                  onClick={(e) => deleteHandler(res._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  delete
                                </button>
                    </tr>
                </React.Fragment>)
            
            }
            {
              modal?<BracketOptionModal id={ids} setModal={setModal} showDeleteModal={showDeleteModal} setShowdeleteModal={setShowdeleteModal} updateState={updateState} setUpdateState={setUpdateState} ></BracketOptionModal>:<div></div>
            }
                     
                    </table>
            
                </div>
          )
    }
}

export default BracketOptionTable