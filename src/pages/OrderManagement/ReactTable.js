import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../Components/Common/ChangeStatus';
import moment from 'moment/moment';
import DeleteModal from "../../Components/Common/DeleteModal";
import { changeStatusOrder, deleteOrder, getOrders } from '../../actions/order';
import { Capitalize } from '../../helpers/common_functions';

const DataTable = ({ changeStatusOrder, deleteOrder, getOrders, order: { orders, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);


  orders.forEach(row => searchTable.push({ id: row._id, orderId: row.orderId, orderId: row.orderId, amount: row.totalPrice, paymentMethod: row.paymentMethod, action: [row._id, row.status], status: row.status, created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss') }));

  function tog_grid(data) {
    setStatusModal(true);
    setSelectedSingle(Capitalize(data[1]));
    setId(data[0]);
  }

  function tog_center(id) {
    setDeleteModal(true);
    setId(id);
  }

  const handleDelete = () => {
    deleteOrder(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusOrder(id, selectedSingle);
    setStatusModal(false);
  }

  const statusOptions = [
    { label: "Status", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "Inprogress", value: "Inprogress" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Pickups", value: "Pickups" },
    { label: "Returns", value: "Returns" },
    { label: "Delivered", value: "Delivered" },
  ];


  const columns = useMemo(
    () => [
      {
        header: "Order Date",
        cell: (cell) => {
          return (
            <span className="">{cell.getValue()}</span>
          );
        },
        accessorKey: "created",
        enableColumnFilter: false,
      },
      {
        header: "Order ID",
        accessorKey: "orderId",
        enableColumnFilter: false,
      },

      {
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
      },
      {
        header: "Payment Method",
        accessorKey: "paymentMethod",
        enableColumnFilter: false,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,

        cell: (cell) => {
          return (
            <div>
              <Link onClick={() => tog_grid(cell.getValue())} to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>&nbsp;&nbsp;

              <Link onClick={() => tog_center(cell.getValue()[0])} to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment >
      {loading ? (
        <Loader />
      ) : (
        <TableContainer
          columns={(columns || [])}
          data={(searchTable || [])}
          isGlobalFilter={true}
          customPageSize={(searchTable.length < process.env.LIMIT) ? searchTable.length : process.env.LIMIT}
          SearchPlaceholder='Search...'
        />
      )}
      <DeleteModal
        show={deleteModal}
        onCloseClick={() => setDeleteModal(false)}
        onDeleteClick={handleDelete}
      />

      <ChangeStatus
        show={statusModal}
        onCloseClick={() => setStatusModal(false)}
        onClick={handleChageStatus}
        statusOptions={statusOptions}
        selectedSingle={selectedSingle}
        handleSelectSingle={handleSelectSingle}
      />
    </React.Fragment >


  );
};



DataTable.propTypes = {
  getOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  changeStatusOrder: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  order: state.order,
});

export default connect(mapStateToProps, { changeStatusOrder, deleteOrder, getOrders })(DataTable);