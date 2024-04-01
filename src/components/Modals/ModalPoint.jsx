import { useMemo } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Image,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const ModalPoint = ({ isOpen, cancelRef, onClose, data }) => {
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const position = useMemo(() => {
    if (data) {
      if (data.type === "in") {
        return data?.pointIn?.split(",");
      } else {
        return data?.pointOut?.split(",");
      }
    }
  }, [data]);

  const imgSrc = useMemo(() => {
    if (data) {
      if (data.type === "in") {
        return data?.imgIn;
      } else {
        return data?.imgOut;
      }
    }
  }, [data]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Point {data.type}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Stack>
              <Box>
                <Text>Photo:</Text>
                <Image
                  boxSize="348px"
                  width="100%"
                  objectFit="cover"
                  src={imgSrc}
                  alt="pointin"
                />
              </Box>
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
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ModalPoint;
