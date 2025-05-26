import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import config from '../config/config';
import state2 from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { OpenInEditor, AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import toast from 'react-hot-toast';

const Customizer = () => {
  const snap = useSnapshot(state2);
  const location = useLocation();
  const [b_64_image_var, setb_64_image_var] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const data = location.state;
      if (data.logo) {
        setb_64_image_var(data.logo.slice(22));
        handleDecals('logo', data.logo);
      }
      if (data.full) {
        setb_64_image_var(data.full.slice(22));
        handleDecals('full', data.full);
      }
    }
  }, []);


  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "openineditor":
        return <OpenInEditor b_64_image_var={b_64_image_var} />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch(import.meta.env.VITE_BACKEND_SERVER + '/dalle/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        const errorText = await response.text(); // fallback in case JSON isn't returned
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (!data?.photo) {
        throw new Error("Invalid response from server: 'photo' not found");
      }

      handleDecals(type, `data:image/jpeg;base64,${data.photo}`);
      setb_64_image_var(data.photo);
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again later.");
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state2[decalType.stateProperty] = result;


    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state2.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state2.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state2.isLogoTexture = true;
        state2.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        setb_64_image_var(result.slice(23));
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  const updateOrderInDatabase = async (payment_id, order_id, signature) => {
    try {
      if (!localStorage.getItem('token')) {
        console.log("Please Login First!");
        toast.error("Please Login First!");
        return;
      }

      const token = localStorage.getItem('token');

      // Convert base64 to Blob
      const byteCharacters = atob(b_64_image_var);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const imageBlob = new Blob([byteArray], { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('price', 1);
      formData.append('rzp_orderid', order_id);
      formData.append('rzp_paymentid', payment_id);
      formData.append('rzp_signature', signature);
      formData.append('image', imageBlob);

      const placeOrderUrl = `${import.meta.env.VITE_BACKEND_SERVER}/orders/place`;

      const response = await axios.post(placeOrderUrl, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log("Order Placed");
        toast.success("Order Placed!");
        navigate("/orders");
      }
    } catch (error) {
      console.error('Order Place failed', error.response || error);
      toast.error("Order failed");
    }
  };

  const verifyPayment = async (payment_id, order_id, signature) => {
    try {
      let verifyPaymentUrl = `${import.meta.env.VITE_BACKEND_SERVER}/orders/place`;
      const body = {
        razorpay_payment_id: payment_id,
        razorpay_order_id: order_id,
        razorpay_signature: signature
      };
      let response = await axios.get(verifyPaymentUrl,
        body
      );
      if (response.status == 200) {
        console.log("payment verified");
        updateOrderInDatabase(payment_id, order_id, signature);
      } else {
        toast.error("payment Verification Failed");
      }
    } catch (e) {
      console.log(e);
    }

  }

  const placeOrder = async (rzp_orderId) => {
    var options = {
      "key": import.meta.env.VITE_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      "amount": 1 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "My Tee 3D", //your business name
      "description": "Pay For Your Favourites",
      "image": "https://mytee3d.vercel.app/MyTee3D.png",
      "order_id": rzp_orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {
        console.log("payment Success");
        verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
      },
      "theme": {
        "color": "#800020"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      toast.error(response.error.description);
    });
  }

  const createOrder = async () => {
    try {
      let createOrderUrl = `${import.meta.env.VITE_BACKEND_SERVER}/orders`;
      console.log(createOrderUrl);
      const body = {
        amount: 1 * 100
      };
      let response = await axios.post(createOrderUrl,
        body
      );
      if (response.status == 200) {
        console.log(response.data.id);
        placeOrder(response.data.id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {generateTabContent()}
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}


              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Buy"
              handleClick={createOrder}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />

          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


export default Customizer
