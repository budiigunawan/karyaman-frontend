import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const ModalClockOutAttendance = ({ isOpen, cancelRef, onClose, data }) => {
  const handleClockOutAttendance = () => {
    console.log(data, "target attendance");
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Clock Out Attendance
          </AlertDialogHeader>
          <AlertDialogBody>
            {`Are you sure? You can't undo this action afterwards.`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleClockOutAttendance} ml={3}>
              Clock Out
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ModalClockOutAttendance;
