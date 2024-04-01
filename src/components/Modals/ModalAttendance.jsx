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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Webcam from "react-webcam";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const ModalAttendance = ({
  isOpen,
  onClose,
  data = null,
  revalidateAttendances,
}) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [position, setPosition] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingPosition, setLoadingPosition] = useBoolean();
  const [loadingSubmit, setLoadingSubmit] = useBoolean();
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const getPosition = () => {
    setLoadingPosition.on();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((result) =>
        setPosition([result.coords.latitude, result.coords.longitude]),
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
      const pointIn = position.join(",");
      const clockIn = new Date().toISOString();
      const imgIn = photoUrl;

      const createAttendancePayload = {
        pointIn,
        clockIn,
        imgIn,
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/attendance/create`,
        createAttendancePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      if (response.data) {
        toast({
          title: response.data.message || "Employee created successfully",
          position: "top",
          status: "success",
          isClosable: true,
        });
        handleCloseModal();
        revalidateAttendances();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || "Server Error");
    } finally {
      setLoadingSubmit.off();
    }
  };

  const handleClockOutAttendance = async () => {
    try {
      setLoadingSubmit.on();
      const photoUrl = await uploadPhoto(imgSrc);
      const pointOut = position.join(",");
      const clockOut = new Date().toISOString();
      const imgOut = photoUrl;

      const clockOutAttendancePayload = {
        pointOut,
        clockOut,
        imgOut,
      };

      const response = await axios.put(
        `${apiUrl}/api/v1/attendance/edit/${data.id}`,
        clockOutAttendancePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      if (response.data) {
        toast({
          title: response.data.message || "Employee created successfully",
          position: "top",
          status: "success",
          isClosable: true,
        });
        handleCloseModal();
        revalidateAttendances();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || "Server Error");
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
                    size="sm"
                    colorScheme="red"
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
                    screenshotFormat="image/jpeg"
                  />
                  <Button
                    size="sm"
                    colorScheme="blue"
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
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                      <Popup>Your Position</Popup>
                    </Marker>
                  </MapContainer>
                </Box>
              ) : (
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={getPosition}
                  isLoading={loadingPosition}
                  loadingText="Getting Position"
                >
                  Get Position
                </Button>
              )}
            </Stack>
            {errorMessage && <Text color="red">{errorMessage}</Text>}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            colorScheme="blue"
            mr={3}
            isDisabled={!(imgSrc && position)}
            isLoading={loadingSubmit}
            loadingText="Submitting"
          >
            Submit
          </Button>
          <Button onClick={handleCloseModal} isDisabled={loadingSubmit}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAttendance;
