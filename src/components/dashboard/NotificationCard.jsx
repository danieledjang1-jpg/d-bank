import { useContext } from "react";

import "./NotificationCard.css";

import { BankContext } from "../../context/BankContext";

const NotificationCard = () => {

 const { notifications } = useContext(BankContext);


  return (
   <div className="notification-card">

  <h3>Notifications</h3>

  {notifications.length === 0 ? (

    <p className="empty-notifications">
      No notifications yet.
    </p>

  ) : (

    notifications.map((item) => (

      <div
        key={item.id}
        className="notification-item"
      >

        <h4>{item.title}</h4>

        <p>{item.message}</p>

        <small>{item.time}</small>

      </div>

    ))

  )}

</div>

  );
};

export default NotificationCard;