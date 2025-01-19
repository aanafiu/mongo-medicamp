import React, { useEffect, useState } from "react";
import { PaymentElement, useElements, useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RegisterCampById from "@/Hooks/RegisterCampById";
import Loader from "@/User/Common/Loader";
import { notifySuccess } from "@/User/Common/Notification";

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51QigCFH9dT5885rGt5CFe97Sr4BXWwJycQt02iPYsUIx46dIZu3dakeu8SfygO8h0OzKh92KB9JZT8X555XNgMgj00R37HKZmo");

const CheckoutForm = ({camp}) => {
    const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [campDetails, setCampDetails] = useState(camp);

  const amount = campDetails.fees;
  console.log(amount)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
      redirect: "if_required",
    });

    console.log(paymentIntent)



    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      notifySuccess(`Successfully Paid ${amount}$ For ${campDetails.campName}`)
      .then(res=>{
        const userInfo = {
            transactionId: paymentIntent.id,
            registrationIdByParticipant: campDetails._id,
            registrationCampId: campDetails.campId,
            registrationFees: campDetails.fees,
            registrationCampName: campDetails.campName,
            participantName: campDetails.participantName,
            participantEmail: campDetails.participantEmail,
            paymentStatus:"paid",
            campData: camp,
        }
        
        if(res.isConfirmed)
        {
            axios.put(`http://localhost:5000/register-camp-by-user/${campDetails._id}`)
            .then(res=>{
                if(res.status===201)
                    {
                    axios.post("http://localhost:5000/sucessfully-payment",userInfo)
                    .then(res=>{
                        if(res.status === 201)
                        {
                            navigate("/user/dashboard/manage-camps")
                        }
                    })
                }
            })
        }
      })
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded shadow">
       {/* <PaymentElement options={{ layout: "accordion", paymentMethodOrder: ["card"] }} /> */}
       <PaymentElement options={{ paymentMethodOrder: ["card"] }} />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : `Pay Now ${amount}$`}
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </form>
  );
};

const Payment = () => {
    const params = useParams();
    // console.log(params.campId)
    const {camp,loading} = RegisterCampById(params.campId);

    console.log(camp)

    const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.post("http://localhost:5000/create-payment-intent", { amount: camp?.fees, currency: "usd" })
      .then(res => setClientSecret(res.data.clientSecret))
      .catch(err => console.error("Error fetching clientSecret:", err));
  }, [camp?.fees]);

  const options = { clientSecret };

  if(loading)
  {
    return <Loader></Loader>
  }

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm camp={camp}/>
        </Elements>
      ) : (
        <p>Loading payment...</p>
      )}
    </div>
  );
};

export default Payment;
