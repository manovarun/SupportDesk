import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getTickets, reset } from '../features/ticket/ticketSlice';

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.length > 0 &&
          tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
      </div>
    </>
  );
};

export default Tickets;
