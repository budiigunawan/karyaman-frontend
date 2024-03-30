import { useRef, useState, useCallback } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Box,
  Image,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import axios from "axios";
import Webcam from "react-webcam";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const ModalAttendance = ({ isOpen, onClose, data = null }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [position, setPosition] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingPosition, setLoadingPosition] = useBoolean();
  const [loadingSubmit, setLoadingSubmit] = useBoolean();

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const getPosition = () => {
    setLoadingPosition.on();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((result) =>
        setPosition([result.coords.latitude, result.coords.longitude])
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser");
    }

    setLoadingPosition.off();
  };

  const uploadPhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      const cloudUrl = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/upload`;

      const response = await axios.post(cloudUrl, formData);
      const photoUrl = response.data.url;
      return photoUrl;
    } catch (error) {
      console.error("Error uploading the photo:", error);
    }
  };

  const handleTakePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleRemovePhoto = () => {
    setImgSrc(null);
  };

  const handleCreateAttendance = async () => {
    try {
      setLoadingSubmit.on();
      const photoUrl = await uploadPhoto(imgSrc);
      // https://res.cloudinary.com/dry2a78ix/image/upload/v1711769530/dluecnltsarqxfuzxp3r.jpg
      console.log(photoUrl, "photoUrl");
      console.log(position, "position");
    } catch (error) {
      setErrorMessage("Error creating new attendance");
      console.error("Error creating new attendance:", error);
    } finally {
      setLoadingSubmit.off();
    }
  };

  const handleClockOutAttendance = async () => {
    try {
      setLoadingSubmit.on();
      const photoUrl = await uploadPhoto(imgSrc);
      // https://res.cloudinary.com/dry2a78ix/image/upload/v1711769530/dluecnltsarqxfuzxp3r.jpg
      console.log(photoUrl, "photoUrl");
      console.log(position, "position");
      console.log(data, "target attendance");
    } catch (error) {
      setErrorMessage("Error clock out attendance");
      console.error("Error clock out attendance:", error);
    } finally {
      setLoadingSubmit.off();
    }
  };

  const handleSubmit = () => {
    if (data) {
      handleClockOutAttendance();
    } else {
      handleCreateAttendance();
    }
  };

  const handleCloseModal = () => {
    setImgSrc(null);
    setPosition(null);
    onClose();
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {data ? "Clock out attendance" : "Add new attendance"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Stack>
              <Text>Please take a photo</Text>
              {imgSrc ? (
                <>
                  <Box>
                    <Image src={imgSrc} />
                  </Box>
                  <Button
                    size='sm'
                    colorScheme='red'
                    onClick={handleRemovePhoto}
                  >
                    Retake Photo
                  </Button>
                </>
              ) : (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                  />
                  <Button
                    size='sm'
                    colorScheme='blue'
                    onClick={handleTakePhoto}
                  >
                    Take Photo
                  </Button>
                </>
              )}
            </Stack>
            <Stack>
              {position ? (
                <Box>
                  <Text>Position:</Text>
                  <MapContainer
                    center={position}
                    zoom={16}
                    scrollWheelZoom={false}
                    style={{ height: "348px" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                      <Popup>Your Position</Popup>
                    </Marker>
                  </MapContainer>
                </Box>
              ) : (
                <Button
                  size='sm'
                  colorScheme='blue'
                  onClick={getPosition}
                  isLoading={loadingPosition}
                  loadingText='Getting Position'
                >
                  Get Position
                </Button>
              )}
            </Stack>
            {errorMessage && <Text color='red'>{errorMessage}</Text>}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            type='button'
            onClick={handleSubmit}
            colorScheme='blue'
            mr={3}
            isDisabled={!(imgSrc && position)}
            isLoading={loadingSubmit}
            loadingText='Submitting'
          >
            Submit
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAttendance;
