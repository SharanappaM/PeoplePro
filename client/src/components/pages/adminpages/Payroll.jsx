import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Tooltip, Modal, List, ListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from '../ReactDataTableStyle';
import { toast, ToastContainer } from 'react-toastify';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const Payroll = () => {
    const [employeesData, setEmployeesData] = useState([]);
    const [entries, setEntries] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [makePaymentModal, setMakePaymentModal] = useState(false)
    const [emplyoeeBasicSalary, setEmplyoeeBasicSalary] = useState(null)
    const [employeeId, setEmployeeId] = useState(null)
    const [paymentSuccess, setPaymentSuccess] = useState(false)



    const handleMakePaymeny = (data) => {
        setEmplyoeeBasicSalary(data.basic_salary);
        setEmployeeId(data.employee_id)



    }

    const handleSubmitFormakepayment = () => {
        const formData = {
            payment_status: "Paid"
        }
        axios.put(`${import.meta.env.VITE_APP_SERVER_URL}/auth/updatePaymentStatus/${employeeId}`, formData)
            .then(res => {
                console.log(res.data);
                toast.success(res.data.msg)
                setPaymentSuccess(paymentSuccess === false ? true : false)
                setMakePaymentModal(false)

            }).catch(err => {
                console.log(err);

            })
    }

    const columns = [
        {
            name: 'First Name',
            selector: (row) => row.first_name,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: (row) => row.last_name,
            sortable: true,
        },
        {
            name: 'Employee Id',
            selector: (row) => row.employee_id,
            sortable: true,
        },
        {
            name: 'Payslip Type',
            selector: (row) => row.payslip_type,
            sortable: true,
        },

        {
            name: 'Basic Salary',
            selector: (row) => row.basic_salary,
            sortable: true,
        },
        {
            name: 'Net Salary',
            selector: (row) => row.basic_salary,
            sortable: true,
        },

        {
            name: 'Payment Status',
            //   selector: (row) => row.payment_status,
            sortable: true,
            cell: row => <>
                {
                    row.payment_status === "Un Paid" && (
                        <Tooltip onClick={() => {
                            setMakePaymentModal(true)
                            handleMakePaymeny({ basic_salary: row.basic_salary, employee_id: row.employee_id })

                        }} title="Make paymeent" placement='bottom' arrow>
                            <Box sx={{ fontWeight: "bold", color: 'error.main' }}>{row.payment_status}</Box>
                        </Tooltip>


                    )
                }
                {
                    row.payment_status === "Paid" && (
                        <Box sx={{ fontWeight: "bold", color: 'success.main' }}>{row.payment_status}</Box>
                    )
                }
            </>
        },

        // Add more columns as needed
    ];
    const getEmployeeData = () => {
        axios.get("http://localhost:8787/auth/listEmployees")
            .then(res => {
                setEmployeesData(res.data.result)
                console.log(res.data.result);

            }).catch(err => {
                console.log(err);

            })


    }
    useEffect(() => {
        getEmployeeData();
    }, [paymentSuccess])

    return (
        <>
            <ToastContainer position='bottom-right' />
            <Card sx={{ padding: 2 }}>
                <Typography variant="h6" mb={2}>Emplyoees List</Typography>
                <Divider />

                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>Show</Typography>
                        <Select
                            value={entries}

                            size="small"
                            sx={{ ml: 1 }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                        <Typography sx={{ ml: 1 }}>entries</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>Search</Typography>
                        <TextField
                            size="small"
                            sx={{ ml: 1 }}
                            value={searchTerm}

                            variant="outlined"
                        />
                    </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <DataTable
                        columns={columns}
                        // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
                        data={employeesData}
                        pagination
                        paginationPerPage={entries}
                        customStyles={customStyles}
                    />
                </Box>
            </Card>


            <Modal
                open={makePaymentModal}
                onClose={() => setMakePaymentModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography p={1.5} variant='h6' fontWeight="bold">Make Payment</Typography>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography color='primary.main' fontWeight="bold">Basic Salray</Typography>
                        <Typography color='primary.main' fontWeight="bold">$ {emplyoeeBasicSalary}.00</Typography>
                    </Box>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography>Allowances</Typography>
                        <Typography>$0.00</Typography>
                    </Box>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography>Commissions</Typography>
                        <Typography>$0.00</Typography>
                    </Box>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography>Reimbursements</Typography>
                        <Typography>$0.00</Typography>
                    </Box>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography>Statutory deductions</Typography>
                        <Typography>$0.00</Typography>
                    </Box>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography>Advance Salary</Typography>
                        <Typography>$0.00</Typography>
                    </Box>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography>Loan</Typography>
                        <Typography>$0.00</Typography>
                    </Box>
                    <Divider />
                    <Box p={1.5} display="flex" justifyContent="space-between">
                        <Typography color='primary.main' fontWeight="bold">Net Salary </Typography>
                        <Typography color='primary.main' fontWeight="bold">$ {emplyoeeBasicSalary}.00</Typography>
                    </Box>
                    <Box >
                        <Typography p={1}>Payslip Comments </Typography>
                        <TextField fullWidth />
                    </Box>

                    <Button onClick={handleSubmitFormakepayment} variant='outlined' sx={{ mt: 2, alignSelf: "end" }}>Make Payment</Button>

                </Box>

            </Modal>
        </>
    )
}

export default Payroll
