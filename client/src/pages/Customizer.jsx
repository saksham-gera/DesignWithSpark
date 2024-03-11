import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import config from '../config/config';
import state2 from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state2);
  const location = useLocation();
  
  useEffect(() => {
    if(location.state) {
      const data = location.state;
      console.log(data);
      console.log("reached here")

      if(data.logo) {
        handleDecals('logo', data.logo);
      }
      if(data.full) {
        handleDecals('full', data.full);
      }
    }
  },[]);
  

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [b_64_image_var,setb_64_image_var]=useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
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
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:5001/dalle/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
      setb_64_image_var(data.photo);
    } catch (error) {
      alert(error)
    } finally {
      
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state2[decalType.stateProperty] = result;
    

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleSaveImage = () => {
      
    axios.post(`http://localhost:5001/users/65ee04cb1a101fe269163772/images`,{ b_64_image: b_64_image_var })
      .then(response => {
        // Handle success
        
        console.log('Image saved successfully');
      })
      .catch(error => {
        // Handle error
        console.error('Error saving image:', error);
      });
  };

  
const handleGetImages = () => {
  axios.get(`http://localhost:5001/users/65ee04cb1a101fe269163772/images`)
    .then(response => {
      // Handle success
      console.log('Images retrieved successfully:', response.data.images);
    })
    .catch(error => {
      // Handle error
      console.error('Error retrieving images:', error);
    });
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
  

   

    // after setting the state, activeFilterTab is updated

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
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="save it"
              handleClick={handleSaveImage}
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
