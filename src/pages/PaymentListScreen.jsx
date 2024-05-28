import moment from "moment";
import React, {useEffect, useState} from "react";
import useGetPaymentList from "../api/useGetPaymentList";

function PaymentListScreen() {
  const {getPaymentList, loading, error, paymentList} = useGetPaymentList();
  const [page, setPage] = useState(0);

  useEffect(() => {
    getPaymentList(page, 10);
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container">
      <h1>Transaction History</h1>
      <ul>
        {paymentList?.result?.map((paymentListItem) => {
          console.log(paymentListItem);
          const formattedDate = moment(paymentListItem?.created_at).format(
            "DD.MM.YYYY HH:mm:ss"
          );
          return (
            <li key={paymentListItem.id}>
              <img src={paymentListItem?.info.game.logo_url} alt="" />
              <div>
                <div>
                  <p>{paymentListItem?.info.game.name}</p>
                  <button>Success</button>
                </div>
                <div>
                  <p>{formattedDate}</p>
                  <p>{paymentListItem?.amount} UZS</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PaymentListScreen;
