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

  const handleCapturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleCreateAttendance = () => {
    console.log("attendance create");
  };

  const handleCloseModal = () => {
    setImgSrc(null);
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
            </Stack>
            {imgSrc && (
              <Box>
                <Image src={imgSrc} />
              </Box>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            type='button'
            onClick={handleCreateAttendance}
            colorScheme='blue'
            mr={3}
            isDisabled={!imgSrc}
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
