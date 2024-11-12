import React, { useState } from 'react'
import { Box, Button, Card, Divider, Typography, Modal } from "@mui/material"
import DataTable from "react-data-table-component"



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};

const Employees = () => {
  const [data, setData] = useState([])

  const [openEmployeeModal, setOpenEmployeeModal] = React.useState(false);
  const handleOpenEmployeeModal = () => setOpenEmployeeModal(true);
  const handleCloseEmployeeModal = () => setOpenEmployeeModal(false);


  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
  ]
  return (
    <>
      <Card sx={{
        width: "80vw",
        padding: 2
      }}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Employees List</Typography>
          <Button variant='outlined' onClick={handleOpenEmployeeModal}> Add Employees </Button>

        </Box>
        <br />
        <Divider />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Box display="flex" justifyContent="space-between">
            <Typography>Show</Typography>
            <select name="" id="">
              <option value="">10</option>
              <option value="">50</option>
              <option value="">100</option>
            </select>
            <Typography>entries</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Search</Typography>
            <input type="search" />
          </Box>
        </Box>

        <Box>
          <DataTable
            columns={columns}
            data={data}
          />

        </Box>

      </Card>


      <Modal
        open={openEmployeeModal}
        onClose={handleCloseEmployeeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Employee
          </Typography>

        </Box>
      </Modal>
    </>
  )
}

export default Employees
