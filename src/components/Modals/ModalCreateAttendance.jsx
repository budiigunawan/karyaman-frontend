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
} from "@chakra-ui/react";
import Webcam from "react-webcam";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const ModalCreateAttendance = ({ isOpen, onClose }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [position, setPosition] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((result) =>
        setPosition([result.coords.latitude, result.coords.longitude])
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser");
    }
  };

  const handleTakePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleRemovePhoto = () => {
    setImgSrc(null);
  };

  const handleCreateAttendance = () => {
    console.log(position, "position");
    console.log(imgSrc, "image");
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
        <ModalHeader>Add new attendance</ModalHeader>
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
                <Button size='sm' colorScheme='blue' onClick={getPosition}>
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
            onClick={handleCreateAttendance}
            colorScheme='blue'
            mr={3}
            isDisabled={!(imgSrc && position)}
          >
            Save
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateAttendance;
