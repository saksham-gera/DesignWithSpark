import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { Link, useLocation } from 'react-router-dom';
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

    handleDecals(type, `data:image/png;base64,${data.photo}`);
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

  const handleSaveImage = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_SERVER+`/users/65ee04cb1a101fe269163772/images`,
      { b_64_image: b_64_image_var }
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    console.log('Image saved successfully');
  } catch (error) {
    console.error('Error saving image:', error);
    alert("Failed to save image. Please try again.");
  }
};


  const handleGetImages = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_SERVER+`/users/65ee04cb1a101fe269163772/images`
    );

    if (response.status !== 200 || !Array.isArray(response.data?.images)) {
      throw new Error("Unexpected response format");
    }

    console.log('Images retrieved successfully:', response.data.images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    alert("Failed to retrieve images. Please try again.");
  }
};

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
{/* 
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Save It"
              handleClick={handleSaveImage}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />

          </motion.div> */}

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
