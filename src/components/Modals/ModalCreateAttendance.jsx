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

const ModalCreateAttendance = ({ isOpen, onClose }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((loc) => setLocation(loc));
    } else {
      setErrorMessage("Geolocation is not supported by this browser");
    }
  };

  const handleCapturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleCreateAttendance = () => {
    console.log(location, "location");
    console.log(imgSrc, "image");
  };

  const handleCloseModal = () => {
    setImgSrc(null);
    setLocation(null);
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
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
              />
              <Button size='sm' colorScheme='blue' onClick={handleCapturePhoto}>
                Capture Photo
              </Button>
              {imgSrc && (
                <>
                  <Text>Photo result:</Text>
                  <Box>
                    <Image src={imgSrc} />
                  </Box>
                </>
              )}
            </Stack>
            <Stack>
              <Button size='sm' colorScheme='blue' onClick={getLocation}>
                Get Location
              </Button>
              {location && (
                <Text>{`Lat: ${location.coords.latitude} Lng: ${location.coords.longitude}`}</Text>
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
            isDisabled={!(imgSrc && location)}
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
