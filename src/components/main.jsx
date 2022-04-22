import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


const Main = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    
    // Fetch Data from Api with parament to indicate the page number
    useEffect(() => {
    const getAllData = async (pageNumber) => {
        try {
            const { data } = await axios.get(
            `https://swapi.dev/api/planets/?page=${pageNumber}`
            );
            setData(data.results);
        } catch (err) {
            console.log(err);
        }
    };
     getAllData(currentPage);
    }, [currentPage])


    const handlePageChange = (e) => {
      setCurrentPage(e.target.innerText);
     };

  return (
    <div>
        <div className='main'>
            <h1 className='page'>
             Current Page { currentPage }
            </h1> 
            <TableContainer component={Paper} style={{ height: '500px'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold'}}>Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold'}}>Terrain</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold'}}>Climate</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold'}}>Diameter</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold'}}>Oribital-Period</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data?.map((row, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.terrain}</TableCell>
                        <TableCell align="right">{row.climate}</TableCell>
                        <TableCell align="right">{row.diameter}</TableCell>
                        <TableCell align="right">{row.orbital_period}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <div 
                style={{
                     display: 'flex',
                     flex: 1,
                     zIndex: 1,
                     justifyContent: 'flex-end',
                     position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                }}>
                    <Stack spacing={2}>
                    <Pagination 
                    count={6} 
                    onChange={(e) => handlePageChange(e)}
                    page={currentPage}
                    shape="rounded" 
                    hidePrevButton 
                    hideNextButton/>
                    </Stack>
                </div>
        </div>
    </div>
  )
}

export default Main;